import { useState } from "react"
import CreateMedic from "../../Component/Center/Medic/CreateMedic";
import EditMedic from "../../Component/Center/Medic/EditMedic";
import ListEditMedic from "../../Component/Center/Medic/ListEditMedic";

export default function Medic() {

    const [edit, setEdit] = useState([])
    const [type, setType] = useState(0)

    return (
        <div className="my-5 sm:m-7 flex flex-col justify-center">
            <h1 className="text-center font-semibold text-2xl sm:my-2">Administracion de medicos</h1>
            <div className="flex flex-col sm:flex-row justify-center px-1">
                <div className="flex flex-col">
                    <button className="bg-blue-700 sm:mx-4 text-white font-medium p-2.5 rounded-xl shadow-xl mt-4 hover:shadow-none" onClick={() => setType(1)}>Añadir medico</button>
                    <ListEditMedic api={"http://127.0.0.1:8000/api/center/medic"} title={"Lista de medicos"} setEdit={setEdit} setType={setType} />
                </div>

                { //temporal !!!!!!!
                    type === 0 ? (
                        <div className="my-5 sm:mx-4 sm:w-2/5 py-5 px-2 bg-gray-200 rounded-xl shadow-xl">
                            <h1 className="text-center text-lg">Selecciona un medico a editar o crea uno nuevo :)</h1>

                        </div>
                    ) : (

                        type === 1 ? (
                            <CreateMedic />
                        ) : (
                            <EditMedic edit={edit} />
                        )

                    )

                }



            </div>
            <div>

            </div>

        </div>
    )
}