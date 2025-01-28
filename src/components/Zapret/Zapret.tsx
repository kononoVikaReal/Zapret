/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import InfoDownload from '../InfoDownload/InfoDownload'
import styles from './Zapret.module.css'

export default function Zapret() {
	return (
		<div className={styles.card}>
			<div className={styles.info}>
				<h1 className={styles.h1}>Что такое Zapret?</h1>
				<h2 className={styles.h2}>
					"Запрет" — это инновационный метод обхода блокировок, который работает
					без изменения IP-адреса пользователя.{' '}
					<span className={styles.span}>В отличие от VPN</span>, данный способ
					сохраняет вашу исходную геолокацию, что делает его незаметным для
					систем контроля и фильтрации трафика
				</h2>
				<h3 className={styles.h3}>
					Поскольку IP-адрес остается неизменным, «Запрет» не влияет на скорость
					интернет-соединения. Это позволяет пользоваться онлайн-ресурсами без
					потерь в производительности, обеспечивая стабильное и безопасное
					подключение.
				</h3>
				<InfoDownload />
			</div>
			<Image
				src='/Zapret bigLogo.png'
				alt='Zapret logo'
				width={390}
				height={390}
			/>
		</div>
	)
}
