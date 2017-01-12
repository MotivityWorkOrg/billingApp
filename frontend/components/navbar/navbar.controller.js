export class NavBarController{
    constructor($auth, localCache){
        'ngInject';
        this.$auth = $auth;
        //this.isAthenticated = $auth.isAthenticated;
        this.isAthenticated = true;
        this.user = JSON.parse(localCache.getUser('loggedUser'));
        //console.log(this.user);
    }
    
    logout(){
        this.$auth.logout();
        window.location.href = '/';
    }
}