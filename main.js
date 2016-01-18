'use strict';

var people = []
var person = {};
var counter = 1;
$(document).ready(function() {
  loadFromStorage();
  updatelist();
  $('#submitContact').on('click', putEmIn);
  $('table').on('click', '.trash', removeFromMemory)
  $('.topinfo').on('click', sorting)
  $('table').on('click', '.edit', edit)

  function loadFromStorage() {
    if(!localStorage.people){
      localStorage.people = '[]';
    }
    people = JSON.parse(localStorage.people)
  }

  function updatelist(){
    people.forEach(function(x, i){
      person = x;
      // console.log('person from updateList', person, 'people from updateList', people)
      addRow();
    })
    saveToStorage();
  }

  function putEmIn(e){
    e.preventDefault();
    makePerson();
    saveToStorage();
    addRow();
  }

  function makePerson(){
    person = {};
    person.name = $('#name').val();
    person.email = $('#email').val();
    // Number($('#awesomelevel').val());
    person.awesome = $('#awesomeLevel').val();
    person.cool = $('#coolFactor').val();
    people.push(person)
  }

  function saveToStorage() {
    localStorage.people = JSON.stringify(people);
    // console.log(localStorage.people);
  }

  function addRow(){
    var $myRows = $('.bottom').clone().removeClass('bottom').addClass('newRow').attr('data', counter);
    $('table').append($myRows);
    $('.newRow > .one').append(person.name).removeClass('one');
    $('.newRow > .two').append(person.email).removeClass('two');
    $('.newRow > .three').append(person.awesome).removeClass('three');
    $('.newRow > .four').append(person.cool).removeClass('four');
    $('#theForm')[0].reset();
    counter += 1;
  }

  function removeFromMemory(){
    var index = $(this).closest('.newRow').attr('data')-1;
    people.splice(index, 1);
    $(this).closest('tr').remove();
    saveToStorage()
  }

  function edit(){
    var thisRow = $(this).closest('tr');
    var index = $(this).closest('.newRow').attr('data')-1;
    var promptName = prompt('Enter name');
    var promptEmail = prompt('Enter email');
    var promptAwesome = prompt('Enter awesome level');
    var promptCool = prompt('Enter cool word');
    thisRow.children('td:first').text(promptName);
    thisRow.children('td:nth-child(2)').text(promptEmail);
    thisRow.children('td:nth-child(3)').text(promptAwesome);
    thisRow.children('td:nth-child(4)').text(promptCool);
    people[index].name = promptName;
    people[index].email = promptEmail;
    people[index].awesome = promptAwesome;
    people[index].cool = promptCool;
    saveToStorage();
  }

  function sorting(){
    var classFind = $(this).attr('class').split(' ')[0];
    people = _.sortBy(people, classFind);
    $('.newRow').remove();
    console.log(people);
    people.forEach(function(x){
      person = x;
      console.log(person);
      addRow();
    })
    saveToStorage();
  }
})
