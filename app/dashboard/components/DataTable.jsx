"use client"

import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { use, useState, useEffect } from "react"
import { Eye, Pencil, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import auth_service from "../users/services/auth.service"

export default function DataTable({ headers, data, onDelete, onUpdate, onShow }) {
  const router = useRouter()
  const [expandedRow, setExpandedRow] = useState(null)

  const empleadoAutenticado = auth_service.getCurrentEmpleado()
  const empleadoAutenticadoId = empleadoAutenticado?.id_empleado
  const empleadoAutenticadoEmail = empleadoAutenticado?.email
  
  // Obtenemos el subtipo de administrador
  const subtipoAdministrador = empleadoAutenticado?.subtipo_admin

  // const restrictedEmails = ["joseluisjlgd123@gmail.com", "keving.kpg@gmail.com", "tmlighting@hotmail.com"]

  let isPrivilegedUser = false
  let isRestrictedUser = false
  let isNormalAdmin = false

  // (function setPrivilegeLevel(empleado) {
  //   if(!empleado) return;
    
  //   if(!subtipoAdministrador) {
  //     if(empleado.rol.id_rol !== 1) return;
  //     isNormalAdmin = true  
  //   }

  //   switch(subtipoAdministrador.id) {
  //     case 1:
  //       isPrivilegedUser = true
  //     case 2:
  //       isRestrictedUser = true
  //     case 3:
  //       isNormalAdmin = true
  //   }
  // })();
  // useEffect(() => {
  //     console.log(`Hola mundo \n${data.value}`)
  //   }, [])

  const getHierarchy = (empleado) => {
    if(!empleado) return null
    if(!empleado.subtipo_admin) {
      if(empleado.rol === "administrador") return 80;
      if(empleado.rol === "ventas") return 30;
      return 20;
    }
    console.log(empleado.subtipo_admin)
    switch(empleado.subtipo_admin.id) {
      case 1:
        return 100
      case 2:
        return 90
      case 3:
        return 80
    }
  }

  console.log("Empleado autenticado:", empleadoAutenticado)
  console.log("Puntos de jerarquía del usuario autenticado:", getHierarchy(empleadoAutenticado))
  
  const toggleRowExpansion = (index) => {
    setExpandedRow(expandedRow === index ? null : index)
  }

  const verificarEditDelete = (dataRow) => {
    // console.log("verificarEditDelete - dataRow:", dataRow)

    if (dataRow.id_empleado === empleadoAutenticadoId) {
      // console.log("Registro es propio. Permitir editar/eliminar (mostrar perfil).")
      return true
    }

    if (getHierarchy(empleadoAutenticado) === 100) {
      // console.log("Usuario privilegiado. Permitir editar/eliminar.")
      return true
    }

    // if (restrictedEmails.includes(dataRow.email)) {
    //   console.log("Registro con email restringido:", dataRow.email, ". No se permite editar/eliminar para usuarios restringidos/administradores normales.")
    //   return false
    // }
    console.log(`Auth user: ${getHierarchy(empleadoAutenticado)}` , `\nDataRow user: ${getHierarchy(dataRow)}`)
    
    return getHierarchy(empleadoAutenticado) > getHierarchy(dataRow)
    // console.log("Registro no restringido. Permitir editar/eliminar para este usuario.")
    return true
  }

  const verificarShow = (dataRow) => {
    // console.log("verificarShow - dataRow:", dataRow)
  
    if (dataRow.id_empleado === empleadoAutenticadoId) {
      // console.log("Registro es propio. No se muestra botón Show.")
      return false
    }
  
    // console.log("Permitir mostrar registro para cualquier usuario.")
    return true
  }

  const renderMobileView = () => {
    return (
      <div className="grid gap-4 md:hidden ">
        {data.map((dataRow, index) => {
          const esMismoUsuario = empleadoAutenticadoId && dataRow.id_empleado === empleadoAutenticadoId
          // console.log(`MobileView - Fila ${index}:`, { esMismoUsuario, dataRow })

          return (
            <Card
              key={dataRow.id || `card-${index}`}
              className={`overflow-hidden ${esMismoUsuario ? "border-[#8c52ff] border-2 dark:bg-gray-900" : "border-gray-200"}`}
            >
              <div className={`p-3 ${esMismoUsuario ? "bg-[#f0ebff] dark:bg-gray-900" : "bg-white"}`}>
                {headers.slice(0, 2).map((header) => (
                  <div key={`mobile-${dataRow.id}-${header}`} className="mb-1">
                    <span className="font-semibold text-xs text-gray-500 dark:bg-gray-900">{header.toUpperCase()}: </span>
                    <span className="font-medium dark:bg-gray-900">{dataRow[header]}</span>
                  </div>
                ))}

                <div className="flex justify-between items-center mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRowExpansion(index)}
                    className="text-xs text-[#8c52ff] hover:text-[#6c3dbf] p-0 h-auto"
                  >
                    {expandedRow === index ? "Ver menos" : "Ver más"}
                  </Button>

                  <div className="flex space-x-1">
                    {/* Botón Mostrar */}
                    {!esMismoUsuario && verificarShow(dataRow) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#8c52ff]"
                        onClick={() => onShow(dataRow.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}

                    {/* Botón Editar */}
                    {!esMismoUsuario && onUpdate && verificarEditDelete(dataRow) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-amber-500"
                        onClick={() => onUpdate(dataRow.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}

                    {/* Botón Eliminar */}
                    {!esMismoUsuario && onDelete && verificarEditDelete(dataRow) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => onDelete(dataRow.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}

                    {esMismoUsuario && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#305dfe]"
                        onClick={() => router.push("/dashboard/main")}
                      >
                        <User className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {expandedRow === index && (
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  {headers.slice(2).map((header) => (
                    <div key={`mobile-expanded-${dataRow.id}-${header}`} className="mb-1">
                      <span className="font-semibold text-xs text-gray-500">{header.toUpperCase()}: </span>
                      <span className="font-medium">{dataRow[header]}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    )
  }

  const renderDesktopView = () => {
    return (
      <div className="hidden md:block overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#8c52ff] hover:bg-[#8c52ff]">
              {headers.map((header) => (
                <TableHead key={`header-${header}`} className="text-white font-medium text-center">
                  {header.toUpperCase()}
                </TableHead>
              ))}
              <TableHead className="text-white font-medium text-center">ACCIONES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((dataRow, index) => {
              const esMismoUsuario = empleadoAutenticadoId && dataRow.id_empleado === empleadoAutenticadoId
              // console.log(`DesktopView - Fila ${index}:`, { esMismoUsuario, dataRow })

              return (
                <TableRow 
                  key={dataRow.id || `row-${index}`}
                  className={`${
                    esMismoUsuario 
                      ? "bg-[#caeafe] text-black" 
                      : index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-700"
                  } hover:bg-neutral-200 transition-colors`}
                >
                  {headers.map((header) => (
                    <TableCell key={`${dataRow.id}-${header}`} className="text-center">
                      {dataRow[header]}
                    </TableCell>
                  ))}
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-1">
                      {/* Botón Mostrar */}
                      {!esMismoUsuario && verificarShow(dataRow) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#8c52ff] hover:text-[#6c3dbf] hover:bg-[#f0ebff]"
                          onClick={() => onShow(dataRow.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}

                      {/* Botón Editar */}
                      {!esMismoUsuario && onUpdate && verificarEditDelete(dataRow) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                          onClick={() => onUpdate(dataRow.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}

                      {/* Botón Eliminar */}
                      {!esMismoUsuario && onDelete && verificarEditDelete(dataRow) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => onDelete(dataRow.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}

                      {/* Botón Mi Perfil: Solo para la fila del usuario autenticado */}
                      {esMismoUsuario && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#305dfe] hover:text-[#3e329a] hover:bg-blue-50"
                          onClick={() => router.push("/dashboard/main")}
                        >
                          <User className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (!data || data.length === 0) {
    console.log("No hay datos disponibles")
    return (
      <div className="text-center p-8 bg-gray-50 rounded-md border border-gray-200">
        <p className="text-gray-500">No hay datos disponibles</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {renderMobileView()}
      {renderDesktopView()}
    </div>
  )
}
