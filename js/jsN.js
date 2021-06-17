//----------------------------------------------------------------------------------------------------------//
//                                          VARIABLES GLOBALES                                              //
//----------------------------------------------------------------------------------------------------------//

var palo = new Array();             		//Array para el palo de la banca				
var contadorUnidos = null; 				    //Contador del número de personas que se han unido 				
const APUESTA_MINIMA = 10;				    //Constante de la apuesta mínima				
var unirse = false;				            //Devuelve verdadero una vez que el nuevo jugador esté unido				
var totalTime = 5;				            //Inicializador de la cuenta regresiva				
var contamosPosicion = 0;								
var cartasSacadasBanca = new Array();		//Matriz con las cartas que se le han sacado a la banca				
var arrayValorCartasBanca = new Array();	//Matriz con el valor de las cartas que se le han sacado a la banca				
var sumaTotalBanca =0; 				    //Suma total del valor de las cartas de la banca				
var contadorManosTerminadas = 0;			//Suma uno cada vez que la mano se da por finalizada				
var contadorManos = 0;				        //Suma uno cada vez que hay una nueva mano en juego				
var jugador = new Array('Banca');			//Matriz en la que se incorporan el nombre de los jugadores (el primero, por defecto es la banca)				




//----------------------------------------------------------------------------------------------------------//
//                                          CLASE JUGADOR                                                   //
//----------------------------------------------------------------------------------------------------------//




function Jugador(){  
//----------------------------------------------------------------------------------------------------------//
//                                          ATRIBUTOS DE LA CLASE                                           //
//----------------------------------------------------------------------------------------------------------//                                                         
    var plantado = false;                               //Devuelve verdadero si el jugador se ha plantado
    var cartasDivididas1 = new Array();                 //Si el jugador se ha dividido, la primera mitad de sus cartas, se instalan en este array
    var cartasDivididas2 = new Array();
    var apuestaDoblada = null;                          //Se rellena si la apuesta es doblada, con el doble de la apuesta inicial
    var apuestaDividida1 = null;                        //Si el jugador se ha dividido, la primera mitad de su apuesta, se instala en este array
    var apuestaDividida2 = null;
    var arrayValorCartas1 = new Array();                //Si el jugador se ha dividido, la primera mitad del valor sus cartas, se instalan en este array
    var arrayValorCartas2 = new Array();
    var nombre = null;                                  //Rellena con el nombre del jugador que se une
    let apuesta = null;                                 //Apuesta de dinero inicial
    let dinero = null;                                  //Dinero con el que se comienza a jugar
    var palo = ['P','D','C','T'];                       //Palo de las cartas
    var carta = [2,3,4,5,6,7,8,9,10,11,12,13,1];        //Numeración de las cartas (11,12,13,14) corresponde con J,Q,K y el 1 con el As
    var cartaEntregaPalo = null;                        //Palo que ha  salido
    var cartaEntregaCarta = null;                       //Número de la carta que ha salido
    var cartasSacadas = new Array();                    //Se rellena a cada jugador de manera independiente con la concatenacion del palo + el numero de carta
    var arrayValorCartas = new Array();                 //Matriz para el valor de cada carta
    var valorCarta = null;                              //Valor de la carta de manera individual
    var sumaTotal=null;                                 //Suma total del valor de las cartas del jugador
    var dividido = false;                               //Devuelve true si el jugador se enciuentra dividido
    var ganador;                                        //Devuelve verdadero si el jugador ha ganado
    
//----------------------------------------------------------------------------------------------------------//
//                                          MÉTODOS DE LA CLASE                                             //
//----------------------------------------------------------------------------------------------------------//

    function finalizacion(){            
        if(ganador==true && this.doblar==false){            
            dinero += apuesta*2;                        
        }else{
            dinero += apuestaDoblada*2;
        }
        apuesta = 0;
        arrayValorCartas = 0;
        cartasSacadas = 0;
        sumaTotalBanca = 0;
        sumaTotal = 0;
        dividido = false;
        plantado = false;
        apuestaDividida1 = 0;
        apuestaDividida2 = 0;
        arrayValorCartas1 = 0;
        arrayValorCartas2 = 0;
        contadorManos = 0;
        contadorManosTerminadas = 0;
    }
    //-------------------------------------------COMPROBAR EL GANADOR---------------------------------------------------------------//
    function comprobamosGanador(){
        
            switch(true){
                case(sumaTotal>21 && sumaTotalBanca <=21): ganador = false; console.log('Pierde Jugador ' + nombre);break;
                case(sumaTotal<=21 && sumaTotalBanca >21): ganador = true; console.log('Gana Jugador ' + nombre);break;
                case(sumaTotal==21 && sumaTotalBanca ==21): ganador = true; console.log('Gana Jugador ' + nombre);break;
                case(sumaTotal>21 && sumaTotalBanca >=21): ganador = false;console.log('Pierde Jugador ' + nombre);break;
                case(sumaTotal<21 && sumaTotalBanca <21): (sumaTotal > sumaTotalBanca)?ganador = true:ganador = false;break;
                default: console.log('Se ha producido un error en el recuento'+nombre);
                
            }
        
        finalizacion();
    }
//-------------------------------------------REPARTO DE LA RONDA FINAL---------------------------------------------------------------//
    function repartoFinal (){
        if(contadorManosTerminadas == contadorManos){               //Una vez que todas las manos estén terminadas se repartirá a la banca
            for(;sumaTotalBanca<17;){
                console.log('Como es menor que 17, le voy a dar otra carta');
                darCartaBanca();
            };
                if(sumaTotalBanca>=17){
                    arrayValorCartasBanca.splice(arrayValorCartasBanca.length);
                    console.log('Voy a comprobar, ya que es mayor de 17');
                 
                }
        }
           
    }
    
//-------------------------------------------INSERTE NOMBRE DEL JUGADOR---------------------------------------------------------------// 
    function insertarnombreJugador(){  
        jugador.push(nombre);           
        console.log(jugador);
        }
//-------------------------------------------COMPRUEBA EL NÚMERO DE JUGADORES QUE HAY EN LA MESA---------------------------------------//
    function numeroJugadores() { 
        var numJuga = null;
        numJuga = jugador.length;
        console.log(numJuga);
    }
        
//-------------------------------------------DAR CARTA - ASOCIADO A PEDIR CARTA------------------------------------------------------//

    function darCarta() {
        sumaTotal = 0;
        cartaEntregaPalo = palo[Math.floor(Math.random()*(4))];                  
        cartaEntregaCarta = carta[Math.floor(Math.random()*(carta.length))];     
        cartaEntregaCarta = Number.parseInt(cartaEntregaCarta);
           
            if(cartaEntregaCarta>=2 && cartaEntregaCarta<11){
                valorCarta = cartaEntregaCarta;
                alert(valorCarta);
            } else if(cartaEntregaCarta>=11 && cartaEntregaCarta<=13){
            valorCarta = 10;
            }else if(cartaEntregaCarta == 1){
                if(confirm('¿Quieres que el valor de tu carta sea igual a uno?'+nombre)){
                    valorCarta = 1;
                }else{
                    valorCarta = 10;
                }
            
            }
        arrayValorCartas.push(valorCarta);
            for(var i = 0; i<arrayValorCartas.length;i++){
                sumaTotal += arrayValorCartas[i];
            } 
        cartasSacadas.push(cartaEntregaCarta+cartaEntregaPalo);               

    }
    

    
    
//-------------------------------------------UNIRSE EL JUGADOR A LA PARTIDA - ASOCIADO AL BOTON UNIRSE----------------------------------------// 
    this.unirme = function(){
        nombre = prompt('Inserte su nombre');
        if(nombre!=null){
            dinero = +(prompt('Hola '+nombre+' ,introduzca el dinero con el que desea comenzar'));    
           
            if(dinero > 0){
                contadorUnidos++;
                unirse = true;
                if(nombre!='Banca'){
                    darCarta();
                    darCarta();
   
                }
                
            }
            
        }
        if(unirse == true){
            contadorManos += 1;
            insertarnombreJugador();
            numeroJugadores();
            console.log('Contador de manos: '+contadorManos);
            repartoFinal();
        }
        
    }
   
 //----------------------------------------------------APOSTAR - ASOCIADO AL BOTON APOSTAR--------------------------------------------------------------------------//    
    this.apostar=function(){       
        if(nombre !=null){
            apuesta = +(prompt(nombre+', introduzca el dinero que desea apostar'));                    
            if(apuesta>dinero || apuesta<APUESTA_MINIMA){
                alert(nombre+' recuerde, la apuesta mínima son 10€ y debe tener suficientes fondos');  
            }else{
                dinero -= apuesta;                            
                console.log('Esta es la apuesta: '+apuesta+nombre);                                    
                console.log('Esta es el dinero tras la apuesta: '+dinero+nombre);          
    
            
            }
        }else{
            alert('Si desea jugar, debe unirse a la partida');
        }

    
    }
//-------------------------------------------PERMITIR JUGADOR - NO SE USA----------------------------------------// 
    this.permitidoJugar = function(){                                                       
        this.permiso = true;
            if(ganador == 'banca' && dinero < APUESTA_MINIMA){
                alert(nombre+' no tiene suficiente dinero para continuar, por favor agregue a su cuenta');
                dinero = +(prompt(nombre+' introduzca el dinero con el que desea comenzar')); 
            }
    }

//-------------------------------------------PEDIR CARTA ASOCIADA A LA FUNCION DAR CARTA Y AL BOTON PEDIR CARTA----------------------------------------// 
    this.pedirCarta = function(){
        var sumaTotalCartasDivididas1 = 0;
        var sumaTotalCartasDivididas2 = 0;
        if(dividido == false){
            if(apuesta>0){    
                darCarta();
                console.log('Este es el array de cartas sacadas: '+cartasSacadas+', '+nombre);
                console.log('Este es el array del valor numerico: '+arrayValorCartas+', '+nombre);
                console.log('Esta es la suma total de puntos: '+sumaTotal+', '+nombre);
                if(sumaTotal>=21){
                    contadorManosTerminadas +=1;
                    console.log('Contador manos terminadas: '+contadorManosTerminadas);
                    repartoFinal();
                }
            }else{
                    alert('Introduzca la cantidad de dinero que desea jugar');
            }
        }else if(dividido == true){
            if(confirm('¿Desea que esta carta para la primera mano?')){
                cartaEntregaPalo = palo[Math.floor(Math.random()*(4))];
                cartaEntregaCarta = carta[Math.floor(Math.random()*(carta.length))];  
                cartaEntregaCarta = Number.parseInt(cartaEntregaCarta);
                cartasDivididas1.push(cartaEntregaCarta+cartaEntregaPalo); 
                console.log('Este es el array de cartas sacadas: '+cartasDivididas1+', '+nombre);
                    if(cartaEntregaCarta>=2 && cartaEntregaCarta<11){
                        valorCarta = cartaEntregaCarta;
                        alert(valorCarta);
                    } else if(cartaEntregaCarta>=11 && cartaEntregaCarta<=13){
                    valorCarta = 10;
                    }else if(cartaEntregaCarta == 1){
                        if(confirm('¿Quieres que el valor de tu carta sea igual a uno?')){
                            valorCarta = 1;
                        }else{
                            valorCarta = 10;
                        }
                    arrayValorCartas1.push(valorCarta);
                        for(var i = 0; i<arrayValorCartas1.length;i++){
                            sumaTotalCartasDivididas1 += arrayValorCartas1[i];
                        } 
                            if(sumaTotalCartasDivididas1>=21){
                            contadorManosTerminadas+=1; console.log('Contador manos terminadas: '+contadorManosTerminadas);
                            repartoFinal();
                        }
            }else{
                cartaEntregaPalo = palo[Math.floor(Math.random()*(4))];
                cartaEntregaCarta = carta[Math.floor(Math.random()*(carta.length))];  
                cartaEntregaCarta = Number.parseInt(cartaEntregaCarta);
                cartasDivididas2.push(cartaEntregaCarta+cartaEntregaPalo);
                console.log('Este es el array de cartas sacadas: '+cartasDivididas2+', '+nombre);

                    if(cartaEntregaCarta>=2 && cartaEntregaCarta<11){
                        valorCarta = cartaEntregaCarta;
                        alert(valorCarta);
                    } else if(cartaEntregaCarta>=11 && cartaEntregaCarta<=13){
                    valorCarta = 10;
                    }else if(cartaEntregaCarta == 1){
                        if(confirm('¿Quieres que el valor de tu carta sea igual a uno?')){
                            valorCarta = 1;
                        }else{
                            valorCarta = 10;
                        }
                }
                    arrayValorCartas2.push(valorCarta);
                        for(var i = 0; i<arrayValorCartas2.length;i++){
                            sumaTotalCartasDivididas2 += arrayValorCartas2[i];
                        } 
                            if(sumaTotalCartasDivididas2>=21){contadorManosTerminadas+=1;
                                repartoFinal();
                            }
            }
           }

                console.log('Valor del array dividido 1 es: '+arrayValorCartas1+nombre);
                console.log('Valor del array dividido 2 es: '+arrayValorCartas2+nombre);
                
        }
        console.log('La suma total por ahora es de: '+sumaTotal+nombre);
    }
        
//-------------------------------------------PLANTARSE ASOCIADA AL FOTON PLANTARSE----------------------------------------// 
    this.mePlanto = function(){
        if(confirm(nombre+' ¿está seguro que desea plantarse?')){
            plantado = true;
            console.log('Estoy plantado: '+plantado+"-"+nombre);
           if(dividido == true){
               contadorManosTerminadas +=2;
               repartoFinal();
           }else{contadorManosTerminadas +=1;}
        }
        console.log('El contador de manos terminadas: '+contadorManosTerminadas);
        console.log('El contador de manos totales: '+contadorManos);
        console.log('El contador de manos terminadas: '+contadorManosTerminadas == contadorManos);
        repartoFinal();
        
    }
//-------------------------------------------DOBLAR ASOCIADA AL FOTON DOBLAR----------------------------------------// 
    this.doblar = function(){        
        if(dividido==false){
            this.doblado = false;
            if(confirm(nombre+' ¿Está seguro que desea doblar?')){
                this.doblado = true
                dinero -= apuesta;                                                              
                apuesta = apuesta *2;                                                           
            console.log(this.doblado+nombre);
            
            console.log('Dinero total: ' + dinero+nombre);}
        }else{
            alert('Una vez dividido, no puede doblar su apuesta');
        }
    }
//-------------------------------------------DIVIDIR ASOCIADA AL BOTON DIVIDIR----------------------------------------// 
    this.dividir = function(){
        if(cartasSacadas.length >1){
            dividido = true;
            
            contadorManos +=1;

            cartasDivididas1 = cartasSacadas.splice(0,(cartasSacadas.length/2));
            cartasDivididas2 = cartasSacadas.splice(0,(cartasSacadas.length));

            arrayValorCartas1 = arrayValorCartas.splice(0,(arrayValorCartas.length/2));
            arrayValorCartas2 = arrayValorCartas.splice(0,(arrayValorCartas.length));

            cartasSacadas.length = 0;

            apuestaDoblada = apuesta*2;
            dinero -= apuesta;
            apuestaDividida1 = apuestaDoblada/2;
            apuestaDividida2 = apuestaDoblada/2;
            console.log('Contador de manos: '+contadorManos+nombre);
            repartoFinal();

        }else{
            alert('No puede dividir la apuesta, no cuenta con las suficientes cartas');
        }

        console.log('Cartas divididas 1: '+cartasDivididas1+nombre);
        console.log('Cartas divididas 2: '+cartasDivididas2+nombre);
        console.log('cartasSacadas: '+cartasSacadas+nombre);
        console.log(dividido+nombre);
        console.log('apuestaDoblada: '+apuestaDoblada+nombre);
        console.log('apuestaDividida1: '+apuestaDividida1+nombre);
        console.log('apuestaDividida2: '+apuestaDividida2+nombre);
        console.log('dinero: '+dinero);
        console.log('Valor del array antes de dividir es: '+arrayValorCartas+nombre);
        console.log('Valor del array dividido 1 es: '+arrayValorCartas1+nombre);
        console.log('Valor del array dividido 2 es: '+arrayValorCartas2+nombre);
        
    }


//-------------------------------------------RETIRARSE ASOCIADA AL BOTON RETIRARSE----------------------------------------// 
    this.retirarse = function(){
        if(dividido==false){
           confirm(nombre+' ¿Está seguro que desea abandonar la partida?');
            if(confirm){
                dinero += apuesta/2;
                contadorManosTerminadas += 1;
                console.log('El contador de manos terminadas: '+contadorManosTerminadas);
                repartoFinal();
            }
            console.log('Se te añade la mitad de la apuesta: ' + dinero+nombre);
            for(var i = 0; i<jugador.length; i++){                          
                if(nombre == jugador[i]){       
                    jugador.splice(i,1);
                }
            }
            console.log(jugador);
        }else{
            alert('Usted está dividido, ¿se cree que somos tontos?');
        }
    }

 
    this.quienGana = function(){
        comprobamosGanador();
    }


}
//-------------------------------------------FINAL DE LA CLASE JUGADOR----------------------------------------------------------// 




//------------------------------------------------------------------------------------------------------------------------------//
//                                  FUNCIONES GENERALES                                                                        //
//-----------------------------------------------------------------------------------------------------------------------------//





//-------------------------------------------CUENTA ATRÁS----------------------------------------------------------// 
function cuentaAtras() {
    document.getElementById('cuentaAtras').innerHTML = totalTime; 
    if(totalTime==0){                                              
      console.log('Final');
      darCartaBanca();
    }else{
      totalTime-=1;
      setTimeout("cuentaAtras()",1000);
      
    }
    return totalTime;
  }
//-------------------------------------------DAR CARTA A LA BANCA----------------------------------------------------------// 
function darCartaBanca() {
    sumaTotalBanca = 0;
    var valorCartaBanca = null;
    var palo = ['P','D','C','T'];
    var carta = [2,3,4,5,6,7,8,9,10,11,12,13,1];
    var cartaEntregaPalo = null;
    var cartaEntregaCarta = null;
    cartaEntregaPalo = palo[Math.floor(Math.random()*(4))];                  
    cartaEntregaCarta = carta[Math.floor(Math.random()*(carta.length))];       
    cartasSacadasBanca.push(cartaEntregaCarta+cartaEntregaPalo);              
    console.log('Este es el array de cartas sacadas para la banca: '+cartasSacadasBanca);
    
        
        if(cartaEntregaCarta>=2 && cartaEntregaCarta<11){
            valorCartaBanca = cartaEntregaCarta;
        } else if(cartaEntregaCarta>=11 && cartaEntregaCarta<=13){
            valorCartaBanca = 10;
        }else if(cartaEntregaCarta == 1){
            if(arrayValorCartasBanca<=6){
                valorCartaBanca = 11;
            }else{
                valorCartaBanca = 1;
            }
        }
        arrayValorCartasBanca.push(valorCartaBanca);
        for(var i = 0; i<arrayValorCartasBanca.length-1;i++){
            sumaTotalBanca += arrayValorCartasBanca[i];
            console.log("La suma total de la banca es: "+sumaTotalBanca);
        }                                                           
}




//-------------------------------------------FINAL DE LAS FUNCIONES GENERALES----------------------------------------------------------// 



//-------------------------------------------DECLARACIÓN DE LAS NUEVAS CLASES----------------------------------------------------------// 
var j = new Jugador();
var s = new Jugador();

//-------------------------------------------INICIAMOS EL CRONO CUANDO SE CARGUE LA PÁGINA---------------------------------------------// 
window.onload = cuentaAtras;



//----------------------------------------------------------------------------------------------------------//
//                                  BOTONES PARA EL JUGADOR NÚMERO 1                                        //
//----------------------------------------------------------------------------------------------------------//
var bUnirme = document.getElementById('unirme');
    bUnirme.addEventListener('click',j.unirme);


var bApostar = document.getElementById('apostar');
    bApostar.addEventListener('click',j.apostar);

var bDame = document.getElementById('dame');
    bDame.addEventListener('click',j.pedirCarta);

var bmePlanto = document.getElementById('mePlanto');
    bmePlanto.addEventListener('click',j.mePlanto);

var bDoblar= document.getElementById('doblar');
    bDoblar.addEventListener('click',j.doblar);

var bDividir = document.getElementById('dividir');
    bDividir.addEventListener('click',j.dividir);

var bRetirarse = document.getElementById('retirarse');
    bRetirarse.addEventListener('click',j.retirarse);

var bdeterminaGanador = document.getElementById('determinaGanador');
    bdeterminaGanador.addEventListener('click',j.quienGana);

   
//----------------------------------------------------------------------------------------------------------//
//                                  BOTONES PARA EL JUGADOR NÚMERO 2                                        //
//----------------------------------------------------------------------------------------------------------//


var bUnirme2 = document.getElementById('unirme2');
    bUnirme2.addEventListener('click',s.unirme);
    
var bApostar2 = document.getElementById('apostar2');
    bApostar2.addEventListener('click',s.apostar);

var bDame2 = document.getElementById('dame2');
    bDame2.addEventListener('click',s.pedirCarta);

var bmePlanto2 = document.getElementById('mePlanto2');
    bmePlanto2.addEventListener('click',s.mePlanto);

var bDoblar2= document.getElementById('doblar2');
    bDoblar2.addEventListener('click',s.doblar);

var bDividir2 = document.getElementById('dividir2');
    bDividir2.addEventListener('click',s.dividir);

var bRetirarse2 = document.getElementById('retirarse2');
    bRetirarse2.addEventListener('click',s.retirarse);

var bdeterminaGanador2 = document.getElementById('determinaGanador2');
    bdeterminaGanador2.addEventListener('click',s.quienGana);  
    




