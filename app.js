
const URLGET_CRIP = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

comenzar();


function comenzar () {
    
    $.get(URLGET_CRIP, function (respuesta) {

            localStorage.setItem('criptomonedas', JSON.stringify(respuesta))

            let almacenCriptomoneda = respuesta;

            console.log(almacenCriptomoneda);
       
            for( const criptomoneda of almacenCriptomoneda) {
                $("#tabla").append(
                    `<tbody>
                        
                               <tr>
                                   <th scope="row"><span>${criptomoneda.name}</span></th>
                                   <td>${criptomoneda.symbol}</td>
                                   <td>$${criptomoneda.current_price}</td>
                                   <td>${criptomoneda.price_change_24h}</td> 
                                   <td>${criptomoneda.total_volume}</td> 
                               </tr>
                    </tbody>`);
                
                
                $("#opcionesCripto").append (
                        `<option value=${criptomoneda.id}>${criptomoneda.name}</option>`       
                        
                );

                
            }
            
            
           
    })

}


function convertir (){

    let monedaLocal = JSON.parse(localStorage.getItem('criptomonedas')) //traigo las monedas que guarde en localStorage
    console.log(monedaLocal);

    let monedaSelect=$("#opcionesCripto").val() //identifico el option que esta elegido o por defecto
    console.log(monedaSelect);

    let priceMoneda= monedaLocal.find(el=> el.id == monedaSelect) //busco en el array que traigo del LocalStorage el que coincida con el option
    console.log(priceMoneda);

    let cantidadCripto = document.getElementById('cripto').value

    let total = parseFloat(cantidadCripto) 
    total = total.toFixed(2) * priceMoneda.current_price; // lo multiplico por la cantidad del input


    if (cantidadCripto != ''){

        document.getElementById('resultado').textContent = cantidadCripto + ' ' + monedaSelect + ' '  + ' ' + '=' + ' ' + total + 'USD';
    } else {

        document.getElementById('resultado').textContent = 'Por favor, ingrese la cantidad de bitcoin que desea convertir';
    }
}            


$("#boton").click(function () {
    convertir();
})



$("#registro").prepend(`<div class="modal fade" id="myModal1" tabindex="-1" aria-hidden="true" aria-labelledby="modalTitle">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title id="modalTitle">Registrarse</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="cerrar"></button>
        </div>
        <div class="modal-body">
        <form class=form-control>
        <!-- Email input -->
        <div class="form-outline mb-4">
            <label class="form-label">Ingrese un ID</label>
            <input type="text" id="idRegistro" class="form-control"/>
    
          
        </div>

      
        <button  id="botonRegistro2" class="btn btn-primary btn-block">Registrarse</button>
        <span class="error"><p id="error"></p></span>
      </form>
        </div>
        <div class="modal-footer">
          
        </div>
    </div>
</div>

</div>`
)



function almacenarDatos () {

  
    let idRegistro = $("#idRegistro").val();

    if (idRegistro === ''){
        console.log('Error');

    } else {
        localStorage.setItem('idRegistro', idRegistro);
        console.log(idRegistro);
       
    }
    obtenerDatos();
}

function obtenerDatos () {

    if(localStorage.idRegistro){
       let idUser = localStorage.getItem('idRegistro')
       document.getElementById('usuario').innerHTML = `<div>${idUser}<i class="fa-solid fa-user-large fa-lg"></i></div>`;
       document.getElementById('cerrarSesion').style.display;
       document.getElementById('botonRegistro1').style.display= 'none';
       
    }
    else {
        document.getElementById('botonRegistro1').style.display;
        document.getElementById('cerrarSesion').style.display = 'none';
    }
   

}




obtenerDatos();

$("#botonRegistro2").click((e) => {
    e.preventDefault()
    almacenarDatos();
    $("#myModal1").modal('hide');
});


$("#cerrarSesion").click (() => {
    $("#cerrarSesion").remove()
    $("#usuario").remove()
    localStorage.clear()
})




