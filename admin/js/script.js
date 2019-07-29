"use strict";
var vswppPopupOpacity;
var vswppColorPopup;
var vswppWidthPopup;
var vswppHeightPopup;
var vswppTextColor;
var vswppBorderWidth;
var vswppRadius;
var vswppContents;
var vswppBackgroundOpacity;
var vswppBackgroundColor;
var vswppIdPopup;
var vswppArrayDataPopup;
var vswppBorderColor;
var vswppImgClose = jQuery('.vswpp-preview-popup').attr('imgclose');
var closePopup = function() {
	jQuery('#vswpp-close-popup').remove();
};
var vswppDataPopup;
var vswppTitlePopup;
var vswppIdPopupEdit;
var vswppTemplate;

(function($) {
	
	jQuery(document).ready(function() {
		//is border
		jQuery('select#vswpp-select-border').change(function() {
			
			if(jQuery(this).val() == 1) {
				
				jQuery('#vswpp-bd').show('slow');
				
			} else if(jQuery(this).val() == 0) {
				
				jQuery('#vswpp-bd').fadeOut('slow');
				jQuery('#vswpp-border-width').val(0);
				jQuery('#vswpp-radius-popup').val(0);
				
			}
			
		});
		//type of border
		jQuery('select#vswpp-type').change(function() {
			
			if(jQuery(this).val() == 1) {
				
				jQuery('#vswpp-radius').show('slow');
				
			} else if(jQuery(this).val() == 0) {
				
				jQuery('#vswpp-radius').fadeOut('slow');
				jQuery('#vswpp-radius-popup').val(0);
				
			}
			
		});
		//border color
		jQuery('#vswpp-border-color').change(function() {
			
			jQuery('#border-hex-color').html(jQuery(this).val());
			
		});
		//text color
		jQuery('#vswpp-text-color').change(function() {
			
			jQuery('#vswpp-text-hex-color').html(jQuery(this).val());
			
		});
		//background color
		jQuery('#vswpp-background-color').change(function() {
			
			jQuery('#vswpp-background-hex-color').html(jQuery(this).val());
			
		});
		//background color popup
		jQuery('#vswpp-background-color-popup').change(function() {
			
			jQuery('#vswpp-background-hex-color-popup').html(jQuery(this).val());
			
		});
		//background opacity
		jQuery('#vswpp-background-opacity').change(function() {
			
			jQuery('#vswpp-background-opacity-value').html(jQuery(this).val() / 100);
			
		});
		//background opacity popup
		jQuery('#vswpp-popup-opacity').change(function() {
			
			jQuery('#vswpp-popup-opacity-value').html(jQuery(this).val() / 100);
			
		});
		//preview
		jQuery('.vswpp-preview-popup').click(function() {

			vswppPopupOpacity = jQuery('#vswpp-popup-opacity').val();
			vswppColorPopup = jQuery('#vswpp-background-color-popup').val();
			vswppWidthPopup = jQuery('#vswpp-width').val();
			vswppHeightPopup = jQuery('#vswpp-height').val();
			vswppTextColor =  jQuery('#vswpp-text-color').val();
			if(jQuery('#vswpp-select-border').val() == 1) {

				vswppBorderWidth = jQuery('#vswpp-border-width').val();
				vswppBorderColor = jQuery('#vswpp-border-color').val();
		
			} else {

				vswppBorderWidth = '';
				vswppBorderColor = '';
			}

			if(jQuery('#vswpp-type').val() == 1) {
				
				vswppRadius = jQuery('#vswpp-radius-popup').val();
				
			} else {
				
				vswppRadius = '';
				
			}
			
			vswppContents = window.btoa(unescape(encodeURIComponent(jQuery('#vswpp-contents').val())));
			vswppBackgroundOpacity = jQuery('#vswpp-background-opacity').val();
			vswppBackgroundColor = jQuery('#vswpp-background-color').val();
			vswppTitlePopup = jQuery('#vswpp-title').val();
			
			vswppUpdatePopup(
				vswppBorderWidth,
				vswppBorderColor,
				vswppRadius,
				vswppWidthPopup,
				vswppHeightPopup,
				vswppColorPopup,
				vswppPopupOpacity,
				vswppTextColor,
				vswppContents,
				vswppBackgroundColor,
				vswppBackgroundOpacity,
				vswppImgClose,
				'view',
				vswppTitlePopup
			);

		});
		//preview all
		jQuery('.vswpp-array-data-popup').on('click', function() {
			
			vswppIdPopup = jQuery(this).find('span').attr('viewPopup');
			vswppArrayDataPopup = vswppIdPopup.split(',');
			vswppRecoverDataPopup(vswppArrayDataPopup, 'view');

		});
		//copy code
		jQuery('.vswpp-copy-popup').on('click', function() {
			
			var aux = document.createElement('input');
			jQuery(aux).val(jQuery(this).attr('copy'));
			document.body.appendChild(aux);
			aux.select();
			document.execCommand('copy');
			document.body.removeChild(aux);
			
		});
		//edit popup
		jQuery('.vswpp-edit-popup').on('click', function() {
			
			vswppDataPopup = jQuery(this).attr('edit');
			vswppArrayDataPopup = jQuery('#' + vswppDataPopup).attr('viewpopup').split(',');
			vswppRecoverDataPopup(vswppArrayDataPopup, 'edit');
			
		});
		//view popup		
		function vswppUpdatePopup(
			vswppBorderWidth,
			vswppBorderColor,
			vswppRadius,
			vswppWidthPopup,
			vswppHeightPopup,
			vswppColorPopup,
			vswppPopupOpacity,
			vswppTextColor,
			vswppContents,
			vswppBackgroundColor,
			vswppBackgroundOpacity,
			vswppImgClose,
			type,
			title
		) {
			//popup type
			if(type == 'view') {
				//popup height
				vswppHeightPopup = parseInt(jQuery(window).height()) * parseInt(vswppHeightPopup) / 100;
				//html popup
				vswppTemplate =  '<span id="vswpp-close-popup">' +
								'<img onclick="javascript:closePopup();" src="' + vswppImgClose + '" class="vswpp-close-popup" />' +
								'<span id="vswpp-contents-popup">' +
									'<span id="vswpp-background-popup" class="vswpp-popup-text" style="' + 
										'opacity : ' + vswppBackgroundOpacity / 100 + ';' +
										'background-color : ' + vswppBackgroundColor + '">' +
									'</span>' +
									'<div class="vswpp-open-popup">' +
										'<span class="vswpp-popup-text" style="' +
											'width: ' + vswppWidthPopup + '%;' +
											'height: ' + vswppHeightPopup + 'px;' +
											'border:'+ vswppBorderWidth + 'px solid ' + vswppBorderColor + '; ' +
											'border-radius:' + vswppRadius + 'px; ' +
											'background-color: ' + vswppColorPopup + ';' +
											'opacity: ' + vswppPopupOpacity / 100 + ';' +
											'color: ' + vswppTextColor + ';" ' +
											'id="vswpp-data">' + decodeURIComponent(escape(window.atob(vswppContents))) +
										'</span>' +
									'</div>' +
								'</span>' +
							'</span>';
							
				jQuery('body').append(vswppTemplate);
			//type edit	
			} else if(type == 'edit') {
				//con borde
				if(vswppBorderWidth > 0) {
					
					jQuery('#vswpp-select-border').val(1);
					jQuery('#vswpp-bd').fadeIn();
					
				}
				//con radio
				if(vswppRadius > 0) {
					
					jQuery('#vswpp-type').val(1);
					jQuery('#vswpp-radius').fadeIn();
					
				}
				//estilos
				jQuery('#vswpp-title').val(title);
				jQuery('#vswpp-background-opacity').val(vswppBackgroundOpacity);
				jQuery('#vswpp-background-opacity-value').html(vswppBackgroundOpacity / 100);
				jQuery('#vswpp-background-color').val(vswppBackgroundColor);
				jQuery('#background-hex-color').html(vswppBackgroundColor);
				jQuery('#vswpp-width').val(vswppWidthPopup);
				jQuery('#vswpp-height').val(vswppHeightPopup);
				if(vswppBorderWidth == 0) {
					jQuery('#vswpp-select-border').val(0);
					jQuery('#vswpp-border-width').val(0);
					jQuery('#vswpp-radius-popup').val(0);
					jQuery('#vswpp-type').val(0);
					jQuery('#vswpp-bd').fadeOut();
				} else {
					jQuery('#vswpp-select-border').val(1);
					jQuery('#vswpp-bd').fadeIn();
				}
				if(vswppRadius == 0) {
					jQuery('#vswpp-type').val(0);
					jQuery('#vswpp-radius-popup').val(0);
					jQuery('#vswpp-radius').fadeOut();
				} else {
					jQuery('#vswpp-type').val(1);
					jQuery('#vswpp-radius').fadeIn();
				}

				jQuery('#vswpp-border-width').val(vswppBorderWidth);
				jQuery('#vswpp-radius-popup').val(vswppRadius);
				jQuery('#vswpp-border-color').val(vswppBorderColor);
				jQuery('#border-hex-color').html(vswppBorderColor);
				jQuery('#vswpp-background-color-popup').val(vswppColorPopup);
				jQuery('#background-hex-color-popup').html(vswppColorPopup);
				jQuery('#vswpp-popup-opacity').val(vswppPopupOpacity);
				jQuery('#vswpp-popup-opacity-value').html(vswppPopupOpacity / 100);
				jQuery('#vswpp-text-color').val(vswppTextColor);
				jQuery('#text-hex-color').html(vswppTextColor);
				jQuery('#vswpp-contents').val(decodeURIComponent(escape(window.atob(vswppContents))));
				jQuery('.vswpp-help-popup').fadeIn('slow');
				jQuery(window).scrollTop(0);

			}
			
		}
		//mostrar el popup
		function vswppRecoverDataPopup(vswppArrayDataPopup, type) {
			//editar el popup
			if(type == 'edit') {

				vswppIdPopupEdit = vswppArrayDataPopup[0].split('=');
				vswppIdPopupEdit = vswppIdPopupEdit[1];
				jQuery('#vswpp-id-popup-edit').val(vswppIdPopupEdit);
			//ver el popup	
			} else if(type == 'view') {
				
				jQuery('#vswpp-id-popup-edit').val('null');
				
			}
			//estilos del popup
			vswppWidthPopup = vswppArrayDataPopup[1].split('=');
			vswppHeightPopup = vswppArrayDataPopup[2].split('=');
			vswppTextColor = vswppArrayDataPopup[3].split('=');
			vswppBorderWidth = vswppArrayDataPopup[4].split('=');
			vswppRadius = vswppArrayDataPopup[5].split('=');
			vswppBorderColor = vswppArrayDataPopup[6].split('=');
			vswppBackgroundColor = vswppArrayDataPopup[7].split('=');
			vswppColorPopup = vswppArrayDataPopup[8].split('=');
			vswppBackgroundOpacity = vswppArrayDataPopup[9].split('=');
			vswppPopupOpacity = vswppArrayDataPopup[10].split('=');
			vswppContents = vswppArrayDataPopup[11].split('=');
			vswppTitlePopup = vswppArrayDataPopup[12].split('=');
			//ver el popup
			vswppUpdatePopup(
				vswppBorderWidth[1],
				vswppBorderColor[1],
				vswppRadius[1],
				vswppWidthPopup[1],
				vswppHeightPopup[1],
				vswppColorPopup[1],
				vswppPopupOpacity[1],
				vswppTextColor[1],
				vswppContents[1],
				vswppBackgroundColor[1],
				vswppBackgroundOpacity[1],
				vswppImgClose,
				type,
				vswppTitlePopup[1]
			);
			
		}

	});
	
})(jQuery);