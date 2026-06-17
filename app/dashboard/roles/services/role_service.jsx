"use client";

import auth_service from "../../users/services/auth.service";
import url from "@/api/url";

const API_URL = `${url}/api`;

const getToken = () => auth_service.getToken();

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    const data = await response.json().catch(() => ({}));
    return data;
};


const role_service = {
 
 getRoleById: async (id) => {
  try {
    const token = getToken();
    if (!token || !id) throw new Error("Faltan parámetros requeridos.");

    const response = await fetch(`${API_URL}/roles/${id}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": 'application/json'
      }
    });
    
    return await handleResponse(response);
  } catch (error) {
    return { success: false, message: error.message };
  }
},
 //GET
  getRoles: async () => {
    try {
      const token = auth_service.getToken();
      if (!token) throw new Error("No hay token de autenticación");
      
      const response = await fetch(`${API_URL}/roles`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
     
      const data = await handleResponse(response);
      
      let roles = [];
      
      if (Array.isArray(data)) {
        roles = data;
      } 
      else if (data && Array.isArray(data.roles)) {
        roles = data.roles;
      } 
      else if (data && Array.isArray(data.data)) {
        roles = data.data;
      }
      return roles;
    } catch (error) {
      console.error("Error al obtener roles:", error);
      return [];
    }
  },
  
  getPermisos: async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("No hay token de autenticación");
      
      const response = await fetch(`${API_URL}/permisos`, {
        headers: { 
          "Authorization": `Bearer ${token}`
        }
      });
      
      const data = await handleResponse(response);
      
      let permisos = [];
      
      if (Array.isArray(data)) {
        permisos = data;
      } else if (data && Array.isArray(data.permisos)) {
        permisos = data.permisos;
      } else if (data && Array.isArray(data.data)) {
        permisos = data.data;
      }
      
      return { permisos };
    } catch (error) {
      console.error("Error al obtener permisos:", error);
      return { permisos: [] };
    }
  },
  //DELETE
  delete: async (rolId)=>{
        try{
            if(!rolId) throw new Error("ID de rol no proporcionado");
            
            const token = getToken();
            if(!token) throw new Error("No hay token de autenticacion");
            
            const response = await fetch(`${API_URL}/roles/${rolId}`,{
                method:"DELETE",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
          
            return await handleResponse(response);
            
        }catch(error){
             
               return {sucess:false,message:error.message}
        }
  },
//POST
  create: async (form)=>{
        try{
            const token = getToken()
            if(!form || !token) throw new Error("Error al crear");
            
            const response =await fetch(`${API_URL}/roles`,{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "Accept":"application/json",
                    "content-type":"application/json"
                },
                body: JSON.stringify(form)
            });

            return await handleResponse(response);
        
        }catch(error){
            console.error("Error al crear",error.message)
            return {success:false,message:error.message}
        }
  },
  //PUT
  update: async (form,rolId)=>{
    try{
     
        const token = getToken();
        const validate = !rolId || !form || !token;  

        if(validate) throw new Error("Error al editar rol")
        const response =await fetch(`${API_URL}/roles/${rolId}`,{
         method:"PUT",
         headers:{
            "Authorization":`Bearer ${token}`,
            "Accept":"application/json",
            "content-type":"application/json"
         },
         body: JSON.stringify(form)                
    });
        
        return await handleResponse(response);

    }catch(error){
        
        console.error(`Error al editar rol `,error.message);        
        return {success:false,message:error.message}
    }
  },

  getPermisosDelRol: async (rolId) => {
    try {
      if (!rolId) throw new Error("ID de rol no proporcionado");
      
      const token = getToken();
      if (!token) throw new Error("No hay token de autenticación");
      
      const response = await fetch(`${API_URL}/roles/${rolId}/permisos`, {
        headers: { 
          "Authorization": `Bearer ${token}` 
        }
      });
      
      const data = await handleResponse(response);
      
      let permisos = [];
      
      if (Array.isArray(data)) {
        permisos = data;
      } else if (data && Array.isArray(data.permisos)) {
        permisos = data.permisos;
      } else if (data && Array.isArray(data.data)) {
        permisos = data.data;
      }
      
      return { permisos };
    } catch (error) {
      console.error(`Error al obtener permisos del rol ${rolId}:`, error);
      return { permisos: [] };
    }
  },
  
  syncPermisos: async (rolId, permisos) => {
    try {
      if (!rolId) throw new Error("ID de rol no proporcionado");
      
      const token = getToken();
      if (!token) throw new Error("No hay token de autenticación");
      
      const permisosArray = Array.isArray(permisos) ? permisos : [];
      
      const response = await fetch(`${API_URL}/roles/${rolId}/permisos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ permisos: permisosArray })
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error al sincronizar permisos para el rol ${rolId}:`, error);
      return { success: false, message: error.message };
    }
  }
};

export default role_service;