import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })
    
    let getRestaurant = (username, password) =>{
        return new Promise((resolve, reject) => {
            pool.query('select name from restaurants where username=?', [username], (error, row) => {
                if(error){reject(error)}
                if(row.length == 1 && row[0].password == password){resolve(row[0].name)}
                resolve(false)
            })
        })
    }

    let response

    try{
        const result = await getRestaurant(event.username)
        if(result){
            response = {
                statusCode: 200,
                restaurant: result
            }
        }else{
            response = {
                statusCode: 400,
                restaurant: "invalid credentials"
            }
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