// const canvas = new fabric.Canvas('canvas',{
//     width: 500,
//     height: 500,
//      backgroundColor: 'red',

// })

const initCanvas = (id)=>{
    return new fabric.Canvas(id,{
        width: 500,
        height: 500,
        selection: false
    });
}

const setBackgroundImage = (url, canvas) =>{
    fabric.Image.fromURL(url, (img)=>{
        canvas.backgroundImage = img;
        canvas.renderAll();
    })
}

const canvas = initCanvas('canvas');
setBackgroundImage('https://cdn.pixabay.com/photo/2022/03/01/20/58/peace-genius-7042013_960_720.jpg', canvas)

// canvas.renderAll();

// fire events

// Mouse Hover or over Events
// mouse:down
// mouse:move
// mouse:up
// mouse:over
// mouse:out
// mouse:dblclick
// mouse:down:before
// mouse:move:before 
// mouse:up:before 


// cursor style value
// auto | default | none |
//     context-menu | help | pointer | progress | wait |
//     cell | crosshair | text | vertical-text |
//     alias | copy | move | no-drop | not-allowed | grab | grabbing |
//     e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll |
//     zoom-in | zoom-out

let mousePressed = false;

let currentMode;
const modes = {
    pan: 'pan',
    drawing: 'drawing'
}

 
const panactive = document.getElementById('panactive');
const drawingactive = document.getElementById('drawingactive');

const toggleMode = (mode)=>{
    if(mode === modes.pan){
        if(currentMode === modes.pan){
            currentMode = '';        
            panactive.innerHTML='Pan Off';
           
        }else{
            currentMode = modes.pan; 
            canvas.isDrawingMode = false;                  
            canvas.renderAll();           
            panactive.innerHTML='Pan On';
            drawingactive.innerHTML='Drawing Off';
        }
    }else if(mode === modes.drawing){
        if(currentMode === modes.drawing){
            currentMode = '';            
            canvas.isDrawingMode = false;
            canvas.renderAll();
            drawingactive.innerHTML='Drawing Off';            
           
        }else{
            
            currentMode = modes.drawing;
            canvas.freeDrawingBrush.color = 'red';
            canvas.freeDrawingBrush.width = 15;
            canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
            canvas.setCursor('grab');
            canvas.isDrawingMode = true;
            canvas.renderAll();
            drawingactive.innerHTML='Drawing On'; 
            panactive.innerHTML='Pan Off';
        }
    }
    console.log(mode)
    
    
    // currentMode = modes.pan
}

// const disablePan = ()=>{
//     currentMode = ''
// }

const setPanEvent= ()=>{
    canvas.on('mouse:move', (event)=>{
        // console.log(event)
        // const nEvent = event.e;
        // const move = new fabric.Point(nEvent.movementX, nEvent.movementY)
        // canvas.relativePan(move)
        if(mousePressed && currentMode === modes.pan){
            canvas.setCursor('grab');
            canvas.renderAll();
            const nEvent = event.e;
            const move = new fabric.Point(nEvent.movementX, nEvent.movementY)
            canvas.relativePan(move)
        }
    })
    
    canvas.on('mouse:down', (event)=>{
        mousePressed = true;
        if(currentMode === modes.pan){
            canvas.setCursor('grab');            
            canvas.renderAll();
        }
        
    });
    
    canvas.on('mouse:up', (event)=>{
        mousePressed = false;
        canvas.setCursor('default');
        canvas.renderAll();
    });
}

setPanEvent();





