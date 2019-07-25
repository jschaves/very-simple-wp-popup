"use strict";
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
var idEdit;
var dataPopup;
var titlePopup;
var idPopupEdit = 0;
var template;

(function($) {
	
	jQuery(document).ready(function() {
		//is border
		jQuery('select#selectBorder').change(function() {
			
			if(jQuery(this).val() == 1) {
				
				jQuery('#bd').show('slow');
				
			} else if(jQuery(this).val() == 0) {
				
				jQuery('#bd').fadeOut('slow');
				
			}
			
		});
		//type of border
		jQuery('select#type').change(function() {
			
			if(jQuery(this).val() == 1) {
				
				jQuery('#radius').show('slow');
				
			} else if(jQuery(this).val() == 0) {
				
				jQuery('#radius').fadeOut('slow');
				
			}
			
		});
		//border color
		jQuery('#borderColor').change(function() {
			
			jQuery('#borderHexColor').html(jQuery(this).val());
			
		});
		//text color
		jQuery('#textColor').change(function() {
			
			jQuery('#textHexColor').html(jQuery(this).val());
			
		});
		//background color
		jQuery('#backgroundColor').change(function() {
			
			jQuery('#backgroundHexColor').html(jQuery(this).val());
			
		});
		//background color popup
		jQuery('#backgroundColorPopup').change(function() {
			
			jQuery('#backgroundHexColorPopup').html(jQuery(this).val());
			
		});
		//background opacity
		jQuery('#backgroundOpacity').change(function() {
			
			jQuery('#backgroundOpacityValue').html(jQuery(this).val() / 100);
			
		});
		//background opacity popup
		jQuery('#popupOpacity').change(function() {
			
			jQuery('#popupOpacityValue').html(jQuery(this).val() / 100);
			
		});
		//preview
		jQuery('.preview-popup').click(function() {

			if(!jQuery('#data').hasClass('show')) {

				popupOpacity = jQuery('#popupOpacity').val();
				colorPopup = jQuery('#backgroundColorPopup').val();
				widthPopup = jQuery('#width').val();
				heightPopup = jQuery('#height').val();
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
				backgroundOpacity = jQuery('#backgroundOpacity').val();
				backgroundColor = jQuery('#backgroundColor').val();
				titlePopup = jQuery('#title').val();
				
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
					imgClose,
					'view',
					title
				);
				
				jQuery('#data').addClass('show');
				
			}
			
		});
		//preview all
		jQuery('.array-data-popup').on('click', function() {
			
			idPopup = jQuery(this).find('span').attr('viewPopup');
			arrayDataPopup = idPopup.split(',');
			recoverDataPopup(arrayDataPopup, 'view');

		});
		//copy shortcode
		jQuery('.copypopup').on('click', function() {
			
			var aux = document.createElement('input');
			jQuery(aux).val(jQuery(this).attr('copy'));
			document.body.appendChild(aux);
			aux.select();
			document.execCommand('copy');
			document.body.removeChild(aux);
			
		});
		//edit popup
		jQuery('.editpopup').on('click', function() {
			
			dataPopup = jQuery(this).attr('edit');
			arrayDataPopup = jQuery('#' + dataPopup).attr('viewpopup').split(',');
			recoverDataPopup(arrayDataPopup, 'edit');
			
		});
		//view popup		
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
			imgClose,
			type,
			title
		) {
			//popup type
			if(type == 'view') {
				//popup height
				heightPopup = parseInt(jQuery(window).height()) * parseInt(heightPopup) / 100;
				//html popup
				template =  '<span id="closePopup">' +
								'<img onclick="javascript:closePopup();" src="' + imgClose + '" class="closePopup" />' +
								'<span id="contents-popup">' +
									'<span id="backgroundPopup" class="popuptext" style="' + 
										'opacity : ' + backgroundOpacity / 100 + ';' +
										'background-color : ' + backgroundColor + '">' +
									'</span>' +
									'<div class="openPopup">' +
										'<span class="popuptext" style="' +
											'width: ' + widthPopup + '%;' +
											'height: ' + heightPopup + 'px;' +
											'border:'+ borderWidth + 'px solid ' + borderColor + '; ' +
											'border-radius:' + radius + 'px; ' +
											'background-color: ' + colorPopup + ';' +
											'opacity: ' + popupOpacity / 100 + ';' +
											'color: ' + textColor + ';" ' +
											'id="data">' + decodeURIComponent(escape(window.atob(contents))) +
										'</span>' +
									'</div>' +
								'</span>' +
							'</span>';	
				jQuery('body').append(template);
			//type edit	
			} else if(type == 'edit') {
				//con borde
				if(borderWidth > 0) {
					
					jQuery('#selectBorder').val(1);
					jQuery('#bd').fadeIn();
					
				}
				//con radio
				if(radius > 0) {
					
					jQuery('#type').val(1);
					jQuery('#radius').fadeIn();
					
				}
				//estilos
				jQuery('#title').val(title);
				jQuery('#backgroundOpacity').val(backgroundOpacity);
				jQuery('#backgroundOpacityValue').html(backgroundOpacity / 100);
				jQuery('#backgroundColor').val(backgroundColor);
				jQuery('#backgroundHexColor').html(backgroundColor);
				jQuery('#width').val(widthPopup);
				jQuery('#height').val(heightPopup);
				jQuery('#borderWidth').val(borderWidth);
				jQuery('#radiusPopup').val(radius);
				jQuery('#borderColor').val(borderColor);
				jQuery('#borderHexColor').html(borderColor);
				jQuery('#backgroundColorPopup').val(colorPopup);
				jQuery('#backgroundHexColorPopup').html(colorPopup);
				jQuery('#popupOpacity').val(popupOpacity);
				jQuery('#popupOpacityValue').html(popupOpacity / 100);
				jQuery('#textColor').val(textColor);
				jQuery('#textHexColor').html(textColor);
				jQuery('#contents').val(decodeURIComponent(escape(window.atob(contents))));
				jQuery('.helpPopup').html(jQuery('#link-data-popup').attr('alertpopup'));
				jQuery(window).scrollTop(0);

			}
			
		}
		//mostrar el popup
		function recoverDataPopup(arrayDataPopup, type) {
			//editar el popup
			if(type == 'edit') {

				idPopupEdit = arrayDataPopup[0].split('=');
				idPopupEdit = idPopupEdit[1];
				jQuery('#idpopupedit').val(idPopupEdit);
			//ver el popup	
			} else if(type == 'view') {
				
				jQuery('#idpopupedit').val('null');
				
			}
			//estilos del popup
			widthPopup = arrayDataPopup[1].split('=');
			heightPopup = arrayDataPopup[2].split('=');
			textColor = arrayDataPopup[3].split('=');
			borderWidth = arrayDataPopup[4].split('=');
			radius = arrayDataPopup[5].split('=');
			borderColor = arrayDataPopup[6].split('=');
			backgroundColor = arrayDataPopup[7].split('=');
			colorPopup = arrayDataPopup[8].split('=');
			backgroundOpacity = arrayDataPopup[9].split('=');
			popupOpacity = arrayDataPopup[10].split('=');
			contents = arrayDataPopup[11].split('=');
			titlePopup = arrayDataPopup[12].split('=');
			//ver el popup
			updatePopup(
				borderWidth[1],
				borderColor[1],
				radius[1],
				widthPopup[1],
				heightPopup[1],
				colorPopup[1],
				popupOpacity[1],
				textColor[1],
				contents[1],
				backgroundColor[1],
				backgroundOpacity[1],
				imgClose,
				type,
				titlePopup[1]
			);
			
		}

	});
	
})(jQuery);