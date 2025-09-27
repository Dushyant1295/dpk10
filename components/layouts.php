<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dpk</title>
    <link rel="icon" type="image/png" sizes="64x64" href="img/fav.png" />
    <link rel="stylesheet" href="dist/style.css" />
</head>

<body data-dpk="wrapper">
    <?php include('include/transition.php') ?>
    <?php include('include/header.php') ?>
    <?php include('include/header-mob.php') ?>

    <main data-dpk="container" data-dpk-namespace="Layout">
        <div data-scroll-container class="bg-black">
          
            <section class="bg-black p-top sb">
                <?php include('./components/layouts/digonal-layout.php'); ?>
            </section>

            <?php include('./components/font-page.php'); ?>


            <section class="bg-black sy">
                <?php include('./components/layouts/ellips.php'); ?>
            </section>

            <section class="bg-black sy">
                <?php include('./components/layouts/hover-slider.php'); ?>
            </section>

            <section class="bg-black py-10">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 slider" data-slides="2">
                            <div class="swiper pb-5">
                                <div class="swiper-wrapper pb-5">
                                    <div class="swiper-slide">
                                        <p class="px-4">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing
                                            elit. Dicta facilis iure assumenda recusandae pariatur
                                            ipsum, maiores sapiente architecto reprehenderit
                                            obcaecati.
                                        </p>
                                    </div>

                                    <div class="swiper-slide">
                                        <p class="px-4">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing
                                            elit. Dicta facilis iure assumenda recusandae pariatur
                                            ipsum, maiores sapiente architecto reprehenderit
                                            obcaecati.
                                        </p>
                                    </div>

                                    <div class="swiper-slide">
                                        <p class="px-4">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing
                                            elit. Dicta facilis iure assumenda recusandae pariatur
                                            ipsum, maiores sapiente architecto reprehenderit
                                            obcaecati.
                                        </p>
                                    </div>
                                </div>
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>

    <script src="dist/bundle.js"></script>
</body>

</html>