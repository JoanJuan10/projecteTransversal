function loadGame() {
    var jugadorNegre = document.getElementById('nomnegre').value;
    var jugadorBlanc = document.getElementById('nomblanca').value;
    var marcadorBlanc = 2;
    var marcadorNegre = 2;
    var mida = document.getElementById('mida').value;
    mida = parseInt(mida);

    console.log(jugadorNegre);
    console.log(jugadorBlanc);
    console.log(mida);

    document.getElementById('tablero').style.display = 'block';
    document.getElementById('info').style.display = 'block';
    document.getElementById('container-form').style.display = 'none';

    document.getElementById('nom-blanc').innerHTML = jugadorBlanc;
    document.getElementById('nom-negre').innerHTML = jugadorNegre;

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