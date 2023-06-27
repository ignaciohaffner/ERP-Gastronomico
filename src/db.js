import mongoose from "mongoose"

export const connectdb = async () => {
    try {
        await mongoose.connect('mongodb+srv://ignaciohaffner:Dy7DvTzBL7M8Kdrg@cluster0.vyyfv8z.mongodb.net/?retryWrites=true&w=majority')
        console.log(">>> DB CONECTADA MOSTRO")
    } catch (error) {
        console.log(error)
    }
}


