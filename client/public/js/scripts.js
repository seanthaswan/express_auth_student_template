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

      $(this.$searchForm).on('submit', function(e) {
        var query = self.$searchForm[0].value;
        console.warn(query);
        e.preventDefault();
        $.ajax({
          query: query,
          type:'GET',
          url: '/getVideoGameData',
          success: function(res) {
            console.log(res);
          }
        })
      })
    }
  }

  app.init();

});
