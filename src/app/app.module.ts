import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

//THIS IS FROM WHERE WE INTIALISE OUR FIREBASE CONFIG
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { JobCardComponent } from './widgets/job-card/job-card.component';
import { UserAuthService } from './service/user-auth.service';
import { FooterComponent } from './widgets/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WelcomePageComponent,
    JobCardComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot([
      {path: '', component: WelcomePageComponent},
      {path: 'home', component: HomePageComponent}
    ])
  ],
  providers: [UserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
