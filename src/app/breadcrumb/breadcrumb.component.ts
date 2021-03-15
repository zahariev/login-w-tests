import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  PRIMARY_OUTLET,
  Router,
} from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(filter((route) => route.outlet === PRIMARY_OUTLET))
      .subscribe((route) => {
        let routeSnapshot = route.snapshot;

        this.breadcrumbs = [];

        let url = '';

        while (routeSnapshot.firstChild) {
          routeSnapshot = routeSnapshot.firstChild;

          const path = routeSnapshot.routeConfig.path;

          if (!path.length) {
            continue;
          }

          url += `/${path}`;

          const label = routeSnapshot.data.breadcrumb;
          const params = routeSnapshot.params;

          this.breadcrumbs.push({
            url,
            label,
            params,
          });
        }
      });
  }
  private createUrl(route: ActivatedRouteSnapshot) {
    return route.url.map((s) => s.toString()).join('/');
  }
}
