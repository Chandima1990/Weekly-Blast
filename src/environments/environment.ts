// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    apiURL : "https://xataapi.azurewebsites.net/api/get/v1.0.0/",
    apiURLForLogin : "https://xataapi.azurewebsites.net/api/v1.0.0/",
    Ocp_Apim_Subscription_Key: "0a8ecd9b068841859834cbfaf272a933"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
