
$(document).ready(function(){
    moment.locale('pt-br');         

    const listData = function(){
        $.get('http://localhost:3000/bills',function(result){
            $('#list_table tbody').empty()
            if(!result.data.length && !result.data.status){
                return;
            }
            result.data.forEach(function(bill){
                bill.cep = (bill.cep)? '<a href="http://localhost:3000/address/' + bill.cep + '" target="_blank">' + bill.cep + '</a>' : '-';
                let tmpl = '<tr>'+
                           '  <td align=center>' + bill.title + '</td>'+
                           '  <td align=center>' + bill.price + '</td>'+
                           '  <td align=center>' +  moment(bill.date).format('L LT') + '</td>'+
                           '  <td align=center>'+bill.cep+'</td>'+
                           '  <td align=center><button id="btn_delete" type="button" class="btn btn-danger btn-small" data-id='+ bill._id+' >Delete</button></td></td>'+
                           '</tr>';
                $('#list_table tbody').append(tmpl)
            })
          
        })
    }

    const populateCategory = function(){
        $.get('http://localhost:3000/categories',function(result){
            $('#select_category').empty();
  
            if(!result.data.length && !result.data.status){
                return;
            }

            result.data.forEach(function(category){
                let tmpl = '<option value='+ category._id +'>'+ category.name +'</option>';
                $('#select_category').append(tmpl)
            })
        });
    }

    const createData = function(){
        let title = $('input[name="title"]').val()
        let price = $('input[name="price"]').val()
        let category = $('#select_category').val()
        let cep = $('input[name="cep"]').val()

        if(!title || !price || !category){
            console.log('Invalid Body')
            return
        }
        
        $.post('http://localhost:3000/bills',{title,price,category,cep},function(result){
            $('input[name="title"]').val('')
            $('input[name="price"]').val('')
            $('#select_category').val('')
            $('input[name="cep"]').val('')
            listData()
        });

    }
    
    const removeData = function(){
        let id = $(this).data('id');
        $.ajax({
            url:'http://localhost:3000/bills/'+id,
            type:'DELETE',
            success: function(result){
                listData()
            }
        })
        console.log($(this).data('id'))
    }

    const createDataCat = function(){
        let name = $('input[name="name"]').val()

        if(!name){
            console.log('Invalid Body')
            return
        }
        
        $.post('http://localhost:3000/categories',{name},function(result){
            $('input[name="name"]').val('')
            populateCategory()
        });

    }
    listData()
    populateCategory()
    $('#btn_create').on('click', createData)
    $('#btn_create_cat').on('click', createDataCat)
    $('#list_table tbody').on('click','#btn_delete', removeData)

})