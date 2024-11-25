import { useState } from 'react';
export const useRequestDeleteTodo = (refreshTodo, setSelectedTodoId, selectedTodoId) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const requestDeleteTodo = () => {
		setIsDeleting(true);
		fetch(`http://localhost:3005/todos/${selectedTodoId}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				refreshTodo();
				setSelectedTodoId(null);
			})
			.finally(() => {
				setIsDeleting(false);
			});
	};
	return { requestDeleteTodo, isDeleting };
};
