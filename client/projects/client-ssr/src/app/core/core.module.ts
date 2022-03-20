import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";

// Local Import
import { SharedModule } from "@shared/shared.module";

// Store declarations

const services: any[] = [];
@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule],
  providers: [...services],
})
export class CoreModule {}
