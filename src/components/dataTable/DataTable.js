import React, { useState } from 'react';
import User from '../user/User';
import './DataTable.css';

function DataTable({ users, chooseUser, isLoading, sortColumn, sortDirect }) {

    const [fieldData, setFieldData] = useState('');
    if (isLoading) {
        return (<h2>Loading ...</h2>)
    }
    console.log(users);

    const Arrow = () => {
        return (
            sortDirect ? <span>&#9660;</span> : <span>&#9650;</span>
        )
    }

    const fieldSort = (field) => {
        sortColumn(field);
        setFieldData(field);
    }

    return (
        <div>
            {
                users
                    ?
                    <table className='headTable'>
                        <thead>
                            <tr className='nameColumn'>
                                <th onClick={() => { fieldSort('id') }}>
                                    id {fieldData === 'id' ? <Arrow /> : null}
                                </th>
                                <th onClick={() => { fieldSort('firstName') }}>
                                    First name {fieldData === 'firstName' ? <Arrow /> : null}
                                </th>
                                <th onClick={() => { fieldSort('lastName') }}>
                                    Last Name  {fieldData === 'lastName' ? <Arrow /> : null}
                                    </th>
                                <th onClick={() => { fieldSort('email') }}>
                                    Email {fieldData === 'email' ? <Arrow /> : null}
                                    </th>
                                <th onClick={() => { fieldSort('phone') }}>
                                    Phone {fieldData === 'phone' ? <Arrow /> : null}
                                    </th>
                                <th onClick={() => { fieldSort('state') }}>
                                    State
                                    </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.map((value, id) => {
                                    return (<User user={value} key={id} chooseUser={chooseUser} />)
                                })
                            }
                        </tbody>
                    </table>
                    :
                    <h2>
                        Users not gound.
                    </h2>
            }
        </div >
    );
}

export default DataTable;