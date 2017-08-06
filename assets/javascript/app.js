 // // Example queryURL for Giphy API
 //    var queryURL = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

 //    $.ajax({
 //      url: queryURL,
 //      method: 'GET'
 //    }).done(function(response) {
 //      console.log(response);
 //    });

$(document).ready(function() {

	// generate array for button topics

	var topics = ["olenna tyrell", "jon snow", "daenerys", "cersei",
	"starks", "lannisters", "missandei", "khal drogo", "unsullied",
	"sansa", "arya", "littlefinger", "jamie lannister", "tyrion"];

	var topic = 0; // indicator for position of topic in topics array


	makeButtons(topics); // calls function to dynamically create buttons


	var characterName;

	var queryURL;

	getGifs(); // calls function to get GIFs from Giphy API

	$("#topicForm").on("click", "button", function() {

		event.preventDefault();

		// clear gifButtons div
		$("#gifButtons").empty();

		var addCharacter = $("input").val().trim();
		console.log(addCharacter);

		topics.push(addCharacter);
		console.log(topics);

		topic = 0;

		// clear topicButtons div
		$("#topicButtons").empty();

		makeButtons(topics);

		// clear text from form
		$("input").val('');

	})

	// ***** FUNCTIONS *****
		function makeButtons(array) {
			// for each topic in the array...
			$(array).each(function	() {

				// create button for each topic in the array

				// add class id and name attribute
				var topicButton = $("<button/>").addClass("btn btn-default").attr("id", "topicBtn");
				$(topicButton).attr("name", array[topic]);

				// add the topic as the title of the button
				$(topicButton).append(topics[topic]);

				// append button to div id topicButtons
				$("#topicButtons").append(topicButton);

				console.log(topicButton);

				topic++; // increment by one to move to next topic in array
			});
		} // end makeButtons function

		function getGifs() {

		// when a topic button is clicked...
		$("#topicButtons").on("click","button", function() {

			// clear the #gifButtons div
			$("#gifButtons").empty();

			// capture the character's name for this button
			characterName = $(this).attr("name") + " game of thrones";

			console.log(characterName);

			// queryURL for Giphy API
				queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
					characterName + "&api_key=11c9af6afb4a4da28efed9d8c79be813&limit=10";

				$.ajax({
					url: queryURL,
					method: 'GET'
				}).done(function(response) {
						console.log(response);

						console.log(response.data);

						// console.log(response.data[0].images.fixed_height_still.url);

						// for each item in the .data...
						for (i = 0; i < (response.data).length; i++){

							// create a var to hold the fixed_height animated url
							var animateImage = response.data[i].images.fixed_height.url;

							var stillImage = response.data[i].images.fixed_height_still.url;

							var rating = response.data[i].rating;

							// console.log("animated url: " + animateImage + " | still url: " + stillImage);

							// create a new divs and rows to hold the rating and image

							var divImage = $("<div/>").addClass("col-md-3");

							var pRow = $("<div/>").addClass("row").attr("id", "pRow");


							var imgRow = $("<div/>").addClass("row").attr("id", "imgRow");

							$(divImage).append(pRow).append(imgRow);

							// create paragraph tag for rating and append to pRow
							var mainTag = $("<p><h3>Rating: " + rating + "</h3></p>");

							$(pRow).append(mainTag);

							// create a new var to hold an image tag with class gif
							var gifImage = $("<img/>").addClass("gif");

							// make src attribute equal to still url
							$(gifImage).attr("src", stillImage);

							// add attributes for still, animate, and state

							$(gifImage).attr("data-still", stillImage).attr("data-animate", animateImage).attr("data-state", "still");

							$(imgRow).append(gifImage);


						// append images to gifButtons div
						$("#gifButtons").append(divImage);

					} // end of for loop

					// when a gif image is clicked...
					$(".gif").on("click", function() {

						var state = $(this).attr("data-state");

						// if the state is "still"
						if (state === "still") {

							// set this items src to the animated url
							$(this).attr("src", $(this).attr("data-animate"));

							// set this item's data-state to "animated"
							$(this).attr("data-state", "animated");
						}

						else {

							$(this).attr("src", $(this).attr("data-still"));

							$(this).attr("data-state", "still");
						}


					}); // end of gif on.click function


				}); // end of ajax.done function


		}); // end of button on.click function

	} // end of getGifs function

}); // end of script
