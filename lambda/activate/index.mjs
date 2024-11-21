import mysql from 'mysql'
export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })

    let isOwner = (cred, username) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT credential FROM restaurants WHERE username=? AND credential=?', [cred, username], (error, row) => {
                if(error){reject("database error")}
                if(row.length == 1 && row[0].credential == cred){resolve(true)}
                resolve(false)
            })
        })
    };

    let activateRestaurant = (username) => {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE restaurants SET active=b\'1\' WHERE username=?', [true, username], (error, row) => {
                if(error){reject("failed to activate")}
                if(num == 0){reject("no such restaurant")}
                resolve(username)
            })
        })
    }

    let response

    try{
        const owner = await isAdmin(event.credential)
        if(owner){
            const activate = await activateRestaurant(event.username)
            response = {
                statusCode: 200,
                success: "activated " + del
            }
        }else{
            response = {
                statusCode: 400,
                credential: "insufficient permissions"
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