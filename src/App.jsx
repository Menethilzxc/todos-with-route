import { Route, Routes, Navigate } from 'react-router-dom';
import { Main, NotFound, Task } from './components';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/task/:id" element={<Task />} />
			<Route path="/404" element={<NotFound />} />
			<Route path="*" element={<Navigate to="/404" replace={true} />} />
		</Routes>
	);
}

export default App;
