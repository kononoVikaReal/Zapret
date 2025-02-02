'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ModeToggle } from '../ModeToggle/ModeToggle'
import styles from './Navigation.module.css'

export default function Navigation() {
	const pathname = usePathname()
	const [activeLink, setActiveLink] = useState('')

	useEffect(() => {
		setActiveLink(pathname)
	}, [pathname])

	return (
		<div className={styles.nav}>
			<div className={styles.image}>
				{/* ZAPRET LOGO */}
				<Image
					src='/Zapret logo.svg'
					alt='Zapret logo'
					width={50}
					height={50}
				/>
				<span className='dark:fill-white font-zapret text-[32px] 2xl:text-[52px]'>
					Zapret
				</span>
			</div>
			<div className={`${styles.titles} sm:dark:text-white `}>
				<Link href='/' className={activeLink === '/' ? styles.active : ''}>
					Главная
				</Link>
				<Link
					href='/about'
					className={activeLink === '/about' ? styles.active : ''}
				>
					О Zapret
				</Link>
				<Link
					href='/how'
					className={activeLink === '/how' ? styles.active : ''}
				>
					Как / Почему это работает?
				</Link>
				<ModeToggle />
			</div>
		</div>
	)
}
