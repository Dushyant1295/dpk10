 #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
        #else
        precision mediump float;
        #endif

        uniform vec2 uResolution;
        uniform vec2 uMousePosition;
        uniform vec2 uVelocity;
        uniform int uTime;
        uniform sampler2D uRipples;

        uniform float uViscosity;
        uniform float uSpeed;
        uniform float uSize;
        uniform float uPixelRatio;
        uniform float uDissipation;

        varying vec2 vTextureCoord;


        void main() {
            // uniformize size for different screens
            float size = uSize;
            vec2 refScreen = vec2(1600.0, 900.0);
            float resoLength = length(uResolution / uPixelRatio);

            float screenRatio = length(refScreen) / resoLength;
            // flatten result for wider screens
            screenRatio = pow(screenRatio, min(1.0, screenRatio));
            size *= screenRatio;

            float velocity = clamp(length(uVelocity), 0.1, 1.5);
            vec3 speed = vec3(vec2(uSpeed) / (uResolution.xy * screenRatio), 0.0);

            vec2 mouse = (uMousePosition + 1.0) * 0.5;

            vec4 color = texture2D(uRipples, vTextureCoord);

            float shade = smoothstep(0.02 * size * velocity, 0.0, length(mouse - vTextureCoord));

            vec4 texelColor = color;

            float d = shade * uViscosity;

            float top = texture2D(uRipples, vTextureCoord - speed.zy, 1.0).x;
            float right = texture2D(uRipples, vTextureCoord - speed.xz, 1.0).x;
            float bottom = texture2D(uRipples, vTextureCoord + speed.xz, 1.0).x;
            float left = texture2D(uRipples, vTextureCoord + speed.zy, 1.0).x;

            d += -(texelColor.y - 0.5) * 2.0 + (top + right + bottom + left - 2.0);
            d *= uDissipation;

            // skip first frames
            d *= float(uTime > 5);

            d = d * 0.5 + 0.5;

            color = vec4(d, texelColor.x, 0.0, 1.0);

            gl_FragColor = color;
        }