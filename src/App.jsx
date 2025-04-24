import { useEffect, useState } from 'react';
import { connectToAvail } from './api/avail';
import './App.css';

function App() {
  const [validators, setValidators] = useState([]);

  useEffect(() => {
    let interval;

    const fetchValidators = async () => {
      try {
        const api = await connectToAvail();
        const validatorAddresses = await api.query.session.validators();
        setValidators(validatorAddresses.map((addr) => addr.toString()));
      } catch (err) {
        console.error("Failed to fetch validators:", err);
      }
    };

    fetchValidators(); // initial load
    interval = setInterval(fetchValidators, 15000); // refresh every 15s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">✅ Active Avail Validators</h1>
      {validators.length === 0 ? (
        <p>Loading validators...</p>
      ) : (
        <ul className="space-y-2">
          {validators.map((val, index) => (
            <li
              key={index}
              className="bg-gray-800 p-3 rounded font-mono text-sm break-all"
            >
              {val}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

