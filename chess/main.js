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
        globalThis.accCheck = "t"
        console.log(ui.draggable.attr('style'))
        let splitAttClasses = ui.draggable.attr('class').split(' ');
        let splitDefClasses = $(this).attr('class').split(' ');
        let attColor = splitAttClasses[0];
        let defColor = splitDefClasses[0];
        let attType = splitAttClasses[1];
        let defType = splitDefClasses[1];
        let attPos = ui.draggable.attr('id');
        let defPos = $(this).attr('id');
        let y1 = parseFloat(attPos);
        let y2 = parseFloat(defPos);
        let x1 = parseFloat(attPos.charAt(2));
        let x2 = parseFloat(defPos.charAt(2));
        if (attColor === defColor || (turn % 2 === 1 && attColor === "black") || (turn % 2 === 0 && attColor === "white")){
            globalThis.accCheck = "f";
        }
        else if (attType === "bishop"){
            if (Math.abs((y2 - y1) / (x2 - x1)) === 1){
                for(let i = y2, j = x2; i !== y1; i += Math.sign(y1-y2), j += Math.sign(x1 - x2)) {
                    var currentPos = String(i) + "_" + String(j);
                    if (document.getElementById(currentPos).className.includes("nothing") !== true){
                        globalThis.accCheck = "f";
                    }
                }
            }else{globalThis.accCheck = "f";}
        }
        else if (attType === "king"){
            if (Math.abs(y2 - y1) > 1 || Math.abs(x2 - x1) > 1){
                globalThis.accCheck = "f";
            }
        }
        else if (attType === "rook"){
            if (y2 - y1 === 0){
                for (let i = x2; i !== x1 ; i += Math.sign(x1-x2)) {
                    var currentPos = String(y2) + "_" + String(i);
                    if (document.getElementById(currentPos).className.includes("nothing") !== true){
                        globalThis.accCheck = "f";
                    }
                }
            }
            else if (x2 - x1 === 0){
                for (let i = y2; i !== y1 ; i += Math.sign(y1-y2)) {
                    var currentPos = String(i) + "_" + String(x2);
                    if (document.getElementById(currentPos).className.includes("nothing") !== true){
                        globalThis.accCheck = "f";
                    }
                }
            }
            else{globalThis.accCheck = 'f';}
        }
        else if (attType === "queen"){
            if (Math.abs((y2 - y1) / (x2 - x1)) === 1){
                for(let i = y2, j = x2; i !== y1; i += Math.sign(y1-y2), j += Math.sign(x1 - x2)) {
                    var currentPos = String(i) + "_" + String(j);
                    if (document.getElementById(currentPos).className.includes("nothing") !== true){
                        globalThis.accCheck = "f";
                    }
                }
            }
            else if (y2 - y1 === 0){
                for (let i = x2; i !== x1 ; i += Math.sign(x1-x2)) {
                    var currentPos = String(y2) + "_" + String(i);
                    if (document.getElementById(currentPos).className.includes("nothing") !== true){
                        globalThis.accCheck = "f";
                    }
                }
            }
            else if (x2 - x1 === 0){
                for (let i = y2; i !== y1 ; i += Math.sign(y1-y2)) {
                    var currentPos = String(i) + "_" + String(x2);
                    if (document.getElementById(currentPos).className.includes("nothing") !== true){
                        globalThis.accCheck = "f";
                    }
                }
            }
            else{globalThis.accCheck = 'f';}
        }
        else if (attType === "knight"){
            if (Math.abs(y2 - y1) + Math.abs(x2 - x1) !== 3 || ((Math.abs((y2 - y1) / (x2 - x1)) !== 0.5 && Math.abs((y2 - y1) / (x2 - x1)) !== 2))){
                globalThis.accCheck = "f";
            }
        }
        else if (attType === "pawn"){
            if (attColor === "white"){
                if (defColor === "black"){
                    if (y1 - y2 !== 1 || Math.abs(x2 - x1) !== 1){
                        globalThis.accCheck = "f";
                    }
                } else{
                    if (y1 - y2 !== 1 || x2 - x1 !== 0){
                        globalThis.accCheck = "f";
                    }
                }
            } else{
                if (defColor === "white"){
                    if (y2 - y1 !== 1 || Math.abs(x2 - x1) !== 1){
                        globalThis.accCheck = "f";
                    }
                } else{
                    if (y2 - y1 !== 1 || x2 - x1 !== 0){
                        globalThis.accCheck = "f";
                    }
                }
            }
        }
        if (accCheck === "t"){
            $(this).attr('src', ui.draggable.attr('src'));
            $(this).attr('class', ui.draggable.attr('class'));
            ui.draggable.attr('class', 'nothing' )
            globalThis.turn += 1;
        }
    }
});