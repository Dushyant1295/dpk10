import "../css/style.scss";
import "swiper/css/bundle";
import { isMobile } from "./Module/Helper";

import { lenis, lenisScroll } from "./Module/lenis/lenis";
const lss = new lenisScroll();

if (!isMobile()) lss.initLenis();

//loading effect
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  const content = document.querySelector(".main-content");

  // Wait for 2 seconds, then hide loader
  setTimeout(() => {
    loader.classList.add("hide");
    content.classList.add("show");
  }, 2000);
});

//scroll indicator effect
// const sections = document.querySelectorAll("section");
// const indicators = {
//   "section-1": document.getElementById("indi-1"),
//   "section-2": document.getElementById("indi-2"),
// };

// sections.forEach((section) => observer.observe(section));

// background WebGL shader effect
const canvas = document.getElementById("bgCanvas");
const gl =
  canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

if (!gl) {
  console.error("WebGL not supported");
  document.body.style.background = "#e19800";
}

// Vertex shader - defines positions
const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

// Fragment shader - creates the animated pattern
const fragmentShaderSource = `
            precision highp float;
            uniform vec2 resolution;
            uniform float time;
            
            // Enhanced noise function
            float hash(vec2 p) {
                p = fract(p * vec2(123.34, 456.21));
                p += dot(p, p + 45.32);
                return fract(p.x * p.y);
            }
            
            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                
                float a = hash(i);
                float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0));
                float d = hash(i + vec2(1.0, 1.0));
                
                return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
            }
            
            // Advanced FBM with more octaves for richer texture
            float fbm(vec2 p) {
                float value = 0.0;
                float amplitude = 0.5;
                float frequency = 1.0;
                
                for(int i = 0; i < 7; i++) {
                    value += amplitude * noise(p * frequency);
                    frequency *= 2.1;
                    amplitude *= 0.45;
                }
                
                return value;
            }
            
            // Domain warping for swirling, organic effect
            vec2 warp(vec2 p, float t) {
                float warpAmount = 2.0;
                p += warpAmount * vec2(
                    fbm(p + vec2(t * 0.1, t * 0.15)),
                    fbm(p + vec2(t * 0.12, -t * 0.08))
                );
                return p;
            }
            
            void main() {
                vec2 uv = gl_FragCoord.xy / resolution;
                vec2 p = (uv - 0.5) * vec2(resolution.x / resolution.y, 1.0) * 3.5;
                
                // Apply domain warping for turbulent, cloudy effect
                p = warp(p, time * 0.3);
                
                // Create base turbulence
                float n1 = fbm(p * 1.5 + time * 0.05);
                float n2 = fbm(p * 2.0 + vec2(time * 0.08, -time * 0.06));
                float n3 = fbm(p * 3.5 - vec2(time * 0.04, time * 0.07));
                
                // Combine layers with domain warping
                vec2 warpedP = p + vec2(n1, n2) * 0.5;
                float pattern = fbm(warpedP);
                
                // Add fine detail layers
                pattern += n2 * 0.4;
                pattern += n3 * 0.3;
                pattern += fbm(p * 5.0 + time * 0.1) * 0.15;
                
                // Add swirling motion
                float angle = time * 0.1;
                vec2 swirl = vec2(cos(angle), sin(angle));
                pattern += fbm(p + swirl * 2.0) * 0.2;
                
                // Normalize and enhance contrast
                pattern = pattern / 1.8;
                pattern = smoothstep(0.2, 0.8, pattern);
                
                // Color palette based on #743010
                vec3 baseColor = vec3(0.455, 0.188, 0.063); // #743010
                vec3 darkColor = vec3(0.2, 0.08, 0.02);
                vec3 midColor = baseColor;
                vec3 lightColor = vec3(0.6, 0.3, 0.15);
                
                // Multi-step color mixing for richer tones
                vec3 color;
                if (pattern < 0.4) {
                    color = mix(darkColor, midColor, pattern / 0.4);
                } else {
                    color = mix(midColor, lightColor, (pattern - 0.4) / 0.6);
                }
                
                // Add subtle color variation based on position
                float colorVar = noise(p * 0.5 + time * 0.02);
                color += vec3(colorVar * 0.08, colorVar * 0.05, colorVar * 0.02);
                
                // Enhanced vignette for depth
                vec2 vignetteUV = uv * 2.0 - 1.0;
                float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.25;
                color *= vignette;
                
                // Add subtle glow in brighter areas
                float glow = smoothstep(0.6, 1.0, pattern) * 0.15;
                color += vec3(glow * 0.3, glow * 0.2, glow * 0.05);
                
                gl_FragColor = vec4(color, 1.0);
            }
        `;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

// Create shaders and program
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(
  gl,
  gl.FRAGMENT_SHADER,
  fragmentShaderSource
);
const program = createProgram(gl, vertexShader, fragmentShader);

// Set up geometry (full-screen quad)
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

// Get attribute and uniform locations
const positionLocation = gl.getAttribLocation(program, "position");
const resolutionLocation = gl.getUniformLocation(program, "resolution");
const timeLocation = gl.getUniformLocation(program, "time");

// Resize canvas to match display size
function resize() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  gl.viewport(0, 0, canvas.width, canvas.height);
}

resize();
window.addEventListener("resize", resize);

// Animation loop
let startTime = Date.now();

function render() {
  const currentTime = (Date.now() - startTime) * 0.001; // Convert to seconds

  gl.useProgram(program);

  // Set uniforms
  gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
  gl.uniform1f(timeLocation, currentTime);

  // Set up position attribute
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Draw
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(render);
}

render();
