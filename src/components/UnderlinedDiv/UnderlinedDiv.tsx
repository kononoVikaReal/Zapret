import styles from './UnderlinedDiv.module.css'

export default function UnderlinedDiv({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className={styles.container}>
			<div className={`${styles.line} ${styles.lineTop}`}></div>
			<div className={styles.center}>{children}</div>
			<div className={`${styles.line} ${styles.lineBottom}`}></div>
		</div>
	)
}
