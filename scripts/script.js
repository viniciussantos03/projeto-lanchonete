// abrir menu

const menu = document.querySelector('#menu')
const menuToggle = document.querySelector('#menu-toggle')
const overlay = document.querySelector('#menu-overlay')

function menuAberto() {
    menu.classList.toggle('is-open')
    overlay.classList.toggle('is-open')

    if(menu.classList.contains('is-open')) {
        menuToggle.setAttribute('aria-expanded', 'true')
    } else {
        menuToggle.setAttribute('aria-expanded', 'false')
    }
}


menuToggle.addEventListener('click', () => {
    menuAberto()
})

// dark mode

const body = document.querySelector('body')
const temaToggle = document.querySelector('#theme-toggle')

function verificaTema() {
    if(body.classList.contains('dark')) {
        localStorage.setItem('tema', 'dark')
    } else {
        localStorage.setItem('tema', 'light')
    }
}

function temaSalvo() {
    const tema = localStorage.getItem('tema')

    if(tema === 'dark') {
        body.classList.add('dark')
    } else {
        body.classList.add('light')
    }
}

temaToggle.addEventListener('click', () => {
    body.classList.toggle('dark')

    verificaTema()
})

temaSalvo()