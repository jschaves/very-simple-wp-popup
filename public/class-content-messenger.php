<?php
/**
 * Retrieves information from the database.
 *
 * @package Very_Simple_Wp_Popup
 */
 
/**
 * Retrieves information from the database.
 *
 * This requires the information being retrieved from the database should be
 * specified by an incoming key. If no key is specified or a value is not found
 * then an empty string will be returned.
 *
 * @package Very_Simple_Wp_Popup
 */
class Content_Messenger {
	/**
	 * A reference to the class for retrieving our option values.
	 *
	 * @access private
	 * @var    Deserializer
	 */
	private $deserializer;
	/**
	 * Initializes the class by setting a reference to the incoming deserializer.
	 *
	 * @param Deserializer $deserializer Retrieves a value from the database.
	 */
	public function __construct( $deserializer ) {
		$this->deserializer = $deserializer;
	}
    /**
     * Adds a submenu for this plugin to the 'Tools' menu.
     */
    public function init() {
        add_filter( 'the_content', array( $this, 'filterPopup' ) );
    }
	
	public function filterPopup( $content ) {
		if( preg_match_all( '/\[vswppopup ID=.* title=.*\]/', $content, $ouputs, PREG_OFFSET_CAPTURE ) ) {
			for( $a = 0; $a < count( $ouputs[0] ); $a++ ) {
				$explodeId =  explode('ID=', $ouputs[0][$a][0]);
				$explodeId =  explode(' ', $explodeId[1]);
				$filter[$a] = $ouputs[0][$a][0];
				$values[$a] = esc_attr( $this->deserializer->get_filter( 'very_simple_wp_popup_' . $explodeId[0] ) );
			}
			$control = 1;
			for( $a = 0; $a < count( $values ); $a++ ) {
				if( !empty( $values[$a] ) ) { 
					$stylePopup = explode( ',', $values[$a] );
					$id = explode( '=', $stylePopup[0] );
					$width = explode( '=', $stylePopup[1] );
					$height = explode( '=', $stylePopup[2] );
					$textColor = explode( '=', $stylePopup[3] );
					$borderWidth = explode( '=', $stylePopup[4] );
					$radius = explode( '=', $stylePopup[5] );
					$borderColor = explode( '=', $stylePopup[6] );
					$backgroundColor = explode( '=', $stylePopup[7] );
					$backgroundColorPopup = explode( '=', $stylePopup[8] );
					$backgroundOpacity = explode( '=', $stylePopup[9] );
					$popupOpacity = explode( '=', $stylePopup[10] );
					$contents = explode( '=', $stylePopup[11] );
					$title = explode( '=', $stylePopup[12] );
					
					$html[$a] = '<a class="viewPopup" ' .
									'n-popup="'  . $control . '" ' .
									'id-popup="'  . $id[1] . '" ' .
									'bc="' . $backgroundColor[1] . '" ' .
									'bo="' . $backgroundOpacity[1] / 100 . '" ' .
									'width-popup="' . $width[1] . '" ' .
									'height-popup="' . $height[1] . '" ' .
									'border-popup="' . $borderWidth[1] . '" ' .
									'border-color-popup="' . $borderColor[1] . '" ' .
									'border-radius-popup="' . $radius[1] . '" ' .
									'background-color-popup="' . $backgroundColorPopup[1] . '" ' .
									'opacity-popup="' . $popupOpacity[1] / 100 . '" ' .
									'color-popup="' . $textColor[1] . '" ' .
									'contents-popup="' . $contents[1] . '" ' .
									'title-popup="' . $title[1] . '">' . $title[1] . 
								'</a>';
					$content = str_replace( $filter[$a], $html[$a], $content );
					$control++;
				} else {
					$content = str_replace( $filter[$a], $filter[$a] . ' ' .  __( 'This popup does not exist', 'very-simple-wp-popup' ), $content );
				}
			}
			return $content;
		} else {
			return $content;
		}
	}
}