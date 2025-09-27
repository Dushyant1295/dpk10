import { Curtains, Plane } from "curtainsjs";
import { isMobile } from "../../Helper";
import gsap from "gsap/dist/gsap";

import vSheder from "./vertex.glsl";
import fSheder from "./frag.glsl";

var curtains;
var effectParameter;
var gsapRender;
const mouse = { x: 0, y: 0 };

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 1.  Initialization
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function initCurtain() {

  curtains = new Curtains({
    container: "canvas",
    premultipliedAlpha: true,
    production: false,
    pixelRatio: Math.min(1.5, window.devicePixelRatio),
    watchScroll: true,
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

  /*   Effects  Initialization  */

  effectParameter = {
    vertexShader: vSheder,
    fragmentShader: fSheder,
    widthSegments: 40,
    heightSegments: 1,
    uniforms: {
      time: {
        name: "uTime",
        type: "1f",
        value: 0,
      },
      mousepos: {
        name: "uMouse",
        type: "2f",
        value: [mouse.x, mouse.y],
      },
      resolution: {
        name: "uReso",
        type: "2f",
        value: [innerWidth, innerHeight],
      },
    },
  };
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        3.       Create the  Plane
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var planeElements;
var curtainPlane;

function createPlane() {
  curtainPlane = [];
  planeElements = document.getElementsByClassName("plane");
  initCurtain();

  for (let i = 0; i < planeElements.length; i++) {
    const plane = new Plane(curtains, planeElements[i], effectParameter);
    curtainPlane.push(plane);
    planeEffect(i);
  }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        4.     Effects  For Your Plane
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function planeEffect(index) {
  const plane = curtainPlane[index];

  plane.onRender(() => {
    plane.uniforms.time.value++;
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
