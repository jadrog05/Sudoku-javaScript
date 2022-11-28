class sudokuGenerator {
    constructor() {
        this.defaultgrid = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]];

        this.fixedgrid = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]];

        this.gridGenerated = false;
    }

    rowCheck(grid,x,y,value){
        for (let i = 0; i<9; i++){
            if (grid[i][y] == value){
                if (i != x){
                    return false
                }
            }
        }
        return true
    }
    
    columnCheck(grid,x,y,value){
        for (let i = 0; i<9; i++){
            if (grid[x][i] == value){
                if (i != y){
                    return false
                }
            }
        }
        return true
    }

    BoxCheck(grid,x,y,value){
        let lowerI = (Math.floor(x/3)*3);
        let lowerJ = (Math.floor(y/3)*3);
        for (let i = lowerI; i<lowerI+3; i++ ){
            for (let j = lowerJ; j<lowerJ+3; j++){
                let ref = grid[i][j]
                if (ref == value){
                    if (i !== x || j !== y){
                    return false
                    }
                }
            }
        }
        return true
    }

    valid(grid,x,y,value){
        if (this.BoxCheck(grid,x,y,value)){
            if (this.columnCheck(grid,x,y,value)){
                if (this.rowCheck(grid,x,y,value)){
                    return true
                }
            }
        }
        return false
    }

    shuffle(numlist){
        return numlist
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    }

    setFixed(grid){
        this.fixedgrid = grid
    }


    solveGrid(fixedgrid = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]])
        {
        let counter = 0
        let backtracked = false
        let availableNumsGrid = []
        let numberlist = [1,2,3,4,5,6,7,8,9]
        let defaultgrid = fixedgrid.map((fixedgrid)=>{
            return fixedgrid.slice()
        })


        let recursions = 0
        let successfullGeneration = true


        while (counter<81) {
            let row = Math.floor(counter/9)
            let col =  counter % 9
            
            
            if (fixedgrid[row][col] == 0){
                if(backtracked == false){
                    numberlist = this.shuffle(numberlist);
                    let tempList = [];
                    for (let i = 0; i<9;i++){
                        if (this.valid(defaultgrid,row,col,numberlist[i])){
                            tempList.push(numberlist[i])
                        }
                    }
                    availableNumsGrid.push(tempList)
                }
    
                if(availableNumsGrid[counter].length == 0){
                    defaultgrid[row][col]= 0
                    availableNumsGrid.pop()
                    counter = counter - 1;
                    backtracked = true;
                } 
                else
                {
                    defaultgrid[row][col] = availableNumsGrid[counter].pop()
                    counter = counter + 1;
                    backtracked = false
                }
            }
            else
            {
                counter = counter + 1
                availableNumsGrid.push([])
            }
            recursions++

            if (recursions>20000){
                console.log("This might not be solveable")
                successfullGeneration = false
                break
            }
        }
        return successfullGeneration, defaultgrid
    }

    removeNumbers(grid,difficulty = "easy"){
        var squaresToRemove = 0;
        switch (difficulty) {
            case "easy":
                squaresToRemove = 56
                break;
            case "medium":
                squaresToRemove = 63
                break;
            case "hard":
                squaresToRemove = 68
            default:
                break;
        }

        console.log(squaresToRemove)
        let finalGrid = grid.map((grid)=>{
            return grid.slice()
        })

        while(squaresToRemove>0){
            let row = Math.floor(Math.random()*9)
            let col = Math.floor(Math.random()*9)

            if (finalGrid[row][col]!= 0){
                finalGrid[row][col]= 0;
                squaresToRemove--
            }
        }
        console.log(finalGrid)
        return finalGrid;
    }

}

export default sudokuGenerator;