import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })
    
    const makeCode = () => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let result = ''
        const alen = alphabet.length;
        for (let i = 0; i < 5; i++) {
            result += alphabet.charAt(Math.floor(Math.random() * alen));
        }
        return result;
    }

    let makeReservation = (username, date, seats, tableid, email) =>{
        return new Promise((resolve, reject) => {
            let code = makeCode()
            let query = `INSERT INTO reservations 
            (username, time, day, month, year, tableid, email, code, numguests)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
             console.log('? ? ? ? ? ? ? ? ?', [username, date.time, date.day, date.month, date.year, tableid, email, code, seats])
            pool.query(query, [username, date.time, date.day, date.month, date.year, tableid, email, code, seats],
                (error) => {
                if(error){reject("failed to create reservation")}
                resolve(code)
            })
        })
    };

    let getReservation = (username, date) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT tableid FROM tables WHERE
            username=? AND (username, tableid) NOT IN
            (SELECT username, tableid FROM reservations WHERE 
            time=? AND day=? AND month=? AND year=?)`
            pool.query(query, [username, date.time, date.day, date.month, date.year],
                 (error, row) => {
                if(error){reject("invalid request")}
                if(row && row.length > 0){resolve(row[0].tableid)}
                reject("no reservation available")
            })
        })
    }

    let response

    try{
        const tableid = await getReservation(event.username, event.date)
        const result = await makeReservation(event.username, event.date, event.seats, tableid, event.email)
        response = {
            statusCode: 200,
            code: result
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