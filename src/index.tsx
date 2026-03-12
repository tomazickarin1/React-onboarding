import { createRoot } from 'react-dom/client';

const appElement = document.getElementById('app');
if (!appElement) throw new Error('Could not find #app element'); // 
const root = createRoot(appElement);
root.render(<h1>Hello, world</h1>);
