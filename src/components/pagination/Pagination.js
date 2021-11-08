import React from 'react';
import { useState } from 'react/cjs/react.development';
import './Pagination.css';

const Pagination = ({ usersPerPage, totalUsers, paginate, newList, currentPage }) => {
    const pageNumbers = [];
    // const [currentUser, setCurrentUsers ] = useState([]);
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    let lastUsers = currentPage * usersPerPage;
    let firstUsers = lastUsers - usersPerPage;
    // let currentUser = newList.slice(firstUsers, lastUsers);




    // console.log(listUsers);

    return (
        <ul className="wrapperPages">
            {
                pageNumbers.map((number) => {
                    return (
                        <li className="pages" key={number}>
                            <a className="item" href="!#" onClick={() => paginate(number)}>{number}</a>
                        </li>)
                }
                )}
        </ul>
    );
};

export default Pagination;


