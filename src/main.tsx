import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter App</h1>
      <div style={{ fontSize: '48px', margin: '20px' }}>{count}</div>
      <button onClick={() => setCount(count - 1)} style={{ fontSize: '18px', margin: '0 10px', padding: '10px 20px' }}>-</button>
      <button onClick={() => setCount(count + 1)} style={{ fontSize: '18px', margin: '0 10px', padding: '10px 20px' }}>+</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
