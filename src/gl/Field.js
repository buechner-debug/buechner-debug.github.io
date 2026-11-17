import * as THREE from 'three';
import vertexShader from './shaders/field.vert?raw';
import fragmentShader from './shaders/field.frag?raw';

export class Field {
  constructor() {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randoms = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      scales[i] = Math.random() * 0.8 + 0.2;
      randoms[i3] = Math.random();
      randoms[i3 + 1] = Math.random();
      randoms[i3 + 2] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      transparent: true,
      depthWrite: false,
    });

    this.mesh = new THREE.Points(geometry, this.material);
  }

  update(time) {
    this.material.uniforms.uTime.value = time;
  }

  resize() {
    this.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
  }
}
