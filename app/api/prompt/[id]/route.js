//create api '/api/prompt/[id]/route' backend end point

import { connectToDB } from "@utils/database";
//import prompt model
//this route will have three different request
//1) GET (read)


import Prompt from '@models/prompt';
//route type  will be GET here (fetching data)
export const GET = async (req, {params}) => {

  try{
    //connect to database
await connectToDB(); //we will connect to db everytime, because it is lambda function and it will die when it done its job
//this will get one specific prompt
const prompt = await Prompt.findById(params.id).populate('creator');

console.log(prompt)
if(!prompt) {
  return new Response("Prompt not found",{server:404});
}

return new Response(JSON.stringify(prompt),{status:200})
  }catch(error){
    return new Response( 'Failed to fetch',{status:500})
  }
}

//2) PATCH(update)
export const PATCH = async (req, {params}) => {
  //get data from frontend
  const {prompt, tag} =await req.json();
  try{
    //connect to database
await connectToDB(); //we will connect to db everytime, because it is lambda function and it will die when it done its job
//find existing prompt  
const existingPrompt = await Prompt.findById(params.id);

if(!existingPrompt) return new Response("Prompt not found", {status:404})

//update th existing data
existingPrompt.prompt = prompt;
existingPrompt.tag = tag;

await existingPrompt.save();

return new Response(JSON.stringify(existingPrompt), {status:200})
  }catch(error){
    return new Response("Failed to update prompt", {status:500})
  }
}
//3 Delete(delete)
export const DELETE = async (req, { params }) => {
  try {
      await connectToDB();

      // Find the prompt by ID and remove it
       await Prompt.findByIdAndDelete(params.id);
    
      return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
      return new Response("Error deleting prompt", { status: 500 });
  }
};