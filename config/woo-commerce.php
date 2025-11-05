<?php
add_action( 'after_setup_theme', 'my_wc_theme_supports' );
function my_wc_theme_supports() {
   add_theme_support( 'woocommerce', [
    'product_grid' => [ 'default_columns' => 4 ],
    'single_image_width' => 480,
  ] );
  add_theme_support( 'wc-product-gallery-zoom' );
  add_theme_support( 'wc-product-gallery-lightbox' );
  add_theme_support( 'wc-product-gallery-slider' );
}


/**
 * Assign global $product object in Timber
 */
function timber_set_product( $post ) {
  global $product;
  $product = isset( $post->product ) ? $post->product : wc_get_product( $post->ID );
}

