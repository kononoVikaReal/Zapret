import NotFoundCase from '@/components/NotFound/NotFound'
import Image from 'next/image'
import styles from './page.module.css'
export default function NotFound() {
	return (
		<div className={styles.container}>
			<NotFoundCase />

			<div className={styles.notFoundImageDiv}>
				<Image
					className={styles.image}
					src={'/sad-baby-gif.gif'}
					alt={''}
					width={1000}
					height={1000}
				/>
			</div>

			<footer className={styles.footer}>
				{/* Ваш контент footer здесь */}
			</footer>
		</div>
	)
}
