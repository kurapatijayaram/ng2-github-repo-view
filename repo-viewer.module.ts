import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RepoViewer } from './repo-viewer.component';
import { RepoViewerService } from './repo-viewer.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [RepoViewer],
  exports: [RepoViewer],
  providers: [RepoViewerService]
})
export class RepoViewerModule {

}