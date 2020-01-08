function loadGame() {
    var jugadorNegre = document.getElementById('nomnegre').value;
    var jugadorBlanc = document.getElementById('nomblanca').value;
    var marcadorBlanc = 2;
    var marcadorNegre = 2;
    var mida = document.getElementById('mida').value;
    var width;
    var height;
    mida = parseInt(mida);

    switch(mida){

        case 8:
            width = 558;
            height = 558;
            break;
        case 10:
            width = 520;
            height = 520;
            break;
        case 16:
            width = 640;
            height = 640;
            break;
    }

    console.log(jugadorNegre);
    console.log(jugadorBlanc);
    console.log(mida);

    document.getElementById('espai').style.display = 'none';
    document.getElementById('tablero').style.display = 'flex';
    document.getElementById('tablero').style.flexDirection = 'row'; 
    document.getElementById('info').style.display = 'block';
    document.getElementById('container-form').style.display = 'none';

    document.getElementById('nom-blanc').innerHTML = jugadorBlanc;
    document.getElementById('nom-negre').innerHTML = jugadorNegre;

    var tbl = document.getElementById('taula');
    var stl = document.createAttribute('style');
    stl.value = "width: " + width + "px; height: " + height + "px;";
    tbl.setAttributeNode(stl);

    for (let i = 0; i < mida; i++) {
        var tr = document.createElement("tr");
        var attr = document.createAttribute('id');
        attr.value = 'row' + (i + 1);
        tr.setAttributeNode(attr);
        console.log(tr);
        document.getElementById('taula').appendChild(tr);
        var cel = 1;
        for (let j = 0; j < mida; j++) {
            var td = document.createElement("td");
            var attr = document.createAttribute('id');
            attr.value = 'cel' + cel;
            td.setAttributeNode(attr);
            console.log(td);
            document.getElementById('row' + (i + 1)).appendChild(td);
        }
        
    }
    return false;


    /*for (let i = 0; i < $mida; i++) {
        document.getElementById('taula').innerHTML += "<tr>";
        for (let j = 0; j < $mida; j++) {
            document.getElementById('taula').innerHTML += "<td></td>";
        }
        document.getElementById('taula').innerHTML += "</tr>";
    }*/
    

    
}