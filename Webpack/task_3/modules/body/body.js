import $ from 'jquery';
import _ from 'lodash';
import './body.css';

let count = 0;

function updateCounter() {
  count++;
  $('#count').text(`${count} clicks on the button`);
}

$(function() {
  $('body').append('<p>Dashboard data for the students</p>');
  $('body').append('<button id="start-btn">Click here to get started</button>');
  $('body').append('<p id="count"></p>');
  $('#start-btn').on('click', _.debounce(updateCounter, 500));
});
