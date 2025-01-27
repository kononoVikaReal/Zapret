import styles from './DPICard.module.css'
import { DPIProps } from './DPICard.props'

interface DPICardProps {
	item: DPIProps // Теперь ожидаем один элемент, а не массив
}

export default function DPICard({ item }: DPICardProps) {
	return (
		<div className={styles.background}>
			<div className={styles.firstLine}>
				<span className={styles.number}>{item.index}</span>{' '}
				<span>{item.title}</span>
			</div>
			<span className={styles.secondLine}>{item.desc}</span>
			<span className={styles.thirdLine}>{item.footer}</span>
		</div>
	)
}
