// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    oauthUrl: `http://127.0.0.1:8000`,
    url: `http://127.0.0.1:8000/api/v1`, // local url with built in php artisan server
    // url: `http://alcohol.test/api/v1`, // Url xampp server
    tipsEndPoints: {
      get: '/tips', // All tips
      post: '/tip',
      getDetail: '/tip/', // Id behind it,
      getTipsUser: '/tip/user/', // Id behind it
      put: '/tip/', // Id behind it
      delete: '/tip/', // Id behind it
    },
    categoriesEndPoints: {
      get: '/categories', // All categories
      post: '/category',
      getDetail: '/category/', // Id behind it
      put: '/category/', // Id behind it
      delete: '/category/', // Id behind it
    },
    authEndPoints: {
      register: '/register',
      login: '/login',
      user: '/user',
      logout: '/logout'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
