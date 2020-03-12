import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat-icon',
  templateUrl: './chat-icon.component.html',
  styleUrls: ['./chat-icon.component.css']
})
export class ChatIconComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  openForm() {
    this.router.navigate(['chat_modal']);
  }

}
