import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Add custom styles for better UI

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    // Fetch users
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(err => setError('Error fetching users'))
      .finally(() => setLoading(false));  // Set loading to false after request finishes

    // Fetch products
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => setError('Error fetching products'))
      .finally(() => setLoading(false));  // Set loading to false after request finishes
  }, []);

  return (
    <div className="App">
      <h1>Micromart Dashboard</h1>
      
      {loading && <p>Loading data...</p>}  {/* Display loading message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message if there was an error */}

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
