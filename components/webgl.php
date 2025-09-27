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

    <main data-dpk="container" data-dpk-namespace="Webgl">
        <div id="canvas"></div>
        <div data-scroll-container class="bg-black">

            <section class="sy">
                <?php include('components/curtain/effect4.php') ?>
            </section>


 

            <?php include('include/footer.php') ?>



        </div>
    </main>
    <script src="dist/bundle.js"></script>
</body>

</html>