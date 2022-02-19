import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    constructor(private authService: AuthService, 
        private router: Router, 
        private componentFactoryResolver: ComponentFactoryResolver){}

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    closeSub: Subscription;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;  //will find the 1st occurence of type 'PlaceholderDirective' in DOM

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
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        });
        
        form.reset();
    }

    onHandleError(){
        this.error = null;
    }

    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message: string){
        // const alertCmp = new AlertComponent();
        const alertCmpfactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent); //generates component factory
        const hostViewContainerRef = this.alertHost.viewContainerRef;   //gives the reference of the place where the directive is used
        hostViewContainerRef.clear();    //To clear any component that might have been rendered there before

        const cmpRef = hostViewContainerRef.createComponent(alertCmpfactory);
        
        cmpRef.instance.message = message;
        this.closeSub = cmpRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })
    }
}