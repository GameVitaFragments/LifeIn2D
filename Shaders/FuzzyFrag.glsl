#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUV;
uniform float time;
uniform sampler2D texture;
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


  //col = (vec3(1.) - col)*(n)+(1.0 - n)*col;
  gl_FragColor = vec4(col, 1.0);
}
