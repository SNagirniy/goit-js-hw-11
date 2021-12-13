import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class apiService { 

    constructor() {
        this.searchQuery = '';
        this.page = 1;
     }

    fetchImages() { 
    const API_KEY = '24761212-f6a43eb974ac25be5c538333c';
        return axios.get(`?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`).then(image => { this.incrementPage();  return image.data });
    }

    incrementPage() { 
        this.page +=1
    }

    resetPage() { 
        this.page =1
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) { 
        this.searchQuery = newQuery;
    }
};