<?php
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    exit();
}
?>
<div class="wrap">
	<form action="https://www.paypal.com/cgi-bin/webscr" method="post">

		<!-- Identify your business so that you can collect the payments. -->
		<input type="hidden" name="business" value="juan.cha63@gmail.com">

		<!-- Specify a Donate button. -->
		<input type="hidden" name="cmd" value="_donations">

		<!-- Specify details about the contribution -->
		<input type="hidden" name="item_name" value="Very Sinple wp Popup (wp plugin)">
		<input type="hidden" name="currency_code" value="EUR">

		<!-- Display the payment button. -->
		<input type="image" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" alt="Donate">
		<img alt="" width="1" height="1" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" >

	</form>
    <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
	<h3 class="vswpp-help-popup" style="display:none"><?php esc_html_e( 'The popup data was inserted in the form. Make the changes and then save the form', 'very-simple-wp-popup' ); ?></h3>
    <form method="post" autocomplete="off" id="vswpp-add-popup" action="<?php echo esc_html( admin_url( 'admin-post.php' ) ); ?>">
        <div id="universal-message-container">
            <h2><?php echo  esc_html_e( 'Popup Configurator', 'very-simple-wp-popup' ); ?></h2>
            <div class="options">
				<p>
					<label><?php esc_html_e( 'Title' ); ?></label>
					<br />
					<input name="title" type="text" style="width:300px" id="vswpp-title" value="" maxlength="100" required />
				</p>
                <p>
                    <label><?php esc_html_e( 'Width' ); ?></label>
                    <br />
                    <input style="width:65px" id="vswpp-width" type="number" name="width" min="10" max="100" value="75" required /> %
                </p>
                <p>
                    <label><?php esc_html_e( 'Height' ); ?></label>
                    <br />
                    <input style="width:65px" type="number" name="height" id="vswpp-height" min="10" max="100" value="40" required /> %
                </p>
				<p>
					<label><?php esc_html_e( 'Text color' ); ?></label>
					<br />
					<input name="textColor" id="vswpp-text-color" type="color" value="#09030e" /> <span id="vswpp-text-hex-color">#09030e</span>
				</p>
                <p>
                    <label><?php esc_html_e( 'Border' ); ?></label>
                    <br />
                    <select id="vswpp-select-border" name="">
						<option value="0" selected><?php esc_html_e( 'No' ); ?></option>
						<option value="1"><?php esc_html_e( 'Yes' ); ?></option>
					</select>
                </p>
				<span id="vswpp-bd" style="display:none">
					<p>
						<label><?php esc_html_e( 'Border Width', 'very-simple-wp-popup' ); ?></label>
						<br />
						<input style="width:65px" type="number" name="borderWidth" id="vswpp-border-width" min="0" max="100" value="0" /> px
					</p>
					<p>
						<label><?php esc_html_e( 'Type of Border', 'very-simple-wp-popup' ); ?></label>
						<br />
						<select id="vswpp-type" name="type" >
							<option value="0" selected><?php esc_html_e( 'Straight', 'very-simple-wp-popup' ); ?></option>
							<option value="1"><?php esc_html_e( 'Rounded', 'very-simple-wp-popup' ); ?></option>
						</select>
					</p>
					<p id="vswpp-radius" style="display:none">
						<label><?php esc_html_e( 'Border Radio', 'very-simple-wp-popup' ); ?></label>
						<br />
						<input style="width:65px" type="number" name="radius" id="vswpp-radius-popup" min="0" max="100" value="0" /> px
					</p>
					<p>
						<label><?php esc_html_e( 'Border Color', 'very-simple-wp-popup' ); ?></label>
						<br />
						<input name="borderColor" id="vswpp-border-color" type="color" value="#838383" /> <span id="vswpp-border-hex-color"></span>
					</p>
				</span>
				<p>
					<label><?php esc_html_e( 'Background color', 'very-simple-wp-popup' ); ?></label>
					<br />
					<input name="backgroundColor" id="vswpp-background-color" type="color" value="#c0c0c0" /> <span id="vswpp-background-hex-color">#c0c0c0</span>
				</p>
				<p>
					<label><?php esc_html_e( 'Background color of the Popup', 'very-simple-wp-popup' ); ?></label>
					<br />
					<input name="backgroundColorPopup" id="vswpp-background-color-popup" type="color" value="#ffffff" /> <span id="vswpp-background-hex-color-popup">#ffffff</span>
				</p>
				<p>
					<label><?php esc_html_e( 'Background Opacity', 'very-simple-wp-popup' ); ?></label>
					<br />
					<input name="backgroundOpacity" style="width:300px" id="vswpp-background-opacity" type="range" min="10" max="100" value="70" /> <?php esc_html_e( 'Opacity', 'very-simple-wp-popup' ); ?> <span id="vswpp-background-opacity-value">0.70</span>
				</p>
				<p>
					<label><?php esc_html_e( 'Opacity of the Popup Background', 'very-simple-wp-popup' ); ?></label>
					<br />
					<input name="popupOpacity" style="width:300px" id="vswpp-popup-opacity" type="range" min="10" max="100" value="100" /> <?php esc_html_e( 'Opacity', 'very-simple-wp-popup' ); ?> <span id="vswpp-popup-opacity-value">1</span>
				</p>
				<p>
					<label><?php esc_html_e( 'Content' ); ?></label>
					<br />
					<textarea name="contents" rows="10" style="width:300px" id="vswpp-contents" cols="30" required ></textarea>
				</p>
				<input id="vswpp-id-popup-edit" type="hidden" name="edit" value="null" />
				<input type="hidden" name="action" value="vswpp">
			</div>
		</div>
        <?php
            wp_nonce_field( 'settings-save', 'id-message' );
            submit_button( __( 'Save' ) );
        ?>
    </form>
</div>
<a id="vswpp-link-data-popup" class="vswpp-preview-popup" imgclose="<?php echo plugin_dir_url( __FILE__ ) . '../img/close.png'; ?>"><?php esc_html_e( 'Preview' ); ?></a>
<br />
<br />
<h3><?php esc_html_e( 'Saved Popups', 'very-simple-wp-popup' ); ?></h3>
<p><?php esc_html_e( 'Click Copy for the selected pop-up and paste it in the page where you want it to appear.',  'very-simple-wp-popup' ); ?></p>
<br />
<div id="vswpp-list-popup">
<?php 
	$values = esc_attr( $this->deserializer->get_value( 'very\_simple\_wp\_popup\_%' ) );
	if( ! empty( $values ) ) {
		$values = explode( '#popup#', $values );
		if( count( $values) > 0 ) {
			foreach( $values as $value ) {
				$idPopup = explode( '[', $value );
				$idPopup = explode( ',', $idPopup[1] );
				$deleteEditId = explode( '=', $idPopup[0] );
				$title = $idPopup[12];
?>
				<table cellspacing='0' class="vswpp-ul-popup">
					<tr>
						<td class="vswpp-preview-popup">
							[<?php echo $idPopup[0] . ' ' . $title; ?>
						</td>
						<td class="vswpp-array-data-popup">
							<span class="vswpp-view-popup" id="<?php echo $deleteEditId[1]; ?>" viewPopup="<?php echo str_replace( array( '[', ']' ), array( '', '' ), $value ); ?>"></span>
							<input type="submit" class="button button-primary" value="<?php echo __( 'View' ); ?>" />
						</td>
						<td>
						
						</td>
						<td>
							<form class="vswpp-form-popup" method="post" autocomplete="off" action="<?php echo esc_html( admin_url( 'admin-post.php' ) ); ?>">
								<input type="hidden" name="delete" value="<?php echo $deleteEditId[1]; ?>" />
								<input type="hidden" name="action" value="vswpp">
							<?php 
								wp_nonce_field( 'settings-save', 'id-message' );
								submit_button( __( 'Delete' ) );
							?>
							</form>
						</td>
						<td>
						
						</td>
						<td>
							<input type="submit" edit="<?php echo $deleteEditId[1]; ?>" class="button button-primary vswpp-edit vswpp-edit-popup" value="<?php _e( 'Edit' ); ?>" />
						</td>
						<td>
						
						</td>
						<td>
							<input class="vswpp-copy-popup" type="submit" copy="[<?php echo $idPopup[0] . ' ' . $title; ?>" class="button button-primary vswpp-copy" value="<?php echo _e( 'Copy' ); ?> " />
						</td>
					</tr>
				</table>
<?php
			}	
		} else {
			echo _e( 'Nothing saved', 'very-simple-wp-popup' );
		}
	}
?>
</div>