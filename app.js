var teamA_CoinEl = document.getElementById("teamA-coin");
var teamB_CoinEl = document.getElementById("teamB-coin");
var bat_or_ballEl = document.getElementById("bat-or-ball");
bat_or_ballEl.hidden = true;


function coinSelect() {
    if (teamA_CoinEl.value == "heads") {
        teamB_CoinEl.innerHTML = "Tails";
    }
    else if (teamA_CoinEl.value == "tails") {
        teamB_CoinEl.innerHTML = "Heads";
    }
}

function toss() {
    /*Toss To Select Bat or Ball*/
    var tossInt = Math.floor(Math.random() * 2);
    var teamA = teamA_CoinEl.value;
    var teamB = teamB_CoinEl.innerHTML;

    if (tossInt === 0) {
        console.log("It's heads");
        if (teamA == "heads") {
            decision("Team A");
        }
        else {
            decision("Team B");
        }
    }
    else {
        console.log("It's tails");
        if (teamA == "tails") {
            decision("Team A");
        }
        else {
            decision("Team B");
        }
    }
}

function userChoice() {
    /*Function to decide if want to bat or ball*/
    var selectOption = bat_or_ballEl.value;
    decision("Team A", selectOption);
}

function decision(teamNameA, selectOption) {
    /*Function to pass both teams decision to Function gamePlay()*/
    var decisionStringA;
    var decisionStringB;
    if (teamNameA == "Team A") {
        bat_or_ballEl.hidden = false;
        while (selectOption != undefined) {
            break;
        }
        decisionStringA = selectOption;
        if (decisionStringA == "bat") {
            decisionStringB = "ball";
        }
        else {
            decisionStringB = "bat";
        }
        if (decisionStringA != undefined) {
        }
    }
    else {
        var decisionInt = Math.floor(Math.random() * 2);
        console.log(decisionInt);
        if (decisionInt === 0) {
            // console.log("Team B decided to bat first");
            decisionStringA = "Bat";
            decisionStringB = "Ball";
        }
        else {
            // console.log("Team B decided to ball first");
            decisionStringA = "Ball";
            decisionStringB = "Bat";
        }
    }
    if (decisionStringA != undefined) {
        gamePlay(teamNameA, decisionStringA, decisionStringB)
    }
}

var oversEl = document.getElementById("quantity-over");

var targetA;
var wicketA;
var extraA;
var teamName;
var targetB;
var wicketB;
var extraB;

function gamePlay(teamNameA, decisionStringA, decisionStringB) {
    console.log("============================================");
    console.log("Total Overs Match: " + oversEl.value);
    console.log("============================================");

    var over = 1;
    var count = 0;
    var runsInt = 0;
    var runsInOver = 0;
    var illegalDelivery = 0;
    var runs = [0, 1, 2, 3, 4, 6, 7];
    var playersA = 10;
    var ballType = "not freehit";
    var extras = 0;
    var inningNum = 1;

    console.log(teamNameA + " decided to " + decisionStringA + " first");
    if (teamNameA == "Team A" && decisionStringA == "bat") {
        console.log("Team B is now Balling");
    }
    else if (teamNameA == "Team B" && decisionStringA == "Bat") {
        console.log("Team A is now Balling");
    }
    else if (teamNameA == "Team A" && decisionStringA == "ball") {
        console.log("Team B is now Batting");
    }
    else if (teamNameA == "Team B" && decisionStringA == "Ball") {
        console.log("Team A is now Batting")
    }
    console.log("============================================");

    if (inningNum == 1) {
        console.log("1st Inning Started");
    }

    var startRuns = setInterval(function () {
        count++;

        if (inningNum == 2) {
            console.log("2nd Inning Started");
        }

        /* EVERY BALL HAS A 10% CHANCE OF AN ILLEGAL DELIVERY */
        illegalDelivery = Math.ceil(Math.random() * 100);
        if (illegalDelivery > 5 && illegalDelivery <= 10)
            ballType = "freehit";

        runsInt = Math.floor(Math.random() * 8);
        while (runsInt === 5) {
            runsInt = Math.floor(Math.random() * 8);
        }

        /* RUNS FROM 0-6 EXCEPT 5 */
        if (runsInt !== 0 && runsInt <= 6 && illegalDelivery > 5) {
            var runOrRuns;
            ballType = "not freehit";
            if (runsInt === 1)
                runOrRuns = "run";
            else
                runOrRuns = "runs";
            console.log("Batsman hits the ball for " + runsInt + " " + runOrRuns);
            if (illegalDelivery >= 11) {
                console.log("-----------------------------------------");
            }
            runsInOver += runsInt;
        }
        /* DOT BALL */
        else if (runsInt === 0) {
            var blockOrMiss = Math.floor(Math.random() * 2);
            if (blockOrMiss === 0) {
                console.log("Batsman blocks the ball " + runsInt + " runs");
            }
            else {
                console.log("Batsman completly misses the ball " + runsInt + " runs");
            }

            if (illegalDelivery >= 11) {
                console.log("-----------------------------------------");
            }
        }

        /* OUT WITH ILLEGAL DELIVERY MODIFIERS */
        if (runsInt === 7) {
            if (illegalDelivery <= 5) {
                console.log("WIDE BALL TEST. 1 Extra Run Awarded");
                extras++;
            }
            else if (illegalDelivery >= 11) {
                var wicketType = Math.floor(Math.random() * 4)
                if (wicketType == 0) {
                    console.log("OUT, BOWLED");
                }
                else if (wicketType == 1) {
                    console.log("OUT, CAUGHT");
                }
                else if (wicketType == 2) {
                    console.log("OUT, LBW");
                }
                else if (wicketType == 3) {
                    console.log("OUT, RUN OUT");
                }
                playersA--;
                console.log("Players remaining for Team A: " + playersA);
                if (playersA === 0) {
                    over = oversEl.value + 1;
                    count = 6;
                    console.log("============================================");
                    console.log("All Out");
                    console.log("============================================");
                }
            }
            else if (illegalDelivery > 5 && illegalDelivery <= 10 && ballType === "freehit" && (wicketType === 0 || wicketType === 1 || wicketType === 2)) {
                if (wicketType === 0)
                    console.log("OUT, BOWLED BUT IT WAS A NO BALL");
                else if (wicketType === 1)
                    console.log("OUT, CAUGHT BUT IT WAS A NO BALL");
                else if (wicketType === 2)
                    console.log("OUT, LBW BUT IT WAS A NO BALL");
                else if (wicketType === 3) {
                    if (ballType === "freehit") {
                        console.log("RUN OUT ON A FREE HIT");
                        playersA--;
                        console.log("Players remaining for Team A: " + playersA);
                        if (playersA === 0) {
                            over = oversEl.value + 1;
                            count = 6;
                            console.log("============================================");
                            console.log("All Out");
                            console.log("============================================");
                        }
                    }
                    extras++;
                }

                if (ballType != "freehit" && (wicketType === 0 || wicketType === 1 || wicketType === 2 || wicketType === 3)) {
                    playersA--;
                    console.log("Players remaining for Team A: " + playersA);
                    if (playersA === 0) {
                        over = oversEl.value + 1;
                        count = 6;
                        console.log("============================================");
                        console.log("All Out");
                        console.log("============================================");
                    }
                }
                else {
                    if (ballType === "freehit" && (wicketType === 0 || wicketType === 1 || wicketType === 2)) {
                        console.log("OUT BUT IT WAS A NO BALL");
                    }
                }
            }
            if (illegalDelivery >= 11) {
                console.log("-----------------------------------------");
            }
        }

        /*Illegal Delivery Modifier*/
        if (illegalDelivery >= 0 && illegalDelivery <= 10) {
            /*WIDE BALL (8% Chance From 1-8)*/
            if (illegalDelivery <= 5) {
                console.log("WIDE BALL. 1 Extra Run Awarded");
                console.log("-----------------------------------------");
            }
            /*NO BALL (8% Chance From 9-16)*/
            else if (illegalDelivery > 5 && illegalDelivery <= 10) {
                console.log("NO BALL. 1 Extra Run Awarded");
                console.log("FREE HIT!!");
                ballType = "freehit";
                console.log("-----------------------------------------");
            }
            runsInOver++;
            extras++;
            count--
        }

        if (count === 6) {
            count = 0;
            if (playersA != 0) {
                console.log("============================================");
                console.log("Over Completed");
                console.log("Total: " + runsInOver + " runs");
                console.log("Wickets: ", 11 - playersA);
                console.log("Total Overs Completed: " + over);
                console.log("============================================");
            }
            over++;

            if (over > oversEl.value) {
                if (inningNum == 1) {
                    console.log("============================================");
                    console.log("Innings Completed");
                    console.log("TARGET: " + ++runsInOver);
                    console.log("Wickets: ", 11 - playersA);
                    console.log("Extras: " + extras);
                    console.log("============================================");
                    targetA = runsInOver;
                    wicketA = 11 - playersA;
                    extraA = extras;
                    teamName = teamNameA;
                    inningNum++;

                    runsInOver = 0;
                    playersA = 10;
                    vextras = 0;
                }
                else {
                    console.log("============================================");
                    console.log("Innings Completed");
                    console.log("Score: " + ++runsInOver);
                    console.log("Wickets: ", 11 - playersA);
                    console.log("Extras: " + extras);
                    console.log("============================================");
                    targetB = runsInOver;
                    wicketB = 11 - playersA;
                    extraB = extras;
                    clearInterval(startRuns);
                    if (targetB > targetA) {
                        if (teamNameA = "Team A") {
                            console.log("TEAM B WON BY "/* + targetB - targetA + " runs"*/);
                        }
                        else {
                            console.log("TEAM A WON BY"/* + targetA - targetB + " runs"*/);
                        }
                    }
                    else if (targetA > targetB) {
                        if (teamNameA = "Team A") {
                            console.log("TEAM B WON BY "/* + targetB - targetA + " runs"*/);
                        }
                        else {
                            console.log("TEAM A WON BY "/* + targetA - targetB + " runs"*/);
                        }
                    }
                    else {
                        console.log("IT'S A DRAW");
                    }
                }
            }
        }
    }, 1200);
}