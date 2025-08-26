import React, { useState } from 'react'
import { Button, Checkbox, Input, Textarea } from '@heroui/react';
import { handleDeleteNoteApi, handleUpdatingNoteApi } from '../Services/FeedServices';
import Swal from 'sweetalert2';
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export default function DisplayNotes({ title, content, id, getAllNotes }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isUpdatingMood, setIsUpdatingMood] = useState(false);
    const [updatingTitle, setUpdatingTitle] = useState(title);
    const [updatingContent, setUpdatingContent] = useState(content);
    function confirmDelete() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: " mx-1 text-white px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition-all",
                cancelButton: "mx-1 text-white px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 transition-all"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteNote();
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }
    async function handleDeleteNote() {
        setIsDeleting(true)
        const res = await handleDeleteNoteApi(id)
        if (res.data?.msg == "done") {
            setIsDeleting(false)
            getAllNotes();
        }
        console.log(res)
    }
    async function handleUpdating() {
        setIsUpdating(true)
        const res = await handleUpdatingNoteApi(updatingTitle, updatingContent, id)
        if (res.data?.msg == "done") {
            setIsUpdating(false)
            Toastify({
                position: "center",
                text: "Your note already Updated",
                duration: 2300
            }).showToast();
            await getAllNotes();
            setIsUpdatingMood(false)
        }
    }
    return (
        <div className='mt-6 mb-6 relative flex  justify-between containe w-[95%] md:w-[80%] mx-auto  bg-gray-200 hover:bg-gray-300 transition-all rounded-xl shadow-md'>
            <div className='flex  mx-auto' >
                {isUpdatingMood ?
                    <>
                        <div className='flex max-sm:me-20 flex-col gap-2'>
                            <Input value={updatingTitle} onChange={(e) => setUpdatingTitle(e.target.value)} label="Title to your note" type="text" variant="bordered" />
                            <Textarea value={updatingContent} onChange={(e) => setUpdatingContent(e.target.value)} className="h-15" label="Your note" />
                        </div>
                        <div className=' max-sm:right-1 max-sm:flex-col flex gap-2 absolute right-55 bottom-1' >
                            <Button onPress={() => setIsUpdatingMood(false)} color='default'>Cancle</Button>
                            <Button isLoading={isUpdating} onPress={handleUpdating} color='success'>Updating</Button>
                        </div>

                    </>
                    :
                    <>
                        <Checkbox className='absolute max-sm:left-5 left-20 top-10' defaultSelected color="success">Done?</Checkbox>
                        <div className='flex flex-col'>
                            <h1 className=' p-3'>{title}</h1>
                            <p className=' text-gray-700 p-3'>{content}</p>
                        </div>
                    </>
                }
            </div>
            {!isUpdatingMood && <div className='flex max-sm:flex-col gap-2 absolute right-2 bottom-0' >
                <Button onPress={() => setIsUpdatingMood(true)} color='success'>Update</Button>
                <Button isLoading={isDeleting} onPress={confirmDelete} color='danger'>Delete</Button>
            </div>}
        </div>
    )
}
