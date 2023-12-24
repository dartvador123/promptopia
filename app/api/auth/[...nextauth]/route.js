//setup nextAuth configuration
import nextAuth from "next-auth";
 import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";


 // we need to register app with the provider and get credentials (client ID and secret).
const handler = nextAuth({



  providers:[
    GoogleProvider({
      clientId:process.env.GOOGLE_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,

 })
  ],

  callbacks:{

    async session ({session}){ // The session object contains information about the authenticated user,
      //after signin we will have a data to keep session running
       
      const sessionUser = await User.findOne({
        email: session.user.email
      })
  
      //// store the user id from MongoDB to session
      session.user.id = sessionUser._id.toString();

      return session;
  
    },
    async signIn ({profile}){ //pass the provider id as an argument
      // Use the signIn()  functions provided by NextAuth to handle user authentication.
      try{
            //all nextjs route are serverless route which makes it lambda function, that open up only when get call, when call it spins up and make connection with database
  
            await connectToDB();
  
            //check if user already exist through email
            const userExists =  await User.findOne({
              email: profile.email
            })
  
            //if not create a new user
            if(!userExists){
              await User.create({
                email: profile.email,
                username: profile.name.replace(" ", "").toLowerCase(),
                image: profile.picture,
              });
            }
  
            return true;
  
      }catch(error){
        console.log(error)
        return false;
  
      }
  
    }

  },


  
 })

 export {handler as GET, handler as POST};