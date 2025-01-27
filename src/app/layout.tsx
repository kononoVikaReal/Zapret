import Footer from '@/components/Footer/Footer'
import Navigation from '@/components/Navigation/Navigation'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const JetBrainsMono = JetBrains_Mono({
	variable: '--font-jetbrains-mono',
	subsets: ['latin', 'cyrillic'],
	weight: '400',
})

export const metadata: Metadata = {
	title: 'Zapret',
	description: 'Zapret - обходы блокировок',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${JetBrainsMono.className} antialiased`}>
				<Navigation />
				{children}
				<Footer />
			</body>
		</html>
	)
}
