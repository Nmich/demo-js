'use strict'

const dataURL = './statements.json'
//créer une div pour les énoncés

const statementContainer = document.querySelector('.hero-body .container')

// Récupération de données JSON
function fetchJSON(url) {
    return fetch(url)
        .then(function (resp) {
            return resp.json()
        })
        .catch(function (err) {
            throw err
        })
}

function createTag(tagName, className, text) {
    const tag = document.createElement(tagName)
    tag.className = className
    tag.textContent = text
    return tag
}

function createTitle (title) {
    return createTag('h2', 'new-title title', title)
}

function createArticle(contentArticle) {
    const {title, subtitle, content} = contentArticle

    const titleTag = createTitle(title)

    const subtitleTag = document.createElement('h3')
    subtitleTag.className = 'new-subtitle subtitle'
    subtitleTag.textContent = subtitle

    const contentTag = document.createElement('p')
    contentTag.className = ''
    contentTag.textContent = content

    const articleTag = document.createElement('article')
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
    //récupération des datas
    fetchJSON(dataURL)
        .then(function (statements) {
            //pour chaque item de items,
            const navbarEnd = document.getElementById('navbar-end')
            // Déléguer les événements 'click' des enfants a.nav-item.num vers le parent .navbar-end
            navbarEnd.addEventListener('click', event => {
                const [start, end] = event.target.textContent.split('-')
                const part = statements.slice(+start - 1, +end)
                const newDiv = createDiv(part)
                statementContainer.firstChild.replaceWith(newDiv)
            })
        
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