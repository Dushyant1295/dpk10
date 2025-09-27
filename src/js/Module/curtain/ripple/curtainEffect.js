import { Curtains, Vec2, PingPongPlane, ShaderPass } from "curtainsjs";
import { isMobile } from "../../Helper";
import gsap from "gsap/dist/gsap";

import vSheder from "./vertex.glsl";
import fSheder from "./frag.glsl";
import rSheder from "./rfrag.glsl";

import * as dat from "dat.gui";

var curtains;
var gsapRender;

function ccc() {
  /*   Curtain Variable Initialization  */

  curtains = new Curtains({
    container: "canvas",
    premultipliedAlpha: true,
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

  // on success
  curtains.onSuccess(() => {
    // track the mouse position
    const mouse = {
      last: new Vec2(),
      current: new Vec2(),
      velocity: new Vec2(),
      updateVelocity: false,
      lastTime: null,
    };

    // used for resolution uniform
    const curtainsBBox = curtains.getBoundingRect();

    // our ripples ping pong fbo
    const ripples = new PingPongPlane(
      curtains,
      document.getElementById("canvas"),
      {
        vertexShader: vSheder,
        fragmentShader: fSheder,
        autoloadSources: false,
        watchScroll: false,
        sampler: "uRipples",
        texturesOptions: {
          floatingPoint: "half-float",
        },
        uniforms: {
          mousePosition: {
            name: "uMousePosition",
            type: "2f",
            value: mouse.current,
          },
          // our velocity
          velocity: {
            name: "uVelocity",
            type: "2f",
            value: mouse.velocity,
          },
          // window aspect ratio to draw a circle
          resolution: {
            name: "uResolution",
            type: "2f",
            value: new Vec2(curtainsBBox.width, curtainsBBox.height),
          },
          pixelRatio: {
            name: "uPixelRatio",
            type: "1f",
            value: curtains.pixelRatio,
          },
          time: {
            name: "uTime",
            type: "1i",
            value: -1,
          },

          viscosity: {
            name: "uViscosity",
            type: "1f",
            value: 10.75,
          },
          speed: {
            name: "uSpeed",
            type: "1f",
            value: 6.75,
          },
          size: {
            name: "uSize",
            type: "1f",
            value: 2,
          },
          dissipation: {
            name: "uDissipation",
            type: "1f",
            value: 0.9875,
          },
        },
      }
    );

    ripples
      .onRender(() => {
        mouse.velocity.set(
          curtains.lerp(mouse.velocity.x, 0, 0.05),
          curtains.lerp(mouse.velocity.y, 0, 0.1)
        );

        ripples.uniforms.velocity.value = mouse.velocity.clone();

        ripples.uniforms.time.value++;
      })
      .onAfterResize(() => {
        // update our window aspect ratio uniform
        const boundingRect = ripples.getBoundingRect();
        ripples.uniforms.resolution.value.set(
          boundingRect.width,
          boundingRect.height
        );
      });

    // handle mouse move
    const onMouseMove = (e) => {
      if (ripples) {
        const mousePos = {
          x: e.targetTouches ? e.targetTouches[0].clientX : e.clientX,
          y: e.targetTouches ? e.targetTouches[0].clientY : e.clientY,
        };

        mouse.last.copy(mouse.current);

        mouse.updateVelocity = true;

        if (!mouse.lastTime) {
          mouse.lastTime = (performance || Date).now();
        }

        if (
          mouse.last.x === 0 &&
          mouse.last.y === 0 &&
          mouse.current.x === 0 &&
          mouse.current.y === 0
        ) {
          mouse.updateVelocity = false;
        }

        mouse.current.set(mousePos.x, mousePos.y);

        const webglCoords = ripples.mouseToPlaneCoords(mouse.current);
        ripples.uniforms.mousePosition.value = webglCoords;

        // divided by a frame duration (roughly)
        if (mouse.updateVelocity) {
          const time = (performance || Date).now();
          const delta = Math.max(14, time - mouse.lastTime);
          mouse.lastTime = time;

          mouse.velocity.set(
            (mouse.current.x - mouse.last.x) / delta,
            (mouse.current.y - mouse.last.y) / delta
          );
        }
      }
    };

    // handle mouse move
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onMouseMove);

    // render pass (display the effect)
    const renderPassUniforms = {
      resolution: {
        name: "uResolution",
        type: "2f",
        value: new Vec2(curtainsBBox.width, curtainsBBox.height),
      },
      hue: {
        name: "uHue",
        type: "1f",
        value: 4.28,
      },
      saturation: {
        name: "uSaturation",
        type: "1f",
        value: 1.5,
      },
      bgColor: {
        name: "uBgColor",
        type: "3f",
        value: [255, 255, 255],
      },
    };

    const params = {
      fragmentShader: rSheder,
      depth: false,
      uniforms: renderPassUniforms,
    };

    // post pro
    const renderPass = new ShaderPass(curtains, params);

    renderPass.onAfterResize(() => {
      // update our window aspect ratio uniform
      const boundingRect = renderPass.getBoundingRect();
      renderPass.uniforms.resolution.value.set(
        boundingRect.width,
        boundingRect.height
      );
    });

    // add our ripple texture to the render pass
    renderPass.createTexture({
      sampler: "uRipplesTexture",
      fromTexture: ripples.getTexture(),
    });

    // GUI
    const gui = new dat.GUI();

    const guiHue = gui.add(
      { hue: renderPass.uniforms.hue.value },
      "hue",
      0,
      Math.PI * 2,
      0.01
    );
    guiHue.onChange((value) => {
      renderPass.uniforms.hue.value = value;
    });

    const guiSaturation = gui.add(
      { saturation: renderPass.uniforms.saturation.value },
      "saturation",
      0,
      3,
      0.0625
    );
    guiSaturation.onChange((value) => {
      renderPass.uniforms.saturation.value = value;
    });

    const guiBgColor = gui.addColor(
      {
        bgColor: {
          r: renderPass.uniforms.bgColor.value[0],
          g: renderPass.uniforms.bgColor.value[1],
          b: renderPass.uniforms.bgColor.value[2],
        },
      },
      "bgColor"
    );
    guiBgColor.onChange((value) => {
      renderPass.uniforms.bgColor.value = [value.r, value.g, value.b];
    });
  });
}

export { ccc };
