/**
 * common.js
 * 
 * Common utilities for all visualizations
 */

(function() {
	"use strict";

	var IGNORE_SCROLL_EVENTS = false;
	var SCROLLED_ONCE = false;

	// detect whether this is iphone/ipad since they do things funny
	var ios = /iPad|iPod|iPhone/.test(navigator.userAgent);

	// utilities for getting page width/height
	var pageWidth = ios ? function() {
		return document.body.clientWidth;
	} : function() {
		return window.innerWidth || document.documentElement.clientWidth;
	};
	var pageHeight = ios ? function() {
		var screenWidth, screenHeight;
		switch (window.orientation || 0) {
		case 90:
		case -90:
			screenWidth = screen.height;
			screenHeight = screen.availWidth;
			break;
		default:
			screenWidth = screen.width;
			screenHeight = screen.availHeight;
			break;
		}
		return screenHeight / screenWidth * document.body.clientWidth;
	} : function() {
		return window.innerHeight || document.documentElement.clientHeight;
	};

	// utility to register listeners to get notified on page resize events
	var watched = [];
	function watchSize(callback) {
		watched.push(callback);
		callback(pageWidth(), pageHeight());
	}

	function resized() {
		var width = pageWidth();
		var height = pageHeight();
		watched.forEach(function(cb) {
			cb(Math.max(600, width), height);
		});
	}

	// Utility for scrolling to the anchor specified in the hash
	// part of the URL
	function doAnchorScroll() {
		var id = window.location.hash;
		if (id) {
			id = id.substr(1).split(".")[0];
			var $elem = $('a[href^=#' + id + ']');
			if ($elem.size() > 0) {
				var top = $elem.offset().top;
				IGNORE_SCROLL_EVENTS = true;
				try {
					$(window).scrollTop(top);
				} finally {
					setTimeout(function() {
						IGNORE_SCROLL_EVENTS = false;
					}, 3000);
				}
			}
		}
	}

	// Only do the anchor scroll up until the first time the user scrolls
	function doAnchorScrollOnAsyncDataLoad() {
		if (!SCROLLED_ONCE) {
			doAnchorScroll();
		}
	}

	// run this routine when page loads
	$(doAnchorScroll);
	// then listen on subsequent hash change events
	$(window).on('hashchange', function onHashChange(e) {
		e.preventDefault();
		doAnchorScroll();
		if (getHashData()) {
			$(window).trigger('hashdatachange', {
				data : getHashData()
			});
		}
		return false;
	});

	// get the extra parts out of a hash ("#location.a.b" return ["a","b"])
	// used in the "your commute" section so that people can deep link to a pair
	// of stops
	function getHashData() {
		var id = window.location.hash;
		var result = null;
		if (id) {
			var parts = id.substr(1).split(".").slice(1);
			result = parts.length === 2 && parts;
		}
		return result;
	}

	var numScrolls = 0;

	// disable auto-scroll on data load after user scrolls once
	// actually the browser may scroll once on its own on page load
	// so really it listens for the second scroll event
	$(window).on('scroll', function watchFirstScroll() {
		if (!IGNORE_SCROLL_EVENTS) {
			numScrolls++;
			if (numScrolls >= 2) {
				// TODO I was still having issues with this, just disable for
				// now and always scroll when new data loads
				// SCROLLED_ONCE = true;
				$(window).off('scroll', watchFirstScroll);
			}
		}
	});

	// programmatically trigger a scroll event to fire listeners
	function triggerScroll() {
		IGNORE_SCROLL_EVENTS = true;
		try {
			$(window).trigger('scroll');
		} finally {
			IGNORE_SCROLL_EVENTS = false;
		}
	}

	// Simple formatting utility to convert an hour number (0-24) into
	// something resembling 1am, 3pm, etc.
	function hourToAmPm(hour) {
		var time = (hour % 12) === 0 ? 12 : (hour % 12);
		time += ((hour % 24) >= 12 ? 'pm' : 'am');
		
		return time;
	}

	// Create the global object that all shared data goes on
	window.VIZ = {
		ios : ios,
		watchSize : watchSize,
		wrap : wrap,
		pageHeight : pageHeight,
		anchorScroll : doAnchorScrollOnAsyncDataLoad,
		triggerScroll : triggerScroll,
		getHashData : getHashData,
		hourToAmPm : hourToAmPm,
		BREAK_SM : 768,
		BREAK_MD : 992,
		BREAK_LG : 1200,
		noop : function() {
		}
	};
}());