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

    <main data-dpk="container" data-dpk-namespace="BTN">
        <div data-scroll-container class="bg-black">
            <section>
                <div class="container py-10">
                    <ul class="box-table">
                        <li title="btn-square">
                            <a class="btn btn-square">
                                <span>btn-square</span>
                                <span aria-visibility="hidden">btn-square</span>
                            </a>
                        </li>

                        <li class="bg-white">
                            <a href="#" class="btn btn-square-2">
                                <span> DARK KNIGHT </span>
                                <span> DARK KNIGHT </span>
                            </a>
                        </li>

                        <li class="bg-black">
                            <a class="btn btn-square-1">
                                <span class="text">project</span>
                                <span class="icon"></span>
                            </a>
                        </li>

                        <li class="bg-black">
                            <button class="btn-1 btn-circle-1">
                                <svg aria-hidden="true" class="progress" width="70" height="70" viewbox="0 0 70 70">
                                    <path class="progress__circle"
                                        d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" />
                                    <path class="progress__path"
                                        d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"
                                        pathLength="1" />
                                </svg>
                                <span>Go</span>
                            </button>
                        </li>

                        <li title="btn-circle">
                            <a href="#" class="btn-circle">
                                <svg height="1.5rem" width="1.5rem" fill="#fff">
                                    <use xlink:href="img/icon.svg#behance" />
                                </svg>
                            </a>
                        </li>

                        <li title="btn-wave">
                            <a href="#" class="btn btn-wave">
                                <span>Learn more</span>
                                <svg width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
                                    <path
                                        d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0">
                                    </path>
                                </svg>
                            </a>
                        </li>

                        <li class="bg-black">
                            <a class="btn btn-artist">
                                <span class="button-text"> Artist</span>
                                <span class="button-arrow"> → </span>
                                <span class="button-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90"
                                        style="background-color: transparent">
                                        <g id="Ellipse_1" data-name="Ellipse 1">
                                            <circle class="red" cx="43" cy="43" r="40" stroke="#666" stroke-width="1"
                                                fill="none" />
                                            <circle class="gray path" cx="43" cy="43" r="40" stroke="#fff"
                                                stroke-width="2" fill="none" />
                                        </g>
                                    </svg>
                                </span>
                            </a>
                        </li>

                        <li class="bg-white">
                            <button class="btn-1 btn-circle-2">
                                <span><span>Add</span></span>
                            </button>
                        </li>

                        <li class="bg-white">
                            <a class="btn-1 btn-text-circle">
                                <svg class="textcircle" viewBox="0 0 500 500">
                                    <title>Projects & client work 2020</title>
                                    <defs>
                                        <path id="textcircle" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z" />
                                    </defs>
                                    <text>
                                        <textPath xlink:href="#textcircle" aria-label="Projects & client work 2020"
                                            textLength="900">
                                            Projects &amp; client work 2020
                                        </textPath>
                                    </text>
                                </svg>
                                <svg class="eye" height="1.5rem" width="1.5rem" fill="#000">
                                    <use xlink:href="img/icon.svg#behance" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </main>
    <script src="dist/bundle.js"></script>
</body>

</html>