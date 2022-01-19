import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { CheckboxRenderer } from './checkbox-renderer.component';
import { ColDef } from 'ag-grid-community/dist/lib/main';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'my-app',
  template: `
    <h2 class="title">VOD</h2>

    <div class="page-grid-container xg-frame-2 button-space">
      <h3 class="title">Ad Server</h3>

      <ag-grid-angular
        #agGrid
        style="width: 100vw; height: 500px;"
        id="myGrid"
        [rowData]="lmkData"
        class="ag-theme-alpine"
        [columnDefs]="colDefs"
        [frameworkComponents]="frameworkComponents"
      ></ag-grid-angular>

      <div class="child-panel">
        <div class="xg-frame-2 half-width-frame">
          <h4 class="title">General</h4>

          <div class="xg-text-group" [ngClass]="{ 'xg-required': required }">
            <label class="xg-text-label" for="inputControl">Name </label>
            <input
              type="text"
              class="xg-text-box"
              name="textInput"
              [(ngModel)]="inputModelValue"
              [placeholder]="placeholder"
            />
          </div>

          <div class="xg-text-group" [ngClass]="{ 'xg-required': required }">
            <label class="xg-text-label" for="inputControl">Instruction </label>
            <textarea
              type="text"
              class="xg-text-box"
              name="textInput"
              [(ngModel)]="inputModelValue"
              [placeholder]="placeholder"
            ></textarea>
          </div>

          <div class="form-fields-grid">
            <div class="xg-text-group" [ngClass]="{ 'xg-required': required }">
              <label class="xg-text-label" for="inputControl"
                >Advertising Package
              </label>
              <input
                type="text"
                class="xg-text-box"
                name="textInput"
                [(ngModel)]="inputModelValue"
                [placeholder]="placeholder"
              />
            </div>

            <div class="xg-text-group" [ngClass]="{ 'xg-required': required }">
              <label class="xg-text-label" for="inputControl"
                >Ad Link Style
              </label>
              <input
                type="text"
                class="xg-text-box"
                name="textInput"
                [(ngModel)]="inputModelValue"
                [placeholder]="placeholder"
              />
            </div>
          </div>
        </div>

        <div class="xg-frame-2 half-width-frame">
          <h4 class="title">Advertising Space</h4>

          <ag-grid-angular
            #agGrid1
            style="width: 100%; height: 300px;"
            id="myGrid2"
            class="ag-theme-alpine"
            [defaultColDef]="defaultColDef"
            [columnDefs]="colDefsRestriction"
            [rowData]="restriction"
            [frameworkComponents]="frameworkComponents"
            [gridOptions]="gridOptions"
            (gridReady)="onGridReady($event)"
          ></ag-grid-angular>
        </div>

        <div class="xg-frame-2 half-width-frame">
          <h4 class="title">Content Restriction</h4>

          <div class="checkbox-row">
            <div
              class="xg-mat-checkbox"
              [ngClass]="{ 'xg-required': required }"
            >
              <mat-checkbox
                [(ngModel)]="checkboxModelValue"
                [(indeterminate)]="indeterminate"
                [labelPosition]="labelLeft ? 'before' : 'after'"
                [required]="required"
                [disabled]="disabled || readOnly"
                #xgCheckboxModel="ngModel"
              >
                <span [title]="labelName"> Apply Ad Restrictions </span>
              </mat-checkbox>
            </div>
          </div>
          <ag-grid-angular
            #agGrid1
            style="width: 100%; height: 300px;"
            id="myGrid2"
            class="ag-theme-alpine"
            [defaultColDef]="defaultColDef"
            [columnDefs]="colDefsRestriction"
            [rowData]="restriction"
            [frameworkComponents]="frameworkComponents"
            [gridOptions]="gridOptions"
            (gridReady)="onGridReady($event)"
          ></ag-grid-angular>
        </div>
        <div class="xg-frame-2 half-width-frame">
          <h4 class="title">Content Targeting</h4>

          <div class="checkbox-row">
            <div
              class="xg-mat-checkbox"
              [ngClass]="{ 'xg-required': required }"
            >
              <mat-checkbox
                [(ngModel)]="checkboxModelValue"
                [(indeterminate)]="indeterminate"
                [labelPosition]="labelLeft ? 'before' : 'after'"
                [required]="required"
                [disabled]="disabled || readOnly"
                #xgCheckboxModel="ngModel"
              >
                <span [title]="labelName"> Target to specifc content </span>
              </mat-checkbox>
            </div>
          </div>

          <ag-grid-angular
            #agGrid1
            style="width: 100%; height: 300px;"
            id="myGrid2"
            class="ag-theme-alpine"
            [defaultColDef]="defaultColDef"
            [columnDefs]="colDefsRestriction"
            [rowData]="restriction"
            [frameworkComponents]="frameworkComponents"
            [gridOptions]="gridOptions"
            (gridReady)="onGridReady($event)"
          ></ag-grid-angular>
        </div>
      </div>

      <div class="overlay">
        <div class="modal">
          <h3 class="header">Content Set</h3>

          <div class="xg-frame-2">
            <h3 class="header">Category</h3>
          
          </div>

          <div class="modal-body-grid">
            <div class="xg-frame-2">
              <h3 class="header">Series Mask</h3>
            </div>

            <div class="xg-frame-2">
              <h3 class="header">VOD Channel</h3>
            </div>

            <div class="xg-frame-2">
              <h3 class="header">Custom Video Group</h3>
            </div>

            <div class="xg-frame-2">
              <h3 class="header">Programme Mask</h3>
            </div>
          </div>

          <div class="footer">
            <div class="button-cancel">CANCEL</div>
            <div class="button-apply">APPLY</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  private gridOptions;
  private columnDefs;
  private defaultColDef;
  private gridOptionsApi;
  private frameworkComponents;

  private lmkData: any;
  private colDefs: ColDef[];

  private restriction: any[] = [{ Restriction: '123', Exclude: 'true' }];
  private colDefsRestriction = [{ field: 'Restriction' }, { field: 'Exclude' }];

  private colDefsHC = [
    {
      field: 'campNo',
      enableRowGroup: true,
    },
    {
      field: 'cmodNo',
      enableRowGroup: true,
    },
    {
      field: 'odlbNo',
      enableRowGroup: true,
    },
    {
      field: 'progNo',
      enableRowGroup: true,
    },
    {
      field: 'progName',
      enableRowGroup: true,
    },
    {
      field: 'episNo',
      enableRowGroup: true,
    },
    {
      field: 'episName',
      enableRowGroup: true,
    },
    {
      field: 'platNo',
      enableRowGroup: true,
    },
    {
      field: 'platName',
      enableRowGroup: true,
    },
    {
      field: 'priorityInd',
      enableRowGroup: true,
    },
    {
      field: 'priorityIndText',
      enableRowGroup: true,
    },
    {
      field: 'geogNo',
      enableRowGroup: true,
    },
    {
      field: 'geogName',
      enableRowGroup: true,
    },
    {
      field: 'exclusiveYn',
      enableRowGroup: true,
    },
    {
      field: 'adspNo',
      enableRowGroup: true,
    },
    {
      field: 'adspName',
      enableRowGroup: true,
    },
    {
      field: 'sttDate',
      enableRowGroup: true,
    },
    {
      field: 'endDate',
      enableRowGroup: true,
    },
    {
      field: 'duration',
      enableRowGroup: true,
    },
    {
      field: 'durationAsString',
      enableRowGroup: true,
    },
    {
      field: 'demoNo',
      enableRowGroup: true,
    },
    {
      field: 'demoShortName',
      enableRowGroup: true,
    },
    {
      field: 'seqNo',
      enableRowGroup: true,
    },
    {
      field: 'bstpNo',
      enableRowGroup: true,
    },
    {
      field: 'bstpCode',
      enableRowGroup: true,
    },
    {
      field: 'budget',
      enableRowGroup: true,
    },
    {
      field: 'prevBudget',
      enableRowGroup: true,
    },
    {
      field: 'adlinkStyleNo',
      enableRowGroup: true,
    },
    {
      field: 'instructionText',
      enableRowGroup: true,
    },
    {
      field: 'cpt',
      enableRowGroup: true,
    },
    {
      field: 'prevCpt',
      enableRowGroup: true,
    },
    {
      field: 'imprTotTgt',
      enableRowGroup: true,
    },
    {
      field: 'prevImprTotTgt',
      enableRowGroup: true,
    },
    {
      field: 'deliveryType',
      enableRowGroup: true,
    },
    {
      field: 'actualsBillingYn',
      enableRowGroup: true,
    },
    {
      field: 'prevActualsBillingYn',
      enableRowGroup: true,
    },
    {
      field: 'invoicedYn',
      enableRowGroup: true,
    },
    {
      field: 'lineExceptionYn',
      enableRowGroup: true,
    },
    {
      field: 'externalCampId',
      enableRowGroup: true,
    },
    {
      field: 'cmodExternalId',
      enableRowGroup: true,
    },
    {
      field: 'cmasExternalId',
      enableRowGroup: true,
    },
    {
      field: 'origMaxImpressions',
      enableRowGroup: true,
    },
    {
      field: 'maxImpressions',
      enableRowGroup: true,
    },
    {
      field: 'imprTotAct',
      enableRowGroup: true,
    },
    {
      field: 'nwmdWorkflowstatusNo',
      enableRowGroup: true,
    },
    {
      field: 'applyAdrestYn',
      enableRowGroup: true,
    },
    {
      field: 'allContentYn',
      enableRowGroup: true,
    },
    {
      field: 'name',
      enableRowGroup: true,
    },
    {
      field: 'cmasNameLastSaved',
      enableRowGroup: true,
    },
    {
      field: 'cmasNameLastCalc',
      enableRowGroup: true,
    },
    {
      field: 'adspPackNo',
      enableRowGroup: true,
    },
    {
      field: 'adspPackName',
      enableRowGroup: true,
    },
    {
      field: 'contentGroupNo',
      enableRowGroup: true,
    },
    {
      field: 'contentGroupDescription',
      enableRowGroup: true,
    },
    {
      field: 'prevSttDate',
      enableRowGroup: true,
    },
    {
      field: 'prevEndDate',
      enableRowGroup: true,
    },
    {
      field: 'prevBstpNo',
      enableRowGroup: true,
    },
    {
      field: 'extRef',
      enableRowGroup: true,
    },
    {
      field: 'prevExtRef',
      enableRowGroup: true,
    },
    {
      field: 'industryCode',
      enableRowGroup: true,
    },
    {
      field: 'userFieldValue1',
      enableRowGroup: true,
    },
    {
      field: 'userFieldValue2',
      enableRowGroup: true,
    },
    {
      field: 'copyRowAsNewYn',
      enableRowGroup: true,
    },
    {
      field: 'spoolNo',
      enableRowGroup: true,
    },
    {
      field: 'segmId',
      enableRowGroup: true,
    },
    {
      field: 'segmDescription',
      enableRowGroup: true,
    },
    {
      field: 'budgetPerc',
      enableRowGroup: true,
    },
    {
      field: 'imprTotTgtAds',
      enableRowGroup: true,
    },
    {
      field: 'imprTotActAds',
      enableRowGroup: true,
    },
    {
      field: 'paybackNlin',
      enableRowGroup: true,
    },
  ];

  constructor(private httpClient: HttpClient) {
    this.defaultColDef = {
      width: 120,
      sortable: true,
      resizable: true,
    };
    this.gridOptions = {
      suppressAggFuncInHeader: true,
      rowHeight: 34,
      rowSelection: 'multiple',
      checkboxSelection: true,

      // columnDefs: this.colDefs,
      defaultColDef: {
        flex: 1,
      },
      aggFuncs: {
        // this overrides the grids built-in sum function
        roundSum: (params) => {
          let sum = 0;
          params.values.forEach((value) => (sum += value));
          return Math.round(sum * 100) / 100;
        },
      },
    };
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRenderer,
    };
  }

  ngOnInit() {
    this.httpClient
      .get<any>('assets/campaigns-725252-ad-server-adServerDetails.json')
      .subscribe((res) => {
        console.log('data recieved', res);

        this.lmkData = res.data;
        console.log(Object.keys(this.lmkData[0]));

        var colDefs = Object.keys(this.lmkData[0]).map((k) => {
          return {
            field: k,
            enableRowGroup: true,
          };
        });

        var nameCol = colDefs.find((c) => (c.field = 'name'));
        //@
        nameCol.width = 600;
        this.colDefs = [nameCol, ...colDefs.filter((cd) => cd != nameCol)];

        console.log('this.colDefs', this.colDefs);
        console.log('this.lmkData', this.lmkData);
        console.log('this.gridApi', this.gridApi);

        // this.gridApi.setColDefs(this.colDefs);
        this.gridApi.setRowData(this.lmkData);
      });
  }

  onGridReady(params) {
    // console.log("grid ready");
    // this.gridApi = params.api;
    // this.gridColumnApi = params.columnApi;
    // this.gridOptionsApi = this.gridOptions.api;
  }
}
