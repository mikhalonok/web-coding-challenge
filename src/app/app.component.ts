import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {catchError, filter, map, of, Subject, takeUntil} from 'rxjs';
import {HttpService} from './services/http.service';
import {HttpClientModule} from '@angular/common/http';
import {emailValidator} from "./validators/email";
import {passwordLettersCaseValidator} from "./validators/password-letters-case-validator";
import {noNameInPasswordValidator} from './validators/no-name-in-password';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, HttpClientModule],
  providers: [HttpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  public signUpForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    }),
    email: new FormControl('', {
      validators: [Validators.required, emailValidator()],
      updateOn: 'blur'
    }),
    password: new FormControl('', {
      validators: [...this.getPasswordInitialValidators()],
      updateOn: 'blur'
    })
  });

  private readonly minPasswordCharacters = 8;
  private readonly destroy$ = new Subject<boolean>();

  constructor(private httpService: HttpService) {}

  public ngOnInit(): void {
    this.onFormChanges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onSubmit(): void {
    this.httpService.signUp({
      firstName: this.signUpForm.get('firstName')?.value || '',
      lastName: this.signUpForm.get('lastName')?.value || '',
      email: this.signUpForm.get('email')?.value || '',
      password: this.signUpForm.get('password')?.value || ''
    })
      .pipe(
        catchError((error) => {
          alert(error);
          return of(null);
        }),
        filter(Boolean)
      )
      .subscribe(() => {
        alert('Signed up successfully!');
        this.signUpForm.reset();
      })
  }

  private onFormChanges(): void {
    this.signUpForm.valueChanges
      .pipe(
        map(({ firstName, lastName }) => {
          return { firstName, lastName }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(({ firstName, lastName }) => {
        const passwordControl = this.signUpForm.get('password') as FormControl;

        passwordControl.setValidators(
          [
            ...this.getPasswordInitialValidators(),
            noNameInPasswordValidator(firstName || '', lastName || ''),
          ]
        );

        passwordControl.updateValueAndValidity({ emitEvent: false });
      });
  }

  private getPasswordInitialValidators(): ValidatorFn[] {
    return [
      Validators.required,
      Validators.minLength(this.minPasswordCharacters),
      passwordLettersCaseValidator()
    ];
  }
}

