var backgroundOpacity;
var backgroundColor;
var template;
var idPopup;
var template;
var totalPopups;
var classBox;
var nPopup;
var openNext;
var idNext;
var actualUrl;

var closePopup = function() {
	
	document.getElementById('contents-popup').remove();
	
};

var openNextPopup =	function(idNext) {
			console.log(idNext);
	document.getElementById('contents-popup').remove();
	jQuery('a[n-popup=' + idNext + ']').click(); 
			
};

(function($) {
	
	jQuery(document).ready(function() {
		
		jQuery('.viewPopup').click(function() {
			
			totalPopups = jQuery('.viewPopup').length;
			backgroundOpacity = jQuery(this).attr('bo');
			backgroundColor = jQuery(this).attr('bc');
			idPopup = jQuery(this).attr('id-popup');
			widthPopup = jQuery(this).attr('width-popup');
			heightPopup = parseInt($(window).height()) * parseInt(jQuery(this).attr('height-popup')) / 100;
			borderRadius = jQuery(this).attr('border-radius-popup');
			backgroundColorPopup = jQuery(this).attr('background-color-popup');
			opacityPopup = jQuery(this).attr('opacity-popup');
			colorPopup = jQuery(this).attr('color-popup');
			borderPopup =  jQuery(this).attr('border-popup');
			borderColorPopup = jQuery(this).attr('border-color-popup');
			contentsPopup = jQuery(this).attr('contents-popup');
			nPopup = jQuery(this).attr('n-popup');
			actualUrl =  jQuery(this).attr('actual-url');
			
			template = '<span id="contents-popup">' +
							'<span id="backgroundPopup" class="popuptext" style="opacity : ' + 
								backgroundOpacity + 
								'; background-color : ' + 
								backgroundColor + '">' +
								'<img onclick="javascript:closePopup();" src="' + actualUrl + '../public/img/close.png" class="close">' +
							'</span>' +
							'<div class="openPopup">' +
								'<span class="popuptext '  + idPopup + '" style="' +
									'width: ' + widthPopup + '%;' +
									'height: ' + heightPopup + 'px;' +
									'border: ' + borderPopup + 'px solid ' + borderColorPopup + ';' +
									'border-radius: ' + borderRadius + 'px;' +
									'background-color: ' + backgroundColorPopup + ';' +
									'opacity: ' + opacityPopup + ';' +
									'color: ' + colorPopup + ';" ' +
									'id="data">' + window.atob(unescape(encodeURIComponent(contentsPopup))) +
								'</span>';
								
								if(totalPopups > 1) {

									if(nPopup > 1) {
										
										idNext = parseInt(nPopup) - parseInt(1);
										
										template += '<ul class="box-popups" onclick="javascript:openNextPopup(' + idNext + ')" id="next-popups-left" >' +
													'	<li><img class="imgPopup" src="/wp-content/plugins/very-simple-wp-popup/public/img/left.png" /></li>' +
													'</ul>'; 
													
									}
									
									if(nPopup < totalPopups) {
									
										idNext = parseInt(nPopup) + parseInt(1);
										
										template += '<ul class="box-popups" onclick="javascript:openNextPopup(' + idNext + ')" id="next-popups-right">' +
													'	<li><img class="imgPopup" src="/wp-content/plugins/very-simple-wp-popup/public/img/right.png" /></li>' +
													'</ul>';
													
									}
												
								}
								
			template += '	</div>' +
						'</span>';			
				
			$('body').append(template);
			
		});

	});
	
})(jQuery);