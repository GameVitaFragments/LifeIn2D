//Define renderBuffer and renderShader in setup and preload respectively

let renderBuffer;
let renderShader;

function drawScreen(shaderState) {

  renderShader.setUniform('screenOverlay',screenBuffer); 
  renderShader.setUniform('texture',renderBuffer);
  renderShader.setUniform('noise', getNoiseValue());
  renderShader.setUniform('time', frameCount * 0.01);
  renderShader.setUniform('active', shaderState);
  push();
  clear();
  shader(renderShader);
  rect(-width / 2, -height / 2, width, height);
  resetShader();
  pop();
  renderBuffer.clear();
}



function getNoiseValue() {
  let v = sin(millis() / 10000);
  const cutOff = 0.1;

  if (v < cutOff) {
    return 0;
  }

  v = pow((v - cutOff) * 1 / (1 - cutOff), 2);

  return v;
}