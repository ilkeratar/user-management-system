import {create} from "zustand";

const API_BASE_URL = 'http://localhost:8000';

export const useAuthStore=create((set)=>({
    user:localStorage.getItem('user') || null,
    isLoading:false,
    error:null,
    signUpFetch: async(email,password) =>{
        set({isLoading:true})

        const response=await fetch(`${API_BASE_URL}/auth/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email,password}),
        })

        const json=await response.json()
        if(!response.ok){
            set({isLoading:false});
            set({error:json.error});
        }
        if(response.ok){
            localStorage.setItem("token",JSON.stringify(json.access_token));
            localStorage.setItem('user', json);
            set({isLoading:false});
            set({user:json});
            set({error:null});
        }
    },
    loginFetch: async (email,password) => {
        set({isLoading:true})
    
        const response=await fetch(`${API_BASE_URL}/auth/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email,password}),
        })
        if (response.status === 401) {
            throw new Error('Yetkilendirme hatası');
          }
        const json=await response.json()
        if(!response.ok){
            set({isLoading:false});
            set({error:json.error});
        }
        if(response.ok){
            localStorage.setItem('token',JSON.stringify(json.access_token));
            localStorage.setItem('user', json);
            set({user:json});
            set({isLoading:false});
            set({error:null});
        }
    },
    
    logOut:()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({user:null});
    }
}))