import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })

    let getReservations = (username) =>{
        return new Promise((resolve, reject) => {
            pool.query('SELECT tableid, month, day, year, time, email, code, numguests, name FROM reservations JOIN restaurants ON restaurants.username=reservations.username WHERE restaurants.username=?', [username], (error, rows) => {
                if(error){reject(error)}
                resolve(rows)
            })
        })
    };

    let response

    try{
        const result = await getReservations(event.username)
        if (result.length > 0) {
            response = {
                statusCode: 200,
                reservations: result
            }
        } else {
            response = {
                statusCode: 400,
                error: "invalid credential"
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