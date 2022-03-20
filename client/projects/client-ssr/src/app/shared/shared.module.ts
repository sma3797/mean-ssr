// Angular imports
import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpClientModule } from "@angular/common/http";
// 3rd Party imports
// Local imports
import { MaterialModule } from "./modules/material.module";

const services: any = [];

const components: any = [];

const common = [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule];

@NgModule({
  declarations: [...components],
  imports: [...common],
  providers: [...services],
  exports: [...components, ...common],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...services],
    };
  }
}
