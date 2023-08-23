import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckboxModule,
    ReactiveFormsModule

  ], exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ], providers: [
    provideNgxMask(),
  ]
})
export class SharedModule { }
