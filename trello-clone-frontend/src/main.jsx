import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './App.jsx';
import store from './redux/store';
import './index.css';

console.log('Main.jsx: Mounting app');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
        <div style={{ position: 'fixed', bottom: 10, right: 10, color: 'red' }}>
          Debug: App should be visible above
        </div>
      </DndProvider>
    </Provider>
  </React.StrictMode>
);

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});