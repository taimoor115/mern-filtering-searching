import mongoose from "mongoose";

const connectDatabase = async (mongoUrl) => {
  try {
    const connectionInstance = await mongoose.connect(`${mongoUrl}/searching`);

    console.log(
      `\n Mongo Connected!! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongo Error", error);
    process.exit(1);
  }
};

export default connectDatabase;
