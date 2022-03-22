import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import layoutType from '../../types/layoutType'

export default function UnAuthLayout({ children, title, description }: layoutType): JSX.Element {
	return (
		<>
			<Head>
				<title>{title}</title>
				{description && (
					<meta name="description" content={description} />
				)}
			</Head>

			{children}
		</>
	)
}