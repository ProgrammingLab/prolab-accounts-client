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
    {
      path: '/registration/:token',
      name: 'registration',
      component: () => import(/* webpackChunkName: "registration" */ './views/Registration.vue'),
    },
    {
      path: '/members',
      name: 'memberList',
      component: () => import(/* webpackChunkName: "memberList" */ './views/memberIntroduction/memberList.vue'),
    },
    {
      path: '/member/:name',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/memberIntroduction/Profile.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  store.commit('criticalError/clearError');
  if (to.matched.length === 0) {
    store.commit('criticalError/createError', {
      response: {
        status: 404,
        data: {
          message: 'Page not Found',
        },
      },
    });
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
