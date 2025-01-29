import Image from 'next/image'
import Link from 'next/link'
import styles from './InfoDownload.module.css'
export default function InfoDownload() {
	return (
		<div className={styles.background}>
			<div className={styles.download}>
				<Link href='#download'>Скачать Zapret</Link>
			</div>
			<div className={styles.instruction}>
				<div className={styles.image}>
					<Image src='/instruction.svg' alt='instruction logo' fill />
				</div>
				<a target='_blank' href='https://teletype.in/@censorliber/zapret'>
					Подробная инструкция
				</a>
			</div>
		</div>
	)
}
