import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    constructor(private authService: AuthService, private router: Router){}

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){

        let authObs: Observable<AuthResponseData>;
        const email = form.value.email;
        const password = form.value.password;
        if(!form.valid){
            return;
        }
        this.isLoading = true;
        if(this.isLoginMode){
            authObs = this.authService.login(email, password);
        }
        else{
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(response => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
        });
        
        form.reset();
    }
}