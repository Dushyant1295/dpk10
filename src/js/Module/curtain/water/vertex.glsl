 #ifdef GL_FRAGMENT_PRECISION_HIGH
            precision highp float;
            #else
            precision mediump float;
            #endif
    
            // default mandatory variables
            attribute vec3 aVertexPosition;
            attribute vec2 aTextureCoord;
    
            uniform mat4 uMVMatrix;
            uniform mat4 uPMatrix;
    
            // custom variables
            varying vec3 vVertexPosition;
            varying vec2 vTextureCoord;
    
            void main() {
    
                vec3 vertexPosition = aVertexPosition;
    
                gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    
                // varyings
                vTextureCoord = aTextureCoord;
                vVertexPosition = vertexPosition;
            }