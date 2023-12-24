"use client"
import React, {useState, useEffect} from 'react'
import PromptCard from './PromptCard'


//create another component to create list  of prompts 
const PromptCardList=({data, handleTagClick})=>{
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
         <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
      ))}
    </div>
  )

}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(()=>{

    //get request call api
    const fetchPosts = async () =>{
      const response = await fetch ('/api/prompt');
      const data = await response.json();

      setAllPosts(data);
  
    }
    fetchPosts();
  },[])

  const filterPrompts = (searchtext) => {
    //In this code, searchtext is the string you want to search for, and "i" is the flag indicating that the search should be case-insensitive
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
   // if you want to check if a string contains a certain word regardless of case, you could use the test() method
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method use to filter the prompts half a second after the user stops typing
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      {/* Search of feed */}
      <form className='relative w-full flex-center'>
        <input type='text' placeholder='Search for tag or a username...' value={searchText} onChange={handleSearchChange} required className='search_input peer'>
        </input>

      </form>
       {/* All Prompts */}
       {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) :( <PromptCardList data={allPosts} handleTagClick={handleTagClick}/>)}
     
    </section>
  )
}

export default Feed