import { useEffect, useState } from "react"
import { getRequest, postRequest } from "../Services/Request"
import Swal from "sweetalert2"

export default function MedicAdmin() {

    const [day, setDay] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()

    const [loading, setLoading] = useState(true)
    const [medicBlocks, setMedicBlocks] = useState([])

    useEffect(()=>{
        const getBlocks = async() =>{
            setMedicBlocks(await getRequest(process.env.REACT_APP_URL + "/api/medic/attention_block"))
            setLoading(false)         
        }
        getBlocks()
        console.log("test " + medicBlocks)
    },[])

    const handleSubmit = async() =>{
        const data = {
            day,
            startTime,
            endTime
        }
        
        const submit = await Swal.fire({
            title: 'Confirmacion agregar bloque',
            text: "Bloque dia: " + day + " desde: " + startTime + " hasta: " + endTime,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#1D4ED8",
            confirmButtonText: "Guardar bloque",
            confirmButtonColor: "#1D4ED8"
        })
        if (submit.isConfirmed) {
            const resp = await postRequest(process.env.REACT_APP_URL+"/api/medic/attention_block/", JSON.stringify(data))
            if (resp.status === 200) {
                Swal.fire({
                    title: "Bloque agregado exitosamente.",
                    icon: "success"
                })
            } else {
                Swal.fire({
                    title: "Error al guardar bloque, intente nuevamente, si el problema persiste contacte al centro medico.",
                    icon: "error",
                })
            }
        } else {
            Swal.fire({
                title: "Accion cancelada",
                icon: "error",
                confirmButtonColor: "#1D4ED8"
            })
        }
    }


    return (
        <div className="flex justify-center">
            <div className="my-5 sm:mx-4 sm:w-[700px] py-5 px-2 bg-slate-50 rounded-xl shadow-lg flex flex-col justify-center">
                <h1 className="text-center text-xl font-medium m-4">Administracion de bloque horarios</h1>
                <div className="flex flex-row flex-wrap">
                    <div className="w-48 m-2 p-2 border rounded-md border-black">
                        <h1 className="text-center font-medium">Lunes</h1>
                        {
                            loading ? ( <p>Cargando...</p>) : 
                            (
                                medicBlocks.map((x)=>(
                                    <div>
                                        <h1>{x.startTime}</h1>
                                    </div>
                                ))
                            )
                        }
                    </div>
                    <div className="w-48 m-2 p-2 border rounded-md border-black">
                        <h1 className="text-center font-medium">Martes</h1>
                    </div>
                    <div className="w-48 m-2 p-2 border rounded-md  border-black">
                        <h1 className="text-center font-medium">Miercoles</h1>
                    </div>
                    <div className="w-48 m-2 p-2 border rounded-md border-black">
                        <h1 className="text-center font-medium">Jueves</h1>
                    </div>
                    <div className="w-48 m-2 p-2 border rounded-md border-black">
                        <h1 className="text-center font-medium">Viernes</h1>
                    </div>
                    <div className="w-48 m-2 p-2 border rounded-md border-black">
                        <h1 className="text-center font-medium">Sabado</h1>
                    </div>
                    <div className="w-48 m-2 p-2 border rounded-md border-black">
                        <h1 className="text-center font-medium">Domingo</h1>
                    </div>
                </div>
                <h1 className="text-center text-xl font-medium m-4">Agregar bloque horario</h1>
                <div className="flex flex-row flex-wrap">
                    <h1 className="m-2">Dia:</h1>
                    <select className={"bg-gray-100 border border-gray-500 rounded-lg shadow-lg block p-2.5 m-2"} onChange={(e)=>setDay(e.target.value)}>
                        <option value="">
                            Seleccione un dia
                        </option>
                        <option value="Lunes">
                            Lunes
                        </option>
                        <option value="Martes">
                            Martes
                        </option>
                        <option value="Miercoles">
                            Miercoles
                        </option>
                        <option value="Jueves">
                            Jueves
                        </option>
                        <option value="Viernes">
                            Viernes
                        </option>
                        <option value="Sabado">
                            Sabado
                        </option>
                        <option value="Domingo">
                            Domingo
                        </option>
                    </select>
                </div>
                <div className="flex flex-row flex-wrap">
                    <h1 className="m-2">Desde:</h1>
                    <input className={"bg-gray-100 border border-gray-500 rounded-lg shadow-lg block p-2.5 m-2"} type="time" onChange={(e)=>setStartTime(e.target.value)}/>
                </div>
                <div className="flex flex-row flex-wrap">
                    <h1 className="m-2">Hasta:</h1>
                    <input className={"bg-gray-100 border border-gray-500 rounded-lg shadow-lg block p-2.5 m-2"} type="time" onChange={(e)=>setEndTime(e.target.value)}/>
                </div>

                <button className="bg-blue-600 p-2 rounded-full text-white mt-6 font-medium" onClick={handleSubmit}>Guardar bloque</button>

            </div>
        </div>
    )
}