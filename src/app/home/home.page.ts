import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: string = '';
  constructor(private router: Router,private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe( params=> {
      this.usuario = params['user'] || '';
    });
  }

  navigateToOtherPage() {
    this.router.navigate(['/detail-place']);
  }
}
