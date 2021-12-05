/* eslint-disable import/no-anonymous-default-export */
import config from './config';

export async function signUp (user) {
    const {username, password, rePassword} = user;

    try {
        const response = await fetch(`${config.API_URL}/auth/register`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password, rePassword})
    });

        if (response.ok == false) {
            let error = (await response.json());
            
            if( error.error) {
                error = error.error;
            }
            throw new Error(error);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err){
            return response;
        }

    } catch (err) {
        throw err;
    }
    
}

export async function signIn (user) {
    const {username, password} = user;


    try {
        const response = await fetch(`${config.API_URL}/auth/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
    });

        if (response.ok == false) {
            let error = (await response.json()).error;
            if( error.error) {
                error = error.error;
            }
            throw new Error(error);
        }

        try {
            const data = await response.json();

            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);

            return data.username;
        } catch (err){
            return response;
        }

    } catch (err) {
        throw err;
    }
}

