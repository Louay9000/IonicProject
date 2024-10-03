import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { collection } from '@firebase/firestore';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';
import { EventserviceService } from 'src/app/service/eventservice.service';
import { Event } from 'src/app/service/eventservice.service';
import { Input } from '@angular/core';
import { EventPage } from '../event/event.page';


@Component({
  selector: 'app-event',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {


@ViewChild(IonModal) modal:IonModal;


userId:any;
title:string;
content:string;
createdAt:any;
events:Event[] = [];





  constructor(private router:Router,private authService:AutheticationService,
    private eventService:EventserviceService,private toastCtrl:ToastController,
  private modalCtrl:ModalController) { }

  ngOnInit() {
    this.authService.getProfile().then(user=>{
    this.userId =user.uid
    console.log(this.userId);

    this.eventService.getEvents(this.userId).subscribe(res=>{
      this.events = res


  })

  })}




confirm(){
this.addEvent();
}



addEvent(){
this.eventService.addEvent({userId:"",title:this.title,content:this.content,createdAt:new Date()}).then((async ()=>{
  const toast = await this.toastCtrl.create({  message:'Event added successfully!',
    duration:2000
    })
toast.present()

})).catch (async (error)=>{
  const toast = await this.toastCtrl.create({
      message:'Error adding event!',
    duration:2000
    })
  toast.present()})
}




cancel(){
this.modal.dismiss(null,'cancel');
}



async openEvent(event:Event){
  const modal = await this.modalCtrl.create({
    component:EventPage,
    componentProps:{id:event.id},
    breakpoints: [0, 0.5, 0.8],
    initialBreakpoint: 0.6
  })

  await modal.present()
}

logout(){
  this.authService.signOut().then(()=>{
    this.router.navigateByUrl('/home')
  })
}











}









