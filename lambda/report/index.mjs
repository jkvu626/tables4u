import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host: 'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    });

    let getByUser = (username) =>{
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM restaurants WHERE username=?', [username], (error, row) => {
                if(error || row.length != 1){reject("no such restaurant")}
                resolve(row[0]);
            })
        })
    };

    let getTables = async (username) => {
        const selectTables = `
        SELECT * FROM tables WHERE username = ?;
        `;

        return new Promise((resolve, reject) => {
            pool.query(selectTables, [username], (err, rows) => {
                if(err) {
                    console.error("DB Error during SELECT", err)
                    reject()
                } else {
                    resolve(rows)
                }
            }) 
        })
    }

    let findDate = async (day, month, year, username) => {
        const selectDate = `
        SELECT * FROM reservations WHERE day = ? AND month = ? AND year = ? AND username = ?;
        `;

        return new Promise((resolve, reject) => {
            pool.query(selectDate, [day, month, year, username], (err, rows) => {
                if(err) {
                    console.error("DB Error during SELECT", err)
                    reject()
                } else {
                    resolve(rows)
                }
            }) 
        })
    }

    let response

    try {
        const restaurant = await getByUser(event.username)
        const tables = await getTables(restaurant.username)
        const reservations = await findDate(event.day, event.month, event.year, restaurant.username)

        response = {
            statusCode: 200,
            tables: tables,
            reservations: reservations
        }
    } catch (err) {
        response = {
            statusCode: 400,
            error: err
        }
    }

    pool.end()
    return response
}