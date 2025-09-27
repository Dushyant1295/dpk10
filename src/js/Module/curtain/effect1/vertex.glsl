precision mediump float;

// default mandatory variables
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

// custom variables
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

uniform float uTime;

void main() {
  vec3 vertexPosition = aVertexPosition;

  // a float varying from -1.5 to 1.5

  float waveCoords = ((uTime / 45.0) * 3.5) - 1.75;

  // distance from the waveCoords to the vertex coordinates

  float distanceToWave = distance(vec2(vertexPosition.x, 0.0), vec2(waveCoords, 0.0));

  // nice little wave animation from left to right or right to left depending on the timer

  vertexPosition.z -= (cos(clamp(distanceToWave, 0.0, 0.75) * 3.141592) - cos(0.75 * 3.141592) + (2.0 * sin(3.141592 * uTime / 90.0))) * 0.05;

  gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

  // varyings

  vTextureCoord = aTextureCoord;
  vVertexPosition = vertexPosition;
}