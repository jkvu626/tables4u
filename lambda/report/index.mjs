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

    let findDate = async (startday, startmonth, startyear, endday, endmonth, endyear, username) => {
        // Prepare SQL query with dynamic values
        const selectDate = `
        SELECT * FROM reservations
        WHERE username = ?
        AND (
            (year = ? AND month = ? AND day >= ? AND day <= ?) 
            OR
            (year = ? AND month = ? AND day >= ? AND day <= ?) 
        );
        `;

        return new Promise((resolve, reject) => {
            pool.query(selectDate, [
                username,                // Bind username
                startyear, startmonth, startday, endday,  // Bind start and end date info for the start year and month
                endyear, endmonth, startday, endday   // Bind start and end date info for the end year and month
            ], (error, results) => {
                if (error) {
                    reject(error);  // Reject if there's an error
                } else {
                    resolve(results);  // Resolve with the query results
                }
            });
        });
    }

    let response

    try {
        const restaurant = await getByUser(event.username)
        const tables = await getTables(restaurant.username)

        const reservations = await findDate(
            event.startday, 
            event.startmonth, 
            event.startyear, 
            event.endday,
            event.endmonth,
            event.endyear,
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