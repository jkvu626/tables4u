import mysql from 'mysql';
import crypto from 'crypto';

export const handler = async (event) => {
    var pool = mysql.createPool({
        host:'tables4u.cdikygok8rdg.us-east-2.rds.amazonaws.com',
        user: "admin",
        password: "sidewalkslammers",
        database: "tables4u"
    })
    
    let getRestaurant = (cred) =>{
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM restaurants WHERE credential=?', [cred], (error, row) => {
                if(error){reject("database error")}
                if(row.length != 1){reject("no such restaurant")}
                resolve(row[0])
            })
        })
    };




}