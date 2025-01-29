import Link from 'next/link'
import styles from './NotFoundButton.module.css'
export default function NotFoundButton() {
	return (
		<div className={styles.background}>
			<div className={styles.download}>
				<Link href='/'>Перейти на главную</Link>
			</div>
		</div>
	)
}
