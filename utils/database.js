import mongoose from "mongoose";
let isConnected =false; //track the connection

export const connectToDB = async () => {
  //setup mongoose
  mongoose.set('strictQuery', true); //set mongoose options

  if(isConnected) {
    console.log('MongoDB is already Connected');
    return;
  }

  //if not connected
  try{
    //try to stablish the connection            //options object
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName:'share_prompt'
    })

    isConnected=true;

    console.log("MongoDB is Connected");

  }catch(error){
    console.log(error)
  }
}