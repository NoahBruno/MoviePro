let url = 'https://gelatinous-cord-feather.glitch.me/movies',
    givenId = 1;

//will display and error Message on the html page
function errorMessage(error) {
    console.log('error')
    //append some error message to html page
}

//this function adds tables and stuff to html doc
let appendToHtml = (title, rating, poster, year, genre, directors, actors, movieId) => {

    return `
<!--here-->
<div class="card h-100">
    ${hasPoster(poster, title)}
    <div class="card-body text-center">
        <h5>${isUndefined(title)}</h5>
        <p class="card-text">
            ${isUndefined(rating)}<br>
            ${isUndefined(year)}<br>
            ${isUndefined(genre)}<br>
            ${isUndefined(directors)}<br>
            ${isUndefined(actors)}<br>
        </p>
    </div>
    <div class="card-footer">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-sm btn-secondary" data-toggle="modal" data-target="#modalEdit${movieId}">
            Edit
        </button>

        <!-- Modal -->
        <div class="modal fade" id="modalEdit${movieId}" tabindex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title text-white" id="exampleModalLabel">Edit Movie</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="editTitle">Title</label>
                                    <input type="text" class="form-control" id="editTitle${movieId}">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="editYear">Year</label>
                                    <input type="text" class="form-control" id="editYear${movieId}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="editGenre">Genre's</label>
                                <input type="text" class="form-control" id="editGenre${movieId}"
                                       placeholder="All the Genre's">
                            </div>
                            <div class="form-group">
                                <label for="editActors">Actors</label>
                                <input type="text" class="form-control" id="editActors${movieId}"
                                       placeholder="Who was in it?">
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="editImg">Movie Thumbnail</label>
                                    <input type="text" class="form-control" id="editImg${movieId}"
                                           placeholder="Drop movie image URL here!">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="editRating">Rating</label>
                                    <select id="editRating${movieId}" class="form-control">
                                        <option selected>Choose...</option>
                                        <option>Y-7</option>
                                        <option>G</option>
                                        <option>PG</option>
                                        <option>PG-13</option>
                                        <option>R</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" id="editData${movieId}" data-dismiss="modal">Save
                            changes
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <button id="deletePost${movieId}" class=" btn btn-sm btn-danger mx-1">Remove</button>
    </div>
</div>

<!--here-->
`
}

//this function test purposes on;y
/*function buttonClick(movieId) {
    $('#' + movieId).click(function (e) {
        e.preventDefault()
        console.log('clicked' + movieId)
    })
}*/

//this function checks if the content we pull has content, if not; then we return an empty string
let isUndefined = (content) => {
    if (content === undefined) {
        return 'missing content'
    } else {
        return content
    }
}
//this function checks to see if we have a poster/thumbnail for the movie
let hasPoster = (poster, title) => {
    if (!poster) {
        return `<img src="https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png" class="size" alt="img_placeholder">`
    } else {
        return `<img src="${poster}" class="size" alt="${title}_image">`
    }
}

//this function does the fetch request from the API to receive movie info
function moviesRequest() {
    /*  loading();*/
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            console.log(movies)
            /*  clearLoading();*/
            movies.forEach(movie => {
                //we created our own library
                let id = movie.id
                let title = movie.title
                let rating = movie.rating
                let poster = movie.poster
                let year = movie.year
                let genre = movie.genre
                let director = movie.director
                let actors = movie.actors
                givenId = id;

                $('#data').empty();

                function one() {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            console.log(givenId)
                            $('#data').append(appendToHtml(title, rating, poster, year, genre, director, actors, id));
                            resolve();
                        }, 1000);
                    })
                }

                function two() {
                    $("#deletePost" + id).click(function () {
                        deletePost(id);
                        console.log(id)
                    });


                    $("#editData" + movie.id).click(function (e) {
                        console.log(movie.id);
                        e.preventDefault()
                        data = {
                            title: $("#editTitle" + movie.id).val(),
                            year: $("#editYear" + movie.id).val(),
                            genre: $("#editGenre" + movie.id).val(),
                            actors: $("#editActors" + movie.id).val(),
                            poster: $("#editImg" + movie.id).val(),
                            rating: $("#editRating" + movie.id).val(),
                        }
                        console.log(id)
                        //for testing
                        /*    console.log(data)*/
                        console.log(data);
                        edit(data, movie.id);
                    });
                }
                one().then(two)
            })
        })
        .catch(error => errorMessage(error));
}

//when you click the 'add' button, we add a new post
$("#addPost").click(function (e) {
    e.preventDefault()
    givenId++
    data = {
        title: $("#inputTitle").val(),
        year: $("#inputYear").val(),
        genre: $("#inputGenre").val(),
        actors: $("#inputActors").val(),
        poster: $("#inputImg").val(),
        rating: $("#inputRating").val(),
        id: givenId
    }
    //for testing
    /*    console.log(data)*/
    addNewMovie(data)
});

//this function adds a new movie by post request
function addNewMovie(data) {
    // data = {title: 'movie-title'};
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then( () => {
            moviesRequest();
            /*            console.log(data);*/
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//add a scroll animation to the page
/*let scrollTarget = document.getElementById('targetScroll');
let scrollTarget2 = document.getElementById('targetScroll2')
window.document.addEventListener('scroll', function () {
    if (window.scrollY > scrollTarget.scrollTop) {
        scrollTarget.classList.add('curtain_left');
        scrollTarget2.classList.add('curtain_right');
    } else if (window.scrollY < 10) {
        scrollTarget.classList.remove('curtain_left');
        scrollTarget2.classList.remove('curtain_right');
    }
})*/

//adds ripple effect to buttons
/*let addRippleEffect = e => {
    let btn = e.currentTarget;
    btn.classList.add('ripple');
    let ripple = btn.getElementsByClassName('ripple');
    if (ripple) {
        ripple.remove()
        console.log('removed')

    }
}*/

//adds animation to all buttons on the DOM
/*const buttons = document.getElementsByTagName('button');
for (const button of buttons) {
    button.addEventListener('click', addRippleEffect)
}*/

//makes a loading spinner via bootstrap.
function loading() {
    let spinner =
        `<div class="text-center">
  <div class="spinner-border text-light" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>`
    $('#loading').append(spinner);
}

//clears loading spinner
function clearLoading() {
    $('#loading').empty();
}

/*HTML Manipulation*/
loading()

function loadingInterval() {
    $(document).ready(function () {
        console.log('cleared');
        clearLoading()
        moviesRequest();
    })
    //where we will write functionality.
}

//loads the page
setTimeout(loadingInterval, 1000);

//this function deletes posts from wherever we call it
function deletePost(id) {
    fetch(url + `/${id}`, {
        method: 'DELETE',
    }).then((response) => response.json())
        .then((json) => moviesRequest());

}

//this edits the current post
function edit(data, id) {
    fetch(url + `/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((json) => moviesRequest());
}





