import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { pool } from './config/db';
import { redisClient } from './config/redis';
import turnaroundRoutes from './routes/turnaround.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', turnaroundRoutes);

const bootstrap = async () => {
  try {
    // Attempt Redis connection gracefully
    try {
      await redisClient.connect();
      console.log('Connected to Redis Cache Engine');
    } catch {
      console.warn('Redis not reachable. Dashboard will serve directly from PostgreSQL.');
    }

    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf-8');
      await pool.query(schema);
      console.log('PostgreSQL schema applied successfully');
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Ops Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

bootstrap();