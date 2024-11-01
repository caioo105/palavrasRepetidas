import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  // Manipula o evento de seleção de arquivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Manipula o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data); // Define o resultado do processamento
    } catch (error) {
      console.error('Error uploading file:', error);
      setResult('Error uploading file');
    }
  };

  return (
    <div>
      <h2>Upload Text File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".txt" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {result && (
        <div>
          <h3>Processing Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
