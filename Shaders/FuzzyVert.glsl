// #ifdef GL_ES
// precision highp float
// #endif

attribute vec3 aPosition;

attribute vec2 aTexCoord;

varying vec2 vUV;



void main()
{
  vec4 positionVec4 = vec4(aPosition,1.0);
  /*when w = 1.0 the vector is treated as a position, 
  when w = 0.0 the vector is treated as a direction, 
  this is standard vector math.*/

  vUV = aTexCoord;

  positionVec4.xy = positionVec4.xy*2.0 - 1.0;
  gl_Position = positionVec4;
}


/*// vert file and comments from adam ferriss
// https://github.com/aferriss/p5jsShaderExamples

// our vertex data
attribute vec3 aPosition;

void main() {

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
*/
