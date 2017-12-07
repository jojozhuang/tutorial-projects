import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatInputModule } from '@angular/material';
import { HttpModule} from "@angular/http";
import { HttpClientModule } from '@angular/common/http';

import { AlertModule } from 'ngx-bootstrap';
import { ProductService } from './product.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ErrorInterceptorProvider } from './http.interceptor';

const appRoutes: Routes = [
  { path: '', component: UserloginComponent },
  { path: 'app-mainpage', component: MainpageComponent },
  { path: 'productlist', component: ProductlistComponent },
  { path: 'productadd', component: ProductaddComponent },
  { path: 'productadd/:id', component: ProductaddComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    UserloginComponent,
    ProductaddComponent,
    ProductlistComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    AlertModule.forRoot()
  ],
  providers: [ProductService, ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
