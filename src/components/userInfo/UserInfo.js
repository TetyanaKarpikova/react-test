import React from 'react';
import './UserInfo.css';

const UserInfo = ({information}) => {

    const {lastName, firstName, adress:{streetAddress, city, state, zip }} = information;
    
    return (
        <div className="userInfo">
            <h3>Profile info:</h3>
            <div> <em>Selected profile: </em>{firstName} {lastName}</div>
            <div><em>Address:</em>  {streetAddress}</div>
            <div><em>City: </em> {city}</div>
            <div><em>State: </em> {state}</div>
            <div><em>Index: </em> {zip}</div>
            
        </div>
    );
};

export default UserInfo;