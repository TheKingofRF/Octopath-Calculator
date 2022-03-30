document.addEventListener('DOMContentLoaded', () => {
    let battles = 0
    const battleDisplay = document.querySelector('#bats')
    const victoryBtn = document.querySelector('#done')
    const opsBtn = document.querySelector('#opps')
    const setBtn = document.querySelector('#set')
    //const setterbox = document.querySelector('#setter')
    const batXp = document.querySelector('#expPerBat')
    const CurLvl = document.querySelector('#CurLvl')
    const goalLvl = document.querySelector('#goalLvl')
    const xpDisplay = document.querySelector('#XpleftStat')
    const CurLvlStat = document.querySelector('#CurLvlStat')
    const lvlDisplay = document.querySelector('#LvlsLeftstat')
    async function popLvls(){
        const requestURL = 'https://raw.githubusercontent.com/TheKingofRF/Octopath-Calculator/main/test.jsonc'
        const request = new Request(requestURL);
        const response = await fetch(request);
        const LvlList = await response.json();
        test(LvlList);
    }
    popLvls()
    function test (obj) {
        console.log(obj.data[0])
    }
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
        if (setterboxValue === "") {
            battles = "NO LETTERS"
            setterbox.value = ""
            newScore()
        } else if (onlyNumbers.test(setterboxValue)){
            battles = setterbox.value
            setterbox.value = ""
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