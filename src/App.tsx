import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/home';
import { Layout } from './layout';
import { CreateUser } from './pages/createUser';
import { EditUser } from './pages/editUser';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/create",
        element: <CreateUser />,
      },
      {
        path: "/:id",
        element: <EditUser />,
      },
    ]
  }
]);

const App = () => <RouterProvider router={router} />

export default App