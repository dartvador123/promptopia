"use client";
import {useEffect, useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id'); //we will get id from page params with search params hook
  //for post submitted or not? loading
const [submitting, setSubmitting] = useState(false);
// for post data
const [post, setPost] = useState({
  prompt:'',
  tag:''
});

useEffect(()=>{
  const getPromptDetails = async () =>{
    //get data of prompt of specific id through calling api endpoint 
    const response = await fetch(`/api/prompt/${promptId}`)
    const data = await response.json();

    setPost({
      prompt:data.prompt, tag:data.tag
    })
  }
//THIS FUNCTION WILL call when prompt id exist
  if(promptId) { getPromptDetails();}

//on evey time change prompt id we will run this function
},[promptId])

const updatePromp =async (e) =>{
  e.preventDefault();
console.log("clicked")

if(!promptId) return alert("Prompt id not found!")
  //call api to send that data
  try {
    const response = await fetch(`/api/prompt/${promptId}`, {
      method: "PATCH",
      body: JSON.stringify({
        prompt: post.prompt,
        tag: post.tag,
      }),
    });

    if (response.ok) {
      router.push("/");
    }

  }catch(error){
    console.log(error)

  } finally {
    //either way turn submitting to false
    setSubmitting(false);
  }


}

  return (
    <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePromp}/>
    
  )
}

export default UpdatePrompt