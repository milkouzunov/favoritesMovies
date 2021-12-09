import config from './config';

export async function addRatings (rating) {
    const token = localStorage.getItem('token');

    return await fetch(`${config.API_URL}/movies/ratings`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${token}`
        },
        body: JSON.stringify(rating)
    });
}

export async function addComment (comment) {
    const token = localStorage.getItem('token');

    try {
        const response = await await fetch(`${config.API_URL}/movies/notes`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${token}`
            },
            body: JSON.stringify(comment)
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

export async function editComment (id, comment) {
    const token = localStorage.getItem('token');

    try {
        const response = await await fetch(`${config.API_URL}/movies/notes/edit/${id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${token}`
            },
            body: JSON.stringify(comment)
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