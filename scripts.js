// Create Cards

var IdeaCard = function(title, idea, id, quality) {
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.quality = quality || 'Swill';
};

$(document).ready(function() {
  for (let i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  console.log(parsedObject);
  $('.idea-card-wrap').prepend(`<article id="${parsedObject.id}" class="idea-card">
    <h1 class="user-idea">${parsedObject.title}</h1>
    <label for="delete-button" hidden></label>
    <button class="delete-button"></button>
    <p class="user-idea-details" contenteditable="true">${parsedObject.idea}</p>
    <label for="upvote-button" hidden></label>
    <button class="upvote-button"></button>
    <label for="downvote-button" hidden></label>
    <button class="downvote-button"></button>
    <h2>quality: <span class="rating">Swill</span></h2>
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
  var stringIdeaCard = JSON.stringify(ideaCard);
  localStorage.setItem(dateNow, stringIdeaCard);

  });

// Delete Cards

$('.idea-card-wrap').on('click', '.delete-button', function() {
  $(this).parent('article').remove();
})


$('.idea-card-wrap').on('click', '.upvote-button', function() {
  var rating = $(this).siblings('h2').find('.rating');
  console.log(rating)
  if (rating.text() === 'Swill') {
    rating.text('Plausible');
  } else if (rating.text() === 'Plausible') {
    rating.text('Genius');
  };
});

$('.idea-card-wrap').on('click', '.downvote-button', function() {
  var rating = $(this).siblings('h2').find('.rating');
  console.log(rating)
  if (rating.text() === 'Genius') {
    rating.text('Plausible');
  } else if (rating.text() === 'Plausible') {
    rating.text('Swill');
  };
});


//FOR WHEN WE'RE USING LOCAL STORAGE???? Find Adam and Amy mod 3
// $('.idea-card-wrap').on('click', '.upvote-button', function() {
//   counter = 0
//   console.log($(this).siblings('.downvote-button'))
//   $(this).siblings('.downvote-button').removeAttr('disabled');
//   if (counter === 2) {
//     $(this).attr('disabled', true);
//   } else {
//     counter++;
//     $(this).siblings('h2').find('.rating').text(ratingArray[counter]);

//     return counter;
//   };
// });

// $('.idea-card-wrap').on('click', '.downvote-button', function() {

//   $(this).siblings('.upvote-button').removeAttr('disabled');
//   if (counter === 0) {
//     $(this).attr('disabled', true);
//   } else {
//     counter--;
//     $(this).siblings('h2').find('.rating').text(ratingArray[counter]);
//     return counter;
//   };
// });

// var ratingArray = ['Swill', 'Plausible', 'Genius'];


// var counter = 0;
