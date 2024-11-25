import { useState } from 'react';
import {
	useRequestGetTodo,
	useRequestAddTodo,
	useRequestChangeTodo,
	useRequestDeleteTodo,
} from './hooks';
import styles from './App.module.css';

function App() {
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
	const { requestChangeTodo, isUpdating } = useRequestChangeTodo(
		setErrorParagraph,
		todoText,
		selectedTodoId,
		refreshTodo,
		setTodoText,
		setSelectedTodoId,
	);
	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(
		refreshTodo,
		setSelectedTodoId,
		selectedTodoId,
	);

	return (
		<>
			<div className={styles.app}>
				<h1>Todo list</h1>
				{errorParagraph ? (
					<p style={{ color: 'red' }}>Поле не должно быть пустым</p>
				) : (
					''
				)}
				<input
					type="text"
					name="text"
					value={todoText}
					placeholder="Введите название дела"
					onChange={onChange}
				/>
				<div className={styles.crud}>
					<button onClick={requestAddTodo} disabled={isCreating}>
						Добавить дело
					</button>
					<button onClick={requestChangeTodo} disabled={isUpdating}>
						Изменить дело
					</button>
					<button
						onClick={requestDeleteTodo}
						disabled={!selectedTodoId || isDeleting}
					>
						Удалить дело
					</button>
				</div>
				<div className={styles.sortButton}>
					<button onClick={toggleSortByAlphabet}>
						{sortByAlphabet ? 'Отключить сортировку' : 'Включить сортировку'}
					</button>
				</div>
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
							<li
								key={todo.id}
								onClick={() => selectTodo(todo.id)}
								style={{
									background: selectedTodoId === todo.id ? 'white' : '',
									color: selectedTodoId === todo.id ? 'black' : '',
								}}
							>
								<span>{index + 1}.</span>
								{todo.title}
							</li>
						))
					)}
				</ol>
			</div>
		</>
	);
}

export default App;
