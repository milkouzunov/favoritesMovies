import config from './config';


export function get (movieTitle) {
    return fetch(`${config.API_URL}/movies?title=${movieTitle !== '' ? movieTitle : undefined}`)
}

export async function getById (movieId) {
    return await fetch(`${config.API_URL}/movies/${movieId}`);
}