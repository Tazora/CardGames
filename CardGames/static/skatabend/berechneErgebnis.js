/**
 * Created by sthon on 08.06.2016.
 */
/**
 * Created by sthon on 01.06.2016.
 */


$(document).ready(function () {
    var Multiplikator = 1; //Spiel 1
    var BubenMulti = 4; // Standard Ohne 4
    var Spielwert = 12; //Ausgangswert 12 Kreuz
    var Spieler = "PunkteA"; // Spieler
    var Punkte = 0;

    $('#Rechenfeld').hide();

    $('#reset').click(function () {
        Multiplikator = 1;
        Spielwert = 12;
        Spieler = "PunkteA";
        $('input[name="Buben"]').attr("disabled", false);
        $('#HandAngesagt').attr("disabled", false);
        $('#Schwarz').attr("disabled", false);
        $('#SchwarzAngesagt').attr("disabled", false);
        berechnePunkte(Spieler, Multiplikator, Spielwert);
        $('#Rechenfeld').hide();
    });

    $('input[name="Spieler"]').change(function () {
        Spieler = $('input[name="Spieler"]:checked').val();
        $('#Rechenfeld').show();
        berechnePunkte(Spieler, Multiplikator, Spielwert);
    });

    $('input[name="Ausgang"]').change(function () {
        if ($('#Gewonnen').is(':checked')) {
            Multiplikator--;
        }
        else {
            Multiplikator++;
        }
        berechnePunkte(Spieler, Multiplikator, Spielwert);
    });

    function increaseMulti(Id) {
        $('#' + Id).change(function () {
            if ($('#' + Id).is(':checked')) {
                Multiplikator++;
            }
            else {
                Multiplikator--;
            }
            berechnePunkte(Spieler, Multiplikator, Spielwert);
        });
    }

    $('input[name="Buben"]').change(function () {
        if ($('#BubeKreuz').is(':checked')) {
            if ($('#BubePik').is(':checked')) {
                if ($('#BubeHerz').is(':checked')) {
                    if ($('#BubeKaro').is(':checked')) {
                        BubenMulti = 4;
                    }
                    else {
                        BubenMulti = 3;
                    }
                }
                else {
                    BubenMulti = 2;
                }
            }
            else {
                BubenMulti = 1;
            }
        }
        else {
            if ($('#BubePik').is(':checked')) {
                BubenMulti = 1;
            }
            else {
                if ($('#BubeHerz').is(':checked')) {
                    BubenMulti = 2;
                }
                else {
                    if ($('#BubeKaro').is(':checked')) {
                        BubenMulti = 3;
                    }
                    else {
                        BubenMulti = 4;
                    }
                }
            }
        }
        berechnePunkte(Spieler, Multiplikator, Spielwert);
    });

    function berechnePunkte(Spieler, Multiplikator, Spielwert) {
        $('input[type="number"]').each(function () {
            $(this).val(0);
        });
        if ($('#Null').is(':checked')) {
            Punkte = 23;
            if ($('#Hand').is(':checked')) {
                Punkte = 35;
            }
            if ($('#Ouvert').is(':checked')) {
                Punkte = 46;
            }
            if ($('#Hand').is(':checked') && $('#Ouvert').is(':checked')) {
                Punkte = 59;
            }
            if ($('#Verloren').is(':checked')) {
                Punkte = Punkte * 2;
            }
            $('#AnzeigeMulti').text('Es wird Null gespielt.');
        }
        else {
            Punkte = (Multiplikator + BubenMulti) * Spielwert
            $('#AnzeigeMulti').text('Der Multiplikator ist gerade ' + Multiplikator + '.');
        }
        if ($('#Gewonnen').is(':checked')) {
            $('#' + Spieler).val(Punkte);
        }
        else {
            $('#PunkteA').val(Punkte);
            $('#PunkteB').val(Punkte);
            $('#PunkteC').val(Punkte);
            $('#' + Spieler).val(0);
        }
        $('#AnzeigeMulti').text('Der Multiplikator ist gerade ' + Multiplikator + '.');
    }

    increaseMulti('Hand');
    increaseMulti('Schneider');
    increaseMulti('SchneiderAngesagt');
    increaseMulti('Schwarz');
    increaseMulti('SchwarzAngesagt');
    increaseMulti('Ouvert');

    $('input[name="Grundwert"]').change(function () {
        if ($('#Null').is(':checked')) {
            $('input[name="Buben"]').closest("div").addClass("ui-state-disabled");
            $('#Schneider').closest("div").addClass("ui-state-disabled");
            $('#SchneiderAngesagt').closest("div").addClass("ui-state-disabled");
            $('#Schwarz').closest("div").addClass("ui-state-disabled");
            $('#SchwarzAngesagt').closest("div").addClass("ui-state-disabled");
        }
        else {
            $('input[name="Buben"]').closest("div").removeClass("ui-state-disabled");
            $('#Schneider').closest("div").removeClass("ui-state-disabled");
            $('#SchneiderAngesagt').closest("div").removeClass("ui-state-disabled");
            $('#Schwarz').closest("div").removeClass("ui-state-disabled");
            $('#SchwarzAngesagt').closest("div").removeClass("ui-state-disabled");
            switch ($('input[name="Grundwert"]:checked').val()) {
                case "Kreuz":
                    Spielwert = 12;
                    break;
                case "Pik":
                    Spielwert = 11;
                    break;
                case "Herz":
                    Spielwert = 10;
                    break;
                case "Karo":
                    Spielwert = 9;
                    break;
                case "Grande":
                    Spielwert = 24;
                    break;
                case "Null":
                    Spielwert = 23;
                    break;
            }
        }
        berechnePunkte(Spieler, Multiplikator, Spielwert);
    })
});


