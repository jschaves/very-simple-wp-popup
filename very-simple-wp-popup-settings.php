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
include_once( plugin_dir_path( __FILE__ ) . 'shared/class-deserializer.php' );
// Include the dependencies needed to instantiate the plugin.
foreach( glob( plugin_dir_path( __FILE__ ) . 'admin/*.php' ) as $file ) {
    include_once $file;
}
add_action('plugins_loaded', 'very_simple_wp_popup_menu');
/**
 * Starts the plugin.
 *
 * @since 1.0.0
 */

// Update CSS within in Admin
function admin_style() {
	wp_enqueue_style( 'admin-styles', plugin_dir_url( __FILE__ ) . 'admin/css/style.css' );
}
add_action('admin_enqueue_scripts', 'admin_style');
// Update CSS within in public
function public_style() {
  	wp_register_style( 'vswp-popup-css', plugin_dir_url( __FILE__ ) . 'public/css/style.css' );
	wp_enqueue_style( 'vswp-popup-css' );
  
}
add_action( 'wp_enqueue_scripts', 'public_style' );
//include js footer admin
function admin_footer_js() {
	echo '<script src="' . plugin_dir_url( __FILE__ ) . 'admin/js/script.js" type="text/javascript"></script>';
}
add_action( 'in_admin_footer', 'admin_footer_js' );
//include js footer public
function add_footer_js() {
	echo '<script src="' . plugin_dir_url( __FILE__ ) . 'public/js/script.js" type="text/javascript"></script>';
}
add_action('wp_footer', 'add_footer_js');
// Include the shared and public dependencies.
include_once( plugin_dir_path( __FILE__ ) . 'shared/class-deserializer.php' );
include_once( plugin_dir_path( __FILE__ ) . 'public/class-content-messenger.php' );
//add languages 
function add_languages() {
	load_plugin_textdomain( 'very-simple-wp-popup', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'add_languages' );

//add iframe to popup
function custom_wpkses_post_tags( $tags, $context ) {
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
add_filter( 'wp_kses_allowed_html', 'custom_wpkses_post_tags', 10, 2 );

function very_simple_wp_popup_menu() {
	// Setup and initialize the class for saving our options.
    $serializer = new Serializer();
    $serializer->init();
	// Setup the class used to retrieve our option value.
	$deserializer = new Deserializer();
	// Setup the administrative functionality.
    $plugin = new Submenu( new Submenu_Page( $deserializer ) );
    $plugin->init();
	// Setup the public facing functionality.
    $public = new Content_Messenger( $deserializer );
    $public->init();
}