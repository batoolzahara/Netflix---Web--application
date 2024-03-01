 'use strict'
 const addEventsOnElements=function(elements, eventType, callback)
 {
for(const elem of elements)elem.addEventListener(eventType,callback);


 }

 /*** ___Toggler search Box on mobile screen */
 const searchbox=document.querySelector("[search-box]");
 const searchTogller=document.querySelectorAll("[search-toggler]");

 addEventsOnElements(searchTogller,"click", function()
 {
searchbox.classList.toggle("active");

 });


 /******* Store movie Id in Local Storage to get item when you click any  movie card */


 const getMovieDetail=function(movieId)
 {
window.localStorage.setItem("movieId", String(movieId));

 }

 const getMovieList=function(urlParam,genreName)
 {
window.localStorage.setItem("urlParam", urlParam);
window.localStorage.setItem("genreName", genreName);

 }