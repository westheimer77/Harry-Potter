import { data } from "./data.js";
const content = document.querySelector('.HP__cards')
const input = document.querySelector('.HP__input')
const select = document.querySelector('.HP__select')
const database = data;
let filterSelectArr = database;



const render = (arr) =>{
    content.innerHTML = ""
    arr.forEach((e) => {
        const article = document.createElement('article')
        article.className = 'HP__card'
        article.innerHTML = `
            <img class="HP__img" src="${e.image}" alt="">
                <div class="HP__cardContent">
                    <p class="HP__name">${e.name}</p>
                    <p class="HP__cardText">Actor: ${e.actor}</p>
                    <p class="HP__cardText">Gender: ${e.gender}</p>
                    <p class="HP__cardText">House: ${(e.house == "") ? 'Free' : e.house}</p>
                    <p class="HP__cardText">Wand core: ${e.wand.core}</p>
                    <p class="HP__cardText">Alive: ${(e.alive) ? "Yes" : "No"}</p>
                </div>`
        content.append(article)
    })
}

render(database)

function inputHandler(){
    const value = input.value
    const filterArr = filterSelectArr.filter((e)  => e.name.toLowerCase().includes(value.toLowerCase().trim()) || e.actor.toLowerCase().includes(value.toLowerCase().trim()))
    render(filterArr)
}

function selectHandler(){
    const value = select.value
    if (value == 'Free') {
        const filterArr = database.filter((e) => e.house === "")
        render(filterArr)
        filterSelectArr = filterArr
    } else if (value == 'All') {
        render(database)
    } else {
        const filterArr = database.filter((e) => e.house.toLowerCase().includes(value.toLowerCase()))
        render(filterArr)
        filterSelectArr = filterArr

    }
}

input.addEventListener('input', inputHandler)
select.addEventListener('change', selectHandler)