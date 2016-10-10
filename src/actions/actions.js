import Constants from '../constants/actionConstants';

const Actions = {
    createGrid: (Grid) => {
        return {
            type: Constants.CREATING_GRID,
            grid: Grid
        }
    },
    rotateNode: (X,Y) => {
        return {
            type: Constants.ROTATING_NODE,
            x:X,
            y:Y
        }
    },
    changeTemp1: (A) => {
        return {
            type:Constants.CHANGING_TEMP_1,
            size:A
        }
    },
    changeTemp2: (A) => {
        return {
            type:Constants.CHANGING_TEMP_2,
            startPipe:A
        }
    },
    changeTemp3: (A) => {
        return {
            type:Constants.CHANGING_TEMP_3,
            endPipe:A
        }
    },
    changeTemp4: (A) => {
        return {
            type:Constants.CHANGING_TEMP_4,
            name:A
        }
    },

};
export default Actions;
