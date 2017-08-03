'use strict';

var ACTIVE_CLASS = 'active';

/* global $ */

function setupQuestions() {
  var $questions = $('.question')
  $questions.on('click', function() {
    var $thisQuestion = $(this)
    $thisQuestion.toggleClass('revealed')
  })
}

function showContent(id) {
  var folder = $('body').attr('data-certification'),
    contentPath = '/content/' + folder + '/' + id + '.html',
    $thisContent = $('#tips-' + id),
    $link = $('#tip-link-' + id);

  $('#leftNav').removeClass(ACTIVE_CLASS);
  $link.addClass(ACTIVE_CLASS);
  $thisContent.empty()
    .load(contentPath, null, function() {
      setupQuestions();
    })
    .show();
}

function loadTopNav() {
  var $header = $('#topHeader'),
    certification = $('body').attr('data-certification'),
    $activeNavLink;
  $header.load('content/nav/topNav.html', function() {
    if (certification) {
      $activeNavLink = $header.find($('#tn-' + certification));
      if ($activeNavLink.length) {
        $activeNavLink.addClass(ACTIVE_CLASS);
      }
    }
  });
}

$().ready(function() {
  var $nav = $('#leftNav'),
    $content = $('#content'),
    hash = window.location.hash.replace('#', '');

  // if we have something in the location hash, attempt to make it visible on page load
  if (hash) {
    showContent(hash.replace('tips-', ''));
  }

  loadTopNav();

  $nav.find('a').on('click', function() {
    $content.find('section').hide();
    showContent($(this).attr('data-tip-name'));
  });
});
