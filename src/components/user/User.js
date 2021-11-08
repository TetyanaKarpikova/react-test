import React from 'react';
import './User.css';

const User = ({ user, chooseUser }) => {
        
    const { id, firstName, lastName, email, phone, adress: { state } } = user;   

    return (
        <tr className="rowTable" onClick={() => chooseUser(id, email)}>
            <td className='id'>{id}</td>
            <td className='first-name'>{firstName}</td>
            <td className='last-name'>{lastName}</td>
            <td className='email'>{email}</td>
            <td className='phone'>{phone}</td>
            <td className='state'>{state}</td>
        </tr>
    );
};

export default User;