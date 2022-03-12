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


let mousePressed = false;

let currentMode;
const modes = {
    pan: 'pan',
    drawing: 'drawing'
}

 
const panactive = document.getElementById('panactive');
const drawingactive = document.getElementById('drawingactive');
const togglePan = (mode)=>{
    if(mode === modes.pan){
        if(currentMode === modes.pan){
            currentMode = '';
            panactive.innerHTML='Pan Off';
           
        }else{
            currentMode = modes.pan;
            panactive.innerHTML='Pan On';
        }
    }
}
const toggledrawing = (mode)=>{
    if(mode === modes.drawing){
        if(currentMode === modes.drawing){
            currentMode = '';
            canvas.isDrawingMode = false;
            canvas.renderAll();
            drawingactive.innerHTML='Drawing Off';
           
        }else{
            currentMode = modes.drawing;
            
            drawingactive.innerHTML='Drawing On';
        }
    }
}
// const togglePan = (mode)=>{
//     if(mode === modes.pan){
//         if(currentMode === modes.pan){
//             currentMode = '';
//             panactive.innerHTML='Pan Off';
           
//         }else{
//             currentMode = modes.pan;
//             panactive.innerHTML='Pan On';
//         }
//     }else if(mode === modes.drawing){
//         if(currentMode === modes.drawing){
//             currentMode = '';            
//             canvas.isDrawingMode = false;
//             canvas.renderAll();
//             drawingactive.innerHTML='Drawing Off';            
           
//         }else{
//             currentMode = modes.drawing;
//             drawingactive.innerHTML='Drawing On'; 
//         }
//     }
//     console.log(mode)
    
    
   
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
        }else if(mousePressed && currentMode === modes.drawing){
            canvas.setCursor('grab');
            canvas.isDrawingMode = true;
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





