// function fetchRandomDogImage() {
// Method 1
//   var xhrRequest = new XMLHttpRequest();
//   xhrRequest.open("get", "https://dog.ceo/api/breeds/image/random", true);
//   xhrRequest.send();
//   xhrRequest.onload = function() {
//     var responseJSON = JSON.parse(xhrRequest.response);
//     var imageURL = responseJSON.message;
//     $("#dog-image").attr("src", imageURL);
//   };
//   xhrRequest.onerror = function() {
//     console.log("Request failed!");
//   };
// Method 2
//   $.ajax({
//     url: "https://dog.ceo/api/breeds/image/random",
//     method: "GET",
//     success: function(responseData) {
//       var imageURL = responseData.message;
//       $("#dog-image").attr("src", imageURL);
//     }
//   }).fail(function() {
//     console.log("Request failed!");
//   });
// Method 3
// $.get("https://dog.ceo/api/breeds/image/random", function (responseData) {
//   var imageURL = responseData.message;
//   $("#dog-image").attr("src", imageURL);
// }).fail(function (xhr, textStatus, errorThrown) {
//   console.log("Request failed!");
// });
// }
// $("#fetch-dog-image-button").click(fetchRandomDogImage);

var breedImage = $('#breed-image')
var dropdown = $('#breeds');
var allowSubmit = true;
var breed;

$.get("https://dog.ceo/api/breeds/list/all", function (response) {
  for (breed in response.message) {
    dropdown.append('<option value="' + breed + '">' + breed.charAt(0).toUpperCase() + breed.slice(1) + '</option>');
  }
}).fail(function (xhr, textStatus, errorThrown) {
  console.error("Request failed due to Error : " + errorThrown);
});

dropdown.change(function () {
  allowSubmit = true;
});

function displayDog(breed) {
  $('#breed-image img').remove();
  $.get("https://dog.ceo/api/breed/" + breed + "/images/random", function (responseData) {
    var imageURL = responseData.message;
    breedImage.append('<img src="' + imageURL + '" alt="' + breed + '">');
  }).fail(function (xhr, textStatus, errorThrown) {
    console.error("Request failed due to Error : " + errorThrown);
  });
}

$('form button').click(function (e) {
  e.preventDefault();
  if (allowSubmit) {
    breed = dropdown.val();
    displayDog(breed);
    allowSubmit = false;
  }
});

$('#next a').click(function (e) {
  e.preventDefault();
  if (breed != undefined) {
    displayDog(breed);
  }
});