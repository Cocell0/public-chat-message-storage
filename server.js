const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const filePath = path.join(__dirname, 'comments.json');

app.post('/', (req, res) => {
  const comment = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Error saving comment' });
    }

    const comments = data ? JSON.parse(data) : [];
    comments.push(comment);

    fs.writeFile(filePath, JSON.stringify(comments, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).json({ message: 'Error saving comment' });
      }
      console.log('Received and saved comment:', comment);
      res.status(200).json({ message: 'Comment received and saved!' });
    });
  });
});
