import { useNavigate } from "react-router-dom"

export default function Patient() {

    const data_user = JSON.parse(sessionStorage.getItem("data_patient"))

    const history = useNavigate()

    return (

        <div className="flex justify-center">
            <div className="flex-col">
                <button className="bg-blue-600 p-3 rounded-xl shadow-lg font-medium text-white my-2 sm:m-4 w-full sm:w-fit" onClick={() => history("/medical-hours")}>Mis horas medicas</button>

                <div className="mb-5 sm:mx-4 sm:w-[700px] py-5 px-2 bg-slate-50 rounded-xl shadow-lg flex flex-col justify-center">
                    <h1 className="text-center text-xl font-medium mb-5">Datos del usuario</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-4">
                        <h1 className="text-end mr-2 mb-2 font-medium">Nombre completo:</h1>
                        <h1>{data_user.full_name}</h1>
                        <h1 className="text-end mr-2 mb-2 font-medium">Rut:</h1>
                        <h1>{data_user.rut}</h1>
                        <h1 className="text-end mr-2 mb-2 font-medium">Fecha de nacimineto:</h1>
                        <h1>{data_user.date_of_birth}</h1>
                        <h1 className="text-end mr-2 mb-2 font-medium">Cobertura de salud:</h1>
                        <h1>{data_user.health_coverage}</h1>
                        <h1 className="text-end mr-2 mb-2 font-medium">Correo electronico:</h1>
                        <h1>{data_user.email}</h1>
                        <h1 className="text-end mr-2 mb-2 font-medium">Telefono:</h1>
                        <h1>{data_user.phone}</h1>
                    </div>
                    <h1 className="text-center text-sm my-2">Recuerda que cualquier inconsistenca con los datos registrados debes llamar a un centro medico de la red CareTYM</h1>
                </div>


            </div>


        </div>

    )
}