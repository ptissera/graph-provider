// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  features: {
    remix: false
  },
  firebase: {
    apiKey: 'AIzaSyArtFXzzdasywX-8ejX3q5bwokZEBfdkEM',
    authDomain: 'graph-provider.firebaseapp.com',
    databaseURL: 'https://graph-provider.firebaseio.com',
    projectId: 'graph-provider',
    storageBucket: 'graph-provider.appspot.com',
    messagingSenderId: '867894651526'
}
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
