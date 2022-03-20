import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, SharedModule],
})
export class LayoutModule {}
