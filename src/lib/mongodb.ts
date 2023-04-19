//configuração usada no adapter para que a conexão seja bem sucedida no auth
import { MongoClient } from "mongodb";

if (!process.env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
}

const uri: string = process.env.DATABASE_URL;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
