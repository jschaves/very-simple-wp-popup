var popupOpacity;
var colorPopup;
var widthPopup;
var heightPopup;
var textColor;
var borderWidth;
var radius;
var contents;
var backgroundOpacity;
var backgroundColor;
var idPopup;
var arrayDataPopup;
var borderColor;
var imgClose = jQuery('.preview-popup').attr('imgclose');

var closePopup = function() {
	
	jQuery('#closePopup').remove();

};

(function($) {
	
	jQuery(document).ready(function() {
		
		jQuery('select#selectBorder').change(function() {
			
			if(jQuery(this).val() == 1) {
				
				jQuery('#bd').show('slow');
				
			} else if(jQuery(this).val() == 0) {
				
				jQuery('#bd').fadeOut('slow');
				
			}
			
		});
		
		jQuery('select#type').change(function() {
			
			if(jQuery(this).val() == 1) {
				
				jQuery('#radius').show('slow');
				
			} else if(jQuery(this).val() == 0) {
				
				jQuery('#radius').fadeOut('slow');
				
			}
			
		});
		
		jQuery('#borderColor').change(function() {
			
			jQuery('#borderHexColor').html(jQuery(this).val());
			
		});
		
		jQuery('#textColor').change(function() {
			
			jQuery('#textHexColor').html(jQuery(this).val());
			
		});
		
		jQuery('#backgroundColor').change(function() {
			
			jQuery('#backgroundHexColor').html(jQuery(this).val());
			
		});
		
		jQuery('#backgroundColorPopup').change(function() {
			
			jQuery('#backgroundHexColorPopup').html(jQuery(this).val());
			
		});
		
		jQuery('#backgroundOpacity').change(function() {
			
			jQuery('#backgroundHexColorOpacity').html(jQuery(this).val() / 100);
			
		});
		
		jQuery('#popupOpacity').change(function() {
			
			jQuery('#popupHexColorOpacity').html(jQuery(this).val() / 100);
			
		});
		
		jQuery('.preview-popup').click(function() {

			if(!jQuery('#data').hasClass('show')) {

				popupOpacity = jQuery('#popupOpacity').val() / 100;
				colorPopup = jQuery('#backgroundColorPopup').val();
				widthPopup = jQuery('#width').val();
				heightPopup = parseInt($(window).height()) * parseInt(jQuery('#height').val()) / 100;
				textColor =  jQuery('#textColor').val();
				if(jQuery('#selectBorder').val() == 1) {

					borderWidth = jQuery('#borderWidth').val();
					borderColor = jQuery('#borderColor').val();
			
				} else {

					borderWidth = '';
					borderColor = '';
				}

				if(jQuery('#type').val() == 1) {
					
					radius = jQuery('#radiusPopup').val();
					
				} else {
					
					radius = '';
					
				}
				
				contents = window.btoa(unescape(encodeURIComponent(jQuery('#contents').val())));
				backgroundOpacity = jQuery('#backgroundOpacity').val() / 100;
				backgroundColor = jQuery('#backgroundColor').val();
				
				updatePopup(
					borderWidth,
					borderColor,
					radius,
					widthPopup,
					heightPopup,
					colorPopup,
					popupOpacity,
					textColor,
					contents,
					backgroundColor,
					backgroundOpacity,
					imgClose
				);
				
				jQuery('#data').addClass('show');
				
			}
			
		});
		
		jQuery('.previewPopup').on('click', function() {
			
			idPopup = jQuery(this).find('span').attr('viewPopup');
			arrayDataPopup = idPopup.split(',');
			widthPopup = arrayDataPopup[1].split('=');
			heightPopup = arrayDataPopup[2].split('=');
			heightPopup = parseInt($(window).height()) * parseInt(heightPopup[1]) / 100;
			textColor = arrayDataPopup[3].split('=');
			borderWidth = arrayDataPopup[4].split('=');
			radius = arrayDataPopup[5].split('=');
			borderColor = arrayDataPopup[6].split('=');
			backgroundColor = arrayDataPopup[7].split('=');
			colorPopup = arrayDataPopup[8].split('=');
			backgroundOpacity = arrayDataPopup[9].split('=');
			backgroundOpacity = backgroundOpacity[1] / 100;
			popupOpacity = arrayDataPopup[10].split('=');
			popupOpacity = popupOpacity[1] / 100;
			contents = arrayDataPopup[11].split('=');
			
			updatePopup(
				borderWidth[1],
				borderColor[1],
				radius[1],
				widthPopup[1],
				heightPopup,
				colorPopup[1],
				popupOpacity,
				textColor[1],
				contents[1],
				backgroundColor[1],
				backgroundOpacity,
				imgClose
			);

		});
		
		jQuery('.copy').on('click', function() {
			
			var aux = document.createElement('input');
			jQuery(aux).val(jQuery(this).attr('copy'));
			document.body.appendChild(aux);
			aux.select();
			document.execCommand('copy');
			document.body.removeChild(aux);
			
		});
		
		function updatePopup(
			borderWidth,
			borderColor,
			radius,
			widthPopup,
			heightPopup,
			colorPopup,
			popupOpacity,
			textColor,
			contents,
			backgroundColor,
			backgroundOpacity,
			imgClose
		) {

			template =  '<span id="closePopup">' +
							'<img onclick="javascript:closePopup();" src="' + imgClose + '" class="closePopup" />' +
							'<span id="contents-popup">' +
								'<span id="backgroundPopup" class="popuptext" style="' + 
									'opacity : ' + backgroundOpacity + ';' +
									'background-color : ' + backgroundColor + '">' +
								'</span>' +
								'<div class="openPopup">' +
									'<span class="popuptext" style="' +
										'width: ' + widthPopup + '%;' +
										'height: ' + heightPopup + 'px;' +
										'border:'+ borderWidth + 'px solid ' + borderColor + '; ' +
										'border-radius:' + radius + 'px; ' +
										'background-color: ' + colorPopup + ';' +
										'opacity: ' + popupOpacity + ';' +
										'color: ' + textColor + ';" ' +
										'id="data">' + decodeURIComponent(escape(window.atob(contents))) +
									'</span>' +
								'</div>' +
							'</span>' +
						'</span>';	
			$('body').append(template);
			
		}

	});
	
})(jQuery);