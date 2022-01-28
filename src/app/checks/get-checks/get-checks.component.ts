import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-get-checks',
  templateUrl: './get-checks.component.html',
  styleUrls: ['./get-checks.component.css']
})
export class GetChecksComponent implements OnInit {

  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
    this._auth.getChecks()
    
  }

}
