import mysql from 'mysql';

export const handler = async (event) => {
    var pool = mysql.createPool({
        host: 'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    });

    let removeTable = (username, tid) => {

        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM tables WHERE username=? AND tableid=?', [username, tid], (deleteTableError, rows) => {
                if (deleteTableError) {
                    console.error("Database error during insertion:", deleteTableError); 
                    return reject("Database error during insertion");
                } else {
                    return resolve(rows)
                }
            })
        })
    }
    
    let selectTables = (username) => {
        const selectNewTable = `SELECT * FROM tables4u.tables WHERE username = ?`;

        return new Promise((resolve, reject) => {
            pool.query(selectNewTable, [username], (selectError, rows) => {
                if (selectError) {
                    console.error("Database error during select:", selectError); // Debug: Log DB error
                    return reject("Database error during select");
                } else {
                    return resolve(rows)
                }
            });
        });
    };

    let response;

    try {
        await removeTable(event.username, event.tableid)
            let select = await selectTables(event.username)
            response = {
                statusCode: 200,
                tables: select
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