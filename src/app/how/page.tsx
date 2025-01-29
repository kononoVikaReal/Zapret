'use client'
import Explanation from '@/components/Explanation/Explanation'
import InfoCard from '@/components/InfoCard/InfoCard'
import ListItem from '@/components/ListItem/ListItem'
import { motion, useScroll } from 'framer-motion'
import styles from './page.module.css'

const itemsHow = [
	{
		markedWord: 'Вы подключаетесь к VPN:',
		desc: 'это как будто вы загоняете свою машину в специальный грузовик',
	},
	{
		markedWord: 'Грузовик едет по своему туннелю:',
		desc: 'Ваш запрос (желание попасть на сайт) теперь скрыт внутри VPN-туннеля.',
	},
	{
		markedWord: 'Грузовик выезжает в другом месте:',
		desc: 'VPN-сервер (грузовик) находится в другой стране, где нет блокировки нужного вам сайта.',
	},
	{
		markedWord: 'Вы получаете доступ к сайту:',
		desc: 'Грузовик "высаживает" вашу машину уже в нужном месте, и вы спокойно попадаете на сайт.',
	},
]

const itemsHowVPN = [
	{
		markedWord: 'Скрывает ваш настоящий адрес (IP):',
		desc: 'Блокпосты не видят, откуда вы на самом деле едете.',
	},
	{
		markedWord: 'Шифрует ваш трафик:',
		desc: 'Никто не может подсмотреть, что вы делаете в интернете, пока вы в туннеле.',
	},
	{
		markedWord: 'Позволяет "телепортироваться" в другую страну:',
		desc: 'Вы как будто подключаетесь к интернету из другой точки мира, где нет ограничений.',
	},
]

const itemsRemember = [
	{
		markedWord: undefined,
		desc: 'Разные VPN-сервисы отличаются по скорости, надежности и цене.',
	},
	{
		markedWord: undefined,
		desc: 'Использование VPN может немного замедлить интернет.',
	},
	{
		markedWord: undefined,
		desc: 'В некоторых странах использование VPN может быть ограничено или запрещено.',
	},
]

const itemsMainVPN = [
	{
		markedWord: undefined,
		desc: 'OpenVPN',
	},
	{
		markedWord: undefined,
		desc: 'WireGuard',
	},
	{
		markedWord: undefined,
		desc: 'IKEv2/IPsec',
	},
	{
		markedWord: undefined,
		desc: 'L2TP/IPsec',
	},
	{
		markedWord: undefined,
		desc: 'VLESS',
	},
	{
		markedWord: undefined,
		desc: 'VMess',
	},
	{
		markedWord: undefined,
		desc: 'Shadowsocks',
	},
	{
		markedWord: undefined,
		desc: 'Trojan',
	},
	{
		markedWord: undefined,
		desc: 'Xray',
	},
]

const itemsMainVPNTypes = [
	{
		markedWord: 'Браузерные расширения',
		desc: 'для Chrome и Firefox',
	},
	{
		markedWord: 'Настольные приложения',
		desc: 'или APK для Windows и Android (работают как для всей системы - то есть стандартный впн, так и в режиме HTTP/SOCKS прокси, то есть для работы по отдельным портам с раздельным тунелированием)',
	},
]

const itemsTorAdvantages = [
	{
		markedWord: 'Анонимность:',
		desc: 'Каждый узел знает только о предыдущем и следующем узле в цепочке, но не знает ни полного пути, ни источника, ни назначения трафика. Это обеспечивает достаточно высокую степень анонимности для вашей безопасности.',
	},
	{
		markedWord: 'Медленный:',
		desc: 'Из-за многократного шифрования и маршрутизации через несколько узлов, Tor обычно работает медленнее, чем VPN.',
	},
	{
		markedWord: 'Бесплатный:',
		desc: 'Tor - это бесплатное программное обеспечение с открытым исходным кодом, поддерживаемое сообществом добровольцев (никто не знает через какие сервера проходят ваши данные)',
	},
]

const itemsBridges = [
	{
		markedWord: 'Скрытые точки входа:',
		desc: 'Они не перечислены в общем списке узлов Tor, поэтому их сложнее обнаружить и заблокировать.',
	},
	{
		markedWord: 'Для тех, кто под сильной цензурой:',
		desc: 'Мосты в первую очередь предназначены для пользователей в странах с жесткой интернет-цензурой, где обычные узлы Tor блокируются.',
	},
	{
		markedWord: 'Получение адреса моста:',
		desc: 'Адреса мостов можно получить через сайт Tor Project, по электронной почте или у доверенных пользователей Tor.',
	},
]

const itemsWhyHarder = [
	{
		markedWord: 'Множество адресов:',
		desc: 'Существует множество мостов, и их список постоянно меняется. Заблокировать все мосты гораздо сложнее, чем один IP-адрес VPN-сервера.',
	},
	{
		markedWord: 'Маскировка трафика:',
		desc: 'Мосты, особенно obfs4, активно маскируют свой трафик, чтобы его было сложно отличить от обычного интернет-трафика.',
	},
	{
		markedWord: 'Децентрализация:',
		desc: 'Tor - децентрализованная сеть, у нее нет единой точки отказа. Если один мост заблокируют, можно использовать другой.',
	},
	{
		markedWord: 'Постоянное развитие:',
		desc: 'Разработчики Tor постоянно работают над улучшением мостов и созданием новых методов обхода блокировок.',
	},
]

const itemsResultTORVPN = [
	{
		markedWord: undefined,
		desc: 'Tor с мостами - это более надежный инструмент для обхода жесткой цензуры, чем VPN, так как его сложнее обнаружить и заблокировать.',
	},
	{
		markedWord: undefined,
		desc: 'VPN - это более простой и быстрый вариант для повседневного использования, если вам не требуется высочайший уровень анонимности.',
	},
]

const itemsHow2 = [
	{
		markedWord: 'Разделение "запрещенного" груза:',
		desc: 'Представьте, что вы везете что-то большое, что инспектор сразу заметит. GoodbyeDPI и Zapret "разбирают" этот груз на мелкие части и везут их по отдельности. Инспектор видит только маленькие, безобидные посылки и пропускает их.',
	},
	{
		markedWord: 'Изменение "внешнего вида" груза:',
		desc: 'Другая хитрость - это немного изменить то, как выглядят ваши данные. Это как надеть на груз маскировку, чтобы инспектор не узнал, что это на самом деле.',
	},
]

const itemsResult = [
	{
		markedWord: undefined,
		desc: 'Инспектор DPI не понимает, что вы пытаетесь попасть на заблокированный сайт.',
	},
	{
		markedWord: undefined,
		desc: 'Ваш запрос проходит через блокпост без проблем.',
	},
	{
		markedWord: undefined,
		desc: 'Вы получаете доступ к нужному сайту, не используя VPN.',
	},
]

const itemsRemember2 = [
	{
		markedWord: undefined,
		desc: 'Эти методы не так надежны, как VPN, потому что они не шифруют ваш трафик.',
	},
	{
		markedWord: undefined,
		desc: 'Интернет-провайдеры могут обновлять свои системы DPI, чтобы противостоять этим хитростям.',
	},
	{
		markedWord: undefined,
		desc: 'Провайдер видит куда Вы заходите, так как не происходит маскирование трафика',
	},
]

const itemsComparison = [
	{
		markedWord: 'VPN',
		desc: 'это как спрятаться в грузовике и ехать по туннелю',
	},
	{
		markedWord: 'GoodbyeDPI/Zapret',
		desc: 'это как провезти "запрещенный" груз мимо инспектора, разделив его на части или замаскировав, чтобы инспектор не заметил',
	},
]

const itemsWhy = [
	{
		markedWord: undefined,
		desc: 'Zapret и GoodbyeDPI работают, обманывая системы DPI, которые фильтруют трафик на уровне провайдеров внутри страны. Они помогают обходить блокировки, основанные на анализе трафика, идущего к *внешним* (не российским) ресурсам.',
	},
	{
		markedWord: undefined,
		desc: 'В случае полной изоляции, трафик просто не будет выходить за пределы страны. Не будет самого "запрещенного" трафика, который нужно обманывать. Заблокированные извне ресурсы станут недоступны не из-за DPI, а из-за физического отсутствия связи с ними.',
	},
	{
		markedWord: undefined,
		desc: 'Инструменты типа Zapret не смогут установить соединение с внешними серверами, так как доступ к ним будет полностью перекрыт. Нужно чтобы эти зарубежные ресурсы были доступны хотя бы провайдеру. В случае ПОЛНОЙ изоляции рунета любые зарубежные сайты в принципе не должны быть доступны.',
	},
]

const itemsThen = [
	{
		markedWord: undefined,
		desc: 'Доступ будет только к тем ресурсам, которые физически расположены на серверах внутри России и разрешены РКН.',
	},
	{
		markedWord: undefined,
		desc: 'DPI может по-прежнему использоваться, но уже для фильтрации внутреннего трафика и блокировки доступа к ресурсам внутри страны, которые будут признаны нежелательными.',
	},
	{
		markedWord: undefined,
		desc: 'Для обхода ограничений в изолированном Рунете, вероятно, потребуются совершенно другие инструменты, работающие на иных принципах. Останется только именно внутренний РОССИЙСКИЙ VPN который будет подключаться к российским серверам (а они в свою очередь, тайком к зарубежным). Но такие ресурсы будет легко обнаружить и заблокировать.',
	},
]

export default function page() {
	const { scrollYProgress } = useScroll()
	return (
		<div>
			<motion.div
				id='scroll-indicator'
				style={{
					scaleX: scrollYProgress, // Прокрутка зависит от scrollYProgress
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					height: '8px', // Высота полосы прокрутки
					originX: 0, // Начало индикатора с левой стороны
					background: 'linear-gradient(90deg, #ff0088, #00aaff, #ff0088)', // Переливающийся градиент
					backgroundSize: '200% 100%', // Увеличиваем размер для анимации
					borderRadius: '4px', // Округленные углы
					boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Легкая тень
				}}
				animate={{
					backgroundPosition: ['200% 0', '0 0', '200% 0'], // Позиция фона для переливающегося градиента
				}}
				transition={{
					duration: 3,
					ease: 'easeInOut',
					repeat: Infinity, // Зацикливание анимации
					repeatDelay: 0.5, // Задержка между зацикливаними анимациями
				}}
			/>
			<InfoCard
				props={{
					title:
						'Что такое Запрет? Подробнее про ВПН и обходы DPI систем для чайников и Discord',
					desc: 'VPN, Tor и обходы DPI - 3 основных метода обхода блокировок в современной России. Рассмотрим каждый подробнее',
					imgUrl: '/information.svg',
					imgAlt: 'information logo',
					additionalInfo: undefined,
				}}
			/>

			<Explanation>
				<h1 className={styles.h1}>VPN</h1>
				<p className={styles.p}>
					Представьте, что интернет - это большая сеть дорог, а ваш компьютер -
					это машина, которая по ним ездит. Когда вы заходите на сайт, ваша
					машина отправляет запрос по этим дорогам. Но иногда на дорогах стоят
					блокпосты (блокировки), которые не пропускают вашу машину к нужному
					сайту.
				</p>
				<p className={styles.p}>
					VPN - это как вторая дорога в соседнюю страну, в которой нет этих
					блокпостов.
				</p>
				<span className={styles.header}>Как это работает</span>
				<div className={styles.container}>
					{itemsHow.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<span className={styles.header}>То есть VPN</span>
				<div className={styles.container}>
					{itemsHowVPN.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<p className={styles.p}>
					Простыми словами, VPN - это ваш личный секретный проезд в интернете,
					который помогает обходить блокировки и оставаться незамеченным.
				</p>
				<span className={styles.header}>Важно помнить</span>
				<div className={styles.container}>
					{itemsRemember.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<span className={styles.header}>Основные протоколы VPN</span>
				<p className={styles.p}>
					VPN-протоколы — это набор правил, определяющих, как VPN-клиент и
					VPN-сервер устанавливают и поддерживают зашифрованное соединение. От
					выбора протокола зависят скорость, безопасность и стабильность
					VPN-подключения. Вот основные VPN-протоколы, используемые сегодня
				</p>
				<div className={styles.container}>
					{itemsMainVPN.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<span className={styles.header}>Основные типы VPN</span>
				<p className={styles.p}>
					Типы отличаются по способу установки и работе. Могут использовать
					любые протоколы выше (зависят от разработчика):
				</p>
				<div className={styles.container}>
					{itemsMainVPNTypes.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
			</Explanation>

			<Explanation>
				<h1 className={styles.h1}>Tor</h1>
				<p className={styles.p}>
					Ваш интернет-трафик проходит через несколько случайно выбранных узлов
					(серверов) в сети Tor, каждый из которых снимает один слой шифрования,
					как слои луковицы.
				</p>
				<div className={styles.container}>
					{itemsTorAdvantages.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<p className={styles.p}>
					Выбирать реле возможно через сайт Tor Relay, там можно выбрать любую
					страну и вписать её в файл torrc, что позволяет быстро использовать
					ресурсы Tor.
				</p>
				<span className={styles.header}>
					<span className={styles.underlinedWord}>Мосты (bridges)</span> в Tor
				</span>
				<p className={styles.p}>
					Представьте, что власти знают о существовании обычных входов в сеть
					Tor (известные узлы) и блокируют их. Мосты - это секретные,
					неопубликованные входы в сеть Tor.
				</p>
				<div className={styles.container}>
					{itemsBridges.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<span className={styles.header}>
					<span className={styles.underlinedWord}>
						Почему мосты труднее заблокировать, чем один IP-адрес VPN:
					</span>
				</span>
				<div className={styles.container}>
					{itemsWhyHarder.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<span className={styles.header}>
					<span className={styles.underlinedWord}>Итог</span>
				</span>
				<div className={styles.container}>
					{itemsResultTORVPN.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
			</Explanation>
			<Explanation>
				<h1 className={styles.h1}>Обход DPI (система ТСПУ)</h1>
				<p className={styles.p}>
					Но есть совершенно другой способ обхода блокировок. Вместо того чтобы
					пытаться подключиться к "соседу" (соседней стране) где интернет у
					провайдера не заблокирован - можно вместо этого обмануть ВАШЕГО
					провайдера и не заметить что Вы пытаетесь подключиться к запрещённому
					ресурсу.
				</p>
				<p className={styles.p}>
					С 2010-ых годов начали постепенно разворачивать ТСПУ. Такие сервера
					которые принимают пакеты с данными трафика и специальными алгоритмами
					анализируют куда Вы заходите (анализ по DNS, анализ по имени хоста,
					анализ по айпи и т.д.)
				</p>
				<p className={styles.p}>
					Представим снова интернет как сеть дорог. Блокировки - это не просто
					блокпосты, а умные блокпосты с инспекторами, которые проверяют каждую
					машину (ваш трафик) на наличие "запрещенных" товаров (данных, ведущих
					на заблокированные сайты). Это и есть DPI (Deep Packet Inspection) -
					Глубокая Проверка Пакетов. Инспекторы заглядывают внутрь каждой машины
					и смотрят, куда она едет и что везет.
				</p>
				<ListItem
					props={{
						markedWord: 'GoodbyeDPI и Zapret',
						desc: 'это специальные методы манипулированием с данными (_буковки и циферки внутри пакетов TCP/IP протокола_), которые помогают обмануть этих инспекторов, не меняя при этом вашу машину (не используя VPN, не изменяя адрес и страну).',
					}}
				/>
				<span className={styles.header}>Как это работает</span>
				<div className={styles.container}>
					{itemsHow2.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<span className={styles.header}>
					<span className={styles.underlinedWord}>Итог</span>
				</span>
				<div className={styles.container}>
					{itemsResult.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<p className={styles.p}>
					Простыми словами, GoodbyeDPI и Zapret - это способы обхитрить систему,
					которая пытается заблокировать вам доступ к сайтам, заставляя её
					думать, что вы никуда "запрещённый" не едете.
				</p>
				<span className={styles.header}>Важно помнить</span>
				<div className={styles.container}>
					{itemsRemember2.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<span className={styles.header}>Сравнение с VPN</span>
				<div className={styles.container}>
					{itemsComparison.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
			</Explanation>
			<Explanation>
				<h1 className={styles.h1}>
					Что будет если полностью изолировать рунет?
				</h1>
				<p className={styles.p}>
					Если РКН теоретически полностью изолирует Россию от остального
					интернета, создав суверенный Рунет, то Zapret и подобные ему
					инструменты перестанут работать.
				</p>
				<span className={styles.header}>Почему</span>
				<div className={styles.container}>
					{itemsWhy.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<span className={styles.header}>Тогда</span>
				<div className={styles.container}>
					{itemsThen.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<p className={styles.p}>
					Подводя итог: Zapret и GoodbyeDPI предназначены для обхода блокировок
					доступа к внешнему интернету. В случае полной изоляции от внешнего
					мира, они станут бесполезны, так как проблема будет не в DPI, а в
					отсутствии самого доступа.
				</p>
				<p className={styles.p}>
					Важно отметить: Полная изоляция Рунета - это пока что теоретический
					сценарий, реализация которого крайне сложна и повлечет за собой
					множество негативных последствий.
				</p>
			</Explanation>
		</div>
	)
}
