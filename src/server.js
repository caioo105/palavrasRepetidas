import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;

  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) {
      return res.status(500).send('Error reading file');
    }

    // Processa o arquivo usando a função `contaPalavras` e formata a saída
    const resultado = contaPalavras(data);
    const formattedResult = montaSaidaArquivo(resultado);

    // Envia o resultado para o front-end
    res.send(formattedResult);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 