import { Curtains, Plane } from "curtainsjs";
import { isMobile } from "../../Helper";
import gsap from "gsap/dist/gsap";

import vSheder from "./vertex.glsl";
import fSheder from "./frag.glsl";



var curtains;
var effectParameter;
var gsapRender;


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                 1.  Initialization
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


function initCurtain() {

  /*   Curtain Variable Initialization  */

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
    .onError(function () { document.body.classList.add("no-curtains") })
    .onContextLost(() => { curtains.restoreContext() });





  /*   Effects  Initialization  */

  effectParameter = {
    vertexShader: vSheder,
    fragmentShader: fSheder,
    shareProgram: true,
    widthSegments: 20,
    heightSegments: 1,
    texturesOptions: { minFilter: curtains.gl.LINEAR_MIPMAP_NEAREST },

    uniforms: {
      time: {
        name: "uTime", // uniform name  passed to our shaders
        type: "1f",    //Float
        value: 0,
      }
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

  plane
    .onReady(function () {
      plane.userData.mouseOver = false;

      planeElements[index].addEventListener("mouseenter", () => {
        plane.userData.mouseOver = true;
      });

      planeElements[index].addEventListener("mouseleave", () => {
        plane.userData.mouseOver = false;
      });

    })
    .onRender(() => {

      if (plane.userData.mouseOver) {
        plane.uniforms.time.value += (45 - plane.uniforms.time.value) * 0.0375;
      } else {
        plane.uniforms.time.value += (0 - plane.uniforms.time.value) * 0.0375;
      }
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
    setTimeout(() => { createPlane() }, 200);
  },

  beforeLeave() {
    destroyPlane();
  },

}






/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  6.  curtains vatiable is used for update scroll
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/




export { curtains, curtainsView };