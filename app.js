document.addEventListener('DOMContentLoaded', () => {
    let battles = 0
    const battleDisplay = document.querySelector('#bats')
    const victoryBtn = document.querySelector('#done')
    const opsBtn = document.querySelector('#opps')
    const setBtn = document.querySelector('#set')
    const setterbox = document.querySelector('#setter')
    function newScore () {
        battleDisplay.innerHTML = battles
        if (battles <= 0){
            battleDisplay.innerHTML= 'Victory!'
        }
    }
    function setNewScore () {
        let noLetters = /\w\s/g;
        let onlyNumbers = /[0-9]/g
        let setterboxValue = setterbox.value
        if (noLetters.test(setterboxValue)) {
            battles = "NO LETTERS"
            newScore()
        } else if (onlyNumbers.test(setterboxValue)){
            battles = setterbox.value
            newScore()

        }
    }
    function addBattle () {
        battles++
        newScore()
    }
    function winBattle () {
        battles--
        if (battles <= -1){
            battles = 0
        }
        newScore()
    }
    setBtn.addEventListener('click', () => {
        setNewScore()
        console.log(setterbox.value)
    })
    opsBtn.addEventListener('click', () => {
        addBattle()
    })
    victoryBtn.addEventListener('click', () => {
        winBattle()
    })
})