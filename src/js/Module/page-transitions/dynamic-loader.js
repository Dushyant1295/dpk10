import "./dynamic-loader.scss";

import gsap from "gsap";

const imagesLoaded = require("imagesloaded");
 

function showLoading(container) {
  const dynamicLoad = document.getElementById("dynamicLoad");
  const dynamicProgress = dynamicLoad.querySelector(".progress");
  const dynamicBar = dynamicLoad.querySelector(".bar");
  let loadedCount = 0;
  let loadingProgress = 0;

  // gsap.set(container, { alpha: 0 });

  gsap.to(dynamicProgress, {
    duration: 0.5,
    width: "100%",
    ease: "expo.inOut",
  });

  let imgLoad = imagesLoaded(container, { background: true });

  if (imgLoad.images.length == 0) {
    dynamicBar.style.width = "100%";
    doneLoading();
  }

  imgLoad.on("progress", function (instance, image) {
    var imagesToLoad = instance.images.length;
    loadProgress(imagesToLoad);
  });

  function loadProgress(imagesToLoad) {
    loadedCount++;
    loadingProgress = (loadedCount / imagesToLoad) * 100;
    dynamicBar.style.width = loadingProgress + "%";

    if (loadingProgress == 100) {
      doneLoading();
    }
  }

  function doneLoading() {
    setTimeout(function () {
      hideLoading();
    }, 500);
  }

  function hideLoading() {
    setTimeout(function () {
      gsap.set(dynamicProgress, { css: { right: "0", left: "auto" } });
      gsap.to(dynamicProgress, {
        duration: 0.5,
        alpha: 1,
        width: "0",
        ease: "expo.inOut",
        onComplete: resetLeft(),
      });
    }, 100);

    // gsap.to(container, { duration: 0.5, alpha: 1 });

    function resetLeft() {
      setTimeout(function () {
        gsap.set(dynamicProgress, { css: { left: "0", right: "auto" } });
        gsap.set(dynamicBar, { css: { width: "0" } });
      }, 450);
    }
  }
}
 
export { showLoading };

 

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                          HTML
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         <div id="dynamicLoad">
              <div class="progress">
                <div class="bar"></div>
              </div>
          </div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
                            JS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 

      // inside BARBA

          beforeEnter({ next }) {
             showLoading(next.container);
          },

         
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
