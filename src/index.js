import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import NoteApp from './App';
// import App from './App';
import './styles/style.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    {/* <App /> */}
    <NoteApp/>
  </BrowserRouter>
);
