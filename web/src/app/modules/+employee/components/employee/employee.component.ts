import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ApiService } from '../../../../shared/services/api.service';
import { Subscription } from 'rxjs';
/*
import { Feature } from '../../services/features/feature';
import { FeaturesService } from '../../services/features/features.service.ts';
import { Tech } from '../../services/techs/tech';
import { TechsService } from '../../services/techs/techs.service.ts';
*/

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'employee',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our core.
  providers: [
    ApiService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './employee.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './employee.component.html'
})
export class EmployeeComponent {

  startupId: string;
  private subscription: Subscription;
  balance: string;

  constructor(private router:Router, 
              private activatedRoute: ActivatedRoute,
              private apiService: ApiService){

  }

  ngOnInit() {
    // subscribe to router event
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.startupId = param['id'];
        console.log(this.startupId);
      });
  }

  getBalance(){
    console.log(this.startupId);
    this.apiService.getBalance(this.startupId).then(balance => 
      this.balance = balance["message"]);
  }

  sendDeposit(value){
    console.log(this.startupId);
    console.log(value);
    this.apiService.sendDeposit(this.startupId,value);
  }

  sendWithdraw(value){
    this.apiService.sendWithdraw(this.startupId,value);
  }
}
