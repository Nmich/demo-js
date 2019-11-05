'use strict'

const dataUrl = './statements.json'

//cibler l'élément que l'on va modifier
const statementContainer = document.querySelector('.hero-body .container')

//récupération des données
function fetchJSON(url) {
    return fetch(url)
        .then(function (resp) {
            return resp.json()
        })
        .catch(function (err) {
            throw err
        })
}

// fonction qui prend comme argumnent le nom, la classe et le text
// pour créer des éléments html
function createTag(tagName, className, text,image) {
    const tag = document.createElement(tagName)
    tag.className = className
    tag.textContent = text
    tag.image = image
    return tag
}

function createTitle(title) {
    return createTag('h2', 'new-title title', title)
}

function createSubTitle(subtitle) {
    return createTag('h3', 'new-subtitle subtitle', subtitle)
}

function createText(content) {
    return createTag('p', '', content)
}

function createArticle(contentArticle) {

    const {
        title,
        subtitle,
        content
    } = contentArticle

    const titleTag = createTitle(title)
    const subtitleTag = createSubTitle(subtitle)
    const contentTag = createText(content)

    const articleTag = document.createElement('article')
    articleTag.className = 'box'
    articleTag.append(titleTag, subtitleTag, contentTag)

    return articleTag
}


function createDiv(statements) {
    const newDiv = document.createElement('div')
    newDiv.className = 'new-div'

    statements.forEach(function (statement) {
        const article = createArticle(statement)
        newDiv.append(article)
    })
    return newDiv
}


const items = [
    '1-25',
    '26-50',
    '51-75',
    '76-100',
    '101-125',
    '126-150'
]

document.addEventListener("DOMContentLoaded", () => {
    //récupération des données
    fetchJSON(dataUrl)
        .then(function (statements) {

            const navbarEnd = document.getElementById('navbar-end')

            //ecouter les évènemzents au click
            navbarEnd.addEventListener('click', event => {
                // variable qui prend comme argument le début et la fin d'un tableau
                // .split('-') recupère le texte dans l'item qui est clické
                const [start, end] = event.target.textContent.split('-')
                //créer un nouveau tableau virtuel avec slice()
                const part = statements.slice(+start - 1, +end)
                const newDiv = createDiv(part)

                statementContainer.firstElementChild.replaceWith(newDiv)
            })

            //pour chaque items,
            items.forEach(item => {
                //creer un <a>
                const navbarItem = document.createElement('a')
                //ajouter la class
                navbarItem.className = 'navbar-item num'
                //mettre le texte dans le <a> 
                navbarItem.textContent = item
                //ajoute les <a> en fin de balise
                navbarEnd.appendChild(navbarItem)
            })

        })
        .catch(function (e) {
            console.error(e)
        })

})