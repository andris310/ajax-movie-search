$(document).ready(function() {


	$('#results_list').on('click', 'li', getInfo);

		function getInfo(){
			var imdbID = $(this).attr('data-id');
			$.ajax({
				url: "http://www.omdbapi.com/?i=" + imdbID,
				method: 'get',
				dataType: 'jsonp',
				success: function(info){
					$('#info').html('');

					var title = info['Title'];
					var year = info['Year'];
					var poster = ('<img src="' + info['Poster'] + '"/>');
					var actors = info['Actors'];
					var showInfo = $('#info');
					showInfo.append(title);
					showInfo.append(poster);
				}
			});
		}

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
				console.log(results.Search);

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