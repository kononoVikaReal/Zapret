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
	twitter: {
		card: 'summary_large_image',
		title: 'Запрет — инновационный метод обхода блокировок',
		description:
			'Запрет — это инновационный метод обхода блокировок, который работает без изменения IP-адреса пользователя',
		creator: '@bypassblock',
		images: ['https://zapret.vercel.app/Zapret bigLogo.png'],
	},
	title: 'Zapret',
	description:
		'Запрет — это инновационный метод обхода блокировок, который работает без изменения IP-адреса пользователя. В отличие от VPN, данный способ сохраняет вашу исходную геолокацию, что делает его незаметным для систем контроля и фильтрации трафика',
	keywords:
		'zapret, discord zapret, zapret youtube, zapret discord youtube, zapret github, zapret github discord? Zapret, Запрет, zapret, запрет, скачать запрет, скачать Zapret, zapret скачать, программа Zapret, программа Запрет, скачать VPN, бесплатный VPN, YouTube не работает, VPN для YouTube, VPN для Discord, YouTube VPN, Discord VPN, GoodBye DPI, бесплатные VPN, VPN не работает, vpn, скачать vpn, goodbyedpi, goodbydpi',
	viewport: 'width=device-width, initial-scale=1.0',
	openGraph: {
		title: 'Zapret - обход блокировок',
		description: 'Инновационный метод обхода блокировок - ПО Zapret',
		url: 'https://zapret.vercel.app/',
		siteName: 'Zapret - инновационный метод обхода блокировок',
		images: [
			{
				url: 'https://zapret.vercel.app/Zapret bigLogo.png',
				width: 800,
				height: 600,
			},
		],
		locale: 'ru_RU',
		type: 'website',
	},
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
