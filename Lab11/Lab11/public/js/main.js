function showAll() {
  let showList = $("#showList");
  let show = $("#show");
  $(showList).empty();
  $(showList).hide();
  $(show).hide();
  let requestConfig1 = {
    method: "GET",
    url: "http://api.tvmaze.com/shows",
  };

  $.ajax(requestConfig1).then(function (responseMessage) {
    $.each(responseMessage, function (element, shows) {
      showList.append(
        $(`<li><a href=${shows._links.self.href}>${shows.name}</a></li>`)
      );
      $(showList).show();
    });
  });
}
(function ($) {
  $(document).ready(function () {
    let homeLink = $("#homeLink");
    $(homeLink).hide();
    showAll();
    let showList = $("#showList");
    let show = $("#show");
    let error = $("#error");
    let searchTermForm = $("#searchForm");
    let search_term = $("#search_term");
    searchTermForm.submit(function (event) {
      event.preventDefault();
      let searchTerm = search_term.val();
      if (searchTerm.trim() === "") {
        error.text("Please enter some value to search").addClass("error");
        $(show).hide();
        $(showList).hide();
        $(homeLink).show();
        return;
      } else {
        error.text("").removeClass("error");
      }
      if (searchTerm) {
        let requestConfig2 = {
          method: "GET",
          url: "http://api.tvmaze.com/search/shows?q=" + searchTerm.trim(),
        };

        $.ajax(requestConfig2).then(function (responseMessage) {
          if (responseMessage && responseMessage.length > 0) {
            $(showList).empty();
            $.each(responseMessage, function (element, shows) {
              showList.append(
                $(
                  `<li><a href=${shows.show._links.self.href}>${shows.show.name}</a></li>`
                )
              );
              showList.show();
              $(homeLink).show();
              $(show).hide();
            });
          } else {
            $(showList).empty();
            $(homeLink).show();
            $(show).hide();
          }
        });
      }
    });
    $("#showList").on("click", "li", "a", function (event) {
      event.preventDefault();
      $(showList).hide();
      $(show).empty();
      $(homeLink).hide();
      let requestConfig3 = {
        method: "GET",
        url: $(this).find("a[href]").attr("href"),
      };
      // console.log($(this).find("a[href]").attr("href"));
      $.ajax(requestConfig3).then(function (responseMessage) {
        if (responseMessage.name === null) {
          responseMessage.name = "N/A";
        }
        if (responseMessage.language === null) {
          responseMessage.language = "N/A";
        }
        if (
          responseMessage.rating === null ||
          responseMessage.rating.average === null
        ) {
          responseMessage.rating = {};
          responseMessage.rating.average = "N/A";
        }
        if (responseMessage.network === null) {
          responseMessage.network = {};
          responseMessage.network.name = "N/A";
        }
        if (responseMessage.summary === null) {
          responseMessage.summary = "N/A";
        }
        if (responseMessage.genres === null) {
          responseMessage.genres = [];
          responseMessage.genres.push("N/A");
        }
        if (responseMessage.image === null) {
          responseMessage.image = "/public/images/no_image.jpeg";
        } else {
          responseMessage.image = responseMessage.image.medium;
        }
        show.append(
          $(
            `<h1>${responseMessage.name}</h1><img src='${responseMessage.image}'></img><dl><dt>Language</dt><dd>${responseMessage.language}</dd><dt>Genres</dt><dd><ul id='newList'></ul></dd><dt>Average Rating</dt><dd>${responseMessage.rating.average}</dd><dt>Network</dt><dd>${responseMessage.network.name}</dd><dt>Summary</dt><dd>${responseMessage.summary}</dd></dl>`
          )
        );
        $.each(responseMessage.genres, function (element, genres) {
          $("#newList").append($("<li>" + genres + "</li>"));
        });
        show.show();
        $(homeLink).show();
      });
    });
  });
})(jQuery);
