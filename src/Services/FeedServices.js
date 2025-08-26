
import axios from "axios";
const basicURL = "https://note-sigma-black.vercel.app/api/v1/"

export default async function handleAddNoteApi(titleContent, noteContent) {
    try {
        const data = await axios.post(basicURL + "notes", {
            title: titleContent,
            content: noteContent
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;

    } catch (error) {
        return error.response.data.msg;
    }

}
export async function handleGetAllNoteApi() {
    try {
        const data = await axios.get(basicURL + "notes", {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;

    } catch (error) {
        return error.response.data.msg;
    }

}
export async function handleDeleteNoteApi(id) {
    try {
        const data = await axios.delete(basicURL + "notes/" + id, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;

    } catch (error) {
        return error.response.data.msg;
    }

}

export async function handleUpdatingNoteApi(updatingTitle, updatingContent, id) {
    try {
        const data = await axios.put(basicURL + "notes/" + id, {
            title: updatingTitle,
            content: updatingContent
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;

    } catch (error) {
        return error.response.data.msg;
    }

}



