import { Curtains, Plane } from "curtainsjs";
import { isMobile, lerp } from "../../Helper";


import vSheder from "./vertex.glsl";
import fSheder from "./frag.glsl";



let mouse = {
  x: 0,
  y: 0
};




var curtains;
var effectParameter;


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
    watchScroll: isMobile(),
  });


  curtains
    .onError(function () { document.body.classList.add("no-curtains") })
    .onContextLost(() => { curtains.restoreContext() });





  /*   Effects  Initialization  */

  effectParameter = {
    vertexShader: vSheder,
    fragmentShader: fSheder,

    widthSegments: 40,
    heightSegments: 40, // we now have 40*40*6 = 9600 vertices !

    // shareProgram: true,

    uniforms: {
      time: {
        name: "uTime", // uniform name that will be passed to our shaders
        type: "1f", // this means our uniform is a float
        value: 0
      },
      mousepos: {
        name: "uMouse",
        type: "2f",
        value: [0, 0]
      },
      resolution: {
        name: "uReso",
        type: "2f",
        value: [innerWidth, innerHeight]
      },
      progress: {
        name: "uProgress",
        type: "1f",
        value: 0
      }
    }

  };

}









/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        2.      Create the  Plane
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
        3.     Effects  For Your Plane
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


function planeEffect(index) {
  const plane = curtainPlane[index];
  const section = document.querySelector(".plane.w-50")

  section.addEventListener("mousemove", ev => {
    mouse.x = ev.clientX
    mouse.y = ev.clientY
  });

  plane
    .onRender(() => {

      plane.uniforms.time.value += 0.05; // update our time uniform value

      plane.uniforms.mousepos.value[0] = lerp(
        mouse.x,
        plane.uniforms.mousepos.value[0],
        0.1
      );
      plane.uniforms.mousepos.value[1] = lerp(
        mouse.y,
        plane.uniforms.mousepos.value[1],
        0.05
      );
    });






}








/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        4.     Destroy the  Plane
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



function destroyPlane() {
  if (planeElements) {
    for (let i = 0; i < planeElements.length; i++) {
      curtainPlane[i].remove();
    }
    curtainPlane = [];
  }
}








/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        6.         Call on Barba Views
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/




const curtainsView = {

  namespace: "curtain",

  afterEnter() {
    setTimeout(() => { createPlane() }, 300);
  },

  beforeLeave() {
    destroyPlane();
  },

}






/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  7.  curtains vatiable is used for update scroll
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/




export { curtains, curtainsView };