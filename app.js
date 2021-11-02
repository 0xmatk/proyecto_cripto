
const URLGET_CRIP = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
const URLGET_DIV = "http://api.exchangeratesapi.io/v1/latest?access_key=874a110b541ed82e509e950a45917795"


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

    $.get(URLGET_DIV, function (respuesta){


        localStorage.setItem('divisa', JSON.stringify(respuesta))

        let almacenDivisas = respuesta;

        $("#opcionesDivisa").append(
            `<option value=${almacenDivisas.rates.ARS}>ARS</option>`       
           
        )
        $("#opcionesDivisa").append(
            `<option selected value=${almacenDivisas.rates.USD}>USD</option>`       
           
        )
        $("#opcionesDivisa").append(
            `<option value=${almacenDivisas.rates.EUR}>EUR</option>`       
           
        )
    
    })

function convertir (){
    // CRIPTOMONEDAS
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
     document.getElementById('resultado').innerText = cantidadCripto + ' ' + monedaSelect + ' '  + ' ' + '=' + '' + total;
    } else {
        document.getElementById('resultado').innerText = 'Por favor, ingrese la cantidad de bitcoin que desea convertir';
    }
}            


$("#boton").click(function () {
    convertir();
})


$("#iniciarSesion").prepend(`<div class="modal fade" id="myModal" tabindex="-1" aria-hidden="true" aria-labelledby="modalTitle">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title id="modalTitle">Iniciar sesión</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="cerrar"></button>
            </div>
            <div class="modal-body">
            <form>
            <!-- Email input -->
            <div class="form-outline mb-4">
                <label class="form-label">Correo Electronico</label>
                <input type="email" id="emailSesion" class="form-control" />
        
              
            </div>
          
          
            <div class="form-outline mb-4">
                <label class="form-label" style="text-align: left">Contraseña</label>
                <input type="password" id="contrasenaSesion" class="form-control" />
                <p>La contraseña debe contener letras y números, con una longitud mínima de 8 caracteres.</p>
                
            </div>
          
            <button type="submit" id="botonSesion" class="btn btn-primary btn-block">Iniciar Sesión</button>
          </form>
            </div>
            <div class="modal-footer">
              
            </div>
        </div>
    </div>

   </div> `);

$("#registro").prepend(`<div class="modal fade" id="myModal1" tabindex="-1" aria-hidden="true" aria-labelledby="modalTitle">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title id="modalTitle">Registrarse</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="cerrar"></button>
        </div>
        <div class="modal-body">
        <form>
        <!-- Email input -->
        <div class="form-outline mb-4">
            <label class="form-label">Correo Electronico</label>
            <input type="email" id="emailRegistro" class="form-control" />
    
          
        </div>
      
      
        <div class="form-outline mb-4">
            <label class="form-label" style="text-align: left">Contraseña</label>
            <input type="password" id="contrasenaRegistro" class="form-control" />
            <p>La contraseña debe contener letras y números, con una longitud mínima de 8 caracteres.</p>
        </div>

      
        <button type="submit" id="botonRegistro" class="btn btn-primary btn-block">Registrarse</button>
      </form>
        </div>
        <div class="modal-footer">
          
        </div>
    </div>
</div>

</div>`)


function almacenarDatos () {

let emailRegistro = $("#emailRegistro").val();

console.log(emailRegistro);

localStorage.setItem('emailRegistro', emailRegistro);

console.log(emailRegistro);

}




$("#botonLogin").click(() => { 
$("#myModal").animate({
    height: 'toggle'
},"slow");
});

$("#botonRegistro").click((e) => { 
    e.preventDefault()

    $("#myModal1").animate({
        height: 'toggle'
},"slow");

almacenarDatos();
});


                 












 
