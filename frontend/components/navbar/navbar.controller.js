export class NavBarController{
    constructor($auth, localCache, $location){
        'ngInject';
        this.$auth = $auth;
        this.isAthenticated = true;
        this.$location = $location;
        this.user = JSON.parse(localCache.getUser('loggedUser'));
    }
    isActive(viewLocation){
        return (viewLocation === this.$location.path());
    }
    logout(){
        this.$auth.logout();
        window.location.href = '/';
    }
}