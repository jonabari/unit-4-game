//RESET GAME
//The game starts with a reset function that sets all variables. It is a function so that we can prevent it from running until the complete page has loaded.

var currentChar = 1;
var currentEnemy = 1;
var battleEvent = false;
var win = 0;


function reset(){

    //The start button is in the idle position upon loading the page. This jQuery call activates it. If the page loads quickly enough, it's unlikely that the player will perceive this change.
    $(".attack-button").removeClass("wait-button").addClass("start-button");
    $(".start-button").html("START");

    
    //This object contains all necessary properties for each character
    rpGame = {  

        rosterChar : [

            //The first playable character slot is blank and is used when the game is waiting for the player to make a choice (be it of avatar or opponent)
            {
                img : "assets/images/charImg-00.png",
                // stage : "assets/images/bgImg-00.png",
            },

            //mental note: chars listed in in ascending counter pwer level. Attack will increase as per the base.
            { 
                name : "Luke Skywalker",
                short : "Luke",
                img : "assets/images/charImg-01.png",
                hp : 150,
                base : 20,
                attack : 20,
                counter : 20,
                defeated : false,
                // stage : "assets/images/bgImg-01.png",
                // select : "assets/sfx/charSel-01",
            },

            { 
                name :  "Obi-Wan Kenobi",
                short : "Obi-Wan",
                img : "assets/images/charImg-02.png",
                hp : 200,
                base : 18,
                attack : 18,
                counter : 25,
                defeated : false,
                // stage : "assets/images/bgImg-02.png",
                // select : "assets/sfx/charSel-02",
            },

            { 
                name : "Darth Vader",
                short: "Vader",
                img : "assets/images/charImg-03.png",
                hp : 250,
                base : 13,
                attack : 13,
                counter : 30,
                defeated : false,
                // stage : "assets/images/bgImg-03.png",
                // select : "assets/sfx/charSel-03",
            },

            { 
                name : "Emperor Palpatine",
                short : "Palpatine",
                img : "assets/images/charImg-04.png",
                hp : 350,
                base : 10,
                attack : 10,
                counter : 35,
                defeated : false,
                // stage : "assets/images/bgImg-04.png",
                // select : "assets/sfx/charSel-04",
            },
        ],

        //index 00 is a wilhelm scream, to be used for gameovers. All others will be randomized as attack sounds
        // attackSFX : ["assets/sfx/attackSFX-00.mp3","assets/sfx/attackSFX-01.mp3","assets/sfx/attackSFX-02.mp3","assets/sfx/attackSFX-03.mp3","assets/sfx/attackSFX-04.mp3","assets/sfx/attackSFX-05.mp3"],
    };
    start();
};

//The START btn will say LOADING until the page is rdy
//If the page is rdy to go, so it loads all necessary objects, as per the function above
$(document).ready(function (){
    reset();
});


//GAME START
//You can begin by pressing the START bttn.
var start = function(){
    $(".attack-area").on("click", ".start-button", function() {
        $(".start-button").html("WAITING");
        $(".start-button").css({opacity:0.5});
        $(".roster-01-idle").removeClass("roster-01-idle").addClass("roster-01-charSelect");
        $(".roster-02-idle").removeClass("roster-02-idle").addClass("roster-02-charSelect");
        $(".roster-03-idle").removeClass("roster-03-idle").addClass("roster-03-charSelect");
        $(".roster-04-idle").removeClass("roster-04-idle").addClass("roster-04-charSelect");
        $(".start-button").removeClass("start-button").addClass("wait-button");
        select();
        return;
    });
    return;
};


//CHARACTER SELECT
var select = function (){  
    
    console.log("going");

    $("#message-box").html("Choose your<br>fighter...");

    $( ".roster-01-charSelect" ).hover(
        function() {
            $("#message-box").html((rpGame.rosterChar[01].name.toUpperCase() + "<br>HP: ") + rpGame.rosterChar[01].hp);
        }, function() {
            $("#message-box").html("Choose your<br>fighter...");
        }
    );

    $( ".roster-02-charSelect" ).hover(
        function() {
            $("#message-box").html((rpGame.rosterChar[02].name.toUpperCase() + "<br>HP: ") + rpGame.rosterChar[02].hp);
        }, function() {
            $("#message-box").html("Choose your<br>fighter...");
        }
    );
    $( ".roster-03-charSelect" ).hover(
        function() {
            $("#message-box").html((rpGame.rosterChar[03].name.toUpperCase() + "<br>HP: ") + rpGame.rosterChar[03].hp);
        }, function() {
            $("#message-box").html("Choose your<br>fighter...");
        }
    );
    $( ".roster-04-charSelect" ).hover(
        function() {
            $("#message-box").html((rpGame.rosterChar[04].name.toUpperCase() + "<br>HP: ") + rpGame.rosterChar[04].hp);
        }, function() {
            $("#message-box").html("Choose your<br>fighter...");
        }
    );

    //Clicking on any character triggers the player battle area to slot that character. It also removes the char from the roster and triggers enemy().

    $(".roster-chars").on("click", ".roster-01-charSelect", function(){
        $("#player-info").css({"background-color" : "green"});
        $("#player-char").html(rpGame.rosterChar[01].name.toUpperCase());
        $("#player-hp").html("HP: " + rpGame.rosterChar[01].hp);
        $("#player-img").attr("src", rpGame.rosterChar[01].img);
        $(".roster-01-charSelect").remove();
        $(".roster-02-charSelect").removeClass("roster-02-charSelect").addClass("roster-02-enemySelect");
        $(".roster-03-charSelect").removeClass("roster-03-charSelect").addClass("roster-03-enemySelect");
        $(".roster-04-charSelect").removeClass("roster-04-charSelect").addClass("roster-04-enemySelect");
        // $(".container").css({"background-image" : "url(" + rpGame.rosterChar[01].stage + ")"});
        currentChar = 1;
        enemy();
    });

    $(".roster-chars").on("click", ".roster-02-charSelect", function(){
        $("#player-info").css({"background-color" : "blue"});
        $("#player-char").html(rpGame.rosterChar[02].name.toUpperCase());
        $("#player-hp").html("HP: " + rpGame.rosterChar[02].hp);
        $("#player-img").attr("src", rpGame.rosterChar[02].img);
        $(".roster-02-charSelect").remove();
        $(".roster-01-charSelect").removeClass("roster-01-charSelect").addClass("roster-01-enemySelect");
        $(".roster-03-charSelect").removeClass("roster-03-charSelect").addClass("roster-03-enemySelect");
        $(".roster-04-charSelect").removeClass("roster-04-charSelect").addClass("roster-04-enemySelect");
        // $(".container").css({"background-image" : "url(" + rpGame.rosterChar[01].stage + ")"});
        currentChar = 2;
        enemy();
    });


    $(".roster-chars").on("click", ".roster-03-charSelect", function(){
        $("#player-info").css({"background-color" : "red"});
        $("#player-char").html(rpGame.rosterChar[03].name.toUpperCase());
        $("#player-hp").html("HP: " + rpGame.rosterChar[03].hp);
        $("#player-img").attr("src", rpGame.rosterChar[03].img);
        $(".roster-03-charSelect").remove();
        $(".roster-01-charSelect").removeClass("roster-01-charSelect").addClass("roster-01-enemySelect");
        $(".roster-02-charSelect").removeClass("roster-02-charSelect").addClass("roster-02-enemySelect");
        $(".roster-04-charSelect").removeClass("roster-04-charSelect").addClass("roster-04-enemySelect");
        // $(".container").css({"background-image" : "url(" + rpGame.rosterChar[01].stage + ")"});
        currentChar = 3;
        enemy();
    });

    $(".roster-chars").on("click", ".roster-04-charSelect", function(){
        $("#player-info").css({"background-color" : "purple"});
        $("#player-char").html(rpGame.rosterChar[04].name.toUpperCase());
        $("#player-hp").html("HP: " + rpGame.rosterChar[04].hp);
        $("#player-img").attr("src", rpGame.rosterChar[04].img);
        $(".roster-04-charSelect").remove();
        $(".roster-01-charSelect").removeClass("roster-01-charSelect").addClass("roster-01-enemySelect");
        $(".roster-02-charSelect").removeClass("roster-02-charSelect").addClass("roster-02-enemySelect");
        $(".roster-03-charSelect").removeClass("roster-03-charSelect").addClass("roster-03-enemySelect");
        currentChar = 4;
        enemy();
    });

};

//ENEMY SELECT
//This function works exactly like char select, except that it fades chosen enemies instead of removing them.
var enemy = function (){ 

    if(win>4) {
        alert("You have bested your enemies")
        location.reload();
    }
    
    $("#message-box").html("Choose your<br>enemy...");

    $( ".roster-01-enemySelect" ).hover(
        function() {
            $("#message-box").html((rpGame.rosterChar[01].name.toUpperCase() + "<br>HP: ") + rpGame.rosterChar[01].hp);
        }, function() {
            $("#message-box").html("Choose your<br>enemy...");
        }
    );

    $( ".roster-02-enemySelect" ).hover(
        function() {
            $("#message-box").html((rpGame.rosterChar[02].name.toUpperCase() + "<br>HP: ") + rpGame.rosterChar[02].hp);
        }, function() {
            $("#message-box").html("Choose your<br>enemy...");
        }
    );
    $( ".roster-03-enemySelect" ).hover(
        function() {
            $("#message-box").html((rpGame.rosterChar[03].name.toUpperCase() + "<br>HP: ") + rpGame.rosterChar[03].hp);
        }, function() {
            $("#message-box").html("Choose your<br>enemy...");
        }
    );
    $( ".roster-04-enemySelect" ).hover(
        function() {
            $("#message-box").html((rpGame.rosterChar[04].name.toUpperCase() + "<br>HP: ") + rpGame.rosterChar[04].hp);
        }, function() {
            $("#message-box").html("Choose your<br>enemy...");
        }
    );

    //Clicking on any character triggers the player battle area to slot that character. It also fades the char from the roster and triggers battle().

    $(".roster-chars").on("click", ".roster-01-enemySelect", function(){
        $("#enemy-info").css({"background-color" : "green"});
        $("#enemy-char").html(rpGame.rosterChar[01].name.toUpperCase());
        $("#enemy-hp").html("HP: " + rpGame.rosterChar[01].hp);
        $("#enemy-img").attr("src", rpGame.rosterChar[01].img);
        $(".roster-01-idle").css({opacity:0.1});
        $(".roster-01-enemySelect").css({opacity:0.1});
        $(".roster-01-enemySelect").removeClass("roster-01-enemySelect").addClass("roster-01-idle");
        $(".roster-02-enemySelect").removeClass("roster-02-enemySelect").addClass("roster-02-idle");
        $(".roster-03-enemySelect").removeClass("roster-03-enemySelect").addClass("roster-03-idle");
        $(".roster-04-enemySelect").removeClass("roster-04-enemySelect").addClass("roster-04-idle");
        currentEnemy = 1;
        battle();
        return;
    });


    $(".roster-chars").on("click", ".roster-02-enemySelect", function(){
        $("#enemy-info").css({"background-color" : "blue"});
        $("#enemy-char").html(rpGame.rosterChar[02].name.toUpperCase());
        $("#enemy-hp").html("HP: " + rpGame.rosterChar[02].hp);
        $("#enemy-img").attr("src", rpGame.rosterChar[02].img);
        $(".roster-02-idle").css({opacity:0.1});
        $(".roster-02-enemySelect").css({opacity:0.1});
        $(".roster-01-enemySelect").removeClass("roster-01-enemySelect").addClass("roster-01-idle");
        $(".roster-02-enemySelect").removeClass("roster-02-enemySelect").addClass("roster-02-idle");
        $(".roster-03-enemySelect").removeClass("roster-03-enemySelect").addClass("roster-03-idle");
        $(".roster-04-enemySelect").removeClass("roster-04-enemySelect").addClass("roster-04-idle");
        currentEnemy = 2;
        battle();
        return;
    });

    $(".roster-chars").on("click", ".roster-03-enemySelect", function(){
        $("#enemy-info").css({"background-color" : "red"});
        $("#enemy-char").html(rpGame.rosterChar[03].name.toUpperCase());
        $("#enemy-hp").html("HP: " + rpGame.rosterChar[03].hp);
        $("#enemy-img").attr("src", rpGame.rosterChar[03].img);
        $(".roster-03-idle").css({opacity:0.1});
        $(".roster-03-enemySelect").css({opacity:0.1});
        $(".roster-01-enemySelect").removeClass("roster-01-enemySelect").addClass("roster-01-idle");
        $(".roster-02-enemySelect").removeClass("roster-02-enemySelect").addClass("roster-02-idle");
        $(".roster-03-enemySelect").removeClass("roster-03-enemySelect").addClass("roster-03-idle");
        $(".roster-04-enemySelect").removeClass("roster-04-enemySelect").addClass("roster-04-idle");
        currentEnemy = 3;
        battle();
        return;
    });

    $(".roster-chars").on("click", ".roster-04-enemySelect", function(){
        $("#enemy-info").css({"background-color" : "purple"});
        $("#enemy-char").html(rpGame.rosterChar[04].name.toUpperCase());
        $("#enemy-hp").html("HP: " + rpGame.rosterChar[04].hp);
        $("#enemy-img").attr("src", rpGame.rosterChar[04].img);
        $(".roster-04-idle").css({opacity:0.1});
        $(".roster-04-enemySelect").css({opacity:0.1});
        $(".roster-01-enemySelect").removeClass("roster-01-enemySelect").addClass("roster-01-idle");
        $(".roster-02-enemySelect").removeClass("roster-02-enemySelect").addClass("roster-02-idle");
        $(".roster-03-enemySelect").removeClass("roster-03-enemySelect").addClass("roster-03-idle");
        $(".roster-04-enemySelect").removeClass("roster-04-enemySelect").addClass("roster-04-idle");
        currentEnemy = 4;
        battle();
        return;
    });
    return;
};

//BATTLE INSTANCE

var battle = function (){  

    console.log(currentEnemy);

    var i=0;

    $(".wait-button").removeClass("wait-button").addClass("attack-button");
    $(".attack-button").css({opacity:1});
    $(".attack-button").html("ATTACK");

    //These are all of the possible battle messages that the player can receive.
    battleMessage = [
        rpGame.rosterChar[currentEnemy].short + " is ready<br>for battle...", 

        rpGame.rosterChar[currentChar].short + " hits for " + rpGame.rosterChar[currentChar].attack + " dmg.<br>" + rpGame.rosterChar[currentEnemy].short + " counters with " + rpGame.rosterChar[currentEnemy].counter + " dmg.", 
    
        rpGame.rosterChar[currentEnemy].short + " has been defeated.",
        
        rpGame.rosterChar[currentChar].short + " has been defeated." 
    ];
    
    $("#message-box").html(battleMessage[i]);

    $( ".roster-01-idle" ).hover(
        function() {
            $("#message-box").html((rpGame.rosterChar[01].name.toUpperCase() + "<br>HP: ") + rpGame.rosterChar[01].hp);
        }, function() {
            $("#message-box").html(battleMessage[i]);
        }
    );

    $( ".roster-02-idle" ).hover(
        function() {
            $("#message-box").html((rpGame.rosterChar[02].name.toUpperCase() + "<br>HP: ") + rpGame.rosterChar[02].hp);
        }, function() {
            $("#message-box").html(battleMessage[i]);
        }
    );
    $( ".roster-03-idle" ).hover(
        function() {
            $("#message-box").html((rpGame.rosterChar[03].name.toUpperCase() + "<br>HP: ") + rpGame.rosterChar[03].hp);
        }, function() {
            $("#message-box").html(battleMessage[i]);
        }
    );
    $( ".roster-04-idle" ).hover(
        function() {
            $("#message-box").html((rpGame.rosterChar[04].name.toUpperCase() + "<br>HP: ") + rpGame.rosterChar[04].hp);
        }, function() {
            $("#message-box").html(battleMessage[i]);
        }
    );

    $(".attack-area").on("click", ".attack-button",  function() {
        event.stopPropagation()
    
        console.log("I hear ya!");
        console.log("Counter: " + rpGame.rosterChar[currentEnemy].counter);
    
        i=1;
        
        //CurrentEnemy HP - currentChar attack
        rpGame.rosterChar[currentEnemy].hp = rpGame.rosterChar[currentEnemy].hp - rpGame.rosterChar[currentChar].attack;

        console.log(rpGame.rosterChar[currentChar].attack);
    
        //CurrentChar HP - currentEnemy counter
        rpGame.rosterChar[currentChar].hp = rpGame.rosterChar[currentChar].hp -  rpGame.rosterChar[currentEnemy].counter;

        console.log(rpGame.rosterChar[currentEnemy].counter)
    
        $("#message-box").html(battleMessage[i]);
    
        $("#player-hp").html("HP: " + rpGame.rosterChar[currentChar].hp);
        $("#enemy-hp").html("HP: " + rpGame.rosterChar[currentEnemy].hp);
    
        //CurentChar attack + currentChar base
        rpGame.rosterChar[currentChar].attack = rpGame.rosterChar[currentChar].attack + rpGame.rosterChar[currentChar].base;

        console.log(rpGame.rosterChar[currentChar].base);

        if(rpGame.rosterChar[currentEnemy].hp<1){
            i=2
            $("#message-box").html(battleMessage[i])
            $(".roster-01-idle").removeClass("roster-01-idle").addClass("roster-01-enemySelect");
            $(".roster-02-idle").removeClass("roster-02-idle").addClass("roster-02-enemySelect");
            $(".roster-03-idle").removeClass("roster-03-idle").addClass("roster-03-enemySelect");
            $(".roster-04-idle").removeClass("roster-04-idle").addClass("roster-04-enemySelect");
            $(".attack-button").removeClass("attack-button").addClass("wait-button");
            $(".wait-button").css({opacity:0.5});
            $(".wait-button").html("WAITING");
            win++;
            console.log(win);
            enemy();
            return;
        }

        else if (rpGame.rosterChar[currentChar].hp<1){
            i=3
            $("#message-box").html(battleMessage[i])
            alert("GAME OVER!!!!");
            location.reload();
        }    
    
    });
    return;

};

