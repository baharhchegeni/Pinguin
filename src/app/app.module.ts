import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpMockApiInterceptor } from './roadmap-chart/service/mock/http-mock.interceptor';
import { CommonModule, DatePipe } from "@angular/common";
import { ChartBodyComponent } from './roadmap-chart/components/chart-body/chart-body.component';
import { MainComponent } from './roadmap-chart/components/main/main.component';
import { environment } from 'src/environments/environment';

export class AppConfig {
  apiEndpoint: string = "";
}
export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: environment.apiEndpoint
};

@NgModule({
  declarations: [
    AppComponent,
    ChartBodyComponent,
    MainComponent       
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockApiInterceptor,
      multi: true
    },
    {
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG
    },
    DatePipe,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
