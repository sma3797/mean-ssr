import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    data: {
      seo: {
        title: "Home Page | Dynamic Title and Meta Tags Demo",
        metaTags: [
          {
            name: "description",
            content: "Something descripton",
          },
          { property: "og:title", content: "Something Home Page ⚔" },
          {
            proprety: "og:description",
            content: "Something og",
          },
        ],
      },
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
