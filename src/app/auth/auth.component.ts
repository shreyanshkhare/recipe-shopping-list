import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    templateUrl: './auth.component.html',
    selector: 'app-auth'
})

export class AuthComponent {
    isLoginMode: boolean = false;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        console.log('form ->>', form)
    }

}