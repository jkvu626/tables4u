import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })
    
    let getDates = (username) =>{
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM tables4u.closedDates WHERE username=?', [username], (error, rows) => {
                if(error){reject("unable to retrieve closed dates")}
                if (rows.length >= 1) {
                    return resolve(rows)
                } else {
                    return resolve(false)
                }
            })
        })
    };

    let response

    try{
        const result = await getDates(event.username)
        if (result) {
            response = {
                statusCode: 200,
                dates: result
            }
        } else {
            response = {
                statusCode: 400,
                error: "invalid username"
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