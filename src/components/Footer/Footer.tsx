import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
	return (
		<div className={styles.footer}>
			<Image
				className={styles.zapret}
				src='/Zapret logo2.png'
				alt='Zapret logo'
				height={112}
				width={230}
			/>
			<div className={styles.social}>
				<div className={styles.socialTitles}>
					<Image
						src='/telegram.png'
						alt='telegram logo'
						width={44}
						height={44}
					/>
					<a target='_blank' href={'https://t.me/bypassblock'}>
						Новости
					</a>
				</div>
				<div className={styles.socialTitles}>
					<Image src='/github.png' alt='github logo' width={44} height={44} />
					<a target='_blank' href={'https://github.com/youtubediscord/zapret'}>
						Исходный код
					</a>
				</div>
			</div>
		</div>
	)
}
