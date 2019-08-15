<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://github.com/jschaves/
 * @since             1.0.0
 * @package           Very_Simple_Wp_Popup
 *
 * @wordpress-plugin
 * Plugin Name:       Very Simple WordPress Popup
 * Plugin URI:        https://github.com/jschaves/very-simple-wp-popup
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Juan Chaves
 * Author URI:        https://github.com/jschaves/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       very-simple-wp-popup
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if( !defined( 'WPINC' ) ) {
    exit();
}
// Include the shared dependency.
include_once( plugin_dir_path( __FILE__ ) . 'shared/vswpp-class-deserializer.php' );
// Include the dependencies needed to instantiate the plugin.
foreach( glob( plugin_dir_path( __FILE__ ) . 'admin/*.php' ) as $file ) {
    include_once $file;
}
add_action('plugins_loaded', 'very_simple_wp_popup_menu');

// Update CSS within in Admin
function vswpp_admin_style() {
	wp_enqueue_style( 'vswpp-admin-styles', plugin_dir_url( __FILE__ ) . 'admin/css/style.css' );
}
add_action('admin_enqueue_scripts', 'vswpp_admin_style');
// Register Script
function vswpp_admin_footer_js() {
	wp_register_script( 'vswpp-js', plugin_dir_url( __FILE__ ) . 'admin/js/script.js', array( 'jquery' ), '1', true );
	wp_enqueue_script( 'vswpp-js' );
}
// Hook into the 'admin_enqueue_scripts' action
add_action( 'admin_enqueue_scripts', 'vswpp_admin_footer_js' );
// Include the shared and public dependencies.
include_once( plugin_dir_path( __FILE__ ) . 'shared/vswpp-class-deserializer.php' );
include_once( plugin_dir_path( __FILE__ ) . 'public/vswpp-class-content-messenger.php' );
//add languages 
function vswpp_add_languages() {
	load_plugin_textdomain( 'very-simple-wp-popup', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'vswpp_add_languages' );
//add iframe to popup
function vswpp_custom_wpkses_post_tags( $tags, $context ) {
	if ( 'post' === $context ) {
		$tags['iframe'] = array(
			'src'             => true,
			'height'          => true,
			'width'           => true,
			'frameborder'     => true,
			'allowfullscreen' => true,
		);
	}
	return $tags;
}
add_filter( 'wp_kses_allowed_html', 'vswpp_custom_wpkses_post_tags', 10, 2 );
/**
 * Starts the plugin.
 *
 * @since 1.0.0
 */
function very_simple_wp_popup_menu() {
	// Setup and initialize the class for saving our options.
    $serializer = new VSWPP_Serializer();
    $serializer->init();
	// Setup the class used to retrieve our option value.
	$deserializer = new VSWPP_Deserializer();
	// Setup the administrative functionality.
    $plugin = new VSWPP_Submenu( new VSWPP_Submenu_Page( $deserializer ) );
    $plugin->init();
	// Setup the public facing functionality.
    $public = new VSWPP_Content_Messenger( $deserializer );
    $public->init();
}