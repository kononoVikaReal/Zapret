import styles from './ListItem.module.css'
import { ListItemProps } from './ListItem.props'

export default function ListItem({ props }: { props: ListItemProps }) {
	return (
		<div className={styles.item}>
			<div className={styles.circle}></div>
			<div className={styles.text}>
				{props.markedWord && (
					<span className={styles.markedWord}>{props.markedWord}</span>
				)}
				<span>{props.desc}</span>
			</div>
		</div>
	)
}
