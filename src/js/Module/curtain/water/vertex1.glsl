        precision highp float;
        
        // default mandatory variables
        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;
        
        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;
        
        // varyings
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;
        varying vec2 vPlaneTextureCoord;
        
        // textures matrices
        uniform mat4 planeTextureMatrix;

        void main() {
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
            
            // varyings
            vTextureCoord = aTextureCoord;
            vPlaneTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
            vVertexPosition = aVertexPosition;
        }
 