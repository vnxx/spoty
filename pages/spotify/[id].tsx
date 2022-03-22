import AuthLayout from "../../src/components/layouts/AuthLayout";
import { apiPlaylistShowType, Item } from "../../src/types/apiType";
import { useRouter } from 'next/router'
import { fetcher } from "../../src/core/utilities";
import useSWR from "swr";
import {
	Box,
	Text,
	Image,
	AspectRatio,
	Stack,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	useToast
} from "@chakra-ui/react";
import React from "react";
import Container from "../../src/components/Container";

export default function SpotifyShow() {
	const router = useRouter()
	const { id } = router.query
	const { data, error, mutate } = useSWR<apiPlaylistShowType>(`/api/spotify/playlists/${id}`, fetcher)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [selectedTrack, setSelectedTrack] = React.useState<null | Item>(null)
	const [deleting, setDeleting] = React.useState<boolean>(false)
	const toast = useToast()

	if (error) {
		if (error.status === 401) {
			router.push('/api/spotify/login')
		} else {
			return <Box>{error.message}</Box>
		}
	}

	if (!data) {
		return <Box>Loading...</Box>
	}

	if (error) {
		return <Box>error</Box>
	}

	const handleSelect = (index: number) => {
		setSelectedTrack(data.tracks.items[index])
		onOpen()
	}

	const handleDelete = async () => {
		setDeleting(true)
		fetch(`/api/spotify/playlists/${id}?trackURI=${selectedTrack?.track.uri}`, {
			method: 'DELETE',
		})
			.then(response => response.json())
			.then(data => {
				if (data.status == 200) {
					mutate()
					onClose()
				} else {
					toast({
						title: 'Something went wrong.',
						description: data.error.message,
						status: 'error',
						duration: 9000,
						isClosable: true,
					})
				}
				setDeleting(false)
			}).catch(error => {
				setDeleting(false)
				toast({
					title: 'Something went wrong',
					description: "Please try again later.",
					status: 'error',
					duration: 9000,
					isClosable: true,
				})

			})
	}

	return (
		<AuthLayout title={"Detail"}>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Confirmation</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						Are you sure want to delete <Text as={'span'} fontWeight="bold">{selectedTrack?.track.name}</Text> from the playlist?
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
						<Button isLoading={deleting} onClick={handleDelete} variant='ghost'>Delete</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Box as='header' p={'8'} bg={'gray.100'}>
				<Container d={'flex'} flexDir={['column', 'row']} gap={['2', '8']}>
					<Box flex={'none'} w={'200px'}>
						<AspectRatio mb={2} ratio={1 / 1}>
							<Image alt={data.name} src={data.images[0].url} objectFit='cover' />
						</AspectRatio>
					</Box>

					<Box>
						<Text fontWeight={'bold'} fontSize={'3xl'} as={'h1'}>{data.name}</Text>
						<Text>Followers: {data.followers.total}</Text>
						<Text>Owner: {data.owner.display_name}</Text>
						<Text>Tracks: {data.tracks.total}</Text>
						<Button onClick={() => router.push('/')} mt={'2'} size={'sm'} colorScheme={'blue'}>Back to Home</Button>
					</Box>
				</Container>
			</Box>

			<Box as='section' p={'8'}>
				<Container>
					<Stack spacing={'4'}>
						{data.tracks.items.map((item, i) => (
							<Box key={i} bg={'gray.100'} d={'flex'}>
								<Box flex={'none'} w={'100px'} h={'100px'}>
									<AspectRatio mb={2} ratio={1 / 1}>
										<Image alt={item.track.name} src={item.track.album.images[0].url} objectFit='cover' />
									</AspectRatio>
								</Box>

								<Stack p={'3'} w={'full'}>
									<Text as={'h2'} fontWeight="medium" fontSize={'lg'}>{item.track.name}</Text>
									<Box>
										<Button onClick={() => handleSelect(i)} d={'inline-block'} size={'sm'} colorScheme="red">Delete</Button>
									</Box>
								</Stack>
							</Box>

						))}
					</Stack>
				</Container>
			</Box>
		</AuthLayout>
	)
}
