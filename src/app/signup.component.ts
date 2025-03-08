import { Component } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { AuthenticationService } from "./auth.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";


@Component ({
    selector: 'auth-button',
    standalone: true,
    imports: [ RouterModule, CommonModule, ReactiveFormsModule],
    providers: [AuthenticationService],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})

export class SignupComponent {

    /**
    * Form that saves Username, Email and Password
    */
    signup : any;

    /**
    * Saves response to check if the user should be rerouted
    */
    navigate:any;

    constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private router: Router) {}


     /**
    * Sets the signup form to have validation requirements on initialisaton
    */
    ngOnInit() {

        this.signup= this.formBuilder.group({
            Username: ['', Validators.required],
            Password: ['', Validators.required],
            Email: ['', Validators.required]
        })

    }


    /**
    * If submission button is hit it will attempt to create the user with provided Username, Email and Password
    * @returns Navigate to Home if sucessful
    */
    onSubmit() {

        this.authService.createUser( this.signup.value).subscribe(() => {this.signup.reset();});

        if(this.navigate) {
            this.router.navigate(['/login']);
        }
    }

    /**
    * Checks if the signupform controls are valid and touched
    * @param control Either Username, Email or Password
    */
    isInvalid(control: any) {
        return this.signup.controls[control].invalid && this.signup.controls[control].touched;
    }

    /**
    * Checks if the signupform controls are pristine
    */
    isUntouched() {
        return this.signup.controls.Username.pristine || this.signup.controls.Password.pristine || this.signup.controls.Email.pristine;
    }

    /**
    * Validates the signupform values
    */
    isIncomplete() {
        return this.isInvalid('Username') || this.isInvalid('Email') || this.isInvalid('Password') || this.isUntouched();
    }
 }
