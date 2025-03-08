import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";


var username$ : any;

var isAuthenticated$: any;

@Injectable()

export class AuthenticationService{

    constructor(private http: HttpClient) {}


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


    createUser(signupInfo : any) {
        let postData = new FormData();
        postData.append('Username', signupInfo.Username);
        postData.append('Email', signupInfo.Email);
        postData.append('Password', signupInfo.Password);
        return this.http.post<any>('http://127.0.0.1:5000/api/v1.0/signup', postData);
    }

    deleteAccount() {
        return this.http.delete<any>('http://127.0.0.1:5000/api/v1.0/account', AuthenticationService.sendToken());
    }


    isAuthorised() {
        return isAuthenticated$;
    }


    sucessfulAuth(token :any, loginInfo: any) {
        sessionStorage['token']= token.token;
        isAuthenticated$ = true;
        username$ = loginInfo.Username;
    }


    getUsername() {
        return username$;
    }



    static getToken() {
        return sessionStorage['token'];
    }


    static sendToken() {
        let authorizationData = 'Bearer ' + AuthenticationService.getToken();

        let headerOptions = {
            headers: new HttpHeaders({
                'authorization': authorizationData
            })
        };
        return headerOptions
    }

    static setLogout() {
        isAuthenticated$ = false;
    }


}
