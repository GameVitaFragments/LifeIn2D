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
uniform sampler2D screenOverlay;
uniform float noise;
uniform float active;

float rand(vec2 c){
	return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUV;
  uv.y = 1.0 - uv.y;
  float n = smoothstep(0.5,0.6,active);
  vec2 offset = vec2(-noise * 0.01, noise * 0.02);
  
  //offset = vec2(0.0);
  
  vec3 col;
  col.r = texture2D(texture, uv + offset).r *n;
  col.g = texture2D(texture, uv).g *n;
  col.b = texture2D(texture, uv - offset).b *n;
  col = texture2D(texture, uv).rgb*(1.-n);
  
  vec2 InsSide = smoothstep(0.0,0.001,0.5*sin(0.5*vec2(100.0*time)));


  col = texture2D(texture, uv - 0.0025*abs(InsSide)).rgb*(1.-n);
  col = texture2D(texture, uv + 0.0025*0.5*abs(InsSide)).rgb*(1.-n);

  
  vec3 screenAlpha = vec3(texture2D(screenOverlay,uv).a);
  col -= screenAlpha;
  col = clamp(col,vec3(0),vec3(1));
  col += texture2D(screenOverlay,uv).xyz; 
  
  //col = (vec3(1.) - col)*(n)+(1.0 - n)*col;
  gl_FragColor = vec4(col, 1.0);
}



// float _noise(vec2 p, float freq ){
// 	float unit = screenWidth/freq;
// 	vec2 ij = floor(p/unit);
// 	vec2 xy = mod(p,unit)/unit;
// 	//xy = 3.*xy*xy-2.*xy*xy*xy;
// 	xy = .5*(1.-cos(PI*xy));
// 	float a = rand((ij+vec2(0.,0.)));
// 	float b = rand((ij+vec2(1.,0.)));
// 	float c = rand((ij+vec2(0.,1.)));
// 	float d = rand((ij+vec2(1.,1.)));
// 	float x1 = mix(a, b, xy.x);
// 	float x2 = mix(c, d, xy.x);
// 	return mix(x1, x2, xy.y);
// }

// float pNoise(vec2 p, int res){
// 	float persistance = .5;
// 	float n = 0.;
// 	float normK = 0.;
// 	float f = 4.;
// 	float amp = 1.;
// 	int iCount = 0;
// 	for (int i = 0; i<50; i++){
// 		n+=amp*noise(p, f);
// 		f*=2.;
// 		normK+=amp;
// 		amp*=persistance;
// 		if (iCount == res) break;
// 		iCount++;
// 	}
// 	float nf = n/normK;
// 	return nf*nf*nf*nf;
// }

/*
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
 


  //col = (vec3(1.) - col)*(n)+(1.0 - n)*col;
  gl_FragColor = vec4(col, 1.0);
}*/

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
