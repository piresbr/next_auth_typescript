//função exportada para conectar ao banco de dados
import mongoose from "mongoose";

// https://stackoverflow.com/questions/75206870/nextjs-mongoose-mongo-atlas-multiple-connections-even-with-caching

if (!process.env.DATABASE_URL) {
  throw new Error(
    "A conexão com seu banco de dados não foi encontrada. Cheque suas configurações e tente novamente. "
  );
}

const DATABASE_URL: string = process.env.DATABASE_URL;

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(DATABASE_URL, options)
      .then((mongoose) => {
        console.log("Conexão feita com sucesso ");
        return mongoose;
      })
      .catch((error) => {
        console.log(error as Error);
        return;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export default connectDb;
