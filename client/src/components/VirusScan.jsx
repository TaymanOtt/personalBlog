import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const VirusScan = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });

  const handleScan = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/virus-scan', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setScanResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {
        isDragActive ? <p>Drop the file here ...</p> : <p>Drag and drop a file or click to select</p>
      }

      {selectedFile && (
        <button onClick={handleScan}>Scan File</button>
      )}

      {scanResult && (
        <div>
          <h2>Scan Result:</h2>
          <p>
            {scanResult.result === 'clean' ? (
              <span style={{ color: 'green' }}>File is clean!</span>
            ) : (
              <span style={{ color: 'red' }}>File is infected!</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default VirusScan;