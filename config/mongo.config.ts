export default async function getMongoConfig(uri: string) {
  return {
    uri,
    dbName: process.env.MONGO_DB_NAME,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    authSource: process.env.MONGO_AUTH_SOURCE
  };
}
