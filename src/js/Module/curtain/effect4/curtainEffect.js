import { Curtains, Plane } from "curtainsjs";
import { isMobile } from "../../Helper";

import gsap from "gsap/dist/gsap";

import vSheder from "./vertex.glsl";
import fSheder from "./frag.glsl";


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 1.  Initialization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var curtains;
var gsapRender;

function initCurtain() {
  curtains = new Curtains({
    container: "canvas",
    production: false,
    pixelRatio: Math.min(1.5, window.devicePixelRatio),
    watchScroll: isMobile(),
    autoRender: false,
  });

  gsapRender = curtains.render.bind(curtains);
  gsap.ticker.add(gsapRender);

  curtains
    .onError(function () {
      document.body.classList.add("no-curtains");
    })
    .onContextLost(() => {
      curtains.restoreContext();
    });
}





/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                2.  Effects 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


var effectParameter = {
  vertexShader: vSheder,
  fragmentShader: fSheder,
  // shareProgram: true,
  widthSegments: 40,
  heightSegments: 40,
  uniforms: {
    time: {
      name: "uTime",
      type: "1f",
      value: 0,
    },
    mousepos: {
      name: "uMouse",
      type: "2f",
      value: [0, 0],
    },
    resolution: {
      name: "uReso",
      type: "2f",
      value: [innerWidth, innerHeight],
    },
    progress: {
      name: "uProgress",
      type: "1f",
      value: 0,
    },
  },
};




/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        3.       Create the  Plane
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var planeElements;
var curtainPlane = [];

function createPlane() {
  initCurtain();
  planeElements = document.getElementsByClassName("plane");

  for (let i = 0; i < planeElements.length; i++) {
    const plane = new Plane(curtains, planeElements[i], effectParameter);
    curtainPlane.push(plane);
    console.log(curtainPlane[i]);
    planeEffect(i);
  }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        4.     Effects  For Your Plane
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function planeEffect(index) {
  const plane = curtainPlane[index];

  plane
    .onReady(function () {
      planeElements[index].addEventListener("mouseenter", function (e) {
        gsap.to(plane.uniforms.progress, {
          value: 1,
          duration: .6,
          ease: "power1.out",
        });
      });

      planeElements[index].addEventListener("mouseleave", function (e) {
        gsap.to(plane.uniforms.progress, {
          value: 0,
          ease: "power3.out",
        });
      });
    })

    .onRender(() => {
      plane.uniforms.time.value += 0.01;
      plane.uniforms.resolution.value = [innerWidth, innerHeight];
    });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        4.     Destroy the  Plane
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function destroyPlane() {
  if (planeElements) {
    gsap.ticker.remove(gsapRender);
    for (let i = 0; i < planeElements.length; i++) {
      curtainPlane[i].remove();
    }
    curtainPlane = [];

    curtains.dispose();
    console.log(curtains);
    console.log(gsap);
    console.log(curtainPlane);
  }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        5.         Call on Barba Views
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const curtainsView = {
  namespace: "Webgl",

  afterEnter() {
    setTimeout(() => {
      createPlane();
    }, 200);
  },

  beforeLeave() {
    destroyPlane();
  },
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  6.  curtains vatiable is used for update scroll
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export { curtains, curtainsView };
