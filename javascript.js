
	function getInfo(){
		var imdbID = $(this).attr('data-id');
		$.ajax({
			url: "http://www.omdbapi.com/?i=" + imdbID,
			method: 'get',
			dataType: 'jsonp',
			success: function(info){

				// get attributes 
				var poster = ('<img src="' + info['Poster'] + '"/>');

				// build details node
				var details = $('<div id="details"></div>');
				var textInfo = $('<div id="text_info"></div>');
				details.append($("<h2>" + info['Title'] + " " + info['Year'] + "</h2>"));
				details.append(poster);
				textInfo.append($('<span><h4>Genre: </h4>' + info['Genre'] + '</span>'));
				textInfo.append($('<span><h4>Director: </h4>' + info['Director'] + '</span>'));
				textInfo.append($('<span><h4>Actors: </h4>' + info['Actors'] + '</span>'));
				textInfo.append($('<p><h4>Plot: </h4>' + info['Plot'] + '</p>'));
				details.append(textInfo);

				// add node to DOM
				$('#info').html(details);
			}
		});
	}

$(document).ready(function() {


	$('#results_list').on('click', 'li', getInfo);

	$('form').bind('keyup submit', function(event) {
		event.preventDefault();
		var title = $('#movie_title').val();

		$.ajax({
			url: "http://www.omdbapi.com/?s=" + title,
			method: 'get',
			dataType: 'jsonp',
			success: function(results){
				$('#results_list').html('');

				var r = results.Search;

				for(var i = 0; i < r.length; i += 1){
					var movie = r[i]['Title'];
					var year = r[i]['Year'];
					var id = r[i]['imdbID'];
					var list = $('#results_list');
					var result = $('<li data-id="' + id + '"></li>');
					var link = $('<a href="#"></a>');
					link.append(movie, year);
					result.append(link);
					list.append(result);
				}
			}
		});
	});
});