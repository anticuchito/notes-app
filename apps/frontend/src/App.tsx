import { RouterProvider } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { router } from './routes';
import { store } from './store/store';
import { Provider } from 'react-redux';

const App = () => {
  useAuth(); // Verifica el token al montar la aplicación
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
