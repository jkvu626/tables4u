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
            pool.query('SELECT * FROM restaurants WHERE username=?', [username], (error, row) => {
                if(error){reject("invalid credentials")}
                if(row.length == 1 && row[0].password == password){resolve(row[0].credential)}
                reject("invalid credentials")
            })
        })
    };

    let response

    try{
        const result = await getRestaurant(event.username, event.password)
        response = {
            statusCode: 200,
            credential: result
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