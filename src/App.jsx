import { useEffect, useState } from 'react';
import { connectApi } from './api/connect';

function App() {
  const [validators, setValidators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadValidators = async () => {
      try {
        const api = await connectApi();
        const entries = await api.query.staking.validators.entries();

        const data = entries.map(([key, exposure]) => {
          const validatorId = key.args[0].toString();
          const commission = exposure.unwrap().commission.toHuman();
          return { validatorId, commission };
        });

        setValidators(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading validators:', err);
        setLoading(false);
      }
    };

    loadValidators();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Avail Validators</h1>
      {loading ? (
        <p>Loading validators...</p>
      ) : (
        <ul className="space-y-4">
          {validators.map((val, idx) => (
            <li key={idx} className="p-4 bg-gray-100 rounded-lg shadow">
              <p><strong>Validator:</strong> {val.validatorId}</p>
              <p><strong>Commission:</strong> {val.commission}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

