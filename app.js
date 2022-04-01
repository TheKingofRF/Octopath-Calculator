document.addEventListener('DOMContentLoaded', () => {
    let lvlList;
    let battles = 0
    const victoryBtn = document.querySelector('#done')//button to win a battle
    const opsBtn = document.querySelector('#opps')// button to lose/ correct a double click
    const setBtn = document.querySelector('#set')// sets the values in place
    const resetBtn = document.querySelector('#reset')// reset button *it just reloads the page
    //const setterbox = document.querySelector('#setter')
    const batXp = document.querySelector('#expPerBat')//xp gained per battle input
    const curLvl = document.querySelector('#curLvl')// current level input
    const curXp = document.querySelector('#curXp') // current xp input not including xp from past levels
    const goalLvl = document.querySelector('#goalLvl') //cur goal lvl input
    const batsDone = document.querySelector('#batsdone') // battles counter display
    const battleDisplay = document.querySelector('#bats') // battles left to fight display
    const xpDisplay = document.querySelector('#XpleftStat') // xp left to gain display
    const XpLefNextDisplay = document.querySelector('#XplefNexttStat') // xp left tell next level display
    const curLvlDisplay = document.querySelector('#CurLvlStat') // current level stat display
    const lvlsLeftDisplay = document.querySelector('#LvlsLeftstat') // lvls left to earn display
    let totalGoalXp = 0 // json pull for the total xp you will have at the goal level
    let curXpTot = 0// json pull for the total xp you will have at the cur level not including current xp
    let xptoNextLvlCur = 0 //json pull for the xp needed for next level
    let prevLvlXptoNextLvl = 0 //json pull for the xp need to get to the current lvl from the last
    let xptoGoalLVL = 0 // math value for totalling the goal xp  - the cur xp
    let xpLefttoNextLVL= 0//math placeholder for the xp needed to go from current level to next
    let neglvl = false //error flag for running the calculator to low.
    async function popjson(lvl){ // this sends requests for the json and pulls the whole json
        const requestURL = 'https://raw.githubusercontent.com/TheKingofRF/Octopath-Calculator/main/levels.jsonc'
        const request = new Request(requestURL);
        const response = await fetch(request);
        lvlList = await response.json();
        poplvls(lvl);//calls the assignment function * this function could be added into popjson
    }
    function poplvls (lvl) { //function for populating the json data into usable variables
        if (lvl === '') {
            lvl = 2
        }
        let prevLvl = curLvl.value - 1 // math placeholder for calculating the previous lvl
        totalGoalXp = lvlList.level[lvl].totalXp
        curXpTot = lvlList.level[curLvl.value].totalXp
        xptoNextLvlCur = lvlList.level[curLvl.value].toNextLevel
        prevLvlXptoNextLvl = lvlList.level[prevLvl].toNextLevel
        newScore() //call to the main function that runs and writes the math and checks for level progress
    }
    function testForBadLVL () { // calculator will not work with 0 levels or lower
        if (curLvl.value <= 0){
            batXp.value = null// blanking out the input boxes
            curLvl.value = null
            curXp.value = null
            goalLvl.value = null
            battleDisplay.innerHTML = 'you' // throwing up an error message
            batsDone.innerHTML = 'can\'t'
            xpDisplay.innerHTML = 'do'
            XpLefNextDisplay.innerHTML = 'that'
            curLvlDisplay.innerHTML = 'dog'
            lvlsLeftDisplay.innerHTML = "!!!"
            neglvl = true //settting the error flag that will lock out math and control functions
            totalGoalXp = null // blanking out placeholders
            xptoNextLvlCur = null
            curXpTot = null
            xptoGoalLVL = null
            xpLefttoNextLVL = null
        }
        
    }
    function newScore () { // main function for changning the displays
        curLvlDisplay.innerHTML = curLvl.value // places input value into display
        lvlsLeftDisplay.innerHTML = goalLvl.value - curLvl.value //calculates the levels left
        xptoGoalLVL = totalGoalXp - (curXpTot + parseInt(curXp.value))
        xpDisplay.innerHTML = xptoGoalLVL // calculating and writing the remaining xp to reach the goal
        xpLefttoNextLVL = xptoNextLvlCur - parseInt(curXp.value)
        XpLefNextDisplay.innerHTML = xpLefttoNextLVL //calculating and writing the remaining xp 
        battles = Math.ceil(xptoGoalLVL / batXp.value)
        battleDisplay.innerHTML = battles
        testForBadLVL()
        if (xpLefttoNextLVL <= 0){
            curXp.value =  xpLefttoNextLVL * -1
            curLvl.value = parseInt(curLvl.value) + 1
            poplvls(goalLvl.value)
        }
        if (xpLefttoNextLVL > xptoNextLvlCur){
            curXp.value = prevLvlXptoNextLvl + parseInt(curXp.value)
            curLvl.value = parseInt(curLvl.value) - 1
            testForBadLVL()
            if(neglvl){
                poplvls(goalLvl.value)
            }
        }
        if (battles <= 0){// win condition
            battleDisplay.innerHTML= 'Victory!'
        }
        
    }
    function addBattle () { // function to increment the needed battles
        battles++
        batsDone.innerHTML++//counter
        curXp.value = parseInt(curXp.value) - parseInt(batXp.value ) //subtracts xp
        testForBadLVL() //test for negative levels that would break the calculator
        if(!neglvl){ // lock controls if error flagged
            poplvls(goalLvl.value)
        }
    }
    function winBattle () { // function to decrement the needed battles
        battles--
        if (battles <= -1){
            battles = 0
        }
        batsDone.innerHTML++//counter
        curXp.value = parseInt(curXp.value) + parseInt(batXp.value )// adds xp
        if(!neglvl){ // locks controls if error flagged
            poplvls(goalLvl.value)
        }
    }
    setBtn.addEventListener('click', () => { // button listeners
        //setNewScore()
        testForBadLVL()
        if(!neglvl){
            poplvls(goalLvl.value)
        }
    })
    opsBtn.addEventListener('click', () => {
        if (!neglvl){
            addBattle()
        }
    })
    victoryBtn.addEventListener('click', () => {
        if (!neglvl){
            winBattle()
        }
    })
    resetBtn.addEventListener('click', () => {
        location.reload()
    })
    popjson(2)
})