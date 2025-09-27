import { Curtains, Plane } from "curtainsjs";
import { isMobile } from "../../Helper";


import vSheder from "./vertex.glsl";
import fSheder from "./frag.glsl";



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

    shareProgram: true,

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

  plane
    .onRender(() => {
      plane.uniforms.time.value++
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

  namespace: "Webgl",

  afterEnter() {
    setTimeout(() => { createPlane() }, 200);
  },

  beforeLeave() {
    destroyPlane();
  },

}






/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  7.  curtains vatiable is used for update scroll
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/




export { curtains, curtainsView };