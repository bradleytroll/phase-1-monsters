document.addEventListener('DOMContentLoaded', () => {
  

    let form = document.createElement('form');
    let input = document.createElement('input');
    input.placeholder = "Name"
    let input2 = document.createElement('input')
    input2.placeholder = "Age"
    let input3 = document.createElement('input')
    input3.placeholder = "Description"
    let btn = document.createElement('button');
    btn.textContent = 'Create Monster';
    btn.type = "submit";
    form.appendChild(input)
    form.appendChild(input2)
    form.appendChild(input3)
    form.appendChild(btn)

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch ('http://localhost:3000/monsters/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name:e.target.children[0].value,
                age:e.target.children[1].value,
                description:e.target.children[2].value
            })
        })
        .then(res => res.json())
        .then(monster => renderOneMonster(monster))
 
        // console.log(e.target.children[0].value)
        // console.log(e.target.children[1].value)
        // console.log(e.target.children[2].value)
        form.reset();
    });

    document.body.prepend(form);
    getAllMonsters();
});

function getAllMonsters(page) {
    const limit = 50;
  const url = `http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`;

  fetch(url)
    .then(res => res.json())
    .then(monsterData => {
      monsterData.forEach(monster => renderOneMonster(monster));
      if (monsterData.length === limit) {
        // If there are more monsters, create and append the "Load More" button
        createLoadMoreButton(page + 1);
      }
    });
}

function renderOneMonster(monster) {
    let card = document.createElement('div');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');

    p1.innerHTML = monster.name;
    p2.innerHTML = monster.age;
    p3.innerHTML = monster.description;

    card.append(p1);
    card.append(p2);
    card.append(p3);

    let parentCard = document.querySelector('#monster-container');
    parentCard.append(card);
}

function createLoadMoreButton(page) {
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.textContent = 'Load More';
    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.remove()
        getAllMonsters(page);
    });

    const parentCard = document.querySelector('#monster-container');
    parentCard.appendChild(loadMoreBtn)
}

