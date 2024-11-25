import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })
    
    let getRestaurants = (username) =>{
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM restaurants WHERE username=?', [username], (error, row) => {
                if(error || row.length != 1){reject("no such restaurant")}
                resolve(row[0]);
            })
        })
    };

    let getByCred = (cred) =>{
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM restaurants WHERE credential=?', [cred], (error, row) => {
                if(error || row.length != 1){reject("no such restaurant")}
                resolve(row[0]);
            })
        })
    };

    let response

    try{
        const result = event.username ? 
            await getRestaurants(event.username) :
            await getByCred(event.credential)
        response = {
            statusCode: 200,
            restaurant: result
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