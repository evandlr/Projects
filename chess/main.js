$(".nothing").attr('draggable', false);

$("img").draggable({
    grid: [150, 150],
})

$("img").droppable({
    drop: function(event, ui){
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
        console.log(attColor, defColor, attType, defType, x1, x2, y1, y2);
        if (attColor === defColor){
            globalThis.accCheck = "f";
        }
        else if (attType === "bishop"){
            if (Math.abs((y2 - y1) / (x2 - x1)) === 1){
                globalThis.accCheck = "t";
            } else{
                globalThis.accCheck = "f";
            }
        }
        else if (attType === "king"){
            if (Math.abs(y2 - y1) <= 1 && Math.abs(x2 - x1) <= 1){
                globalThis.accCheck = "t";
            } else{
                globalThis.accCheck = "f";
            }
        }
        else if (attType === "rook"){
            if (y2 - y1 === 0 || x2 - x1 === 0){
                globalThis.accCheck = "t";
            } else{
                globalThis.accCheck = "f";
            }
        }
        else if (attType === "queen"){
            if (Math.abs((y2 - y1) / (x2 - x1)) === 1 || y2 - y1 === 0 || x2 - x1 === 0){
                globalThis.accCheck = "t";
            } else{
                globalThis.accCheck = "f";
            }
        }
        else if (attType === "knight"){
            if (Math.abs(y2 - y1) + Math.abs(x2 - x1) === 3 && (Math.abs((y2 - y1) / (x2 - x1)) === 0.5 || Math.abs((y2 - y1) / (x2 - x1)) === 2)){
                globalThis.accCheck = "t";
            } else{
                globalThis.accCheck = "f";
            }
        }
        else if (attType === "pawn"){
            if (attColor === "white"){
                if (defColor === "black"){
                    if (y1 - y2 === 1 && Math.abs(x2 - x1) === 1){
                        globalThis.accCheck = "t";
                    } else{
                        globalThis.accCheck = "f";
                    }
                } else{
                    if (y1 - y2 === 1 && x2 - x1 === 0){
                        globalThis.accCheck = "t";
                    } else{
                        globalThis.accCheck = "f";
                    }
                }
            } else{
                if (defColor === "white"){
                    if (y2 - y1 === 1 && Math.abs(x2 - x1) === 1){
                        globalThis.accCheck = "t";
                    } else{
                        globalThis.accCheck = "f";
                    }
                } else{
                    if (y2 - y1 === 1 && x2 - x1 === 0){
                        globalThis.accCheck = "t";
                    } else{
                        globalThis.accCheck = "f";
                    }
                }
            }
        }
        ui.draggable.css({'left': '0px', 'top': '0px'});
        if (accCheck === "t"){
            $(this).attr('src', ui.draggable.attr('src'));
            $(this).attr('class', ui.draggable.attr('class'));
            ui.draggable.attr('class', 'nothing' )
        }
    }
});