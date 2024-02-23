import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { applyMiddleware, createStore } from 'redux';
import reducer from '../redux/Reducers';
import { fetchUserData, showStatus } from '../redux/Action';
import {thunk} from 'redux-thunk'; 

const store = createStore(reducer, applyMiddleware(thunk));

function fetchData() {
    return function(dispatch) { 
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                const users = response.data;
                dispatch(fetchUserData(users)); 
            })
            .catch(error => {
                dispatch(showStatus(error.message));
            })
    };
}

function Display() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setUsers(store.getState().users);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const handleFetchData = () => {
        store.dispatch(fetchData());
    };

    return (
        <div>
            <button onClick={handleFetchData}>fetchData</button>
            <div>
                {users.map((item) => {
                    return (
                        <div key={item.id}>
                            <h3>{item.name}</h3>
                            <p>{item.email}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Display;
