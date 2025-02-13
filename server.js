// npm install express body-parser cors
// node server.js
// npm install multer

import express from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";


const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

// Endpoint pour récupérer les données
app.get('/data', (req, res) => {
  fs.readFile('./public/data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Failed to read data file' });
    }
    try {
      const jsonData = data.trim() ? JSON.parse(data) : {};  // Vérifie si le fichier est vide
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// Configurer multer pour stocker les fichiers dans /public/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ imageUrl: `uploads/${req.file.filename}` });
});

app.post("/save-json", (req, res) => {
  const filePath = path.join(__dirname, "public/data.json");
  
  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.error("Erreur de sauvegarde :", err);
      return res.status(500).send("Erreur d'écriture du fichier");
    }
    res.send("Données sauvegardées !");
  });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
