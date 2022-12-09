import { useEffect, useState } from "react"
import { getRequest, postRequest, deleteRequest } from "../Services/Request"
import Swal from "sweetalert2"

export default function MedicAdmin() {

    const [day, setDay] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()

    const [loading, setLoading] = useState(true)
    const [medicBlocks, setMedicBlocks] = useState([])

    const name = JSON.parse(sessionStorage.getItem("data_patient"))

    useEffect(() => {
        const getBlocks = async () => {
            setMedicBlocks(await getRequest(process.env.REACT_APP_URL + "/api/medic/attention_block"))
            setLoading(false)
        }
        getBlocks()
        console.log(medicBlocks)
    }, [loading])

    const handleDelete = async (x) => {
        console.log(x)
        const deleteAccion = await Swal.fire({
            title: "Accion permanente",
            text: "Eliminar bloque horario",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#1D4ED8",
            confirmButtonText: "Eliminar medico",
            confirmButtonColor: "#D33"
        })
        if (deleteAccion.isConfirmed) {
            const resp = await deleteRequest(process.env.REACT_APP_URL + "/api/medic/attention_block/", JSON.stringify({ "blocK_id": x }))
            if (resp.status === 200) {
                Swal.fire({
                    title: "Bloque eliminado con exito!",
                    icon: "success"
                })
                const deleteData = medicBlocks.filter(data => data.id !== x)
                setMedicBlocks(deleteData)
            } else {
                Swal.fire({
                    title: "Error desconocido, se recomienda actualizar la pagina.",
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

    const handleSubmit = async () => {
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
            const resp = await postRequest(process.env.REACT_APP_URL + "/api/medic/attention_block/", JSON.stringify(data))
            if (resp.status === 200) {
                await Swal.fire({
                    title: "Bloque agregado exitosamente.",
                    icon: "success"
                })
                window.location.reload(true)
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
            <div className="flex flex-col justify-center">
                <div className="my-5 sm:mx-4 sm:w-[700px] py-5 px-2 bg-slate-50 rounded-xl shadow-lg flex flex-col justify-center">
                    <h1 className="ml-2">Nombre profesional: {name.full_name}</h1>
                </div>

                <div className="my-5 sm:mx-4 sm:w-[700px] py-5 px-2 bg-slate-50 rounded-xl shadow-lg flex flex-col justify-center">

                    <h1 className="text-center text-xl font-medium m-4">Administracion de bloque horarios</h1>
                    <div className="flex flex-row flex-wrap justify-center">
                        <div className="m-2 p-2 border rounded-xl border-black min-w-[250px] ">
                            <h1 className="text-center font-medium text-lg">Lunes</h1>
                            {
                                loading ? (<p>Cargando...</p>) :
                                    (
                                        medicBlocks.map((x) => (
                                            x.weekday === "Lunes" ? (
                                                <div key={x.id} className="flex flex-row my-2 divide-y justify-between">
                                                    <div className="flex flex-row">
                                                        <h1 className="my-auto">{x.start_time}</h1>
                                                        <h1 className="mx-2 my-auto"> - </h1>
                                                        <h1 className="my-auto">{x.end_time}</h1>
                                                    </div>

                                                    <button className="bg-red-600 p-2 ml-4 rounded-lg text-white" onClick={() => handleDelete(x.id)}>Eliminar</button>
                                                </div>
                                            ) : null

                                        ))
                                    )
                            }
                        </div>
                        <div className="m-2 p-2 border rounded-md border-black min-w-[250px]">
                            <h1 className="text-center font-medium text-lg">Martes</h1>
                            {
                                loading ? (<p>Cargando...</p>) :
                                    (
                                        medicBlocks.map((x) => (
                                            x.weekday === "Martes" ? (
                                                <div key={x.id} className="flex flex-row my-2 divide-y justify-between">
                                                    <div className="flex flex-row">
                                                        <h1 className="my-auto">{x.start_time}</h1>
                                                        <h1 className="mx-2 my-auto"> - </h1>
                                                        <h1 className="my-auto">{x.end_time}</h1>
                                                    </div>

                                                    <button className="bg-red-600 p-2 ml-4 rounded-lg text-white" onClick={() => handleDelete(x.id)}>Eliminar</button>
                                                </div>
                                            ) : null

                                        ))
                                    )
                            }
                        </div>
                        <div className="m-2 p-2 border rounded-md  border-black min-w-[250px]">
                            <h1 className="text-center font-medium text-lg">Miercoles</h1>
                            {
                                loading ? (<p>Cargando...</p>) :
                                    (
                                        medicBlocks.map((x) => (
                                            x.weekday === "Miercoles" ? (
                                                <div key={x.id} className="flex flex-row my-2 divide-y justify-between">
                                                    <div className="flex flex-row">
                                                        <h1 className="my-auto">{x.start_time}</h1>
                                                        <h1 className="mx-2 my-auto"> - </h1>
                                                        <h1 className="my-auto">{x.end_time}</h1>
                                                    </div>

                                                    <button className="bg-red-600 p-2 ml-4 rounded-lg text-white" onClick={() => handleDelete(x.id)}>Eliminar</button>
                                                </div>
                                            ) : null

                                        ))
                                    )
                            }
                        </div>
                        <div className="m-2 p-2 border rounded-md border-black min-w-[250px]">
                            <h1 className="text-center font-medium text-lg">Jueves</h1>
                            {
                                loading ? (<p>Cargando...</p>) :
                                    (
                                        medicBlocks.map((x) => (
                                            x.weekday === "Jueves" ? (
                                                <div key={x.id} className="flex flex-row my-2 divide-y justify-between">
                                                    <div className="flex flex-row">
                                                        <h1 className="my-auto">{x.start_time}</h1>
                                                        <h1 className="mx-2 my-auto"> - </h1>
                                                        <h1 className="my-auto">{x.end_time}</h1>
                                                    </div>

                                                    <button className="bg-red-600 p-2 ml-4 rounded-lg text-white" onClick={() => handleDelete(x.id)}>Eliminar</button>
                                                </div>
                                            ) : null

                                        ))
                                    )
                            }
                        </div>
                        <div className="m-2 p-2 border rounded-md border-black min-w-[250px]">
                            <h1 className="text-center font-medium text-lg">Viernes</h1>
                            {
                                loading ? (<p>Cargando...</p>) :
                                    (
                                        medicBlocks.map((x) => (
                                            x.weekday === "Viernes" ? (
                                                <div key={x.id} className="flex flex-row my-2 divide-y justify-between">
                                                    <div className="flex flex-row">
                                                        <h1 className="my-auto">{x.start_time}</h1>
                                                        <h1 className="mx-2 my-auto"> - </h1>
                                                        <h1 className="my-auto">{x.end_time}</h1>
                                                    </div>

                                                    <button className="bg-red-600 p-2 ml-4 rounded-lg text-white" onClick={() => handleDelete(x.id)}>Eliminar</button>
                                                </div>
                                            ) : null

                                        ))
                                    )
                            }
                        </div>
                        <div className=" m-2 p-2 border rounded-md border-black min-w-[250px]">
                            <h1 className="text-center font-medium text-lg">Sabado</h1>
                            {
                                loading ? (<p>Cargando...</p>) :
                                    (
                                        medicBlocks.map((x) => (
                                            x.weekday === "Sabado" ? (
                                                <div key={x.id} className="flex flex-row my-2 divide-y justify-between">
                                                    <div className="flex flex-row">
                                                        <h1 className="my-auto">{x.start_time}</h1>
                                                        <h1 className="mx-2 my-auto"> - </h1>
                                                        <h1 className="my-auto">{x.end_time}</h1>
                                                    </div>

                                                    <button className="bg-red-600 p-2 ml-4 rounded-lg text-white" onClick={() => handleDelete(x.id)}>Eliminar</button>
                                                </div>
                                            ) : null

                                        ))
                                    )
                            }
                        </div>
                        <div className="m-2 p-2 border rounded-md border-black min-w-[250px]">
                            <h1 className="text-center font-medium text-lg">Domingo</h1>
                            {
                                loading ? (<p>Cargando...</p>) :
                                    (
                                        medicBlocks.map((x) => (
                                            x.weekday === "Domingo" ? (
                                                <div key={x.id} className="flex flex-row my-2 divide-y justify-between">
                                                    <div className="flex flex-row">
                                                        <h1 className="my-auto">{x.start_time}</h1>
                                                        <h1 className="mx-2 my-auto"> - </h1>
                                                        <h1 className="my-auto">{x.end_time}</h1>
                                                    </div>

                                                    <button className="bg-red-600 p-2 ml-4 rounded-lg text-white" onClick={() => handleDelete(x.id)}>Eliminar</button>
                                                </div>
                                            ) : null

                                        ))
                                    )
                            }
                        </div>
                    </div>


                </div>
                <div className="my-5 sm:mx-4 sm:w-[700px] py-5 px-2 bg-slate-50 rounded-xl shadow-lg flex flex-col justify-center">
                    <h1 className="text-center text-xl font-medium m-4">Agregar bloque horario</h1>
                    <div className="flex flex-row flex-wrap">
                        <h1 className="m-2">Dia:</h1>
                        <select className={"bg-gray-100 border border-gray-500 rounded-lg shadow-lg block p-2.5 m-2"} onChange={(e) => setDay(e.target.value)}>
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
                        <input className={"bg-gray-100 border border-gray-500 rounded-lg shadow-lg block p-2.5 m-2"} type="time" onChange={(e) => setStartTime(e.target.value)} />
                    </div>
                    <div className="flex flex-row flex-wrap">
                        <h1 className="m-2">Hasta:</h1>
                        <input className={"bg-gray-100 border border-gray-500 rounded-lg shadow-lg block p-2.5 m-2"} type="time" onChange={(e) => setEndTime(e.target.value)} />
                    </div>

                    <button className="bg-blue-600 p-2 rounded-full text-white mt-6 font-medium" onClick={handleSubmit}>Guardar bloque</button>
                </div>
            </div>
        </div>

    )
}