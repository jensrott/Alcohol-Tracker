import { Component, OnInit } from '@angular/core';
import { Tip } from '../models/Tip';
import { ActivatedRoute, Router } from '@angular/router';
import { TipsService } from '../services/tips.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-tip',
  templateUrl: './edit-tip.page.html',
  styleUrls: ['./edit-tip.page.scss'],
})
export class EditTipPage implements OnInit {

  titleErrors: Array<string>;
  descriptionErrors: Array<string>;
  submitted: boolean = false;
  tip: Tip = { id: "", title: "", description: "", accepted: false };
  id: string = this.route.snapshot.paramMap.get("id");

  constructor(
    private tipsService: TipsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTip();
  }

  getTip(): void {
    this.tipsService.getTip(this.id).subscribe((tip: any) => {
      this.tip = tip.tip;
      console.log(tip.tip);
    }),
      (error: Error) => {
        console.log(error)
      };
  }

  editTip(): void {
    this.tipsService.editTip(this.tip.title, this.tip.description, this.id)
      .subscribe((tip: any) => {
        console.log(tip)
        if (!tip.errors) {
          this.tip = tip.data;
          // TODO: show correctly updated tip when edited
          this.visitTipsPage();
        }
        this.titleErrors = tip.errors.title;
        this.descriptionErrors = tip.errors.description;
      }),
      (error: Error) => {
        console.log(error)
      };
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      this.editTip();
    }
  }

  visitTipsPage(): Promise<Boolean> {
    return this.router.navigateByUrl(`/tabs/tips`);
  }

  goBack(): void {
    return this.location.back();
  }

}
