var searchField = document.getElementById('searchField')
var content = document.getElementById('content')
var currPage = 1
const API_KEY = 'e94faa5f'; 
const BASE_URL = 'https://www.omdbapi.com/';

async function fetchMovies(searchTerm,pageNo){
    
    try{
        const response = await fetch(`${BASE_URL}?&apikey=${API_KEY}&s=${searchTerm}&page=${pageNo}`);
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log('movie not found')
    }

}

function searchMovies(){
    currPage =1
    const movieData = fetchMovies(searchField.value,currPage)
    movieData
    .then((ren)=>{
        if(ren.Response == "False"){
            alert('Movie not found')
        }
        console.log(ren.Search)
        content.innerHTML = ""
        ren.Search.forEach(element => {
            if (element.Poster != 'N/A'){
                let htmlToBeAdded = 
                `
               <div class="card">
               <img src="${element.Poster}">
               <h3>${element.Title}</h3>
               <p>${element.Year}</p>
               </div>
               `
               content.innerHTML += htmlToBeAdded
            }
        });
    })
    .catch(()=>{
        alert('An error occured')
    })
}

const debounce = ((func,timer)=>{
    let timeOut;
    return (...args)=>{
        if (timeOut){
            clearTimeout(timeOut)
        }
        timeOut = setTimeout(() => {
            func(...args)
        }, timer);
    }
})

searchField.addEventListener('input', debounce(searchMovies,1000))


