import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../shared/github.service';

@Component({
  selector: 'repo-browser',
  templateUrl: './app/github/repo-browser/repo-browser.component.html',
  styleUrls: ['./app/github/repo-browser/repo-browser.component.css']
})
export class RepoBrowserComponent {

  constructor(private router: Router, private github: GithubService) {
  }

  searchForOrg(orgName: string) {
    this.github.getOrg(orgName)
      .subscribe(({name}) => {
        console.log(name);
        this.router.navigate(['/github', orgName]);
      });
  }

}
