$(".nothing").attr('draggable', false);
globalThis.turn = 1;
$("img").draggable({
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
        globalThis.accCheck = "t";
        console.log(ui.draggable.attr('style'));
        let splitAttClasses = ui.draggable.attr('class').split(' ');
        let splitDefClasses = $(this).attr('class').split(' ');
        console.log(splitAttClasses);
        const attColor = splitAttClasses[0];
        const defColor = splitDefClasses[0];
        const attType = splitAttClasses[1];
        const defType = splitDefClasses[1];
        const attPos = ui.draggable.attr('id');
        let defPos = $(this).attr('id');
        const y1 = parseFloat(attPos);
        const y2 = parseFloat(defPos);
        const x1 = parseFloat(attPos.charAt(2));
        const x2 = parseFloat(defPos.charAt(2));
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
        else if (attType === "king"){
            if (Math.abs(y2 - y1) > 1 || Math.abs(x2 - x1) > 1){
                accCheck = "f";
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
            let pos = $(this).attr("id").split("_");
            [pos[0], pos[1]] = [pos[1], pos[0]];
            pos[0] = String.fromCharCode(pos[0].charCodeAt(0) + 16);
            pos[1] = 9 - parseInt(pos[1])
            $(".moves").append("<p>", piece, pos, "<p>");
            $(this).attr('src', ui.draggable.attr('src'));
            $(this).attr('class', ui.draggable.attr('class'));
            ui.draggable.attr('class', 'nothing' )
            turn += 1;
        }
    }
});

function kingCheck(kingPos){
    console.log("really working on this")
}