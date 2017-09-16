import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageIndexComponent} from './component/message-index/message-index.component';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {MessageRouterModule} from './message.module.router';
import { SearchFriendComponent } from './component/search-friend/search-friend.component';


@NgModule({
  imports: [
    SharedComponentModule,
    CommonModule,
    MessageRouterModule
  ],
  declarations: [
    MessageIndexComponent,
    SearchFriendComponent
  ],
  entryComponents: []
})
export class MessageModule { }
