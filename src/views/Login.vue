<template>
  <div id="background">
    <div id="container">
      <img width="200" height="70" src="http://placehold.jp/60/ffffff/666666/200x70.png?text=ProLab" alt="prolag">
      <form @submit.prevent="login">
        <label>
          Username
          <input type="text" autocomplete="username" v-model="username"/>
        </label>
        <label>
          Password
          <input type="password" autocomplete="current-password" v-model="password"/>
        </label>
        <button type="submit" :disabled="!password || !username">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log(this.username, this.password);
    },
  },
};
</script>

<style scoped>
  #background {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  #container {
    width: 50%;
    height: 50%;
  }
  form {
    margin-top: 1em;
  }
  input {
    outline: none;
    padding-top: 0.5em;
    width: 100%;
    border: none;
    border-bottom: 2px solid #888888;
    background: transparent;
  }
  input:focus {
    border-bottom: 2px solid #333333;
  }
  button {
    float: right;
    margin-top: 0.5em;
    background-color: transparent;
    border: 1px solid;
    outline: none;
    color: #333333;
  }
  button:disabled {
    color: #888888;
  }
  label {
    width: 100%;
  }

</style>
