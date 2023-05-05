import { NgModule,ModuleWithProviders  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule,} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table' ; 
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule,  } from "@angular/material/button";
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
// import {DateRangePickerModule} from "ngx-bootstrap/datepicker";

@NgModule({
  imports: [
    
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule ,
    MatTableModule ,
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTooltipModule,

  ],
  exports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule ,
    MatTableModule ,
    MatDialogModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTooltipModule,
    NgSelectModule,
    NgMultiSelectDropDownModule,

  ]
})
export class MaterialModule {static forRoot(): ModuleWithProviders<MaterialModule> {
    return {
      ngModule: MaterialModule,
      providers: []
    };
  } }