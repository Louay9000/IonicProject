import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,



  ],
  declarations: [EventsPage]
})
export class EventPageModule {}
