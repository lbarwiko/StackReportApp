import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NavController, NavParams } from 'ionic-angular';
import { Security } from '../../models/security';


@Component({
  selector: 'page-security',
  templateUrl: 'security.html'
})

export class SecurityPage {

	security: Security;

	constructor() {

	}

}
