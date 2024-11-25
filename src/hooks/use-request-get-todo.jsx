import { useEffect, useState } from 'react';
export const useRequestGetTodo = (
	refreshTodoFlag,
	sortByAlphabet,
	searchTodo,
	sortTodos,
	filterTodos,
) => {
	const [loader, setLoader] = useState(false);
	const [todos, setTodos] = useState([]);
	const [sortedTodos, setSortedTodos] = useState([]);
	useEffect(() => {
		setLoader(true);
		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
				let tempSortedTodos = sortByAlphabet
					? sortTodos(loadedTodos)
					: loadedTodos;
				setSortedTodos(tempSortedTodos);
				filterTodos(searchTodo, tempSortedTodos);
			})
			.finally(() => setLoader(false));
	}, [refreshTodoFlag, sortByAlphabet, searchTodo]);

	return { loader, sortedTodos };
};
