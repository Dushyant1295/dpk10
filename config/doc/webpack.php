<?php

if ( ! defined( 'ABSPATH' ) ) exit;

define('IS_WEBPACK_DEVELOPMENT', true);
define('WEBPACK_DEV_SERVER', 'http://localhost:8080');
define('WEBPACK_ENTRY_POINT', '/bundle.js');

function is_webpack_dev_server_running() {
    if (!IS_WEBPACK_DEVELOPMENT) return false;
    
    $context = stream_context_create(['http' => ['timeout' => 1, 'ignore_errors' => true]]);
    return @file_get_contents(WEBPACK_DEV_SERVER . WEBPACK_ENTRY_POINT, false, $context) !== false;
}

add_action('wp_enqueue_scripts', function() {
    if (IS_WEBPACK_DEVELOPMENT && is_webpack_dev_server_running()) {
        wp_enqueue_script('webpack-hmr', WEBPACK_DEV_SERVER . WEBPACK_ENTRY_POINT, [], null, true);
    }
});

if (IS_WEBPACK_DEVELOPMENT && is_webpack_dev_server_running()) {
    add_action('wp_head', function() {
        echo '<script>if (typeof module !== "undefined" && module.hot) { module.hot.accept(); }</script>' . "\n";
    });
    
    add_action('wp_footer', function() {
        if (current_user_can('administrator')) {
            echo '<div style="position: fixed; bottom: 10px; right: 10px; background: #28a745; color: white; padding: 5px 10px; border-radius: 3px; font-size: 12px; z-index: 9999;">Webpack HMR</div>';
        }
    });
}
