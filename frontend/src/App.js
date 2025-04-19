import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/products')
        ]);

        console.log("Users API response:", usersRes.data);
        console.log("Products API response:", productsRes.data);

        setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
        setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
      } catch (err) {
        setError('Error fetching data');
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Micromart Dashboard</h1>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="content">
        <h2>🧍 Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map((user, i) => (
              <li key={i}>{user.name} ({user.email})</li>
            ))}
          </ul>
        )}

        <h2>🛒 Products</h2>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ul>
            {products.map((product, i) => (
              <li key={i}>{product.name} - ${product.price}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
