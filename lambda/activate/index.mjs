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
            pool.query('SELECT * FROM restaurants WHERE username=? AND credential=?', [username, credential], (error, rows) => {
                if (error) { return reject(error) }
                if ((rows) && (rows.length == 1)) {
                    return resolve(rows)
                } else {
                    return resolve(false)
                }
            })
        })
    }

    let activateRestaurant = (username) => {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE tables4u.restaurants SET active=b\'1\' WHERE username=?', [username], (error, rows) => {
                if (error) {return reject(error); }
                if ((rows) && (rows.length == 1)) {
                    return resolve(rows);
                } else {
                    return resolve(rows);
                }
            })
        })
    }

    try {
        const owner = await isOwner(event.username, event.credential);
        if (owner) {
            let result = await activateRestaurant(event.username)
            response.statusCode = 200
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
