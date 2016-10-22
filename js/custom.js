jQuery(document).ready(function ($) {
	'use strict';

	$('body.preloader').jpreLoader({
		loaderVPos: '50%',
	}).css('visibility', 'visible');

	//Menu Scroll on Click

	$('.scroll').click(function (e) {
		e.preventDefault();
		var href = $(this).attr('href');
		var hash = href.split('#');
		var url_hash = '#' + hash[1];
		var offset;
		if ($(url_hash).length > 0) {
			if($('body').hasClass('admin-bar')){
				offset = ($(window).width() < 968) ? 20 : 80;
			} else{
				offset = ($(window).width() < 968) ? 20 : 56;
			}
			$('html, body').animate({
				scrollTop: $(url_hash).offset().top - offset
			}, 1000);
		} else {
			location.href = href;
		}
	});

	//Back to Top

	$('#back_to_top').click(function (e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 900);
		return false;
	});

	//Waypoint

	$('.home').find('.tcvpb_section_tc').waypoint(function (direction) {
		var section_id = $(this).attr('id');
		var $menu_item;
		if (section_id !== undefined) {
			$('.current-menu-item, .current-menu-ancestor').removeClass('current-menu-item').removeClass('current-menu-ancestor');
			if (direction === 'down') {
				$menu_item = $('#main_menu a[href=#' + section_id + ']').parent();
				if ($menu_item.length > 0) {
					$menu_item.addClass('current-menu-item');
				} else {
					$('#main_menu').find('.current_page_item').addClass('current-menu-item');
				}
			} else if (direction === 'up') {
				var previous_section_id = $(this).prevAll('[id]:first').attr('id');
				$menu_item = $('#main_menu a[href=#' + previous_section_id + ']').parent();
				if ($menu_item.length > 0) {
					$menu_item.addClass('current-menu-item');
				} else {
					$('#main_menu').find('.current_page_item').addClass('current-menu-item');
				}
			}
		}
	}, {
		offset: 100
	});

	//Material design ripple

	var ink, d, x, y;
	$('.ripplelink').click(function (e) {
		e.preventDefault();
		var $ripple = $(this);
		if ($ripple.find('.ink').length === 0) {
			$ripple.prepend('<span class="ink"></span>');
		}

		ink = $ripple.find('.ink');
		ink.removeClass('animate');

		if (!ink.height() && !ink.width()) {
			d = Math.max($ripple.outerWidth(), $ripple.outerHeight());
			ink.css({height: d, width: d});
		}

		x = e.pageX - $ripple.offset().left - ink.width() / 2;
		y = e.pageY - $ripple.offset().top - ink.height() / 2;

		ink.css({top: y + 'px', left: x + 'px'}).addClass('animate');
		if (!$(this).hasClass('tcvpb-modal-button')) {
			setTimeout(function () {
				var link = window.location.assign($ripple.attr('href'));
			}, 1000);
		}
	});


	//Menu scroll transition

	var $main_header = $('#ABdev_main_header');
	var $navigation = $main_header.find('nav');
	var $menu_toggle = $main_header.find('.menu_slide_toggle');
	var $breadcrumbs_bar = $('#title_breadcrumbs_bar');
	var header_height = $main_header.outerHeight();


	$menu_toggle.on('click', function (e) {
		e.preventDefault();
		var $this = $(this).toggleClass('menu_opened');
		if ($(window).width()<960) {
			$this.addClass('mobile');
			if ($this.hasClass('menu_opened')) {
				$navigation.css('width','0px').show().animate({width: '70%'},250);
			} else{
				$navigation.animate({width: '0' },250,'linear',function(){
					$(this).hide().css('width','auto');
				});
			}
		} else{
			$this.removeClass('mobile');
			if ($this.hasClass('menu_opened')) {
				$breadcrumbs_bar.toggle('slide', {direction: 'up'}, 250, function () {
					$navigation.toggle('slide', {direction: 'down'}, 250);
				});
			} else {
				$navigation.toggle('slide', {direction: 'down'}, 250, function () {
					$breadcrumbs_bar.toggle('slide', {direction: 'up'}, 250);
				});
			}
		}
	});

	function reset_menu_properties(){
		if ($menu_toggle.hasClass('menu_opened')){
			$menu_toggle.removeClass('menu_opened');
			if ($(window).width()>=960) {
				$navigation.hide().css('width','auto');
				$breadcrumbs_bar.show();
			}
		}
	}


	var lastScrollTop = 0;
	$(window).on('scroll', function () {
		scroll_menu_transparency();
		var st = $(this).scrollTop();
		if (st > lastScrollTop){
		   	$main_header.addClass('menu_up');
		} else {
		   	$main_header.removeClass('menu_up');
		}
		lastScrollTop = st;
	});

	function scroll_menu_transparency(){
		if ($(window).width()<=960) {
			return;
		}
		var st = $(window).scrollTop();
		if (st > 10) {
			$main_header.removeClass('transparent').addClass('smaller');
			$navigation.show();
			$menu_toggle.hide();
			$breadcrumbs_bar.hide();
			// if (!$menu_toggle.hasClass('menu_opened')) {
			// 	$navigation.hide();
			// 	$breadcrumbs_bar.show();
			// }
		} else {
			$main_header.removeClass('smaller').addClass('transparent');
			$navigation.show();
			$breadcrumbs_bar.hide();
			if ($menu_toggle.hasClass('menu_opened')) {
				$menu_toggle.removeClass('menu_opened');
			}
		}
	}

	function scroll_header_position(){
		$main_header.css('visibility', 'visible');
		var desktop_res = ($(window).width()>960)?true:false;
		if (desktop_res && $navigation.hasClass('detached')) {
			$navigation.detach().removeClass('detached').appendTo('.menu_wrapper');
		} else if(!desktop_res && !$navigation.hasClass('detached')){
			$navigation.detach().addClass('detached').prependTo('body');
		}
	}


	if (!$main_header.hasClass('coming_soon')) {
		scroll_menu_transparency();
		scroll_header_position();
	}


	//Parallax effect for slider and hero headings

	var $main_slider = $('#ABdev_main_slider');
	var $hero_heading = $('#headline_breadcrumbs_bar.with_image');

	$main_slider.height('auto');
	$('#ABdev_main_slider.ABdev_parallax_slider').height($(window).height());

	function hero_paralax(){
		if ($main_slider.length > 0 || $hero_heading.length > 0) {
			$main_slider.next().css('margin-top', $main_slider.outerHeight());
			$hero_heading.next().css('margin-top', $hero_heading.outerHeight());

			var opacity_change = ($hero_heading.height()/2-$(window).scrollTop())/($hero_heading.height()/2);
			if(opacity_change > 0 ){
				$hero_heading.find('.headline_image .row').css('opacity', opacity_change);
			}

			$(window).on('scroll', function(){
				var opacity_change = ($hero_heading.height()/2-$(window).scrollTop())/($hero_heading.height()/2);
				if(opacity_change > 0 ){
					$hero_heading.find('.headline_image .row').css('opacity', opacity_change);
				}
				var window_scroll = -1/2*$(window).scrollTop();
				$main_slider.find('.rev_slider_wrapper ').css({'transform' : 'translateY('+window_scroll+'px)', '-webkit-transform' : 'translateY('+window_scroll+'px)', '-moz-transform' : 'translateY('+window_scroll+'px)', '-ms-transform' : 'translateY('+window_scroll+'px)', '-o-transform' : 'translateY('+window_scroll+'px)'});
				$hero_heading.find('.headline_image').css({'transform' : 'translateY('+window_scroll+'px)', '-webkit-transform' : 'translateY('+window_scroll+'px)', '-moz-transform' : 'translateY('+window_scroll+'px)', '-ms-transform' : 'translateY('+window_scroll+'px)', '-o-transform' : 'translateY('+window_scroll+'px)'});
			});

		}

		if($('.boxed_body_wrapper').length>0){
			var boxed_offset = ($(window).width()-$('.boxed_body_wrapper').width())/2;
			$hero_heading.css({'width': $('.boxed_body_wrapper').width(), 'left': boxed_offset});
			$main_slider.css({'width': $('.boxed_body_wrapper').width(), 'left': boxed_offset});
			$main_header.css({'width': $('.boxed_body_wrapper').width(), 'left': boxed_offset});
		}
	}

	hero_paralax();


	var $sf = $('#main_menu');
	if ($(window).width()>960) {
		//enable superfish when the page first loads if we're on desktop
		$sf.superfish({
			delay: 0,
			popUpSelector: 'ul,.sf-mega,.cart_dropdown_widget',
			speed: 0,
			speedOut: 0,
			cssArrows: false,
			disableHI: true, /* load hoverIntent.js in header to use this option */
			onBeforeShow: function () {
				var ww = $(window).width();
				if (this.parent().offset() !== undefined) {
					var locUL = this.parent().offset().left + this.width();
					var locsubUL = this.parent().offset().left + this.parent().width() + this.width();
					var par = this.parent();
					if (par.parent().is('#main_menu') && (locUL > ww)) {
						this.css('marginLeft', '-' + (locUL - ww + 20) + 'px');
					} else if (!par.parent().is('#main_menu') && (locsubUL > ww)) {
						this.css('left', '-' + (this.width()) + 'px');
					}
				}
			}
		});
	}

	//Price box tweak

	$('.tcvpb_pricing-table-2').each(function () {
		var $price = $(this).find('.tcvpb_pricebox_price');

		$price.html(
			$price.html().replace(/(\.\d\d)/g, '<sup>$1</sup>')
			);
	});

	//Callout box tweak

	var $callout_box = $('.tcvpb-callout_box');
	var $callout_box_button = $('.tcvpb-callout_box .tcvpb-button');

	if ($callout_box.length && $callout_box.width()<700) {
		$callout_box_button.css({'float' : 'none', 'margin-top' : '20px'});
		if ($callout_box.find('p').length) {
			$callout_box.find('p').css({'display': 'block', 'text-align' : 'center', 'width' : '100%'});
		}
		$callout_box.css({'text-align' : 'center'});
	}

	//Collapsible side menu

	$('.widget_nav_menu li').each(function() {
		if($(this).find('> .sub-menu').length) {
			$(this).find('> a').append('<i class="ci_icon-angle-down"></i>');
		}
	});

	var $menu_with_children = $('.widget_nav_menu .menu-item-has-children > a');

	$menu_with_children.on('click', function(e){
		e.preventDefault();
		var $this = $(this);
		if (!$this.parent().find('> .sub-menu').hasClass('visible')) {
			$this.parent().find('> .sub-menu').addClass('visible').slideDown('slow');
		} else{
			$this.parent().find('> .sub-menu').removeClass('visible').slideUp('slow');
		}
	});

	//Portfolio top pagination

	var $portfolio_images =	$('#simple_item_portfolio').find('.span8');

	$portfolio_images.imagesLoaded(function(){
		var portfolio_image_height = $portfolio_images.height();
		$('.single_portfolio_pagination .prev a, .single_portfolio_pagination .next a').css('bottom', -portfolio_image_height / 2 + 'px');
	});



	//Timeline tabs

	$('.tcvpb-tabs-timeline').each(function () {
		var $this = $(this);
		var $tabs = $this.find('.tcvpb-tabs-ul > li');
		var tabsCount = $tabs.length;
		$tabs.addClass('tab_par_' + tabsCount);
	});

	//Fancybox

	$('.fancybox').fancybox({
		'transitionIn'    : 'elastic',
		'transitionOut'   : 'elastic',
		'titlePosition'   : 'outside',
		'cyclic'      	  : true,
		'overlayShow'     : true
	});

	$('.submit').on('click', function () {
		$(this).closest('form').submit();
	});

	$('input, textarea').placeholder();

	//Timeline posts

	var $content = $('#timeline_posts');
	var $loader = $('#timeline_loading');
	var itemSelector = ('.timeline_post');
	var pageNumber = 0;

	var cat = $loader.data('category');

	function load_posts() {
		if (!($loader.hasClass('timeline_loading_loader') || $loader.hasClass('timeline_no_more_posts'))) {
			pageNumber++;
			var str = '&cat=' + cat + '&pageNumber=' + pageNumber + '&action=abdev_get_timeline_posts';
			$.ajax({
				type: 'POST',
				dataType   : 'html',
				url: abdev_timeline_posts.ajaxurl,
				data: str,
				success: function (data) {
					var $data = $(data);
					if ($data.length) {
						var $newElements = $data.css({ opacity: 0 });
						$content.append($newElements);
						$content.imagesLoaded(function () {
							$loader.removeClass('timeline_loading_loader');
							$content.masonry('appended', $newElements, false);
							$newElements.animate({ opacity: 1 });
						});
					} else {
						$loader.addClass('timeline_no_more_posts').html(abdev_timeline_posts.noposts);
					}
				},
				beforeSend : function () {
					$loader.addClass('timeline_loading_loader').html('');
				},
				error : function (jqXHR, textStatus, errorThrown) {
					$loader.html(jqXHR + ' :: ' + textStatus + ' :: ' + errorThrown);
				},
				complete : function () {
					$loader.removeClass('timeline_loading_loader');
				}
			});
		}
		return false;
	}

	$content.imagesLoaded(function () {
		$content.masonry({
			columnWidth: '.timeline_post_first',
			gutter: 100,
			isOriginLeft: false,
			itemSelector: itemSelector,
		});

		$(window).on('scroll', function () {
			if ($(window).scrollTop() + $(window).height()  >= $(document).height() - 100) {
				load_posts();
			}
		});

	});

	//Modal element

	var $modal_content_wrapper = $('.tcvpb-modal-content-wrapper');
	var $modal_content = $('.tcvpb-modal-content');
	var $modal = $('.tcvpb-modal');
	var $modal_button = $('.tcvpb-modal-button');
	var $modal_button_close = $('.tcvpb-modal-close');

	$modal_content.each(function(){
		$(this).css('top', ($(window).height()-$(this).outerHeight(true))/2);
	});

	$modal.on('click', '.tcvpb-modal-button', function(e){
		e.preventDefault();
		var id = $(this).data('button_id');
		var $wrapper_id = $('#tcvpb-modal_wrapper_'+id);
		if($('#tcvpb-modal_wrapper_'+id, '.tcvpb-modal').length){
			$wrapper_id.detach().appendTo('body').delay(200).queue(function(){
				$(this).addClass('opened');
			});
		} else{
			$wrapper_id.addClass('opened');
		}
	});

	function modal_close(){
		$modal_content_wrapper.removeClass('opened');
		if ($modal_content.has('iframe')) {
			$modal_content.find("iframe").attr("src", $modal_content.find("iframe").attr("src"));
			$modal_content.find("object").attr("src", $modal_content.find("iframe").attr("src"));
		}
	}

	($modal_button_close, $modal_content_wrapper).on('click', function(e){
		e.preventDefault();
		modal_close();
	});

	$(document).keyup(function(e){
		if(e.keyCode === 27){
			modal_close();
		}
	});

	//Isotope portfolio

	var sortBy = 'original-order';
	var columnWidth = '.portfolio_item';

	$('.ABdev_latest_portfolio').each(function () {
		var $current_portfolio = $(this);
		if ($current_portfolio.find('.portfolio_item').hasClass('portfolio_masonry_fullwidth')) {
			sortBy = 'random';
			columnWidth = '.portfolio_item.small';
		}
		$current_portfolio.imagesLoaded(function () {
			$current_portfolio.isotope({
				layoutMode: 'masonry',
				masonry: {
					columnWidth: columnWidth
				},
				itemSelector : '.portfolio_item',
				sortBy: sortBy
			});
		});
	});

	$('.portfolio_filter_button').on('click', function () {
		var $portfolio_filter_clicked_button = $(this);

		if ($portfolio_filter_clicked_button.hasClass('selected')) {
			return false;
		}

		var $portfolio_filter = $portfolio_filter_clicked_button.parents('.portfolio_filter');
		$portfolio_filter.find('.selected').removeClass('selected');
		$portfolio_filter_clicked_button.addClass('selected');
		var options = {},
		key = $portfolio_filter.attr('data-option-key'),
		value = $portfolio_filter_clicked_button.attr('data-option-value');
		value = value === 'false' ? false : value;
		options[key] = value;

		if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
			changeLayoutMode($portfolio_filter_clicked_button, options);
		} else {
			$portfolio_filter.next('.ABdev_latest_portfolio').isotope(options);
		}

		return false;
	});

		function post_excerpt_positioning(e){

			var $carousel = e;
			var outer_width = $(window).outerWidth();
			var container_width;

			if (outer_width > 1190) {
				container_width = 1170;
			}

			if (outer_width > 960 && outer_width < 1190) {
				container_width = 960;
			}

			if (outer_width < 960) {
				container_width = (9/10)*outer_width;
			}

			var list_width = $carousel.find('li').outerWidth(true);
			var left_offset;
			if ($('.boxed_body_wrapper').length) {
				left_offset = list_width-60;
			} else{
				left_offset = list_width - (outer_width - container_width)/2;
			}
			var $prev = $carousel.find('.carousel_prev');
			var $next = $carousel.find('.carousel_next');
			var duration = $carousel.data('duration');
			var li_number = $carousel.find('li').length;
			var $ul = $carousel.find('ul');
			var $li = $ul.find('li');
			$ul.css({'display': 'inline-block', 'width': li_number * $carousel.find('li').outerWidth(true) + 'px', 'left': -left_offset + 'px'});

			if (outer_width < 760){
				$li.eq(1).addClass('active');
			} else if (outer_width > 760){
				$li.eq(1).addClass('active');
				$li.eq(2).addClass('active');
			}

			var $not_active_no = $carousel.find('li').not('.first').not('.last').not('.active').length;
			var $not_active_width = $not_active_no * $carousel.find('li').outerWidth(true);

			$carousel.on('click', '.carousel_next', function (e) {
				e.preventDefault();
				var $li = $ul.find('li');
				var $a = $('.active', $carousel);

				if (!$a.next().hasClass('last') && !$ul.is(':animated')) {
					$a.removeClass('active').next().addClass('active');
				}

				if (parseInt($ul.css('left'), 10) != -parseInt($not_active_width + left_offset, 10) && !$ul.is(':animated')) {
					$ul.animate({
						left: parseInt($ul.css('left'), 10) - $ul.find('li').outerWidth(true),
					}, duration);
				}
			});

			$carousel.on('click', '.carousel_prev', function (e) {
				e.preventDefault();
				var $li = $ul.find('li');
				var $a = $('.active', $carousel);

				if (!$a.prev().hasClass('first') && !$ul.is(':animated')) {
					$a.removeClass('active').prev().addClass('active');
				}

				if (parseInt($ul.css('left'), 10) !== -parseInt(left_offset, 10) && !$ul.is(':animated')) {
					$ul.animate({
						left: parseInt($ul.css('left'), 10) + $ul.find('li').outerWidth(true),
					}, duration);
				}
			});
		}


	$(window).on('load', function () {

		//Post Excerpt carousel

		$('.tcvpb_post_excerpt_carousel').each(function(){
			var $this = $(this);
			post_excerpt_positioning($this);
		});

		fill_empty_space();

	});

	//Team member carousel

	$('.tcvpb-team-carousel').each(function () {
		var $prev = $(this).find('.carousel_prev');
		var $next = $(this).find('.carousel_next');

		var $autoPlay = $(this).data('autoplay') == '0' ? false : true;
		var $items = $(this).data('items');
		var $effect = $(this).data('effect');
		var $easing = $(this).data('easing');
		var $duration = $(this).data('duration');

		$(this).find('ul').carouFredSel({
			prev: $prev,
			next: $next,
			circular: false,
			infinite: false,
			width: '100%',
			play: true,
			auto: $autoPlay,
			scroll: {
				items: $items,
				fx: $effect,
				easing: $easing,
				duration: $duration,
			},
			swipe: {
				onTouch: true,
			}
		});

		$(this).find('.tcvpb_overlayed').each(function () {
			var el_height = $(this).outerHeight() - 60;

			$(this).hover(function () {
				$(this).find('.tcvpb_team_info').css('transform', 'translate(0,-' + el_height + 'px)');
			}, function () {
				$(this).find('.tcvpb_team_info').css('transform', 'translate(0,0px)');
			});
		});

	});

	//Fill empty space function

	function fill_empty_space(){
		var $main_footer = $('#ABdev_main_footer');
		var empty_space;
		$main_footer.css('margin-top', '0px');
		if ($('body').hasClass('admin-bar')) {
			empty_space = ($(window).outerHeight(true)+32) - $('body').outerHeight(true);
		} else{
			empty_space = $(window).outerHeight(true) - $('body').outerHeight(true);
		}
		if(empty_space>0){
			$main_footer.css('margin-top', empty_space + 'px');
		}
	}
	if(!$('#timeline_posts').length){
		fill_empty_space();
	}

	//Creator elements

	/*********** Parallax ***********/
    $('.tcvpb-parallax').each(function(){
        var parallax_amount = $(this).data('parallax');
        var background_image = $(this).data('background_image');
        if(!jQuery.browser.mobile && background_image!==undefined){
            $(this).css('background-image', 'url(' + background_image + ')');
            $(this).parallax("50%", parallax_amount,false);
        }
        else{
            $(this).css('background-attachment', 'scroll');
        }
    });


    $('.tcvpb-video-bg .section_video_background').mediaelementplayer( {pauseOtherPlayers: false} );

    function tcvpb_resize_video_bg($section){
        var $video = $section.find('.tcvpb_video_background');
        $video.width('auto');
        var video_height = $video.height();
        var ratio = $video.width()/video_height;
        var difference = $section.height()-video_height;
        if(difference>0){
            $video.width((video_height+difference)*ratio);
        }
    }

    $('.tcvpb-video-bg').each(function(){
        tcvpb_resize_video_bg($(this));
        $(this).find('.tcvpb_video_background').css({'visibility':'visible'});
    });


	/*********** Animations ***********/
    if(!jQuery.browser.mobile){
        $(".tcvpb-animo").one('inview', function(event, isInView) {
            if (isInView) {
            	var $this = $(this);
                var animation = $this.data('animation');
                var duration = $this.data('duration')/1000;
                var delay = parseInt($this.data('delay'),10);
                setTimeout(function() {
                   $this.css({visibility: "visible"}).animo( { animation: animation, duration: duration} );
                }, delay);

            }
        });
    }
    else{
        $(".tcvpb-animo").css({visibility: "visible"});
    }

    $(".tcvpb-animo-children").one('inview', function(event, isInView) {
        var $element = $(this);
        var animation = $element.data('animation');
        var duration = $element.data('duration')/1000;
        var delay = parseInt($element.data('delay'),10);
        var difference = 0;
        if (isInView) {
            $element.children().each(function(){
                setTimeout(function() {
                    $element.css({visibility: "visible"}).animo( { animation: animation, duration: duration} );
                }, difference);
                difference = difference + delay;
            });
        }
    });


	/*********** Accordions ***********/
    $( ".tcvpb-accordion" ).accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
        create: function( event, ui ) {
            var expanded = $(this).data("expanded");
            if(expanded===0){
                expanded = false;
            }
            else{
                expanded = expanded-1;
            }
            $(this).accordion( "option", "active", expanded);
        },
    });


	/*********** Tabs ***********/
    $(".tcvpb-tabs-tab").click(function(event) {
        event.preventDefault();
        var $this = $(this);
        var $tabs= $this.parents('.tcvpb-tabs');

        if ($this.parent().hasClass('active') || $tabs.hasClass('animating')) {
            return;
        }

        $this.parent().addClass('active');
        $this.parent().siblings().removeClass('active');

        var $old_pane = $tabs.find(".tab-pane.active_pane");
        var $new_pane = $($this.data("href"));
        var $pane_parent = $old_pane.parent();

        var effect = $tabs.data('effect');

        var auto_height;

        if ( effect==='fade' || effect==='slide' ) {
            $tabs.addClass('animating');
            $pane_parent.height($pane_parent.height());
            $old_pane.css({'opacity':'1','display':'block'});
            $new_pane.css({'opacity': '0','display':'block'});
            $pane_parent.find('.active_pane').removeClass('active_pane');

            if(effect==='slide'){
                var increasing = false;
                if ($new_pane.index() > $old_pane.index()){
                    increasing = true;
                }

                if($tabs.hasClass('tcvpb-tabs-vertical')){
                    $new_pane.css({
                        'top': ((increasing)?'100%':'-100%'),
                        'opacity':'1',
                        'display':'block',
                    });
                    $new_pane.animate({'top' : '0%'},{
                        'duration' : 300,
                        'step' : function(){
                            var offset = $(this).outerHeight()+(parseFloat($(this).css('top'))*((increasing)?-1:1));
                            // console.log(offset);
                            $old_pane.css('top',((increasing)?'-':'')+offset+'px');
                        },
                        'complete' : function(){
                            $(this).addClass('active_pane');
                            $old_pane.hide();
                            $tabs.removeClass('animating');
                        }
                    });
                }
                else{
                    $new_pane.css({
                        'left': ((increasing)?'100%':'-100%'),
                        'opacity':'1',
                        'display':'block',
                    });
                    $new_pane.animate({'left' : '0%'},{
                        'duration' : 300,
                        'step' : function(){
                            var offset = $(this).outerWidth()+(parseFloat($(this).css('left'))*((increasing)?-1:1));
                            // console.log(offset);
                            $old_pane.css('left',((increasing)?'-':'')+offset+'px');
                        },
                        'complete' : function(){
                            $(this).addClass('active_pane');
                            $old_pane.hide();
                            $tabs.removeClass('animating');
                        }
                    });

                }

                auto_height = $new_pane.outerHeight();
                $pane_parent.animate({
                    'height': auto_height+'px',
                },{
                    'duration' : 300,
                    'complete' : function(){
                        $(this).height('auto');
                    }
                });


            }
            else if(effect==='fade'){
                $old_pane.animate({'opacity' : '0'},{
                    'duration' : 300,
                    'complete' : function(){
                        $(this).css('display','none');
                    }
                });

                $new_pane.animate({'opacity' : '1'},{
                    'duration' : 300,
                    'complete' : function(){
                        $(this).addClass('active_pane');
                        $tabs.removeClass('animating');
                    }
                });

                auto_height = $new_pane.outerHeight();
                $pane_parent.animate({
                    'height': auto_height+'px',
                },{
                    'duration' : 300,
                    'complete' : function(){
                        $(this).height('auto');
                    }
                });

            }
        }
        else{
            $old_pane.removeClass('active_pane');
            $new_pane.addClass('active_pane');
        }

    });

    $('.tcvpb-tabs-timeline').each(function(){
        var $this = $(this);
        var $tabs = $this.find('.nav-tabs > li');
        var tabsCount = $tabs.length;
        $tabs.addClass('tab_par_'+tabsCount);
    });

    function tcvpb_tabs_responsive(){
        $('.tcvpb-tabs').each(function(){
            var $tabs = $(this);
            if($tabs.width() < parseInt($tabs.data('break_point'))){
                $tabs.addClass('tcvpb-tabs-fullwidthtabs');
            }
            else{
                $tabs.removeClass('tcvpb-tabs-fullwidthtabs');
            }
        });
    }

    tcvpb_tabs_responsive();

	/*********** Alert Box ***********/
    $( ".tcvpb_alert_box_close" ).click(function(){
        var $parent = $(this).parent();
        $parent.animate({height:"0px", paddingTop:"0px", paddingBottom:"0px", margin:"0px", opacity:"0"},400);
    });


	/*********** Stats excerpt counter ***********/
    function tcvpb_counter($object,interval,max,increment) {
        var number = parseInt($object.text(),10) + increment;
        if (number < max){
            setTimeout(function() {tcvpb_counter($object,interval,max,increment);} ,interval);
            $object.text(number);
        }
        else{
            $object.text(max);
        }
    }

    if(!jQuery.browser.mobile){
        $(".tcvpb_stats_number").one('inview', function(event, isInView) {
            if (isInView) {
                var max = $(this).data("number");
                var increment = 1;
                if (max > 50) increment = 10;
                if (max > 500) increment = 100;
                if (max > 5000) increment = 200;
                if (max > 10000) increment = 1000;
                var interval = $(this).data("duration")/(max/increment);
                $(this).text('0');
                tcvpb_counter($(this),interval,max,increment);
            }
        });
    }
    else{
        $(".tcvpb_stats_number").each(function() {
            var max = $(this).data("number");
            $(this).text(max);
        });
    }


	/*********** Knob ***********/
    $(".tcvpb_knob_wrapper").each(function(){
        var $knob = $(this).find(".tcvpb_knob");
        var $number_sign = $(this).find(".tcvpb_knob_number_sign");
        var $number = $(this).find(".tcvpb_knob_number");
        var outlineColor = $knob.data('troncolor');

        $knob.knob({
            'displayInput' : false,
            draw : function () {

                        // "tron" case
                        if(this.$.data('skin') == 'tron') {

                            var a = this.angle(this.cv),  // Angle
                                sa = this.startAngle,          // Previous start angle
                                sat = this.startAngle,         // Start angle
                                ea,                            // Previous end angle
                                eat = sat + a,                 // End angle
                                r = 1;

                            this.g.lineWidth = this.lineWidth;

                            this.o.cursor
                                && (sat = eat - 0.3)
                                && (eat = eat + 0.3);

                            if (this.o.displayPrevious) {
                                ea = this.startAngle + this.angle(this.v);
                                this.o.cursor
                                    && (sa = ea - 0.3)
                                    && (ea = ea + 0.3);
                                this.g.beginPath();
                                this.g.strokeStyle = outlineColor;
                                this.g.lineCap = this.$.data('linecap') || 'butt';
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                                this.g.stroke();
                            }

                            this.g.beginPath();
                            this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                            this.g.lineCap = this.$.data('linecap') || 'butt';
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                            this.g.stroke();

                            this.g.lineWidth = 3;
                            this.g.beginPath();
                            this.g.strokeStyle = outlineColor;
                            this.g.lineCap = this.$.data('linecap') || 'butt';
                            this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2.2 / 2, -217/180 * Math.PI, -322/180 * Math.PI, false);

                            this.g.stroke();

                            return false;
                        }
                    }
        });

        var canvas_width = $(this).find("canvas").width();

        $number_sign.css({
            'visibility' : 'visible',
            'lineHeight' : canvas_width+'px',
        });

        if(!jQuery.browser.mobile){
            $knob.val(0).trigger('change');
            $(this).one('inview', function(event, isInView) {
                if (isInView) {
                    $({value: 0}).animate({value: $knob.data("number")}, {
                        duration: 1000,
                        easing:'swing',
                        step: function()
                        {
                            var current = Math.ceil(this.value);
                            $knob.val(current).trigger('change');
                            $number.html(current);
                        }
                    });
                }
            });
        }
        else{
            $number.html($knob.data("number"));
        }
    });

	/*********** Tooltip ***********/
	var tcvpb_tipsy_opacity = (typeof tcvpb_options !== 'undefined') ? tcvpb_options.tcvpb_tipsy_opacity : 0.8;
    $('.tcvpb_tooltip').tipsy({
        fade: true,
        opacity: tcvpb_tipsy_opacity,
        gravity: function(){
            var gravity = $(this).data("gravity");
            gravity = (gravity !== undefined) ? gravity : 's';
            return gravity;
        }
    });

	/*********** Scroll Popup ***********/
    $(".tcvpb-popup-wrapper").one('inview', function(event, isInView) {
        if (isInView) {
            var $popup_shadow = $(this).find('.tcvpb-popup-shadow');
            var $popup_content = $(this).find('.tcvpb-popup-content');
            $popup_shadow.appendTo("body");
            var animation = $popup_content.data('animation');
            var duration = $popup_content.data('duration')/1000;
            var delay = parseInt($popup_content.data('delay'),10);
            setTimeout(function() {
               $popup_content.css({display : "block", position: "fixed"}).animo( { animation: animation, duration: duration} );
               $popup_shadow.css({display : "block"}).animo( { animation: animation, duration: duration} );
            }, delay);
        }
    });
    $('.tcvpb-popup-shadow').click(function(e){
        e.preventDefault();
        $('.tcvpb-popup-shadow').fadeOut();
    });


	/*********** Back to Top ***********/
    $('.tcvpb_divider a').click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, 'slow');
    });


	/*********** Team Member ***********/
    $('.tcvpb_team_member_modal_link').click(function(e){
        e.preventDefault();
        var $parent = $(this).closest('.tcvpb_team_member');
        var $modal = $parent.find('.tcvpb_team_member_modal');
        var $section = $parent.closest('.tcvpb_section_tc');
        $modal.detach().appendTo('body').fadeIn().addClass('tcvpb_team_member_modal_opened');
        $parent.addClass('tcvpb_team_member_with_opened_modal');
    });
    $('.tcvpb_team_member_modal_close').click(function(e){
        e.preventDefault();
        $(this).parent().fadeOut('slow', function(){
            $(this).detach().appendTo($('.tcvpb_team_member_with_opened_modal')).removeClass('tcvpb_team_member_modal_opened');
            $('.tcvpb_team_member_with_opened_modal').removeClass('tcvpb_team_member_with_opened_modal');
        })
    });
    $(document).on('keydown', function(e) {
        if ( e.keyCode === 27 ) { //ESC
            $('.tcvpb_team_member_modal_opened').fadeOut('slow', function(){
                $(this).detach().appendTo($('.tcvpb_team_member_with_opened_modal')).removeClass('tcvpb_team_member_modal_opened');
                $('.tcvpb_team_member_with_opened_modal').removeClass('tcvpb_team_member_with_opened_modal');
            })
        }
    });

    if (('.tcvpb_team_member_modal_close').length !== 0) {
		$('.tcvpb_team_member_modal_close').empty();
	}

	$('.tcvpb_team_member').each(function(){
		var $team_member = $(this);
		var social_height = $team_member.find('.tcvpb_social_links').outerHeight();
		var negative = - social_height;
		$team_member.find('.tcvpb_overlayed').css('margin-bottom', -social_height+'px');
		$team_member.hover( function(){
			$(this).find('.tcvpb_overlayed').css({'-webkit-transform' : 'translateY('+negative+'px'+')', '-moz-transform' : 'translateY('+negative+'px'+')', '-ms-transform' : 'translateY('+negative+'px'+')', '-o-transform' : 'translateY('+negative+'px'+')', 'transform' : 'translateY('+negative+'px'+')'});
		}, function(){
			$(this).find('.tcvpb_overlayed').css({'-webkit-transform' : 'translateY(0)', '-moz-transform' : 'translateY(0)', '-ms-transform' : 'translateY(0)', '-o-transform' : 'translateY(0)', 'transform' : 'translateY(0)'});
		});
	});


	/*********** Progress Bar ***********/
    if(!jQuery.browser.mobile){
        $(".tcvpb_meter .tcvpb_meter_percentage").width(0).one('inview', function(event, isInView) {
          if (isInView) {
            var newwidth = $(this).data("percentage") + '%';
            $(this).animate({width: newwidth}, {
                duration:1500,
                step: function(now) {
                    $(this).find('span').html(Math.floor(now) + '%');
                    var above_tenths = Math.floor(now/10);
                    for(var i=1; i<=above_tenths; i++){
                        $(this).addClass('tcvpb_meter_above'+above_tenths*10);
                    }
                }
            });
          }
        });
    }
    else{
        $(".tcvpb_meter .tcvpb_meter_percentage").each(function(){
            var newwidth = $(this).data("percentage");
            $(this).css('width', newwidth+'%');
            for(var i=0; i<=newwidth; i++){
                var above_tenths = Math.floor(i/10);
                $(this).addClass('tcvpb_meter_above'+above_tenths*10);
            }

        });
    }

	/*********** Portfolio ***********/
	$('.ABp_latest_portfolio').each(function () {
			var $prev = $(this).find('.portfolio_prev');
			var $next = $(this).find('.portfolio_next');

			$(this).find('ul').carouFredSel({
				prev: $prev,
				next: $next,
				auto: false,
				width: '100%',
				scroll: 1,
				swipe: true,
				padding: null,
			});

		});


	/*********** Counter ***********/
    $('.tcvpb_countdown.simple_style, .tcvpb_countdown.simple_style_transparent').each(function() {
        var $this = $(this);
        var countDownString = $this.data("value");

        function update_countown_element($element,number){
            $element.html(number);
            var $span = $element.next('span');
            if(parseInt(number) == 1){
                $span.html($span.data("singular"));
            }
            else{
                $span.html($span.data("plural"));
            }
        }

        $this.find('.simple.countdown.year').countdown(countDownString).on('update.countdown', function(event){
            update_countown_element($(this),event.strftime('%Y'));
        });

        $this.find('.simple.countdown.month').countdown(countDownString).on('update.countdown', function(event){
            update_countown_element($(this),event.strftime('%m'));
        });

        $this.find('.simple.countdown.day').countdown(countDownString).on('update.countdown', function(event){
            update_countown_element($(this),event.strftime('%d'));
        });

        $this.find('.simple.countdown.hour').countdown(countDownString).on('update.countdown', function(event){
            update_countown_element($(this),event.strftime('%H'));
        });

        $this.find('.simple.countdown.minute').countdown(countDownString).on('update.countdown', function(event){
            update_countown_element($(this),event.strftime('%M'));
        });

        $this.find('.simple.countdown.second').countdown(countDownString).on('update.countdown', function(event){
            update_countown_element($(this),event.strftime('%S'));
        });
    });


    $('.tcvpb_countdown.flip_style').each(function() {
        var $this = $(this);
        var countDownString = $this.data("value");

        function zeroPad(num, places) {
          var zero = places - num.toString().length + 1;
          return Array(+(zero > 0 && zero)).join("0") + num;
        }

        function update_flip_countown_element($element,new_number,if_negative){
            var current_number = parseInt($element.find('.count.curr').html());
            if(current_number!=new_number && !$element.hasClass('in_a_flip')){
                var $span = $element.find('span');
                if(parseInt(new_number) == 1){
                    $span.html($span.data("singular"));
                }
                else{
                    $span.html($span.data("plural"));
                }
                setTimeout(function(){
                    $element.addClass('flip in_a_flip');
                },5);
                setTimeout(function(){
                    $element.find('.count.curr').html(zeroPad(new_number, 2));
                },510);
                setTimeout(function(){
                    $element.removeClass('flip in_a_flip');
                    new_number = (new_number-1 === -1) ? if_negative : new_number-1;
                    $element.find('.count.next').html(zeroPad(new_number, 2));
                },600);
            }
        }

        $this.find('.flip_element.year .count.curr.top').countdown(countDownString).on('update.countdown', function(event){
            update_flip_countown_element($(this).parent(),event.strftime('%Y'),0);
        });

        $this.find('.flip_element.month .count.curr.top').countdown(countDownString).on('update.countdown', function(event){
            update_flip_countown_element($(this).parent(),event.strftime('%m'),11);
        });

        $this.find('.flip_element.day .count.curr.top').countdown(countDownString).on('update.countdown', function(event){
            update_flip_countown_element($(this).parent(),event.strftime('%d'),30);
        });

        $this.find('.flip_element.hour .count.curr.top').countdown(countDownString).on('update.countdown', function(event){
            update_flip_countown_element($(this).parent(),event.strftime('%H'),23);
        });

        $this.find('.flip_element.minute .count.curr.top').countdown(countDownString).on('update.countdown', function(event){
            update_flip_countown_element($(this).parent(),event.strftime('%M'),59);
        });

        $this.find('.flip_element.second .count.curr.top').countdown(countDownString).on('update.countdown', function(event){
            update_flip_countown_element($(this).parent(),event.strftime('%S'),59);
        });

     });

	/*********** Image Carousel ***********/
	$('.tcvpb-carousel').each(function () {
			var $this = $(this);
			var image_carousel_height = $this.find('img').height();
			var $prev = $this.find('.carousel_prev');
			var $next = $this.find('.carousel_next');

			$prev.css('top', -75 - image_carousel_height/2 + 'px');
			$next.css('top', -75 - image_carousel_height/2 + 'px');

			var $autoPlay = $this.data('autoplay') == '0' ? false : true;
			var $items = $this.data('items');
			var $effect = $this.data('effect');
			var $easing = $this.data('easing');
			var $duration = $this.data('duration');

			if ($(window).width()<768) {
				$this.find('li').css('width', $this.width());
			}

			$(this).find('ul').carouFredSel({
				prev: $prev,
				next: $next,
				width: '100%',
				play: true,
				auto: $autoPlay,
				scroll: {
					items: $items,
					fx: $effect,
					easing: $easing,
					duration: $duration,
				},
				swipe: {
					onTouch: true,
				}
			});

		});


	/*********** Google Maps ***********/
	function initialize_gmap($element) {
	    var myLatlng = new google.maps.LatLng($element.data('lat'),$element.data('lng'));
	    var auto_center_zoom = ($element.data('auto_center_zoom') == 1 ? true : false);
	    var scrollwheel = ($element.data('scrollwheel') == 1 ? true : false);
	    var mapTypeControl = ($element.data('maptypecontrol') == 1 ? true : false);
	    var panControl = ($element.data('pancontrol') == 1 ? true : false);
	    var zoomControl = ($element.data('zoomcontrol') == 1 ? true : false);
	    var scaleControl = ($element.data('scalecontrol') == 1 ? true : false);
	    var styles = (typeof tcvpb_options !== 'undefined') ? tcvpb_options.tcvpb_custom_map_style : '';
	    var map_type = google.maps.MapTypeId.ROADMAP;

	    if ($element.data('map_type') == 'SATELLITE') map_type = google.maps.MapTypeId.SATELLITE;
	    if ($element.data('map_type') == 'HYBRID') map_type = google.maps.MapTypeId.HYBRID;
	    if ($element.data('map_type') == 'TERRAIN') map_type = google.maps.MapTypeId.TERRAIN;

	    var mapOptions = {
	        zoom: parseInt($element.data('zoom'),10),
	        center: myLatlng,
	        mapTypeId: map_type,
	        styles: jQuery.parseJSON(styles),
	        scrollwheel: scrollwheel,
	        mapTypeControl: mapTypeControl,
	        mapTypeControlOptions: {
	            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
	            position: google.maps.ControlPosition.BOTTOM_CENTER
	        },
	        panControl: panControl,
	        panControlOptions: {
	            position: google.maps.ControlPosition.RIGHT_CENTER
	        },
	        zoomControl: zoomControl,
	        zoomControlOptions: {
	            style: google.maps.ZoomControlStyle.LARGE,
	            position: google.maps.ControlPosition.RIGHT_CENTER
	        },
	        scaleControl: scaleControl,
	        scaleControlOptions: {
	            position: google.maps.ControlPosition.BOTTOM_LEFT
	        },
	        streetViewControl: false,
	        streetViewControlOptions: {
	            position: google.maps.ControlPosition.RIGHT_CENTER
	        }
	    };

	    var elemnt_id = $element.attr('id');
	    var bounds = new google.maps.LatLngBounds();
	    var map = new google.maps.Map(document.getElementById(elemnt_id), mapOptions);

	    var c = 0;
	    var markers = [];
	    var infoWindowContent = [];
	    var marker_icons = [];
	    $element.siblings('.tcvpb_google_map_marker').each(function(){
	        var $marker = $(this);
	        markers[c] = [$marker.data('title'), $marker.data('lat'),$marker.data('lng'),$marker.data('icon')];
	        infoWindowContent[c] = ['<div class="info_content">' + '<h3>' + $marker.data('title') + '</h3>' + '<p>' + $marker.html() + '</p>' + '</div>'];
	        c++;
	    });

	    // Display multiple markers on a map
	    var infoWindow = new google.maps.InfoWindow(), marker, i;

	    // Loop through our array of markers & place each one on the map
	    for( i = 0; i < markers.length; i++ ) {
	        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
	        bounds.extend(position);
	        marker = new google.maps.Marker({
	            position: position,
	            map: map,
	            title: markers[i][0],
	            icon: markers[i][3]
	        });
	        // Allow each marker to have an info window
	        google.maps.event.addListener(marker, 'click', (function(marker, i) {
	            return function() {
	                infoWindow.setContent(infoWindowContent[i][0]);
	                infoWindow.open(map, marker);
	            }
	        })(marker, i));
	    }
	    if(auto_center_zoom){
	        map.fitBounds(bounds);
	    }
	}

	$('.tcvpb_google_map').each(function(){
	    google.maps.event.addDomListener(window, 'load', initialize_gmap($(this)));
	});





//Resize

	$(window).on('resize', function(){
		fill_empty_space();

		$('.tcvpb_post_excerpt_carousel').each(function(){
			var $this = $(this);
			post_excerpt_positioning($this);
		});

		$('.ABdev_latest_portfolio').isotope('layout');

		if ($(window).width()>960 && !$sf.hasClass('sf-js-enabled')) {
			//you only want SuperFish to be re-enabled once ($sf.hasClass)
			$navigation.show();
			$sf.superfish({
				delay: 0,
				speed: 0,
				speedOut: 0,
				cssArrows: false,
				disableHI: true,/* load hoverIntent.js in header to use this option */
				onBeforeShow:   function () {
					var ww = $(window).width();
					if (this.parent().offset() !== undefined) {
						var locUL = this.parent().offset().left + this.width();
						var locsubUL = this.parent().offset().left + this.parent().width() + this.width();
						var par = this.parent();
						if (par.parent().is('#main_menu') && (locUL > ww)) {
							this.css('marginLeft', '-' + (locUL - ww + 20) + 'px');
						} else if (!par.parent().is('#main_menu') && (locsubUL > ww)) {
							this.css('left', '-' + (this.width()) + 'px');
						}
					}
				}
			});
		} else if ($(window).width()<960 && $sf.hasClass('sf-js-enabled')) {
			//smaller screen, disable SuperFish
			$sf.superfish('destroy');
			$navigation.hide();
			$navigation.find('.sf-mega').css('marginLeft', '0');
		}

		$(".tcvpb_knob_wrapper").each(function(){
	        var $number_sign = $(this).find(".tcvpb_knob_number_sign");
	        var canvas_width = $(this).find("canvas").width();
	        $number_sign.css({
	            'lineHeight' : canvas_width+'px',
	        });
	    });

	    $('.tcvpb-video-bg').each(function(){
	        tcvpb_resize_video_bg($(this));
	    });

	    tcvpb_tabs_responsive();

	    scroll_menu_transparency();
	    scroll_header_position();
	    reset_menu_properties();


	});


});



/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);