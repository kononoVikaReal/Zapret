import styles from './Explanation.module.css'

interface ExplanationProps {
	children: React.ReactNode // Типизация для children
}

export default function Explanation({ children }: ExplanationProps) {
	return <div className={styles.explanation}>{children}</div>
}
