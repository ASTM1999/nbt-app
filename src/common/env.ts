// env.ts
export default () => ({
  // Add your own properties here however you'd like
  // port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_URL,
    // port: parseInt(process.env.DATABASE_URL, 10) || 5432
  }
});