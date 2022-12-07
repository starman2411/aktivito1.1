update_storage('changeLog', JSON.stringify([]));


function hide_end_time(){
    if (document.getElementById("hide-end-time-box").checked) {
    $('td:nth-child(3),th:nth-child(3)').hide();
    } else {
    $('td:nth-child(3),th:nth-child(3)').show();
    }
}


function hide_type(){
    if (document.getElementById("hide-type-box").checked) {
    $('td:nth-child(13),th:nth-child(13)').hide();
    } else {
    $('td:nth-child(13),th:nth-child(13)').show();
    }
}


function hide_subtype(){
    if (document.getElementById("hide-subtype-box").checked) {
    $('td:nth-child(15),th:nth-child(15)').hide();
    } else {
    $('td:nth-child(15),th:nth-child(15)').show();
    }
}

const months = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'};


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

    let column_class = e.target.parentNode.className;

    let row_id = Number(e.target.parentNode.parentNode.parentNode.id.split('-')[1]);
    let cells_edited = {};

    for (let id = row_id ; id < row_id + pasted_array.length; id++) {
        let log_name = `${column_class}-${id}`;
        let row = document.getElementById('row-' + String(id));
        if (row){
            wrapper = row.getElementsByClassName(column_class)[0];
            if (wrapper) {
                let textarea = wrapper.querySelector('textarea');
                let date_begin_input = wrapper.querySelector('input');
                let date_end_input = row.getElementsByClassName('DateEnd-wrapper')[0].querySelector('input');
                if (textarea) {
                    cells_edited[log_name] = {'previous': textarea.value, 'new': pasted_array[id - row_id]};
                    textarea.value = pasted_array[id - row_id];
                }
                if (date_begin_input) {
                    let begin_date = new Date(pasted_array[id - row_id].split('+')[0]);   
                    let new_end_date = new Date(begin_date);
                    new_end_date.setDate(new_end_date.getDate() + 30);
                    cells_edited[log_name] = {'previous': [date_begin_input.value,date_end_input.value], 'new': [pasted_array[id - row_id],get_string_date(new_end_date)]};
                    date_begin_input.value = pasted_array[id - row_id];
                    date_end_input.value = get_string_date(new_end_date);
                }
            }
        }
    }
    addLog('paste', cells_edited);
    return false;
});

function delete_to_end(row_id, column_class) {
    let rows = document.querySelectorAll('tbody > tr');
    let last_id = rows[rows.length-1].id.split('-')[1];
    let cells_edited = {};

    for (let id = row_id; id <= Number(last_id); id++) {
        let row = document.getElementById('row-' + String(id));
        if (row){
            wrapper = row.getElementsByClassName(column_class)[0];
            if (wrapper) {
                let textarea = wrapper.querySelector('textarea');
                let date_begin_input = wrapper.querySelector('input');
                let date_end_input = row.getElementsByClassName('DateEnd-wrapper')[0].querySelector('input');
                let select = wrapper.querySelector('select');
                let log_name = `${column_class}-${id}`;
                if (textarea) {
                    cells_edited[log_name] = {'previous': textarea.value, 'new': ''};
                    textarea.value = '';
                }
                if (date_begin_input) {
                    cells_edited[log_name] = {'previous': [date_begin_input.value,date_end_input.value], 'new': ['','']};
                    date_begin_input.value = '';
                    date_end_input.value = '';
                }
                if (select) {    
                    cells_edited[log_name] = {'previous': select.selectedIndex, 'new': ''};
                    select.selectedIndex = -1;
                }
            }
        }
    }
    addLog('delete_to_end', cells_edited);
}


function continue_row_to_end(row_id) {
    let column_classes = [
        'DateBegin-wrapper',
        'ListingFee-wrapper',
        'AdStatus-wrapper',
        'ContactMethod-wrapper',
        'CompanyName-wrapper',
        'ManagerName-wrapper',
        'ContactPhone-wrapper',
        'VideoUrl-wrapper',
        'Address-wrapper',
        'Category-wrapper',
        'GoodsType-wrapper',
        'AdType-wrapper',
        'GoodsSubType-wrapper',
        'Condition-wrapper',
        'Title-wrapper',
        'Description-wrapper',
        'Price-wrapper',
        'PriceType-wrapper',
        'Images-wrapper'];

    let rows = document.querySelectorAll('tbody > tr');
    let cells_edited = {};
    let last_id = rows[rows.length-1].id.split('-')[1];
    let this_row = document.getElementById('row-' + String(row_id));
    if (this_row) {
        column_classes.forEach((column_class,key) => {
            let value = '';
            let additional_value = '';
            let selected_index = '';
            let this_wrapper = this_row.getElementsByClassName(column_class)[0];
            if (this_wrapper) {
                 let textarea = this_wrapper.querySelector('textarea');
                    let date_begin_input = this_wrapper.querySelector('input');
                    let date_end_input = this_row.getElementsByClassName('DateEnd-wrapper')[0].querySelector('input');
                 let select = this_wrapper.querySelector('select');
                 if (textarea) {
                     value = textarea.value;
                 }
                 if (date_begin_input) {
                     value = date_begin_input.value;
                     additional_value = date_end_input.value;
                 }
                 if (select) {
                    value= select.innerHTML;
                    selected_index = select.selectedIndex;
                 }
            }
            for (let id = row_id + 1 ; id <= Number(last_id); id++) {
                let row = document.getElementById('row-' + String(id));
                if (row){
                    wrapper = row.getElementsByClassName(column_class)[0];
                    if (wrapper) {
                        let textarea = wrapper.querySelector('textarea');
                        
                        
                        let select = wrapper.querySelector('select');
                        let log_name = `${column_class}-${id}`;
                        if (textarea) {
                            cells_edited[log_name] = {'previous': textarea.value, 'new': value};
                            textarea.value = value;
                        }
                        if (column_class == 'DateBegin-wrapper') {
                            let date_begin_input = wrapper.querySelector('input');
                            let date_end_input = row.getElementsByClassName('DateEnd-wrapper')[0].querySelector('input');
                            cells_edited[log_name] = {'previous': [date_begin_input.value,date_end_input.value], 'new': [value,additional_value]};
                            date_begin_input.value = value;
                            date_end_input.value = additional_value;
                        }
                        if (select) {
                            
                            cells_edited[log_name] = {'previous': select.selectedIndex, 'new': ''};
                            select.innerHTML = value;
                            select.selectedIndex = selected_index;
                            if (select.parentNode.parentNode.className == 'Category'){
                                fillGoodsTypes(select);
                            }
                            if (select.parentNode.parentNode.className == 'GoodsType'){
                                fillGoodsSubTypes(select);
                            }

                        }
                    }
                }
            }
        })
    }
    addLog('continue_to_end', cells_edited);
}


function continue_to_end(row_id, column_class) {
    let rows = document.querySelectorAll('tbody > tr');
    let last_id = rows[rows.length-1].id.split('-')[1];
    let this_row = document.getElementById('row-' + String(row_id))
    let value = '';
    let additional_value = '';
    let selected_index = '';
    let cells_edited = {};
    if (this_row) {
        let this_wrapper = this_row.getElementsByClassName(column_class)[0];
        if (this_wrapper) {
             let textarea = this_wrapper.querySelector('textarea');
                let date_begin_input = this_wrapper.querySelector('input');
                let date_end_input = this_row.getElementsByClassName('DateEnd-wrapper')[0].querySelector('input');
             let select = this_wrapper.querySelector('select');
             if (textarea) {
                 value = textarea.value;
             }
             if (date_begin_input) {
                 value = date_begin_input.value;
                 additional_value = date_end_input.value;
             }
             if (select) {
                value= select.innerHTML;
                selected_index = select.selectedIndex;
             }
        }
    }
    for (let id = row_id + 1 ; id <= Number(last_id); id++) {
        let row = document.getElementById('row-' + String(id));
        if (row){
            wrapper = row.getElementsByClassName(column_class)[0];
            if (wrapper) {
                let textarea = wrapper.querySelector('textarea');
                let date_begin_input = wrapper.querySelector('input');
                let date_end_input = row.getElementsByClassName('DateEnd-wrapper')[0].querySelector('input');
                let select = wrapper.querySelector('select');
                let log_name = `${column_class}-${id}`;
                if (textarea) {
                    cells_edited[log_name] = {'previous': textarea.value, 'new': ''};
                    textarea.value = value;
                }
                if (date_begin_input) {
                    cells_edited[log_name] = {'previous': [date_begin_input.value,date_end_input.value], 'new': ''};
                    date_begin_input.value = value;
                    date_end_input.value = additional_value;
                }
                if (select) {
                    cells_edited[log_name] = {'previous': select.selectedIndex, 'new': ''};
                    select.innerHTML = value;
                    select.selectedIndex = selected_index;

                    if (select.parentNode.parentNode.className == 'Category'){
                        fillGoodsTypes(select);
                    }
                    if (select.parentNode.parentNode.className == 'GoodsType'){
                        fillGoodsSubTypes(select);
                    }
                }
            }
        }
    }
    addLog('continue_to_end', cells_edited);
}


function continue_to_end_with_step(row_id) {
    let rows = document.querySelectorAll('tbody > tr');
    let last_id = rows[rows.length-1].id.split('-')[1];
    let cells_edited = {};
    for (let id = row_id + 1 ; id <= Number(last_id); id++) {
            let wrapper_begin_prev = document.getElementById('row-'+String(id-1)).getElementsByClassName('DateBegin-wrapper')[0];
            let wrapper_end_prev = document.getElementById('row-'+String(id-1)).getElementsByClassName('DateEnd-wrapper')[0];

            let wrapper_begin = document.getElementById('row-'+String(id)).getElementsByClassName('DateBegin-wrapper')[0];
            let wrapper_end = document.getElementById('row-'+String(id)).getElementsByClassName('DateEnd-wrapper')[0];

            let date_begin_input_prev = wrapper_begin_prev.querySelector('input');
            let date_end_input_prev = wrapper_end_prev.querySelector('input');

            let date_begin_input = wrapper_begin.querySelector('input');
            let date_end_input = wrapper_end.querySelector('input');

            let old_begin_date_string = date_begin_input_prev.value;
            let old_end_date_string = date_end_input_prev.value;

            let new_begin_date = new Date(old_begin_date_string.split('+')[0]);
            new_begin_date.setDate(new_begin_date.getDate() + 1);
            let new_end_date = new Date(old_end_date_string.split('+')[0]);
            new_end_date.setDate(new_end_date.getDate() + 1);
            
            let value = get_string_date(new_begin_date);
            let additional_value = get_string_date(new_end_date);

            let log_name = `${'DateBegin-wrapper'}-${id}`;

            cells_edited[log_name] = {'previous': [date_begin_input.value,date_end_input.value], 'new': [value,additional_value]};

            date_begin_input.value = value;
            date_end_input.value =additional_value;

    }
    addLog('continue_to_end', cells_edited);
}


function continue_id_to_end_with_step(row_id) {
    let rows = document.querySelectorAll('tbody > tr');
    let last_id = rows[rows.length-1].id.split('-')[1];
    let cells_edited = {};
    for (let id = row_id + 1 ; id <= Number(last_id); id++) {
            let wrapper_prev = document.getElementById('row-'+String(id-1)).getElementsByClassName('IdRow-wrapper')[0];
            let id_cell_prev = wrapper_prev.querySelector('textarea');
            let wrapper_this = document.getElementById('row-'+String(id)).getElementsByClassName('IdRow-wrapper')[0];
            let id_cell_this = wrapper_this.querySelector('textarea');
            let previous = id_cell_this.value;
            id_cell_this.value = Number(id_cell_prev.value) + 1;
            let log_name = `${'IdRow-wrapper'}-${id}`;
            cells_edited[log_name] = {'previous': previous, 'new': id_cell_this.value};
    }
    addLog('continue_to_end', cells_edited);
}


function raise_context(event, class_name) {
    let row_id = event.currentTarget.parentNode.parentNode.parentNode.id.split('-')[1];
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
                .append(`<li><span style="cursor: pointer;" id="delete-to-end" onClick="delete_to_end(${row_id}, '${class_name}')">Удалить ниже</span></li>`)
                .append(`<li><span style="cursor: pointer;" id="continue-to-end" onClick="continue_row_to_end(${row_id})"  >Продлить всю строку до конца</span></li>`)
                )
            .show('fast');
        }
    });
}


function raise_date_context(event, class_name) {
    let row_id = event.currentTarget.parentNode.parentNode.parentNode.id.split('-')[1];
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


function raise_id_context(event, class_name) {
    let row_id = event.currentTarget.parentNode.parentNode.parentNode.id.split('-')[1];
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


$(document).ready(function() {
    $(document).mousedown(function(event) {
      if ($( ".context-menu" ).is( ":visible" ))  {
          setTimeout(() => {  $('.context-menu').remove(); }, 100);

          document.oncontextmenu = function() {return true;};
      }
    });
});


function compareLog(a, b) {
  if (a.time < b.time) {
    return -1;
  }
  if (a.time > b.time) {
    return 1;
  }
  return 0;
}


function addLog(action, cells) {
    let change_log = JSON.parse(get_from_storage('changeLog'));
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
    update_storage('changeLog', JSON.stringify(change_log));
}


function addRowsAddLog(action,range){
        let change_log = JSON.parse(get_from_storage('changeLog'));
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
            'rows_range': range,
            };
        change_log.push(new_log);
        update_storage('changeLog', JSON.stringify(change_log), 1);
};


function update_storage(cname, cvalue) {
      localStorage.setItem(cname, cvalue);
    }


function get_from_storage(cname) {
      return localStorage.getItem(cname);
}


function undo(){
    let change_log = JSON.parse(get_from_storage('changeLog'));
    change_log.sort(compareLog);
    let last_log = change_log.pop();
    update_storage('changeLog', JSON.stringify(change_log));
    if (last_log){
        if ((last_log.action == 'continue_to_end') || (last_log.action == 'paste') || (last_log.action == 'delete_to_end') || (last_log.action == 'load_files_handler1') || (last_log.action == 'load_images') ) {
            Object.keys(last_log.cells).forEach(function (item, index) {
              let id = item.split('-')[2];
              let class_name = item.split('-')[0] + '-' + item.split('-')[1];
              let row = document.getElementById(`row-${id}`);
              let wrapper = row.getElementsByClassName(class_name)[0];
              if (wrapper) {
                let date_begin_input = wrapper.querySelector('input');
                let date_end_input = row.getElementsByClassName('DateEnd-wrapper')[0].querySelector('input');
                let textarea = wrapper.querySelector('textarea');
                let select = wrapper.querySelector('select');
                if (textarea) {
                    textarea.value = last_log['cells'][item]['previous'];
                }
                if (date_begin_input) {
                    if (last_log['cells'][item]['previous'][0]){
                        date_begin_input.value = last_log['cells'][item]['previous'][0];
                    }
                    else {date_begin_input.value = '';}
                    if (last_log['cells'][item]['previous'][1]) {
                        date_end_input.value = last_log['cells'][item]['previous'][1];
                    }
                    else {date_end_input.value = '';}
                }
                if (select) {
                    

                    if (select.parentNode.parentNode.className == 'Category'){
                        fillGoodsTypes(select);
                    }
                    if (select.parentNode.parentNode.className == 'GoodsType'){
                        fillGoodsSubTypes(select);
                    }
                    select.selectedIndex = last_log['cells'][item]['previous'];
                }
              }
            });
        }
        else if (last_log.action == 'manual_editing'){
            let item = Object.keys(last_log['cells'])[0];
            let id = item.split('-')[2];
            let class_name = item.split('-')[0] + '-' + item.split('-')[1];
            let row = document.getElementById(`row-${id}`);
            let wrapper = row.getElementsByClassName(class_name)[0];
            
            if (wrapper) {
                let date_begin_input = wrapper.querySelector('input');
                let date_end_input = row.getElementsByClassName('DateEnd-wrapper')[0].querySelector('input');
                let textarea = wrapper.querySelector('textarea');
                let select = wrapper.querySelector('select');

                if (textarea) {
                    textarea.value = last_log['cells'][item]['previous'];
                }
                if (date_begin_input) {
                    if (last_log['cells'][item]['previous']){

                        date_begin_input.value = JSON.parse(last_log['cells'][item]['previous'])[0];
                    }
                    else {date_begin_input.value = '';}
                    if (last_log['cells'][item]['previous']) {
                        date_end_input.value = JSON.parse(last_log['cells'][item]['previous'])[1];
                    }
                    else {date_end_input.value = '';}   
                }
                if (select) {
                    select.selectedIndex = last_log['cells'][item]['previous'];
                    if (select.parentNode.parentNode.className == 'Category'){
                        fillGoodsTypes(select);
                    }
                    if (select.parentNode.parentNode.className == 'GoodsType'){
                        fillGoodsSubTypes(select);
                    }
                    
                }
            }
        }
        
        else if (last_log.action == 'add_rows'){
            let range = last_log['rows_range'];

            for (row_id=range[0]; row_id<=range[1]; row_id++) {
                let row = document.getElementById('row-'+String(row_id));
                if (row) {
                    row.remove();
                }
            }         
        }
        else if (last_log.action == 'load_files_handler2'){
            let rows = document.querySelectorAll('tbody > tr');
            if (rows) {
                rows.forEach((row,key) => {
                    let row_id = row.id.split('-')[1];
                    let wrapper = row.getElementsByClassName('Images-wrapper')[0];
                    let images_textarea = wrapper.querySelector('textarea');
                    images_textarea.value = '';
                })}
        }

        else if (last_log.action == 'remove_rows') {
            let rows = [];
            Object.keys(last_log.cells).forEach(function (item, index) {
                let id = Number(item.split('-')[2]);
                if ((rows.indexOf(id) == -1) && (id > 0)){
                    rows.push(id);
                }
            })
            rows.sort(function(a, b){return a - b});
            rows.reverse();

            let rows_amount = document.querySelectorAll('tbody > tr').length;

            for (let id=rows_amount; id >= rows[rows.length-1];id--) {
                    let this_row = document.getElementById(`row-${id}`);
                    if (this_row){
                        this_row.id = `row-${id + rows.length}`;
                    }
                    
                }
            
            rows.forEach(function (item, index) {
                let next_row = document.getElementById(`row-${item+1}`);
                if (next_row){
                    add_row(next_row, item, true, true);
                }
                else {
                    add_row(null, item, true, true);
                }

            })

            Object.keys(last_log.cells).forEach(function (item, index) {
              let id = item.split('-')[2];
              let class_name = item.split('-')[0] + '-' + item.split('-')[1];
              let row = document.getElementById(`row-${id}`);
              let wrapper = row.getElementsByClassName(class_name)[0];
              if (wrapper) {
                let date_begin_input = wrapper.querySelector('input');
                let date_end_input = row.getElementsByClassName('DateEnd-wrapper')[0].querySelector('input');
                let textarea = wrapper.querySelector('textarea');
                let select = wrapper.querySelector('select');
                if (textarea) {
                    textarea.value = last_log['cells'][item]['previous'];
                }
                if (date_begin_input) {
                    if (last_log['cells'][item]['previous'][0]){
                        date_begin_input.value = last_log['cells'][item]['previous'][0];
                    }
                    else {date_begin_input.value = '';}
                    if (last_log['cells'][item]['previous'][1]) {
                        date_end_input.value = last_log['cells'][item]['previous'][1];
                    }
                    else {date_end_input.value = '';}
                }
                if (select) {
                    select.selectedIndex = last_log['cells'][item]['previous'];

                    if (select.parentNode.parentNode.className == 'Category'){
                        fillGoodsTypes(select);
                    }
                    if (select.parentNode.parentNode.className == 'GoodsType'){
                        fillGoodsSubTypes(select);
                    }
                }
              }
            });
        }

}}


function manual_input_log(elem){
    let row_id = elem.parentNode.parentNode.parentNode.id.split('-')[1];
    let cells = {[elem.parentNode.className + '-' + row_id]: {'previous': elem.dataset.previous, 'new': elem.value}}
    
    addLog('manual_editing', cells)

}


function save_old_input_value(elem){
    if (elem.nodeName == 'SELECT') {
        elem.dataset.previous = elem.selectedIndex;
    }
    else {
        elem.dataset.previous = elem.value;
    }
}


function delete_row(elem){
    let cells_edited = {};
    const column_classes = [
        'IdRow-wrapper',
        'DateBegin-wrapper',
        'ListingFee-wrapper',
        'AdStatus-wrapper',
        'ContactMethod-wrapper',
        'CompanyName-wrapper',
        'ManagerName-wrapper',
        'ContactPhone-wrapper',
        'VideoUrl-wrapper',
        'Address-wrapper',
        'Category-wrapper',
        'GoodsType-wrapper',
        'AdType-wrapper',
        'GoodsSubType-wrapper',
        'Condition-wrapper',
        'Title-wrapper',
        'Description-wrapper',
        'Price-wrapper',
        'PriceType-wrapper',
        'Images-wrapper'];
    let rows = document.querySelectorAll('tbody > tr');
    let rows_amount = rows.length;
    let row = elem.parentNode.parentNode;
    let id_row = Number(row.id.split('-')[1]);
    if (row) {
        column_classes.forEach((column_class,key) => {
            let log_name = `${column_class}-${id_row}`;

            wrapper = row.getElementsByClassName(column_class)[0];
            if (wrapper) {
                let textarea = wrapper.querySelector('textarea');
                let select = wrapper.querySelector('select');
                if (textarea) {
                    cells_edited[log_name] = {'previous': textarea.value, 'new': ''};
                }
                if (column_class == 'DateBegin-wrapper') {
                    let date_begin_input = wrapper.querySelector('input');
                    let date_end_input = row.getElementsByClassName('DateEnd-wrapper')[0].querySelector('input');
                    cells_edited[log_name] = {'previous': [date_begin_input.value,date_end_input.value], 'new': ''};
                }
                if (select) {
                    cells_edited[log_name] = {'previous': select.selectedIndex, 'new': ''};
                }
            }
        })
        row.parentNode.removeChild(row);
    }
    
    if (Object.keys(cells_edited)) {
        addLog('remove_rows', cells_edited);
    }


    for (let id=id_row+1; id <= rows_amount;id++) {
        let this_row = document.getElementById(`row-${id}`);
        if (this_row) {
            this_row.id = `row-${id - 1}`;
        }
        
    }
}

function delete_rows(){
    let cells_edited = {};
    const column_classes = [
        'IdRow-wrapper',
        'DateBegin-wrapper',
        'ListingFee-wrapper',
        'AdStatus-wrapper',
        'ContactMethod-wrapper',
        'CompanyName-wrapper',
        'ManagerName-wrapper',
        'ContactPhone-wrapper',
        'VideoUrl-wrapper',
        'Address-wrapper',
        'Category-wrapper',
        'GoodsType-wrapper',
        'AdType-wrapper',
        'GoodsSubType-wrapper',
        'Condition-wrapper',
        'Title-wrapper',
        'Description-wrapper',
        'Price-wrapper',
        'PriceType-wrapper',
        'Images-wrapper'];
    let rows = document.querySelectorAll('tbody > tr');
    let rows_amount = rows.length;


    let from = Number(document.getElementById('delete-amount-from').value);
    if (from <1){
        from =1;
    }

    let to = Number(document.getElementById('delete-amount-to').value);

    
    for (let id=from; id<=to;id++){
        let row = document.getElementById(`row-${id}`);
        if (row) {
            column_classes.forEach((column_class,key) => {
                let log_name = `${column_class}-${id}`;
                wrapper = row.getElementsByClassName(column_class)[0];
                if (wrapper) {
                    let textarea = wrapper.querySelector('textarea');
                    let select = wrapper.querySelector('select');
                    if (textarea) {
                        cells_edited[log_name] = {'previous': textarea.value, 'new': ''};
                    }
                    if (column_class == 'DateBegin-wrapper') {
                        let date_begin_input = wrapper.querySelector('input');
                        let date_end_input = row.getElementsByClassName('DateEnd-wrapper')[0].querySelector('input');
                        cells_edited[log_name] = {'previous': [date_begin_input.value,date_end_input.value], 'new': ''};
                    }
                    if (select) {
                        cells_edited[log_name] = {'previous': select.selectedIndex, 'new': ''};
                    }
                }
            })
            row.parentNode.removeChild(row);
        }
        
    }
    if (Object.keys(cells_edited)) {
        
        addLog('remove_rows', cells_edited);
    }
    

    for (let id=to+1; id <= rows_amount;id++) {
        let this_row = document.getElementById(`row-${id}`);
        if (this_row){
            this_row.id = `row-${id - (to - from + 1)}`;
        }
        
    }
}


