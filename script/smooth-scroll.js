/**
 * This script defines all interactions related to the header.
 */

/**
* Script starts only after document has finished loading
*/
$(function () {
  /**
   * Select all needed elements and save them to variables
   */
  var $body = $('body');
  var $mainNav = $('#main-nav');

  /**
   * Handles navigation clicks for multiple uis.
   * Currently works for both the main-nav and the logo-anchor.
   */
  function handleSmoothNavigationClick(event) {
    var $target       = $(event.target);
    var $targetAnchor = $target.is('a') ? $target : $target.closest('a');
    var targetHref    = $targetAnchor.attr("href");

    /**
     * Verifies if value of href of clicked anchor is an id.
     */
    if (/^#.+/.test(targetHref)) {
      var $scrollingTarget = $(targetHref);

      /**
       * Verifies if id exists on the document.
       * If it doesn't, cancel interaction
       */
      if ($scrollingTarget.length === 0) {
        return;
      }

      var scrollingTargetOffsetTop = $scrollingTarget.offset().top;

      /**
       * Animates document to the position of id
       * Animation speed is in ms
       */
      $('html, body').stop().animate({
        scrollTop: scrollingTargetOffsetTop
      }, 1000);

      return false;

    } else if (targetHref === "#") {
      /**
       * Animates document to the initial position
       * Animation speed is 1000ms
       */
      $('html, body').stop().animate({
        scrollTop: 0
      }, 1000);

      return false;
    }
  }

  /**
   * Whenever any anchor (<a></a>) element within the main-nav element
   * is clicked, remove the 'menu-open' class from the body element.
   */
  $mainNav.on('click', 'a', handleSmoothNavigationClick);

  /**
   * function that adds or removes class 'active' to the anchors of nav
   */
  function updateActiveNav () {
    /**
     * triggerOffset is the distance from the top of window at which
     * the sectionsAnchor and sections get class active
     */
    var triggerOffset = 100;
    var windowScrollTop = $(window).scrollTop();
    var activationTrigger = windowScrollTop + triggerOffset;

    var $sections = $('#main-content').find('section');

    /**
     * verifies which is the current section to add 'active' class properly
     */
    for (var i = 0; i < $sections.length; i++ ) {
      var $section = $($sections[i]);

      var sectionOffsetTop = $section.offset().top;
      var sectionHeight = $section.outerHeight();
      var sectionOffsetBottom = sectionOffsetTop + sectionHeight;

      var scrollIsAfterItemStart = sectionOffsetTop <= activationTrigger;
      var scrollIsBeforrItemEnd = sectionOffsetBottom > activationTrigger;

      if (scrollIsAfterItemStart && scrollIsBeforrItemEnd ) {
        $sections.removeClass('active');
        $section.addClass('active');
        $mainNav.find('a').removeClass('active');
        $mainNav.find('a[href="#'+ $section.attr('id') +'"]').addClass('active');
      }
    }
  }

  $(window).on('scroll', updateActiveNav);

  // initalize
  updateActiveNav();
});
