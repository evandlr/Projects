globalThis.turn = 1;
$("img").draggable({
    cancel: ".nothing",
    containment: ".board",
    start: function(event, ui){
        $(this).css({'z-index': '1'});
    },
    stop: function(event, ui){
        $(this).css({'left': '0px', 'top': '0px', 'z-index': '0'});
    }
})

$("img").droppable({
    tolerance: 'pointer',
    drop: function(event, ui){
        globalThis.ignoredPos = []
        globalThis.justCastle = 0
        globalThis.accCheck = "t";
        let splitAttClasses = ui.draggable.attr('class').split(' ');
        let splitDefClasses = $(this).attr('class').split(' ');
        const attColor = splitAttClasses[0];
        globalThis.defColor = splitDefClasses[0];
        const attType = splitAttClasses[1];
        globalThis.defType = splitDefClasses[1];
        const attPos = ui.draggable.attr('id');
        let defPos = $(this).attr('id');
        const y1 = parseFloat(attPos);
        globalThis.y2 = parseFloat(defPos);
        const x1 = parseFloat(attPos.charAt(2));
        globalThis.x2 = parseFloat(defPos.charAt(2));
        if (attColor === defColor || (turn % 2 === 1 && attColor === "black") || (turn % 2 === 0 && attColor === "white")){
            accCheck = "f";
        }
        else if (attType === "bishop"){
            if (Math.abs((y2 - y1) / (x2 - x1)) === 1){
                for(let i = y2, j = x2; i !== y1; i += Math.sign(y1-y2), j += Math.sign(x1 - x2)) {
                    var currentPos = String(i) + "_" + String(j);
                    if (document.getElementById(currentPos).className.includes("nothing") !== true){
                        if (currentPos !== $(this).attr("id")){
                            accCheck = "f";
                        }
                    }
                }
            }else{accCheck = "f";}
        }
        else if (attType === "king") {
            if (attColor === "white") {
                globalThis.side = 8
            } else {
                globalThis.side = 1
            }
            if (y2 === side && (x2 - x1) > 1 && document.getElementById(String(side) + "_8").className.includes("castle") && document.getElementById(String(side) + "_6").className.includes("nothing")) {
                x2 = 7
                justCastle = 1
                console.log("right castle")
            } else if (y2 === side && (x2 - x1) < -1 && document.getElementById(String(side) + "_1").className.includes("castle") && document.getElementById(String(side) + "_4").className.includes("nothing") && document.getElementById(String(side) + "_3").className.includes("nothing") && document.getElementById(String(side) + "_2").className.includes("nothing")) {
                x2 = 3
                justCastle = 1
                console.log("left castle")
            } else if (Math.abs(y2 - y1) > 1 || Math.abs(x2 - x1) > 1){
                accCheck = "f";
            } if (accCheck === "t"){
                let fixes = $(document.getElementsByClassName(attColor + " rook"))
                for (let i = 0; i < fixes.length; i++){
                    fixes[i].className = $(fixes[i]).attr('class').replace(' castle', '')
                }
            }
        }
        else if (attType === "rook"){
            if (y2 - y1 === 0){
                for (let i = x2; i !== x1 ; i += Math.sign(x1-x2)) {
                    var currentPos = String(y2) + "_" + String(i);
                    if (document.getElementById(currentPos).className.includes("nothing") !== true){
                        if (currentPos !== $(this).attr("id")){
                            accCheck = "f";
                        }
                    }
                }
            }
            else if (x2 - x1 === 0){
                for (let i = y2; i !== y1 ; i += Math.sign(y1-y2)) {
                    var currentPos = String(i) + "_" + String(x2);
                    if (document.getElementById(currentPos).className.includes("nothing") !== true){
                        if (currentPos !== $(this).attr("id")){
                            accCheck = "f";
                        }
                    }
                }
            }
            else{accCheck = 'f';}
        }
        else if (attType === "queen"){
            if (Math.abs((y2 - y1) / (x2 - x1)) === 1){
                for(let i = y2, j = x2; i !== y1; i += Math.sign(y1-y2), j += Math.sign(x1 - x2)) {
                    var currentPos = String(i) + "_" + String(j);
                    if (document.getElementById(currentPos).className.includes("nothing") !== true){
                        if (currentPos !== $(this).attr("id")){
                            accCheck = "f";
                        }
                    }
                }
            }
            else if (y2 - y1 === 0){
                for (let i = x2; i !== x1 ; i += Math.sign(x1-x2)) {
                    var currentPos = String(y2) + "_" + String(i);
                    if (document.getElementById(currentPos).className.includes("nothing") !== true){
                        if (currentPos !== $(this).attr("id")){
                            accCheck = "f";
                        }
                    }
                }
            }
            else if (x2 - x1 === 0){
                for (let i = y2; i !== y1 ; i += Math.sign(y1-y2)) {
                    var currentPos = String(i) + "_" + String(x2);
                    if (document.getElementById(currentPos).className.includes("nothing") !== true){
                        if (currentPos !== $(this).attr("id")){
                            accCheck = "f";
                        }
                    }
                }
            }
            else{accCheck = 'f';}
        }
        else if (attType === "knight"){
            if (Math.abs(y2 - y1) + Math.abs(x2 - x1) !== 3 || ((Math.abs((y2 - y1) / (x2 - x1)) !== 0.5 && Math.abs((y2 - y1) / (x2 - x1)) !== 2))){
                accCheck = "f";
            }
        }
        else if (attType === "pawn"){
            if (splitAttClasses[2] === "0"){
                globalThis.extraOption = 2
            }
            else{
                globalThis.extraOption = 1
            }
            if (attColor === "white"){
                if (defColor === "black"){
                    if (y1 - y2 !== 1 || Math.abs(x2 - x1) !== 1){
                        accCheck = "f";
                    }
                } else{
                    if ((y1 - y2 !== 1 && y1 - y2 !== extraOption)|| x2 - x1 !== 0){
                        accCheck = "f";
                    }
                }
            } else{
                if (defColor === "white"){
                    if (y2 - y1 !== 1 || Math.abs(x2 - x1) !== 1){
                        accCheck = "f";
                    }
                } else{
                    if ((y2 - y1 !== 1 && y2 - y1 !== extraOption)|| x2 - x1 !== 0){
                        accCheck = "f";
                    }
                }
            }
            if (accCheck === "t"){
                if (Math.abs(y2 - y1) === 2){
                    ui.draggable.attr('class', ui.draggable.attr('class').slice(0, 11) + "1" + ui.draggable.attr('class').slice(12))
                } else{
                    ui.draggable.attr('class', ui.draggable.attr('class').slice(0, 11) + "2" + ui.draggable.attr('class').slice(12))
                } if ((y2 === 8 && attColor === "black") || (y2 === 1 && attColor === "white")){
                    console.log("promotion")
                }
            }
        }
        if (accCheck === "t"){
            let pieces = [
                {class: "white,pawn", text: "♙"},
                {class: "black,pawn", text: "♟"},
                {class: "white,queen", text: "♕"},
                {class: "black,queen", text: "♛"},
                {class: "white,king", text: "♔"},
                {class: "black,king", text: "♚"},
                {class: "white,rook", text: "♖"},
                {class: "black,rook", text: "♜"},
                {class: "white,bishop", text: "♗"},
                {class: "black,bishop", text: "♝"},
                {class: "white,knight", text: "♘"},
                {class: "black,knight", text: "♞"}
            ];
            let words = ui.draggable.attr("class").split(" ").splice(0, 2).join();

            for (let i = 0; i !== pieces.length; i += 1){
                if (pieces[i].class === words){
                    globalThis.piece = pieces[i].text;
                    break;
                }
            }
            let pos = [String(x2), String(y2)];
            pos[0] = String.fromCharCode(pos[0].charCodeAt(0) + 48);
            pos[1] = 9 - parseInt(pos[1])
            globalThis.savedSrc = $(document.getElementById(String(y2) + "_" + String(x2))).attr('src');
            $(document.getElementById(String(y2) + "_" + String(x2))).attr('src', ui.draggable.attr('src'));
            $(document.getElementById(String(y2) + "_" + String(x2))).attr('class', ui.draggable.attr('class'));
            let savedInfo = ui.draggable.attr('class');
            ui.draggable.attr('class', 'nothing' )
            if (attColor === "white"){
                let defKing = $(document.getElementsByClassName("white king")[0]).attr("id");
                let offKing = $(document.getElementsByClassName("black king")[0]).attr("id");
                globalThis.defCheck = check(defKing, "white king");
                globalThis.offCheck = check(offKing, "black king")
            } else{
                let defKing = $(document.getElementsByClassName("black king")[0]).attr("id");
                let offKing = $(document.getElementsByClassName("white king")[0]).attr("id");
                globalThis.defCheck = check(defKing, "black king");
                globalThis.offCheck = check(offKing, "white king")
            }
            if (defCheck !== 0){
                alert("WAIT!!! You're in check!");
                console.log(defType, defColor)
                $(document.getElementById(String(y2) + "_" + String(x2))).attr('class', defColor + " " + defType);
                $(document.getElementById(String(y2) + "_" + String(x2))).attr('src', savedSrc);
                ui.draggable.attr('class', savedInfo)
            } else {
                if(attType === 'rook'){
                    document.getElementById(String(y2) + "_" + String(x2)).className = $(document.getElementById(String(y2) + "_" + String(x2))).attr('class').replace(' castle', '')
                    console.log(ui.draggable.attr)
                } else if (justCastle === 1){
                    if (x2 === 7){
                        let tempVar = document.getElementById(String(y2) + "_8").className;
                        $(document.getElementById(String(y2) + "_8")).attr('class', document.getElementById(String(y2) + "_6").className);
                        $(document.getElementById(String(y2) + "_6")).attr('class', tempVar);
                        tempVar = $(document.getElementById(String(y2) + "_8")).attr('src');
                        $(document.getElementById(String(y2) + "_8")).attr('src', $(document.getElementById(String(y2) + "_6")).attr('src'));
                        $(document.getElementById(String(y2) + "_6")).attr('src', tempVar);
                        pos = "O-O"
                    } else{
                        let tempVar = document.getElementById(String(y2) + "_1").className;
                        $(document.getElementById(String(y2) + "_1")).attr('class', document.getElementById(String(y2) + "_4").className);
                        $(document.getElementById(String(y2) + "_4")).attr('class', tempVar);
                        tempVar = $(document.getElementById(String(y2) + "_1")).attr('src');
                        $(document.getElementById(String(y2) + "_1")).attr('src', $(document.getElementById(String(y2) + "_4")).attr('src'));
                        $(document.getElementById(String(y2) + "_4")).attr('src', tempVar);
                        pos = "O-O-O"
                    }
                }
                if (defColor !== "nothing"){
                    pos = "x" + pos[0] + pos[1]
                } else if (justCastle === 0){
                    pos = pos[0] + pos[1]
                }
                if (offCheck !== 0){
                    if (attColor === "white"){
                        globalThis.gah = "black"
                    } else{
                        globalThis.gah = "white"
                    }
                    let issue = checkmate(gah, offCheck)
                    if (issue === true){
                        alert("CHECKMATE!!!!!!!!!!!!!!!!")
                        pos = pos + "#"
                    } else{
                        pos = pos + "+"
                    }
                }
                if (turn % 2 === 1){
                    globalThis.codeToAppend = "<tr>" + "<td style='border: 1px solid;'>" + String(Math.floor(turn/2 + 1))+ "</td> <td>" + piece + pos + "</td> <td id='last'></td>" + "</tr>"
                    $(".moves").append(codeToAppend);
                } else{
                    globalThis.codeToAppend = piece + pos;
                    $("#last").append(codeToAppend);
                    $("#last").attr('id', '');
                }
                turn += 1;
            }
        }
    }
});

function check(kingPos, checkColor) {
    globalThis.counter = 0;
    globalThis.dangerPos = []
    globalThis.blockPos = []
    let color = checkColor.slice(0,5);
    if (color === "white"){
        color = "black"
    } else{
        color = "white"
    }
    kingPos = [Number(kingPos[0]), Number(kingPos[2])]
    for (let i = kingPos[0] + 1; i < 9; i += 1){
        let currentPos = String(i) + "_" + kingPos[1];
        const currentThing = document.getElementById(currentPos).className
        if (currentThing.includes("nothing") !== true && ignoredPos.includes(currentPos) !== true){
            if (currentThing.includes(color) && (currentThing.includes("rook") || currentThing.includes("queen"))){
                dangerPos.push(currentPos);
                blockPos.push(currentPos);
                counter += 1
            } else if (currentThing.includes(color) && (i - kingPos[0] === 1 && currentThing.includes("pawn") && color === "white") || (i - kingPos[0] === 2 && currentThing.includes("pawn 0") && color === "white")){
                blockPos.push(currentPos);
            } break
        }
    }
    for (let i = kingPos[0] - 1; i > 0; i -= 1){
        let currentPos = String(i) + "_" + kingPos[1];
        const currentThing = document.getElementById(currentPos).className
        if (currentThing.includes("nothing") !== true && ignoredPos.includes(currentPos) !== true){
            if (currentThing.includes(color) && (currentThing.includes("rook") || currentThing.includes("queen"))) {
                dangerPos.push(currentPos);
                blockPos.push(currentPos);
                counter += 1
            } else if (currentThing.includes(color) && (i - kingPos[0] === -1 && currentThing.includes("pawn") && color === "black") || (i - kingPos[0] === -2 && currentThing.includes("pawn 0") && color === "black")){
                blockPos.push(currentPos);
            }break
        }
    }
    for (let i = kingPos[1] + 1; i < 9; i += 1){
        let currentPos = kingPos[0] + "_" + String(i);
        const currentThing = document.getElementById(currentPos).className
        if (currentThing.includes("nothing") !== true && ignoredPos.includes(currentPos) !== true){
            if (currentThing.includes(color) && (currentThing.includes("rook") || currentThing.includes("queen"))){
                dangerPos.push(currentPos);
                blockPos.push(currentPos);
                counter += 1
            } break
        }
    }
    for (let i = kingPos[1] - 1; i > 0; i -= 1){
        let currentPos = kingPos[0] + "_" + String(i);
        const currentThing = document.getElementById(currentPos).className
        if (currentThing.includes("nothing") !== true && ignoredPos.includes(currentPos) !== true) {
            if (currentThing.includes(color) && (currentThing.includes("rook") || currentThing.includes("queen"))){
                dangerPos.push(currentPos);
                blockPos.push(currentPos);
                counter += 1
            } break
        }
    }
    for(let i = kingPos[0] + 1, j = kingPos[1] + 1; i < 9 && j < 9; i += 1, j += 1) {
        var currentPos = String(i) + "_" + String(j);
        const currentThing = document.getElementById(currentPos).className
        if (currentThing.includes("nothing") !== true && ignoredPos.includes(currentPos) !== true) {
            if (currentThing.includes(color) && (currentThing.includes("bishop") || currentThing.includes("queen") || (i - kingPos[0] === 1 && currentThing.includes("pawn") && color === "white"))){
                dangerPos.push(currentPos);
                counter += 1;
                if (!(currentThing.includes("pawn"))){
                    blockPos.push(currentPos);
                }
            } break
        }
    }
    for(let i = kingPos[0] - 1, j = kingPos[1] + 1; i > 0 && j < 9; i -= 1, j += 1) {
        var currentPos = String(i) + "_" + String(j);
        const currentThing = document.getElementById(currentPos).className
        if (currentThing.includes("nothing") !== true && ignoredPos.includes(currentPos) !== true) {
            if (currentThing.includes(color) && (currentThing.includes("bishop") || currentThing.includes("queen") || (i - kingPos[0] === -1 && currentThing.includes("pawn") && color === "black"))){
                dangerPos.push(currentPos);
                counter += 1;
                if (!(currentThing.includes("pawn"))){
                    blockPos.push(currentPos);
                }
            } break
        }
    }
    for(let i = kingPos[0] + 1, j = kingPos[1] - 1; i < 9 && j > 0; i += 1, j -= 1) {
        var currentPos = String(i) + "_" + String(j);
        const currentThing = document.getElementById(currentPos).className
        if (currentThing.includes("nothing") !== true && ignoredPos.includes(currentPos) !== true) {
            if (currentThing.includes(color) && (currentThing.includes("bishop") || currentThing.includes("queen") || (i - kingPos[0] === 1 && currentThing.includes("pawn") && color === "white"))){
                dangerPos.push(currentPos);
                counter += 1;
                if (!(currentThing.includes("pawn"))){
                    blockPos.push(currentPos);
                }
            } break
        }
    }
    for(let i = kingPos[0] - 1, j = kingPos[1] - 1; i > 0 && j > 0; i -= 1, j -= 1) {
        var currentPos = String(i) + "_" + String(j);
        const currentThing = document.getElementById(currentPos).className
        if (currentThing.includes("nothing") !== true && ignoredPos.includes(currentPos) !== true) {
            if (currentThing.includes(color) && (currentThing.includes("bishop") || currentThing.includes("queen") || (i - kingPos[0] === -1 && currentThing.includes("pawn") && color === "black"))){
                dangerPos.push(currentPos);
                counter += 1;
                if (!(currentThing.includes("pawn"))){
                    blockPos.push(currentPos);
                }
            } break
        }
    }
    let phrase = color + " knight"
    let knightLocations = $(document.getElementsByClassName(phrase))
    for (let i = 0; i < knightLocations.length; i++) {
        let pos = $(knightLocations[i]).attr('id')
        let y2 = Number(pos[0])
        let x2 = Number(pos[2])
        let y1 = kingPos[0]
        let x1 = kingPos[1]
        if (Math.abs(y2 - y1) + Math.abs(x2 - x1) === 3 && (Math.abs((y2 - y1)/ (x2 - x1)) === 0.5 || Math.abs((y2 - y1)/ (x2 - x1)) === 2)){
            currentPos = String(y2) + "_" + String(x2)
            dangerPos.push(currentPos);
            counter += 1;
            blockPos.push(currentPos);
        }
    }
    return counter
}
function checkmate(color, checks){
    if (color === "white"){
        globalThis.pisces = "white king";
        globalThis.opposite = "black"
    } else{
        globalThis.pisces = "black king";
        globalThis.opposite = "white"
    }
    let king = $(document.getElementsByClassName(pisces)[0]);
    let kingPos = king.attr('id');
    kingPos = [Number(kingPos[0]), Number(kingPos[2])];
    let maxI = Math.min(8, kingPos[0] + 1)
    let maxJ = Math.min(8, kingPos[1] + 1)
    for (let i = Math.max(1, kingPos[0] - 1); i <= maxI; i++){
        for (let j = Math.max(1, kingPos[1] - 1); j <= maxJ; j++) {
            var currentPos = String(i) + "_" + String(j);
            const currentThing = $(document.getElementById(currentPos)).attr("class").split(' ').slice(0, 2);
            if (currentThing.includes("nothing") === true && check(currentPos, pisces) === 0) {
                return false
            }
        }
    }
    let attPiece = $(document.getElementById(dangerPos[0]));
    let attClass = attPiece.attr('class').slice(6, 12);
    if (checks > 1 || attPiece === "knight"){
        return true
    }
    let attPos = dangerPos[0].split("_");
    if (attPos[0] - kingPos[0] === 0 && attPos[1] - kingPos[1] > 0){
        console.log("right")
        for (let i = attPos[1]; i > kingPos[1]; i--){
            let currentPos = String(attPos[0]) + "_" + String(i)
            check(currentPos, opposite)
            if (i === attPos[1]){
                let tempVar = dangerPos.length
                for(let j = 0; j < tempVar; j++){
                    let currentPiece = $(document.getElementById(dangerPos[j])).attr("class").split(' ').slice(0, 2);
                    currentPiece = currentPiece.join(" ")
                }
            } else {
                let tempVar = blockPos.length
                for(let j = 0; j < tempVar; j++){
                    let currentPiece = $(document.getElementById(blockPos[j])).attr("class").split(' ').slice(0, 2);
                    currentPiece = currentPiece.join(" ")
                }
            }
        }
    } if(attPos[0] - kingPos[0] === 0 && attPos[1] - kingPos[1] < 0){
        console.log("left")
    } if(attPos[0] - kingPos[0] > 0 && attPos[1] - kingPos[1] === 0){
        console.log("down")
    } if(attPos[0] - kingPos[0] < 0 && attPos[1] - kingPos[1] === 0){
        console.log("up")
    }
    return false
}