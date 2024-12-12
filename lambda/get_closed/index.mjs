import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })


    let getClosedDates = () => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM tables4u.closedDates', (error, rows) => {
                if(error){reject("unable to retrieve closed dates")}
                resolve(rows)
            })
        })
    };

    let response

    try{
        const result = await getClosedDates()
        if (result) {
            response = {
                statusCode: 200,
                dates: result
            }
        } else {
            response = {
                statusCode: 400,
                error: "no closed dates"
            }
        }
        
    }catch(err){
        response = {
            statusCode: 400,
            error: "no closed dates"
        }
    }

    pool.end()
    return response

}