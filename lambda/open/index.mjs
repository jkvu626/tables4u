import mysql from 'mysql'
export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })

    let response = {}

    let isOwner = (username, credential) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM tables4u.restaurants WHERE username=? AND credential=?', [username, credential], (error, rows) => {
                if (error) { return reject(error) }
                if ((rows) && (rows.length == 1)) {
                    return resolve(rows)
                } else {
                    return resolve(false)
                }
            })
        })
    }

    let openDay = (username, day, month, year) => {
      return new Promise((resolve, reject) => {
        pool.query('DELETE FROM tables4u.closedDates WHERE day=? AND month=? AND year=? AND username =?', [day, month, year, username], (error, rows) => {
          if (error) { return reject(error); }
          if (rows) {
            pool.query('SELECT * FROM tables4u.closedDates WHERE username=?', [username], (selectError, selectRows) => {
                if (selectError) { return reject(selectError); }
                resolve(selectRows);
            })
          }
        })
      })
    }

    try {
        const owner = await isOwner(event.username, event.credential);
        if (owner) {
            let result = {}
            result = await openDay(event.username, event.day, event.month, event.year)
            if (result) {
                response.statusCode = 200
                response.dates = result
            } else { 
                response.statusCode = 400
                response.error = "Couldn't open date"
            }
        } else {
            response.error = "invalid credentials"
            response.statusCode = 400
        }
    } catch (error) {
        response.statusCode = 400
        response.error = error
    }

    pool.end()
    return response;
}