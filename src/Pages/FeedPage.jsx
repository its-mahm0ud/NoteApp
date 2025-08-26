import React, { useEffect, useState } from 'react'
import NavbarComponent from '../Components/NavbarComponent'
import ModalComponent from '../Components/ModalComponent'
import { handleGetAllNoteApi } from '../Services/FeedServices';
import DisplayNotes from '../Components/DisplayNotes';
import BackGroundImage from '../Components/BackGroundImage';


export default function FeedPage() {

  const [allNotes, setAllNotes] = useState(null)
  const [isNotes, setIsNotes] = useState(true)


  async function getAllNotes() {
    const res = await handleGetAllNoteApi();
    setAllNotes(res.data?.notes)

    if (res == "not notes found") {
      setIsNotes(false)

    }

  }
  useEffect(() => {
    getAllNotes();

  }, [])
  return (
    <>
      <NavbarComponent />
      <ModalComponent setIsNotes={setIsNotes} getAllNotes={getAllNotes} />
      {
        isNotes ? allNotes?.map((note) => <DisplayNotes  getAllNotes={getAllNotes} key={note._id} id={note._id} title={note.title} content={note.content} />) : <BackGroundImage />
      }
    </>
  )
}


























































































// import React, { useState } from 'react'
// import NavbarComponent from '../Components/NavbarComponent'
// import { Button, Textarea, Input } from '@heroui/react'

// export default function FeedPage() {
//   const [titleContent, setTitleContent] = useState("")
//   const [noteContent, setNoteContent] = useState("")



//   return (
//     <div >
//       <NavbarComponent />
//       <div className='flex'>
//         <Button className=' mx-auto bg-amber-300 mt-3'>Add Note</Button>
//       </div>
//       <div className=' w-full h-[60%] absolute z-50 left-50 right-50 top-30 p-12  bg-[#f3f4f6]  mx-auto mt-4'>
//         <form className='w-1/2 mt-3 flex flex-col  mx-auto  gap-4'>
//           <Input value={titleContent} onChange={(e) => setTitleContent(e.target.value)} label="Title to your note" type="text" variant="bordered" />
//           <Textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} className="" label="Your note" />

//         </form>
//       </div>



//     </div>
//   )
// }
