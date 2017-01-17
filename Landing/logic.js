
var shortcuts = [
   {
      name: "yelp",
      url: "yelp.com"


   },
   {
      name: "naver",
      url: "naver.com"

   },
   {
      name: "yahoo",
      url: "yahoo.com"

   }
]; //Retrieve from a database.

// if (shortcuts.length > 0) {

   for (var i = 0; i < shortcuts.length; i++) {
      var s_dyn = $('<div>');
      s_dyn.addClass("text-center");
      s_dyn.attr("id", "link"+i);
      s_dyn.append('<a class="btn btn-primary btn-lg">' + shortcuts[i].name + '</a>');
      s_dyn.attr('data-url', shortcuts[i].url);
      var s_img = $('<img>');
      s_img.attr('src', "https://www.google.com/s2/favicons?domain_url=" + shortcuts[i].url);
      s_img.attr('alt', 'favicon');
      // s_img.text(shortcuts[i].name);
      s_dyn.prepend(s_img);

      $('#jumbotrons').append(s_dyn);

   }

$('#link1').on('click', function() {
   alert('URL is '+ this.data('url'));
});
