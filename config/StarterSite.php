<?php

use Timber\Site;

class StarterSite extends Site {

	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_action( 'init', 'disable_wp_emojicons' );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'init', array( $this, 'register_acf_blocks' ) );
		
        add_action( 'wp_enqueue_scripts', array( $this, 'assets' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'bs_dequeue_dashicons' ) );
		 
		if( function_exists('acf_add_options_page') ) {
            acf_add_options_sub_page('Theme');
            acf_add_options_sub_page('Analytics/Tracking');
        }


        add_filter( 'emoji_svg_url', '__return_false' );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_filter( 'timber/twig/environment/options', [ $this, 'update_twig_environment_options' ] );
    
		// Comment out to Enable oEmbed (responsible for embedding twitter etc)
		remove_action('wp_head', 'wp_oembed_add_discovery_links', 10 );
		remove_action('wp_head', 'wp_oembed_add_host_js');
		remove_action('rest_api_init', 'wp_oembed_register_route');
		remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);

		// Header Removal
		remove_action('wp_head', 'rsd_link');
		remove_action('wp_head', 'wlwmanifest_link');
		remove_action('wp_head', 'wp_generator'); // Hide WP Version for security
		remove_action('wp_head', 'wp_shortlink_wp_head');
		remove_action('wp_head', 'rest_output_link_wp_head', 10); //Remove wp-json/ link
		
		add_action('admin_head', array($this, 'fix_svg_thumb_display'));

		parent::__construct();
	}

	
	public function register_post_types() {
		// This is where you can register custom post types
	}
	 
	public function register_taxonomies() {
		// This is where you can register custom taxonomies.
	}


	function register_acf_blocks() {
        if ( ! function_exists( 'acf_register_block' ) ) {
            return;
        }     
    }


	/**
	 * This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		// $context['current_lang'] = ICL_LANGUAGE_CODE; // Wpml
		$context['foo']   = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::context();';

		$context['menu']  = Timber::get_menu();
		$context['header']  = Timber::get_menu('Header');
		$context['site']  = $this;

		if (function_exists('get_fields')) {
            $context['options'] = get_fields('option');
        }

		$context['page_stats'] = Timber\Helper::start_timer();
		return $context;
	}



	public function theme_supports() {
		add_theme_support('automatic-feed-links');
		add_theme_support('post-thumbnails');
		add_theme_support('html5', [
			'script',
			'style',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		]);
		add_theme_support('post-formats', [
			'aside',
			'image',
			'video',
			'quote',
			'link',
			'gallery',
			'audio',
		]);
		add_theme_support('menus');
	}
	

 

	/**
	 * This is where you can add your own functions to twig.
	 *
	 * @param Twig\Environment $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		/**
		 * Required when you want to use Twig’s template_from_string.
		 * @link https://twig.symfony.com/doc/3.x/functions/template_from_string.html
		 */
		// $twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		// $twig->addFilter( new Twig\TwigFilter( 'myfoo', [ $this, 'myfoo' ] ) );

		$twig->addFunction( new Twig\TwigFunction('query_cat', array($this, 'query_cat')));
		return $twig;
	}



	  /**
     * Query Cat
     * Queries passed category id's and limits results to passed limit
     *
     * This is registered as a Timber function and can be called in templates
     * with the following syntax:
     *
     *      {{ query_cat([1, 2, 3], 3) }}
     *
     * This would return posts in categories 1, 2, or 3 and limit the response
     * to 3 results.
     */
    function query_cat(
        $cats = [],
        $limit = 3,
        $post_type = 'any',
        $orderby = 'date',
        $offset = 0,
        $exclude = []
    ) {
        return Timber::get_posts(array(
            'post_type' => $post_type,
            'cat' => $cats,
            'posts_per_page' => $limit,
            'orderby' => $orderby,
            'offset' => $offset,
            'post__not_in' => $exclude
        ));
    }



	
    function fix_svg_thumb_display() {
		echo '<style> td.media-icon img[src$=".svg"], img[src$=".svg"].attachment-post-thumbnail { width: 100% !important; height: auto !important; } </style>';
		// Limits sizes of SVGs in WordPress backend
    }
  


	function assets() {
		// Get server paths and URLs for the assets
		$template_dir     = get_template_directory();
		$template_dir_uri = get_template_directory_uri();
	
		$css_file = $template_dir . '/dist/style.css';
		$js_file  = $template_dir . '/dist/bundle.js';
		$fonts_uri = $template_dir_uri . '/fonts/fonts.css';

		// $bs_ar_uri = $template_dir_uri . '/fonts/bs-ar.css';
		// $bs_en_uri = $template_dir_uri . '/fonts/bs-en.css';

	
		// Use filemtime for versioning if the file exists, otherwise fallback to a static version
		$cache_ver_css = file_exists($css_file) ? filemtime($css_file) : '1.0.0';
		$cache_ver_js  = file_exists($js_file)  ? filemtime($js_file)  : '1.0.0';
	
		// Define asset URLs
		$bundle_js_src = $template_dir_uri . '/dist/bundle.js';
		$main_css_src  = $template_dir_uri . '/dist/style.css';
	
		// Optionally deregister jQuery if it's not needed
		wp_deregister_script('jquery');
		
		// Enqueue styles and scripts with proper cache busting
		wp_enqueue_style('fonts', $fonts_uri, [], null, 'all');
		wp_enqueue_script('bundle', $bundle_js_src, [], $cache_ver_js, true);
		wp_enqueue_style('main-style', $main_css_src, [], $cache_ver_css, 'all');

		/*
		if (ICL_LANGUAGE_CODE == "ar") {
		 wp_enqueue_style('bs-ar', $bs_ar_uri, [], null, 'all');
		} else {			 
		 	wp_enqueue_style('bs-en', $bs_en_uri, [], null, 'all');
		}
		*/
		
	}
	
	
	
    function bs_dequeue_dashicons() {
		if ( ! is_user_logged_in() ) {
			wp_deregister_style( 'dashicons' );
		}
	}

	function update_twig_environment_options( $options ) {
	    return $options;
	}

}














/*
        If you want different CSS for Arabic, you can do it like this.
        It will load Arabic CSS on an Arabic website.
        Just add this one line in the Timber class inside the function add_to_context( $context ).

		$context['current_lang'] = ICL_LANGUAGE_CODE;

        And inside the function assets( $twig ), do it like this:
    
            if (ICL_LANGUAGE_CODE == "ar") {
                wp_enqueue_style( 'main.css', MAIN_CSS_SRC_AR, array(), $cache_ver, 'all' );
            } else {
                wp_enqueue_style( 'main.css', MAIN_CSS_SRC, array(), $cache_ver, 'all' );  
            }
*/ 
