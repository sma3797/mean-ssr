// Angular Imports
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
// 3rd Party Imports
// Local Imports
import { reducers, metaReducers } from "@store";
import { environment } from "@env";
import { SharedModule } from "@shared/shared.module";
import { CoreModule } from "@core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutModule } from "./layout/layout.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    SharedModule.forRoot(),
    CoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    LayoutModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

// tslint:disable-next-line
export class AppModule {}
