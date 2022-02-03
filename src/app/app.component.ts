import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { CheckboxRenderer } from './checkbox-renderer.component';
import { ColDef } from 'ag-grid-community/dist/lib/main';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { adServerDetailsData } from './789065/adServerDetails';
import { onDemandDetailsAdSpaceData } from './789065/onDemandDetailsAdSpace';
import { onDemandDetailsContentSetDetailsData } from './789065/onDemandDetailsContentSetDetails';
import { onDemandDetailsRestrictionData } from './789065/onDemandDetailsRestriction';


@Component({
  selector: 'my-app',
  template: `
    <h2 class="title">VOD</h2>

    <div class="page-grid-container xg-frame-2 button-space">


    <div class="action-bar">
    <div class="title">
    Ad Server
    </div>
        <div class="buttons">
          <div class="action-button"  (click)="displayModal = !displayModal">ADD</div>
          <div class="action-button"  (click)="displayModal = !displayModal">EDIT</div>
        </div>
  </div>

      <ag-grid-angular
        #agGrid
        style="width: 100vw; height: 500px;"
        id="myGrid"
        [rowData]="adServerDetails"
        class="ag-theme-alpine"
        [columnDefs]="colDefsHC"
        [frameworkComponents]="frameworkComponents"
        [rowSelection]="'single'"
        (selectionChanged)="mainSelectionChanged($event)"
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
              [value]="selectedRow ? selectedRow.name : ' ' "
              [placeholder]="placeholder"
            />
          </div>

          <div class="xg-text-group" [ngClass]="{ 'xg-required': required }">
            <label class="xg-text-label" for="inputControl">Instruction </label>
            <textarea
              type="text"
              class="xg-text-box"
              name="textInput"
              [value]="selectedRow ? selectedRow.instructionText : ' ' "
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

        <div class="action-bar">
        <div class="title">
          Advertising Space
        </div>
            <div class="buttons">
              <div class="action-button"  (click)="displayModal = !displayModal">ADD</div>
              <div class="action-button"  (click)="displayModal = !displayModal">EDIT</div>
            </div>
      </div>

          <ag-grid-angular
            #agGrid1
            style="width: 100%; height: 300px;"
            id="myGrid2"
            class="ag-theme-alpine"
            [defaultColDef]="onDemandDetailsAdSpace"
            [columnDefs]="onDemandDetailsAdSpaceColDefs"
            [rowData]="onDemandDetailsAdSpace"
            [frameworkComponents]="frameworkComponents"
            [gridOptions]="gridOptions"
            (gridReady)="onGridReady($event)"
          ></ag-grid-angular>
        </div>

        <div class="xg-frame-2 half-width-frame">

        <label><input type="checkbox" name="checkbox" [(ngModel)]="allowAR" >Apply ad restrictions</label>

        <div *ngIf="allowAR">

          <div class="action-bar">
            <div class="title">
            Advertising Restriction
            </div>
                <div class="buttons">
                  <div class="action-button"  (click)="displayModal = !displayModal">ADD</div>
                  <div class="action-button"  (click)="displayModal = !displayModal">EDIT</div>
                </div>
          </div>
          <ag-grid-angular
            #agGrid1
            style="width: 100%; height: 300px;"
            id="myGrid2"
            class="ag-theme-alpine"
            [defaultColDef]="defaultColDef"
            [columnDefs]="onDemandDetailsRestrictionColDefs"
            [rowData]="onDemandDetailsRestriction"
            [frameworkComponents]="frameworkComponents"
            [gridOptions]="gridOptions"
            (gridReady)="onGridReady($event)"
          ></ag-grid-angular>

          </div>


        </div>




        <div class="xg-frame-2 half-width-frame">



        <label><input type="checkbox" name="checkbox" [(ngModel)]="allowCT" >Target to specific content</label>

        <div *ngIf="allowCT">
          <div class="action-bar">
            <div class="title">
            Content Targeting
            </div>
                <div class="buttons">
                  <div class="action-button"  (click)="displayModal = !displayModal">ADD</div>
                  <div class="action-button"  (click)="displayModal = !displayModal">EDIT</div>
                </div>
          </div>
          <ag-grid-angular
            #agGrid1
            style="width: 100%; height: 300px;"
            id="myGrid2"
            class="ag-theme-alpine"
            [defaultColDef]="defaultColDef"
            [columnDefs]="onContentColDefs"
            [rowData]="onDemandDetailsContentSetDetails"
            [frameworkComponents]="frameworkComponents"
            [gridOptions]="gridOptions"
            (gridReady)="onGridReady($event)"
          ></ag-grid-angular>
        
        </div>
        
          </div>


      </div>

      <div class="overlay" *ngIf="displayModal">
        <div class="modal">
          <h3 class="header">Content Set</h3>

          <div class="xg-frame-2 tall">

          <div class="xg-text-group" [ngClass]="{ 'xg-required': required }">
            <label class="xg-text-label" for="inputControl">Content Set Name</label>
            <input
              type="text"
              class="xg-text-box half"
              name="textInput"
              [(ngModel)]="inputModelValue"
              [placeholder]="placeholder"
            />
          </div>

                    <div class="action-bar">
                    <div class="title">
                    Targeted content categories
                    </div>
                        <div class="buttons">
                          <div class="action-button"  (click)="displayModal = !displayModal">ADD</div>
                          <div class="action-button"  (click)="displayModal = !displayModal">EDIT</div>
                        </div>
                  </div>
                  <ag-grid-angular
                    #agGrid1
                    style="width: 100%; height: 180px;"
                    id="myGrid2"
                    class="ag-theme-alpine"
                    [defaultColDef]="defaultColDef"
                    [columnDefs]="contentCategoryColDefs"
                    [rowData]="contentCategory"
                    [frameworkComponents]="frameworkComponents"
                    [gridOptions]="gridOptions"
                    (gridReady)="onGridReady($event)"
                  ></ag-grid-angular>

          
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
            <div class="button-cancel" (click)="displayModal = !displayModal">
              CANCEL
            </div>
            <div class="button-apply" (click)="displayModal = !displayModal">
              APPLY
            </div>
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

  private allowAR: boolean = false;
  private allowCT: boolean = false;

  private displayModal: boolean = false;

  private lmkData: any;
  private colDefs: ColDef[];

  /////////

  private adServerDetails: any[] = [];

  private onDemandDetailsRestriction: any[] = [];

  private onDemandDetailsAdSpace = [];
  private onDemandDetailsContentSetDetails = [];

  private contentCategory = [
    {
      cmodNo: 1,
      contentSetNo: 1,
      contentGroupNo: 9793,
      contentGroupDescription: 'Movies',
      includeYn: true,
      activeYn: true,
      rowId: 9793,
      adTargetableYn: true,
      origSetNo: 1,
      salesAreas: 'AllVod, AllVodIre, OCAllVod',
    },
  ];

  private contentCategoryColDefs: ColDef[] = [
    {
      field: 'contentGroupDescription',
      headerName: 'Content category',
      width: 200,
    },
    { field: 'contentSubCategory', headerName: 'Sub Category' },
    {
      field: 'includeYn',
      headerName: 'Include',
    },
  ];

  private onDemandDetailsRestrictionColDefs: ColDef[] = [
    { field: 'contentGroupDescription', headerName: "Restriction", width: 200 },{ field: 'excludeYn', headerName: "Exclude" }
  ];
  private onDemandDetailsAdSpaceColDefs: ColDef[] = [
    { field: 'name', width: '200px' },
  ];

  private onContentColDefs: ColDef[] = [
    { field: 'name', width: 200 },
    { field: 'matchTypeText' },
  ];

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

  private selectedRow = null;

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
    console.log('adServerDetailsData.data', adServerDetailsData.data);
    this.adServerDetails = adServerDetailsData.data;
  }

  mainSelectionChanged(event) {
    // console.log('mainSelectionChanged', event.api.getSelectedRows());
    this.selectedRow = event.api.getSelectedRows()[0];
    console.log('this.selectedRow.cmodNo', this.selectedRow.cmodNo);
    this.onDemandDetailsAdSpace = onDemandDetailsAdSpaceData.data;
    // TODO - dont know why this doesnt work!
    //this.onDemandDetailsAdSpace = this.onDemandDetailsAdSpace.filter(
    //  (d) => {
    //    return d.cmodNo.toString() == this.selectedRow.cmodNo.toString();
    //  }
    //);

    this.onDemandDetailsContentSetDetails =
      onDemandDetailsContentSetDetailsData.data.filter(
        (d) => d.cmodNo == this.selectedRow.cmodNo
      );

    this.onDemandDetailsRestriction = onDemandDetailsRestrictionData.data.filter((f) => f.cmodNo == this.selectedRow.cmodNo)

    console.log(this.selectedRow);
  }

  onGridReady(params) {
    // console.log("grid ready");
    // this.gridApi = params.api;
    // this.gridColumnApi = params.columnApi;
    // this.gridOptionsApi = this.gridOptions.api;
  }
}
