//create api '/api/prompt/route'

import { connectToDB } from "@utils/database";
//import prompt model
import Prompt from '@models/prompt';
//route type  will be GET here (fetching data)
export const GET = async (req) => {

  try{
    //connect to database
await connectToDB(); //we will connect to db everytime, because it is lambda function and it will die when it done its job
//find all prompts and with creator init
const prompts = await Prompt.find({}).populate('creator');

return new Response(JSON.stringify(prompts),{status:200})
  }catch(error){
    return new Response( 'Failed to fetch',{status:500})
  }
}