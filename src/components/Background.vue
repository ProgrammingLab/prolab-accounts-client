<template>
  <canvas id="BGCanvas" ref="BGCanvas"></canvas>
</template>

<script>

import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
// import * as TWEEN from '@tweenjs/tween.js';

export default {
  props: ['isActive'],
  data() {
    return {
      camera: null,
      renderer: null,
      scene: null,
      tree: null,
      light: null,
      control: null,
    };
  },
  mounted() {
    const canvas = this.$refs.BGCanvas;
    const [width, height] = [canvas.clientWidth, canvas.clientHeight];
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(width, height);

    this.scene = new THREE.Scene();

    this.light = new THREE.AmbientLight(0xFFFFFF, 1.0);
    this.scene.add(this.light);

    this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    this.camera.position.set(0, 0, 100);
    this.scene.add(this.camera);

    this.tree = new THREE.Mesh(
      new THREE.BoxGeometry(50, 50, 50),
      new THREE.MeshBasicMaterial({ color: 0x66B6FF, specular: 0xffffff }),
    );
    this.tree.position.set(0, 0, 0);
    this.scene.add(this.tree);

    this.control = new OrbitControls(this.camera);
    this.control.autoRotate = true;
    this.control.autoRotateSpeed = 3;
    this.control.enableKeys = false;
    this.control.enablePan = false;
    this.control.enableZoom = false;

    this.animate();
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);
      this.control.update();
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped>
  #BGCanvas{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    z-index: -1;
  }
</style>
