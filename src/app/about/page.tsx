/* eslint-disable react/no-unescaped-entities */
'use client'
import DPICard from '@/components/DPICard/DPICard'
import Explanation from '@/components/Explanation/Explanation'
import InfoCard from '@/components/InfoCard/InfoCard'
import ListItem from '@/components/ListItem/ListItem'
import UnderlinedDiv from '@/components/UnderlinedDiv/UnderlinedDiv'
import { motion, useScroll } from 'framer-motion'
import Image from 'next/image'
import styles from './page.module.css'

const DPICards = [
	{
		title: 'Пассивный DPI',
		desc: 'Показывает сообщение об ошибке',
		footer: 'Это как получить письмо, что посылка не дошла',
	},
	{
		title: 'Активный DPI',
		desc: 'Просто блокирует доступ',
		footer: 'Это как если бы твою посылку просто не пропустили через границу',
	},
]

const items = [
	{
		markedWord: 'Неправильная контрольная сумма',
		desc: '(badsum): Пакет с ошибкой отбрасывается',
	},
	{
		markedWord: 'Неправильный порядковый номер',
		desc: '(badseq): Пакет с неправильным номером отбрасывается',
	},
	{
		markedWord: 'Истекшее время жизни',
		desc: '(TTL/autottl): Пакет не доходит до сервера',
	},
	{
		markedWord: 'Снятый флаг ACK',
		desc: '(datanoack): Сервер не принимает без подтверждения',
	},
	{
		markedWord: 'Опция MD5 signature',
		desc: 'Не все серверы такое понимают, поэтому пакет может быть отброшен',
	},
]

export default function page() {
	const { scrollYProgress } = useScroll()
	return (
		<div className='overflow-hidden dark:text-th-primary-dark'>
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
					zIndex: 2,
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
					title: 'YouTube и Discord',
					desc: 'Ютуб и дискорд не работают через запрет ',
					imgUrl: '/attention.svg',
					imgAlt: 'attention logo',
					additionalInfo:
						'<span>Обход блокировок дискорда и ютуба <a style="text-decoration: underline; color: #000;">доступен ниже ↓</a></span ><br><a target=_blank href=https://t.me/youtubenotwork style="text-decoration: underline; color: #512bd4;">ВПН для YouTube и Discord</a>',
				}}
			/>
			<Explanation>
				<h1 className={styles.h1}>DPI</h1>
				<p className={styles.p}>
					Представь, что на пути твоего интернет-трафика стоит пограничный
					контроль — система DPI (Deep Packet Inspection)
				</p>
				<p className={styles.p}>
					Эта система проверяет каждый пакет данных, который ты отправляешь и
					получаешь
				</p>

				<span className={styles.underlined}>
					Принципально существуют 2 типа DPI
				</span>
				<div className={styles.DPI}>
					{DPICards.map((item, index) => (
						<DPICard
							key={index} // Не забывайте ключ для списка
							item={{
								title: item.title, // Просто передаем значение, а не объект в объект
								desc: item.desc,
								footer: item.footer,
								index: index + 1,
							}}
						/>
					))}
				</div>
				<UnderlinedDiv>
					<div className={styles.imageContainer}>
						<Image
							src={'/DPIInfo.png'}
							alt='About DPI'
							layout='responsive' // Используйте layout="responsive" для адаптивного изображения
							width={528}
							height={226} // Фиксированная высота
							className='rounded-sm'
						/>
					</div>
					<p className={styles.p}>
						Очень условно (мы не знаем алгоритмов наверняка) это работает так -
						сервер получает данные с пакетом от вашего роутера и видит
						определённые закономерности, которые по определённым фильтрам
						отбрасываются коробочкой ТСПУ
					</p>
					<p className={styles.bold}>
						Задача Zapret — обмануть DPI, чтобы он не понял, куда ты идешь
					</p>
				</UnderlinedDiv>
			</Explanation>
			<Explanation>
				<h1 className={styles.h1}>Основные методы обмана Zapret</h1>
				<span className={styles.underlined}>
					Разбиение запроса на части (split TCP-сегментация)
				</span>
				<p className={styles.p}>
					Представь, что ты хочешь пронести через границу запрещенный предмет.
					Если ты попытаешься пронести его целиком, тебя поймают. Но что, если
					разобрать его на части и пронести по отдельности?
				</p>
				<p className={styles.p}>
					Zapret делает то же самое с запросами к заблокированным сайтам. Он
					разбивает запрос на мелкие кусочки (TCP-сегменты) так, чтобы DPI не
					смог распознать, что это запрос к запрещенному сайту.{' '}
				</p>
				<span className={styles.example}>
					Например, вместо GET / HTTP/1.1\r\nHost: blocked.com он отправит
					сначала GET, а потом / HTTP/1.1\r\nHost: blocked.com.
				</span>
				<div className={styles.leftList}>
					<ListItem
						props={{
							markedWord: 'nfqws',
							desc: 'умеет разбивать запрос на уровне отдельных пакетов',
						}}
					/>
					<ListItem
						props={{
							markedWord: 'tpws',
							desc: 'умеет разбивать запрос на уровне TCP-соединения',
						}}
					/>
				</div>
				<div className={styles.imageContainer}>
					<Image
						src={'/tcp.png'}
						alt={'TCP example'}
						layout='responsive' // Используйте layout="responsive" для адаптивного изображения
						width={708}
						height={117}
						className='rounded-sm'
					/>
				</div>
				<span className={styles.underlined}>
					Добавление "мусорных" данных (Fake packets)
				</span>
				<p className={styles.p}>
					Zapret может добавлять к запросу лишние данные, которые не нужны для
					работы сайта, но сбивают DPI с толку. Это как положить в сумку с
					запрещенным предметом много ненужных вещей, чтобы запутать досмотр.
					Эти "мусорные" данные могут быть оформлены как отдельный пакет (режим
					fake в nfqws), который DPI примет за настоящий запрос. В режиме
					fakedsplit (nfqws) "мусор" добавляется к оригинальным сегментам
					запроса, чтобы запутать DPI еще сильнее.
				</p>
				<p className={styles.p}>
					Чтобы "мусорный" пакет не дошел до сервера (иначе он может сломать
					соединение), используются разные уловки
				</p>
				<div className={styles.container}>
					{items.map((item, index) => (
						<ListItem key={index} props={item} />
					))}
				</div>
				<div className={styles.imageContainer}>
					<Image
						src={'/fake.png'}
						alt={'example of fake'}
						layout='responsive' // Используйте layout="responsive" для адаптивного изображения
						width={711}
						height={246}
						className='rounded-sm'
					/>
				</div>
				<span className={styles.underlined}>
					Изменение порядка следования сегментов (TCP disorder)
				</span>
				<p className={styles.p}>
					Обычно все части пакета отправляются по порядку: 1, 2, 3, 4. Но что,
					если отправить их в другом порядке, например, 2, 4, 1, 3? Этот пакет
					всё равно можно прочитать, но тот, кто попытается подсмотреть
					содержимое по пути, запутается.
				</p>
				<p className={styles.p}>
					<span className={styles.underlinedWord}>TCP disorder</span> — это как
					раз отправка частей "письма" (TCP-сегментов) в измененном порядке
				</p>
				<span className={styles.header}>Как это делает tpws</span>
				<p className={styles.p}>
					<span className={styles.underlinedWord}>tpws</span> — это как почтовое
					отделение, которое умеет хитрые трюки. Когда запрос отправляется на
					заблокированный сайт, tpws разбивает его на части (сегменты)
				</p>
				<p className={styles.p}>
					Обычно эти части отправляются по порядку. Но tpws делает вот что: он
					отправляет каждый второй сегмент с пометкой "Срочно, но не
					доставлять!" (на самом деле, он выставляет TTL=1, из-за чего пакет
					"умрет" по пути).
				</p>
				<p className={styles.p}>
					Сервер, получив четные сегменты, не понимает, где остальные, и просит
					прислать их еще раз.
				</p>
				<p className={styles.p}>
					В итоге, к серверу сегменты приходят в измененном порядке, например:
					2, 4, 6, 1, 3, 5. Сервер собирает их воедино и отдает нужную страницу.
					А DPI, который видит только отдельные куски, не может понять, что это
					был запрос на заблокированный сайт.
				</p>
				<span className={styles.header}>Как это делает nfqws</span>
				<p className={styles.p}>
					<span className={styles.underlinedWord}>nfqws</span> — это как
					специально обученный почтальон, который перехватывает твои письма,
					разрезает их на части и может отправить их в любом порядке, указанным
					тобой.
				</p>
				<p className={styles.p}>
					В режиме multidisorder nfqws отправляет сегменты в обратном порядке,
					например: 4, 3, 2, 1.
				</p>
				<div className={styles.imageContainer}>
					<Image
						src={'/multidisorder.png'}
						alt={'example of multidisorder'}
						layout='responsive' // Используйте layout="responsive" для адаптивного изображения
						width={816}
						height={129}
						className='rounded-sm'
					/>
				</div>
				<p className={styles.p}>
					В режиме fakedsplit, он отправляет запрос в порядке: фейк 2-й части, 2
					часть, фейк 2-й части, фейк 1-й части, 1 часть, фейк 1-й части.
				</p>
				<p className={styles.p}>
					В режиме fakeddisorder, он отправляет запрос в порядке: фейк 2-й
					части, 2 часть, фейк 2-й части, фейк 1-й части, 1 часть, фейк 1-й
					части.
				</p>
				<p className={styles.p}>
					Таким образом, DPI видит только набор фрагментов, возможно, вперемешку
					с поддельными (fake), и не может понять, что происходит.
				</p>
				<span className={styles.underlined}>
					Манипуляции с заголовками HTTP
				</span>
				<p className={styles.p}>
					Zapret может менять регистр букв в заголовке Host:, добавлять пробелы
					или точку в конце имени хоста. Это как изменить надпись на посылке,
					чтобы ее не узнали.
				</p>
				{/* <p className={styles.p}>
					Например, Host: blocked.com превращается в host: blocked.com.
				</p> */}
				<span className={styles.example}>
					Например, Host: blocked.com превращается в host: blocked.com.
				</span>
				<span className={styles.underlined}>
					Разделение TLS ClientHello на два TLS records (tlsrec)
				</span>
				<p className={styles.p}>
					Когда ты заходишь на сайт, защищенный HTTPS, твой браузер и сервер
					сайта должны договориться о том, как они будут шифровать данные. Этот
					процесс называется "TLS handshake" (рукопожатие TLS).
				</p>
				<p className={styles.p}>
					Первый шаг в этом процессе — ClientHello. Это сообщение, которое твой
					браузер отправляет серверу. В нем он говорит: "Привет, я хочу
					установить защищенное соединение. Я поддерживаю такие-то версии TLS и
					такие-то алгоритмы шифрования". Также в этом сообщении есть информация
					о домене, к которому ты подключаешься - SNI (Server Name Indication).
				</p>
				<p className={styles.p}>
					Системы DPI (которые блокируют сайты) тоже "слушают" этот разговор.
					Они видят ClientHello и, если сайт в списке заблокированных, могут
					разорвать соединение.
				</p>
				<p className={styles.p}>
					Метод tlsrec в tpws пытается обмануть DPI, разделив ClientHello на две
					части, которые называются "TLS records" (записи TLS).
				</p>
				<p className={styles.p}>
					Он делит его на две записи TLS. Важно, что в каждой записи есть
					заголовок, по которому можно понять, что это часть одного сообщения.
					DPI видит только первую запись, которая сама по себе не похожа на
					полноценное ClientHello. Он не понимает, что это запрос к
					заблокированному сайту, и пропускает его.
				</p>
				<p className={styles.p}>
					В России tlsrec обычно не работает с TLS 1.2, потому что DPI
					анализирует сертификат сервера, который передается в ServerHello
					(следующее сообщение после ClientHello). Но работает с TLS 1.3, потому
					что там эта информация шифруется.
				</p>
				<span className={styles.underlined}>
					Автоматическое определение блокировок (autohostlist)
				</span>
				<p className={styles.p}>
					Zapret может анализировать ответы от сервера и определять, был ли
					запрос заблокирован. Если сайт ведет себя подозрительно (например, не
					отвечает или возвращает ошибку), Zapret может добавить его в список
					для обхода. Это как вести черный список сайтов, которые не пускают, и
					автоматически применять к ним обходные маневры.
				</p>
				<span className={styles.underlined}>Итог</span>
				<p className={styles.p}>
					<span className={styles.underlinedWord}>
						nfqws (Network Filter Queue)
					</span>{' '}
					работает на уровне отдельных пакетов. Он перехватывает пакеты, идущие
					к заблокированным сайтам, изменяет их и отправляет дальше. Для его
					работы нужно настроить правила iptables или nftables, чтобы
					перенаправлять трафик в nfqws.
				</p>
				<p className={styles.p}>
					<span className={styles.underlinedWord}>
						tpws (Transparent Proxy)
					</span>{' '}
					работает на уровне TCP-соединений. Он выступает в роли посредника
					между роутером и сайтом. Для его работы нужно настроить редирект
					трафика на tpws с помощью iptables или nftables.
				</p>
				<span className={styles.header}>Когда это работать не будет</span>
				<p className={styles.p}>
					Важно понимать, что Zapret — это не волшебная палочка, и у него есть
					свои ограничения. Вот случаи, когда Zapret может не сработать:
				</p>
				<ListItem
					props={{
						markedWord: undefined,
						desc: 'Блокировка по IP-адресу',
					}}
				/>
				<p className={styles.p}>
					Если провайдер блокирует доступ к сайту не по доменному имени, а по
					IP-адресу, то Zapret не поможет. Он заточен на обман DPI, который
					анализирует именно доменные имена.
				</p>
				{/* <p className={styles.p}>
					Пример: Если сайт youtube.com имеет IP-адрес 1.2.3.4, и провайдер
					заблокировал доступ ко всем сайтам на этом IP, то Zapret не сможет
					помочь, потому что он не изменяет IP-адрес назначения.
				</p> */}
				<span className={styles.example}>
					Пример: Если сайт youtube.com имеет IP-адрес 1.2.3.4, и провайдер
					заблокировал доступ ко всем сайтам на этом IP, то Zapret не сможет
					помочь, потому что он не изменяет IP-адрес назначения.
				</span>
				<ListItem
					props={{
						markedWord: undefined,
						desc: 'Подмена DNS',
					}}
				/>
				<p className={styles.p}>
					Если провайдер подменяет DNS-запросы, то возможно даже не дойти до
					стадии, когда сработает Zapret.
				</p>
				{/* <p className={styles.p}>
					Пример: Ты вводишь youtube.com в браузере, но провайдер подменяет
					DNS-ответ и вместо реального IP-адреса сайта выдает тебе IP-адрес
					своей заглушки или вообще неверный адрес. В этом случае твой запрос
					даже не дойдет до настоящего сайта, и Zapret не сможет вмешаться.
				</p> */}
				<span className={styles.example}>
					Пример: Ты вводишь youtube.com в браузере, но провайдер подменяет
					DNS-ответ и вместо реального IP-адреса сайта выдает тебе IP-адрес
					своей заглушки или вообще неверный адрес. В этом случае твой запрос
					даже не дойдет до настоящего сайта, и Zapret не сможет вмешаться.
				</span>
				<p className={styles.p}>
					<span className={styles.underlinedWord}>
						Решение: Использовать DNS over HTTPS (DoH) или DNS over TLS (DoT)
					</span>
					, чтобы защитить свои DNS-запросы от подмены. Также можно попробовать
					использовать DNS-сервер, который не контролируется провайдером,
					например, публичные DNS от Google (8.8.8.8, 8.8.4.4) или Cloudflare
					(1.1.1.1, 1.0.0.1).
				</p>
				<ListItem
					props={{
						markedWord: undefined,
						desc: 'Продвинутые системы фильтрации',
					}}
				/>
				<p className={styles.p}>
					Если провайдер использует очень продвинутую систему фильтрации,
					которая умеет анализировать не только заголовки, но и содержимое
					трафика, то Zapret может не справиться.
				</p>
				{/* <p className={styles.p}>
					Пример: Провайдер использует DPI, который умеет собирать
					TCP-соединение целиком и анализировать его, несмотря на разбиение на
					сегменты или добавление "мусорных" данных.
				</p> */}
				<span className={styles.example}>
					Пример: Провайдер использует DPI, который умеет собирать
					TCP-соединение целиком и анализировать его, несмотря на разбиение на
					сегменты или добавление "мусорных" данных.
				</span>
				<p className={styles.p}>
					Такие системы встречаются нечасто, но они существуют и постоянно
					совершенствуются.
				</p>
				<ListItem
					props={{
						markedWord: undefined,
						desc: 'Блокировка на уровне протокола',
					}}
				/>
				<p className={styles.p}>
					Если провайдер блокирует не конкретные сайты, а целые протоколы
					(например, весь трафик, похожий на VPN), то Zapret не поможет. В Китае
					блокируют многие VPN-протоколы, и обойти такую блокировку очень
					сложно.
				</p>
				<ListItem
					props={{
						markedWord: undefined,
						desc: 'Проблемы на стороне сайта',
					}}
				/>
				<p className={styles.p}>
					Иногда сайты могут быть недоступны не из-за блокировок, а из-за
					проблем на своей стороне, или они изначально блокируют подключение из
					РФ. В этом случае Zapret, естественно, не поможет.
				</p>
				<ListItem
					props={{
						markedWord: undefined,
						desc: 'Если DPI анализирует ответы от сервера',
					}}
				/>
				<p className={styles.p}>
					Некоторые DPI хитрые. Они могут пропускать запрос, если он их обманул,
					но анализировать ответ от сервера. Если в ответе находится информация
					о заблокированном ресурсе (например, домен в сертификате), то
					соединение может быть сброшено.
				</p>
				<p className={styles.p}>
					<span className={styles.underlinedWord}>
						Решение: Использовать сайты, поддерживающие TLS 1.3
					</span>
					. В этой версии протокола сертификат сервера передается в
					зашифрованном виде.
				</p>
			</Explanation>
		</div>
	)
}
