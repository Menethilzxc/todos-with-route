import { useState } from 'react';
export const useRequestChangeTodo = (
	setErrorParagraph,
	todoText,
	selectedTodoId,
	refreshTodo,
	setTodoText,
	setSelectedTodoId,
) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const requestChangeTodo = () => {
		if (!todoText.trim()) {
			setErrorParagraph(true);
			return;
		}
		if (!selectedTodoId) {
			setErrorParagraph(true);
			return;
		}
		setIsUpdating(true);
		fetch(`http://localhost:3005/todos/${selectedTodoId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todoText,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				refreshTodo();
				setTodoText('');
				setErrorParagraph();
				setSelectedTodoId(null);
			})
			.finally(() => {
				setIsUpdating(false);
				setErrorParagraph(false);
			});
	};
	return { requestChangeTodo, isUpdating };
};
