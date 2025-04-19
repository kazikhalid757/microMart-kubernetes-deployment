import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch users
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('❌ Error fetching users:', err));

    // Fetch products
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('❌ Error fetching products:', err));
  }, []);

  return (
    <div className="App">
      <h1>Micromart Dashboard</h1>

      <h2>🧍 Users</h2>
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user.name} ({user.email})</li>
        ))}
      </ul>

      <h2>🛒 Products</h2>
      <ul>
        {products.map((product, i) => (
          <li key={i}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
