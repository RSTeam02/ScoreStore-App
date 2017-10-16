/**
 * @sakaijun
 * 
 * Standalone ScoreApp
 * 
 * socketIO: show number of players, update scorelist in realtime for all players without POST (AJAX)
 * input name + score, catch exceptions (invalid inputs) and add to table (descending order by score) 
 * pass to view 
 * 
 */

import { View } from "./view.js";
import { Player } from "./player.js";

export class Controller {

    constructor() {
        this.currentScore = {
            set current(score) {
                this.pts = score;
            },
            pts: 0
        }
        this.start = 0;
        this.socket = io();
        this.socketOn();
        this.getXMLHttp();
        this.view = new View();
        this.btnListener();
        this.initPlayer();
    }

    btnListener() {
        $(".modeLevel").change(() => {
            this.getXMLHttp();
        });

        $("#rndBtn").click(() => {
            var player = new Player();            
            var playerArr = ["George","Joe", "Jason","Jane","Jack","Jim", "Tom", "Tim", "James"];
            player.setMode($("#selectMode").val());
            player.setLevel($("#selectLevel").val());
            for(let i = 0; i < playerArr.length; i++){             
                player.setName(playerArr[Math.floor(Math.random()*playerArr.length)]);
                player.setScore(Math.floor(Math.random() * 300 + 100));
                this.view.viewPlayer(`${player.getName()}'s final score: ${player.getScore()}`);
                this.socket.emit('message', player);
            }
          
        });

        $("#postBtn").click(() => {
            var player = new Player();
            try {
                if ($("#name").val() === "") {
                    throw "enter name";
                } else if ($("#score").val() === "" || isNaN($("#score").val()) || $("#score").val() <= 0) {
                    throw "enter score";
                } else {
                    player.setMode($("#selectMode").val());
                    player.setLevel($("#selectLevel").val());
                    player.setName($("#name").val());
                    player.setScore($("#score").val());
                    this.view.viewPlayer(`${player.getName()}'s final score: ${player.getScore()}`);
                    this.socket.emit('message', player);
                }
            } catch (error) {
                this.view.viewPlayer(error);
            }
            $("#name").val("");
            $("#score").val("");
        });
    }

    initPlayer() {
        this.socket.on('broadcast', function (msg) {
            $("#test").html(msg);
        });
    }

    getXMLHttp() {
        $.get("scorefile/score.json", (data, status) => {
            this.view.scoreTable(data);
            //console.log(status);
        });
    }

    //after sending a player's new score (message) with socketIO, update score table via AJAX (to all players)
    socketOn() {
        this.socket.on('message', (msg) => {
            var seq = new Promise(function (result, err) {
                result(msg);
                err("err");
            }).then(() => {
                this.getXMLHttp();
            }, (err) => { console.log(err) });
        });
    }
}