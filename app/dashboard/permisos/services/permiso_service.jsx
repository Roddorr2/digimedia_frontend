"use client";

import auth_service from "../../users/services/auth.service";
import url from "@/api/url";

const API_URL = `${url}/api`;

const getToken = ()=> auth_service.getToken();

const handleResponse = async (response)=>{
    if(!response.ok){
        const errorData = await response.json().catch(()=>({}));
        throw new Error(errorData.message ||`Error: ${response.status}`);
    }
    
    const data = await response.json().catch(()=>({}));
    return data;
}


const permiso_service = {
    
    getPermisos: async ()=>{
        try{
            const token = getToken();
            
            if(!token) throw new Error("Falta token");
            
            const response = await fetch(`${API_URL}/permisos`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "Accept" : 'application/json'
                }
            })
            
            const data = await handleResponse(response);
            
            let permisos = []

            permisos = data.data;
            console.log(permisos)
            return permisos;

        }catch(error){
            console.error("Error al obtener permisos", error.message)
            return [];
        }
    },

    //post permisos 
    postPermisos: async (formBody)=>{
        try{
            const token = getToken();
            
            if(!formBody || !token) throw new Error("Error al crear")
            
            const response = await fetch(`${API_URL}/permisos`,{
                    method:"POST",
                    headers:{
                        "Authorization":`Bearer ${token}`,
                        "Accept":"application/json",
                        "content-type":"application/json",
                    },
                    body: JSON.stringify(formBody)
            })    

            return await handleResponse(response);

        }catch(error){
            console.error("Error : "+error) 
            return {success:false,message:error.message}
        }
    },

    //update permisos
    updatePermisos:async (formBody,id)=>{
        
        try{
        
        const token = getToken();
        const validate = !token || !formBody || !id;
        if(validate) throw new Error("Error al editar")
        
        const response =await fetch(`${API_URL}/permisos/${id}`,{
            method:"PUT",
            headers:{
                "Authorization":`Bearer ${token}`,
                "Accept":"application/json",
                "content-type":"application/json"
            },
            body:JSON.stringify(formBody)
        })
        return await handleResponse(response);

    }catch(error){
        return {success:false,message:`Error : ${error.message}`}
    }
},
//delete permisos
deletePermisos:async(id)=>{
    try{
        const token = getToken();
        
        if(!id || !token) throw new Error("Error al eliminar")
        
        const response =await fetch(`${API_URL}/permisos/${id}`,{
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })    
    
        return await handleResponse(response);
    
    }catch(error){
        return {success:false,message:`Error :  ${error.message}`}
    }
}

}

export default permiso_service;