import Advantage from '@/components/Advantage/Advantage'
import CommentSectionWrapper from '@/components/CommentSectionWrapper/CommentSectionWrapper'
import DownloadCard from '@/components/DownloadCard/DownloadCard'
import InfoCard from '@/components/InfoCard/InfoCard'
import Zapret from '@/components/Zapret/Zapret'
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

export default function Home() {
	return (
		<div>
			<div>
				<Zapret />
			</div>
			<span className={styles.title}>Для чего нужен Zapret?</span>
			<div className={styles.advantagesGrid}>
				<Advantage advantages={advantages} />
			</div>
			<div className='mt-10 mb-7'>
				<DownloadCard props={cards} />
			</div>

			<InfoCard
				props={{
					title: 'Открытый исходный код',
					desc: 'Программа имеет открытый исходный код, что позволяет любому желающему проверить ее на безопасность, убедиться в отсутствии скрытых функций и внести собственные улучшения',
					imgUrl: '/attention.svg',
					imgAlt: 'attention logo',
					additionalInfo: '',
				}}
			/>
			{/* TEMPORARY */}
			<div className='max-w-3xl mx-auto bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-6 rounded-lg shadow-lg mb-4'>
				<h2 className='text-2xl font-semibold text-center mb-4 text-gray-800'>
					Внимание!
				</h2>
				<p className='text-lg text-center text-gray-700 mb-4'>
					Чтобы иметь возможность оставить комментарий, нужно авторизоваться в
					ваш аккаунт (при его отсутствии - зарегистрироваться)
					<br />
					Все противоречащие закону комментарии будут удалены
				</p>
				<p className='text-md text-center italic text-blue-500 underline mb-4'>
					Ник администратора: TLM Givl Upi (c эмодзи &lt;/&gt;)
					<br />
					Все остальные пользователи перед ником имеют эмодзи звездочек
				</p>
				<p className='text-sm text-center text-gray-500'>
					Комментарии являются нововведением с 03.02.2025 и проходят
					бета-тестирование
				</p>
			</div>
			<CommentSectionWrapper />
		</div>
	)
}
