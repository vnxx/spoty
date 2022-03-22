import { BoxProps, Container as ChakraContainer } from "@chakra-ui/react"

export default function Container(props: BoxProps) {
	return (
		<ChakraContainer maxW={'container.md'} {...props} />
	)
}