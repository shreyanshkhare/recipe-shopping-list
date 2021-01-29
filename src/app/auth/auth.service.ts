import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";

// ideallay create a model, will do that once we connect to the backend
class User {
    constructor(public email: string) { }
}

const endpoint = "/recipe/api";

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    authObservable = new Observable();

    constructor(private router: Router, private http: HttpClient,private toastr: ToastrService) { }

    private successHandler(email: string, onSuccess: Function) {
        const user = new User(email);
        localStorage.setItem('userData', JSON.stringify(user));
        this.user.next(user);
        onSuccess();
    }

    signUp(email: string, password: string, afterSuccess: Function) {
        this.http.post(endpoint + '/UserRegister', {
            "username": email,
            "password": password
        }).subscribe(() => {
            this.toastr.success("User registered successfully", "Success");
            afterSuccess()
        })
    }

    login(email: string, password: string, afterSuccess: Function) {
        return this.http.post(endpoint + '/login', {
            "username": email,
            "password": password
        }
        ).subscribe((data: any) => {
            localStorage.setItem('userData', JSON.stringify(data));
            this.user.next(data);
            afterSuccess();
        })
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['./auth']);
    }

    autoLogin() {
        const user = JSON.parse(localStorage.getItem('userData'));
        this.user.next(user);
    }
}
