import './App.css';
import User from './getuser/User';
import AddUser from './adduser/AddUser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Виправлено ім'я функції
import Update from './updateuser/Update';

function App() {
  const router = createBrowserRouter([ // Виправлено ім'я змінної
    { path: '/', element: <User /> },
    { path: '/add', element: <AddUser /> },
    { path: '/update/:id', element: <Update/>},
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider> {/* Виправлено структуру */}
    </div>
  );
}

export default App;
