import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mount the API routes
app.use('/api', apiRoutes);

// Add a root route for health check / welcome message
app.get('/', (req, res) => {
  res.send('Backend Server is running successfully!');
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
