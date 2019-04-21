<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('cancel')">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>

          <div class="modal-header">
            <h1>
              <slot name="header">
                ! Header is not seted !
              </slot>
            </h1>
          </div>

          <div class="modal-body">
            <p>
              <slot name="body">
                ! Body is not seted !
              </slot>
            </p>
          </div>

          <div class="modal-footer">
            <slot name="footer" :onClick="(val)=>$emit('click', val)">
              ! Footer is not seted !
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
  display: table;
  transition: opacity .1s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 50%;
  min-width: 300px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgb(0, 0, 0, .75);
  transition: all .1s ease;
}

.modal-header h1 {
  font-size: x-large;
  margin: 0;
  padding: 0;
}

.modal-body {
  margin: 20px 0;
}

.modal-body p {
  font-size: medium;
  margin: 0;
  padding: 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}
.modal-footer >>> * {
  margin: 5px;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
}
</style>
