require('dotenv').config();
const { Worker } = require('bullmq');
const { calculateResult } = require('@/utlis/calculateResult');

const connection = {
  connection: {
    host: process.env.UPSTASH_REDIS_REST_URL,
    port: process.env.UPSTASH_REDIS_REST_PORT,
    password: process.env.UPSTASH_REDIS_REST_TOKEN,
  },
};

const worker = new Worker(
  'resultQueue',
  async (job) => {
    const { submissionId } = job.data;
    console.log(`Processing submission: ${submissionId}`);
    try {
      await calculateResult(submissionId);
      console.log(`Result calculated for submission ${submissionId}`);
    } catch (err) {
      console.error(`Failed to process submission ${submissionId}:`, err);
      throw err;
    }
  },
  connection
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});
