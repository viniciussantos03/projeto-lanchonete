// abrir menu


const menu = document.querySelector('#menu')
const menuToggle = document.querySelector('#menu-toggle')
const overlay = document.querySelector('#menu-overlay')
const menuLinks = document.querySelectorAll('#menu a')

const contadorMenu = document.querySelector('#menu-toggle .contador')

function menuAberto() {
    menu.classList.toggle('is-open')
    overlay.classList.toggle('is-open')

    if(menu.classList.contains('is-open')) {
        menuToggle.setAttribute('aria-expanded', 'true')
    } else {
        menuToggle.setAttribute('aria-expanded', 'false')
    }

    if (menu.classList.contains('is-open')) {
        contadorMenu.classList.remove('click')
    } else if (Number(contadorMenu.textContent) > 0) {
        contadorMenu.classList.add('click')
    }
}

function fecharMenu() {
    menu.classList.remove('is-open')
    overlay.classList.remove('is-open')
    menuToggle.setAttribute('aria-expanded', 'false')

    if (Number(contadorMenu.dataset.count) > 0) {
        contadorMenu.classList.add('click')
    }
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
        fecharPedidos()
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

// Carrossel

const hero = document.querySelector('.hero')

const slides = document.querySelectorAll('.carrossel__slide')
const carrosselSetaDireita = document.querySelector('#carrossel-next')
const carrosselSetaEsquerda = document.querySelector('#carrossel-prev')
const carrosselTrilho = document.querySelector('#carrossel-trilho')

let indice = 0

let animando = false

function imagemSeguinte() {
    if(animando === true) {
        return
    }

    animando = true

    if(indice >= 0 && indice < slides.length - 1) {
        indice++
        carrosselTrilho.style.setProperty('--indice', indice)
    } else if (indice === slides.length - 1) {
        indice = 0
        carrosselTrilho.style.setProperty('--indice', indice)
    }

}

function imagemAnterior() {
    if(animando === true) {
        return
    }

    animando = true

    if(indice > 0 && indice < slides.length) {
        indice--
        carrosselTrilho.style.setProperty('--indice', indice)
    } else if(indice === 0) {
        indice = slides.length - 1
        carrosselTrilho.style.setProperty('--indice', indice)
    }
}

if(carrosselSetaDireita){
    carrosselSetaDireita.addEventListener('click', () => {
        imagemSeguinte()
    })
}

if(carrosselTrilho){
    carrosselTrilho.addEventListener('transitionend', (e) => {
        if (e.target === carrosselTrilho && e.propertyName === 'transform') {
            animando = false
        }
    })
}

if(hero) {
    hero.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowRight') {
            imagemSeguinte()
        } 
        if(e.key === 'ArrowLeft') {
            imagemAnterior()
        }
    })
}

if(carrosselSetaEsquerda) {
carrosselSetaEsquerda.addEventListener('click', () => {
    imagemAnterior()
})
}

// Área de pedidos

const abrirCarrinho = document.querySelector('#carrinho-abrir')
const carrinho = document.querySelector('#carrinho')

const fecharCarrinho = document.querySelector('#carrinho-fechar')


function abrirPedidos() {
    fecharMenu()
    carrinho.classList.add('is-open')
    document.body.style.overflow = 'hidden'
}

function fecharPedidos() {
    carrinho.classList.remove('is-open')
    document.body.style.overflow = ''
}

abrirCarrinho.addEventListener('click', () => {
    abrirPedidos()
})

fecharCarrinho.addEventListener('click', () => {
    fecharPedidos()
})

// cardapio 

const cardapioTitulo = document.querySelector('.cardapio__titulo')
const botoesSecoes = document.querySelector('.cardapio__botoes')
const botoes = document.querySelectorAll('.cardapio__botoes button')
const hamburgueres = document.querySelector('#cat-hamburgueres')
const bebidas = document.querySelector('#cat-bebidas')
const combos = document.querySelector('#cat-combos')
const acompanhamentos = document.querySelector('#cat-acompanhamentos')

function categorias(btn) {
    if(btn === botoes[0]) {
        hamburgueres.classList.add('is-open')
        cardapioTitulo.textContent = 'Hambúrgueres'
    } else {
        hamburgueres.classList.remove('is-open')
    }

    if(btn === botoes[1]) {
        bebidas.classList.add('is-open')
        cardapioTitulo.textContent = 'Bebidas'
    } else {
        bebidas.classList.remove('is-open')
    }

    if(btn === botoes[2]) {
        combos.classList.add('is-open')
        cardapioTitulo.textContent = 'Combos'
    } else {
        combos.classList.remove('is-open')
    }

    if(btn === botoes[3]) {
        acompanhamentos.classList.add('is-open')
        cardapioTitulo.textContent = 'Acompanhamentos'
    } else {
        acompanhamentos.classList.remove('is-open')
    }
     botoesSecoes.classList.add('click')
}

botoes.forEach((botao) => {
    botao.addEventListener('click', (e) => {
        botoes.forEach((b) => {
            b.setAttribute('aria-expanded', String(b === botao))
        })
        categorias(e.currentTarget)
    })
})

//adicionar no carrinho

const boataoAdicionarRemover = document.querySelectorAll('.cardapio__qtd-btn')

const carrinhoLista = document.querySelector('#carrinho-lista')

const carrinhoVazio  = document.querySelector('#carrinho-vazio')


boataoAdicionarRemover.forEach((btn) => {
    btn.addEventListener('click', () => {

        carrinhoVazio.textContent = ''

        const item = btn.closest('.cardapio__item')

        if(btn.getAttribute('data-acao') === 'adicionar') {
            adicionarPedido(item, btn)
        }

        const quantidade = item.querySelector('.cardapio__qtd-num')

        if(btn.getAttribute('data-acao') === 'remover' && Number(quantidade.textContent) >= 1) {
            removerPedido(item, btn)
        }
})})

carrinhoLista.addEventListener('click', (evento) => {
    const btn = evento.target.closest('.cardapio__qtd-btn')

    if(!btn) return

    const item = btn.closest('.cardapio__item')
    const quantidade = item.querySelector('.cardapio__qtd-num')

        if(btn.getAttribute('data-acao') === 'adicionar') {
            adicionarPedido(item, btn)
        }

        if(btn.getAttribute('data-acao') === 'remover' && Number(quantidade.textContent) >= 1) {
            removerPedido(item, btn)
        }
})

function adicionarPedido(item) {

        const quantidade = item.querySelector('.cardapio__qtd-num')
        const btnRemover = item.querySelector('[data-acao="remover"]')
        const contador = document.querySelectorAll('.contador')

        quantidade.textContent = Number(quantidade.textContent) + 1

        if(Number(quantidade.textContent)) {
            btnRemover.disabled = false

        contador.forEach((event) => {
            let total = Number(event.dataset.count || 0)

            total++


            event.dataset.count = total
            event.textContent = total >= 100 ? '99+' : total

            event.classList.toggle('click', total > 0)

        })}

            // jogar no carrinho

            const itemCopia = item.cloneNode(true)
            const nome = itemCopia.querySelector('.cardapio__nome').textContent
            
            const produtoExistente = [...carrinhoLista.querySelectorAll('.cardapio__item')].find(produto => produto.querySelector('.cardapio__nome').textContent === nome)

            const produtoCardapio = [...document.querySelectorAll('.cardapio__item')]
            .find(produto => produto.querySelector('.cardapio__nome').textContent === nome)

            if(produtoExistente) {
                const produtoQuantidade = produtoExistente.querySelector('.cardapio__qtd-num')

                produtoQuantidade.textContent = quantidade.textContent

                produtoCardapio.querySelector('.cardapio__qtd-num').textContent = quantidade.textContent
            } else {
                carrinhoLista.appendChild(itemCopia)
            }

            verificarProdutos(quantidade, nome)
}

function removerPedido(item) {
        const quantidade = item.querySelector('.cardapio__qtd-num')
        const btnRemover = item.querySelector('[data-acao="remover"]')
        const contador = document.querySelectorAll('.contador')

        quantidade.textContent = Number(quantidade.textContent) - 1

            if(Number(quantidade.textContent) <= 0) {
                btnRemover.disabled = true
            }

            contador.forEach((event) => {
                let total = Number(event.dataset.count || 0)

                total--

                event.dataset.count = total
                event.textContent = total >= 100 ? '99+' : total

                event.classList.toggle('click', total > 0)
            })

            const nome = item.querySelector('.cardapio__nome').textContent
            
            const produtoExistente = [...carrinhoLista.querySelectorAll('.cardapio__item')].find(produto => produto.querySelector('.cardapio__nome').textContent === nome)

            const produtoCardapio = [...document.querySelectorAll('.cardapio__item')]
            .find(produto => produto.querySelector('.cardapio__nome').textContent === nome)

            if(produtoExistente) {
                const produtoQuantidade = produtoExistente.querySelector('.cardapio__qtd-num')

                produtoQuantidade.textContent = quantidade.textContent

                produtoCardapio.querySelector('.cardapio__qtd-num').textContent = quantidade.textContent

                if(Number(quantidade.textContent) <= 0) {
                    produtoExistente.remove()
            }
            }

            if(carrinhoLista.children.length === 0) {
                carrinhoVazio.textContent = 'Seu pedido está vazio. Que tal dar uma olhada no cardápio?'
            }

            verificarProdutos(quantidade, nome)
}


function verificarProdutos(quantidade, nome) {

    localStorage.setItem(nome, Number(quantidade.textContent));
}

function proudtosSalvos(item, nome) {
    const quantidadeSalva = localStorage.getItem(nome)
    const quantidade = item.querySelector('.cardapio__qtd-num')
    const contador = document.querySelectorAll('.contador')

    if(quantidadeSalva !== null) {
        quantidade.textContent = quantidadeSalva
    } else {
        quantidade.textContent = '0'
    }

    if(Number(quantidade.textContent) > 0) {
        carrinhoVazio.textContent = ''

        const itemCopia = item.cloneNode(true)
        const quantidadeCopia = itemCopia.querySelector('.cardapio__qtd-num')

        const btnRemover = itemCopia.querySelector('[data-acao="remover"]')

        quantidadeCopia.textContent = quantidadeSalva
        btnRemover.disabled = false

        carrinhoLista.appendChild(itemCopia)
    }

    contador.forEach((event) => {
        let total = Number(event.dataset.count || 0)

        total += Number(quantidade.textContent)

        event.dataset.count = total
        event.textContent = total >= 100 ? '99+' : total

        event.classList.toggle('click', total > 0)
})



}

document.addEventListener('DOMContentLoaded', () => {
  const itens = document.querySelectorAll('.cardapio__categoria .cardapio__item')

  itens.forEach((item) => {
    const quantidade = item.querySelector('.cardapio__qtd-num')

    const btnRemover = item.querySelector('[data-acao="remover"]')

    const nome = item.querySelector('.cardapio__nome').textContent

    proudtosSalvos(item, nome)

    if(Number(quantidade.textContent) >= 1) {
        btnRemover.disabled = false
    } else {
        btnRemover.disabled = true
    }
  })
})

const contadores = document.querySelectorAll('.contador')
const paginaIndex = !document.querySelector('.cardapio__categoria')

let totalSalvo = 0
if(paginaIndex){
for (let i = 0; i < localStorage.length; i++) {

    const chave = localStorage.key(i)

    if (chave !== 'tema') {
        totalSalvo += Number(localStorage.getItem(chave)) || 0
    }
}

contadores.forEach((contador) => {
    contador.dataset.count = totalSalvo
    contador.textContent = totalSalvo >= 100 ? '99+' : totalSalvo
    contador.classList.toggle('click', totalSalvo > 0)
})}


async function restaurarIndex() {
    if (!paginaIndex) return

    const resposta = await fetch('cardapio.html')
    const html = await resposta.text()
    const documento = new DOMParser().parseFromString(html, 'text/html')

    const itens = documento.querySelectorAll(
        '.cardapio__categoria .cardapio__item'
    )

    let totalSalvo = 0

    itens.forEach((item) => {
        const nome = item.querySelector('.cardapio__nome').textContent.trim()
        const quantidadeSalva = Number(localStorage.getItem(nome)) || 0

        totalSalvo += quantidadeSalva

        if (quantidadeSalva > 0) {
            const copia = item.cloneNode(true)
            const quantidade = copia.querySelector('.cardapio__qtd-num')
            const btnRemover = copia.querySelector('[data-acao="remover"]')

            quantidade.textContent = quantidadeSalva
            btnRemover.disabled = false

            carrinhoVazio.textContent = ''
            carrinhoLista.appendChild(copia)
        }
    })

    contadores.forEach((contador) => {
        contador.dataset.count = totalSalvo
        contador.textContent = totalSalvo >= 100 ? '99+' : totalSalvo
        contador.classList.toggle('click', totalSalvo > 0)
    })
}

restaurarIndex()