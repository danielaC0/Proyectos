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

    /*Inicializacion del juego*/
    function initGame(levelKey){
        actualLevelKey = levelKey;
        const {cols, rows, mines, cellsize} = levels[levelKey];

        if(levelSelect){
            levelSelect.value = levelKey;
        }
        /*Reiniciar el tablero*/
        grid.innerHTML = '';
        flagsLeft.textContent = mines;

        /*Ajustar el tablero al al nivel actual*/
        
        grid.style.width = `${cols * cellsize}px`;
        grid.style.height = `${rows * cellsize}px`;
        grid.style.display = `flex`;
        grid.style.flexWrap = `wrap`;

        /*Crear casillas*/
        createBoard(cols,rows,cellsize);

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
            grid.appendChild(square)
        }
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