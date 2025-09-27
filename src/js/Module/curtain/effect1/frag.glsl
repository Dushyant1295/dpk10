precision mediump float;


uniform sampler2D uImg;
varying vec2 vTextureCoord;


varying vec3 vVertexPosition;



void main() {
   gl_FragColor = texture2D(uImg, vTextureCoord);
}