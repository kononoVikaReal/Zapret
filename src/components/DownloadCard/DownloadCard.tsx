import classNames from 'classnames'
import Link from 'next/link'
import styles from './DownloadCard.module.css'
import { DownloadCardProps } from './DownloadCard.props'

export default async function DownloadCard({
	props,
}: {
	props: DownloadCardProps[]
}) {
	// Получаем данные версии через fetch
	const response = await fetch(
		'https://filedn.eu/lFS6h5cBEsru02lgr5VwkTJ/Zapret/version.txt'
	)
	const version = await response.text() // Ждём получения версии

	return (
		<div className={styles.cardContainer}>
			{/* Мапим массив props */}
			{props.map((item, index) => (
				<div
					key={index}
					className={classNames(styles.card, {
						[styles.windows]: item.color === 'windows', // Проверяем цвет для каждого элемента
						[styles.linux]: item.color === 'linux',
					})}
				>
					<h3 className={styles.title}>{item.title}</h3>
					<p
						className={classNames(styles.description, {
							[styles.windowsDesc]: item.color === 'windows',
							[styles.linuxDesc]: item.color === 'linux',
						})}
					>
						{item.buttonTitle}
					</p>
					<div className={styles.buttonCard}>
						<Link
							className={classNames(styles.button, {
								[styles.windowsButton]: item.color === 'windows',
								[styles.linuxButton]: item.color === 'linux',
							})}
							target='_blank'
							href={
								item.color === 'windows'
									? 'https://github.com/youtubediscord/zapret_youtube_discord'
									: 'https://github.com/bol-van/zapret'
							}
						>
							Скачать
						</Link>
						<span className={styles.version}>Актуальная версия {version}</span>
					</div>
					<h4 className={styles.footer}>
						<Link target='_blank' href='https://t.me/bypassblock'>
							Другие версии
						</Link>
					</h4>
				</div>
			))}
		</div>
	)
}
