import mysql from 'mysql';

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })
    
    // let getRestaurant = (cred) =>{
    //     return new Promise((resolve, reject) => {
    //         pool.query('SELECT * FROM restaurants WHERE credential=?', [cred], (error, row) => {
    //             if(error){reject("database error")}
    //             if(row.length != 1){reject("no such restaurant")}
    //             resolve(row[0])
    //         })
    //     })
    // };

    let editRestaurant = (name, username) =>{
        const updateName = `
            UPDATE restaurants
            SET name = ?
            WHERE username = ?;
            `;

        return new Promise((resolve, reject) => {
            pool.query(updateName, [name, username], (updateError) => {
                if(updateError){
                    reject("Error in updating Database")
                } else {
                    resolve(name)
                }
                
            })
        })
    }   



    try {
        // console.log(document.cookie)
        // const owner = await getRestaurant(document.cookie);
        await editRestaurant(event.name, event.username);
 
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: "Restaurant name updated successfully",
                updatedRestaurantUser: event.username,
                updatedRestaurantName: event.name
            })
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