import mongoose from "mongoose";
export const Connectdb=async()=>{
    try{
    const conn=await mongoose.connect('mongodb+srv://rohithsunkari1004:Richie%40_1102@cluster0.zc7ie.mongodb.net/employeeinfo')
    console.log(`connected ${conn.connection.host}`)
    }catch(error){
        console.log(`error,${error.message}`)
    }
}