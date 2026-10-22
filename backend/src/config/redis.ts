import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        console.warn('Redis unavailable. Proceeding without caching.');
        return false; // Stop infinite reconnect loop spam
      }
      return 1000;
    },
  },
});

redisClient.on('error', (err) => {
  // Silent warning instead of spamming AggregateError
});