'use strict';
import { api_key, fetchdatafromserver,imagebaseurl } from "./api.js";

import{createMovieCard} from "./moviecard.js";
//importing of sidebarfrom sidebar.js
import { sidebar } from "./sidebar.js";
import { search } from "./search.js";

const pageContent=document.querySelector("[page-content]");


//Calling of sidebar function
sidebar();

search();


/**Home page Section Trending movies, upcoming movies, Top Rated Movies  */

const homePageSection=[

 {
 title:"Upcoming Movies",
 path:"/movie/upcoming"

 } ,
 {
title:"Trending Movies",
path:"/trending/movie/week"

 } ,

 {
title:"Top Rated movies",
path:"/movie/top_rated"

 }
]

const genreList=
{
//create Genrestring from genre_id eg(23,44)_"Action , romance

asString(genreIdList)
{
let newGenreList=[];

for(const genreId of genreIdList)
{
this[genreId]&& newGenreList.push(this[genreId]) //this===genreList;

}

return newGenreList.join(",");

}

};


fetchdatafromserver(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function({genres})
{

for(const {id,name} of genres)
{
genreList[id]=name;

}
fetchdatafromserver(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`, heroBanner);



});


//Fetch data from server tmdb database


const heroBanner=function({results:movieList})
{
const banner=document.createElement("section");

banner.classList.add("banner");
banner.ariaLabel="Popular Movies";

banner.innerHTML=`
<div class="banner-slider ">

</div>
 
        

</div>

<div class="slider-control">
<div class="control-inner">


</div>


</div>

`;

let controlItemIndex=0;
for(const[index,movie] of movieList.entries())
{
const 
{
backdrop_path,
title,
release_date,
genre_ids,
overview,
poster_path,
vote_average,
id

}=movie


const sliderItem=document.createElement("div");

sliderItem.classList.add("slider-item");
sliderItem.setAttribute("slider-item","");

sliderItem.innerHTML=`
<img src="${imagebaseurl}w1280${backdrop_path}" alt="${title}" class="image-cover" loading="${index===0 ? "eager":"lazy"}">

<div class="banner-content">
<h2 class="heading">${title}</h2>

<div class="meta-list">

<div class="meta-item">${release_date.split("-")[0]}</div>
<div class="meta-item  card-badge">${vote_average.toFixed(1)}</div>


</div>
<p class="genre">${genreList.asString(genre_ids)}</p>

<p class="banner-text">${overview}</p>

<a href="movie-detail.html" class="btn" onclick="getMovieDetail(${id})" aria-label="true"><i class="fa-solid fa-play"></i>Watch Now</a>

</div>


 
        `;

 banner.querySelector(".banner-slider").appendChild(sliderItem);

 const controlItem=document.createElement("button");

 controlItem.classList.add("poster-box","slider-item");
 controlItem.setAttribute("slider-control",`${controlItemIndex}`);

 controlItemIndex++;

 controlItem.innerHTML=`<img src="${imagebaseurl}w154${poster_path}"alt="Slide to ${title}" loading="lazy" draggable="false" class="image-cover">
 `;

 banner.querySelector(".control-inner").appendChild(controlItem);


}

pageContent.appendChild(banner);

addHeroSlide();


/**Fetch Data From Server for Homepage Section of (Top-rated, trending Movies , Upcoming) */
for(const {title,path} of homePageSection)
{

fetchdatafromserver(`https://api.themoviedb.org/3${path}?api_key=${api_key}&page=1`,createMovieList,title);
}

}
const addHeroSlide=function()
{

    const sliderItems=document.querySelectorAll("[slider-item]");

    const sliderControls=document.querySelectorAll("[slider-control]");

    let lastSilderItem=sliderItems[0];
    let lastSilderControl=sliderControls[0];

    lastSilderItem.classList.add("active");
    lastSilderControl.classList.add("active");


const sliderStart=function()
{
lastSilderItem.classList.remove("active");
lastSilderControl.classList.remove("active");

sliderItems[Number(this.getAttribute("slider-control"))].classList.add("active");
this.classList.add("active");

lastSilderItem=sliderItems[Number(this.getAttribute("slider-control"))];
lastSilderControl=this;


}

addEventsOnElements(sliderControls,"click",sliderStart);


}


const createMovieList=function({results:movieList},title)
{

const movieListElem=document.createElement("section");

movieListElem.classList.add("movie-list");

movieListElem.ariaLabel=`${title}`;

movieListElem.innerHTML=` <div class="title-wrapper">
<h3 class="title-large">${title}</h3>
    </div>
    <div class="slider-list">
<div class="slider-inner">


</div>


    </div>
`;

for(const movie of movieList)
{
const movieCard=createMovieCard(movie); //Called from movie card .js

movieListElem.querySelector(".slider-inner").appendChild(movieCard);

pageContent.appendChild(movieListElem);


}

}

