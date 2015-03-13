 $(document).ready(function() {

  var extractYoutubeId = function(url) {
    var matches = url.match(/v=([^&]+)/)
    return matches ? matches[1] : null;
  };

  var getYoutubeId = function(document){
    var entries = document.getElementsByTagName("entry");
      if (entries.length < 1) return null;
        // $('.iframe').hide();
        // $('.no_result').show();
    var target = entries[Math.floor(Math.random()*entries.length)];
    console.log(target);
    var linktext = target.getElementsByTagName("link")[0]
    console.log(linktext);
    if (!linktext) return null;
    var videoId = extractYoutubeId(linktext.attributes.href.textContent);
    console.log(videoId);
    return videoId;
  }

  var apiUrlBuilder = function(query) {
    return "https://gdata.youtube.com/feeds/api/videos?q=" + query + "&max-results=50&fields=entry[yt:statistics/@viewCount <400]";
  };


  $('.submit').on('click', function(event) {
    event.preventDefault();
    var query = $('#query').val();

    var request = $.ajax({
      url: apiUrlBuilder(query),
      type: 'get',
      dataType: 'xml',
    });

    request.done(function(document) {
      console.log(document);
      var newUrl = getYoutubeId(document);
      console.log(newUrl);

      $('.iframe').attr('src', "https://www.youtube.com/embed/" + newUrl );

    });

    request.fail(function() {
      console.log("error");
    });

  });




 $('.add').on('click', function(e) {
  e.preventDefault();
  var saveUrl = $('.iframe').attr('src');
    console.log(saveUrl);

    $.ajax({
      url: '/username/links',
      type: 'post',
      dataType: 'json',
      data: {url: saveUrl},
    })
    .done(function(new_url) {
      console.log(new_url);
      $('#user_links').append("<p><a href='" + new_url.url + "'>" + new_url.url + "</a></p>");
      $('#recent_links').append("<p><a href='" + new_url.url + "'>" + new_url.url + "</a></p>");

    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });


 });

 $('a:link').on('click', function(event) {
  event.preventDefault();
    var embedUrl = $(this).attr('href')
  $('.iframe').attr('src', embedUrl);

  });

})