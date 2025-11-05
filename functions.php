<?php


require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config/StarterSite.php';


Timber\Timber::init();
Timber::$dirname = [ 'templates','views'];
new StarterSite();


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Select Build Tool - Uncomment one:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
 
require_once __DIR__ . '/config/vite.php';       

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                Default Settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/   

require_once __DIR__ . '/config/fonts.php';
require_once __DIR__ . '/config/default-settings.php';
























/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            - Woocommerce setup
    Note: Currently, the 'woocommerce' folder in the theme 
    is empty. We need to grab the entire folder from the plugins
    and paste it inside the theme.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

require('config/woo-commerce.php');

*/
