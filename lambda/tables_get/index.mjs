import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })
    
    let getTables = (username) =>{
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM tables WHERE username=?',[username], (error, rows) => {
                if(error){reject("unable to retrieve tables")}
                resolve(rows)
            })
        })
    };

    let response

    try{
        const result = await getTables(event.username)
        response = {
            statusCode: 200,
            tables: result
        }
    }catch(err){
        response = {
            statusCode: 400,
            error: err
        }
    }

    pool.end()
    return response
}