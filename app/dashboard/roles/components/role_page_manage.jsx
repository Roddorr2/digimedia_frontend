"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PlusCircle, Shield, Search, RefreshCw } from "lucide-react";
import Pagination from "../../components/Pagination";
import TableRoles from "./tabla_rol"; 
import ModalRoles from "./modal_roles";   
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import role_service from "../services/role_service";
import auth_service from "../../users/services/auth.service";
import {useAuth} from "@/app/context/AuthContext";

const headers = ["id_rol", "nombre"];

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 5; 
  
  const {user,hasRole,isLoading:authLoading} =  useAuth();
  const [allRoles, setAllRoles] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);
  
  const [selectedRoleData, setSelectedRoleData] = useState(null);
  
  const filteredRoles = allRoles.filter((item) =>
    item.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
);

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentPageData = filteredRoles.slice(indexOfFirstItem, indexOfLastItem);
const totalItems = filteredRoles.length;
  
  
  async function fetchRol() {
    setIsLoading(true);
    try {
      const response = await role_service.getRoles(); 
      console.log(response)
      if (response && response.status === 200) {
        setAllRoles(response.data);
      } else if (response && response.roles) {
        setAllRoles(response.roles);
      } else {
        setAllRoles(response || []);
      }
    } catch (error) {
      console.error("Error al obtener roles:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log(auth_service.hasPermission("ver-roles"));
    if(!authLoading && user && !auth_service.hasPermission("ver-roles")){
        router.push("/dashboard/main");
    }
  }, [user,authLoading,router]);

  
  useEffect(()=>{
      if(!authLoading && auth_service.hasPermission("ver-roles")){
         fetchRol();
      }
  },[authLoading,currentPage])

  if(authLoading){
     return <div className="w-full h-screen flex items-center justify-center">Cargando...</div>;
  }

  if(!user || !auth_service.hasPermission("ver-roles")){
    return <div className="w-full h-screen flex items-center justify-center">Redirigiendo...</div>;
  }



  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    router.push(`?page=1`);
  };

  function onDelete(id) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8c52ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        role_service.delete(id)
          .then((response) => {
              const responseStatus = Object.freeze({
                    ok : response.status===200,
                    error:!response.success && !response.status
              })
              
            if(responseStatus.error){
                Swal.fire({ icon: "error", title: "Rol en uso", confirmButtonColor: "#8c52ff" });
              fetchRol();
            } 
            if (responseStatus.ok) {
              Swal.fire({ icon: "success", title: "Eliminado", confirmButtonColor: "#8c52ff" });
              fetchRol();
            }
          });
      }
    });
  }

  
  function onUpdate(roleRow) {
    setSelectedRoleData(roleRow);
    setModal(true);
  }

  return (
    <div className="container mx-auto px-4 py-6 overflow-x-auto max-w-7xl max-h-svh">
      <Card className="border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#8c52ff] to-[#7a45e6] text-white rounded-t-lg pb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Gestión de Roles
              </CardTitle>
              <CardDescription className="text-white/80 mt-1">
                Administra los accesos y seguridad del sistema.
              </CardDescription>
            </div>
            
             
      {auth_service.hasPermission('crear-roles') && (

            <Button
              className="bg-white text-[#8c52ff] hover:bg-gray-100 transition-colors shadow-sm w-full md:w-auto font-bold"
              onClick={() => {
                setSelectedRoleData(null);
                setModal(true);
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Añadir Rol
            </Button>
      )}
          </div>
        </CardHeader>

        <CardContent className="p-6 dark:bg-gray-800 overflow-y-auto max-h-full">
          <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-between items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar rol..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchRol()}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Cargando..." : "Actualizar"}
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8c52ff]"></div>
              <p className="ml-4 text-[#8c52ff]">Cargando roles...</p>
            </div>
          ) : (
            <>
              <div className="rounded-lg overflow-hidden">
              {auth_service.hasPermission("ver-roles") && (
                <TableRoles
                  headers={headers}
                  data={currentPageData}
                  onDelete={onDelete}
                  onUpdate={onUpdate} 
                />
              )}
              </div>

              
              {currentPageData.length > 0 && (
                <div className="mt-4">
                  <Pagination count={totalItems} />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <ModalRoles
        isVisible={modal}
        data={selectedRoleData || null}
        onClose={() => {
          setModal(false);
          setSelectedRoleData(null);
        }}
        onSuccessRefresh={() => {
          fetchRol();
        }}
      />
    </div>
  );
}