import {Component} from "@angular/core";
import {UserService} from "./core/service/user.service";
import {CookieService} from "ngx-cookie";
@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private cookie: CookieService) {
    // const val1 = cookie.get('globals_user'),val2 =cookie.get('globals');
    //
    // if (!val1 || !val2) {
    //   // location.href = '/public/login.html'
    // }

  }
}
