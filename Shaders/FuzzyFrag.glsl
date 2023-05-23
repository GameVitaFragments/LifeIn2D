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
uniform float time;
uniform sampler2D texture;
uniform float noise;
uniform float active;

void main() {
  vec2 uv = vUV;
  uv.y = 1.0 - uv.y;
  float n = smoothstep(0.5,0.6,active);
  vec2 offset = vec2(noise * 0.01, noise * 0.01);
  
  //offset = vec2(0.0);
  
  vec3 col;
  col.r = texture2D(texture, uv + offset).r *n;
  col.g = texture2D(texture, uv).g *n;
  col.b = texture2D(texture, uv - offset).b *n;
  col += texture2D(texture, uv - offset*sin(uv*50.)).rgb*(1.-n);
 


  col = (vec3(1.) - col)*(n)+(1.0 - n)*col;
  gl_FragColor = vec4(col, 1.0);
}



// uniform float noise;

// uniform sampler2D noiseTex;

// //uniform vec2 iResolution;


// void main()
// {
//   vec2 uv = vec2(1.0) - vUV;
//   uv.x = uv.x * -1.0;


//   //uv.x = (sin(noise*uv.y) + 1.)/2.;
//   //uv.y = (sin(noise*uv.x) + 1.)/2.;
  

//   vec3 col = mix(vec3(0),texture2D(texture,mod(uv,1.0)).xyz,vec3(0.0,1.0,1.0));
//   col = vec3(1.) - col;
//   col = mix(col,vec3(0),vec3(1.0,0.,0.));  //col = vec3(1) - col;
//   col += vec3(1.0,0.,0.)*col.b
//   ;
//   gl_FragColor = vec4(col,1);




// } 
