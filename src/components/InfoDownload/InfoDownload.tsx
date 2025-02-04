'use client'
import Image from 'next/image'
import styles from './InfoDownload.module.css'

function scroll() {
	const my_element = document.getElementById('download')

	if (my_element) {
		const elementPosition =
			my_element.getBoundingClientRect().top + window.scrollY // Позиция элемента относительно документа
		const offset = window.innerHeight / 2 - my_element.offsetHeight / 2 // Вычисляем смещение для центрирования
		const scrollToPosition = elementPosition - offset // Конечная позиция скролла

		window.scrollTo({
			top: scrollToPosition,
			behavior: 'smooth', // Плавный скролл
		})
	}
}

export default function InfoDownload() {
	return (
		<div className={styles.background}>
			<div
				className={`${styles.download} cursor-pointer`}
				onClick={() => scroll()}
			>
				<span>Скачать Zapret</span>
			</div>
			<a
				className={styles.instruction}
				target='_blank'
				href='https://teletype.in/@censorliber/zapret'
			>
				<div className={styles.image}>
					<Image src='/instruction.svg' alt='instruction logo' fill />
				</div>
				<span>Подробная инструкция</span>
			</a>
		</div>
	)
}
