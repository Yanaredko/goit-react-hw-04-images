const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39035675-aa57939432b499989b05c1345';

async function fetchImages(query, page = 1) {
    const response = await fetch(
        `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch images")
    }
    return await response.json();
}

export { fetchImages };