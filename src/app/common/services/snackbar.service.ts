import { ComponentType } from '@angular/cdk/portal';
import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(private snackBar: MatSnackBar, private zone: NgZone) { }

    openSnackBar(message: string, duration: number = 3000, className: string = 'default') {
        this.zone.run(() => {
            this.snackBar.open(message, 'Close', {
                duration,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: [className],
            });
        });
    }

    openSnackBarWithComponent(component: ComponentType<any>, duration: number = 3000, className: string = 'default') {
        this.zone.run(() => {
            this.snackBar.openFromComponent(component, {
                duration,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: [className],
            });
        });
    }

    showSuccess(message: string) {
        this.openSnackBar(message, 3000, 'success');
    }

    showError(message: string) {
        this.openSnackBar(message, 5000, 'error');
    }

    showWarning(message: string) {
        this.openSnackBar(message, 4000, 'warning');
    }

    showErrorWithComponent(component: ComponentType<any>) {
        this.openSnackBarWithComponent(component, 5000, 'error');
    }
}
