import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { Routes, RouterModule } from '@angular/router';
import { ChatService } from './chat.service';
import { ChatIconComponent } from './chat-icon/chat-icon.component';
import { ModalModule } from 'ngx-bootstrap/modal';




const routes: Routes = [
  { path: '', redirectTo: 'chat_modal', pathMatch: 'full' },
  { path: 'chat_icon', component: ChatIconComponent },
  { path: 'chat_modal', component: ChatDialogComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),


  ],
  declarations: [ChatDialogComponent, ChatIconComponent],
  exports: [ChatDialogComponent, ChatIconComponent],
  providers: [ChatService]
})
export class ChatModule { }
