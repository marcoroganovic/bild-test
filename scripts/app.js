(function($) {

  // Logic for front-page carousel
  var filmRoll = new FilmRoll({
    container: "#film-roll",
    pager: false,
    next: ".next-button",
    prev: ".prev-button",
    scroll: false
  });

  // Cache DOM Elements
  var wrapper = $(".film_roll_wrapper");
  var prev = $(".prev-button");
  var next = $(".next-button");

  function getActiveElementId() {
    return $(".active").data("id");
  }

  function queryActiveElementDescription(id) {
    return $("[data-desc-id=\"" + id + "\"]");
  }

  function displayCurrentProjectDesc(el) {
    el.siblings().css("display", "none");
    el.css("display", "block");
  }

  prev.on("click", function() {
    var el = queryActiveElementDescription(getActiveElementId());
    displayCurrentProjectDesc(el);
  });


  next.on("click", function() {
    var el = queryActiveElementDescription(getActiveElementId());
    displayCurrentProjectDesc(el);
  });

  // Sets description of first project as default
  displayCurrentProjectDesc(
    queryActiveElementDescription(1)
  );


  // Logic for tabs on About page
  var tabsContainer = $(".services-tabs");

  function showTabContent(cat) {
    var el = $("[data-category-name=" + cat + "]");
    el.siblings().removeClass("show-tab");
    el.addClass("show-tab");
  }

  tabsContainer.on("click", ".col-3", function(e) {
    var el = $(this);
    el.siblings().removeClass("active-tab");
    el.addClass("active-tab");
    showTabContent(el.data("category"));
  });


  // Logic for filter on Work page
  var filterControls = $(".filter-controls");
  var filterItems = $(".filter-items figure");
  var filterItemsCol = $(".filter-items .col-4");
  var viewControls = $(".view-controls");

  function showAllProjects() {
    filterItems.removeClass("inactive");
  }


  function showFromCategory(cat) {
     filterItems.removeClass("inactive");
     filterItems.each(function(i, el) {
      el = $(el);
      if(el.data("project-class") !== cat) {
        el.addClass("inactive");
      }
    });
  }


  function toggleProjectsVisibility(cat) {
    if(cat === "all") {
      showAllProjects();
    } else {
      showFromCategory(cat);
    }
  }


  function changeView(type) {
    filterItemsCol[type === "list" ? "addClass" : "removeClass"]("col-6")
  }

  filterControls.on("click", "a", function(e) {
    var el = $(this);
    toggleProjectsVisibility(el.data("projects"));
    el.siblings().removeClass("active-filter");
    el.addClass("active-filter")
  });


  viewControls.on("click", "i", function(e) {
    var el = $(this);
    el.siblings().removeClass("active-view");
    el.addClass("active-view");
    changeView($(this).data("view"))
  });

})(jQuery);
