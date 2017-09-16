import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'case-rule',
  templateUrl: './case-rule.component.html',
  styleUrls: ['./case-rule.component.scss']
})
export class CaseRuleComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  /*保存*/
  testNamedRouter() {
    this.router.navigate([{outlets: {'right-detail': ['detail']}}], {relativeTo: this.route.parent});
  }
}
