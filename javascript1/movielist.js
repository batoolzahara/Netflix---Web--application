'use strict';
 import { api_key , fetchdatafromserver , imagebaseurl} from "./api.js";

 import { sidebar } from "./sidebar.js";

 import { createMovieCard } from "./moviecard.js";

 import { search } from "./search.js";
const genreName=window.localStorage.getItem("genreName");
const urlParam=window.localStorage.getItem("urlParam");
//const fetchURL=`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`;


 const pageContent=document.querySelector("[ page-content]");

 sidebar();
 search();

 let currentPage=1;
 let totalPages=0;


 fetchdatafromserver(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}` , function({results:movieList, total_pages})
 {

totalPages=total_pages;

document.title=`${genreName} Movies - Netflix`;

const movieListElem=document.createElement("section");

movieListElem.classList.add("movie-list", "genre-list");

movieListElem.ariaLabel=`${genreName} Movies`;
movieListElem.innerHTML=
` <div class="title-wrapper">
<h3 class="title-large">All ${genreName} Movies</h3>
    </div>
    <div class="grid-list">
                
    </div>
    <button class="btn load-more" load-more>Load More</button>
`;


/****Add Movie card basd on loading more buttons */

for(const movie of movieList)
{

const movieCard=createMovieCard(movie);

movieListElem.querySelector(".grid-list").appendChild(movieCard);
}

pageContent.appendChild(movieListElem);



/**Load More Functanlity */


document.querySelector("[load-more]").addEventListener("click", function()
{
if(currentPage>=totalPages)
{
this.style.display="none";
return;
}

currentPage++;
//this.classlist.add("loading");

fetchdatafromserver(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, ({results:movieList})=>
{

   // this.classList.remove("loading");

    for(const movie of movieList)
    {
const movieCard=createMovieCard(movie);

movieListElem.querySelector(".grid-list").appendChild(movieCard);

    }
});

});


 });
