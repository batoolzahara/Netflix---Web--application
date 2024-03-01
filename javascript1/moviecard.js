'use strict';

import { imagebaseurl } from "./api.js";


/***Movie card for Home Page */
export function createMovieCard(movie)
{


const
{
poster_path,
title,
vote_average,
release_date,
id

}=movie;

const card=document.createElement("div");
card.classList.add("movie-card");
card.innerHTML=`<figure class="poster-box card-banner">
<img src="${imagebaseurl}w342${poster_path}" alt="${title}" class="image-cover" loading="lazy">

</figure>
<h4 class="title">${title}</h4>
<div class="meta-list">
<div class="meta-item"><i class="fa-solid fa-star"></i>
    <span class="span">${vote_average.toFixed(1)}</span>
</div>

<div class="card-badge">${release_date.split("-")[0]}</div>

</div>

<a href="movie-detail.html" class="card-btn" title="${title}" onclick="getMovieDetail(${id})"></a>

`;

return card;

}

