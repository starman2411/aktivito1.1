// update_storage('changeLog', JSON.stringify([]));
logsStorage = [];
function getEmptyRow(id, IdRow){
  return {
    'id':String(id),
    'IdRow':{value:String(IdRow), color:'white'},
    'DateBegin':{value:'', color:'white'},
    'DateEnd':{value:'', color:'white'},
    'ListingFee':{value:'', color:'white'},
    'AdStatus':{value:'', color:'white'},
    'ContactMethod':{value:'', color:'white'},
    'CompanyName':{value:'', color:'white'},
    'ManagerName':{value:'', color:'white'},
    'ContactPhone':{value:'', color:'white'},
    'VideoUrl':{value:'', color:'white'},
    'Address':{value:'', color:'white'},
    'Category':{value:'', color:'white'},
    'GoodsType':{value:'', color:'white'},
    'AdType':{value:'', color:'white'},
    'GoodsSubType':{value:'', color:'white'},
    'Condition':{value:'', color:'white'},
    'Title':{value:'', color:'white'},
    'Description':{value:'', color:'white'},
    'Price':{value:'', color:'white'},
    'PriceType':{value:'', color:'white'},
    'Images':{value:'', color:'white'},
  };
}

// let projectData = [];
// for(let k = 0; k <= 10; k++){
//   projectData.push(getEmptyRow(k, k+1));
// }


const months = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'};


function compareRow(a, b) {
  if (Number(a.id) < Number(b.id)) {
    return -1;
  }
  if (Number(a.id) > Number(b.id)) {
    return 1;
  }
  return 0;
}


function getIds(projectData, start){
  let ids = [];
  projectData.forEach(function(item, index){
    if (Number(item['id']) >= Number(start))  {
      ids.push(item['id']);
    }
  })
  return ids;
}


class DateBeginInputComp {
    init(params) {
        let row = params.node; 
        const id = params.node['data']['id'];;
        const value = params.data[params.columnName]['value'];
        const color = params.data[params.columnName]['color'];
        const columnName = params.columnName;
        this.eGui = document.createElement('div');

        this.eGui.innerHTML = `
          <div class="${columnName}-wrapper" >
              <input type="text" class="form-control input-field" value="${value}">
          </div>
        `;
        let next_date = new Date(value);
        next_date.setDate(next_date.getDate() + 30);
        row.setDataValue('DateEnd', {'value':get_string_date(next_date),'color': row.data['GoodsType']['color']});
        this.dateInput = this.eGui.querySelector('input');
        this.datePicker = new AirDatepicker(this.dateInput, {
          timepicker: true,
           position: 'right bottom',
          dateFormat(date) {
            return get_string_date(date);
          },

          onSelect({date, formattedDate, datepicker}){
            let next_date = new Date(date);
            next_date.setDate(next_date.getDate() + 30);
            row.setDataValue('DateEnd', {'value':get_string_date(next_date),'color': row.data['GoodsType']['color']});
            manual_input(datepicker.$el,id,columnName);

          },
        });

        this.click_event_listener = (e) => {
            if ((e.which != 3)) {
            this.datePicker.show();
          }
        };

        this.dateInput.addEventListener('click', this.click_event_listener);
        this.context_event_listener = (e) => raise_date_context(e, id, columnName);
        this.dateInput.addEventListener('contextmenu', this.context_event_listener);
    }

   getGui() {
       return this.eGui;
   }

   refresh(params) {

            let row = params.node; 
        const id = params.node['data']['id'];;
        const value = params.data[params.columnName]['value'];
        const color = params.data[params.columnName]['color'];
        const columnName = params.columnName;

        this.eGui.innerHTML = `
          <div class="${columnName}-wrapper" >
              <input type="text" class="form-control input-field" value="${value}">
          </div>
        `;
        let next_date = new Date(value);
        next_date.setDate(next_date.getDate() + 30);
        row.setDataValue('DateEnd', {'value':get_string_date(next_date),'color': row.data['GoodsType']['color']});

        this.dateInput = this.eGui.querySelector('input');
        this.datePicker = new AirDatepicker(this.dateInput, {
          timepicker: true,
          position: 'right bottom',
          dateFormat(date) {
            return get_string_date(date);
          },

          onSelect({date, formattedDate, datepicker}){
            let next_date = new Date(date);
            next_date.setDate(next_date.getDate() + 30);


            // let dataRow = projectData.find(o => o.id === String(id));
            // let index = projectData.indexOf(dataRow);

            row.setDataValue('DateEnd', {'value':get_string_date(next_date),'color': row.data['GoodsType']['color']});
            // projectData[index]['DateEnd']['value'] = get_string_date(next_date);
            manual_input(datepicker.$el,id,columnName);
          },
        });

        this.click_event_listener = (e) => {
            if ((e.which != 3)) {
            this.datePicker.show();
          }
        };

        this.dateInput.addEventListener('click', this.click_event_listener);
        this.context_event_listener = (e) => raise_date_context(e, id, columnName);
        this.dateInput.addEventListener('contextmenu', this.context_event_listener);
        return true;
   }

   destroy() {
        if (this.datePicker) {
          this.datePicker.destroy();
        }
        if (this.dateInput) {
          this.dateInput.removeEventListener('contextmenu', this.context_event_listener);
        }
        
      }   
}



class DateEndInputComp {
    init(params) {
        const value = params.data[params.columnName]['value'];
        const color = params.data[params.columnName]['color'];
        const columnName = params.columnName;
        this.eGui = document.createElement('div');
        this.eGui.innerHTML = `
          <div class="${columnName}-wrapper" >
              <input disabled type="text" class="form-control input-field" value="${value}">
          </div>
        `;     
    }

   getGui() {
       return this.eGui;
   }

   refresh(params) {
        const value = params.data[params.columnName]['value'];
        const color = params.data[params.columnName]['color'];
        const columnName = params.columnName;
        this.eGui.innerHTML = `
          <div class="${columnName}-wrapper" >
              <input disabled type="text" class="form-control input-field" value="${value}">
          </div>
        `;   

        return true;
   }
}


class TextAreaComp {
    init(params) {
        const id = params.node['data']['id'];
        const value = params.data[params.columnName]['value'];
        const color = params.data[params.columnName]['color'];
        const columnName = params.columnName;
        this.eGui = document.createElement('div');

        if (columnName == 'Images'){
          let images = {};
          if (value){
            images = JSON.parse(value);
          }
          let stringValue = '';
          let firstTrigger = true;
          for (let key in images) {
            if (firstTrigger) {
                stringValue = images[key];
                firstTrigger = false;
            }
            else {
                stringValue = stringValue + ' | ' + images[key];
            }
          }
                this.eGui.innerHTML = `
          <div class="${columnName}">
            <div class="${columnName}-wrapper">
              <textarea class="form-control textarea-field" data-previous="">${stringValue}</textarea>
            </div>
          </div>
        `;
        }
        else {
                  this.eGui.innerHTML = `
          <div class="${columnName}">
            <div class="${columnName}-wrapper">
              <textarea class="form-control textarea-field" data-previous="">${value}</textarea>
            </div>
          </div>
        `;
        }

        this.textarea = this.eGui.querySelector('textarea');
        if (columnName == 'IdRow'){
          this.context_event_listener = (e) => raise_id_context(e, id, columnName);
        }
        else {
          this.context_event_listener = (e) => raise_context(e, id, columnName);
        }
        
        this.change_event_listener = () => manual_input(this.textarea, id, columnName);
        this.textarea.addEventListener('contextmenu', this.context_event_listener);
        this.textarea.addEventListener('change', this.change_event_listener);
    }

   getGui() {
       return this.eGui;
   }

   refresh(params) {
        const id = params.node['data']['id'];;
        const value = params.data[params.columnName]['value'];
        const color = params.data[params.columnName]['color'];
        const columnName = params.columnName;

        if (columnName == 'Images'){
          let images = {};
          if (value){
            images = JSON.parse(value);
          }
          let stringValue = '';
          let firstTrigger = true;
          for (let key in images) {
            if (firstTrigger) {
                stringValue = images[key];
                firstTrigger = false;
            }
            else {
                stringValue = stringValue + ' | ' + images[key];
            }
          }
                this.eGui.innerHTML = `
          <div class="${columnName}">
            <div class="${columnName}-wrapper">
              <textarea class="form-control textarea-field" data-previous="">${stringValue}</textarea>
            </div>
          </div>
        `;
        }
        else {
                  this.eGui.innerHTML = `
          <div class="${columnName}">
            <div class="${columnName}-wrapper">
              <textarea class="form-control textarea-field" data-previous="">${value}</textarea>
            </div>
          </div>
        `;
        }

        this.textarea = this.eGui.querySelector('textarea');
        if (columnName == 'IdRow'){
          this.context_event_listener = (e) => raise_id_context(e, id, columnName);
        }
        else {
          this.context_event_listener = (e) => raise_context(e, id, columnName);
        }
        this.change_event_listener = () => manual_input(this.textarea, id, columnName);
        this.textarea.addEventListener('contextmenu', this.context_event_listener);
        this.textarea.addEventListener('change', this.change_event_listener);
        return true;
   }

   destroy() {
        if (this.textarea) {
            this.textarea.removeEventListener('change', this.change_event_listener);
            this.textarea.removeEventListener('contextmenu', this.context_event_listener);
      }   
    }
}
  

class SelectComp {
    init(params) {

        const id = params.node['data']['id'];;
        const value = params.data[params.columnName]['value'];
        const color = params.data[params.columnName]['color'];
        const columnName = params.columnName;

        let selectItems = [];
        let row = params.node; 
        if (columnName == 'Category') {
          selectItems = Object.keys(category_cascade);

        }
        else if (columnName == 'GoodsType') {
          if (row.data['Category']['value']){
            selectItems = Object.keys(category_cascade[row.data['Category']['value']]);
          }
        }
        else if ((columnName == 'GoodsSubType')){
          if (row.data['GoodsType']['value']){
            selectItems = category_cascade[row.data['Category']['value']][row.data['GoodsType']['value']];
          }
        }  
        else {
          selectItems = selects_library[columnName];
        }

        this.eGui = document.createElement('div');
        const first_part = `
          <div class="${columnName}-wrapper">
              <select class="form-select select-field">
                  <option selected value=""></option>
        `;
        const third_part = `
              </select>
          </div>
        `;
        let second_part = '';
        if (selectItems){
          selectItems.forEach(function (item, index) {
          if (item == value) {
            second_part = second_part + `<option selected value="${item}">${item}</option>`;
          }
          else {
            second_part = second_part + `<option value="${item}">${item}</option>`;
          }
        })
        }

        this.eGui.innerHTML = first_part + second_part + third_part;
        this.select = this.eGui.querySelector('select');
        this.context_event_listener = (e) => raise_context(e, id, columnName);
        this.change_event_listener = () => manual_input(this.select, id, columnName);
        this.select.addEventListener('contextmenu', this.context_event_listener);
        this.select.addEventListener('change', this.change_event_listener);
    }

   getGui() {
       return this.eGui;
   }

   refresh(params) {
        
        const id = params.node['data']['id'];;
        const value = params.data[params.columnName]['value'];
        const color = params.data[params.columnName]['color'];
        const columnName = params.columnName;

        let selectItems = [];
        let row = params.node; 
        if (columnName == 'Category') {
          selectItems = Object.keys(category_cascade);
          row.setDataValue('GoodsType', {'value':'','color': row.data['GoodsType']['color']});
        }
        else if (columnName == 'GoodsType') {
          if (row.data['Category']['value']){
            selectItems = Object.keys(category_cascade[row.data['Category']['value']]);
            row.setDataValue('GoodsSubType', {'value':'','color': row.data['GoodsSubType']['color']});
          }
        }
        else if ((columnName == 'GoodsSubType')){
          if (row.data['GoodsType']['value']){
            selectItems = category_cascade[row.data['Category']['value']][row.data['GoodsType']['value']];
          }
        }  
        else {
          selectItems = selects_library[columnName];
        }

        const first_part = `
          <div class="${columnName}-wrapper">
              <select class="form-select  select-field">
                  <option selected value=""></option>
        `;
        const third_part = `
              </select>
          </div>
        `;
        let second_part = '';
        if (selectItems){
          selectItems.forEach(function (item, index) {
          if (item == value) {
            second_part = second_part + `<option selected value="${item}">${item}</option>`;
          }
          else {
            second_part = second_part + `<option value="${item}">${item}</option>`;
          }
        })
        }

        this.eGui.innerHTML = first_part + second_part + third_part;
        this.select = this.eGui.querySelector('select');
        this.context_event_listener = (e) => raise_context(e, id, columnName);
        this.change_event_listener = () => manual_input(this.select, id, columnName);
        this.select.addEventListener('contextmenu', this.context_event_listener);
        this.select.addEventListener('change', this.change_event_listener);
        return true;
   }

   destroy() {
        if (this.select) {
            this.select.removeEventListener('change', this.change_event_listener);
            this.select.removeEventListener('contextmenu', this.context_event_listener);
      }   
    }
}


class DeleteComp {
    init(params) {
        const id = params.node['data']['id'];;
        this.eGui = document.createElement('div');
        this.eGui.innerHTML = `
          <span style="cursor: pointer;">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-x" viewBox="0 0 16 16" style="margin-top:19px">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
          </span>
        `;
        this.span = this.eGui.querySelector('span');
        this.click_event_listener = () => delete_row(id);
        this.span.addEventListener('click', this.click_event_listener);
    }

   getGui() {
       return this.eGui;
   }

   refresh(params) {
        this.eGui.innerHTML = `
          <span style="cursor: pointer;" onclick="delete_row(${id})">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-x" viewBox="0 0 16 16" style="margin-top:19px">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
          </span>
        `;
        return true;
   }

   destroy() {
      if (this.span){
        this.span.removeEventListener('click', this.click_event_listener);
      }
    }
}


class FileInputComp {
    init(params) {

        const id = params.node['data']['id'];;
        let columnName = params.columnName;
        let fileNumber = columnName.split('-')[1];

        this.eGui = document.createElement('div');
        this.eGui.innerHTML = `
        <div class="FileInput-${fileNumber}-wrapper" style="padding: 0 2 0 2">
          <input class="load-files-input-${fileNumber} mb-0 form-control form-control-sm " type="file"  multiple>

          <div class="d-flex flex-row justify-content-between" style="margin-top: 2px;">
              <div class="d-flex flex-column align-items-start">
                  <div class="d-flex flex-row align-items-center">
                      <span class="form-check-label" style="line-height:5px; margin-right: 10px;">Уникализировать</span>
                      <input class="load-files-unique-checkbox-${fileNumber}"  type="checkbox">
                  </div>
                  <div class="d-flex flex-row align-items-center">
                      <span class="form-check-label" style="line-height:5px; margin-right: 10px;">Размножить и уникализировать</span>
                      <input class="load-files-multi-unique-checkbox-${fileNumber}" type="checkbox"  >
                  </div>
              </div>
              <div >
                  <button class="btn btn-success btn-sm file-button" >Загрузить</button>
              </div>
          </div>
        </div>
        `;

        this.button = this.eGui.querySelector('button');
        this.click_event_listener = (e) => upload_files(e, fileNumber, id);
        this.button.addEventListener('click', this.click_event_listener);

        }


   getGui() {
       return this.eGui;
   }

   refresh(params) {

        return true;
   }

   destroy() {
      if (this.button){
        this.button.removeEventListener('click', this.click_event_listener);
      }
 
    }
}



let gridOptions = {
  columnDefs: [
    {field: "_",resizable: false , width:20,pinned: 'left', cellStyle: { 'padding-left': 0, 'padding-right': 0 }, cellRenderer: DeleteComp},
    {field: "IdRow",pinned: 'left', width:70, cellStyle: { 'padding-left': 1, 'padding-right': 5 }, headerName: 'Id', cellRenderer: TextAreaComp, cellRendererParams: { columnName: "IdRow" }},
    {field: "DateBegin", width:250, cellStyle: { 'padding-left': 5, 'padding-right': 1 }, headerName: 'DateBegin', cellRenderer: DateBeginInputComp, cellRendererParams: { columnName: "DateBegin" }},
    {field: "DateEnd", width:250, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'DateEnd', cellRenderer: DateEndInputComp, cellRendererParams: { columnName: "DateEnd" }, hide:false},
    {field: "ListingFee", width:150, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'ListingFee', cellRenderer: SelectComp, cellRendererParams: { columnName: "ListingFee" }},
    {field: "AdStatus", width:150, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'AdStatus', cellRenderer: SelectComp, cellRendererParams: { columnName: "AdStatus" }},
    {field: "ContactMethod", width:300, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'ContactMethod', cellRenderer: SelectComp, cellRendererParams: { columnName: "ContactMethod" }},
    {field: "CompanyName", width:200, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'CompanyName', cellRenderer: TextAreaComp, cellRendererParams: { columnName: "CompanyName" }},
    {field: "ManagerName", width:200, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'ManagerName', cellRenderer: TextAreaComp, cellRendererParams: { columnName: "ManagerName" }},
    {field: "ContactPhone", width:160, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'ContactPhone', cellRenderer: TextAreaComp, cellRendererParams: { columnName: "ContactPhone" }},
    {field: "VideoUrl", width:210, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'VideoUrl', cellRenderer: TextAreaComp, cellRendererParams: { columnName: "VideoUrl" }},
    {field: "Address", width:210, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Address', cellRenderer: TextAreaComp, cellRendererParams: { columnName: "Address" }},
    {field: "Category", width:300, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Category', cellRenderer: SelectComp, cellRendererParams: { columnName: "Category" }},
    {field: "GoodsType", width:300, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'GoodsType', cellRenderer: SelectComp, cellRendererParams: { columnName: "GoodsType" }, hide:false},
    {field: "AdType", width:300, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'AdType', cellRenderer: SelectComp, cellRendererParams: { columnName: "AdType" }},
    {field: "GoodsSubType", width:300, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'GoodsSubType', cellRenderer: SelectComp, cellRendererParams: { columnName: "GoodsSubType" }, hide:false},
    {field: "Condition", width:160, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Condition', cellRenderer: SelectComp, cellRendererParams: { columnName: "Condition" }},
    {field: "Title", width:170, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Title', cellRenderer: TextAreaComp, cellRendererParams: { columnName: "Title" }},
    {field: "Description", width:210, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Description', cellRenderer: TextAreaComp, cellRendererParams: { columnName: "Description" }},
    {field: "Price", width:130, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Price', cellRenderer: TextAreaComp, cellRendererParams: { columnName: "Price" }},
    {field: "PriceType", width:150, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'PriceType', cellRenderer: SelectComp, cellRendererParams: { columnName: "PriceType" }},

    {field: "FileInput-1", width:330, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Image 1', cellRenderer: FileInputComp, cellRendererParams: { columnName: "FileInput-1" }},
    {field: "FileInput-2", width:330, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Image 2', cellRenderer: FileInputComp, cellRendererParams: { columnName: "FileInput-2" }},
    {field: "FileInput-3", width:330, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Image 3', cellRenderer: FileInputComp, cellRendererParams: { columnName: "FileInput-3" }},
    {field: "FileInput-4", width:330, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Image 4', cellRenderer: FileInputComp, cellRendererParams: { columnName: "FileInput-4" }},
    {field: "FileInput-5", width:330, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Image 5', cellRenderer: FileInputComp, cellRendererParams: { columnName: "FileInput-5" }},
    {field: "FileInput-6", width:330, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Image 6', cellRenderer: FileInputComp, cellRendererParams: { columnName: "FileInput-6" }},
    {field: "FileInput-7", width:330, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Image 7', cellRenderer: FileInputComp, cellRendererParams: { columnName: "FileInput-7" }},
    {field: "FileInput-8", width:330, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Image 8', cellRenderer: FileInputComp, cellRendererParams: { columnName: "FileInput-8" }},
    {field: "FileInput-9", width:330, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Image 9', cellRenderer: FileInputComp, cellRendererParams: { columnName: "FileInput-9" }},
    {field: "FileInput-10", width:330, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Image 10', cellRenderer: FileInputComp, cellRendererParams: { columnName: "FileInput-10" }},

    {field: "Images", width:830, cellStyle: { 'padding-left': 1, 'padding-right': 1 }, headerName: 'Images', cellRenderer: TextAreaComp, cellRendererParams: { columnName: "Images" }},
  ],
  rowHeight: 68,
  getRowId: params => params.data.id,
  suppressCellSelection: true,

};


// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
    gridOptions.api.setRowData(projectData);
});



function get_string_date(date) {
    if (date != 'Invalid Date'){
        const date_string = String(date).split(' ');
        const year = date_string[3];
        const month = months[date_string[1]];
        const day = date_string[2];
        const time = date_string[4].split(':');
        const hour = time[0];
        const minute = time[1];
        const time_zone_select = document.getElementById('timezone-selector');
        const time_zone = time_zone_select.options[time_zone_select.selectedIndex].value;
        return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00' + time_zone;
    }
    return '';
}


function delete_row(id){

  let row = gridOptions.api.getRowNode(String(id)); 
  let rowData = row.data;
  const res = gridOptions.api.applyTransaction({remove: [row.data]});
  let dataRow = projectData.find(o => o.id === String(id));

  let index = projectData.indexOf(dataRow);
  projectData.splice(index, 1);
  addLog('delete_row', {[id]: {'previous': rowData}});

}

function delete_rows(){

  let rowsData = {}
    let from = Number(document.getElementById('delete-amount-from').value);
    if (from <1){
        from =1;
    }
    let to = Number(document.getElementById('delete-amount-to').value);
    ids = getIds(projectData, 0);
    let rowsToDelete = [];
    let id = null;
    let row = null;
    for (let index=from-1;index<to;index++){
      id = ids[index];
      row = gridOptions.api.getRowNode(String(id)); 
      rowsToDelete.push(row.data);
      rowsData[id] = {'previous':row.data};
    }
    gridOptions.api.applyTransaction({remove: rowsToDelete});
    projectData.splice(from-1, to-from+1);
    // gridOptions.api.setRowData(projectData);
    addLog('delete_row', rowsData);
}


function manual_input(elem, id, className){
  let row = gridOptions.api.getRowNode(id); 
  let previous = row.data[className];
  const logKey = `${className}-${String(id)}`;
  // let data = row.data;
  // data[className] = {'value':elem.value,'color': 'pink'};

  row.setDataValue(className, {'value':elem.value,'color': 'pink'});
  // gridOptions.api.applyTransaction({update: [row]});
  // row.setDataValue('col 2','2');
    // let row_id = elem.parentNode.parentNode.parentNode.id.split('-')[1];
    // let cells = {[elem.parentNode.className + '-' + row_id]: {'previous': elem.dataset.previous, 'new': elem.value}};
  addLog('manual_editing', {[logKey]: {'previous': previous}})
}


function compareLog(a, b) {
  if (a.time < b.time) {
    return -1;
  }
  if (a.time > b.time) {
    return 1;
  }
  return 0;
}


function update_storage(cvalue) {
      logsStorage.push(cvalue);

    }


function get_from_storage() {
  return logsStorage;
}


function addLog(action, cells) {
    let change_log = get_from_storage();
    if (change_log) {
        change_log.sort(compareLog);
        if (change_log.length >= 30)
            {
                change_log.splice(0, 1);
            }
    }
    let new_log = {
        'action': action,
        'time': Date.now(),
        'cells': cells,
        };
    change_log.push(new_log);


}




function delete_to_end(current_id, className) {
    const last_id = projectData[projectData.length-1]['id'];
    let cells_edited = {};
    const new_value = {'value': '', 'color': 'white'};
    for (let id = current_id ; id <= Number(last_id); id++) {
            let row = gridOptions.api.getRowNode(id); 
            let previous = row.data[className];
            const logKey = `${className}-${String(id)}`;
            row.setDataValue(className, {'value':new_value['value'],'color': new_value['color']});
            if (className == 'DateBegin'){
              row.setDataValue('DateEnd', {'value':new_value['value'],'color': new_value['color']});
            }
            cells_edited[logKey] = {'previous': previous};
    }
    addLog('delete_to_end', cells_edited);
}

function raise_context(event, id, columnName) {
    const row_id = id;
    const class_name = columnName;
    document.oncontextmenu = function() {return false;};
    $(document).ready(function() {
        if (!($( ".context-menu" ).is( ":visible" ))) {
            $('<div/>', {
              class: 'context-menu'
            })
            .css({
              left: event.pageX+'px',
              top: event.pageY+'px'
            })
            .appendTo('body')
            .append(
                $('<ul/>').append(`<li><span style="cursor: pointer;" id="continue-to-end" onClick="continue_to_end(${row_id}, '${class_name}')">Продлить до конца</span></li>`)
                .append(`<li><span style="cursor: pointer;" id="delete-to-end" onClick="delete_to_end(${row_id}, '${class_name}')">Удалить ниже</span></li>`)
                .append(`<li><span style="cursor: pointer;" id="continue-to-end" onClick="continue_row_to_end(${row_id})">Продлить всю строку до конца</span></li>`)
                )
            .show('fast');
        }
    });
}


function raise_date_context(event, id, columnName) {
    const row_id = id;
    const class_name = columnName;
    document.oncontextmenu = function() {return false;};
    $(document).ready(function() {
        if (!($( ".context-menu" ).is( ":visible" ))) {
            $('<div/>', {
              class: 'context-menu'
            })
            .css({
              left: event.pageX+'px',
              top: event.pageY+'px'
            })
            .appendTo('body')
            .append(
                $('<ul/>').append(`<li><span style="cursor: pointer;" id="continue-to-end" onClick="continue_to_end(${row_id}, '${class_name}')"  >Продлить до конца</span></li>`)
                .append(`<li><span style="cursor: pointer;" id="continue-to-end" onClick="continue_to_end_with_step(${row_id})">Продлить до конца со сдвигом</span></li>`)
                .append(`<li><span style="cursor: pointer;" id="delete-to-end" onClick="delete_to_end(${row_id}, '${class_name}')">Удалить ниже</span></li>`)
                .append(`<li><span style="cursor: pointer;" id="continue-to-end" onClick="continue_row_to_end(${row_id})"  >Продлить всю строку до конца</span></li>`)
                )
            .show('fast');
        }
    });
}


function raise_id_context(event, id, columnName) {
    let row_id = id;
    const class_name = columnName;
    document.oncontextmenu = function() {return false;};
    $(document).ready(function() {
        if (!($( ".context-menu" ).is( ":visible" ))) {
            $('<div/>', {
              class: 'context-menu'
            })
            .css({
              left: event.pageX+'px',
              top: event.pageY+'px'
            })
            .appendTo('body')
            .append(
                $('<ul/>').append(`<li><span style="cursor: pointer;" id="continue-to-end" onClick="continue_to_end(${row_id}, '${class_name}')"  >Продлить до конца</span></li>`)
                .append(`<li><span style="cursor: pointer;" id="continue-to-end" onClick="continue_id_to_end_with_step(${row_id})">Продлить до конца со сдвигом</span></li>`)
                .append(`<li><span style="cursor: pointer;" id="delete-to-end" onClick="delete_to_end(${row_id}, '${class_name}')">Удалить ниже</span></li>`)
                .append(`<li><span style="cursor: pointer;" id="continue-to-end" onClick="continue_row_to_end(${row_id})"  >Продлить всю строку до конца</span></li>`)
                )
            .show('fast');
        }
    });
}


function continue_to_end(current_id, className) {
    let cells_edited = {};
    let current_row = gridOptions.api.getRowNode(current_id);

    ids = getIds(projectData, current_id + 1);

    const new_value = current_row.data[className];
    ids.forEach(function(id,index){
            let row = gridOptions.api.getRowNode(id); 
            let previous = row.data[className];
            const logKey1 = `${className}-${String(id)}`;

            row.setDataValue(className, {'value':new_value['value'],'color': previous['color']});
            if (className == 'DateBegin'){
              let next_date = new Date(new_value['value']);
              next_date.setDate(next_date.getDate() + 30);
              const logKey2 = `${'DateEnd'}-${String(id)}`;
              cells_edited[logKey2] = {'previous': row.data['DateEnd']};
              row.setDataValue('DateEnd', {'value':get_string_date(next_date),'color': previous['color']});

            }
            cells_edited[logKey1] = {'previous': previous};
    })

    addLog('continue_to_end', cells_edited);
}


function continue_row_to_end(current_id) {
    let cells_edited = {};
    let current_row = gridOptions.api.getRowNode(current_id );
    ids = getIds(projectData, current_id + 1);
    const new_value = current_row.data;
    const column_classes = [
      'DateBegin',
      'DateEnd',
      'ListingFee',
      'AdStatus',
      'ContactMethod',
      'CompanyName',
      'ManagerName',
      'ContactPhone',
      'VideoUrl',
      'Address',
      'Category',
      'GoodsType',
      'AdType',
      'GoodsSubType',
      'Condition',
      'Title',
      'Description',
      'Price',
      'PriceType',
      'Images'];
    ids.forEach(function(id,index){
        let row = gridOptions.api.getRowNode(id); 
        column_classes.forEach(function(className, index){
        let previous = row.data[className];
        let logKey = `${className}-${String(id)}`;
        cells_edited[logKey] = {'previous': previous};
        row.setDataValue(className, {'value':new_value[className]['value'],'color': previous['color']});
      })
    })
    addLog('continue_row_to_end', cells_edited);
}


function continue_to_end_with_step(current_id) {
    let cells_edited = {};
    let current_row = gridOptions.api.getRowNode(current_id);

    ids = getIds(projectData, current_id);
    for (let index = 1; index < ids.length; index++){

            let id = ids[index];

            let previous_row = gridOptions.api.getRowNode(ids[index-1]); 
            let next_row = gridOptions.api.getRowNode(id);
            let previous = previous_row.data['DateBegin'];

            const logKey1 = `${'DateBegin'}-${String(id)}`;
            const logKey2 = `${'DateEnd'}-${String(id)}`;
            let new_value = new Date(previous['value'].split('+')[0]);
            let previous_value_1 = next_row.data['DateBegin'];
            let previous_value_2 = next_row.data['DateEnd'];
            new_value.setDate(new_value.getDate() + 1);

            next_row.setDataValue('DateBegin', {'value':get_string_date(new_value),'color': previous['color']});

            let next_date = new Date(get_string_date(new_value));
            next_date.setDate(next_date.getDate() + 30);
            next_row.setDataValue('DateEnd', {'value':get_string_date(next_date),'color': previous['color']});

            cells_edited[logKey1] = {'previous': previous_value_1};
            cells_edited[logKey2] = {'previous': previous_value_2};
    }
    addLog('continue_to_end', cells_edited);
}


function continue_id_to_end_with_step(current_id) {
    const last_id = projectData[projectData.length-1]['id'];
    let cells_edited = {};
    let current_row = gridOptions.api.getRowNode(current_id);
    ids = getIds(projectData, current_id);
    for (let index = 1; index < ids.length; index++){
            let id = ids[index];
            let previous_row = gridOptions.api.getRowNode(ids[index-1]); 
            let next_row = gridOptions.api.getRowNode(id);
            let previous = previous_row.data['IdRow'];
            const logKey = `${'IdRow'}-${String(id)}`; 
            let new_value = String(Number(previous['value']) + 1);
            next_row.setDataValue('IdRow', {'value':new_value,'color': previous['color']});
            cells_edited[logKey] = {'previous': previous};
    }
    addLog('continue_to_end', cells_edited);
}

$(document).ready(function() {
    $(document).mousedown(function(event) {
      if ($( ".context-menu" ).is( ":visible" ))  {
          setTimeout(() => {  $('.context-menu').remove(); }, 100);
          document.oncontextmenu = function() {return true;};
      }
    });
});




function add_rows(){
  rows_amount = Number(document.getElementById('new-rows-amount').value);
  let id = 0;
  let idRow = 0;

  if (projectData.length){
    id = Number(projectData[projectData.length-1]['id']);
    idRow = Number(projectData[projectData.length-1]['IdRow']['value']);
  }

  let newRow = null;
  for (let k =1; k<=rows_amount; k++){
    newRow =getEmptyRow(id+k, idRow+k);
    gridOptions.api.applyTransaction({add: [newRow]});
    projectData.push(newRow);
  }
  addLog('adding_rows', {start_id:id+1, stop_id:id+rows_amount});

  // const res = gridOptions.api.applyTransaction({add: [row_template]});
  // gridOptions.api.setRowData(gridOptions.api.rowData);
}

function hide_end_time(){
  if (document.getElementById("hide-end-time-box").checked) {
    gridOptions.columnApi.setColumnVisible('DateEnd', false) ;
    } else {
    gridOptions.columnApi.setColumnVisible('DateEnd', true) ;
    }
}


function hide_type(){
    if (document.getElementById("hide-type-box").checked) {
    gridOptions.columnApi.setColumnVisible('GoodsType', false) ;
    } else {
    gridOptions.columnApi.setColumnVisible('GoodsType', true) ;
    }
}


function hide_subtype(){
    if (document.getElementById("hide-subtype-box").checked) {
    gridOptions.columnApi.setColumnVisible('GoodsSubType', false) ;
    } else {
    gridOptions.columnApi.setColumnVisible('GoodsSubType', true) ;
    }
}


function undo(){
    let change_log = get_from_storage();
    change_log.sort(compareLog);
    let last_log = change_log.pop();

    if (last_log){
        if ((last_log.action == 'manual_editing') || (last_log.action == 'continue_to_end') || (last_log.action == 'paste') || (last_log.action == 'delete_to_end') || (last_log.action == 'continue_row_to_end') || (last_log.action == 'load_images') ) {
            Object.keys(last_log.cells).forEach(function (item, index) {
              let id = item.split('-')[1];
              let className = item.split('-')[0];
              let previous = last_log['cells'][item]['previous'];
              let row = gridOptions.api.getRowNode(id);

              row.setDataValue(className, {'value':previous['value'],'color': previous['color']});
            })
        }
        else if ((last_log.action == 'delete_row')){
          Object.keys(last_log.cells).forEach(function (id, index) {
            let rowData = last_log['cells'][id]['previous'];
            projectData.push(rowData);
            projectData.sort(compareRow);
            let thisRow = projectData.find(o => o.id === String(id));
            let insertIndex = projectData.indexOf(thisRow);
            gridOptions.api.applyTransaction({add: [rowData], addIndex: Number(insertIndex)});
          })
        }
        else if ((last_log.action == 'adding_rows')){

          ids = getIds(projectData, 0);
          let rowsToDelete = [];
          let id = null;
          let row = null;
          for (let index=Number(last_log['cells']['start_id']);index<=Number(last_log['cells']['stop_id']);index++){
            id = ids[index];
            row = gridOptions.api.getRowNode(String(id)); 
            rowsToDelete.push(row.data);
          }
          gridOptions.api.applyTransaction({remove: rowsToDelete});
          projectData.splice(Number(last_log['cells']['start_id']), Number(last_log['cells']['stop_id']));
        }
    }
}


document.addEventListener("paste", function (e) {
    var pastedText = undefined;
    if (window.clipboardData && window.clipboardData.getData) { 
        pastedText = window.clipboardData.getData('Text');
    } else if (e.clipboardData && e.clipboardData.getData) {
        pastedText = e.clipboardData.getData('text/plain');
    }
    e.preventDefault();
    let pasted_array = pastedText.split('\r\n');

    if (!(pasted_array[pasted_array.length-1])) {
        pasted_array.splice(pasted_array.length-1,1);
    }

    let row_id = Number(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('row-index'));
    let column_class = e.target.parentNode.parentNode.className;



    let cells_edited = {};

    ids = getIds(projectData, projectData[row_id]['id']).splice(0, pasted_array.length);
        

    ids.forEach(function(id, index){
      let log_name = `${column_class}-${id}`;
      let row = gridOptions.api.getRowNode(String(id));
      cells_edited[log_name] = {'previous': row.data[column_class]};
      row.setDataValue(column_class, {'value':pasted_array[index],'color': 'white'});
    })

    addLog('paste', cells_edited);
    return false;
});



function print_table(){
  console.log(projectData);
}