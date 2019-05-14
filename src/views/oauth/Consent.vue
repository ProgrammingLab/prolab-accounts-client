<template>
  <div class="container">
    <ErrorMessage :error="challengeError" />
    <div v-if="checkingChallenge">Please Wait</div>
    <div v-else-if="!challengeError">
      <div class="client">
        <figure>
          <img :src="client.logo_uri" />
        </figure>
        <div>
          <div class="client-name">{{ client.name }} ({{ client.id }})</div>
          <div class="client-owner">@{{ client.owner }}</div>
        </div>
      </div>
      が次の権限をリクエストしています
      <ul>
        <li v-for="scope in requestedScopes" :key="scope">{{ scope }}</li>
      </ul>
      <div>
        <button @click="onAccept()">許可する</button>
        <button @click="onReject()">許可しない</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.client {
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 1em;
  margin-bottom: 1em;
  display: flex;
}

.client figure {
  background-color: #ccc;
  border: 2px solid #ccc;
  margin: 0 1em 0 0;
}

.client figure img {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.client-owner {
  font-size: 0.7em;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: #668ad8;
  color: #fff;
  border-radius: 3px;
  margin-right: 1em;
}
</style>

<script>
import { mapActions, mapState } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'OauthConsent',
  metaInfo: {
    title: 'OAuth Consent',
  },
  components: {
    ErrorMessage,
  },
  data() {
    return {
      name: '',
      password: '',
      consentChallenge: '',
    };
  },
  computed: {
    ...mapState('oauthConsent', [
      'checkingChallenge',
      'skip',
      'redirectURL',
      'challengeError',
      'requestedScopes',
      'client',
    ]),
  },
  watch: {
    redirectURL(newURL) {
      if (newURL) {
        window.location.href = newURL;
      }
    },
  },
  async created() {
    this.consentChallenge = this.$route.query.consent_challenge;
    await this.startOAuthConsent(this.consentChallenge);
  },
  methods: {
    ...mapActions('oauthConsent', ['startOAuthConsent', 'accept', 'reject']),
    onAccept() {
      this.accept(this.consentChallenge);
    },
    onReject() {
      this.reject(this.consentChallenge);
    },
  },
};
</script>
