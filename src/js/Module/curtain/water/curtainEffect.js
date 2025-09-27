import { isMobile } from "../../Helper";
import gsap from "gsap/dist/gsap";


import { Curtains, Plane } from "curtainsjs";

import vSheder from "./vertex.glsl";
import fSheder from "./frag.glsl";


import vSheder1 from "./vertex1.glsl";
import fSheder1 from "./frag1.glsl";

import * as dat from 'dat.gui';
 
 
 




 
class Ripples {

  constructor({
      callback = null,
      curtains = null,
      container = null,

      viscosity = 2,
      speed = 3.5,
      size = 1,

      // debug
      gui = null,
      guiParams = null,
  } = {}) {

      if(!curtains) return;

      this.curtains = curtains;

      this.params = {
          container: this.curtains.container,
          callback: callback,

          viscosity: viscosity,
          speed: speed,
          size: size,

          gui: gui,
          guiParams: guiParams,
      };

      this.mouse = {
          current: {
              x: 0,
              y: 0,
          },
          last: {
              x: 0,
              y: 0,
          },
          velocity: {
              x: 0,
              y: 0,
          },
      };

      this.debug();

      this.init();
  }

  debug() {
      if(this.params.gui && this.params.guiParams) {

          this.params.guiParams.viscosity = this.params.viscosity;
          this.params.guiParams.speed = this.params.speed;
          this.params.guiParams.size = this.params.size;

          this.ripplesGui = this.params.gui.addFolder('Render targets');
          this.ripplesGui.open();

          this.guiViscosity = this.ripplesGui.add(this.params.guiParams, 'viscosity', 1 , 15);
          this.guiSpeed = this.ripplesGui.add(this.params.guiParams, 'speed', 1, 15);
          this.guiSize = this.ripplesGui.add(this.params.guiParams, 'size', 0.5, 2.5).step(0.025);

          this.guiViscosity.onChange((value) => {
              if(this.ripples) {
                  this.ripples.uniforms.viscosity.value = value;
              }
          });

          this.guiSpeed.onChange((value) => {
              if(this.ripples) {
                  this.ripples.uniforms.speed.value = value;
              }
          });

          this.guiSize.onChange((value) => {
              if(this.ripples) {
                  this.ripples.uniforms.size.value = value;
              }
          });
      }
  }

  getCanvasSizes() {
      return this.curtains.getBoundingRect();
  }

  lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
  }

  onMouseMove(e) {
      if(this.ripples) {
          // velocity is our mouse position minus our mouse last position
          this.mouse.last.x = this.mouse.current.x;
          this.mouse.last.y = this.mouse.current.y;

          let weblgMouseCoords = this.ripples.mouseToPlaneCoords(this.mouse.last.x, this.mouse.last.y);
          this.ripples.uniforms.lastMousePosition.value = [weblgMouseCoords.x, weblgMouseCoords.y];

          let updateVelocity = true;
          if(
              this.mouse.last.x === 0
              && this.mouse.last.y === 0
              && this.mouse.current.x === 0
              && this.mouse.current.y === 0
          ) {
              updateVelocity = false;
          }

          // touch event
          if(e.targetTouches) {
              this.mouse.current.x = e.targetTouches[0].clientX;
              this.mouse.current.y = e.targetTouches[0].clientY;
          }
          // mouse event
          else {
              this.mouse.current.x = e.clientX;
              this.mouse.current.y = e.clientY;
          }

          weblgMouseCoords = this.ripples.mouseToPlaneCoords(this.mouse.current.x, this.mouse.current.y);
          this.ripples.uniforms.mousePosition.value = [weblgMouseCoords.x, weblgMouseCoords.y];

          // divided by a frame duration (roughly)
          if(updateVelocity) {
              this.mouse.velocity = {
                  x: (this.mouse.current.x - this.mouse.last.x) / 16,
                  y: (this.mouse.current.y - this.mouse.last.y) / 16
              };
          }
      }
  }

  setRipplesShaders() {
      this.ripplesVs =  vSheder;
      this.ripplesFs =  fSheder;
  }

  swapPasses() {
      // swap read and write passes
      var tempFBO = this.readPass;
      this.readPass = this.writePass;
      this.writePass = tempFBO;

      // apply new texture
      this.ripplesTexture.setFromTexture(this.readPass.textures[0]);
  }

  createRipplesTexture() {
      // create a texture where we'll draw our ripples
      this.ripplesTexture = this.ripples.createTexture({
          sampler: "uTargetTexture"
      });

      return new Promise((resolve) => {
          if(this.ripplesTexture) {
              resolve();
          }
      });
  }

  init() {
      // create 2 render targets
      this.readPass = this.curtains.addRenderTarget({
          clear: false,
      });
      this.writePass = this.curtains.addRenderTarget({
          clear: false,
      });

      this.setRipplesShaders();

      let boundingRect = this.getCanvasSizes();

      this.ripplesParams = {
          vertexShader: this.ripplesVs,
          fragmentShader: this.ripplesFs,
          autoloadSources: false, // dont load our webgl canvas!!
          depthTest: false, // we need to disable the depth test in order for the ping pong shading to work
          watchScroll: false,
          uniforms: {
              mousePosition: {
                  name: "uMousePosition",
                  type: "2f",
                  value: [this.mouse.current.x, this.mouse.current.y],
              },
              lastMousePosition: {
                  name: "uLastMousePosition",
                  type: "2f",
                  value: [this.mouse.current.x, this.mouse.current.y],
              },
              velocity: {
                  name: "uVelocity",
                  type: "2f",
                  value: [this.mouse.velocity.x, this.mouse.velocity.y],
              },

              // window aspect ratio to draw a circle
              resolution: {
                  name: "uResolution",
                  type: "2f",
                  value: [boundingRect.width, boundingRect.height],
              },

              time: {
                  name: "uTime",
                  type: "1i",
                  value: -1,
              },

              viscosity: {
                  name: "uViscosity",
                  type: "1f",
                  value: this.params.viscosity,
              },
              speed: {
                  name: "uSpeed",
                  type: "1f",
                  value: this.params.speed,
              },
              size: {
                  name: "uSize",
                  type: "1f",
                  value: this.params.size,
              },
          },
      };

      this.ripples = this.curtains.addPlane(this.params.container, this.ripplesParams);

      if(this.ripples) {
          this.createRipplesTexture().then(() => {
              if(this.params.callback) {
                  this.params.callback(this.ripplesTexture);
              }
          });

          this.ripples.onReady(() => {
              // add event listeners
              window.addEventListener("mousemove", (e) => this.onMouseMove(e));
              window.addEventListener("touchmove", (e) => this.onMouseMove(e));
          }).onRender(() => {
              this.ripples.uniforms.velocity.value = [this.mouse.velocity.x, this.mouse.velocity.y];

              this.mouse.velocity = {
                  x: this.lerp(this.mouse.velocity.x, 0, 0.1),
                  y: this.lerp(this.mouse.velocity.y, 0, 0.1),
              };

              this.ripples.uniforms.velocity.value = [this.mouse.velocity.x, this.mouse.velocity.y];

              this.ripples.uniforms.time.value++;

              // update the render target
              this.writePass && this.ripples.setRenderTarget(this.writePass);
          }).onAfterRender(() => {
              // swap FBOs and update texture
              if(this.readPass && this.writePass) {
                  this.swapPasses();
              }

          }).onAfterResize(() => {
              // update our window aspect ratio uniform
              boundingRect = this.getCanvasSizes();
              this.ripples.uniforms.resolution.value = [boundingRect.width, boundingRect.height];
          });
      }
  }
}
 
class RipplesScene {

  constructor({
      viscosity = 5,
      speed = 3.5,
      size = 1,

      displacementStrength = 4,
      lightIntensity = 5,
      shadowIntensity = 2.5,
  } = {}) {

      this.params = {
          viscosity: viscosity,
          speed: speed,
          size: size,

          displacementStrength: displacementStrength,
          lightIntensity: lightIntensity,
          shadowIntensity: shadowIntensity,
      };

      this.init();
  }

  debug() {
      this.sceneGui = this.gui.addFolder('Scene');
      this.sceneGui.open();

      this.guiDisplacement = this.sceneGui.add(this.guiParams, 'displacement', 0 , 5);
      this.guiLights = this.sceneGui.add(this.guiParams, 'lights', 0.1, 10);
      this.guiShadows = this.sceneGui.add(this.guiParams, 'shadows', 0.1, 10);

      this.guiBlurRipples = this.sceneGui.add(this.guiParams, 'blurRipples', true);
      this.guiShowTexture = this.sceneGui.add(this.guiParams, 'showTexture', true);
      this.guiTitleColor = this.sceneGui.addColor(this.guiParams, 'titleColor');

      this.guiDisplacement.onChange((value) => {
          if(this.scenePlane) {
              this.scenePlane.uniforms.displacementStrength.value = value;
          }
      });

      this.guiLights.onChange((value) => {
          if(this.scenePlane) {
              this.scenePlane.uniforms.lightIntensity.value = value;
          }
      });

      this.guiShadows.onChange((value) => {
          if(this.scenePlane) {
              this.scenePlane.uniforms.shadowIntensity.value = value;
          }
      });

      this.guiBlurRipples.onChange((value) => {
          if(this.scenePlane) {
              this.scenePlane.uniforms.blurRipples.value = value ? 1 : 0;
          }
      });

      this.guiShowTexture.onChange((value) => {
          if(this.scenePlane) {
              this.scenePlane.uniforms.showTexture.value = value ? 1 : 0;
          }
      });

      this.guiTitleColor.onChange((value) => {
          if(this.scenePlane) {
              this.scenePlane.uniforms.titleColor.value = value;
          }
      });
  }

  init() {
      // set up the webgl context
      this.curtains = new Curtains({
          container: "canvas",
          alpha: false, // we don't need alpha, and setting it to false will improve our text canvas texture rendering
      }).onError(() => {
          // we will add a class to the document body to display original image and title
          document.body.classList.add("no-curtains");
      }).onContextLost(() => {
          // on context lost, try to restore the context
          this.curtains.restoreContext();
      });

      this.setSceneShaders();

      // we'll be using this html element to create 2 planes
      this.sceneElement = document.getElementById("water-ripples");

      // debugging
      // DAT gui
      this.guiParams = {
          displacement: this.params.displacementStrength,
          lights: this.params.lightIntensity,
          shadows: this.params.shadowIntensity,

          blurRipples: true,
          showTexture: true,
          titleColor: [255, 255, 255],
      };

      this.gui = new dat.GUI();

      this.ripples = new Ripples({
          curtains: this.curtains,
          container: this.sceneElement,
          viscosity: this.params.viscosity || null,
          speed: this.params.speed || null,
          size: this.params.size || null,
          callback: (texture) => {
              this.createScenePlane(texture);
          },

          gui: this.gui || null,
          guiParams: this.guiParams || null,
      });

      // dat gui
      this.debug();
  }

  setSceneShaders() {
      this.sceneVs = vSheder1;

      this.sceneFs = fSheder1;
  }

  writeTitleCanvas(canvas) {
      const title = document.getElementById("water-ripples-title").querySelector("h1");
      const titleStyle = window.getComputedStyle(title);

      let titleTopPosition = title.offsetTop * this.curtains.pixelRatio;
      // adjust small offset due to font interpretation?
      titleTopPosition += title.clientHeight * this.curtains.pixelRatio * 0.1;

      const planeBoundinRect = this.scenePlane.getBoundingRect();

      const htmlPlaneWidth = planeBoundinRect.width;
      const htmlPlaneHeight = planeBoundinRect.height;

      // set sizes
      canvas.width = htmlPlaneWidth;
      canvas.height = htmlPlaneHeight;
      let context = canvas.getContext("2d");

      context.width = htmlPlaneWidth;
      context.height = htmlPlaneHeight;

      // draw our title with the original style
      context.fillStyle = titleStyle.color;
      context.font = parseFloat(titleStyle.fontWeight) + " " + parseFloat(titleStyle.fontSize) * this.curtains.pixelRatio + "px " + titleStyle.fontFamily;
      context.fontStyle = titleStyle.fontStyle;

      context.textAlign = "center";

      // vertical alignment
      context.textBaseline = "top";
      context.fillText(title.innerText, htmlPlaneWidth / 2, titleTopPosition);

      if(this.scenePlane.textures && this.scenePlane.textures.length > 1) {
          this.scenePlane.textures[1].resize();
          this.scenePlane.textures[1].needUpdate();
      }
  }

  createScenePlane(rippleTexture) {
      // next we will create the plane that will display our result
      let curtainsBBox = this.curtains.getBoundingRect();

      const params = {
          vertexShader: this.sceneVs,
          fragmentShader: this.sceneFs,
          uniforms: {
              resolution: {
                  name: "uResolution",
                  type: "2f",
                  value: [curtainsBBox.width, curtainsBBox.height],
              },

              displacementStrength: {
                  name: "uDisplacementStrength",
                  type: "1f",
                  value: this.params.displacementStrength,
              },
              lightIntensity: {
                  name: "uLightIntensity",
                  type: "1f",
                  value: this.params.lightIntensity,
              },
              shadowIntensity: {
                  name: "uShadowIntensity",
                  type: "1f",
                  value: this.params.shadowIntensity,
              },

              blurRipples: {
                  name: "uBlurRipples",
                  type: "1f",
                  value: 1,
              },

              showTexture: {
                  name: "uShowTexture",
                  type: "1f",
                  value: 1,
              },
              titleColor: {
                  name: "uTitleColor",
                  type: "3f",
                  value: [255, 255, 255],
              },
          }
      };

      this.scenePlane = this.curtains.addPlane(this.sceneElement, params);

      // if the plane has been created
      if(this.scenePlane) {
          const canvas = document.createElement("canvas");

          canvas.setAttribute("data-sampler", "titleTexture");
          canvas.style.display = "none";

          this.scenePlane.loadCanvas(canvas);

          this.scenePlane.onLoading((texture) => {
              texture.shouldUpdate = false;
              if(this.scenePlane.canvases && this.scenePlane.canvases.length > 0) {
                  // title
                  if(document.fonts) {
                      document.fonts.ready.then(() => {
                          this.writeTitleCanvas(canvas);
                      });
                  }
                  else {
                      setTimeout(() => {
                          this.writeTitleCanvas(canvas);
                      }, 750);
                  }
              }

          }).onReady(() => {

              // create a texture that will hold our flowmap
              this.scenePlane.createTexture({
                  sampler: "uRippleTexture",
                  fromTexture: rippleTexture // set it based on our ripples plane's texture
              });

          }).onAfterResize(() => {
              curtainsBBox = this.curtains.getBoundingRect();
              this.scenePlane.uniforms.resolution.value = [curtainsBBox.width, curtainsBBox.height];

              this.writeTitleCanvas(canvas);
          });
      }
  }
}

 


const curtainsView = {
  namespace: "curtain",

  afterEnter() {
    setTimeout(() => {
      const rippleScene = new RipplesScene({
        viscosity: 7.5,
        speed: 5,
        size: 1.25,
  
        displacementStrength: 1.5,
        lightIntensity: 5,
        shadowIntensity: 2.5,
    });
    }, 1000);
  },

  beforeLeave() {
    // destroyPlane();
  },
};

export { curtainsView };


