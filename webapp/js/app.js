
$(document).ready(function(){

    const listData = function(){
        $.get('http://localhost:3000/bills',function(result){
            console.log(result);
            $('#list_table tbody').empty()
            if(!result.data.length && !result.data.status){
                return;
            }
            result.data.forEach(function(bill){
                let tmpl = '<tr>'+
                           '  <td>' + bill.title + '</td>'+
                           '  <td>' + bill.price + '</td>'+
                           '  <td><button id="btn_delete" type="button" class="btn btn-danger btn-small" data-id='+ bill._id+' >Delete</button></td></td>'+
                           '</tr>';
                $('#list_table tbody').append(tmpl)
            })
          
        })
    }

    const createData = function(){
        let title = $('input[name="title"]').val()
        let price = $('input[name="price"]').val()

        if(!title || !price){
            console.log('Invalid Body')
            return
        }
        
        $.post('http://localhost:3000/bills',{title,price},function(result){
            $('input[name="title"]').val('')
            $('input[name="price"]').val('')
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
   
    listData()
    $('#btn_create').on('click', createData)
    $('#list_table tbody').on('click','#btn_delete', removeData)

})