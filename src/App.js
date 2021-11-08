import { useState, useEffect, useMemo } from 'react';
import DataTable from './components/dataTable/DataTable';
import './App.css';
import InputSearch from './components/InputSearch';
import UserSearch from './components/UserSearch';
import UserInfo from './components/userInfo/UserInfo';
import Pagination from './components/pagination/Pagination';

function App() {

  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [sorted, setSorted] = useState({ filter: '', select: '' });  
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);
  const [newList, setNewList] = useState([]);
  const [sortDirect, setSortDirect] = useState(true);


  const url = `https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json`;

  let lastUsers = currentPage * usersPerPage;
  let firstUsers = lastUsers - usersPerPage;
  let currentUser = data.slice(firstUsers, lastUsers);
  let searchUser = [];
 
  const sortedDatas = useMemo(() => {
    if (data) {
      return data.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      })
    }

    return data;

  }, [data]);

  const sortedAZ = (arr, field) => {
    if (arr) {
      return arr.sort(function (a, b) {
        if (a[field] > b[field]) {
          return 1;
        }
        if (a[field] < b[field]) {
          return -1;
        }
        return 0;
      })
    }

    return arr;
  };
  
  
  const sortAndSearch = useMemo(() => {
    if (data && sorted.select) {
      searchUser = sortedDatas.filter(element => element.firstName.toLowerCase().includes(sorted.select.toLowerCase()));
      return searchUser;
    }

    if (sorted.filter) {
      console.log(sorted.filter);
      searchUser = sortedDatas.filter((element) => {
        let item = element.adress;        
        return item.state.toLowerCase().includes(sorted.filter.toLowerCase())
      });
      
      return searchUser;
    }

    return data;

  }, [sorted.select, sorted.filter, sortedDatas, currentUser]);



  const chooseUser = (id, email) => {
    if (data) {
      return setUserInfo(data.find(element => element.id === id && element.email === email));
    }
    return '';
  }


  let listUsers = sortAndSearch ? sortAndSearch.slice(firstUsers, lastUsers) : data.slice(firstUsers, lastUsers);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

    if (!searchUser) {
      setNewList(data.slice(pageNumber * usersPerPage - usersPerPage, pageNumber * usersPerPage));
    }
    if (searchUser) {
      if (pageNumber > sortAndSearch.length / usersPerPage) {
        setNewList(sortAndSearch.slice(0, usersPerPage));
      }
      setNewList(sortAndSearch.slice(pageNumber * usersPerPage - usersPerPage, pageNumber * usersPerPage));
    }

  }

  const nextPage = () => {
    setCurrentPage(next => next + 1);
    let maxPage = 0;
    sortAndSearch
      ?
      maxPage = Math.ceil(sortAndSearch.length / usersPerPage)
      :
      maxPage = Math.ceil(data.length / usersPerPage);
    console.log(newList);
    if (currentPage === maxPage) {
      setCurrentPage(maxPage);
    }
    setNewList(currentPage * usersPerPage - usersPerPage, currentPage * usersPerPage);
  }
  const prevPage = () => {
    setCurrentPage(prev => prev - 1);
    if (currentPage === 1) {
      setCurrentPage(1);
    }
    setNewList(currentPage * usersPerPage - usersPerPage, currentPage * usersPerPage);
  }

  const sortColumn = (field) => {
    setSortDirect(value => !value);
    sortDirect ? setNewList(sortedAZ(listUsers, field)) : setNewList(sortedAZ(listUsers, field).reverse());
  }

  const fetchData = async () => {
    setIsLoading(true);
    await fetch(url)
      .then(response => response.json())
      .then(json => setData(json))
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {

  }, [listUsers]);

  return (
    <div className="content">
      <UserSearch
        sorted={sorted}
        setSorted={setSorted} />

      {
        newList.length
          ?
          <DataTable
            users={newList}
            key={newList.id}
            chooseUser={chooseUser}
            isLoading={isLoading}
            sortColumn={sortColumn}
            sortDirect={sortDirect} />
          :
          <DataTable
            users={listUsers}
            key={listUsers.id}
            chooseUser={chooseUser}
            isLoading={isLoading}
            sortColumn={sortColumn}
            sortDirect={sortDirect} />
      }
      {
        !listUsers && <h2>Username not found!</h2>
      }

      <div className="wrapperPagination">
        <button className="arrow-page arrow-left" onClick={prevPage}>Prev Page</button>
        {sortAndSearch
          ?
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={sortAndSearch.length}
            paginate={paginate}
            newList={newList}
            currentPage={currentPage} />
          :
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={data.length}
            paginate={paginate} />
        }
        <button className="arrow-page arrow-right" onClick={nextPage}>Next Page</button>
      </div>
      {
        userInfo
          ?
          <UserInfo
            key={UserInfo.id}
            information={userInfo} />
          :
          null
      }

    </div>

  );
}

export default App;
