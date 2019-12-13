function loadGame() {
    $jugadorNegre = document.getElementById('nomnegre').value;
    $jugadorBlanc = document.getElementById('nomblanca').value;
    $marcadorBlanc = 2;
    $marcadorNegre = 2;
    $mida = document.getElementById('mida').value;

    console.log($jugadorNegre);
    console.log($jugadorBlanc);
    console.log($mida);

    document.getElementById('tablero').style.display = 'block';
    document.getElementById('info').style.display = 'block';
    document.getElementById('container-form').style.display = 'none';

    document.getElementById('nom-blanc').innerHTML = $jugadorBlanc;
    document.getElementById('nom-negre').innerHTML = $jugadorNegre;

    for (let i = 0; i < $mida; i++) {
        document.getElementById('taula').innerHTML += "<tr>";
        for (let j = 0; j < $mida; j++) {
            document.getElementById('taula').innerHTML += "<td></td>";
        }
        document.getElementById('taula').innerHTML += "</tr>";
    }
    

    return false;
}