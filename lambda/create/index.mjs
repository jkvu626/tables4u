import mysql from 'mysql';
import crypto from 'crypto';

export const handler = async (event) => {
    console.log("Handler invoked with event:", event); // Debug: Log the incoming event

    var pool = mysql.createPool({
        host: 'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    });

    let setOwner = (username) => {
        let cred = crypto.randomUUID();
        console.log(`Generated credential: ${cred} for username: ${username}`); // Debug: Log generated credential

        const checkCredential = `
        SELECT COUNT(*) AS count 
        FROM restaurants 
        WHERE credential = ? OR username = ?
        `;
        console.log("Executing query to check credentials:", checkCredential, [cred, username]); // Debug: Log query

        return new Promise((resolve, reject) => {
            pool.query(checkCredential, [cred, username], (error, result) => {
                if (error) {
                    console.error("Database error during credential check:", error); // Debug: Log DB error
                    reject("Database error during credential check");
                    return;
                }

                const count = result[0].count; // Check the count of matching rows
                console.log(`Credential check result count: ${count}`); // Debug: Log query result

                if (count > 0) {
                    console.warn("Restaurant with the same credential or username already exists."); // Debug: Log warning
                    reject("Restaurant already exists. Try again.");
                    return;
                } else {
                    console.log("No matching credentials or usernames found. Proceeding."); // Debug: Log success
                    resolve(cred);
                }
            });
        });
    };

    let createRestaurant = (username, name, address, open, close, password, credential) => {
        const insert = `
        INSERT INTO restaurants (username, name, password, credential, active, address, open, close)
        VALUES (?, ?, ?, ?, b'0', ?, ?, ?)
        `;
        const values = [
            username, name, password, credential, address, open, close
        ];
        console.log("Executing query to insert restaurant:", insert, values); // Debug: Log query

        return new Promise((resolve, reject) => {
            pool.query(insert, values, (insertError) => {
                if (insertError) {
                    console.error("Database error during insertion:", insertError); // Debug: Log DB error
                    reject("Database error during insertion");
                } else {
                    console.log("Restaurant inserted successfully."); // Debug: Log success
                    resolve(true);
                }
            });
        });
    };

    let selectNew = (credential) => {
        const selectNewRestaurant = `
        SELECT * FROM restaurants WHERE credential = ?
        `;
        console.log("Executing query to select new restaurant:", selectNewRestaurant, [credential]); // Debug: Log query

        return new Promise((resolve, reject) => {
            pool.query(selectNewRestaurant, [credential], (selectError, row) => {
                if (selectError) {
                    console.error("Database error during select:", selectError); // Debug: Log DB error
                    reject("Database error during select");
                } else {
                    console.log("Select query returned row:", row[0]); // Debug: Log query result
                    resolve({
                        restaurant: row[0],
                        credential: credential
                    });
                }
            });
        });
    };

    let response;

    try {
        console.log("Starting setOwner function."); // Debug: Log execution start
        const owner = await setOwner(event.username);
        console.log("Owner credential set:", owner); // Debug: Log owner credential

        console.log("Starting createRestaurant function."); // Debug: Log execution start
        const newrest = await createRestaurant(event.username, event.name, event.address, event.open, event.close, event.password, owner);

        console.log("Starting selectNew function."); // Debug: Log execution start
        const select = await selectNew(owner);

        if (newrest) {
            console.log("Restaurant successfully created and selected."); // Debug: Log success
            response = {
                statusCode: 200,
                restaurant: select.restaurant,
                credential: select.credential
            };
        } else {
            console.warn("Restaurant creation failed during insertion."); // Debug: Log warning
            response = {
                statusCode: 400,
                error: "Insertion error"
            };
        }

    } catch (err) {
        console.error("Error occurred:", err); // Debug: Log error
        response = {
            statusCode: 400,
            error: err
        };
    }

    console.log("Ending database pool connection."); // Debug: Log pool closure
    pool.end(); // Note: Avoid in AWS Lambda as discussed earlier

    console.log("Final response:", response); // Debug: Log final response
    return response;
};
