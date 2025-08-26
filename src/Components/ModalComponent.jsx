import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, } from "@heroui/react";
import handleAddNoteApi from '../Services/FeedServices';
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export default function ModalComponent({ getAllNotes, setIsNotes }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = useState("blur");
    const [titleContent, setTitleContent] = useState("")
    const [noteContent, setNoteContent] = useState("")
    const [isAdding, setIsAdding] = useState(false)

    const backdrops = ["blur"];
    const handleOpen = (backdrop) => {
        setBackdrop(backdrop);
        onOpen();
    };

    async function handleNoteSubmit() {
        setIsAdding(true)
        const res = await handleAddNoteApi(titleContent, noteContent);
        if (res.data?.msg == "done") {
            setIsNotes(true)
            setIsAdding(false)
            Toastify({
                position: "center",
                text: "Your note has been added",
                duration: 2300
            }).showToast();
            await getAllNotes();
            setTimeout(() => {
                onClose()
            }, 600);
            setTitleContent("")
            setNoteContent("")


        }
    }

    return (
        <>
            <div>

                <div className='w-fit mt-3 mx-auto'>
                    <div>
                        <div className="flex flex-wrap gap-3">
                            {backdrops.map((b) => (
                                <Button
                                    key={b}
                                    className="capitalize"
                                    color="warning"
                                    variant="flat"
                                    onPress={() => handleOpen(b)}
                                >
                                    Add Note
                                </Button>
                            ))}
                        </div>
                        <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Add Your Note</ModalHeader>
                                        <ModalBody>
                                            <Input value={titleContent} onChange={(e) => setTitleContent(e.target.value)} label="Title to your note" type="text" variant="bordered" />
                                            <Textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} className="" label="Your note" />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Cancel
                                            </Button>
                                            <Button isLoading={isAdding} color="primary" onPress={handleNoteSubmit} >
                                                Add
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                </div>


            </div>

        </>
    )
}
