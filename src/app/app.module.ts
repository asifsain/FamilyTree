import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SizerComponentComponent } from './sizer-component/sizer-component.component';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { dataService } from './services/data';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    SizerComponentComponent,
    TreeViewComponent,
    TreeNodeComponent
  ],
  imports: [
    BrowserModule, NgbModule.forRoot()
  ],
  providers: [dataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
