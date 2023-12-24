'use client'
import PromptCard from "./PromptCard"

const PromptCardList=({data, handleEdit,handleDelete})=>{
  return (
    <div className='mt-10 prompt_layout'>
      {data.map((post) => (
         <PromptCard key={post._id} post={post} handleEdit={() => {handleEdit && handleEdit(post)}} handleDelete={() => handleDelete && handleDelete(post)}/>
      ))}
    </div>
  )

}

const Profile = ({name,
desc,
data,
handleEdit,
handleDelete}) => {

  console.log('profile', data)
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {name} Profile </span></h1>
        <p className="desc text-left">{desc}</p>
    <PromptCardList data={data} handleDelete={handleDelete} handleEdit={handleEdit}/>
      
    </section>
  )
}

export default Profile