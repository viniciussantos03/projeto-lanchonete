const tema = localStorage.getItem('tema')

if (tema === 'dark') {
    document.body.classList.add('dark')
}
// const voltar 

const finalizarVoltar = document.querySelector('.finalizar__voltar')

finalizarVoltar.addEventListener('click', () => {
    history.back()
})