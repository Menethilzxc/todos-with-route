import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => {
	return (
		<>
			<div className={styles.Error}>
				<h2>Упс... Такой страницы нет</h2>
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk4pWGYW5wtn_gPVt-FZAcKtwtAHxZTW8vXQ&s"
					alt="sad smile"
				/>
			</div>
			<div>
				<Link to="/" className={styles.LinkBack}>
					Вернуться на главную
				</Link>
			</div>
		</>
	);
};
