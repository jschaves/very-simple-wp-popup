<?php
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    exit();
}
?>
<div class="wrap">
    <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
	<h3 class="helpPopup" style="display:none"><?php esc_html_e( 'The popup data was inserted in the form. Make the changes and then save the form', 'very-simple-wp-popup' ); ?></h3>
    <form method="post" autocomplete="off" id="addPopup" action="<?php echo esc_html( admin_url( 'admin-post.php' ) ); ?>">
        <div id="universal-message-container">
            <h2><?php echo  esc_html_e( 'Popup Configurator', 'very-simple-wp-popup' ); ?></h2>
            <div class="options">
				<p>
					<label><?php esc_html_e( 'Title' ); ?></label>
					<br />
					<input name="title" type="text" style="width:300px" id="title" value="" maxlength="100" required />
				</p>
                <p>
                    <label><?php esc_html_e( 'Width' ); ?></label>
                    <br />
                    <input style="width:65px" id="width" type="number" name="width" min="10" max="100" value="75" required /> %
                </p>
                <p>
                    <label><?php esc_html_e( 'Height' ); ?></label>
                    <br />
                    <input style="width:65px" type="number" name="height" id="height" min="10" max="100" value="40" required /> %
                </p>
				<p>
					<label><?php esc_html_e( 'Text color' ); ?></label>
					<br />
					<input name="textColor" id="textColor" type="color" value="#09030e" /> <span id="textHexColor">#09030e</span>
				</p>
                <p>
                    <label><?php esc_html_e( 'Border' ); ?></label>
                    <br />
                    <select id="selectBorder" name="">
						<option value="0" selected><?php esc_html_e( 'No' ); ?></option>
						<option value="1"><?php esc_html_e( 'Yes' ); ?></option>
					</select>
                </p>
				<span id="bd" style="display:none">
					<p>
						<label><?php esc_html_e( 'Border Width', 'very-simple-wp-popup' ); ?></label>
						<br />
						<input style="width:65px" type="number" name="borderWidth" id="borderWidth" min="0" max="100" value="0" /> px
					</p>
					<p>
						<label><?php esc_html_e( 'Type of Border', 'very-simple-wp-popup' ); ?></label>
						<br />
						<select id="type" name="type" >
							<option value="0" selected><?php esc_html_e( 'Straight', 'very-simple-wp-popup' ); ?></option>
							<option value="1"><?php esc_html_e( 'Rounded', 'very-simple-wp-popup' ); ?></option>
						</select>
					</p>
					<p id="radius" style="display:none">
						<label><?php esc_html_e( 'Border Radio', 'very-simple-wp-popup' ); ?></label>
						<br />
						<input style="width:65px" type="number" name="radius" id="radiusPopup" min="0" max="100" value="0" /> px
					</p>
					<p>
						<label><?php esc_html_e( 'Border Color', 'very-simple-wp-popup' ); ?></label>
						<br />
						<input name="borderColor" id="borderColor" type="color" value="#838383" /> <span id="borderHexColor"></span>
					</p>
				</span>
				<p>
					<label><?php esc_html_e( 'Background color', 'very-simple-wp-popup' ); ?></label>
					<br />
					<input name="backgroundColor" id="backgroundColor" type="color" value="#c0c0c0" /> <span id="backgroundHexColor">#c0c0c0</span>
				</p>
				<p>
					<label><?php esc_html_e( 'Background color of the Popup', 'very-simple-wp-popup' ); ?></label>
					<br />
					<input name="backgroundColorPopup" id="backgroundColorPopup" type="color" value="#ffffff" /> <span id="backgroundHexColorPopup">#ffffff</span>
				</p>
				<p>
					<label><?php esc_html_e( 'Background Opacity', 'very-simple-wp-popup' ); ?></label>
					<br />
					<input name="backgroundOpacity" style="width:300px" id="backgroundOpacity" type="range" min="10" max="100" value="70" /> <?php esc_html_e( 'Opacity', 'very-simple-wp-popup' ); ?> <span id="backgroundOpacityValue">1</span>
				</p>
				<p>
					<label><?php esc_html_e( 'Opacity of the Popup Background', 'very-simple-wp-popup' ); ?></label>
					<br />
					<input name="popupOpacity" style="width:300px" id="popupOpacity" type="range" min="10" max="100" value="100" /> <?php esc_html_e( 'Opacity', 'very-simple-wp-popup' ); ?> <span id="popupOpacityValue">1</span>
				</p>
				<p>
					<label><?php esc_html_e( 'Content' ); ?></label>
					<br />
					<textarea name="contents" rows="10" style="width:300px" id="contents" cols="30" required ></textarea>
				</p>
				<input id="idpopupedit" type="hidden" name="edit" value="null" />
			</div>
		</div>
        <?php
            wp_nonce_field( 'settings-save', 'id-message' );
            submit_button( __( 'Save' ) );
        ?>
    </form>
</div>
<a id="link-data-popup" class="preview-popup" imgclose="<?php echo plugin_dir_url( __FILE__ ) . '../img/close.png'; ?>"><?php esc_html_e( 'Preview' ); ?></a>
<br />
<br />
<h3><?php esc_html_e( 'Saved Popups', 'very-simple-wp-popup' ); ?></h3>
<p><?php esc_html_e( 'Click Copy for the selected pop-up and paste it in the page where you want it to appear.',  'very-simple-wp-popup' ); ?></p>
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
				$deleteEditId = explode( '=', $idPopup[0] );
				$title = $idPopup[12];
?>
				<table CELLSPACING='0' class="ulPopup">
					<colgroup>
						<col style="width: 50%"/>
						<col style="width: 12%"/>
						<col style="width: 12%"/>
						<col style="width: 12%"/>
						<col style="width: 12%"/>
					</colgroup>
					<tr>
						<td class="previewPopup">
							[<?php echo $idPopup[0] . ' ' . $title; ?>
						</td>
						<td class="array-data-popup">
							<span class="viewPopup" id="<?php echo $deleteEditId[1]; ?>" viewPopup="<?php echo str_replace( array( '[', ']' ), array( '', '' ), $value ); ?>"></span>
							<input type="submit" class="button button-primary" value="<?php echo __( 'View' ); ?>" />
						</td>
						<td>
							<form class="formPopup" method="post" autocomplete="off" action="<?php echo esc_html( admin_url( 'admin-post.php' ) ); ?>">
								<input type="hidden" name="delete" value="<?php echo $deleteEditId[1]; ?>" />
							<?php 
								wp_nonce_field( 'settings-save', 'id-message' );
								submit_button( __( 'Delete' ) );
							?>
							</form>
						</td>
						<td>
							<input type="submit" edit="<?php echo $deleteEditId[1]; ?>" class="button button-primary edit editpopup" value="<?php _e( 'Edit' ); ?>" />
						</td>
						<td>
							<input class="copypopup" type="submit" copy="[<?php echo $idPopup[0] . ' ' . $title; ?>" class="button button-primary copy" value="<?php echo _e( 'Copy' ); ?> " />
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