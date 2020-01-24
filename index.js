function loadGame() {
    $mida = document.getElementById('mida').value;
    $jugadorNegre = document.getElementById('nomnegre').value;
    $jugadorBlanc = document.getElementById('nomblanca').value;
    var marcadorBlanc = 2;
    var marcadorNegre = 2;
    $tornActual = false; // true = blanc , false = negre;
    var medida;
    $mida = parseInt($mida);

    switch($mida){

        case 8:
            medida = 558;
            break;
        case 10:
            medida = 520;
            break;
        case 16:
            medida = 640;
            break;
    }

    console.log($jugadorNegre);
    console.log($jugadorBlanc);
    console.log($mida);

    document.getElementById('espai').style.display = 'none';
    document.getElementById('tablero').style.display = 'flex';
    document.getElementById('tablero').style.flexDirection = 'row'; 
    document.getElementById('info').style.display = 'block';
    document.getElementById('container-form').style.display = 'none';

    document.getElementById('nom-blanc').innerHTML = $jugadorBlanc;
    document.getElementById('nom-negre').innerHTML = $jugadorNegre;

    var tbl = document.getElementById('taula');
    var stl = document.createAttribute('style');
    stl.value = "width: " + medida + "px; height: " + medida + "px;";
    tbl.setAttributeNode(stl);

    for (let i = 0; i < $mida; i++) {
        var tr = document.createElement("tr");
        var attr = document.createAttribute('id');
        attr.value = 'row' + (i + 1);
        tr.setAttributeNode(attr);
        document.getElementById('taula').appendChild(tr);
        var cel = 1;
        for (let j = 0; j < $mida; j++) {
            var td = document.createElement("td");
            var attr = document.createAttribute('id');
            attr.value = (i + 1) + '-' + (j + 1);
            td.setAttributeNode(attr);
            $(td).attr('class', 'casilla');
            document.getElementById('row' + (i + 1)).appendChild(td);
            
        }
        
    }

    $('.casilla').click(function (e) { 
        comprobarCasilla(this);
        /*if (comprobarCasilla(this)) {
            colocarCasilla(this);
        }
        else {
            $(this).attr('style', 'background-color: red;');
        }
        setTimeout(function () {
            $(this).attr('style', 'background-color: rgb(33, 236, 33);');
        }, 1500);*/
    });

    play();
    return false;
    
}

function play(){
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
    $('#nomTorn').text($jugadorNegre);
}
function comprobarCasilla (casella) {
    
    //guardem la coordenada x i y de la casella clicada
    var x = $(casella).attr('id').charAt(0);
    var y = $(casella).attr('id').charAt(2);
    var movimentValid = false;
    console.log(x);
    console.log(y);
    
    var pieza = ($tornActual) ? 'blanc' : 'negre';
    var piezaContraria = (pieza == 'blanc') ? 'negre' : 'blanc';

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            var comprobaFila = parseInt(x) + i;
            var comprobaColumna = parseInt(y) + j;

            if ($('#' + comprobaFila + "-" + comprobaColumna).attr('class') == piezaContraria) {
                comprobaFila += i;
                comprobaColumna += j;
                var numPiezas = 0;

                while (comprobaFila >= 1 && comprobaFila < $mida && comprobaColumna >= 1 && comprobaColumna < $mida) {
                    numPiezas++;
                    if ($('#' + comprobaFila + "-" + comprobaColumna).attr('class') == pieza) {
                        movimentValid = true;
                    }
                    comprobaFila += i;
                    comprobaColumna += j;
                }
            }
            
        }
        
    }
    console.log(movimentValid);
    
}