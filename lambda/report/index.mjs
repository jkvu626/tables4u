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

    const findDate = (startDate, endDate, username) => {
        const selectDate = `
            SELECT * FROM reservations
            WHERE username = ?
            AND DATE(CONCAT(year, '-', LPAD(month, 2, '0'), '-', LPAD(day, 2, '0')))
                BETWEEN ? AND ?;
        `;
        return new Promise((resolve, reject) => {
            pool.query(selectDate, [username, startDate, endDate], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    };

    let response

    try {
        const restaurant = await getByUser(event.username)
        const tables = await getTables(restaurant.username)

        const reservations = await findDate(
            event.startDate,
            event.endDate,
            restaurant.username
        )  

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