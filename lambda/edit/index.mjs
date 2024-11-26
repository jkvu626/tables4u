import mysql from 'mysql';

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })

    let getRestaurant = (username) =>{
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM restaurants WHERE username=?', [username], (error, row) => {
                if(error){reject("database error")}
                if(row.length != 1){reject("no such restaurant")}
                resolve(row[0])
            })
        })
    };

    let editRestaurant = (name, address, open, close, username) =>{
        const updateName = `
            UPDATE restaurants
            SET name = ?, address = ?, open = ?, close = ?
            WHERE username = ?;
            `;

        return new Promise((resolve, reject) => {
            pool.query(updateName, [name, address, open, close, username], (updateError) => {
                if(updateError){
                    reject("Error in updating Database")
                } else {
                    resolve(name)
                }
                
            })
        })
    }   

    

    try {
        await editRestaurant(event.name, event.address, event.open, event.close, event.username);
        const result = await getRestaurant(event.username);
 
        const response = {
            statusCode: 200,
            restaurant: result
        };

        return response;
    } catch (error) {
        const response = {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message || error
            })
        };

        return response;
    }
}