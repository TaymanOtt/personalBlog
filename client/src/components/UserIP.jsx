import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserIP = () => {
  const [ip, setIP] = useState('');
//uses axios to get user IP address
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIP(response.data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIP();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Your IP Address:</h1>
      <p className="text-lg">{ip}</p>
    </div>
  );
};

export default UserIP;
