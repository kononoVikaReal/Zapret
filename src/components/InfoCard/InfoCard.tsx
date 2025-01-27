import Image from 'next/image'
import styles from './InfoCard.module.css'
import { InfoCardProps } from './InfoCard.props'

export default function InfoCard({ props }: { props: InfoCardProps }) {
	return (
		<div className={styles.card}>
			<Image src={props.imgUrl} alt={props.imgAlt} width={120} height={140} />
			<div className={styles.gap}>
				<h1 className={styles.h1}>{props.title}</h1>
				<h2 className={styles.h2}>{props.desc}</h2>
				{props.additionalInfo && (
					<div
						className={styles.additional}
						dangerouslySetInnerHTML={{ __html: props.additionalInfo }}
					/>
				)}
			</div>
		</div>
	)
}
