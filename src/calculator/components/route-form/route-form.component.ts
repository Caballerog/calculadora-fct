import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ORIGIN } from "../../constants/route.constants";

@Component({
  selector: "app-route-form",
  templateUrl: "./route-form.component.html",
  styleUrls: ["./route-form.component.css"]
})
export class RouteFormComponent implements OnInit {
  routeForm: FormGroup;
  originName: string;
  businessNumber = 0;

  @Output() formEvent = new EventEmitter<any>();
  @Input("validDestination") private validDestination: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.originName = ORIGIN;
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    this.addFormElement();
  }

  public initForm() {
    this.routeForm = this.formBuilder.group({
      destinations: this.formBuilder.array([
        this.formBuilder.group({
          destination: ["", Validators.required],
          timesVisited: [
            "",
            [Validators.required, Validators.pattern("^[0-9]+$")]
          ]
        })
      ])
    });
  }

  public get destinations() {
    return this.routeForm.get("destinations") as FormArray;
  }

  public get controls() {
    return this.destinations.controls;
  }

  public isValid(destinationIndex: number, field: string) {
    return (
      this.destinations.controls[destinationIndex]["controls"][field].status ===
        "INVALID" &&
      !this.destinations.controls[destinationIndex]["controls"][field].pristine
    );
  }

  public addDestination(index: number) {
    this.submitForm(index, "addRoute");
    this.businessNumber++;
    console.log(this.routeForm);
  }

  private addFormElement() {
    if (this.validDestination) {
      this.destinations.push(
        this.formBuilder.group({ destination: "", timesVisited: "" })
      );
    }
  }

  private removeFormElement(index: number) {
    this.destinations.removeAt(index);
    this.businessNumber--;
  }

  public deleteDestination(index: number) {
    this.submitForm(index, "deleteRoute");
    this.removeFormElement(index);
  }

  private submitForm(index: number, action: string) {
    this.formEvent.emit({
      action,
      formRoute: {
        ...this.destinations.controls[index].value,
        timesVisited: +this.destinations.controls[index].value.timesVisited
      }
    });
  }
}
