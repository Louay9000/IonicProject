import { Component, Input, OnInit } from '@angular/core';
import { Event,EventserviceService } from '../service/eventservice.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
@Input() id:string
event:Event



  constructor(private eventService:EventserviceService,
    private toastCtrl:ToastController,
    private modalCtrl:ModalController
  ) { }


  ngOnInit() {

    this.eventService.getEventById(this.id).subscribe(res=>{
    this.event = res
    console.log(this.id)
    })
  }



async updateEvent(){
this.eventService.updateEvent(this.event)
const toast = await this.toastCtrl.create({
message:'Event updated successfully!',
duration:2000
})
toast.present()
this.modalCtrl.dismiss()
}



async deleteEvent(){
console.log(this.id)
  await this.eventService.removeEvent(this.id)
  this.modalCtrl.dismiss()

}




}


