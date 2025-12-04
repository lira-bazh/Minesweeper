import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/components';
import { store } from '@/store';
import App from './App.tsx'
import './styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
);
