import Footer from '@/components/Footer/Footer'
import Navigation from '@/components/Navigation/Navigation'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
		title:
			'Запрет — инновационный метод обхода блокировок (дискорда, ютуба и тд)',
		description:
			'Запрет обход блокировки дискорда и ютуба. Помогает если ютуб и дискорд не работает или интернет шатдаун провайдера заблокирован сайты. zapret discord youtube',
		creator: '@bypassblock',
		images: ['https://zapret.vercel.app/Zapret bigLogo.png'],
	},
	title: 'Zapret - обход блокировок дискорда и ютуба (и иных блокировок)',
	description:
		'Запрет обход блокировки дискорда и ютуба. Помогает если ютуб и дискорд не работает или интернет шатдаун провайдера заблокирован сайты. zapret discord youtube',
	keywords:
		'zapret, discord zapret, zapret youtube, zapret discord youtube, zapret github, zapret github discord? Zapret, Запрет, zapret, запрет, скачать запрет, скачать Zapret, zapret скачать, программа Zapret, программа Запрет, скачать VPN, бесплатный VPN, YouTube не работает, VPN для YouTube, VPN для Discord, YouTube VPN, Discord VPN, GoodBye DPI, бесплатные VPN, VPN не работает, vpn, скачать vpn, goodbyedpi, goodbydpi',
	viewport: 'width=device-width, initial-scale=1.0',
	openGraph: {
		title: 'Zapret - обход блокировок (дискорда, ютуба и тд)',
		description:
			'Запрет обход блокировки дискорда и ютуба. Помогает если ютуб и дискорд не работает или интернет шатдаун провайдера заблокирован сайты. zapret discord youtube',
		url: 'https://zapret.vercel.app/',
		siteName:
			'Zapret - инновационный метод обхода блокировок (дискорда, ютуба и тд)',
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
			<head>
				<meta name='apple-mobile-web-app-title' content='Zapret' />
			</head>
			<body
				className={`${JetBrainsMono.className} antialiased overflow-hidden`}
			>
				<Navigation />
				{children}
				<Analytics />
				<SpeedInsights />
				<Footer />
			</body>
		</html>
	)
}
