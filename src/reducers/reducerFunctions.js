export function createGrid(state, grid){
    return {...state, pipes:grid, lost: false, won:false, score: 0, once:false };
}

export function rotateNode(state, x, y){
    let newPipes = state.pipes.slice();
    newPipes[x][y].rotation = (newPipes[x][y].rotation + 90)%360;
    newPipes[x][y].state = (newPipes[x][y].state + 1)%4;
    newPipes[x][y].accept();
    return {...state, pipes: newPipes};
}

export function changeTemp1(state, a){
    return {...state, size:a};
}

export function changeTemp2(state, a){
    return {...state, startPipe:a};
}

export function changeTemp3(state, a){
    return {...state, endPipe:a};
}

export function changeTemp4(state, a){
    return {...state, name:a};
}

export function loadOptions(state, obj){
    return {...state, size: obj.size, startPipe: obj.startPipe, endPipe: obj.endPipe, name: obj.name};
}

export function spreadWater(state){
    let newPipes = state.pipes.slice();
    let newScore = state.score;
    let filledPipes = [];
    let endPipes = 0;
    for(x = 0; x < newPipes.length; x++){
        for(y = 0; y < newPipes[x].length; y++){
            if(newPipes[x][y].filled){
                filledPipes.push(newPipes[x][y]);
                if(newPipes[x][y].spriteNum==4){
                    endPipes++;
                }
            }
        }
    }
    for(i = 0; i < filledPipes.length; i++){
        newScore += filledPipes[i].fillArround(newPipes);
    }
    if(endPipes==state.endPipe+state.startPipe){
        return {...state, pipes:newPipes, won: true};
    }
    if(newScore == state.score){
        return {...state, pipes: newPipes, lost: true};
    }
    return {...state, pipes: newPipes, score: newScore};
}
