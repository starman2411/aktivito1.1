let rows = document.querySelectorAll('tbody > tr');
rows.forEach((row,key) => {
    let row_id = row.id.split('-')[1];
    let wrap = row.getElementsByClassName('DateBegin-wrapper')[0];
    let wrap_end = row.getElementsByClassName('DateEnd-wrapper')[0];
    let input_date_begin = wrap.querySelector('input');
    let input_date_end = wrap_end.querySelector('input');
    let air = new AirDatepicker(input_date_begin, {
    timepicker: true,
    dateFormat(date, x=row_id) {
        return get_string_date(date);
    },
    onSelect({date, formattedDate, datepicker}){
        let next_date = new Date(date);
        next_date.setDate(next_date.getDate() + 30);
        input_date_end.value = get_string_date(next_date);
        manual_input_log(datepicker.$el,row_id);
    },
});
air.$el.onclick = function(event){if((event.which != 3) ) {
    air.show();
    let row_id = event.currentTarget.parentNode.parentNode.parentNode.id.split('-')[1];
    let date_end_input = document.getElementById(`row-${row_id}`).getElementsByClassName('DateEnd-wrapper')[0].querySelector('input');
    event.currentTarget.dataset.previous = JSON.stringify([event.currentTarget.value, date_end_input.value]);
 }};
});

function fillGoodsTypes(row_number) {
    const row = document.getElementById('row-' + String(row_number));
    const goods_type_select = row.getElementsByClassName('GoodsType-wrapper')[0].querySelector('select');
    const goods_subtype_select = row.getElementsByClassName('GoodsSubType-wrapper')[0].querySelector('select');
    const category_select = row.getElementsByClassName('Category-wrapper')[0].querySelector('select');
    const category = category_select.options[category_select.selectedIndex].text;
    const goods_types = Object.keys(category_cascade[category]);
    goods_type_select.replaceChildren();
    goods_subtype_select.replaceChildren();
    goods_type_select[0] = new Option('',0);
    goods_types.forEach((element,key) => {
        goods_type_select[key+1] = new Option(element,key);
    });
}


function fillGoodsSubTypes(row_number) {
    const row = document.getElementById('row-' + String(row_number));
    const goods_subtype_select = row.getElementsByClassName('GoodsSubType-wrapper')[0].querySelector('select');
    const category_select = row.getElementsByClassName('Category-wrapper')[0].querySelector('select');
    const category = category_select.options[category_select.selectedIndex].text;
    const goods_types_select = row.getElementsByClassName('GoodsType-wrapper')[0].querySelector('select');
    const goods_type = goods_types_select.options[goods_types_select.selectedIndex].text;
    const goods_subtypes = category_cascade[category][goods_type];
    goods_subtype_select.replaceChildren();
    goods_subtype_select[0] = new Option('',0);
    goods_subtypes.forEach((element,key) => {
        goods_subtype_select[key+1] = new Option(element,key);
    });
}





 function pack_to_json() {
    let rows = document.querySelectorAll('tbody > tr');
    let rows_amount = rows.length;
    let table = [];

    function get_select_value(row, class_name) {
        let select = row.getElementsByClassName(class_name)[0].querySelector('select');
        if (select.options[select.selectedIndex]){
            return(select.options[select.selectedIndex].text);
        }
        else{
            return('');
        }
    }

    for (id = 1; id<=rows_amount; id++) {
        let row = document.getElementById('row-'+ String(id));
        let row_string = {
            'Id' : Number(row.getElementsByClassName('IdRow-wrapper')[0].querySelector('textarea').value),
            'DateBegin' : row.getElementsByClassName('DateBegin-wrapper')[0].querySelector('input').value,
            'DateEnd' : row.getElementsByClassName('DateEnd-wrapper')[0].querySelector('input').value,

            'ListingFee' : get_select_value(row, 'ListingFee-wrapper'),
            'AdStatus' : get_select_value(row, 'AdStatus-wrapper'),
            'ContactMethod' : get_select_value(row, 'ContactMethod-wrapper'),

            'CompanyName' : row.getElementsByClassName('CompanyName-wrapper')[0].querySelector('textarea').value,
            'ManagerName' : row.getElementsByClassName('ManagerName-wrapper')[0].querySelector('textarea').value,
            'ContactPhone' : row.getElementsByClassName('ContactPhone-wrapper')[0].querySelector('textarea').value,
            'VideoUrl' : row.getElementsByClassName('VideoUrl-wrapper')[0].querySelector('textarea').value,
            'Address' : row.getElementsByClassName('Address-wrapper')[0].querySelector('textarea').value,

            'Category' : get_select_value(row, 'Category-wrapper'),
            'GoodsType' : get_select_value(row, 'GoodsType-wrapper'),
            'AdType' : get_select_value(row, 'AdType-wrapper'),
            'GoodsSubType' : get_select_value(row, 'GoodsSubType-wrapper'),
            'Condition' : get_select_value(row, 'Condition-wrapper'),

            'Title' : row.getElementsByClassName('Title-wrapper')[0].querySelector('textarea').value,
            'Description' : row.getElementsByClassName('Description-wrapper')[0].querySelector('textarea').value,
            'Price' : row.getElementsByClassName('Price-wrapper')[0].querySelector('textarea').value,

            'PriceType' : get_select_value(row, 'PriceType-wrapper'),
            'Images' : row.getElementsByClassName('Images-wrapper')[0].querySelector('textarea').value,
        };
        if (document.getElementById("hide-end-time-box").checked){
            delete row_string['DateEnd'];
        }
        if (document.getElementById("hide-type-box").checked){
            delete row_string['GoodsType'];
        }
        if (document.getElementById("hide-subtype-box").checked){
            delete row_string['GoodsSubType'];
        }
        table.push(row_string);
    }
    return(JSON.stringify(table));
}