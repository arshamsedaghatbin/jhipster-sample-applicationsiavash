import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskMySuffix } from '../task-my-suffix.model';
import { TaskMySuffixService } from '../service/task-my-suffix.service';

@Component({
  templateUrl: './task-my-suffix-delete-dialog.component.html',
})
export class TaskMySuffixDeleteDialogComponent {
  task?: ITaskMySuffix;

  constructor(protected taskService: TaskMySuffixService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.taskService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
