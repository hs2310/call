import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
// import { Observable } from '';
// import {connect,Client} from 'node_modules/paho/paho'
declare var Paho: any; 
@Component({
  selector: 'app-tts-call',
  templateUrl: './tts-call.component.html',
  styleUrls: ['./tts-call.component.css']
})
export class TtsCallComponent implements OnInit {
  client;
  schedule:boolean;
  today:Date;
  //@Input() ngxMaterialTimepickerTheme: NgxMaterialTimepickerTheme;
  constructor(){
    this.today=new Date();
  }
  ngOnInit(){
    this.client= new Paho.MQTT.Client("m16.cloudmqtt.com", 38353, "laptop");
    this.client.connect({onSuccess: this.onConnected.bind(this),
      keepAliveInterval: 10,
      userName: "fhkodrux",
      useSSL: true,
      password : "8hvoOCrP4S06"      
      })
    //this.client.subscribe("pi-status",0)
    this.client.onMessageArrived = this.onMessageArrived.bind(this);  
  }
  onMessageArrived(msg){
   alert(msg.payloadString);
  }
  onConnected(){
    console.log("connected");
    //this.client.send("pi-mob","hi");
    this.client.subscribe("pi-status",0);
  }
  onClickSubmit(data) {
    
    const [time, modifier] = data.time.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'pm') {
      hours = parseInt(hours, 10) + 12;
    }

    var t= hours + ':' + minutes;
    const momentDate = new Date(data.date); 

    var d = moment(momentDate).format("YYYY MM DD");
    var x = 'call|'+data.mob +'|'+ data.text+'|'+d+' '+t;
    console.log(x);
    this.client.send("pi-mob",x);
    alert("Call will be placed to : " + x);
 }
}  
