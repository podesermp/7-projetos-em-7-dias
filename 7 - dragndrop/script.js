// document.querySelector('.neutralArea').addEventListener('click', (e) => {
//     // console.log('Target', e.target)
//     // console.log('current target', e.currentTarget)
// })

//data initial
let areas = {
    a: null,
    b: null,
    c: null
}


//events
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragstart)
    item.addEventListener('dragend', dragend)
})

document.querySelectorAll('.area').forEach(item => {
    item.addEventListener('dragover', dragover);
    item.addEventListener('dragleave', dragleave);
    item.addEventListener('drop', drop);
})

document.querySelector('.neutralArea').addEventListener('dragover', dragoverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragleaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);



//functions Item
function dragstart(e) {
    e.currentTarget.classList.add('dragging')
}

function dragend(e) {
    e.currentTarget.classList.remove('dragging')
}




//functions Area
function dragover(e) {
    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault(); //libera o drop - o comportamento padrão é não permitir o drop
        e.currentTarget.classList.add('hover')
    }
}

function dragleave(e) {
    e.currentTarget.classList.remove('hover')
}

function drop(e) {
    e.currentTarget.classList.remove('hover')

    let dragItem = document.querySelector('.item.dragging')

    if (e.currentTarget.querySelector('.item') === null) {
        e.currentTarget.appendChild(dragItem);
        updateAreas()
    }
}


//functions Neutral Area
function dragoverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragleaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging')
    e.currentTarget.appendChild(dragItem);
    updateAreas()
}

// logic functions
function updateAreas(e) {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');
        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    })
    if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct')
    } else {
        document.querySelector('.areas').classList.remove('correct')
    }
}