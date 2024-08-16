const net = require('net');

const scanPort = (host, port) => {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);

    socket.on('connect', () => {
      socket.destroy();
      resolve({ port, status: 'open' });
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve({ port, status: 'closed' });
    });

    socket.on('error', () => {
      socket.destroy();
      resolve({ port, status: 'closed' });
    });

    socket.connect(port, host);
  });
};

const scanPorts = async (host, startPort, endPort) => {
  const results = [];
  for (let port = startPort; port <= endPort; port++) {
    const result = await scanPort(host, port);
    results.push(result);
  }
  return results;
};

module.exports = { scanPorts };
