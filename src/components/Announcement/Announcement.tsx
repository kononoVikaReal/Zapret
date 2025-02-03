import styles from './Announcement.module.css'

const Announcement = () => {
	return (
		<div className={styles.announcementWrapper}>
			<div className={styles.marqueeText}>
				<span>⚡</span>
				<span className={styles.textWrapper}>Уважаемые посетители</span>
				<span>⚡</span> <span>🛠️</span>
				<span className={styles.textWrapper}>
					Просим принять участие в бета-тестировании комментариев на сайте
					(находятся в конце страницы)
				</span>
				<span>🛠️</span>
			</div>
		</div>
	)
}

export default Announcement
