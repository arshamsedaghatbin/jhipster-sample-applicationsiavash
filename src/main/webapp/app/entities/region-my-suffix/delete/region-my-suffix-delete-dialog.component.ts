import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRegionMySuffix } from '../region-my-suffix.model';
import { RegionMySuffixService } from '../service/region-my-suffix.service';

@Component({
  templateUrl: './region-my-suffix-delete-dialog.component.html',
})
export class RegionMySuffixDeleteDialogComponent {
  region?: IRegionMySuffix;

  constructor(protected regionService: RegionMySuffixService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.regionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
