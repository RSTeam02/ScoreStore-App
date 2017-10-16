export class View {

    viewPlayer(info) {
        $("#playerInfo").html(info);
    }

    scoreTable(rows) {
        let rank = 1;

        $("#scoreList").html("");
        $("#scoreList").append("<th>Rank</th><th>Player</th><th>Score</th>");
        $.each(rows, (k, v) => {
            if ($("#selectMode").val() === v.mode && $("#selectLevel").val() === v.level) {
                $("#scoreList").append(`<tr>
                <td class = "col" align = "right">${rank++}.</td>
                <td class = "col">${v.name}</td>
                <td class = "col" align = "right">${v.score}pts.\n</td>
                </tr>`);
            }
        });

    }

}