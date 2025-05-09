// ==UserScript==
// @name         Degrees of Lewdity Cheat Menu
// @version      0.0.1
// @description  A cheat menu that can be injected into DoL and theoretically any DoL mod.
// @author       Fiddy
// @match        file:///*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==

const modalTemplate = `
  <div class="modal-content">
    <h1>Backup your save before using this!</h1>
    <p>Don't come crying to me if this corrupts your save (but please do report it if you find a bug)</p>
</div>`

const styleTemplate = `
.modal {
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(222,0,0);
    background-color: rgba(2,0,0,0.5);
}

.modal-content {
    background-color: var(--850);
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 960px;
    position:relative;
}

.tabs {
    display:grid;
    grid-template-columns: auto auto auto auto auto auto;
}
`

const closeMenu = () => {
    modal.setAttribute('style', "display: none")
}

const style = document.createElement('style')
style.textContent = styleTemplate
document.head.appendChild(style)

document.addEventListener('keypress', (e) => {
    if (e.key === '`') modal.setAttribute('style', "display: block")
})

// Construct the close button
const close = document.createElement('div')
close.innerHTML = `<div style="text-align:right">
    <a>Close</a>
</div>`
close.addEventListener('click', closeMenu)

// Construct cheat menu modal
const modal = document.createElement('div')
modal.className = "modal"
modal.setAttribute("style", "display: none")
modal.innerHTML = modalTemplate
const content = modal.children[0]
content.prepend(close)

function numberVar(title, id, internalVar) {
    return `
    <span>
        ${title}&nbsp;
        <input type="number" id="${id}">
        <input type="button" value="Set" onclick="SugarCube.State.active.variables.${internalVar} = parseInt(document.getElementById('${id}').value)">
        <input type="button" value="Refresh" onclick="document.getElementById('${id}').value = SugarCube.State.active.variables.${internalVar}.toString()">
        <br>
    </span>`
}

function enumVar(title, strvalarr) {
    return `
    <span>
        ${title}&nbsp;
        ${strvalarr.reduce((accumulator, strval) => accumulator + `<input type="button" value="${strval[0]}" onclick="SugarCube.State.variables.player.penissize = ${strval[1]}">`, "")}
        <br>
    </span>
    `
}

// Insert Cheats!
const characteristics = `
    <h2>Core Characteristics</h2>
    ${numberVar("Purity (0-1000):", "purityVal", "purity")}
    ${numberVar("Beauty (0-10000):", "beautyVal", "beauty")}
    ${numberVar("Physique (0-20000):", "physVal", "physique")}
    ${numberVar("Willpower (0-1000):", "willVal", "willpower")}
    ${numberVar("Awareness (0-????):", "lewdVal", "awareness")}
    ${numberVar("Promiscuity (0-????):", "whoreVal", "promiscuity")}
    ${numberVar("Exhibitionism (0-100):", "exhibVal", "exhibitionism")}
    ${numberVar("Deviancy (0-100):", "deviantVal", "deviancy")}
    <h2>Body</h2>
    ${enumVar("Penis Size", [
        ["Micro",-2],
        ["Mini",-1],
        ["Tiny",0],
        ["Small",1],
        ["Normal",2],
        ["Large",3],
        ["Enormous",4]
    ])}
    `

const needs = `
    <h2>Money and Needs</h2>
    ${numberVar("Money (in cents):", "moneyVal", "money")}
    `

const social = `
    <h2>Fame</h2>
    ${numberVar("Bestiality:", "beastFameVal", "fame.bestiality")}
    ${numberVar("Business:", "cafeFameVal", "fame.business")}
    ${numberVar("Combat:", "combatFameVal", "fame.scrap")}
    ${numberVar("Exhibitionism:", "exhibFameVal", "fame.exhibitionism")}
    ${numberVar("Kindness:", "kindFameVal", "fame.good")}
    ${numberVar("?impreg?:", "impregFameVal", "fame.impreg")}
    ${numberVar("Modelling:", "modelFameVal", "fame.model")}
    ${numberVar("?pimp?:", "pimpFameVal", "fame.pimp")}
    ${numberVar("Pregnancy:", "pregFameVal", "fame.pregnancy")}
    ${numberVar("Prostitution:", "whoreFameVal", "fame.prostitution")}
    ${numberVar("Rape:", "rapeFameVal", "fame.rape")}
    ${numberVar("Sex:", "sexFameVal", "fame.sex")}
    ${numberVar("Socialite:", "socialFameVal", "fame.social")}
    <h2>School</h2>
    ${numberVar("Delinquency (0-1000):", "delinquencyVal", "delinquency")}
    ${numberVar("Detention (0-1000):", "detentionVal", "detention")}
    `

// Construct the tab bar
const tabs = document.createElement('div')
tabs.setAttribute("class", "tabs")

const tablist = [
    ["Characteristics", characteristics],
    ["Needs", needs],
    ["Social",social]
]
tablist.forEach(element => {
    const tab = document.createElement('input')
    tab.setAttribute("value", element[0])
    tab.addEventListener("click", () => {tabContents.innerHTML = element[1]})
    tab.setAttribute("type", "button")
    tabs.appendChild(tab)
});
content.appendChild(tabs)

document.body.appendChild(modal)

// Construct a container for our tab contents
const tabContents = document.createElement('div')
content.appendChild(tabContents)


