var SERVER_URL = "http://dev.cs.smu.ca:9898";
$("body").ready(init);

function init() {
    $("#save").click(save);
    $("#previous").click(previous);
    $("#next").click(next);
}

var index = 0;
var shapes;

function draw(i) {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var w = $('#canvas').width();
    var h = $('#canvas').height();
    ctx.clearRect(0, 0, w, h);

    switch (shapes[i].Shape) {
        case 'Circle':
            ctx.beginPath();
            ctx.arc(w / 4, h / 2, w / 4, 0, 2 * Math.PI);
            ctx.closePath();
            //check for stroke or fill
            if (shapes[i].Fill == "stroke") {
                ctx.strokeStyle = shapes[i].Colour;
                ctx.stroke();
            }
            if (shapes[i].Fill == "fill") {
                ctx.fillStyle = shapes[i].Colour;
                ctx.fill();
            }
            break;
        case 'Square':
            ctx.beginPath();
            ctx.rect(0, 0, w - 200, h);
            ctx.closePath();
            //check for stroke of fill
            if (shapes[i].Fill == "stroke") {
                ctx.strokeStyle = shapes[i].Colour;
                ctx.stroke();
            }
            if (shapes[i].Fill == "fill") {
                ctx.fillStyle = shapes[i].Colour;
                ctx.fill();
            }
            break;
        case 'Triangle':
            ctx.beginPath();
            ctx.moveTo(0, h);
            ctx.lineTo(w / 4, 0);
            ctx.lineTo(w / 2, h);
            ctx.closePath();
            //check for stroke or fill
            if (shapes[i].Fill == "stroke") {
                ctx.strokeStyle = shapes[i].Colour;
                ctx.stroke();
            }
            if (shapes[i].Fill == "fill") {
                ctx.fillStyle = shapes[i].Colour;
                ctx.fill();
            }
            break;
    }

    ctx.font = "20px Georgia";
    ctx.fillStyle = shapes[i].Colour;
    ctx.fillText("Index: " + index, 450, 50);
    ctx.fillText("Fill: " + shapes[i].Fill, 450, 70);
    ctx.fillText("Colour: " + shapes[i].Colour, 450, 90);
}
;

function getShapesArray () {

    $.get(SERVER_URL + '/getShapes',
        function (data) {

            if (data === null || data.length === 0) {
                //no record whatsoever, let the user know
                alert("No record found");
                return;
            }
            else {
                alert('Records downloaded successfully!');
                shapes = data;
            }//end else                        

        }).fail(function (error) {
        alert(error.responseText);
    });

};


function next() {
    if (shapes == null) {
        alert("Record didn't exist.");
    } else {
        shapes = JSON.parse(shapes);

        if (index < shapes.length - 1)
        {
            draw(index);
            index++;
        } else
            index = 0;
        draw(index);
    }  
}

function previous() {
    if (shapes == null) {
        alert("Record didn't exist.");
    } else {
        shapes = JSON.parse(shapes);
        if (index > 0)
        {
            index--;
            draw(index);
        } else //if index is 0
            index = shapes.length - 1;
        draw(index);
    }
}

function save() {
    try {

        if (document.getElementById("fill").checked)
        {
            var fill = $("#fill").val();
        } else if (document.getElementById("stroke").checked)
        {
            var fill = $("#stroke").val();
        }
        //new shape object
        var shape = {
            "Shape": $("#shapes").val(),
            "Fill": fill,
            "Colour": $("#color").val()
         
        };
        


        $.post(SERVER_URL + '/saveShape', shape, 
        function(data){
            alert(data);
        }).fail(function(error){
            alert(error.responseText);
        });
        
    } catch (e) {
        /* Google browsers use different error 
         * constant
         */
        if (window.navigator.vendor ===
                "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert(
                        "Error: Local Storage limit exceeds."
                        );
            }
        } else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to local storage.");
        }

        console.log(e);
    }
    getShapesArray();
}

