const tema = localStorage.getItem('tema')

if (tema === 'dark') {
    document.body.classList.add('dark')
}
// const voltar 

const finalizarVoltar = document.querySelector('.finalizar__voltar')

finalizarVoltar.addEventListener('click', () => {
    window.location.href = 'index.html'
})
// pedidos e valor

let temProdutos = false

let produtosMensagem = ''

for (let i = 0; i < localStorage.length; i++) {
    const nome = localStorage.key(i)

    if (nome === 'tema' || nome === 'totalCarrinho') {
        continue
    }

    const quantidadeSalva = Number(localStorage.getItem(nome))

    // mostrar produtos

    if(quantidadeSalva > 0) {

    temProdutos = true

    produtosMensagem += `${nome} x${quantidadeSalva}\n`

    const finalizarLista = document.querySelector('#finalizar-lista')

    const elementoLi = document.createElement('li')

    elementoLi.textContent = `${nome} ${quantidadeSalva}`
    finalizarLista.appendChild(elementoLi)
    }
}

// Verificar se existe pedido

    const finalizarVazio = document.querySelector('#finalizar-vazio')
    const finalizarTitulo = document.querySelector('.finalizar__titulo')
    const finalizarBlocos = document.querySelectorAll('.finalizar__bloco')

if (!temProdutos) {
    finalizarVazio.hidden = false
    finalizarTitulo.hidden = true

    finalizarBlocos.forEach(bloco => {
        bloco.hidden = true
    })
}

// total

const totalCarrinho = localStorage.getItem('totalCarrinho') 

const finalizarTotal = document.querySelector('#finalizar-total')

finalizarTotal.textContent = totalCarrinho

// finalizar

const finalizarform = document.querySelector('#finalizar-form')

finalizarform.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const dados = finalizarform.elements

    const nome = dados.nome.value
    const rua = dados.rua.value
    const numero = dados.numero.value
    const bairro = dados.bairro.value
    const referencia = dados.referencia.value

    const mensagem = `Novo pedido - Brasa Burger

    Olá! Meu nome é ${nome}.
    Moro na rua ${rua}, número ${numero}, bairro ${bairro}.
    ${referencia ? `Referência: ${referencia}` : ''}

    Produtos:
    ${produtosMensagem}
    Total: R$ ${totalCarrinho}
    `

    const mensagemCodificada = encodeURIComponent(mensagem)
    const linkWhatsApp = `https://wa.me/38999999999?text=${mensagemCodificada}`

    window.open(linkWhatsApp, '_blank')
})