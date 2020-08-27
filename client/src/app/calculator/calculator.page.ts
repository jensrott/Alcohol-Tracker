import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';

import { DrinkEvent } from '../models/DrinkEvent';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calculator',
  templateUrl: 'calculator.page.html',
  styleUrls: ['calculator.page.scss']
})
export class CalculatorPage implements OnInit {

  drinkEvent: DrinkEvent;

  numberOfDrinks: number;
  alcoholLevel: number;
  volumePerDrink: number;
  timeSinceFirstDrink: number;
  gender: string;
  bodyWeight: number;

  soberText: string;
  bloodAlcoholConcentration: string;
  timeToBeSober: string;

  setCalculateDisabled: boolean = true;

  constructor(
    private pickerCtrl: PickerController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {

  }

  ngOnInit() {
  }

  checkInputStatus() {
  }

  calculate(): void {

    let amountOfStandardGlasses = (this.numberOfDrinks * this.volumePerDrink * this.alcoholLevel) / (25 * 5);

    let genderFactor;
    if (this.gender === "male") {
      genderFactor = 0.7;
    } else if (this.gender === "female") {
      genderFactor = 0.5;
    }
    let bloodAlcoholConcentrationData: number = (10 * amountOfStandardGlasses) / (this.bodyWeight * genderFactor) - (this.timeSinceFirstDrink - 0.5) * (this.bodyWeight * 0.002); // final formule;
    let timeToBeSoberData: number | any = 0.5 + (10 * amountOfStandardGlasses) / (this.bodyWeight * genderFactor) / (0.002 * this.bodyWeight) - 0.5 / (0.002 * this.bodyWeight);
    let timeToBeSoberTextData = '';

    this.bloodAlcoholConcentration = bloodAlcoholConcentrationData.toFixed(2);

    let amountWaitingTime = timeToBeSoberData.toFixed(2) - this.timeSinceFirstDrink;
    this.timeToBeSober = amountWaitingTime.toFixed(2);

    if (bloodAlcoholConcentrationData >= 0.50) {
      timeToBeSoberTextData = 'You are not allowed to drive! Please wait the amount of hours!'
    } else {
      timeToBeSoberTextData = 'You can still drive a car, but still be careful!'
    }

    this.soberText = timeToBeSoberTextData;


    this.showAlert();

    // if (this.numberOfDrinks && this.alcoholLevel && this.volumePerDrink && this.timeSinceFirstDrink && this.gender && this.bodyWeight) {
    //   this.setCalculateDisabled = false;
    // }
  }

  areaEmpty() {
    if (this.numberOfDrinks && this.alcoholLevel && this.volumePerDrink && this.timeSinceFirstDrink && this.gender && this.bodyWeight != null) {
      this.setCalculateDisabled = false;
    }
  }

  reset(): void {
    this.numberOfDrinks = null;
    this.alcoholLevel = null;
    this.volumePerDrink = null;
    this.timeSinceFirstDrink = null;
    this.gender = null;
    this.bodyWeight = null;
    this.setCalculateDisabled = true;
    this.showToast();
  }

  async showAlert(): Promise<any> {
    const alert = await this.alertCtrl.create({
      header: 'Drunk level',
      subHeader: this.soberText,
      message: this.showDrunkLevel(),
      buttons: ['OK']
    });

    await alert.present();
  }

  async showToast(): Promise<any> {
    const toast = await this.toastCtrl.create({
      message: 'Inputs are reset!',
      duration: 2000
    });
    toast.present();
  }

  showDrunkLevel(): string {
    const text = `<p>${this.bloodAlcoholConcentration} ‰ <br/> 
    You still need to wait ${this.timeToBeSober} hours</p>`
    return text;
  }

  selectOptions(): void { }

  async showBasicPicker(): Promise<any> {
    let opts: PickerOptions = {
      buttons: [],
      columns: []
    }
    await this.pickerCtrl.create(opts);
  }

}
