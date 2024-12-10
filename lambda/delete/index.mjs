import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })
    
    let isAdmin = (cred) =>{
        return new Promise((resolve, reject) => {
            pool.query('SELECT credential FROM restaurants WHERE username=\'admin\'', [cred], (error, row) => {
                if(error){reject("database error")}
                if(row.length == 1 && row[0].credential == cred){resolve(true)}
                resolve(false)
            })
        })
    };

    let getRestaurant = (cred) =>{
        return new Promise((resolve, reject) => {
            pool.query('SELECT username FROM restaurants WHERE credential=?', [cred], (error, row) => {
                if(error){reject("database error")}
                if(row.length != 1){reject("no such restaurant")}
                resolve(row[0])
            })
        })
    };

    let delRestaurant = (username) =>{
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM restaurants WHERE username=?', [username], (error, num) => {
                if(error){reject("failed to delete")}
                if(num == 0){reject("no such restaurant")}
                resolve(username)
            })
        })
    };

    let response

    try{
        const owner = await getRestaurant(event.credential)
        const admin = await isAdmin(event.credential)
        if(admin || owner.username == event.username){
            const del = await delRestaurant(event.username)
            response = {
                statusCode: 200,
                success: "deleted " + del
            }
        }else{
            response = {
                statusCode: 400,
                error: "insufficient permissions"
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