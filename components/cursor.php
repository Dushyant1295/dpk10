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
    <?php include('include/menu-1.php') ?>

    <main data-dpk="container" data-dpk-namespace="Cursor">
        <div data-scroll-container class="bg-black">
            <section>
                <div class="container py-5">
                    <h1 class="mt-8 mb-5 mezius text-center">DPK CURSOR</h1>

                    <ul class="box-table">
                        <li class="bg-white-3">
                            <div class="b-larg" data-hover-class="noCursor" data-hover-magnet>
                                <button class="btn-1 btn-circle-2">
                                    <span><span>Add</span></span>
                                </button>
                            </div>
                        </li>

                        <li data-hover-class="emogy" data-hover-text="😑">
                            data-hover-class="emogy" <br />
                            data-hover-text="😑"
                        </li>

                        <li data-hover-text="inside">data-hover-text="inside"</li>

                        <li data-hover-class="hover-bg" data-hover-text="😑">
                            data-hover-class="hover-bg"
                        </li>

                        <li data-hover-class="noCursor">data-hover-class="noCursor"</li>

                        <li data-hover-class="mixBlend">data-hover-class="mixBlend"</li>

                        <li data-hover-img="./img/1.jpg" data-hover-class="hover-img">
                            data-hover-img="./img/1.jpg" <br />
                            data-hover-class="hover-img"
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </main>

    <script src="dist/bundle.js"></script>
</body>

</html>