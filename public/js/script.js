"use strict";
var vswppBackgroundOpacity;
var vswppBackgroundColor;
var vswppTemplate;
var vswppIdPopup;
var vswppTotalPopups;
var vswppNPopup;
var vswppIdNext = 0;
var vswppPresentUrl;
var vswppWidthPopup;
var vswppHeightPopup;
var vswppBorderRadius;
var vswppBackgroundColorPopup;
var vswppOpacityPopup;
var vswppColorPopup;
var vswppBorderPopup;
var vswppBorderColorPopup;
var vswppContentsPopup;
//popup close
var vswppClosePopup = function() {
	jQuery('#vswpp-close-popup').remove();
};
//next popup
var vswppOpenNextPopup =	function(vswppIdNext) {
	jQuery('#vswpp-contents-popup').remove();
	jQuery('#vswpp-close-popup').remove();
	jQuery('a[n-popup=' + vswppIdNext + ']').click(); 		
};
(function($) {
	jQuery(document).ready(function() {
		//open popup
		jQuery('.vswpp-view-popup').click(function() {
			vswppTotalPopups = jQuery('.vswpp-view-popup').length;
			vswppBackgroundOpacity = jQuery(this).attr('bo');
			vswppBackgroundColor = jQuery(this).attr('bc');
			vswppIdPopup = jQuery(this).attr('id-popup');
			vswppWidthPopup = jQuery(this).attr('width-popup');
			vswppHeightPopup = parseInt($(window).height()) * parseInt(jQuery(this).attr('height-popup')) / 100;
			vswppBorderRadius = jQuery(this).attr('border-radius-popup');
			vswppBackgroundColorPopup = jQuery(this).attr('background-color-popup');
			vswppOpacityPopup = jQuery(this).attr('opacity-popup');
			vswppColorPopup = jQuery(this).attr('color-popup');
			vswppBorderPopup =  jQuery(this).attr('border-popup');
			vswppBorderColorPopup = jQuery(this).attr('border-color-popup');
			vswppContentsPopup = jQuery(this).attr('contents-popup');
			vswppNPopup = jQuery(this).attr('n-popup');
			vswppPresentUrl =  jQuery(this).attr('actual-url');
			//html popup
			vswppTemplate =  '<span id="vswpp-close-popup">' +
							'<img onclick="javascript:vswppClosePopup();" src="' + vswppPresentUrl + '../public/img/close.png" class="vswpp-close-popup" />' +
							'<span id="vswpp-contents-popup">' +
								'<span id="vswpp-background-popup" class="vswpp-popup-text" style="' +
									'opacity : ' + vswppBackgroundOpacity + '; ' +
									'background-color : ' + vswppBackgroundColor + '">' +
								'</span>' +
								'<div class="vswpp-open-popup">' +
									'<span class="vswpp-popup-text '  + vswppIdPopup + '" style="' +
										'width: ' + vswppWidthPopup + '%;' +
										'height: ' + vswppHeightPopup + 'px;' +
										'border: ' + vswppBorderPopup + 'px solid ' + vswppBorderColorPopup + ';' +
										'border-radius: ' + vswppBorderRadius + 'px;' +
										'background-color: ' + vswppBackgroundColorPopup + ';' +
										'opacity: ' + vswppOpacityPopup + ';' +
										'color: ' + vswppColorPopup + ';" ' +
										'id="vswpp-data">' + decodeURIComponent(escape(window.atob(vswppContentsPopup))) +
									'</span>';
					//total popups			
					if(vswppTotalPopups > 1) {
						//+ 1 popup
						if(vswppNPopup > 1) {
							
							vswppIdNext = parseInt(vswppNPopup) - parseInt(1);
							
							vswppTemplate += '<ul class="vswpp-box-popups" onclick="javascript:vswppClosePopup();vswppOpenNextPopup(' + vswppIdNext + ')" id="vswpp-next-popups-left" >' +
											'<li><img class="vswpp-img-popup" src="' + vswppPresentUrl + '../public/img/left.png" /></li>' +
										'</ul>'; 
										
						}
						//into popups
						if(vswppNPopup < vswppTotalPopups) {
						
							vswppIdNext = parseInt(vswppNPopup) + parseInt(1);
							
							vswppTemplate += '<ul class="vswpp-box-popups" onclick="javascript:vswppClosePopup();vswppOpenNextPopup(' + vswppIdNext + ')" id="vswpp-next-popups-right">' +
											'<li><img class="vswpp-img-popup" src="' + vswppPresentUrl + '../public/img/right.png" /></li>' +
										'</ul>';
										
						}			
					}
								
						vswppTemplate += '</div>' +
								'</span>' +
							'</span>' +
						'</span>';			
				
			$('body').append(vswppTemplate);
		});
	});	
})(jQuery);