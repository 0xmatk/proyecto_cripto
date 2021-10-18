
const URLGET_CRIP = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
const URLGET_DIV = "http://api.exchangeratesapi.io/v1/latest?access_key=452e716741fcbd33952a5e6910119093"


comenzar();

$("#botonActualizar").click(function () {
    comenzar()
  
})

function comenzar () {
    
    
    $.get(URLGET_CRIP, function (respuesta) {
      
            let almacenCriptomoneda = respuesta;
            $("#tabla").empty();
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
                
                $("#opciones").append (
                        `<option>${criptomoneda.current_price}</option>`       
                );
            }
            
           
    })

}

    
    // $.getJSON('divisas.json', function(data) {
    //     console.log(data);
    // })

//CONVERSOR

function convertir (){
    let cantidadCripto = document.getElementById('cripto').value
    

    let total = parseFloat(cantidadCripto)* 48076.50     
    total = total.toFixed(2);

    if (cantidadCripto != ''){
     document.getElementById('resultado').innerText= total;
    } else {
        document.getElementById('resultado').innerText = 'Por favor, ingrese la cantidad de bitcoin que desea convertir';
    }
}                                   

$("#boton").click(function () {
    convertir();
})
                        


