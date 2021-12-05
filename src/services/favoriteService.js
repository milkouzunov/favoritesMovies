import config from './config';

export async function get () {
    const token = localStorage.getItem('token');

    return await fetch(`${config.API_URL}/favorites`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${token}`
        },
    });
}

export async function add (movie) {
    const token = localStorage.getItem('token');
    
    return await fetch(`${config.API_URL}/favorites`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${token}`
        },
        body: JSON.stringify(movie)  
    });
}

export async function remove (movieId) {
    const token = localStorage.getItem('token');
    
    return await fetch(`${config.API_URL}/favorites/${movieId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${token}`
        }
    });
}