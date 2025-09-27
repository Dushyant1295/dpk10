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

    <main data-dpk="container" data-dpk-namespace="Horizontal">
        <div data-scroll-container data-horizontal="true" class="bg-white">
            <section data-scroll-section class="h-section bg-white vw-100">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 vh-25"></div>

                        <div class="col-md-7">
                            <div class="work-slider">
                                <div class="swiper">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                            <div class="swiper-image" data-swiper-parallax="50%">
                                                <img class="img-fluid" src="./img/1.jpg" />
                                            </div>
                                        </div>

                                        <div class="swiper-slide">
                                            <div class="swiper-image" data-swiper-parallax="50%">
                                                <img class="img-fluid" src="./img/2.jpg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section data-scroll-section class="h-section bg-white">
                <div class="i-content-1">
                    <div class="container playfair">
                        <div class="row vw-100">
                            <div class="col-md-7 text-end">
                                <br /><br /><br />
                                <h1>Amber Velleta Londan</h1>

                                <div class="boxx">Discover</div>

                                <img src="./img/3.jpg" alt="" class="h-img img-1" />
                            </div>

                            <div class="col-md-3">
                                <img src="./img/4.jpg" alt="" class="img-fluid" />
                            </div>

                            <div class="col-md-2">
                                <br /><br /><br />
                                <br /><br /><br />
                                <img src="./img/5.jpg" alt="" class="img-fluid my-auto" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="i-content pt-5">
                    <div class="container vw-100">
                        <div class="year">© 2021</div>
                        <div class="row">
                            <div class="col-md-1">
                                <h6 class="mac text-orange">01</h6>
                            </div>

                            <div class="col-md-5 text-center playfair">
                                <h1 class="fw-bold fsh-10">AP Studios</h1>

                                <p>Artist</p>

                                <img src="./img/6.jpg" alt="" class="h-img pb-4 img-1" />
                                <p class="fsh-2 roboto w-50 mx-auto">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>

                                <h2 class="playfair fsh-4">Jelly Eyes</h2>
                            </div>

                            <div class="col-md-6 text-center playfair">
                                <img src="./img/2.jpg" alt="" class="h-img img-2 pb-4" />
                                <p class="fsh-2 roboto w-50 mx-auto">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section data-scroll-section class="h-section bg-black-gray">
                <div class="h-content">
                    <div class="container vw-100">
                        <div class="row">
                            <div class="col-md-6">
                                <h1 class="mezius">Digital marketing</h1>
                                <h1 class="mezius">Digital marketing</h1>

                                <p class="pr-3">
                                    We have our team specializing in marketing your business and
                                    ensuring your consistent growth in the digital market by
                                    implementing an omnichannel digital marketing strategy.
                                </p>
                            </div>
                            <div class="col-md-6 pl-md-5">
                                <img class="h-img" src="img/3.jpg" alt="" />
                            </div>
                        </div>
                    </div>

                    <div class="container vw-100">
                        <div class="row">
                            <div class="col-md-6">
                                <h1 class="mezius">Digital marketing</h1>
                                <h1 class="mezius">Digital marketing</h1>

                                <p class="pr-3">
                                    We have our team specializing in marketing your business and
                                    ensuring your consistent growth in the digital market by
                                    implementing an omnichannel digital marketing strategy.
                                </p>
                            </div>
                            <div class="col-md-6 pl-md-5">
                                <img class="h-img" src="img/1.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Scale img With Scroll -->

            <section data-scroll-section class="h-section bg-white">
                <div class="scale-content">
                    <div class="img-d">
                        <img src="img/5.jpg" data-scroll class="h-img" />
                    </div>

                    <div class="img-d ms-5">
                        <img src="img/5.jpg" data-scroll class="h-img" />
                        <h2>Title</h2>
                    </div>
                </div>
            </section>

            <!-- Scale Content With Scroll -->

            <section data-scroll-section class="h-section bg-black">
                <div class="gallery">
                    <figure class="gallery_container">
                        <div class="gallery_img_container" data-scroll>
                            <img src="./img/1.jpg" class="h-img" />
                        </div>
                    </figure>

                    <figure class="gallery_container">
                        <div class="gallery_img_container" data-scroll>
                            <img src="./img/2.jpg" class="h-img" />
                        </div>
                    </figure>

                    <figure class="gallery_container">
                        <div class="gallery_img_container" data-scroll>
                            <img src="./img/3.jpg" class="h-img" />
                        </div>
                    </figure>
                </div>
            </section>
        </div>
    </main>

    <script src="dist/bundle.js"></script>
</body>

</html>