//evento para monitorar as teclas que estão sendo tecladas
document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase());
})

//pegar o evento de click do button com a classe 'composer'
document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value; // isso é para pegar o input do array

    if (song != '') {
        let songArray = song.split(''); //split transforma uma string em array, como tem o '', cada letra vai ser um elemento do array 
        playComposition(songArray);
    }
})


function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`)

    if (audioElement) {
        audioElement.currentTime = 0; //reinicia o audio
        audioElement.play(); // da play no audio
    }

    if (keyElement) {
        keyElement.classList.add('active'); //adiciona a classe active
        setTimeout(() => {
            keyElement.classList.remove('active'); //remove a classe active
        }, 200)
    }
}

function playComposition(songArray) {
    let wait = 0;
    for (let songItem of songArray) {
        setTimeout(() => {
            playSound(`key${songItem}`)
        }, wait); //isso é so pra não rodar tudo de uma vez

        wait += 250;

    }
}