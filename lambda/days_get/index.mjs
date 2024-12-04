import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })

    let getUsername = (credential) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT username FROM tables4u.restaurants WHERE credential=?', [credential], (error, rows) => {
                if(error){reject(error)}
                if (rows.length > 0) {
                    resolve(rows[0].username)
                } else {
                    reject("invalid credentials")
                } 
            })
        })
    }
    
    let getDates = (username) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM tables4u.closedDates WHERE username=?', [username], (error, rows) => {
                if(error){reject("unable to retrieve closed dates")}
                resolve(rows)
            })
        })
    };

    let response

    try{
        const username = getUsername(event.credential)
        const result = await getDates(username)
        if (result) {
            response = {
                statusCode: 200,
                dates: result
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