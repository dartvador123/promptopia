"use client";
import {useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const {data : session} = useSession();
  //for post submitted or not? loading
const [submitting, setSubmitting] = useState(false);
// for post data
const [post, setPost] = useState({
  prompt:'',
  tag:''
});

const CreatePromp =async (e) =>{
  e.preventDefault();
console.log("clicked")
  //call api to send that data
  try {
    const response = await fetch("/api/prompt/new", {
      method: "POST",
      body: JSON.stringify({
        prompt: post.prompt,
        userId: session?.user.id,
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
    <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={CreatePromp}/>
    
  )
}

export default CreatePrompt