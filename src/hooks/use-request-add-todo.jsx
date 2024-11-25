import { useState } from 'react';
export const useRequestAddTodo = (
	setErrorParagraph,
	todoText,
	refreshTodo,
	setTodoText,
) => {
	const [isCreating, setIsCreating] = useState(false);
	const requestAddTodo = () => {
		if (!todoText.trim()) {
			setErrorParagraph(true);
			return;
		}
		setIsCreating(true);
		fetch('http://localhost:3005/todos', {
			method: 'POST',
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
			})
			.finally(() => {
				setIsCreating(false);
				setErrorParagraph(false);
			});
	};
	return { requestAddTodo, isCreating };
};
