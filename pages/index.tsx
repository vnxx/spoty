import { AspectRatio, Box, Image, SimpleGrid, Text } from '@chakra-ui/react'
import useSWR from 'swr'
import Container from '../src/components/Container';
import AuthLayout from '../src/components/layouts/AuthLayout'
import { apiMeType, apiPlaylistIndexType } from '../src/types/apiType'
import Link from 'next/link'
import { clientErrorCheck, fetcher } from '../src/core/utilities';
import { useRouter } from 'next/router'

export default function Home() {
  const { data: profile, error: profileError } = useSWR<apiMeType>('/api/spotify/me', fetcher)
  const { data: playlists } = useSWR<apiPlaylistIndexType>('/api/spotify/playlists', fetcher)
  const router = useRouter()

  if (profileError) {
    clientErrorCheck(profileError, router)
  }

  if (!profile) {
    return <Box>Loading user profile...</Box>
  }
  if (!playlists) {
    return <Box>Loading playlists...</Box>
  }

  return (
    <AuthLayout title='Home'>
      <Box as='header' p={'8'} bg={'gray.100'}>
        <Container>
          <Text fontWeight={'bold'} fontSize={'3xl'} as={'h1'}>{profile.display_name}</Text>
          <Text>Country: {profile.country}</Text>
          <Text>Followers: {profile.followers.total}</Text>
        </Container>
      </Box>

      <Box as='section' p={'8'}>
        <Container>
          <SimpleGrid columns={[2, 3]} spacing={[5, 10]}>
            {playlists.items.map((item, i) => (
              <Link key={i} href={`/spotify/${item.id}`} >
                <Box cursor={'pointer'}>
                  <AspectRatio mb={2} ratio={1 / 1} bg={'gray.100'}>
                    {item.images.length > 0 ? (
                      <Image alt={item.name} src={item.images[0].url} objectFit='cover' />
                    ) : (
                      <Box />
                    )}
                  </AspectRatio>
                  {item.name}
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </AuthLayout>
  )
}