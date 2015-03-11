 $(document).ready(function() {
  $('.submit').on('click', function(event) {
    event.preventDefault();
      var query = $('#query').val();

    $.ajax({
      url: apiUrlBuilder(query),
      type: 'get',
      dataType: 'xml',
    }).done(function(data) {
        console.log(data);
        var entries = data.getElementsByTagName("entry");
        console.log(entries);
        var target = entries[Math.floor(Math.random()*entries.length)];
        console.log(target);
    }).fail(function() {
        console.log("error");
      });

  function apiUrlBuilder(query) {
  return "https://gdata.youtube.com/feeds/api/videos?q=" + query + "&max-results=50&fields=entry[yt:statistics/@viewCount <1000]";
  };


     });
})



