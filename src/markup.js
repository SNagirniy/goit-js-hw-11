export default function renderCard(array) { 

    return array.map(({ webformatURL, likes, views, downloads, comments, tags, largeImageURL }) => 
     `<div class="photo-card">
     <a class="gallery__link" href="${largeImageURL}">
    <img
      class="gallery__image"
      src="${webformatURL}"
      alt="${tags}"
      loading="lazy"
    />
    
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
  </a>
</div>
`).join('')
}