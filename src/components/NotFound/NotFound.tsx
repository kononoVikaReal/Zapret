/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import NotFoundButton from '../NotFoundButton/NotFoundButton'
import styles from './NotFound.module.css'

export default function NotFoundCase() {
	return (
		<div className={styles.card}>
			<div className={styles.info}>
				<h1 className={styles.h1}>Что-то пошло не так</h1>
				<h2 className={styles.h2}>Такой страницы у нас нету</h2>
				<NotFoundButton />
			</div>
			<div className={styles.imageContainer}>
				<Image
					src='/Zapret bigLogo.png'
					alt='Zapret logo'
					layout='responsive' // Используйте layout="responsive" для адаптивного изображения
					width={390} // Фиксированная ширина
					height={390} // Фиксированная высота
				/>
			</div>
		</div>
	)
}
