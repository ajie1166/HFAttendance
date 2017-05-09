$(function () {
	var id;
	$('img').live('mouseover', function () {
		var el = $('div#preview');
		if (!el.length) {
			el = $('<div id="preview"></div>');
			el.css({
				// top: '10px',
				// right: '10px',
				float: 'right',
				border: '3px double black',
				padding: '1px',
				display: 'none',
				position: 'absolute',
				background: 'white'
			});
			el.appendTo('body');
		}
		var pos = $(this).offset(), src = $(this).attr('src');
		var img = new Image(), fn = function (el) {
			id && clearTimeout(id);
			var doc = $.browser.msie && document.compatMode != 'CSS1Compat' && document.body || document.documentElement;
			var doc_w = $.browser.msie && doc.clientWidth || self.innerWidth,
				doc_h =  $.browser.msie && doc.clientHeight || self.innerHeight;
			el.html('<img src="' + src + '" style="max-width:'+(doc_w-pos.left-66)+'px;max-height:'+(doc_h-24)+'px;" />');
			id = setTimeout(function () {
				el.show().css({
					top : Math.max((doc_h - el.innerHeight()) / 2, 0) + $(document).scrollTop() - 2,
					left : pos.left + 30
				}).hide().fadeIn(200);
			}, 100);
		};
		img.src = src;
		if (img.complete) {
			fn(el);
		} else {
			img.onload = function () {
				fn(el);
			};
		}
	}).live('mouseout', function () {
		id && clearTimeout(id);
		$('div#preview').hide();
	});
});
