import { createRoot } from 'react-dom/client';
import App from './app'

const appElement = document.getElementById('app');
if (!appElement) throw new Error('Could not find #app element');
const root = createRoot(appElement);
root.render(<App />);
