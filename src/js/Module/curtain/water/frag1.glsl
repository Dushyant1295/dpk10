        precision highp float;
        
        // varyings
        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;
        varying vec2 vPlaneTextureCoord;
        
        uniform sampler2D uRippleTexture;
        uniform sampler2D planeTexture;
        uniform sampler2D titleTexture;
        
        uniform vec2 uResolution;
        
        uniform float uDisplacementStrength;
        uniform float uLightIntensity;
        uniform float uShadowIntensity;
        
        uniform float uBlurRipples;
        uniform float uShowTexture;
        uniform vec3 uTitleColor;
        
        
        // Holy fuck balls, fresnel!
        const float bias = 0.2;
        const float scale = 10.0;
        const float power = 10.1;
        
        // taken from https://github.com/Jam3/glsl-fast-gaussian-blur
        vec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
            vec4 color = vec4(0.0);
            vec2 off1 = vec2(1.3333333333333333) * direction;
            color += texture2D(image, uv) * 0.29411764705882354;
            color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;
            color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;
            return color;
        }
        
        float bumpMap(vec2 uv, float height, inout vec3 colormap) {
            vec3 shade;
            // branching on an uniform is OK
            if(uBlurRipples == 1.0) {
                shade = blur5(uRippleTexture, vTextureCoord, uResolution, vec2(1.0, 1.0)).rgb;
            }
            else {
                shade = texture2D(uRippleTexture, vTextureCoord).rgb;
            }
            
            return 1.0 - shade.r * height;
        }
        
        float bumpMap(vec2 uv, float height) {
            vec3 colormap;
            return bumpMap(uv, height, colormap);
        }

        // add bump map, reflections and lightnings to the ripples render target texture
        vec4 renderPass(vec2 uv, inout float distortion) {
            vec3 surfacePos = vec3(uv, 0.0);
            vec3 ray = normalize(vec3(uv, 1.0));

            vec3 lightPos = vec3( 2.0, 3.0, -3.0);
            vec3 normal = vec3(0.0, 0.0, -1);
            
            vec2 sampleDistance = vec2(0.005, 0.0);
            
            vec3 colormap;
            
            float fx = bumpMap(sampleDistance.xy, 0.2);
            float fy = bumpMap(sampleDistance.yx, 0.2);
            float f = bumpMap(vec2(0.0), 0.2, colormap);
            
            distortion = f;
            
            fx = (fx - f) / sampleDistance.x;
            fy = (fy - f) / sampleDistance.x;
            normal = normalize(normal + vec3(fx, fy, 0.0) * 0.2);
            
            // Holy fuck balls, fresnel!
            float shade = bias + (scale * pow(1.0 + dot(normalize(surfacePos - vec3(uv, -3.0)), normal), power));
            
            vec3 lightV = lightPos - surfacePos;
            float lightDist = max(length(lightV), 0.001);
            lightV /= lightDist;
            
            // light color based on light intensity
            vec3 lightColor = vec3(1.0 - uLightIntensity / 20.0);
            
            float shininess = 0.1;
            // brightness also based on light intensity
            float brightness = 1.0 - uLightIntensity / 40.0;
            
            float falloff = 0.1;
            // finally attenuation based on light intensity as well
            float attenuation = (0.75 + uLightIntensity / 40.0) / (1.0 + lightDist * lightDist * falloff);
            
            float diffuse = max(dot(normal, lightV), 0.0);
            float specular = pow(max(dot( reflect(-lightV, normal), -ray), 0.0), 15.0) * shininess;
            
            vec3 reflect_ray = reflect(vec3(uv, 1.0), normal * 1.0);
            vec3 texCol = (vec3(0.5) * brightness);
            
            float metalness = (1.0 - colormap.x);
            metalness *= metalness;
            
            vec3 color = (texCol * (diffuse * vec3(0.9) * 2.0 + 0.5) + lightColor * specular * f * 2.0 * metalness) * attenuation * 2.0;

            return vec4(color, 1.0);
        }


        void main() {
            vec4 color = vec4(1.0);
            
            float distortion;
            vec4 reflections = renderPass(vTextureCoord, distortion);            
            
            vec4 ripples = vec4(0.16);            
            ripples += distortion * 0.1 - 0.1;
            ripples += reflections * 0.7;
            
            
            vec2 textureCoords = vTextureCoord + distortion * (uDisplacementStrength / 250.0);
            vec2 planeTextureCoords = vPlaneTextureCoord + distortion * (uDisplacementStrength / 250.0);
            
            vec4 texture = texture2D(planeTexture, planeTextureCoords);
            vec4 title = texture2D(titleTexture, textureCoords);
            title.rgb *= vec3(uTitleColor.r / 255.0, uTitleColor.g / 255.0, uTitleColor.b / 255.0);
            
            // mix texture and title
            color = mix(vec4(0.05, 0.05, 0.05, 1.0), texture, uShowTexture);
            color = mix(color, title, title.a);

            
            // add fake lights & shadows
            float lights = max(0.0, ripples.r - 0.5);
            color.rgb += lights * (uLightIntensity / 10.0);
            
            float shadow = max(0.0, 1.0 - (ripples.r + 0.5));
            color.rgb -= shadow * (uShadowIntensity / 10.0);
            
            gl_FragColor = color;
        }