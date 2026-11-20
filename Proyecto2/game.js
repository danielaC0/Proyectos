document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.grid')
    const flagsLeft = document.querySelector('#flags-left')
    const width = 10
    let bombAmmount = 20
    console.log(grid);

    /*Creando el tablero*/
    function createBoard(){
        flagsLeft.innerHTML = bombAmmount

        for(let i = 0; i < width * width; i++){
            const square = document.createElement('div')
            square.id = i
            grid.appendChild(square)
        }
    }
    createBoard();
})