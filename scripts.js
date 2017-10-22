// Create Cards

var IdeaCard = function(title, idea, id, quality) {
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.counter = 0;
};

var ratingArray = ['Swill', 'Plausible', 'Genius'];

$('.idea-card-wrap').on('click', '.upvote-button', function() {
  var clickedCardId = $(this).parent('article').attr('id');
  console.log($(this).parent('article').attr('id'));

  var theObject = localStorage.getItem(localStorage.key("clickedCardId"));
  var parsedTheObject = JSON.parse(theObject);
  $(this).siblings('.downvote-button').removeAttr('disabled');
  if (parsedTheObject.counter === 2) {
    $(this).attr('disabled', true);
  } else {
    parsedTheObject.counter++;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedTheObject.counter]);
    JSON.stringify(parsedTheObject.counter);
    // JSON.stringify()
    // return this.counter;
  console.log(parsedTheObject);
  };
});

$('.idea-card-wrap').on('click', '.downvote-button', function() {

  var theObject = localStorage.getItem(localStorage.key(0));
  var parsedTheObject = JSON.parse(theObject);
  $(this).siblings('.upvote-button').removeAttr('disabled');
  if (parsedTheObject.counter === 0) {
    $(this).attr('disabled', true);
  } else {
    parsedTheObject.counter--;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedTheObject.counter]);
    // return parsedTheObject.counter;
  };
});



$(document).ready(function() {
  for (let i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  console.log(parsedObject);
  console.log(ratingArray)
  console.log(ratingArray[this.counter])
  $('.idea-card-wrap').prepend(`<article id="${parsedObject.id}" class="idea-card">
    <h1 class="user-idea">${parsedObject.title}</h1>
    <label for="delete-button" hidden></label>
    <button class="delete-button"></button>
    <p class="user-idea-details" contenteditable="true">${parsedObject.idea}</p>
    <label for="upvote-button" hidden></label>
    <button class="upvote-button"></button>
    <label for="downvote-button" hidden></label>
    <button class="downvote-button"></button>
    <h2>quality: <span class="rating">${ratingArray[parsedObject.counter]}</span></h2>
    <hr>
    </article>`)
  // var cardFromLocalStorage = new IdeaCard(parsedObject)
  }
})



$('.save-button').on('click', function(event) {
  event.preventDefault();
  var titleInput = $('#title-input').val();
  var ideaInput = $('#idea-input').val();
  var dateNow = Date.now();
  $('.idea-card-wrap').prepend(`<article id="${dateNow}" class="idea-card">
    <h1 class="user-idea">${titleInput}</h1>
    <label for="delete-button" hidden></label>
    <button class="delete-button"></button>
    <p class="user-idea-details" contenteditable="true">${ideaInput}</p>
    <label for="upvote-button" hidden></label>
    <button class="upvote-button"></button>
    <label for="downvote-button" hidden></label>
    <button class="downvote-button"></button>
    <h2>quality: <span class="rating">Swill</span></h2>
    <hr>
    </article>`);
  // ask about this
  $('form')[0].reset();
  // It works, but is it wrong?
  var ideaCard = new IdeaCard(titleInput, ideaInput, dateNow);
  console.log(ideaCard);
  var stringIdeaCard = JSON.stringify(ideaCard);
  localStorage.setItem(dateNow, stringIdeaCard);

  });

// Delete Cards

$('.idea-card-wrap').on('click', '.delete-button', function() {
  $(this).parent('article').remove();
})


// $('.idea-card-wrap').on('click', '.upvote-button', function() {
//   var rating = $(this).siblings('h2').find('.rating');
//   console.log(rating)
//   if (rating.text() === 'Swill') {
//     rating.text('Plausible');
//   } else if (rating.text() === 'Plausible') {
//     rating.text('Genius');
//   };
// });

// $('.idea-card-wrap').on('click', '.downvote-button', function() {
//   var rating = $(this).siblings('h2').find('.rating');
//   console.log(rating)
//   if (rating.text() === 'Genius') {
//     rating.text('Plausible');
//   } else if (rating.text() === 'Plausible') {
//     rating.text('Swill');
//   };
// });


//FOR WHEN WE'RE USING LOCAL STORAGE???? Find Adam and Amy mod 3


// var counter = 0;
