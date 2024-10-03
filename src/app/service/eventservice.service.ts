import { Injectable } from '@angular/core';
import { AutheticationService } from '../authetication.service';
import {Firestore,addDoc,doc,collection,query,where} from '@angular/fire/firestore';
import { collectionData, docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { deleteDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';

export class Event{

  id?:string;
  userId:string;
  title:string;
  content:string;
  createdAt:any;


  constructor(userId:string,title:string,content:string,createdAt:any){

    this.userId = userId;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }

}


@Injectable({
  providedIn: 'root'
})
export class EventserviceService {
private userId:any;
private eventCollection:any;

  constructor(
    private authService : AutheticationService , private firestore:Firestore) {
    this.authService.getProfile().then(user=>{
      this.userId = user.uid;
      console.log(this.userId);

    })
  }


  addEvent(event:Event){
    event.userId = this.userId
    const eventRef = collection(this.firestore,"events")
    return addDoc(eventRef,event)
  }



  getEvents(userId:any)  : Observable<Event[]>{
    const eventRef = collection(this.firestore,'events');
    const refquery = query(eventRef,where('userId','==',userId));
    return collectionData(refquery,{idField:'id'}) as Observable<Event[]>
  }



getEventById(id:any) : Observable<Event> {
const EventRef = doc(this.firestore,`events/${id}`)
console.log(id)
return docData(EventRef,{idField:'id'}) as Observable<Event>
}





updateEvent(event:Event){
  const eventRef = doc(this.firestore,`events/${event.id}`)
  return updateDoc(eventRef,{title:event.title,content:event.content})
}





removeEvent(id:any){
  const eventRef = doc(this.firestore, `events/${id}`)
  return deleteDoc(eventRef)
}



}
