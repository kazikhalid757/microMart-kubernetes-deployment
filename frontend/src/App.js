import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/users').then(res => setUsers(res.data));
    axios.get('/api/products').then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>MicroMart Dashboard</h1>

      <h2>Users</h2>
      <ul>{users.map(u => <li key={u.id}>{u.name} - {u.email}</li>)}</ul>

      <h2>Products</h2>
      <ul>{products.map(p => <li key={p.id}>{p.name} - ${p.price}</li>)}</ul>
    </div>
  );
}

export default App;
