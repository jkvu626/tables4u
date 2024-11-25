import mysql from 'mysql'

export const handler = async () => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })
    
    let getRestaurants = () =>{
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM restaurants WHERE active=1'
            pool.query(query, (error, rows) => {
                if(error){reject("unable to retrieve restaurants")}
                resolve(rows)
            })
        })
    };

    let response

    try{
        const result = await getRestaurants()
        response = {
            statusCode: 200,
            restaurants: result
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