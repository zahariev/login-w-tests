import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Data,
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
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter((route) => route.outlet === PRIMARY_OUTLET))
      .subscribe((route) => {
        const snapshot = this.router.routerState.snapshot;
        this.breadcrumbs = [];

        const url = snapshot.url;
        const routeData = route.snapshot.data;

        console.log(routeData);
        const label = routeData.breadcrumb;
        const params = snapshot.root.params;

        this.breadcrumbs.push({
          url,
          label,
          params,
        });
      });
  }
}
