import {Component, OnInit, ViewChild} from '@angular/core';
import {StripeService, StripeCardComponent, StripeCardNumberComponent} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app-mobile.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild(StripeCardComponent) card?: StripeCardComponent;

  title = 'shop';

  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#666EE8',
        color: 'red',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: 'red'
        }
      }
    }
  };

  cvcOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#27374D',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#27374D'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'fr',
  };

  stripeTest?: FormGroup;

  url = "http://localhost:8080/api"

  constructor(private fb: FormBuilder,
              private stripeService: StripeService,
              private http : HttpClient
  ) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });

  //   Test api
    this.http.get(this.url)
      .subscribe((res) => {
        console.log("Response : ", res);
      })
  }

  createToken(): void {
    const name = this.stripeTest!.get('name')!.value;
    this.stripeService
      .createToken(this.card!.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
          this.purchase(
            {
              id : result.token.id,
              name,
              amount : "3.50"
            }
          )
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  purchase(data : any) : void {
    this.http.post(this.url, data)
      .subscribe((res) => {
        console.log("Res : ", res)
      })
  }

}
