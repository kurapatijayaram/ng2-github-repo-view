import { Component } from "@angular/core";

@Component({
  selector: 'home',
  template: `
            <div class="container"><h1>Angular2 Demo</h1>
              <repo-viewer handle="https://github.com/kurapatijayaram/angular2-rest"></repo-viewer>
            </div>
            `
})
export class HomeComponent {
}
