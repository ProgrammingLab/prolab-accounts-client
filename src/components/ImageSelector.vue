<template>
  <div>
    <img class="preview" :src="localSrc" />
    <div class="file">
      <label class="file-label">
        <input class="file-input" type="file" accept="image/*" @change="onChange" />
        <span class="file-cta">
          <span class="file-label">
            画像ファイルを選択
          </span>
        </span>
      </label>
    </div>
  </div>
</template>

<script>
import '@/assets/bulma.css';

export default {
  props: {
    src: {
      type: String,
      default() {
        return require('@/assets/no_image.png');
      },
    },
  },
  data() {
    return { localSrc: this.src };
  },
  watch: {
    src(src) {
      if (!this.localSrc) this.localSrc = src;
    },
  },
  methods: {
    onChange(ev) {
      const file = ev.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        this.localSrc = reader.result;
        const base64Body = /^data:image\/.+;base64,([a-zA-Z0-9+/=]+)$/.exec(reader.result)[1];
        this.$emit('onChange', { file, base64Body });
      });
    },
  },
};
</script>

<style scoped>
.preview {
  width: 256px;
  transition-property: height;
  border: 1px solid #ccc;
  transition-duration: 1s;
}
</style>
