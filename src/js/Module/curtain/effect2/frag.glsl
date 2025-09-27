#ifdef GL_ES
  precision mediump float;
#endif

#define PI2 6.28318530718
#define PI 3.14159265359
#define S(a,b,n) smoothstep(a,b,n)
#define NUM_OCTAVES 10

uniform float uTime;
uniform float uProgress;
uniform vec2 uReso;
uniform vec2 uMouse;

// get our varyings
varying vec3 vVertexPosition;
varying vec2 vTextureCoord0;
varying vec2 vTextureCoord1;

// the uniform we declared inside our javascript

// our texture sampler (default name, to use a different name please refer to the documentation)
uniform sampler2D texture0;
uniform sampler2D texture1;

float rand(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) *
  43758.5453123);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);

  float res = mix(mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x), mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
  return res * res;
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100);
  // Rotate to reduce axial bias
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  for(int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv0 = vTextureCoord0;
  vec2 uv1 = vTextureCoord1;

  vec2 mouse_rel = vec2(uReso.x - uMouse.x, uMouse.y - uReso.y) / uReso * 0.017;

  vec4 map = texture2D(texture1, uv1) - .5;

  vec2 parallax = map.r * mouse_rel;

  vec4 color = texture2D(texture0, uv0 + parallax);

  float motion = fbm(uv0 * 6.0 + vec2(uTime * -.5, uTime * -.5));

  float final = fbm(uv0 * 6.0 + motion) * 1.5;

  vec3 fog = (final * vec3(71, 88, 144) / 255.0) / 2.0;

  // gl_FragColor = vec4(color.rgb + fog, color.a);

  gl_FragColor = vec4(color.rgb, color.a);
  
}