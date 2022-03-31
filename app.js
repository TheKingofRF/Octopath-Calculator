document.addEventListener('DOMContentLoaded', () => {
    let battles = 0
    const victoryBtn = document.querySelector('#done')//button to win a battle
    const opsBtn = document.querySelector('#opps')// button to lose/ correct a double click
    const setBtn = document.querySelector('#set')// sets the values in place
    //const setterbox = document.querySelector('#setter')
    const batXp = document.querySelector('#expPerBat')//xp gained per battle input
    const curLvl = document.querySelector('#curLvl')// cur lvl input
    const curXp = document.querySelector('#curXp') // cur xp input not including xp from past lvls
    const goalLvl = document.querySelector('#goalLvl') //cur goal lvl input
    const battleDisplay = document.querySelector('#bats') // bats left to fight display
    const xpDisplay = document.querySelector('#XpleftStat') // xp left to gain display
    const curLvlStat = document.querySelector('#CurLvlStat') // cur lvl stat display
    const lvlDisplay = document.querySelector('#LvlsLeftstat') // lvls left to ear display
    const batsDone = document.querySelector('#batsdone') // battle counter display
    let totalGoalXp = 0 // json pull for the total xp you will have at the goal lvl
    let xptoNextLvlCur = 0 //  xp for need for next level
    let curXpTot = 0// json pull for the total xp you will have at the cur level not including current xp
    let xptoNextLvl = 0 // math value for totalling the goal xp  - the cur xp
    async function popjson(lvl){ // this sends requests for the json and pulls the whole json 
        const requestURL = 'https://raw.githubusercontent.com/TheKingofRF/Octopath-Calculator/main/levels.jsonc'
        const request = new Request(requestURL);
        const response = await fetch(request);
        const LvlList = await response.json();
        poplvls(LvlList, lvl);//calls the assignment function * this function could be added into popjson
    }
    function poplvls (obj, lvl) {
        totalGoalXp = obj.level[lvl].totalXp
        curXpTot = obj.level[curLvl.value].totalXp
        xptoNextLvlCur = obj.level[curLvl.value].toNextLevel
        console.log(xptoNextLvlCur)
        //console.log(lvl)
        newScore() // assigns  goal and cur xp values and calls the main score function.
    }
    function newScore () { // main function for changning the displays 
        curLvlStat.innerHTML = curLvl.value
        lvlDisplay.innerHTML = goalLvl.value - curLvl.value
        xptoNextLvl = totalGoalXp - (curXpTot + parseInt(curXp.value))
        xpDisplay.innerHTML = xptoNextLvl
        battles = Math.ceil(xptoNextLvl / batXp.value)
        battleDisplay.innerHTML = battles
        if ((curXpTot + parseInt(curXp.value) < curXpTot) {
            curXp.value = (parseInt(curXp.value)) 
        }
        if (battles <= 0){// win condition
            battleDisplay.innerHTML= 'Victory!'
        }

    }
    function badValueTest (obj) {// good value test not currently implemented
        let setterboxValue = obj.value
        if (setterboxValue === "") {
            return false
        }else if (!setterboxValue === "") {
            return true
        }
    }
    function addBattle () { // function to increment the needed battles
        battles++
        batsDone.innerHTML++
        curXp.value = parseInt(curXp.value) - parseInt(batXp.value )
        popjson(goalLvl.value)
    }
    function winBattle () {
        battles--
        if (battles <= -1){
            battles = 0
        }
        batsDone.innerHTML++
        curXp.value = parseInt(curXp.value) + parseInt(batXp.value )
        popjson(goalLvl.value)
    }
    setBtn.addEventListener('click', () => {
        //setNewScore()
        popjson(goalLvl.value)
        newScore()
    })
    opsBtn.addEventListener('click', () => {
        addBattle()
    })
    victoryBtn.addEventListener('click', () => {
        winBattle()
    })
})