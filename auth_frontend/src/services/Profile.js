import api from "./api";

export async function getProfile() {

    const token = localStorage.getItem("access");

    const response = await api.get("profile/",{

        headers:{
            Authorization:`Bearer ${token}`
        }

    });

    return response.data;

}