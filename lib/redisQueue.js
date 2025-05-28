import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

const connection = new Redis();

export const resultQueue = new Queue('resultQueue', { connection });
