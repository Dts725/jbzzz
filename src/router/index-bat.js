import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [{
  path: '/login',
  component: () =>
    import('@/views/login/index'),
  hidden: true
},
  {
    path: '/404',
    component: () =>
      import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/appointment/table',
    // name: 'Dashboard',
    hidden: true,
    meta: {
      title: '预约管理',
      icon: 'sitemap'
    },
    children: [{
      path: 'dashboard',
      component: () =>
        import('@/views/dashboard/index')
    }]
  },

  {
    path: '/appointment',
    component: Layout,
    redirect: '/appointment/table',
    name: 'Appointment',
    meta: {
      title: '预约管理',
      icon: 'clock-o'
    },
    children: [{
      path: 'table',
      name: 'Table',
      meta: {
        title: '预约管理',
        icon: 'clock-o'
      },
      component: () =>
        import('@/views/dashboard/index'),
    }]
  },
  {
    path: '/team',
    component: Layout,
    redirect: '/team/table',
    name: 'Team',
    meta: {
      title: '团队管理',
      icon: 'sitemap'
    },
    children: [{
      path: 'table',
      name: 'Teamc',
      meta: {
        title: '团队管理',
        icon: 'sitemap'
      },
      component: () =>
        import('@/views/table/index'),
    }]
  },
  {
    path: '/field',
    component: Layout,
    redirect: '/field/tree',
    name: 'Field',
    meta: {
      title: '场地管理',
      icon: 'map-marker'
    },
    children: [
      {
        path: 'tree',
        name: 'Tree',
        meta: {
          title: '场地管理',
          icon: 'map-marker'
        },
        component: () =>
          import('@/views/tree/index'),
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: 'user-circle-o'
    },
    children: [{
      path: 'index',
      name: 'Form',
      meta: {
        title: '全部用户',
        icon: 'users'
      },
      component: () =>
        import('@/views/form/index'),
    },
      {
        path: 'leader',
        name: 'leader',
        meta: {
          title: '领导',
          icon: 'user'
        },
        component: () =>
          import('@/views/form/leader'),
      },
      {
        path: 'worker',
        name: 'worker',
        meta: {
          title: '工作人员',
          icon: 'id-badge'
        },
        component: () =>
          import('@/views/form/worker'),
      },
      {
        path: 'resident',
        name: 'resident',
        meta: {
          title: '普通居民',
          icon: 'id-card'
        },
        component: () =>
          import('@/views/form/resident'),
      }
    ]
  },
  {
    path: '/transact',
    component: Layout,
    redirect: '/transact/index',
    meta: {
      title: '业务',
      icon: 'file-text'
    },
    children: [{
      path: 'index',
      name: 'Transact',
      meta: {
        title: '业务管理',
        icon: 'file-text'
      },
      component: () =>
        import('@/views/transact/index'),
    }]
  },

  {
    path: '/active',
    component: Layout,
    redirect: '/active/index',
    meta: {
      title: '活动',
      icon: 'flag'
    },
    children: [{
      path: 'index',
      name: 'index',
      meta: {
        title: '活动管理',
        icon: 'flag'
      },
      component: () =>
        import('@/views/active/index'),
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/role',
    meta: {
      title: '系统管理',
      icon: 'gear'
    },
    children: [
      {
        path: 'role',
        name: 'role',
        meta: {
          title: '角色管理',
          icon: 'smile-o'
        },
        component: () =>
          import('@/views/system/role'),
      },
      {
        path: 'community',
        name: 'community',
        meta: {
          title: '社区管理',
          icon: 'comments'
        },
        component: () =>
          import('@/views/system/community'),
      },
      {
        path: 'backstage',
        name: 'backstage',
        meta: {
          title: '后台账号',
          icon: 'key'
        },
        component: () =>
          import('@/views/system/backstage'),
      }
    ]
  },
  {
    path: '/workers',
    component: Layout,
    redirect: '/workers/workers',
    meta: {
      title: '办公账号',
      icon: 'desktop'
    },
    children: [{
      path: 'workers',
      name: 'workers',
      meta: {
        title: '办公账号',
        icon: 'desktop'
      },
      component: () =>
        import('@/views/workers/workers'),
    }]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
