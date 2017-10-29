$(document).ready(populateExistingCards);
$('.save-button').on('click', submitCard);
$('.card-wrap').on('click', '.delete-button', deleteCard);
$('.card-wrap').on('blur', 'p', persistTextEdit);
$('.card-wrap').on('blur', 'h1', persistTitleEdit);
$(window).on('keyup', enableDisableButton);
$('.card-wrap').on('click', '.upvote-button', upvoteValue);
$('.card-wrap').on('click', '.downvote-button', downvoteValue); 
$('#search-box').on('keyup', searchCards);

function searchCards() {
  $('article').remove();
  arrayOfLocalStorage();
};

function CardObject (title, body, id) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.counter = 0;
};

function populateExistingCards() {
  var ratingArray = ['swill', 'plausible', 'genius'];
  for (let i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  createCard(parsedObject);
  };
};

function submitCard() {
  event.preventDefault();
  var cardObject = new CardObject($('#title-input').val(), $('#body-input').val(), Date.now())
  createCard(cardObject);
  $('form')[0].reset();
  disableSaveButton();
  sendCardToLocalStorage(cardObject);
};

function arrayOfLocalStorage() {
  var newArray = [];
  // populateExistingCards();
  for (let i = 0; i < localStorage.length; i++) {
    var retrievedObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject);
    newArray.push(parsedObject);
    runSearch(newArray);
  };
};

function runSearch(newArray) {
  var searchInput = $('#search-box').val().toUpperCase();
  var searchedArray = newArray.filter(function(card) {
    return card.title.toUpperCase().includes(searchInput) || card.body.toUpperCase().includes(searchInput);
  });
  printSearchResults(searchedArray);
};

function printSearchResults(searchedArray) {
  searchedArray.forEach(function(result) {
    createCard(result.id,result.title,result.body,result.counter);
  });
};

function createCard(object){
  var ratingArray = ['swill', 'plausible', 'genius'];
  $('.card-wrap').prepend(`<article id="${object.id}" class="card-article">
   <h1 class="user-title" contenteditable="true">${object.title}</h1>
   <button class="delete-button" aria-label="Delete Button"></button>
   <p class="user-body" contenteditable="true">${object.body}</p>
   <button class="upvote-button" aria-label="upvote button"></button>
   <button class="downvote-button" aria-label="downvote button"></button>
   <h2>quality: <span class="rating">${ratingArray[object.counter]}</span></h2>
   <hr>
   </article>`);
}

function deleteCard(event) {
  var parentArticle = $(event.target).closest('article');
  var id = parentArticle.prop('id');
  parentArticle.remove();
  localStorage.removeItem(id);
};

function disableSaveButton() {
  $('.save-button').attr('disabled', true);
};

function enableSaveButton() {
  $('.save-button').removeAttr('disabled');
};

function persistTextEdit(event) {
  var parentArticle = $(event.target).closest('article');
  var id = parentArticle.prop('id');
  var newText = parentArticle.children('p').text();
  var objectFromLocal = localStorage.getItem(id);
  var object = JSON.parse(objectFromLocal);
  object.body = newText;
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

function sendCardToLocalStorage(cardObject){
  var stringCardObject = JSON.stringify(cardObject);
  localStorage.setItem(cardObject.id, stringCardObject);
};

function enableDisableButton() {
  if (($('#title-input').val() !== '') && ($('#body-input').val() !== '')) {
    enableSaveButton();
  } 
  else { disableSaveButton() }
};

function getObjectAndParseIt(id) {
  var jsonObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(jsonObject);
  return parsedObject;
}

function upvoteValue() {
  var ratingArray = ['swill', 'plausible', 'genius'];
  var clickedCardId = $(this).parent('article').attr('id');
  var parsedObject = getObjectAndParseIt(clickedCardId);
  $(this).siblings('.downvote-button').removeAttr('disabled');
  if (parsedObject.counter === 2) {
    $(this).attr('disabled', true);
  } else {
    parsedObject.counter++;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedObject.counter]);
    var stringifiedObject = JSON.stringify(parsedObject);
    localStorage.setItem(clickedCardId, stringifiedObject);
  };
};

function downvoteValue() {
  var ratingArray = ['swill', 'plausible', 'genius'];
  var clickedCardId = $(this).parent('article').attr('id');
  var parsedObject = getObjectAndParseIt(clickedCardId);
  $(this).siblings('.upvote-button').removeAttr('disabled');
  if (parsedObject.counter === 0) {
    $(this).attr('disabled', true);
  } 
  else {
    parsedObject.counter--;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedObject.counter]);
    var stringifiedObject = JSON.stringify(parsedObject);
    localStorage.setItem(clickedCardId, stringifiedObject);
  };
};