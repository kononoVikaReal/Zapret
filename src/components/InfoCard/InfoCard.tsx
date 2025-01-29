import Image from 'next/image'
import styles from './InfoCard.module.css'
import { InfoCardProps } from './InfoCard.props'

export default function InfoCard({ props }: { props: InfoCardProps }) {
	return (
		<div className={styles.card}>
			<div className={styles.imageContainer}>
				<Image
					src={props.imgUrl}
					alt={props.imgAlt}
					layout='responsive' // Используйте layout="responsive" для адаптивного изображения
					loading='eager'
					width={120} // Фиксированная ширина
					height={140} // Фиксированная высота
				/>
			</div>
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
