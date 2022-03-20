import { Component } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { filter, map, mergeMap, tap } from "rxjs/operators";
import { SeoService } from "@shared/services/index.service";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = "MEAN - SSR";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private seoService: SeoService) {}
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === "primary"),
        mergeMap((route) => route.data),
      )
      .subscribe((data) => {
        let seoData = data["seo"];
        this.seoService.updateTitle(seoData["title"]);
        this.seoService.updateMetaTags(seoData["metaTags"]);
      });
  }
}
