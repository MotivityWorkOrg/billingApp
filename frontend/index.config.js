export function config($logProvider, $authProvider, API_URL) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(true);
    $authProvider.singupUrl = API_URL + 'auth/register';
    $authProvider.loginUrl = API_URL + 'auth/login';
}

export default ['$logProvider', '$authProvider', 'API_URL', config];