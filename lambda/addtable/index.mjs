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
        
        let selectTables = (username) => {
            const selectNewTable = `
            SELECT * FROM tables WHERE username = ?
            `;

            return new Promise((resolve, reject) => {
                pool.query(selectNewTable, [username], (selectError, rows) => {
                    if (selectError) {
                        console.error("Database error during select:", selectError); // Debug: Log DB error
                        reject("Database error during select");
                    } else {
                        resolve(rows)
                    }
                });
            });
        };

        let response;

        try {
            await addTable(event.username, event.tid, event.seats)
            const select = await selectTables(event.username)
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