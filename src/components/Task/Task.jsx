import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequestChangeTodo, useRequestDeleteTodo } from '../../hooks';
import styles from './Task.module.css';

export const Task = () => {
	const [todoText, setTodoText] = useState('');
	const [currentTodo, setCurrentTodo] = useState({});

	const location = useLocation();
	const navigate = useNavigate();

	const { requestChangeTodo, isUpdating } = useRequestChangeTodo(
		todoText,
		setTodoText,
		setCurrentTodo,
		setCurrentTodo,
	);
	const { requestDeleteTodo, isDeleting, deletedTodoId } = useRequestDeleteTodo();

	const onChange = ({ target }) => {
		setTodoText(target.value);
	};

	useEffect(() => {
		if (location.state?.task) {
			setCurrentTodo(location.state.task);
		}
	}, [location.state]);

	useEffect(() => {
		if (deletedTodoId) {
			setCurrentTodo({});
		}
	}, [deletedTodoId]);

	return (
		<div className={styles.CurrentTask}>
			<h2>Текущая задача: </h2>
			<div className={styles.Task}>
				<p className={styles.TaskText}>
					{currentTodo.title ||
						'Когда-то здесь было дело, но теперь его нет :(. Нажмите на кнопку "Вернуться назад", чтобы выбрать другое дело.'}
				</p>
			</div>
			<input
				type="text"
				name="text"
				value={todoText}
				placeholder="Поле ввода для изменения дела"
				onChange={onChange}
			/>
			<div>
				<button
					onClick={requestChangeTodo}
					disabled={isUpdating}
					className={styles.TaskBtn}
				>
					Изменить дело
				</button>
				<button
					onClick={() => requestDeleteTodo(currentTodo.id)}
					disabled={isDeleting}
					className={styles.TaskBtn}
				>
					Удалить дело
				</button>
			</div>
			<div className={styles.ButtonBack}>
				<button className={styles.BackBtn} onClick={() => navigate(-1)}>
					Вернуться назад
				</button>
			</div>
		</div>
	);
};
