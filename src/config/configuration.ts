export default () => {
  if (!process.env.PORT) {
    console.error(process.env);
    throw new Error(`Env variable PORT required but not found.`);
  }

  return {
    port: parseInt(process.env.PORT, 10),
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
  };
};
