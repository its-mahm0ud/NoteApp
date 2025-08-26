import axios from "axios";
const basicURL = "https://note-sigma-black.vercel.app/api/v1/"

export default async function handleRegitserApi(formData) {
    try {
        const data = await axios.post(basicURL + "users/signUp",formData)
        return data;
    } catch (error) {
        return error.response.data.msg;
;
    }

}