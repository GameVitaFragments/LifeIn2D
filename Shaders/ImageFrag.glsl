
// #ifdef GL_ES

// precision highp float;

// #endif

// varying vec2 vUV;

// uniform sampler2D texture;

// //uniform sampler2D iChannel2;
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUV;
uniform sampler2D texture;
uniform float active;

void main() {
  vec2 uv = vUV;
  uv.y = 1.0 - uv.y;
  
  //offset = vec2(0.0);
  float on = active; 
  vec3 col; 
  col = texture2D(texture,uv).xyz; 
  float blur = 0.01;
  vec3 k = vec3(1.0) - smoothstep(0.05,0.05+blur,uv.x)*smoothstep(0.05,0.05+blur,uv.y)*smoothstep(0.94+blur,0.94,uv.y)*smoothstep(0.94+blur,0.94,uv.x);
  k*=on;
  clamp(k,0.,1.);
  vec3 _k = vec3(1.0)-k;
  col = col*_k;
  col += k*on*vec3(1.0,0.0,0.0);
  gl_FragColor = vec4(col, 1.0);
}

