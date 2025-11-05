<?php



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    *  Remove the Back-End code editor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
 
function remove_editor_menu() {
    remove_action('admin_menu', '_add_themes_utility_last', 101);
    if (!function_exists('get_field')) {
        return;
    }
    if (!get_field('enable_comments_menu', 'option')) {
      remove_menu_page( 'edit-comments.php' );
    }
}
add_action('_admin_menu', 'remove_editor_menu', 1);


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    *  Remove unnecessary css
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
 
function remove_block_css(){
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'global-styles' );
    wp_dequeue_style( 'classic-theme-styles' );
    wp_dequeue_style( 'wpml-legacy-horizontal-list-0-css' );
    
}
add_action( 'wp_enqueue_scripts', 'remove_block_css', 100 );





/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            *  Disable Yoast's Hidden love letter  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
 
add_action( 'template_redirect', function () {
    if ( ! class_exists( 'WPSEO_Frontend' ) ) {
        return;
    }
    $instance = WPSEO_Frontend::get_instance();
    // make sure, future version of the plugin does not break our site.
    if ( ! method_exists( $instance, 'debug_mark') ) {
        return ;
    }
    remove_action( 'wpseo_head', array( $instance, 'debug_mark' ), 2 );
}, 9999 );





/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    *   Remove the detail from the wordpress errors
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function no_wordpress_errors() {
    return 'Something is wrong';
}
add_filter('login_errors', 'no_wordpress_errors');







 
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    *  Noindex Author 
    *  Adds a noindex meta tag on author archives 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function noindex_author() {
    if (is_author()) {
        echo '<meta name="robots" content="noindex" />';
    }
}
add_action('wp_head', 'noindex_author');


if ( !function_exists( 'wp_password_change_notification' ) ) {
    function wp_password_change_notification() {}
}



 
 
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               Rss Feed Related
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


if (function_exists('get_field')) {
    function disable_feeds() {
        wp_redirect( home_url(), 301 );
        die;
    }
      
      //Remove WP feeds
    add_action( 'do_feed',      'disable_feeds', -1 );
    add_action( 'do_feed_rdf',  'disable_feeds', -1 );
    add_action( 'do_feed_rss',  'disable_feeds', -1 );
    add_action( 'do_feed_rss2', 'disable_feeds', -1 );
    add_action( 'do_feed_atom', 'disable_feeds', -1 );
    
    // Disable comment feeds.
    add_action( 'do_feed_rss2_comments', 'disable_feeds', -1 );
    add_action( 'do_feed_atom_comments', 'disable_feeds', -1 );
    
    // Prevent feed links from being inserted in the <head> of the page.
    add_action( 'feed_links_show_posts_feed',    '__return_false', -1 );
    add_action( 'feed_links_show_comments_feed', '__return_false', -1 );
    remove_action( 'wp_head', 'feed_links',       2 );
    remove_action( 'wp_head', 'feed_links_extra', 3 );
}



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  Disable Emogies       
        called inside timber constructor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
 
function disable_emojicons_tinymce( $plugins ) {
    if ( is_array( $plugins ) ) {
        return array_diff( $plugins, array( 'wpemoji' ) );
    } else {
        return array();
    }
}
 
function disable_wp_emojicons() {    
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );

    // filter to remove TinyMCE emojis
    add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce' );
}





/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    Timber Page Performance
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


function console_log(array $messages, string $delimiter = ' '): string {
    $message = implode($delimiter, $messages);
    $escaped_message = esc_js($message);
    return "<script>console.log(\"{$escaped_message}\");</script>";
}

function stop_timber_timer(): string {
    $context = Timber::context();
    $pageTime = Timber\Helper::stop_timer($context['page_stats']);
    $queries  = get_num_queries();
    return console_log(["Page Generated: {$pageTime}", "DB Queries: {$queries}"], ", ");
}
 

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                LOGIN PAGE STYLE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

require('login-style.php');

add_action( 'login_enqueue_scripts', 'my_login_logo' );
add_action('wp_before_admin_bar_render', 'ec_dashboard_custom_logo');

 


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                Disable xmlrpc
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

add_filter( 'xmlrpc_enabled', '__return_false' ); 




/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         Remove <p> and <br/> from Contact Form 7
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

add_filter('wpcf7_autop_or_not', '__return_false');


 

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Disable thumbnail Cropping
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

add_filter('big_image_size_threshold', '__return_false');

 
add_filter('intermediate_image_sizes_advanced', function ($sizes) {
    return []; // no derivative sizes at all
}, 999);

 
add_filter('intermediate_image_sizes', function ($sizes) {
    return []; // ensures nothing slips through
}, 999);