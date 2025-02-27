import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
	return (
		<div className={styles.footer}>
			<div className={styles.imageContainer1}>
				<Image
					className={styles.zapret}
					src='/Zapret logo2.png'
					alt='Zapret logo'
					layout='responsive' // Используйте layout="responsive" для адаптивного изображения
					height={112}
					width={230}
				/>
			</div>
			<div className={styles.social}>
				<a
					className={styles.socialTitles}
					target='_blank'
					href={'https://t.me/bypassblock'}
				>
					<div className={styles.imageContainer2}>
						<Image
							className={styles.zapret}
							src='/telegram.png'
							alt='telegram logo'
							layout='responsive'
							width={44}
							height={44}
						/>
					</div>
					<span className={styles.a}>Новости</span>
				</a>
				<a
					className={styles.socialTitles}
					target='_blank'
					href={'https://github.com/youtubediscord/zapret'}
				>
					<div className={styles.imageContainer3}>
						<Image
							className={styles.zapret}
							src='/github.png'
							alt='github logo'
							layout='responsive' // Используйте layout="responsive" для адаптивного изображения
							width={44}
							height={44}
						/>
					</div>
					<span className={styles.a}>Исходный код</span>
				</a>
			</div>
		</div>
	)
}
