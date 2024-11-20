import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Required to work with `import.meta.url`
import employeeRoutes from './router/router.js';
import cors from 'cors';
import { Connectdb } from './dbconnection/db.js';
import userRoutes from './login/user.js';
import fs from 'fs';
const app = express();


app.get('/uploads', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Unable to read directory' });
    }

    res.status(200).json({ success: true, files });
  });
});

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url); // Get the file path
const __dirname = path.dirname(__filename);       // Get the directory path

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api/details', employeeRoutes);
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  console.log('Request File:', req.file);
  next();
});
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, async () => {
  console.log(`Server starting on port ${PORT}`);
  
  try {
    await Connectdb();
    console.log('Database connected successfully');
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1); // Exit if there's an error
  }
});
