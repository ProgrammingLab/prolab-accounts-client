import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */'./views/Login.vue'),
    },
    {
      path: '/oauth/login',
      name: 'oauthLogin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "oauthLogin" */ './views/oauth/Login.vue'),
    },
    {
      path: '/oauth/consent',
      name: 'oauthConsent',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "oauthConsent" */ './views/oauth/Consent.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  store.dispatch('criticalError/clearError');
  if (to.matched.length === 0) {
    store.dispatch('criticalError/createError', { number: 404, message: 'Page not found' });
  }
  try {
    await store.dispatch('user/getUser', store.state.session.sessionID);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    store.commit('session/clearSessionID');
  }
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters['session/loggedIn']) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
