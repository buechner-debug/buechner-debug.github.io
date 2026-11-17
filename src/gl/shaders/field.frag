varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.1, d) * vAlpha * 0.6;
  gl_FragColor = vec4(0.78, 1.0, 0.3, alpha);
}
