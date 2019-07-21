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
var borderWidth2;

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
					
					borderWidth = 'border:' + jQuery('#borderWidth').val() + 'px solid ' + jQuery('#borderColor').val() + ';';
			
				} else {
					
					borderWidth = '';
					
				}
				
				if(jQuery('#type').val() == 1) {
					
					radius = 'border-radius:' + jQuery('#radiusPopup').val() + 'px;';
					
				} else {
					
					radius = '';
					
				}
				
				contents = window.btoa(unescape(encodeURIComponent(jQuery('#contents').val())));
				backgroundOpacity = jQuery('#backgroundOpacity').val() / 100;
				backgroundColor = jQuery('#backgroundColor').val();
				
				updatePopup(
					borderWidth,
					radius,
					widthPopup,
					heightPopup,
					colorPopup,
					popupOpacity,
					textColor,
					contents,
					backgroundColor,
					backgroundOpacity
				);
				
				jQuery('#data').addClass('show');
				
			}
			
		});
		
		jQuery('#backgroundPopup').click(function() {
			
				jQuery('#data').removeClass('show');
				jQuery('.popuptext').fadeOut();
		
		});
		
		jQuery('.previewPopup').on('click', function() {
			
			idPopup = jQuery(this).find('span').attr('viewPopup');
			arrayDataPopup = idPopup.split(',');
			widthPopup = arrayDataPopup[1].split('=');
			heightPopup = arrayDataPopup[2].split('=');
			heightPopup = parseInt($(window).height()) * parseInt(heightPopup[1]) / 100;
			textColor = arrayDataPopup[3].split('=');
			borderWidth2 = arrayDataPopup[4].split('=');
			radius = arrayDataPopup[5].split('=');
			borderColor = arrayDataPopup[6].split('=');
			backgroundColor = arrayDataPopup[7].split('=');
			colorPopup = arrayDataPopup[8].split('=');
			backgroundOpacity = arrayDataPopup[9].split('=');
			backgroundOpacity = backgroundOpacity[1] / 100;
			popupOpacity = arrayDataPopup[10].split('=');
			popupOpacity = popupOpacity[1] / 100;
			contents = arrayDataPopup[11].split('=');
			borderWidth = 'border:' + borderWidth2[1] + 'px solid ' + borderColor[1] + ';';
			radius = 'border-radius:' + radius[1] + 'px;';
			
			updatePopup(
				borderWidth,
				radius,
				widthPopup[1],
				heightPopup,
				colorPopup[1],
				popupOpacity,
				textColor[1],
				contents[1],
				backgroundColor[1],
				backgroundOpacity
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
			radius,
			widthPopup,
			heightPopup,
			colorPopup,
			popupOpacity,
			textColor,
			contents,
			backgroundColor,
			backgroundOpacity
		) {
			
			contents = (decodeURIComponent(escape(window.atob(contents))));
			console.log(contents);
			jQuery('#data').attr('style', 
				borderWidth + 
				radius + 
				'width:' + widthPopup + 
				'%;height:' + heightPopup + 
				'px; background-color:' + colorPopup + 
				'; opacity:' + popupOpacity + 
				'; color: ' + textColor
			).fadeIn('slow').html(contents);
			
			jQuery('#backgroundPopup').attr('style', 
				'background-color:' + backgroundColor + 
				'; opacity:' + backgroundOpacity + 
				'; z-index: 9999'
			).fadeIn('slow');
			
		}

	});
	
})(jQuery);