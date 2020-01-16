import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges{
  ngOnChanges(changes): void {
    console.log("se ha reiniciado el contador a:", changes.init.currentValue);
    
    this.startCountDown();
  }
  ngOnInit():void{
    this.startCountDown();
  }
  
  ngOnDestroy(): void {
    this.clearTimeout();
  }

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init:number=null;

  public counter:number=0;
  private countdownTimerRef : any = null;

  constructor() { }


  startCountDown(){
    if (this.init!=null && this.init > 0 ){
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown(){
    this.countdownTimerRef = setTimeout(() => {
      this.counter = this.counter -1;
      this.processCount();
    }, 1000);
  }

  private clearTimeout(){
    if(this.countdownTimerRef){
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  processCount(){
    // emite evento de cuenta
    console.log("La cuenta es: ", this.counter);
    this.onDecrease.emit(this.counter);
    if(this.counter<=0){
       // Emite cuenta terminada
      console.log("Cuenta terminada");     
      this.onComplete.emit();
    } else {
      this.doCountdown();
    }
    
  }
  
}
