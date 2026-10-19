const tema = localStorage.getItem('tema')

if (tema === 'dark') {
    document.body.classList.add('dark')
}
// const voltar 

const finalizarVoltar = document.querySelector('.finalizar__voltar')

finalizarVoltar.addEventListener('click', () => {
    history.back()
})

// pedidos e valor

for (let i = 0; i < localStorage.length; i++) {
    const nome = localStorage.key(i)

    if (nome === 'tema' || nome === 'totalCarrinho') {
        continue
    }

    const quantidadeSalva = Number(localStorage.getItem(nome))

    // mostrar produtos

    if(quantidadeSalva > 0) {
    const finalizarLista = document.querySelector('#finalizar-lista')

    const elementoLi = document.createElement('li')

    elementoLi.textContent = `${nome} ${quantidadeSalva}`
    finalizarLista.appendChild(elementoLi)
    }
}

// total

const totalCarrinho = localStorage.getItem('totalCarrinho') 

const finalizarTotal = document.querySelector('#finalizar-total')

finalizarTotal.textContent = totalCarrinho
