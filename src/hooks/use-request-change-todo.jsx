import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const useRequestChangeTodo = (
	todoText,
	refreshTodo,
	setCurrentTodo,
	setTodoText,
	setErrorParagraph,
) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const { id } = useParams();

	console.log(typeof todoText);

	const requestChangeTodo = () => {
		if (!todoText.trim()) {
			setErrorParagraph(true);
			return;
		}

		setIsUpdating(true);
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todoText,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setCurrentTodo(response);
				setTodoText(response);
				setErrorParagraph();
			})
			.finally(() => {
				setIsUpdating(false);
				setErrorParagraph(false);
			});
	};
	return { requestChangeTodo, isUpdating };
};
