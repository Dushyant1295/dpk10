import { Curtains, Plane } from "curtainsjs";
import { isMobile } from "../../Helper";


import vSheder from "./Shaders/effect1/vertex.glsl";
import fSheder from "./Shaders/effect1/frag.glsl";


var curtains;
var waveParam;
var planeHolder;
var curtainPlane;


function createCurtain() {

  curtains = new Curtains({
    container: "canvas",
    premultipliedAlpha: true,
    production: false,
    pixelRatio: Math.min(1.5, window.devicePixelRatio),
    watchScroll: isMobile(),
  });

  waveParam = {
    vertexShader: vSheder,
    fragmentShader: fSheder,
    shareProgram: true,
    widthSegments: 20,
    heightSegments: 1,
    texturesOptions: {
      minFilter: curtains.gl.LINEAR_MIPMAP_NEAREST,
    },

    uniforms: {
      time: {
        name: "uTime",
        type: "1f",
        value: 0,
      },
    },

  };


  curtains
    .onError(function () { document.body.classList.add("no-curtains") })
    .onContextLost(() => { curtains.restoreContext() });
}



function waveEffect(index) {
  const plane = curtainPlane[index];

  plane
    .onReady(function () {
      plane.userData.mouseOver = false;

      planeHolder[index].addEventListener("mouseenter", function (e) {
        plane.userData.mouseOver = true;
      });

      planeHolder[index].addEventListener("mouseleave", function (e) {
        plane.userData.mouseOver = false;
      });

    })
    .onRender(() => {
      // use damping
      if (plane.userData.mouseOver) {
        plane.uniforms.time.value +=
          (45 - plane.uniforms.time.value) * 0.0375;
      } else {
        plane.uniforms.time.value += (0 - plane.uniforms.time.value) * 0.0375;
      }
    });
}



function createPlane() {
  curtainPlane = [];
  planeHolder = document.getElementsByClassName("curtain");

  //gives curtains obj  and waveParm
  createCurtain();



  for (let i = 0; i < planeHolder.length; i++) {

    // this will create planes and Push 
    const plane = new Plane(curtains, planeHolder[i], waveParam);
    curtainPlane.push(plane);

    // Wave Effects for each Plane
    waveEffect(i);

  }
}



function destroyPlane() {
  if (planeHolder) {
    for (let i = 0; i < planeHolder.length; i++) {
      curtainPlane[i].remove();
    }
    curtainPlane = [];
  }
}




/* Call it on Barba Views */

const curtainsView = {

  namespace: "curtain",

  afterEnter() {
    setTimeout(() => { createPlane() }, 200);
  },

  beforeLeave() {
    destroyPlane();
  },

}



export { curtains, curtainsView };