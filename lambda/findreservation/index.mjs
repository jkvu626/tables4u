import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })

    let getReservation = (email, code) =>{
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM reservations WHERE email=? AND code=?'
            pool.query(query, [email, code],
                (error, row) => {
                if(error){reject("failed to find reservation")}
                if(row.length > 0){resolve(row[0])}
                reject("no such reservation")
            })
        })
    };

    let response

    try{
        const result = await getReservation(event.email, event.code)
        response = {
            statusCode: 200,
            reservation: result
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