'use client'
import React from 'react'
import Feed from '@components/Feed';
import { useSession } from 'next-auth/react';

const Home = () => {
  const {data:session} = useSession();
  return (
    <div>
      {session? ( <section className='w-full flex-center flex-col'>
      <h1  className='head_text text-center'>
        Discover & Share
        <br className='max-md-hidden'/>
        <span className='orange_gradient text-center'> AI-Powered Prompts </span>
      </h1>

      <p className='desc text-center'>
        Promptopia is an open-source AI Prompting tool for modern world to discover, create  and share creative prompts
      </p>

      {/*FEED COMPONENT*/}
      <Feed/>

    </section>): ( <section className='w-full flex-center flex-col'>
      <h1  className='head_text text-center'>
        Discover & Share
        <br className='max-md-hidden'/>
        <span className='orange_gradient text-center'> AI-Powered Prompts </span>
      </h1>

      <p className='desc text-center'>
        Promptopia is an open-source AI Prompting tool for modern world to discover, create  and share creative prompts
      </p>
    </section>)}
    </div>

    

   
  )
}

export default Home;