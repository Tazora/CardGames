/**
 * Created by Sebastian on 01.12.2016.
 */

$(document).ready(function () {
    var player = [false, false, false, false];
    var playernumber = ["player_A", "player_B", "player_C", "player_D"]
    var points = [0, 0, 0, 0];

    function calculate_points() {
        $('#calculate').change(function () {
            var multiplicator = 1;
            if ($('#solo').is(':checked')) {
                multiplicator = 3;
            }
            if ($('#said_re').is(':checked')) {
                multiplicator *= 2;
            }
            if ($('#said_contra').is(':checked')) {
                multiplicator *= 2;
            }
            select_players();
            add_points();
            $('#points_A').val(points[0] * multiplicator);
            $('#points_B').val(points[1] * multiplicator);
            $('#points_C').val(points[2] * multiplicator);
            $('#points_D').val(points[3] * multiplicator);
        })

    }

    function select_players() {
            var counter = 0;
            for (i = 0; i < 4; i++) {
                if ($('#' + playernumber[i]).is(':checked')) {
                    player[i] = true;
                }
                else {
                    player[i] = false;
                }
            }

            for (i = 0; i < 4; i++) {
                if (player[i] == true) {
                    counter++;
                }
            }
            if ($('#solo').is(':checked')) {
                if (counter > 0) {
                    for (i = 0; i < 4; i++) {
                        if (player[i] == false) {
                            $('#' + playernumber[i]).attr("disabled", true)
                        }
                    }
                }
                else {
                    for (i = 0; i < 4; i++) {
                        $('#' + playernumber[i]).attr("disabled", false)
                    }
                }
            }
            else {
                if (counter > 1) {
                    for (i = 0; i < 4; i++) {
                        if (player[i] == false) {
                            $('#' + playernumber[i]).attr("disabled", true)
                        }
                    }
                }
                else {
                    for (i = 0; i < 4; i++) {
                        $('#' + playernumber[i]).attr("disabled", false)
                    }
                }
            }
    }

    function calculate_winner() {
        if ($('#points_re').val() > 120) {
            return "re"
        }
        else {
            return "contra"
        }
    }

    function calculate_round() {
        var point = 0;
        if (calculate_winner() == "re") {
            point = Math.floor($('#points_re').val() / 30) - 3;
        }
        else {
            point = Math.floor($('#points_contra').val() / 30) - 3;
            point++;
        }
        if ($('#karl').is(':checked')) {
            point++;
        }
        if ($('#fox').is(':checked')) {
            point++;
        }
        if ($('#doublehead').is(':checked')) {
            point++;
        }
        if ($('#hochzeit').is(':checked')) {
            point++;
        }
        point += parseInt($('#extra').val());
        return point;
    }

    function add_points() {
        point = calculate_round();
        if (calculate_winner() == "re") {
            for (i = 0; i < 4; i++) {
                if (player[i] == true) {
                    points[i] = point;
                }
                else {
                    points[i] = 0;
                }
            }
        }
        else {
            for (i = 0; i < 4; i++) {
                if (player[i] == false) {
                    points[i] = point;
                }
                else {
                    points[i] = 0;
                }
            }
        }
    }

    function make_even() {
        $('#points_re').change(function () {
            $('#points_contra').val(240 - $('#points_re').val())
        });
        $('#points_contra').change(function () {
            $('#points_re').val(240 - $('#points_contra').val())
        })
    }

    make_even();
    calculate_points();
})