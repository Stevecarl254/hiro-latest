import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const options = {};

// Extend globalThis to include our client promise
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, options);
  globalThis._mongoClientPromise = client.connect();
}

clientPromise = globalThis._mongoClientPromise;

export default clientPromise;