"use client";
import React from 'react'
import Link from 'next/link'  //this will help to move us to other pages of application
import Image from 'next/image' //automatically optomize images for us
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'


const Nav = () => {  

//usesession hook to get current user data
  const {data : session} = useSession();   

  const [provider, setProvider] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(()=>{
    //this will allow sign in using goolgle and next auth
    const setupProvider = async () =>{
      const response = await getProviders();

      setProvider(response);
    }
    setupProvider();

  },[])

  //The <nav> tag defines a set of navigation links.
  return (

    <nav className='flex-between w-full mn-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
        src="/assets/images/logo.svg"
        alt='promptopia Logo'
        width={30}
        height={30}
        className='object-contain'
        />
        <p className='logo_text'> Propmtopia </p>
      </Link>

      {/* MOBILE NAVIGATION, //sessio?.user ? to check if user exist in session */}
      
      <div className='sm:flex hidden'>
        {session?.user ? (<div className='flex gap-3 md:gap-5 '> 
        <Link href="/create-prompt" className='black_btn'> Create Post </Link>
        <button type='button' onClick={signOut} className='outline_btn' > SignOut </button>

        <Link href="/profile" > 
        <Image src={session?.user.image} className='rounded-full' width={37} height={37} alt='profile'/>
         </Link>
        </div>):(<>
        {provider && Object.values(provider).map((provider) => (
          <button type='button' key={provider.name} onClick={()=> signIn(provider.id)} className='black_btn'> SignIn </button>
        ))}

        </>)}
      </div>
          {/* MOBILE NAVIGATION */}

          <div className='sm-hidden flex relative'>
            { session?.user ? (<div className='flex '> 
            <Image
        src={session?.user.image}
        alt='promptopia Logo'
        width={37}
        height={37}
        className='rounded-full'
        onClick={()=>{setToggleDropdown((prev) => !(prev))}}
        /> 
        {toggleDropdown && (
          <div className='dropdown'>
            <Link href="/profile" className='droptown_link' onClick={()=>{setToggleDropdown(false)}}>
              My Profile
            </Link>

            <Link href="/create-prompt" className='droptown_link' onClick={()=>{setToggleDropdown(false)}}>
              Create Prompt
            </Link>
           <button type='button' onClick={()=>{setToggleDropdown(false); signOut(); }} className='mt-5 w-full black_btn'>
            SignOut
           </button>

            </div>
        ) }

        

            </div>) : (<>
        {provider && Object.values(provider).map((provider) => (
          <button type='button' key={provider.name} onClick={()=> signIn(provider.id)} className='black_btn'> SignIn </button>
        ))}

        </>) }

          </div>
    </nav>
    
  )
}

export default Nav