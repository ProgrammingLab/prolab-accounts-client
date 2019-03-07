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
    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xFFFFFF, 1.0));

    const tree = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 100),
      new THREE.MeshBasicMaterial({ color: 'green' }),
    );
    tree.position.set(0, -50, 0);
    scene.add(tree);
    if (process.env.NODE_ENV === 'development') scene.add(new THREE.AxisHelper(1000));

    return {
      camera: null,
      control: null,
      renderer: null,
      scene,
      tree,
    };
  },
  mounted() {
    const canvas = this.$refs.BGCanvas;
    const [width, height] = [canvas.clientWidth, canvas.clientHeight];
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(width, height);

    this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    this.camera.position.set(0, 0, 100);
    this.scene.add(this.camera);

    this.control = new OrbitControls(this.camera);
    this.control.autoRotate = true;
    this.control.autoRotateSpeed = 3;
    this.control.enableKeys = false;
    this.control.enablePan = false;
    this.control.enableZoom = false;
    this.control.enabled = this.isActive;
    this.control.minPolarAngle = Math.PI / 3;
    this.control.maxPolarAngle = Math.PI / 3 * 2;

    this.update();
  },
  methods: {
    update() {
      requestAnimationFrame(this.update);
      this.control.update();
      this.renderer.render(this.scene, this.camera);
    },
  },
  watch: {
    isActive(val) {
      this.control.enabled = val;
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
