import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[myError]"
})
export class MyErrorDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set myError(params) {
    if (this.existErrors(params)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private existErrors(params) {
    const { control, field, errorType } = params;
    return control[field].errors[errorType];
  }
}
