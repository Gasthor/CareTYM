const getConnection = require("./../database");

const getSpecialty = async(req,res) =>{
    
    try{
        const {id} = req.params;
        const client = await getConnection.client;
        const query = await client.query(`select * from especialidad where id='${id}'`);
        const result = query['rows']
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    };
    
};

const getSpecialties = async(req,res) =>{

    try{
        const client = await getConnection.client;
        const query = await client.query(`select * from especialidad`);
        const result = query['rows']
        res.status(200)
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const addSpecialty = async(req,res) =>{
    try{
        const { nombre } = req.body;

        if(nombre === undefined){
            res.status(400).json({message: "Bad Request. Please fill all field"});
        }

        const client = await getConnection.client;
        await client.query(
            `INSERT INTO "especialidad" ("nombre") 
            VALUES ($1)`, [nombre]);
        res.status(200).json({ message: "Specialty added" });
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const deleteSpecialty = async(req,res) =>{
    try{
        const id = req.params.id;
        const client = await getConnection.client;
        const query = await client.query(`delete from especialidad where id='${id}'`);
        const result = query['rows']
        res.status(200).json("The specialty was deleted succsesfuly");
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const updateSpecialty = async(req,res) =>{
    try{
        const id = req.params.id;
        const nombre=req.body.nombre;
        const databaseAccess = await getConnection.client;
        if(nombre === undefined){
            res.status(400).json({message: "Bad Request. Please fill any field"});
        }
        else{
            await databaseAccess.query(`update especialidad set nombre='${nombre}' where id=${id}`);
        }
        
        res.status(200).json("Specialty updated sucsesfully");

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
    
};

const methods = {
    getSpecialty,
    getSpecialties,
    addSpecialty,
    deleteSpecialty,
    updateSpecialty,
};

module.exports = methods;