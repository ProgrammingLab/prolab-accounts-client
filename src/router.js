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
      path: '/editprofile',
      name: 'editprofile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "editprofile" */ './views/EditProfile.vue'),
      meta: { requiresAuth: true },
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
      path: '/user/email',
      name: 'createEmailConfirmation',
      component: () => import(/* webpackChunkName: "createEmailConfirmation" */ './views/CreateEmailConfirmation.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/confirmation/:token',
      name: 'confirmEmail',
      component: () => import(/* webpackChunkName: "confirmEmail" */ './views/ConfirmEmail.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/members',
      name: 'memberList',
      component: () => import(/* webpackChunkName: "memberList" */ './views/memberIntroduction/memberList.vue'),
    },
    {
      path: '/members/:name',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/memberIntroduction/Profile.vue'),
    },
    {
      path: '/achievements/edit',
      name: 'editAchievements',
      component: () => import(/* webpackChunkName: "editAchievements" */ './views/achievement/EditAchievements.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/invitations',
      name: 'invitation',
      component: () => import(/* webpackChunkName: "invitation" */ './views/admin/Invitation.vue'),
      meta: { requiresAdmin: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  store.commit('criticalError/clearError');
  if (to.matched.length === 0) {
    store.dispatch('criticalError/createError', {
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

  if (to.matched.some(record => record.meta.requiresAdmin) && !store.getters['user/isAdmin']) {
    store.dispatch('criticalError/createError', {
      response: {
        status: 404,
        data: {
          message: 'Page not Found',
        },
      },
    });
    return;
  }
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters['session/loggedIn']) {
    next({ path: '/login', query: { redirect: to.fullPath } });
    return;
  }

  next();
});

export default router;
