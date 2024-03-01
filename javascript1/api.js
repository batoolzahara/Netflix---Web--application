'use strict';


//Decleration of an api_key;

const api_key='e65834be7566ad7b54582429e2b5c254';
const imagebaseurl='https://image.tmdb.org/t/p/';

//Fetch data from server by using callback function

const fetchdatafromserver=function(url,callback,optionalParam)
{
fetch(url)
.then(response=>response.json())
.then(data=>callback(data,optionalParam));


}

export{imagebaseurl,api_key,fetchdatafromserver};