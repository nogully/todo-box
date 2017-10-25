var ratingArray = ['Swill', 'Plausible', 'Genius'];
var IdeaCard = function(title, idea, id) {
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.counter = 0;
};

// function getObjectId() {
//   return JSON.parse(localStorage.getItem($(this).parent('article').attr('id')))
// }

$('.idea-card-wrap').on('click', '.upvote-button', function() {
  var clickedCardId = $(this).parent('article').attr('id');
  var theObject = localStorage.getItem(clickedCardId);
  var parsedTheObject = JSON.parse(theObject);
  // var parsedTheObject = JSON.parse(localStorage.getItem($(this).parent('article').attr('id')));


  // var theThing = JSON.parse(localStorage.getItem($(this).parent('article').attr('id')))
  $(this).siblings('.downvote-button').removeAttr('disabled');
  if (parsedTheObject.counter === 2) {
    $(this).attr('disabled', true);
  } else {
    parsedTheObject.counter++;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedTheObject.counter]);
    var stringifiedTheObject = JSON.stringify(parsedTheObject);
    localStorage.setItem(clickedCardId, stringifiedTheObject);
  };
});


$('.idea-card-wrap').on('click', '.downvote-button', function() {
  var clickedCardId = $(this).parent('article').attr('id');
  var theObject = localStorage.getItem(clickedCardId);
  var parsedTheObject = JSON.parse(theObject);
  $(this).siblings('.upvote-button').removeAttr('disabled');
  if (parsedTheObject.counter === 0) {
    $(this).attr('disabled', true);
  } else {
    parsedTheObject.counter--;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedTheObject.counter]);
    var stringifiedTheObject = JSON.stringify(parsedTheObject);
    localStorage.setItem(clickedCardId, stringifiedTheObject);
  };
});

$(document).ready(function() {
  for (let i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  createCard(parsedObject.id, parsedObject.title, parsedObject.idea, parsedObject.counter);
  };
});


$('.save-button').on('click', function(event) {
  event.preventDefault();
  var titleInput = $('#title-input').val();
  var ideaInput = $('#idea-input').val();
  var dateNow = Date.now();
  createCard(dateNow, titleInput, ideaInput);
  $('form')[0].reset();
  disableSaveButton();
  sendCardToLocalStorage(titleInput, ideaInput, dateNow);
});

function createCard(id,title,idea,counter = 0){
  $('.idea-card-wrap').prepend(`<article id="${id}" class="idea-card">
  <h1 class="user-idea" contenteditable="true">${title}</h1>
  <button class="delete-button" aria-label="Delete Button"></button>
  <p class="user-idea-details" contenteditable="true">${idea}</p>
  <button class="upvote-button" aria-label="upvote button"></button>
  <button class="downvote-button" aria-label="downvote button"></button>
  <h2>quality: <span class="rating">${ratingArray[counter]}</span></h2>
  <hr>
  </article>`);
};

function sendCardToLocalStorage(titleInput, ideaInput, dateNow){
  var ideaCard = new IdeaCard(titleInput, ideaInput, dateNow);
  var stringIdeaCard = JSON.stringify(ideaCard);
  localStorage.setItem(dateNow, stringIdeaCard);
};

$('.idea-card-wrap').on('click', '.delete-button', function(event) {
  deleteCard(event);
});

function deleteCard(event) {
  var parentArticle = $(event.target).closest('article');
  var id = parentArticle.prop('id');
  parentArticle.remove();
  localStorage.removeItem(id);
};

function persistTextEdit(event) {
  var parentArticle = $(event.target).closest('article');
  var id = parentArticle.prop('id');
  var newText = parentArticle.children('p').text();
  var objectFromLocal = localStorage.getItem(id);
  var object = JSON.parse(objectFromLocal);
  object.idea = newText;
  var objectString = JSON.stringify(object);
  localStorage.setItem(id, objectString);
};

function persistTitleEdit(event) {
  var parentArticle = $(event.target).closest('article');
  var id = parentArticle.prop('id');
  var newTitle = parentArticle.children('h1').text();
  var objectFromLocal = localStorage.getItem(id);
  var object = JSON.parse(objectFromLocal);
  object.title = newTitle;
  var objectString = JSON.stringify(object);
  localStorage.setItem(id, objectString);
};

$('.idea-card-wrap').on('blur', 'p', function(event){
  persistTextEdit(event);
});

$('.idea-card-wrap').on('blur', 'h1', function(event){
  persistTitleEdit(event);
});

function disableSaveButton() {
  $('.save-button').attr('disabled', true)
};

function enableSaveButton() {
  $('.save-button').removeAttr('disabled')
};

$(window).on('keydown', function() {
  if (($('#title-input').val() !== '') && ($('#idea-input').val() !== '')){
    enableSaveButton();
  } else {
    disableSaveButton();
  };
});

function arrayOfLocalStorage() {
  var newArray = [];
  for (let i = 0; i < localStorage.length; i++) {
    var retrievedObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject);
    newArray.push(parsedObject);
  };
  runSearch(newArray);
};



function runSearch(newArray) {
  var searchInput = $('#search-box').val().toUpperCase()
  var searchedArray = newArray.filter(function(card) {
    return card.title.toUpperCase().includes(searchInput) || card.idea.toUpperCase().includes(searchInput);
  });
  printSearchResults(searchedArray);
};

function printSearchResults(searchedArray) {
  searchedArray.forEach(function(result){
    createCard(result.id,result.title,result.idea,result.counter);
  });
};
      

    // var titleSearchResult = value.title.search($('#search-box').val()) !== -1;
    // var ideaSearchResult = value.idea.search($('#search-box').val()) !== -1;
    // searchFilterDisplay(titleSearchResult,ideaSearchResult,newArray);
// function searchFilterDisplay(titleSearchResult,ideaSearchResult,newArray) {
//   console.log(newArray)
//   for (var i = 0; i < newArray.length; i++){
//   // newArray.forEach(function(ideaCard, index){
//     if (titleSearchResult === false && ideaSearchResult === false) {
//       newArray[0].searchResult = false;
//       // ideaCard.css('display', 'none');
//     } else {
//       newArray[0].searchResult = true;
//     };
//   };

// };

$('#search-box').on('keyup', function(){
  $('article').remove();
  arrayOfLocalStorage();
  // searchByTitle();
})
// function searchBar () {
// }




