$(function() {
  window.app = {
    // ----------
    init: function () {
      this.handleSearch();
    },

    // ----------
    handleSearch: function () {
      var self = this;
      var results;

      this.$searchQuery = document.querySelector('.search-input');
      this.$searchButton = document.querySelector('.search-button');
      this.$searchForm = document.querySelector('.video-game-search');
      this.$searchResultsDiv = document.querySelector('.search-results')

      var renderGames = function(searchResponse) {
        console.log(searchResponse);
        searchResponse.body.forEach(function(response) {
          var mediaName = response.name;
          $(self.$searchResultsDiv)
            .append('<div class="media-tile"><span class="media-name">' + mediaName + '</span></div>');
          });
          }

      $(this.$searchForm).on('submit', function(e) {
        var query = self.$searchForm[0].value;
        console.warn(query);
        e.preventDefault();
        $.ajax({
          query: query,
          type:'GET',
          url: '/getVideoGameData',
          success: function(searchResponse) {
            console.log(searchResponse);
            renderGames(searchResponse);
          }
        });
      });
    },
    }

  app.init();


});