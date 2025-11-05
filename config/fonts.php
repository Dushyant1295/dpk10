<?php
add_action('wp_head', function () {
    $fonts_folder = get_template_directory() . '/fonts/';
    $fonts_url = get_template_directory_uri() . '/fonts/';
    $font_files = glob($fonts_folder . '*.{ttf,woff,woff2,otf}', GLOB_BRACE);
    
    if (!empty($font_files)) {
        foreach ($font_files as $font_file) {
            $font_name = basename($font_file);
            $ext = pathinfo($font_file, PATHINFO_EXTENSION);
            $mime_type = match ($ext) {
                'woff2' => 'font/woff2',
                'woff' => 'font/woff',
                'ttf' => 'font/ttf',
                'otf' => 'font/otf',
                default => 'font/ttf',
            };
            echo '<link rel="preload" href="' . esc_url($fonts_url . $font_name) . '" as="font" type="' . esc_attr($mime_type) . '" crossorigin="anonymous">' . PHP_EOL;
        }
    }
}, 5);
