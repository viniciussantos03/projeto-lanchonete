// abrir menu

const menu = document.querySelector('#menu')
const menuToggle = document.querySelector('#menu-toggle')
const overlay = document.querySelector('#menu-overlay')
const menuLinks = document.querySelectorAll('#menu a')

function menuAberto() {
    menu.classList.toggle('is-open')
    overlay.classList.toggle('is-open')

    if(menu.classList.contains('is-open')) {
        menuToggle.setAttribute('aria-expanded', 'true')
    } else {
        menuToggle.setAttribute('aria-expanded', 'false')
    }
}

function fecharMenu() {
    menu.classList.remove('is-open')
    overlay.classList.remove('is-open')
    menuToggle.setAttribute('aria-expanded', 'false')
}

menuToggle.addEventListener('click', () => {
    menuAberto()
})

overlay.addEventListener('click', () => {
    fecharMenu()
})

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        fecharMenu()
    })
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        fecharMenu()
    }
})

// dark mode

const body = document.querySelector('body')
const temaToggle = document.querySelector('#theme-toggle')

function salvarTema() {
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
    }
}

temaToggle.addEventListener('click', () => {
    body.classList.toggle('dark')

    salvarTema()
})

temaSalvo()