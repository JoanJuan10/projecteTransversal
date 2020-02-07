function loadGame() {

    //Variables globals
    $mida = document.getElementById('mida').value; //mida del taulell
    $mida = parseInt($mida);

    //noms dels jugadors
    $jugadorNegre = document.getElementById('nomnegre').value; 
    $jugadorBlanc = document.getElementById('nomblanca').value;

    //puntuacions
    $marcadorBlanc = 2;
    $marcadorNegre = 2;

    $tornActual = false; // true = blanc , false = negre;

    var medida;
    var pecesPx;
    var marginTop;

    //Switch per assignar alguns estils dels taulell segons el tamany(8x8, 10x10 o 16x16)
    switch($mida){

        case 8:
            medida = 558;
            pecesPx = 60;
            marginTop = 50;
            break;
        case 10:
            medida = 558;
            pecesPx = 50;
            marginTop = 50;
            break;
        case 16:
            medida = 640;
            pecesPx = 30;
            marginTop = 25;
            break;
    }

    console.log($jugadorNegre);
    console.log($jugadorBlanc);
    console.log($mida);

    //Mostrem el taulell i la informació corresponent
    document.getElementById('espai').style.display = 'none';
    document.getElementById('tablero').style.display = 'flex';
    document.getElementById('tablero').style.flexDirection = 'row'; 
    document.getElementById('info').style.display = 'block';
    document.getElementById('container-form').style.display = 'none';
    
    //Afegim el marge superior a l'element amb id 'tablero'
    $('#tablero').css('margin-top', marginTop + 'px')

    //Mostrem el nom dels h¡jugadors als seus respectius marcadors
    document.getElementById('nom-blanc').innerHTML = $jugadorBlanc;
    document.getElementById('nom-negre').innerHTML = $jugadorNegre;

    /*Guardem en una variable l'element amb id 'taula' i desprès de crear-lo li apliquem l'estil per assignar-li la mesura que ha
    de tenir*/
    var tbl = document.getElementById('taula');
    var stl = document.createAttribute('style');
    stl.value = "width: " + medida + "px; height: " + medida + "px;";
    tbl.setAttributeNode(stl);

    //Bucles per crear el taulell 
    //Bucle per crear les files
    for (let i = 0; i < $mida; i++) {

        //Creem un element 'tr' i els atributs que volem assignar-li, i l'afegim a la taula
        var tr = document.createElement("tr");
        var attr = document.createAttribute('id');
        attr.value = 'row' + (i + 1);
        tr.setAttributeNode(attr);
        document.getElementById('taula').appendChild(tr);

        //Bucle per crear les caselles
        for (let j = 0; j < $mida; j++) {

            //Creem un element 'td' i els atributs que volem assignar-li
            var td = document.createElement("td");
            var attr = document.createAttribute('id');
            attr.value = (i + 1) + '-' + (j + 1);
            td.setAttributeNode(attr);
            $(td).attr('class', 'casilla');
            $(td).css('background-size', pecesPx + 'px');
            document.getElementById('row' + (i + 1)).appendChild(td);
            
        }
        
    }

    //Afegim l'event 'click' a totes les caselles del taulell
    $('.casilla').click(function (e) {
        
        //Cridem la funció per a comprobar la casella clicada
        comprobarCasilla(this, false);
    });

    //Cridem la funció per preparar el taulell
    prepararTaulell();
    return false;    
}

//Funció per a preparar el taulell segons el seu tamany(8x8, 10x10 o 16x16)
function prepararTaulell(){

    //Condicions per saber el tamany del taulell
    //Depenent de la mida pintem les caselles inicials correponents i les treiem l'event, per a que no es puguin clicar
    if ($mida == 8) {
        $("#4-4").attr('class', 'blanc');
        $("#4-5").attr('class', 'negre');
        $("#5-4").attr('class', 'negre');
        $("#5-5").attr('class', 'blanc');

        $("#4-4").unbind();
        $("#4-5").unbind();
        $("#5-4").unbind();
        $("#5-5").unbind();
        
    }
    else if($mida == 10){
        $("#5-5").attr('class', 'blanc');
        $("#5-6").attr('class', 'negre');
        $("#6-5").attr('class', 'negre');
        $("#6-6").attr('class', 'blanc');

        $("#5-5").unbind();
        $("#5-6").unbind();
        $("#6-5").unbind();
        $("#6-6").unbind();
    }
    else if($mida == 16){
        $("#8-8").attr('class', 'blanc');
        $("#8-9").attr('class', 'negre');
        $("#9-8").attr('class', 'negre');
        $("#9-9").attr('class', 'blanc');

        $("#8-8").unbind();
        $("#8-9").unbind();
        $("#9-8").unbind();
        $("#9-9").unbind();
    }

    //Mostrem el nom del jugador al que li toca jugar, al contenidor corresponent
    $('#nomTorn').html('<b>' + $jugadorNegre + '</b> <i>(Negres)</i>');
}

//Funció per a comprobar si la casella clicada es correcte o no
function comprobarCasilla (casella, comprobacio) {
    
    //guardem la coordenada x i y de la casella clicada
    var posicions = $(casella).attr('id').split("-");
    var x = posicions[0];
    var y = posicions[1];

    //Variable booleana per saber si el moviment es vàlid(casella clicada correcta)
    var movimentValid = false;

    //console.log(x + '-' + y);
    
    //Segons el torn del jugador assignem valors a la variable 'pieza' i 'piezaContraria'
    var pieza = ($tornActual) ? 'blanc' : 'negre';
    var piezaContraria = (pieza == 'blanc') ? 'negre' : 'blanc';

    //Bucles per a comprobar les caselles que estan al voltant de la casella clicada
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {

            //Guardem la fila i columna que estem comprobant
            var comprobaFila = parseInt(x) + i;
            var comprobaColumna = parseInt(y) + j;

            //Condició: Si la clase de la casella que estem comprobant es igual al valor de 'piezaContraria' 
            if ($('#' + comprobaFila + "-" + comprobaColumna).attr('class') == piezaContraria) {

                /*Actualitzem el valor de la fila i columna a comprobar per a comprobar les peces següents, en la direcció en la que
                s'ha trobat la 'piezaContraria'*/ 
                comprobaFila += i;
                comprobaColumna += j;

                //Variable per contar les caselles que captura el jugador que tè el torn de joc
                var numPiezas = 0;

                //Variables booleanes per comprobar si s'ha fet el moviment o si s'ha trobat una casella verda
                var movimentFet = false;
                var verdTrobat = false;

                //Bucle que comprobara les peces mentres que no arribi als limits del taulell i mentres el moviment no s'hagi realitzat
                while (comprobaFila >= 1 && comprobaFila <= $mida && comprobaColumna >= 1 && comprobaColumna <= $mida && !movimentFet) {

                    //Incrementem en 1 la quantitat de peces que captura el jugador
                    numPiezas++;

                    // Comprobem que una de les peçes no es verda. Evitant que es pintin caselles adicionals
                    if ($('#' + comprobaFila + "-" + comprobaColumna).attr('class') == 'casilla') {

                        //Assignem true a la variable per saber que hem trobat una casella verda
                        verdTrobat = true;
                    }

                    /*Condició: Si troba una peça amb la clase coincident amb el valor de la variable 'pieza' i no ha trobat cap
                    casella verda*/
                    if ($('#' + comprobaFila + "-" + comprobaColumna).attr('class') == pieza && !verdTrobat) {

                        //Assignem true a la variable per saber que el moviment es vàlid
                        movimentValid = true;
                        
                        //Condició: Si no estem fent una comprobació de l'estat del taulell(per saber si queden moviments possibles)
                        if(!comprobacio){

                            //Pintem les caselles corresponents canviant l'atribut class i les hi treiem l'event 'click'
                            $(casella).attr('class', pieza);
                            $(casella).unbind();

                            //Bucle per pintar les caselles corresponents
                            for (let l = 1; l <= numPiezas; l++) {
                                $('#' + (parseInt(x) + (i * l)) + '-' + (parseInt(y) + (j * l))).attr('class', pieza);
                            }

                            //Actualitzem la puntuació dels marcadors
                            $marcadorBlanc = $('.blanc').length;
                            $marcadorNegre = $('.negre').length;
                            $('#marcador-blanc').text($marcadorBlanc);
                            $('#marcador-negre').text($marcadorNegre);
                            
                            //Assignem true a la variable per saber que el moviment s'ha realitzat
                            movimentFet = true;
                        }
                    }
                    //Actualitzem el valor de la fila i columna a comprobar
                    comprobaFila += i;
                    comprobaColumna += j;
                }
            }
            
        }
        
    }
    //Condició: Si no estem comprobant l'estat del taulell
    if(!comprobacio){

        //Condició: Si el moviment es valid
        if (movimentValid) {

            //Canviem el torn i mostrem per pantalla el nom del jugador al que li tica tirar
            $tornActual = ($tornActual) ? false : true;
            $('#nomTorn').html(($tornActual) ? '<b>' + $jugadorBlanc + '</b> <i>(Blanques)</i>' : '<b>' +$jugadorNegre + '</b> <i>(Negres)</i>');

            //Condició: Si la la funció partidaAcabada ens retorna true
            if(partidaAcabada()) {

                //Treiem tots els events que tinguin els elements i cridem la funció finalizarJuego
                $('*').unbind();
                finalizarJuego();
            }
        }
        //Si el moviment no es valid
        else {

            //Canviem la clase de la casella per a mostrar una peça vermella
            $(casella).attr('class', 'vermell');

            //Treiem l'event a la casella clicada i a totes les caselles verdes perque no pugui continuar clicant
            $(casella).unbind();
            $('.casilla').unbind();

            //Fem un setTimeout per a que desprès de 0'5s torni  posar tots els events i tregui la peça vermella de la casella clicada
            setTimeout(function () {
                $(casella).attr('class', 'casilla');
                $('.casilla').click(function (e) { 
                    comprobarCasilla(this);
                });
            }, 500);
        }
    }
    //Si estem comprobant l'estat del taulell
    else {
        
        //Condició: Si moviment valid es true(hi ha moviments possibles)
        if (movimentValid) {
            return true;
        }
        else {
            return false;
        }
    }
}

//Funció per a comprobar si la partida esta acabada
function partidaAcabada(){

    //Guardem la quantitat de peces blanques, negres i verdes
    var piezasBlancas = $(".blanc").length;
    var piezasNegras = $(".negre").length;
    var piezasVerdes = $(".casilla").length;

    //Si alguna d'aquestes quantitats es 0(significa que s'ha omplert el taulell o que un jugador s'ha quedat sense peces)
    if(piezasBlancas == 0 || piezasNegras == 0 || piezasVerdes == 0){
        return true;
    }
    //Sino retornem el contrari del que ens retorna la funció movimentsPosibles
    else{
        console.log(movimentsPossibles());
        if(!(movimentsPossibles())){

            var tornSaltat = true;
            $tornActual = ($tornActual) ? false : true;

            if(tornSaltat == true && movimentsPossibles()){
                
                alert('TORN SALTAT');
                $('#nomTorn').html(($tornActual) ? '<b>' + $jugadorBlanc + '</b> <i>(Blanques)</i>' : '<b>' +$jugadorNegre + '</b> <i>(Negres)</i>');
            }
            return !movimentsPossibles();
        }
    }
}

//Funció per comprobar si hi ha moviments posibles
function movimentsPossibles(){

    //Bucles per recorrer el taulell
    for (var i = 1; i <= $mida; i++) {
        for (var j = 1; j <= $mida; j++) {
            
            //Guardem la casella a la que ens trobem
            var casella = $("#" + i + "-" + j);

            //Condició: Si la casella és verda
            if($(casella).attr('class') == 'casilla'){

                //Condició: Si la funció comprobarCasilla ens retorna true(casella correcta i per tant hi ha moviments)
                if(comprobarCasilla(casella, true)) {
                    return true;
                }
            }
        }        
    }
    return false;
}

//Funció per a mostrar el resultat de la partida
function finalizarJuego() {

    //Guardem en una variable el codi HTML amb tota la informació que volem mostrar sobre la partida
    var string = (($(".blanc").length < $(".negre").length) ? "<b>GUANYADOR</b>: " + $jugadorNegre : ($(".blanc").length > $(".negre").length) ? "<b>GUANYADOR</b>: " + $jugadorBlanc : '<b>EMPAT</b>') + "<br>";
    string += "<b>PUNTUACIÓ</b>: <br>";
    string += $jugadorBlanc + " <i>(BLANC)</i>: " + $marcadorBlanc + "<br>";
    string += $jugadorNegre + " <i>(NEGRE)</i>: " + $marcadorNegre + "<br>";

    //Mostrem l'element amb clase 'modal' mitjantçant l'efecte 'show'
    $('.modal').show("fast", function () {

        //Creem una variable on emmagatzemem un 'div' que utilitzem per canviar el fons mentres el modal es visible
        var div = $('<div>').css({
            "display": "block",
            "background": "rgba(0,0,0,.8)",
            "width": "100%",
            "min-height": "100%",
            "position": "fixed",
            "top": "0",
            "left": "0",
            "z-index": "1",
        }).attr('class', 'overlay');

        //Afegim el div creat al body
        $('body').append(div);

        //Afegim la informació al modal
        $('.modal-text').html(string);

        //Afegim un event a l'element amb classe 'close' 
        $('.close').click(function () {
            
            //Amagem el modal i eliminem el div que ens canvia el fons
            $('.modal').hide();
            $('.overlay').remove();
        });

        //Afegim un event al boto de tancar
        $('.btn-tancar').click(function () {

            //Amagem el modal i eliminem el div que ens canvia el fons
            $('.modal').hide();
            $('.overlay').remove();
        });

        //Afegim un event al boto de tornar a jugar
        $('.btn-jugar').click(function () {

            //Recarreguem la localització
            location.reload();
        });
    });
    
}