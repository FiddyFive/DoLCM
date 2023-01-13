// ==UserScript==
// @name         Degrees of Lewdity Cheat Menu
// @version      0.0.1
// @description  A cheat menu that can be injected into DoL and theoretically any DoL mod.
// @author       Fiddy
// @match        file:///*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==

var modal

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
}`



const closeMenu = () => {
    modal.setAttribute('style', "display: none")
}

(function () {
    'use strict';

    const style = document.createElement('style')
    style.textContent = styleTemplate
    document.head.appendChild(style)

    document.addEventListener('keypress', (e) => {
        if (e.key === 'c') modal.setAttribute('style', "display: block")
    })

    // Construct the close button
    const close = document.createElement('div')
    close.innerHTML = `<div style="text-align:right">
      <a>Close</a>
    </div>`
    close.addEventListener('click', closeMenu)

    // Construct cheat menu modal
    modal = document.createElement('div')
    modal.className = "modal"
    modal.setAttribute("style", "display: none")
    modal.innerHTML = modalTemplate
    const content = modal.children[0]
    content.prepend(close)
    document.body.appendChild(modal)

    // Insert Cheats!
    // Currently just a big long list. Will add tabs later if needed.
    var el

    el = document.createElement('h2')
    el.innerHTML = "Money and Needs"
    content.appendChild(el)

    // Money
    el = document.createElement('span')
    el.innerHTML = `
        Money (in cents):&nbsp;
        <input type="number" id="moneyVal" value="${SugarCube.State.active.variables.money}">
        <input type="button" value="Set" onclick="SugarCube.State.active.variables.money = parseInt(document.getElementById('moneyVal').value)">
        <input type="button" value="Refresh" onclick="document.getElementById('moneyVal').value = SugarCube.State.active.variables.money.toString()">
        `
    content.appendChild(el)

    el = document.createElement('h2')
    el.innerHTML = "Core Characteristics"
    content.appendChild(el)

    // Purity
    el = document.createElement('span')
    el.innerHTML = `
        Purity (0-1000):&nbsp;
        <input type="number" id="purityVal" value="${SugarCube.State.active.variables.purity}">
        <input type="button" value="Set" onclick="SugarCube.State.active.variables.purity = parseInt(document.getElementById('purityVal').value)">
        <input type="button" value="Refresh" onclick="document.getElementById('purityVal').value = SugarCube.State.active.variables.purity.toString()">
        `
    content.appendChild(el)

})();
