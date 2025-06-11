import { useState } from "react"
import { Link,XIcon} from "lucide-react";

export default function BotonAñadirLink({texto,servicios,item,index,handleChange}) {
const [open,setOpen]=useState(false)

  return (<>
  {open ? (
        <div className="w-full text-xs items-center flex gap-4 h-6 justify-between my-2">
            <div className="flex flex-col">
            <label className="text-purple-400">Palabra</label>
       <select
        className="w-full max-w-24 h-6 focus:bg-white-black break-all bg-white"      
        value={item}
         onChange={(e) => handleChange(e, index, 'palabra')}
        >
          <option value=""></option>
          {texto.split(/\s+/) 
    .map((p) => p.replace(/[.,]/g, "")) 
    .filter((p) => p.length > 0).map((palabra, i) => (
            <option className="hover:bg-red-500" key={i} value={palabra}>
              {palabra}
            </option>
          ))}
        </select>
        </div>
         <div className="flex flex-col">
            <label className="text-purple-400" htmlFor="">Enlace</label>
        <select
      
       className="w-fulltext-black max-w-24 h-6 break-all "    
        value={item.enlace}
         onChange={(e) => handleChange(e, index, 'enlace')}
      > <option value=""></option>
        {servicios.map((e,i)=>( <option key={i} value={e.url}>{e.label}</option>))}
      </select></div>
        <button
  className="text-red-600 items-center"
  onClick={() => {
    handleChange({ target: { value: "" } }, index, "palabra");
    handleChange({ target: { value: "" } }, index, "enlace");
    setOpen(false);
  }}
>
  <XIcon />
</button>
        </div>
        
      ):    <div className="flex items-center w-full justify-end text-white text-xs relative z-10">
        <div className="text-white">Añadir enlace</div>
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="p-1 text-purple-400 hover:bg-purple-100 rounded-xl m-1"
        >
          <Link />
        </button>
      </div>}</>
  )
}
