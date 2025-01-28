'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
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
				<Image src='/Zapret logo.png' alt='Zapret logo' fill />
			</div>
			<div className={styles.titles}>
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
			</div>
		</div>
	)
}
