import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
* The Username
*/
var username$ : any;
/**
* Boolean Variable to track Authentication of user
*/
var isAuthenticated$: any;

/**
* The Authentication Service provides access to the endpoints of the
* Authorisation of BiteBurst Directory API's Users.
*/
@Injectable()
export class AuthenticationService{

    /**
    * The constructor for the Web Service
    * @param http Injecting the HttpClient to the AuthenticationService
    * class
    */
    constructor(private http: HttpClient) {}

    /**
    * Fetch the authentication token from the BiteBurst Directory API
    * @param loginInfo The username and password of the user attempting to login
    * @returns An authenticaiton token
    */
    getAuth(loginInfo: any) {
        let authorizationData = 'Basic ' + btoa(loginInfo.Username + ':' + loginInfo.Password);

        let headerOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': authorizationData
            })
        };

        return this.http.get<any>('http://127.0.0.1:5000/api/v1.0/login', headerOptions);
    }

    /**
    * Remove the active users token from the BiteBurst Directory API by adding it to the Blacklist DB
    */
    getLogout() {
        isAuthenticated$ = false;
        let token = sessionStorage['token']

        let authorizationData = 'Bearer ' + token;

        let headerOptions = {
            headers: new HttpHeaders({
                'authorization': authorizationData
            })
        };

        sessionStorage.removeItem('token')
        console.log('Logged Out.')
        return this.http.get<any>('http://127.0.0.1:5000/api/v1.0/logout', headerOptions);
    }

    /**
    * Creates a new user in the BiteBurst Directory API
    * @param signupInfo The new users data
    * @returns An Observable for the new user
    */
    createUser(signupInfo : any) {
        let postData = new FormData();
        postData.append('Username', signupInfo.Username);
        postData.append('Email', signupInfo.Email);
        postData.append('Password', signupInfo.Password);
        return this.http.post<any>('http://127.0.0.1:5000/api/v1.0/signup', postData);
    }

    /**
    * Permanently deletes a user from the BiteBurst Directory API
    */
    deleteAccount() {
        return this.http.delete<any>('http://127.0.0.1:5000/api/v1.0/account', AuthenticationService.sendToken());
    }

    /**
    * Checks if a user is authorised
    * @returns A Boolen variable
    */
    isAuthorised() {
        return isAuthenticated$;
    }

    /**
    * When a user logs in it appends the token to sessionStoarage, assigns
    * the isAuthenticatied$ boolean variable to true and assigns the users Username
    */
    sucessfulAuth(token :any, loginInfo: any) {
        sessionStorage['token']= token.token;
        isAuthenticated$ = true;
        username$ = loginInfo.Username;
    }

    /**
    * Fetchs the users Username
    * @returns Users username
    */
    getUsername() {
        return username$;
    }


    /**
    * Fetch the users authentication token
    * @returns The token
    */
    static getToken() {
        return sessionStorage['token'];
    }

    /**
    * Creates a HTTP Header for Authorization { Bearer: token}
    * @returns Authentication for API calls
    */
    static sendToken() {
        let authorizationData = 'Bearer ' + AuthenticationService.getToken();

        let headerOptions = {
            headers: new HttpHeaders({
                'authorization': authorizationData
            })
        };
        return headerOptions
    }

    /**
    * On logout sets isAuthenticated$ variable to false
    */
    static setLogout() {
        isAuthenticated$ = false;
    }


}
