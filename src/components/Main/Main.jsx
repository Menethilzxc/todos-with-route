import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	useRequestGetTodo,
	useRequestAddTodo,
	// useRequestChangeTodo,
	// useRequestDeleteTodo,
} from '../../hooks';
import styles from './Main.module.css';

export const Main = () => {
	const [sortByAlphabet, setSortByAlphabet] = useState(false);
	const [searchTodo, setSearchTodo] = useState('');
	const [sortedTodos, setSortedTodos] = useState([]);
	const [todoText, setTodoText] = useState('');
	const [selectedTodoId, setSelectedTodoId] = useState(null);
	const [refreshTodoFlag, setRefreshTodoFlag] = useState(false);
	const [errorParagraph, setErrorParagraph] = useState(false);

	const refreshTodo = () => setRefreshTodoFlag(!refreshTodoFlag);
	const onChange = ({ target }) => {
		setTodoText(target.value);
	};
	const sortTodos = (todosArray) =>
		[...todosArray].sort((a, b) => a.title.localeCompare(b.title));

	const filterTodos = (query, todosArray) => {
		query = query.trim();

		const filteredList = todosArray.filter((todo) =>
			todo.title.toLowerCase().includes(query.toLowerCase()),
		);
		setSortedTodos(filteredList);
	};

	const toggleSortByAlphabet = () => {
		setSortByAlphabet(!sortByAlphabet);
	};

	const hundleSearhTodo = ({ target }) => {
		setSearchTodo(target.value);
	};
	const selectTodo = (id) => {
		setSelectedTodoId(id);
	};
	const { loader } = useRequestGetTodo(
		refreshTodoFlag,
		sortByAlphabet,
		searchTodo,
		sortTodos,
		filterTodos,
		sortedTodos,
		setSortedTodos,
	);
	const { requestAddTodo, isCreating } = useRequestAddTodo(
		setErrorParagraph,
		todoText,
		refreshTodo,
		setTodoText,
	);

	return (
		<>
			<div className={styles.app}>
				<h1>Список задач</h1>
				{errorParagraph ? (
					<p style={{ color: 'red' }}>Поле не должно быть пустым</p>
				) : (
					''
				)}
				<input
					type="text"
					name="text"
					value={todoText}
					placeholder="Введите название дела, которое хотите добавить"
					onChange={onChange}
				/>
				<div className={styles.crud}>
					<button onClick={requestAddTodo} disabled={isCreating}>
						Добавить дело
					</button>
				</div>
				{sortedTodos.length === 0 ? (
					''
				) : (
					<div className={styles.sortButton}>
						<button onClick={toggleSortByAlphabet}>
							{sortByAlphabet
								? 'Отключить сортировку'
								: 'Включить сортировку'}
						</button>
					</div>
				)}

				<input
					type="text"
					placeholder="Поиск дела"
					value={searchTodo}
					onChange={hundleSearhTodo}
				/>

				<ol>
					{loader ? (
						<div className={styles.loader}></div>
					) : (
						sortedTodos.map((todo, index) => (
							<Link
								to={`/task/${todo.id}`}
								key={todo.id}
								state={{ task: todo }}
								onClick={() => selectTodo(todo.id)}
								style={{
									background: selectedTodoId === todo.id ? 'white' : '',
									color: selectedTodoId === todo.id ? 'black' : '',
								}}
							>
								<span>{index + 1}.</span>
								{todo.title}
							</Link>
						))
					)}
				</ol>
				{sortedTodos.length === 0 ? (
					<div className={styles.CleanList}>
						Список дел пуст. Для добавления задачи, введите текст в
						соответствующее поле и нажмите кнопку &quot;Добавить дело&quot;
					</div>
				) : (
					''
				)}
			</div>
		</>
	);
};
