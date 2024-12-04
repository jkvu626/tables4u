'use client'
import React, { FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';


const instance = axios.create({
    baseURL: 'https://92ouj9flzf.execute-api.us-east-2.amazonaws.com/tables4u/',
  });

const Manage: React.FC = () => {
    const router = useRouter();

    const [err, setErr] = React.useState('');
    const [closeErr, setCloseErr] = React.useState('');
    const [isActive, setIsActive] = React.useState(true)
    const [restname, setRestName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [opentime, setOpen] = React.useState(0);
    const [closetime, setClose] = React.useState(0);
    const [tables, setTables] = React.useState([]);


    

    React.useEffect(() => {
        const credential = document.cookie.split("; ").find((row) => row.startsWith("credential="))?.split("=")[1];
        if(!credential){router.replace('/login')}
        instance.post("/restaurants", {"credential": credential})
        .then(function (response){
            const status = response.data.statusCode;
            if (status == 200) {
                const restaurant = response.data.restaurant;
                const active = response.data.restaurant.active
                if (restaurant && restaurant.name) {
                    setRestName(restaurant.name);
                    setUsername(restaurant.username);
                    setAddress(restaurant.address);
                    setOpen(restaurant.open);
                    setClose(restaurant.close);
                    if (active) {
                        setIsActive(true)
                    } else {
                        setIsActive(false)
                    }
                } else {
                    setErr("Restaurant not found")
                }
            } else {
                setErr("Error fetching restaurant details.")
            }
        })
        .catch((err) => {
            setErr("Error: " + err.message);
        })
    }, [router]);

    React.useEffect(() => {
        instance.post("/tables_get", {username: username})
        .then(function (response){
            console.log(response.data.tables)
            const status = response.data.statusCode;
            if (status == 200) {
                setTables(Object.values(response.data.tables))
            } else {
                console.log(response.data.err)
                console.log("TABLE ERROR")
                setTables([])
            }
        })
    }, [username])

    const handleAddTable = () => {
        const seats = document.getElementById('seats') as HTMLInputElement

        if (seats.value != '') {
            instance.post('/addtable'   , {
                username: username,
                seats: seats.value
            }).then(function (response) {
                const status =  response.data.statusCode;
                if (status == 200) {
                    setErr('')
                    setTables(Object.values(response.data.tables))
                    console.log("TABLE ADDED")
                } else {
                    setErr(JSON.stringify(response.data.error))
                }
            })
        } else {
            setErr("Fields not filled out")
        }
    }

    const handleEdit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const rename = document.getElementById('name') as HTMLInputElement
        const newaddress = document.getElementById('address') as HTMLInputElement
        const newopen = document.getElementById('open') as HTMLInputElement
        const newclose = document.getElementById('close') as HTMLInputElement

        const openVal = parseInt(newopen.value, 10)
        const closeVal = parseInt(newclose.value, 10)

        if (rename.value != '' && newaddress.value != '' && newopen.value != null && newclose.value != null && username != '') {
            instance.post('/edit', {
                name: rename.value,
                address: newaddress.value,
                open: newopen.value,
                close: newclose.value,  
                username: username
            }).then(function (response) {
                const status = response.data.statusCode;
                if (status == 200) {
                    setRestName(rename.value)
                    setAddress(newaddress.value)
                    setOpen(openVal)
                    setClose(closeVal)
                } else {
                    setErr(response.data.error)
                }
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made, and the server responded with a status code outside the 2xx range
                    console.error("API responded with an error:");
                    console.error("Status code:", error.response.status);
                    console.error("Response data:", error.response.data);
                    console.error("Headers:", error.response.headers);
                
                    setErr(`API error (${error.response.status}): ${error.response.data.message || 'Unknown error'}`);
                  } else if (error.request) {
                    // The request was made, but no response was received
                    console.error("No response received from API:");
                    console.error("Request details:", error.request);
                
                    setErr('No response from server. Please try again later.');
                  } else {
                    // Something happened in setting up the request that triggered an error
                    console.error("Error setting up the API request:");
                    console.error("Message:", error.message);
                
                    setErr('Error setting up request: ' + error.message);
                  }
                
                  console.error("Full error object for debugging:", error); // Log the full error object
            }) 
        } else {
            setErr('Fields empty')
        }
    }

    const deleteRestaurant = () => {
        const credential = document.cookie.split("; ").find((row) => row.startsWith("credential="))?.split("=")[1];
        if (credential && username) {
            instance.post('/delete', {"username":username, "credential":credential})
                .then(function(response) {
                    const status = response.data.statusCode
                    if (status == 200) {
                        router.push('/')
                    } else {
                        setErr(response.data.error)
                    }
                })
                .catch(function(error) {
                    if (error.response) {
                        // The request was made, and the server responded with a status code outside the 2xx range
                        console.error("API responded with an error:");
                        console.error("Status code:", error.response.status);
                        console.error("Response data:", error.response.data);
                        console.error("Headers:", error.response.headers);
                        setErr(`API error (${error.response.status}): ${error.response.data.message || 'Unknown error'}`);
                }})
        }
    }

    const handleActivate = () => {
        const credential = document.cookie.split("; ").find((row) => row.startsWith("credential="))?.split("=")[1];
        if (credential && username) {
            instance.post('/activate', {"username":username, "credential":credential})
                .then(function (response) {
                    const status = response.data.statusCode

                    if (status == 200) {
                        setIsActive(true)
                    } else {
                        setErr(response.data.error)
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made, and the server responded with a status code outside the 2xx range
                        console.error("API responded with an error:");
                        console.error("Status code:", error.response.status);
                        console.error("Response data:", error.response.data);
                        console.error("Headers:", error.response.headers);
                    
                        setErr(`API error (${error.response.status}): ${error.response.data.message || 'Unknown error'}`);
                }})
        }
    };

    const Table: React.FC<{tableid: number; seats: number;}> = ({
        tableid,
        seats
            }) => (
            <div className="table">
                <label>Table {tableid}</label>
                <label>Seats: {seats}</label>
                {!isActive && <button onClick={() => deleteTable(tableid)}>REMOVE</button>}
            </div>
            );


    const deleteTable = (tableid:number) => {
        if (username) {
            instance.post('/RemoveTables', {"username": username, "tableid": tableid
            }).then(function (response) {
                const status = response.data.statusCode;
                if (status == 200) {
                    setErr('')
                    setTables(Object.values(response.data.tables))
                }
                else {
                    setErr(JSON.stringify(response.data.error))
                }
            })       
        } else {
            setErr("Username error")
        }
    }


    const handleOpen = () => {
        const day = document.getElementById('day') as HTMLInputElement
        const month = document.getElementById('month') as HTMLInputElement
        const year = document.getElementById('year') as HTMLInputElement

        alert("Open " + day.value + month.value + year.value)
    }

    const handleClose = () => {
        const credential = document.cookie.split("; ").find((row) => row.startsWith("credential="))?.split("=")[1];
        const day = document.getElementById('day') as HTMLInputElement
        const month = document.getElementById('month') as HTMLInputElement
        const year = document.getElementById('year') as HTMLInputElement

        if (day.value && month.value && year.value) {
            instance.post('/close', {"username": username, "credential": credential, "day": day.value, "month": month.value, "year": year.value})
                .then(function(response) {
                    const status = response.data.statusCode;
                    if (status == 200) {
                        // something here. maybe we should add a table that shows closed dates?
                        setCloseErr("")
                    }
                    else {
                        setCloseErr(response.data.error)
                    }
                })
        }
        else {
            setCloseErr("Please fill out all fields")
        }
    }
    const handleDate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log(e.currentTarget.date.value)
        router.push(`/availability?date=${encodeURIComponent(e.currentTarget.date.value)}`);
    };


    return (
        <div className='content-create'>
        <div className='createbox'>
            <h2>{restname}</h2>
            <label>{address}</label>
            <label>Open Time: {opentime}:00</label>
            <label>Close Time: {closetime}:00</label>
            {!isActive && <button onClick={handleActivate}>Activate</button>}
            {!isActive && <div className='createbox'>
                <InputField label = 'Seats:' placeholder='Number of Seats' id  = 'seats'/>
                <button onClick={handleAddTable}>Add Table</button>
            </div>}
            <div className='stackbox'>
                <h2>Tables</h2>
                {tables?.map(({tableid, seats}) => (
                    <Table
                    key={tableid}
                    tableid={tableid}
                    seats={seats}
                    /> 
                ))}
            </div>
        </div>
        <div className='createbox'>
            {!isActive && <div className='stackbox'>
                <h2>Edit Restaurant Details</h2>
                <form className='editform' onSubmit={handleEdit}>
                    <InputField label = 'Name ' placeholder='' id='name' defaultValue={restname}/>
                    <InputField label = 'Address ' placeholder='' id='address' defaultValue={address}/>
                    <InputField label = 'Open ' placeholder='' id='open' type='number' defaultValue={opentime}/>
                    <InputField label = 'Close ' placeholder='' id='close' type='number' defaultValue={closetime}/>
                    <button type='submit'>Make Changes</button>
                    <label className="error">{err}</label>
                </form>      
            </div>}
            <div style={{alignContent: 'center'}} className='stackbox'>
                <h2>Check Availabity</h2>
                <form className='dateform' onSubmit={handleDate}>
                    <InputField label='Date ' placeholder='XX/XX/XXXX' id='date'/>
                    <button type='submit'>Check Availability</button>
                </form>
            </div>
        </div>
        <div className='createbox'>
            <h3>Open or Close a Future Date</h3>
                <InputField label='Day ' id='day' placeholder=''/>
                <InputField label='Month ' id='month' placeholder=''/>
                <InputField label='Year ' id='year' placeholder=''/>
                <button onClick={handleOpen}>Open</button>
                <button onClick={handleClose}>Close</button>
                <label className='error'>{closeErr}</label>
        </div>
    </div>
    );
};

export default Manage;