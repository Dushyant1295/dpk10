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

  <main data-dpk="container" data-dpk-namespace="gsap-effects">
    <div data-scroll-container class="bg-black">
      <section class="pt-10 vh-100 py-5">
        <div class="container flex-center dtext3" data-dpk-call="dtext3">
          <div class="content">
            <h2 class="content__title" data-splitting>
              <span>Lucid</span>
              <span>Dreaming</span>
            </h2>
          </div>
          <?php include('include/gsapTool.php') ?>
        </div>
      </section>

      <section class="vh-75 flex-center">
        <div class="container position-relative vh-25 w-25 py-10">
          <div class="line-draw" data-dpk-call>
            <div class="line black"></div>
          </div>

          <div class="line-draw from-right" data-dpk-call>
            <div class="line black"></div>
          </div>

          <div class="line-draw from-center" data-dpk-call>
            <div class="line black"></div>
          </div>

          <div class="line-draw h" data-dpk-call>
            <div class="line black"></div>
          </div>

          <div class="line-draw h from-center" data-dpk-call>
            <div class="line black"></div>
          </div>

          <div class="line-draw h from-bottom" data-dpk-call>
            <div class="line cream"></div>
          </div>
        </div>
      </section>

      <section class="pt-10 py-5">
        <div class="container flex-center py-10">
          <div class="container" data-dpk-call="appearTitle">
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nostrum, dolorem?
            </h1>
          </div>
        </div>
      </section>

      <section class="py-10">
        <div class="container py-7">
          <div class="row dpk-hover melodrama" data-hover-class="noCursor">
            <div class="col-md-6 col-lg-4 border p-5">
              <div class="linehover-1">The Forest Night</div>
            </div>

            <div class="col-md-6 col-lg-4 border p-5">
              <div class="char-split">
                <h5>CONTACT US</h5>
              </div>
            </div>

            <div class="col-md-6 col-lg-4 border p-5">
              <a class="linehover fs-5"> The Forest Night </a>
            </div>
          </div>
        </div>
      </section>

      <section class="py-10">
        <div class="container flex-center">
          <h1 data-dpk-call="growB">
            <span>P</span>
            <span>L</span>
            <span>A</span>
            <span>Y</span>
          </h1>
        </div>
      </section>

      <section class="py-10">
        <div class="container w-50" data-dpk-call="paraR">
          <h2>This is Title</h2>

          <h6 class="py-4">this is subtitle</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
            facere magnam reiciendis, odio quae unde enim vitae voluptates
            quos, harum aliquam? Ipsam fugit tenetur sed temporibus aliquam,
            eligendi dolorum accusamus?
          </p>
        </div>
      </section>

      <section class="py-8">
        <div class="container">
          <div class="row">
            <div class="col-md-3" data-dpk-call="imgR">
              <div class="reveal">
                <img src="./img/1.jpg" />
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section class="py-5 melodrama">
        <div class="container flex-center" data-dpk-call="dtext">
          <div class="content">
            <h2 class="content__title" data-splitting>
              <span>Intentionally</span>
              <span>dramatic</span>
            </h2>
          </div>
        </div>
      </section>

      <section class="py-5 melodrama">
        <div class="container flex-center dtext2" data-dpk-call="dtext2">
          <div class="content">
            <h2 class="content__title" data-splitting>
              <span>Blooming</span>
              <span>flowers</span>
            </h2>
          </div>
        </div>
      </section>

      <section class="py-10">
        <div class="container vh-50 flex-center">
          <div class="col-6">
            <h1 data-dpk-call="appearY" data-duration="1.2" class="melodrama">
              <div><span>Hello Dpk</span></div>
              <div><span>Dark World </span></div>
            </h1>
          </div>
          <div class="col-6">
            <h1 data-dpk-call class="mezius appear-title">
              <div><span style="font-size: 2rem">Hello Dpk</span></div>
              <div><span style="font-size: 2rem">Dark World </span></div>
            </h1>
          </div>
        </div>
      </section>

      <section>
        <div class="container vh-75 flex-center">
          <h1 data-dpk-call="textScr">
            <span data-char=".">C</span>
            <span data-char="R">R</span>
            <span data-char="E">E</span>
            <span data-char=".">A</span>
            <span data-char="T">T</span>
            <span data-char=".">I</span>
            <span data-char=".">V</span>
            <span data-char="E">E</span>
          </h1>
        </div>
      </section>

      <section class="py-10">
        <div class="container">
          <ul class="box-table v2 hover_img_container">
            <li><span class="line tb"></span> Dark</li>
          </ul>
        </div>

        <div class="container pt-10">
          <ul class="box-table">
            <li>
              <span class="line tb"></span> <span class="line rl"></span>
              Hello
            </li>

            <li>
              <span class="line tb"></span> <span class="line rl"></span>
              dpk
            </li>

            <li>
              <span class="line tb"></span> <span class="line rl"></span>
              love
            </li>

            <li>
              <span class="line tb"></span> <span class="line rl"></span>
              dark
            </li>
          </ul>
        </div>
      </section>
    </div>
  </main>
  <script src="dist/bundle.js"></script>
</body>

</html>