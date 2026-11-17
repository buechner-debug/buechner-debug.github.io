uniform float uTime;
uniform float uPixelRatio;
attribute float aScale;
attribute vec3 aRandom;
varying float vAlpha;

void main() {
  vec3 pos = position;
  pos.x += sin(uTime * 0.3 + aRandom.x * 6.28) * aRandom.y * 0.5;
  pos.y += cos(uTime * 0.2 + aRandom.y * 6.28) * aRandom.z * 0.3;
  pos.z += sin(uTime * 0.15 + aRandom.z * 6.28) * aRandom.x * 0.4;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;
  gl_PointSize = aScale * uPixelRatio * (120.0 / -mvPos.z);
  gl_PointSize = max(gl_PointSize, 1.0);

  vAlpha = smoothstep(0.0, 0.3, aScale) * smoothstep(-25.0, -5.0, mvPos.z);
}
