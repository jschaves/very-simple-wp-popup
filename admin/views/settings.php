<?php
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    exit();
}
?>
<div class="wrap">
    <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
    <form method="post" autocomplete="off" action="<?php echo esc_html( admin_url( 'admin-post.php' ) ); ?>">
        <div id="universal-message-container">
            <h2><?php echo  _e( 'Popup Configurator', 'very-simple-wp-popup' ); ?></h2>
            <div class="options">
				<p>
					<label><?php _e( 'Title' ); ?></label>
					<br />
					<input name="title" type="text" style="width:300px" id="title" value="" maxlength="100" required />
				</p>
                <p>
                    <label><?php _e( 'Width' ); ?></label>
                    <br />
                    <input style="width:65px" id="width" type="number" name="width" min="10" max="100" value="75" required /> %
                </p>
                <p>
                    <label><?php _e( 'Height' ); ?></label>
                    <br />
                    <input style="width:65px" type="number" name="height" id="height" min="10" max="100" value="40" required /> %
                </p>
				<p>
					<label><?php _e( 'Text color' ); ?></label>
					<br />
					<input name="textColor" id="textColor" type="color" value="#09030e" /> <span id="textHexColor">#09030e</span>
				</p>
                <p>
                    <label><?php _e( 'Border' ); ?></label>
                    <br />
                    <select id="selectBorder" name="">
						<option value="0" selected><?php _e( 'No' ); ?></option>
						<option value="1"><?php _e( 'Yes' ); ?></option>
					</select>
                </p>
				<span id="bd" style="display:none">
					<p>
						<label><?php echo  _e( 'Border Width', 'very-simple-wp-popup' ); ?></label>
						<br />
						<input style="width:65px" type="number" name="borderWidth" id="borderWidth" min="0" max="100" value="1" /> px
					</p>
					<p>
						<label><?php echo  _e( 'Type of Border', 'very-simple-wp-popup' ); ?></label>
						<br />
						<select id="type" name="type" required>
							<option value="0" selected><?php _e( 'Straight', 'very-simple-wp-popup' ); ?></option>
							<option value="1"><?php _e( 'Rounded', 'very-simple-wp-popup' ); ?></option>
						</select>
					</p>
					<p id="radius" style="display:none">
						<label><?php _e( 'Border Radio', 'very-simple-wp-popup' ); ?></label>
						<br />
						<input style="width:65px" type="number" name="radius" id="radiusPopup" min="0" max="100" value="5" /> px
					</p>
					<p>
						<label><?php _e( 'Border Color', 'very-simple-wp-popup' ); ?></label>
						<br />
						<input name="borderColor" id="borderColor" type="color" value="#838383" /> <span id="borderHexColor">#838383</span>
					</p>
				</span>
				<p>
					<label><?php _e( 'Background color', 'very-simple-wp-popup' ); ?></label>
					<br />
					<input name="backgroundColor" id="backgroundColor" type="color" value="#c0c0c0" /> <span id="backgroundHexColor">#c0c0c0</span>
				</p>
				<p>
					<label><?php _e( 'Background color of the Popup', 'very-simple-wp-popup' ); ?></label>
					<br />
					<input name="backgroundColorPopup" id="backgroundColorPopup" type="color" value="#ffffff" /> <span id="backgroundHexColorPopup">#ffffff</span>
				</p>
				<p>
					<label><?php _e( 'Background Opacity', 'very-simple-wp-popup' ); ?></label>
					<br />
					<input name="backgroundOpacity" style="width:300px" id="backgroundOpacity" type="range" min="10" max="100" value="70" /> <?php _e( 'Opacity', 'very-simple-wp-popup' ); ?> <span id="backgroundHexColorOpacity">1</span>
				</p>
				<p>
					<label><?php _e( 'Opacity of the Popup Background', 'very-simple-wp-popup' ); ?></label>
					<br />
					<input name="popupOpacity" style="width:300px" id="popupOpacity" type="range" min="10" max="100" value="100" /> <?php _e( 'Opacity', 'very-simple-wp-popup' ); ?> <span id="popupHexColorOpacity">1</span>
				</p>
				<p>
					<label><?php _e( 'Content' ); ?></label>
					<br />
					<textarea name="contents" rows="10" style="width:300px" id="contents" cols="30" required ></textarea>
				</p>
			</div>
		</div>
        <?php
            wp_nonce_field( 'settings-save', 'id-message' );
            submit_button( __( 'Save' ) );
        ?>
    </form>
</div>
<span id="backgroundPopup" class="popuptext" style="display:none"><img src="<?php echo plugin_dir_url( __FILE__ ); ?>../img/close.png" class="close" /></span>
<br />
<a class="preview-popup"><?php _e( 'Preview' ); ?></a>
<div class="openPopup">
	<span class="popuptext" style="display:none" id="data"></span>
</div>
<br />
<br />
<h3><?php _e( 'Saved Popups', 'very-simple-wp-popup' ); ?></h3>
<p><?php _e( 'Click Copy for the selected pop-up and paste it in the page where you want it to appear.',  'very-simple-wp-popup' ); ?></p>
<br />
<div id="listPopup">
<?php 
	$values = esc_attr( $this->deserializer->get_value( 'very\_simple\_wp\_popup\_%' ) );
	if( ! empty( $values ) ) {
		$values = explode( '#popup#', $values );
		if( count( $values) > 0 ) {
			foreach( $values as $value ) {
				$idPopup = explode( '[', $value );
				$idPopup = explode( ',', $idPopup[1] );
				$deleteId = explode( '=', $idPopup[0] );
				$title = $idPopup[12];
?>
				<ul class="ulPopup">	
					<li class="previewPopup">
						[<?php echo $idPopup[0] . ' ' . $title; ?>&nbsp;&nbsp;&nbsp;
						<span class="viewPopup" viewPopup="<?php echo str_replace( array( '[', ']' ), array( '', '' ), $value ); ?>"></span>
						<input type="submit" class="button button-primary" value="<?php echo __( 'View' ); ?>" />
					</li>
					<li>
						<form class="formPopup" method="post" autocomplete="off" action="<?php echo esc_html( admin_url( 'admin-post.php' ) ); ?>">
							<input type="hidden" name="delete" value="<?php echo $deleteId[1]; ?>" />&nbsp;&nbsp;&nbsp;
						<?php 
							wp_nonce_field( 'settings-save', 'id-message' );
							submit_button( __( 'Remove' ) );
						?>
						</form>
					</li>
					<li>
						&nbsp;&nbsp;&nbsp;<input type="submit" copy="[<?php echo $idPopup[0] . ' ' . $title; ?>" class="button button-primary copy" value="<?php echo __( 'Copy' ); ?>" />
					</li>
				</ul>
<?php
			}	
		} else {
			echo   __( 'Nothing saved', 'very-simple-wp-popup' );
		}
	}
?>
</div>