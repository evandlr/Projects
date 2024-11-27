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
        console.log("working on this")
        let attInfo = ui.draggable.attr('class').split(' ').slice(0, 2);
        let defInfo = $(this).attr('class').split(' ').slice(0, 2);
        let attPos = [Number(ui.draggable.attr('id').charAt(0)), Number(ui.draggable.attr('id').charAt(2))]
        let defPos = [Number($(this).attr('id').charAt(0)), Number($(this).attr('id').charAt(2))]
        console.log(attInfo);
        console.log(defInfo);
        console.log(attPos);
        console.log(defPos);
        console.log(moveLogic(attInfo, defInfo, attPos, defPos))
    }
})

function moveLogic(attInfo, defInfo, attPos, defPos){
    if (attInfo[0] === defInfo[0] || (turn % 2 === 1 && attInfo[0] === "black")|| (turn % 2 === 0 && attInfo[0] === "white")){
        return false
    }
    return true
}