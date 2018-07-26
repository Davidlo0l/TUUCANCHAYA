var host='https://tucanchaya.000webhostapp.com';
var ApiUrl=host+'/api2.php';
// variables de logica
var canchaactual;
var fecha;
$(document).ready(function(){
    ValidarSesion(); 
      console.log("hola");
      $("#login").click(function(){
        console.log("login in");
        consultaCanchas('#menu');
        
            
      });
      $("#confirmaFecha").click(function(){
        console.log("Confirmando fecha y cancha");
        fecha=$("#fechaActual").val();
        console.log(fecha);
        consultaDispCancha('#cancha');
        
            
      });

      if (window.history && window.history.pushState) {

        window.history.pushState('forward', null, './#forward');
    
        $(window).on('popstate', function() {
          console.log("atras"+ window.location.href);
        });
    
      }
      
   });
   $(document).on("click",".selectable", function () {
    var clickedBtnID = $(this).attr('id'); // or var clickedBtnID = this.id
    canchaactual=clickedBtnID;
    console.log('you clicked on button #' + canchaactual);
    
 });
   
   ////consulta de canchas
   function consultaCanchas(clase){
        console.log('test WS');
        $.ajax({
            type: "get",
            url: ApiUrl,
            data: {'accion':'consultarCanchas'},
            complete : function(){
                console.log(this.url)
            },
            success:function(result){
                
                console.log('ejecucion de api correcta');
                console.log(result);
                $('.form').empty();
                
                var elements= result.data;
                var elementoActual;
                var futbol;
                for(var i=0; i<elements.length; i++){
                    imprimeCancha('.form', elements[i])
                 	
		            }

            },
            error:function(result){
                console.log("errorr ejecucion de webservice" );
                console.log(JSON.stringify(result));
            }
            
        });
   }

   function imprimeCancha(elemento,cancha){
    $(elemento).append(
        '<li class ="ui-li-has-thumb ui-last-child">'+ 
       ' <a href="#Fecha" class="ui-btn ui-btn-icon-right'+
        'ui-icon-carat-r selectable" id="'+cancha.id+'">'+
        '<img src="img/'+cancha.id+'.jpg" alt imagn cancha>'+
        ' <h2>'+cancha.nombrecancha+'</h2>'+
        '<p>'+(cancha.tipo==1?'Fútbol 5':'Futbol 7')+'</p>'+
        '</a>'+
   ' </li>'
    );
// DISPONIBILIDAD CANCHAS
   }
   function consultaDispCancha(elemento){
    $.ajax({
        type: "get",
        url: ApiUrl,
        data: {'accion':'consultaDispCancha',
                'fecha':fecha,
                'idcancha':canchaactual
        },
        complete : function(){
            console.log(this.url)
        },
        success:function(result){
            
            console.log('ejecucion de api disp canchas correcta');
            console.log(JSON.stringify(result));
            var data= result.data;
            console.log(data.id);
            $('#nomcancha').html(data.nombrecancha);
            $('#imgcancha').attr('src','img/'+data.id+'.jpg');
            $('#table-custom-2 tbody').empty();
            
            var elementoActual;
            var horas=data.horarios;
            for(var i=0; i<horas.length; i++){
                console.log(horas[i]);
                imprimeHorario('#table-custom-2 tbody', horas[i]);
                 
            }

        },
        error:function(result){
            console.log("errorr ejecucion de webservice" );
            console.log(JSON.stringify(result));
        }
        
    });

    
   }
   function imprimeHorario(elemento, hora){
     $(elemento).append('<tr> <th>    23/09/20 </th>'+
     '  <td>         <a data-rel="dialog" href="#Confirmar">'+
             'Disponible'+
      '   </a>     </td>'+
      ' <td>    '+hora+'     </td>'+
     '<td>         $50.000     </td>     <td>         15%     </td> </tr>');
     
   }
   function ValidarSesion(id){

   }