import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import apiService from './api-service';
import renderCard from './markup'


const refs = {
    form: document.querySelector('.search-form'),
    searchBtn: document.querySelector('button[type="submit"]'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};


refs.form.addEventListener('submit', getImages);
refs.loadMoreBtn.addEventListener('click', loadMoreImages);






const imageApiService = new apiService();
let lightbox;

async function getImages(e) { 
  e.preventDefault();
  const inputValue = e.currentTarget.elements.searchQuery.value.trim();
  
  if (inputValue === '') { return };

  imageApiService.query = inputValue;
  imageApiService.resetPage();

    try {
      const images = await imageApiService.fetchImages();
      if (images.hits.length === 0) { Notify.failure("Sorry, there are no images matching your search query. Please try again."); return};

      refs.gallery.innerHTML = renderCard(images.hits);
      Notify.success(`Hooray! We found ${images.totalHits} images.`)
      lightbox = new SimpleLightbox('.gallery a');

      refs.loadMoreBtn.classList.remove('is-hidden');

    } catch (error) { };
    
};


async function loadMoreImages() { 
 refs.loadMoreBtn.classList.add('is-hidden');
  
  try {
      const images = await imageApiService.fetchImages();
      refs.gallery.insertAdjacentHTML('beforeend', renderCard(images.hits));
      lightbox.refresh();
    
    refs.loadMoreBtn.classList.remove('is-hidden');
    
      const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();
       window.scrollBy({
       top: cardHeight * 2,
       behavior: "smooth",});
    
          if (images.totalHits === document.querySelectorAll('.photo-card').length) { 
             refs.loadMoreBtn.classList.add('is-hidden');
             Notify.failure("We're sorry, but you've reached the end of search results.");
    };
         
  
     } catch (error) { console.log(error)};
};


