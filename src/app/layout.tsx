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
	description:
		'Запрет — это инновационный метод обхода блокировок, который работает без изменения IP-адреса пользователя. В отличие от VPN, данный способ сохраняет вашу исходную геолокацию, что делает его незаметным для систем контроля и фильтрации трафика',
	keywords:
		'Zapret, Запрет, zapret, запрет, скачать запрет, скачать Zapret, программа Zapret, программа Запрет, скачать VPN, бесплатный VPN, YouTube не работает, VPN для YouTube, VPN для Discord, YouTube VPN, Discord VPN, GoodBye DPI, бесплатные VPN, VPN не работает',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${JetBrainsMono.className} antialiased`}>
				<Navigation />
				{children}
				<Footer />
			</body>
		</html>
	)
}
