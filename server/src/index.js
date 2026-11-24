import dns from 'node:dns';
import mongoose from 'mongoose';
import app from './app.js';
import { env } from './config/env.js';
dns.setServers(['8.8.8.8', '1.1.1.1']);

const start = async () => {
  await mongoose.connect(env.mongoUri);
  console.log('Connected to MongoDB');
  app.listen(env.port, () => {
    console.log(`Server is running at http://localhost:${env.port}`);
  });
};
start().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});