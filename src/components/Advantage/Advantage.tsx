import Image from 'next/image'
import styles from './Advantage.module.css'
import { AdvantageProps } from './Advantage.props'

export default function Advantage({
	advantages,
}: {
	advantages: AdvantageProps[]
}) {
	return (
		<div className={styles.advantage}>
			{advantages.map((adv, index) => (
				<div key={index} className={styles.advantage_card}>
					<Image
						className={styles.img}
						src={adv.imageUrl}
						alt={adv.imageAlt}
						width={93}
						height={93}
					/>
					<h3 className={styles.h3}>{adv.title}</h3>
					<p className={styles.p}>{adv.desc}</p>
				</div>
			))}
		</div>
	)
}
