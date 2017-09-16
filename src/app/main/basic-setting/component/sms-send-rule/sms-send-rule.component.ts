import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'sms-send-rule',
  templateUrl: './sms-send-rule.component.html',
  styleUrls: ['./sms-send-rule.component.scss']
})
export class SmsSendRuleComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  testNamedRouter() {
    this.router.navigate([{outlets: {'right-detail': ['detail']}}], {relativeTo: this.route.parent});
  }
}
