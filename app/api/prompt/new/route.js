//create api '/api/propmt/new/ route

import { connectToDB } from "@utils/database";
//import prompt model
import Prompt from '@models/prompt';
//route type  will be POST here (sending data)

export const POST = async (req) => {
  //first we will grab the things we have passed through post request (from front end)
  const {userId, prompt, tag} = await req.json();

  try{
    //connect to database
await connectToDB(); //we will connect to db everytime, because it is lambda function and it will die when it done its job
const newPrompt = new Prompt({creator: userId, prompt, tag})

await newPrompt.save(); //save to database


return new Response(JSON.stringify(newPrompt), {
  status: 201
})

  }catch(error){
    return new Response('failed to create new Prompt' , {status:500
  })
  }

  
}