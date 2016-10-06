<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

<?php
	if ( ! function_exists( '_wp_render_title_tag' ) ) :
	    function theme_slug_render_title() {
			?>
			<title><?php wp_title( ' ', true, 'right' ); ?></title>
			<?php
		}
		add_action( 'wp_head', 'theme_slug_render_title' );
	endif;
?>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="shortcut icon" type="image/x-icon" href="<?php echo get_theme_mod_not_empty('favicon', TEMPPATH.'/images/favicon.png');?>" />

<!--[if lt IE 9]>
  <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<?php
$classes='';

if(get_theme_mod('enable_preloader', false)){
	$classes = 'preloader';
}

if ( is_singular() ){
	wp_enqueue_script( "comment-reply" );
}

get_template_part('customize/header');
if (!current_user_can('add_users')){
	wp_deregister_script( 'admin-bar' );
	wp_deregister_style( 'admin-bar' );
	remove_action('wp_footer','wp_admin_bar_render',1000);
	remove_action('wp_head', '_admin_bar_bump_cb');
	?>
	<style>
		body.admin-bar header#ABdev_main_header.transparent {
			top: 0px !important;
		}
		body.admin-bar header#ABdev_main_header.smaller {
			top: 0px;
		}
	</style>
	<?php
}

wp_head();

?>
</head>

<body <?php body_class($classes); ?>>
<?php
	echo (get_theme_mod('boxed_body', false)) ? '<div class="boxed_body_wrapper">' : '';

	$header_layout = 'default';
	$header_layout = (is_page_template('page-coming-soon.php')) ? 'coming_soon' : $header_layout;
	get_template_part('partials/header_layout_'.$header_layout);
?>
<div class="ynsi-container-wrapper">
