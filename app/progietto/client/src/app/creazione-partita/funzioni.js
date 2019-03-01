var campo = [],
    righe = 10,
    colonne = 10;


var navi_inserite = 0;
var ct1 = false;
var ct2 = false;
var ct3 = false;
var ct4 = false;
var s1 = false;
var s2 = false;
var c1 = false;
var c2 = false;
var p1 = false;

for (var i = 0; i < righe; i++) {
    campo[i] = [];
    for (var j = 0; j < colonne; j++) {
        campo[i][j] = 0;
    }
}

function controllaContenutoct1() {

    str_inizio = document.getElementById("ct1inizio").value;
    b1 = (/^\d\.\d$/.test(str_inizio));

    x1 = str_inizio.split(".")[0];
    y1 = str_inizio.split(".")[1];


    if (x1 <= 9 && y1 <= 9 && ct1 == false) {
        if (document.getElementById("oct1").checked == true) {
            for (var i = y1; i < (+y1 + +2); i++) {
                alert(i);
                if (campo[x1][i] == 1 || i > 9) {
                    alert("CELLA OCCUPATA! o non esistente");
                    return false
                }
            }
            for (var i = y1; i < (+y1 + +2); i++) {
                campo[x1][i] = 1;
            }
            alert("orizzontale true");
            navi_inserite++;
            ct1 = true;
            return true;
        } else {

            for (var i = x1; i < (+x1 + +2); i++) {
                if (campo[i][y1] == 1 || i > 9) {
                    alert("GIA OCCUPATA! o non esistente");
                    return false;
                }
            }
            for (var i = x1; i < (+x1 + +2); i++) {
                campo[i][y1] = 1;
            }
            alert("verticale true");
            navi_inserite++;
            ct1 = true;
            return true;
        }
    } else if (ct1 == true) {
        alert("Barca gia inserita");

    } else {
        alert("errore overflow caselle");
    }
}



function controllaContenutoct2() {

    str_inizio = document.getElementById("ct2").value;
    b1 = (/^\d\.\d$/.test(str_inizio));

    x1 = str_inizio.split(".")[0];
    y1 = str_inizio.split(".")[1];


    if (x1 <= 9 && y1 <= 9 && ct1 == false) {
        if (document.getElementById("oct2").checked == true) {
            for (var i = y1; i < (+y1 + +2); i++) {
                alert(i);
                if (campo[x1][i] == 1 || i > 9) {
                    alert("CELLA OCCUPATA! o non esistente");
                    return false
                }
            }
            for (var i = y1; i < (+y1 + +2); i++) {
                campo[x1][i] = 1;
            }
            alert("orizzontale true");
            navi_inserite++;
            ct2 = true;
            return true;
        } else {

            for (var i = x1; i < (+x1 + +2); i++) {
                if (campo[i][y1] == 1 || i > 9) {
                    alert("GIA OCCUPATA! o non esistente");
                    return false;
                }
            }
            for (var i = x1; i < (+x1 + +2); i++) {
                campo[i][y1] = 1;
            }
            alert("verticale true");
            navi_inserite++;
            ct2 = true;
            return true;
        }
    } else if (ct2 == true) {
        alert("Barca gia inserita");

    } else {
        alert("errore overflow caselle");
    }
}



function controllaContenutoct3() {

    str_inizio = document.getElementById("ct3").value;
    b1 = (/^\d\.\d$/.test(str_inizio));

    x1 = str_inizio.split(".")[0];
    y1 = str_inizio.split(".")[1];


    if (x1 <= 9 && y1 <= 9 && ct1 == false) {
        if (document.getElementById("oct3").checked == true) {
            for (var i = y1; i < (+y1 + +2); i++) {
                alert(i);
                if (campo[x1][i] == 1 || i > 9) {
                    alert("CELLA OCCUPATA! o non esistente");
                    return false
                }
            }
            for (var i = y1; i < (+y1 + +2); i++) {
                campo[x1][i] = 1;
            }
            alert("orizzontale true");
            navi_inserite++;
            ct3 = true;
            return true;
        } else {

            for (var i = x1; i < (+x1 + +2); i++) {
                if (campo[i][y1] == 1 || i > 9) {
                    alert("GIA OCCUPATA! o non esistente");
                    return false;
                }
            }
            for (var i = x1; i < (+x1 + +2); i++) {
                campo[i][y1] = 1;
            }
            alert("verticale true");
            navi_inserite++;
            ct3 = true;
            return true;
        }
    } else if (ct3 == true) {
        alert("Barca gia inserita");

    } else {
        alert("errore overflow caselle");
    }
}



function controllaContenutoct4() {

    str_inizio = document.getElementById("ct4").value;
    b1 = (/^\d\.\d$/.test(str_inizio));

    x1 = str_inizio.split(".")[0];
    y1 = str_inizio.split(".")[1];


    if (x1 <= 9 && y1 <= 9 && ct1 == false) {
        if (document.getElementById("oct4").checked == true) {
            for (var i = y1; i < (+y1 + +2); i++) {
                alert(i);
                if (campo[x1][i] == 1 || i > 9) {
                    alert("CELLA OCCUPATA! o non esistente");
                    return false
                }
            }
            for (var i = y1; i < (+y1 + +2); i++) {
                campo[x1][i] = 1;
            }
            alert("orizzontale true");
            navi_inserite++;
            ct4 = true;
            return true;
        } else {

            for (var i = x1; i < (+x1 + +2); i++) {
                if (campo[i][y1] == 1 || i > 9) {
                    alert("GIA OCCUPATA! o non esistente");
                    return false;
                }
            }
            for (var i = x1; i < (+x1 + +2); i++) {
                campo[i][y1] = 1;
            }
            alert("verticale true");
            navi_inserite++;
            ct4 = true;
            return true;
        }
    } else if (ct4 == true) {
        alert("Barca gia inserita");

    } else {
        alert("errore overflow caselle");
    }
}




function controllaContenutos1() {

    str_inizio = document.getElementById("s1").value;
    b1 = (/^\d\.\d$/.test(str_inizio));

    x1 = str_inizio.split(".")[0];
    y1 = str_inizio.split(".")[1];


    if (x1 <= 9 && y1 <= 9 && s1 == false) {
        if (document.getElementById("os1").checked == true) {
            for (var i = y1; i < (+y1 + +3); i++) {
                alert(i);
                if (campo[x1][i] == 1 || i > 9) {
                    alert("CELLA OCCUPATA! o non esistente");
                    return false
                }
            }
            for (var i = y1; i < (+y1 + +3); i++) {
                campo[x1][i] = 1;
            }
            alert("orizzontale true");
            navi_inserite++;
            s1 = true;
            return true;
        } else {

            for (var i = x1; i < (+x1 + +3); i++) {
                if (campo[i][y1] == 1 || i > 9) {
                    alert("GIA OCCUPATA! o non esistente");
                    return false;
                }
            }
            for (var i = x1; i < (+x1 + +3); i++) {
                campo[i][y1] = 1;
            }
            alert("verticale true");
            navi_inserite++;
            s1 = true;
            return true;
        }
    } else if (s1 == true) {
        alert("Barca gia inserita");

    } else {
        alert("errore overflow caselle");
    }
}



function controllaContenutos2() {

    str_inizio = document.getElementById("s2").value;
    b1 = (/^\d\.\d$/.test(str_inizio));

    x1 = str_inizio.split(".")[0];
    y1 = str_inizio.split(".")[1];


    if (x1 <= 9 && y1 <= 9 && s1 == false) {
        if (document.getElementById("os2").checked == true) {
            for (var i = y1; i < (+y1 + +3); i++) {
                alert(i);
                if (campo[x1][i] == 1 || i > 9) {
                    alert("CELLA OCCUPATA! o non esistente");
                    return false
                }
            }
            for (var i = y1; i < (+y1 + +3); i++) {
                campo[x1][i] = 1;
            }
            alert("orizzontale true");
            navi_inserite++;
            s2 = true;
            return true;
        } else {

            for (var i = x1; i < (+x1 + +3); i++) {
                if (campo[i][y1] == 1 || i > 9) {
                    alert("GIA OCCUPATA! o non esistente");
                    return false;
                }
            }
            for (var i = x1; i < (+x1 + +3); i++) {
                campo[i][y1] = 1;
            }
            alert("verticale true");
            navi_inserite++;
            s2 = true;
            return true;
        }
    } else if (s2 == true) {
        alert("Barca gia inserita");

    } else {
        alert("errore overflow caselle");
    }
}





function controllaContenutoc1() {

    str_inizio = document.getElementById("c1").value;
    b1 = (/^\d\.\d$/.test(str_inizio));

    x1 = str_inizio.split(".")[0];
    y1 = str_inizio.split(".")[1];


    if (x1 <= 9 && y1 <= 9 && c1 == false) {
        if (document.getElementById("oc1").checked == true) {
            for (var i = y1; i < (+y1 + +4); i++) {
                alert(i);
                if (campo[x1][i] == 1 || i > 9) {
                    alert("CELLA OCCUPATA! o non esistente");
                    return false
                }
            }
            for (var i = y1; i < (+y1 + +4); i++) {
                campo[x1][i] = 1;
            }
            alert("orizzontale true");
            navi_inserite++;
            c1 = true;
            return true;
        } else {

            for (var i = x1; i < (+x1 + +4); i++) {
                if (campo[i][y1] == 1 || i > 9) {
                    alert("GIA OCCUPATA! o non esistente");
                    return false;
                }
            }
            for (var i = x1; i < (+x1 + +4); i++) {
                campo[i][y1] = 1;
            }
            alert("verticale true");
            navi_inserite++;
            c1 = true;
            return true;
        }
    } else if (c1 == true) {
        alert("Barca gia inserita");

    } else {
        alert("errore overflow caselle");
    }
}



function controllaContenutoc2() {

    str_inizio = document.getElementById("c2").value;
    b1 = (/^\d\.\d$/.test(str_inizio));

    x1 = str_inizio.split(".")[0];
    y1 = str_inizio.split(".")[1];


    if (x1 <= 9 && y1 <= 9 && c2 == false) {
        if (document.getElementById("oc2").checked == true) {
            for (var i = y1; i < (+y1 + +4); i++) {
                alert(i);
                if (campo[x1][i] == 1 || i > 9) {
                    alert("CELLA OCCUPATA! o non esistente");
                    return false
                }
            }
            for (var i = y1; i < (+y1 + +4); i++) {
                campo[x1][i] = 1;
            }
            alert("orizzontale true");
            navi_inserite++;
            c2 = true;
            return true;
        } else {

            for (var i = x1; i < (+x1 + +4); i++) {
                if (campo[i][y1] == 1 || i > 9) {
                    alert("GIA OCCUPATA! o non esistente");
                    return false;
                }
            }
            for (var i = x1; i < (+x1 + +4); i++) {
                campo[i][y1] = 1;
            }
            alert("verticale true");
            navi_inserite++;
            c2 = true;
            return true;
        }
    } else if (c2 == true) {
        alert("Barca gia inserita");

    } else {
        alert("errore overflow caselle");
    }
}

function controllaContenutop1() {

    str_inizio = document.getElementById("p1").value;
    b1 = (/^\d\.\d$/.test(str_inizio));

    x1 = str_inizio.split(".")[0];
    y1 = str_inizio.split(".")[1];


    if (x1 <= 9 && y1 <= 9 && p1 == false) {
        if (document.getElementById("op1").checked == true) {
            for (var i = y1; i < (+y1 + +5); i++) {
                alert(i);
                if (campo[x1][i] == 1 || i > 9) {
                    alert("CELLA OCCUPATA! o non esistente");
                    return false
                }
            }
            for (var i = y1; i < (+y1 + +5); i++) {
                campo[x1][i] = 1;
            }
            alert("orizzontale true");
            navi_inserite++;
            p1 = true;
            return true;
        } else {

            for (var i = x1; i < (+x1 + +5); i++) {
                if (campo[i][y1] == 1 || i > 9) {
                    alert("GIA OCCUPATA! o non esistente");
                    return false;
                }
            }
            for (var i = x1; i < (+x1 + +5); i++) {
                campo[i][y1] = 1;
            }
            alert("verticale true");
            navi_inserite++;
            p1 = true;
            return true;
        }
    } else if (p1 == true) {
        alert("Barca gia inserita");

    } else {
        alert("errore overflow caselle");
    }
}