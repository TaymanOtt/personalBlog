import React, { useState } from 'react';
import axios from 'axios';

const PortScanner = () => {
  const [host, setHost] = useState('');
  const [startPort, setStartPort] = useState('');
  const [endPort, setEndPort] = useState('');
  const [results, setResults] = useState([]);

  const handleScan = async () => {
    const confirmation = window.confirm(
      "This port scanner is for educational purposes only and should be used within the bounds of the law. Do you agree to use it responsibly?"
    );

    if (!confirmation) {
      return; // User did not confirm, cancel the scan
    }

    try {
      const response = await axios.post('/api/scan', { host, startPort, endPort });
      setResults(response.data);
    } catch (error) {
      console.error('Error scanning ports', error);
    }
  };

  return (
    <div>
      <h1>Port Scanner</h1>
      <input
        type="text"
        placeholder="Host"
        value={host}
        onChange={(e) => setHost(e.target.value)}
      />
      <input
        type="number"
        placeholder="Start Port"
        value={startPort}
        onChange={(e) => setStartPort(e.target.value)}
      />
      <input
        type="number"
        placeholder="End Port"
        value={endPort}
        onChange={(e) => setEndPort(e.target.value)}
      />
      <button onClick={handleScan}>Scan</button>
      <ul>
        {results.map((result) => (
          <li key={result.port}>{`Port ${result.port}: ${result.status}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default PortScanner;
