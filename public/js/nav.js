'use strict';

/* global $ */
function showContent(id) {
  var folder = $('body').attr('data-certification'),
    contentPath = 'content/' + folder + '/' + id + '.html',
    $thisContent = $('#tips-' + id),
    $link = $('#tip-link-' + id);

  $('#leftNav').removeClass('active');
  $link.addClass('active');
  $thisContent.empty()
    .load(contentPath)
    .show();
}

$().ready(function() {
  var $nav = $('#leftNav'),
    $content = $('#content'),
    hash = window.location.hash.replace('#', '');

  // if we have something in the location hash, attempt to make it visible on page load
  if (hash) {
    showContent(hash.replace('tips-', ''));
  }

  $nav.find('a').on('click', function() {
    $content.find('section').hide();
    showContent($(this).attr('data-tip-name'));
  });
});
