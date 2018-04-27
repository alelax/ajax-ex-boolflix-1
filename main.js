var availableFlags = [
	'en',
	'it'
];

$(document).ready(function() {

	$('#myButton').click(function() {

		reset();

		var query = $(this).siblings('#query').val();

		$.ajax({
			url: 'https://api.themoviedb.org/3/search/movie',
			method: 'GET',
			data: {
				api_key: 'e99307154c6dfb0b4750f6603256716d',
				query: query,
				language: 'it-IT'
			},
			success: function(data) {
				var moviesFromApi = data.results;

				if (moviesFromApi.length > 0) {
					var movies = getMovies(moviesFromApi);

					print(movies);
				}
			},
			error: function() {
				alert('Si è verificato un errore');
			}
		});

		$.ajax({
			url: 'https://api.themoviedb.org/3/search/tv',
			method: 'GET',
			data: {
				api_key: 'e99307154c6dfb0b4750f6603256716d',
				query: query,
				language: 'it-IT'
			},
			success: function(data) {
				var tvShowsFromApi = data.results;

				if (tvShowsFromApi.length > 0) {
					var tvShows = getTvShows(tvShowsFromApi);

					print(tvShows);
				}
			},
			error: function() {
				alert('Si è verificato un errore');
			}
		});

	});

});

function reset()
{
	var objectsContainer = $('.objects');

	objectsContainer.html('');
}

function getMovies(moviesFromApi)
{
	var movies = [];

	for (var i = 0; i < moviesFromApi.length; i++) {
		var movie = moviesFromApi[i];

		movies[i] = {
			title: movie.title,
			original_title: movie.original_title,
			lang: movie.original_language,
			vote: movie.vote_average,
			type: 'Film'
		};
	}

	return movies;
}

function getTvShows(tvShowsFromApi)
{
	var tvShows = [];

	for (var i = 0; i < tvShowsFromApi.length; i++) {
		var tvShow = tvShowsFromApi[i];

		tvShows[i] = {
			title: tvShow.name,
			original_title: tvShow.original_name,
			lang: tvShow.original_language,
			vote: tvShow.vote_average,
			type: 'Tv Show'
		};
	}

	return tvShows;
}

function print(objects)
{
	var objectsContainer = $('.objects');

	for (var i = 0; i < objects.length; i++) {
		var object = objects[i];
		objectsContainer.append(`
				<div class="movie">
					<ul>
						<li>Titolo: ` + object.title + `</li>
						<li>Titolo Originale: ` + object.original_title + `</li>
						<li>Lingua: ` + object.lang + getFlag(object.lang) + `</li>
						<li>Voto: ` + object.vote + `</li>
						<li>Rating: ` + getRating(object.vote) + `</li>
						<li>Type: ` + object.type + `</li>
					</ul>
				</div>
			`)
	}
}

//Ritornerà una porzione di html con stelle piene e vuote in base al rating
function getRating(vote)
{
	//trasformiamo il voto da 1 a 10 a un rating da 1 a 5
	var rating = Math.floor(vote / 2);
	var html = '';

	for (var i = 1; i <= 5; i++) {
		if (i <= rating) {
			html += '<i class="fas fa-star"></i>';
		}
		else {
			html += '<i class="far fa-star"></i>';
		}
	}


	return html;
}

function getFlag(lang)
{
	var html = '';

	if (availableFlags.includes(lang)) {
		html += '<img src="' + lang + '.svg" width="40" />';
	}

	return html;
}
