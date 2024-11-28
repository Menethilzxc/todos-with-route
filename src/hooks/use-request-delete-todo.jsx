import { useState } from 'react';

export const useRequestDeleteTodo = () => {
	const [isDeleting, setIsDeleting] = useState(false);
	const [deletedTodoId, setDeletedTodoId] = useState(null);

	const requestDeleteTodo = async (id) => {
		try {
			setIsDeleting(true);
			await fetch(`http://localhost:3005/todos/${id}`, {
				method: 'DELETE',
			});
			setDeletedTodoId(id);
		} catch (error) {
			console.error('Ошибка при удалении задачи:', error);
		} finally {
			setIsDeleting(false);
		}
	};

	return { requestDeleteTodo, isDeleting, deletedTodoId };
};
