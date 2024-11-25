import { table } from 'console';
import mysql from 'mysql';

export const handler = async (event) => {
    var pool = mysql.createPool({
        host: 'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    });

    let addTable = (username, tid, seats) => {
        const insert = `
        INSERT INTO tables (username, tableid, seats)
        VALUES (?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            pool.query(insert, [username, tid, seats], (insertError) => {
                if (insertError) {
                    console.error("Database error during insertion:", insertError); 
                    reject("Database error during insertion");
                } else {
                    resolve()
                }
            })
        })
    }
    
    let selectNew = (tid) => {
        const selectNewTable = `
        SELECT * FROM tables WHERE tid = ?
        `;

        return new Promise((resolve, reject) => {
            pool.query(selectNewTable, [tid], (selectError, row) => {
                if (selectError) {
                    console.error("Database error during select:", selectError); // Debug: Log DB error
                    reject("Database error during select");
                } else {
                    console.log("Select query returned row:", row[0]); // Debug: Log query result
                    resolve(row[0])
                }
            });
        });
    };

    let response;

    try {
        await addTable(event.username, event.tid, event.seats)
        const select = selectNew(event.tid)
        response = {
            statusCode: 200,
            restaurant: select.username,
            tableid: select.tableid,
            seats: select.seats
        }
    } catch (err) {
        console.error("Error occurred:", err); // Debug: Log error
        response = {
            statusCode: 400,
            error: err
        };
    }

    pool.end()
    return response;
};