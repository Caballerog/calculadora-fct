import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResultsComponent } from "./components/results/results.component";
import { RouteFormComponent } from "./components/route-form/route-form.component";

import { ReactiveFormsModule } from "@angular/forms";
import { WrapperComponent } from "./components/wrapper/wrapper.component";
import { MapComponent } from "./components/map/map.component";
import { AppMaterialModule } from "src/app/app-material/app-material.module";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { MyErrorDirective } from "./directives/my-error.directive";
import { DisableControlDirective } from "./directives/disable-control.directive";

@NgModule({
  declarations: [
    ResultsComponent,
    RouteFormComponent,
    WrapperComponent,
    MapComponent,
    ToolbarComponent,
    MyErrorDirective,
    DisableControlDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MatSnackBarModule
  ],
  exports: [
    ResultsComponent,
    RouteFormComponent,
    WrapperComponent,
    MapComponent,
    ToolbarComponent
  ]
})
export class CalculatorModule {}
