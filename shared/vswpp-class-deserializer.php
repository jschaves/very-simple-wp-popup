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
class VSWPP_Deserializer {
    /**
	 * Retrieves the value for the option identified by the specified key. If
	 * the option value doesn't exist, then an empty string will be returned.
	 *
	 * @param  string $option_key The key used to identify the option.
	 * @return string             The value of the option or an empty string.
	 */
    public function get_value( $option_key ) {
		global $wpdb;
		$sql = "
			SELECT option_value
			FROM {$wpdb->options}
			WHERE option_name like '" . $option_key . "'
		";
		$results = $wpdb->get_results($sql, ARRAY_A);
		foreach( $results as $value ) {
			$ouput .= '[vswppopup ' . $value['option_value'] . ']#popup#';
		}
		return trim($ouput, '#popup#');
    }
	
    public function get_filter( $id ) {
		global $wpdb;
		$sql = "
			SELECT option_value
			FROM {$wpdb->options}
			WHERE option_name = '" . $id . "'
		";
		$results = $wpdb->get_results($sql, ARRAY_A);
		return $results[0]['option_value'];
    }
}