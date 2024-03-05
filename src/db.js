import mongoose from "mongoose";

export const connectdb = async () => {
  console.log("intento conectar a la bdd");
  try {
    console.log("antes del await");
    await mongoose.connect(
      "mongodb+srv://ignaciohaffner:Dy7DvTzBL7M8Kdrg@cluster0.vyyfv8z.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(">>> DB CONECTADA");
  } catch (error) {
    console.log(error);
  }
};
