import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })
    
    let getByName = (username) =>{
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

    let getAdmin = () =>{
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM restaurants WHERE NOT username=\'admin\'', (error, rows) => {
                if(error){reject("database error")}
                resolve(rows);
            })
        })
    };

    let isAdmin = (cred) =>{
        return new Promise((resolve, reject) => {
            pool.query('SELECT credential FROM restaurants WHERE username=\'admin\'', [cred], (error, row) => {
                if(error){reject("database error")}
                if(row.length == 1 && row[0].credential == cred){resolve(true)}
                resolve(false)
            })
        })
    };

    let response

    try{
        const admin = await isAdmin(event.credential)
        let result;
        if(event.username){
            result = await  getByName(event.username)
        }else if(admin){
            result = await getAdmin()
        }else{
            result = await getByCred(event.credential)
        }
        response = admin ? 
        {
            statusCode: 200,
            restaurants: result
        } : 
        {
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