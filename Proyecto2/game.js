document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.grid');
    const flagsLeft = document.querySelector('#flags-left');
    const levelSelect = document.querySelector('#level-select');
    /*let bombAmmount = 20
    console.log(grid);*/
    const levels = {
        easy: {cols: 9, rows: 9, mines: 10, cellsize: 40},
        intermediate: {cols:16, rows: 16, mines: 40, cellsize: 34},
        hard: {cols: 30, rows: 16, mines: 99, cellsize: 30} 
    };
    const order = ['easy', 'intermediate', 'hard'];
    let actualLevelKey = 'easy';
    let totalMines = 0;
    let flagsUsed = 0;
    let isGameOver = false;
    let squares = [];

    /*Inicializacion del juego*/
    function initGame(levelKey){
        actualLevelKey = levelKey;
        const {cols, rows, mines, cellsize} = levels[levelKey];

        totalMines = mines;
        flagsUsed = 0;
        isGameOver = false;

        if(levelSelect){
            levelSelect.value = levelKey;
        }
        /*Reiniciar el tablero*/
        grid.innerHTML = '';
        flagsLeft.textContent = totalMines - mines;

        /*Ajustar el tablero al al nivel actual*/
        
        grid.style.width = `${cols * cellsize}px`;
        grid.style.height = `${rows * cellsize}px`;
        grid.style.display = `flex`;
        grid.style.flexWrap = `wrap`;

        /*Crear casillas*/
        createBoard(cols,rows,cellsize);
        createMines(cols * rows, totalMines, squares);

    }
    /*Creando el tablero*/
    function createBoard(cols, rows, cellsize){

        for(let i = 0; i < cols * rows; i++){
            const square = document.createElement('div')
            square.classList.add('square');
            square.id = i;
            square.style.width = `${cellsize}px`;
            square.style.height = `${cellsize}px`;
            square.style.lineHeight = `${cellsize -2}px`;

            /*Usar click derecho para poner o quitar banderas*/
            square.addEventListener('contextmenu', function(e){
                e.preventDefault();
                toggleFlag(square);
            });
            grid.appendChild(square);
            squares.push(square);

            /*Usar click izquierdo para mostrar las casillas*/

        }
    }

    /*Funcion para generar las minas de manera aleatoria*/
    function createMines(totalSquares, minesCount, boardSquares){
        const minesCnt = Math.min(minesCount,totalSquares); /*No puede haber mas minas que casillas*/
        const minePosition = new Set();

        while(minePosition.size < minesCnt){
            const randomIndex = Math.floor(Math.random()*totalSquares);
            minePosition.add(randomIndex);
        }
        minePosition.forEach((index) =>{
            boardSquares[index].classList.add('mines');
        });
    }



    /*Funcion para marcar/ quitar las banderas de las casillas*/
    function toggleFlag(square){
        if(isGameOver || square.classList.contains('checked')) return;
        if(!square.classList.contains('flag')){
            if(flagsUsed >= totalMines) return;
            square.classList.add('flag');
            square.textContent = '🚩';
            flagsUsed++;
        }else{
            square.classList.remove('flag');
            square.textContent = '';
            flagsUsed--;
        }
        flagsLeft.textContent = totalMines-flagsUsed
    }
    
    if(levelSelect){
        levelSelect.addEventListener('change', (e) =>{
            initGame(e.target.value);
        });
    }

    /*Cuando el jugador gane el nivel, podemos pasar al siguiente*/
    function advanceLevel(){
        const idx = order.indexOf(actualLevelKey);
        if(idx !== -1 && idx < order.length -1){
             initGame(order[idx + 1]);
            }
        }
    
    initGame(actualLevelKey);
});