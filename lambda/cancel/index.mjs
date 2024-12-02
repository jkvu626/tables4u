import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })

    let delReservation = (code, email) => {
        return new Promise((resolve, reject) => {
            let query = `DELETE FROM reservations WHERE email=? AND code=?`
            pool.query(query, [email, code],
                 (error, row) => {
                if(error){reject("invalid request")}
                if(row){resolve()}
                reject("failed to delete")
            })
        })
    }

    let response

    try{

        await delReservation(event.code, event.email)
        response = {
            statusCode: 200
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