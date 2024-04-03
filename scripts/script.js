import { data } from "./data.js";
const content = document.querySelector('.HP__cards')
const input = document.querySelector('.HP__input')
const select = document.querySelector('.HP__select')
// const database = data;
// let filterSelectArr = database;
const API = "https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters"

async function getData(API){
    
    try{
        const res = await fetch(API)
        if (!res.ok){
            throw new Error(res.status);
        }
        return res.json();
    } catch (err){
        console.log(err);
    }
}

let database = getData(API)
let filterSelectArr = database;






const render = async (arr) =>{
    arr = await arr
    console.log(arr);
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

async function inputHandler(){
    filterSelectArr = await filterSelectArr
    const value = input.value
    const filterArr = filterSelectArr.filter((e)  => e.name.toLowerCase().includes(value.toLowerCase().trim()) || e.actor.toLowerCase().includes(value.toLowerCase().trim()))
    render(filterArr)
}

async function selectHandler(){
    database = await database
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