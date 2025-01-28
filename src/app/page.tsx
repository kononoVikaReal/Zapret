import Advantage from '@/components/Advantage/Advantage'
import DownloadCard from '@/components/DownloadCard/DownloadCard'
import InfoCard from '@/components/InfoCard/InfoCard'
import Zapret from '@/components/Zapret/Zapret'
import * as motion from 'framer-motion/client'
import styles from './page.module.css'

const advantages = [
	{
		imageUrl: '/PC.svg',
		imageAlt: 'Локальная работа',
		title: '100% локальная работа',
		desc: 'Программа работает полностью на вашем устройстве и не отправляет никакую информацию на сторонние серверы. Все процессы происходят локально, что обеспечивает высокий уровень конфиденциальности и безопасности',
	},
	{
		imageUrl: '/speed.svg',
		imageAlt: 'Максимальная скорость',
		title: 'Максимальная скорость',
		desc: '«Запрет» не снижает скорость интернет-соединения, так как не перенаправляет трафик через удаленные серверы. Вы получаете мгновенный доступ к ранее заблокированным сайтам без задержек и ожидания загрузки страниц',
	},
	{
		imageUrl: '/access.svg',
		imageAlt: 'Доступ к ресурсам',
		title: 'Доступ к заблокированным ресурсам',
		desc: 'С помощью «Запрета» можно беспрепятственно пользоваться популярными сервисами, такими как ChatGPT, искусственные интеллекты, Notion и другие сайты, ограничившие доступ для пользователей из РФ',
	},
]

const cards = [
	{
		title: 'Windows',
		color: 'windows',
		buttonTitle: 'Рекомендовано',
	},
	{
		title: 'Linux',
		color: 'linux',
		buttonTitle: 'Ручная установка',
	},
]

const textAnimation = {
	hidden: {
		x: -100,
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 25,
		},
	},
}

export default function Home() {
	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, amount: 0.2 }}
		>
			<motion.div
				variants={textAnimation}
				animate={{
					scale: 0.95,
					transition: { duration: 2 },
				}}
			>
				<Zapret />
			</motion.div>

			<motion.span
				variants={textAnimation}
				className={styles.title}
				transition={{ delay: 2 }}
			>
				Для чего нужен Zapret?
			</motion.span>
			<motion.div
				variants={textAnimation}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<Advantage advantages={advantages} />
			</motion.div>
			<motion.div
				variants={{
					hidden: {
						y: 300, // Элемент начинается снизу, за пределами экрана
						opacity: 0, // Начальная прозрачность
					},
					visible: {
						y: 0, // Элемент перемещается в обычное положение
						opacity: 1, // Элемент становится видимым
						scale: 1.1, // Немного увеличиваем элемент для выделения
						rotate: 0, // Без вращения
						transition: {
							type: 'spring',
							bounce: 0.4, // Пружинный эффект
							duration: 0.8, // Длительность анимации
							delay: 0.05, // Задержка перед началом анимации
						},
					},
				}}
				initial='hidden'
				whileInView='visible' // Когда элемент попадет в viewport, он станет видимым
				viewport={{ once: true, amount: 0.2 }} // Анимация срабатывает при 20% видимости элемента
				id='download'
			>
				<DownloadCard props={cards} />
			</motion.div>

			<InfoCard
				props={{
					title: 'Открытый исходный код',
					desc: 'Программа имеет открытый исходный код, что позволяет любому желающему проверить ее на безопасность, убедиться в отсутствии скрытых функций и внести собственные улучшения',
					imgUrl: '/attention.svg',
					imgAlt: 'attention logo',
					additionalInfo: '',
				}}
			/>
		</motion.div>
	)
}
