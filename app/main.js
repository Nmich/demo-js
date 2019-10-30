'use strict'

const datas = '../data/statements.json';
//créer une div pour les énoncés
const currentDiv = document.getElementById('current-div');
let newArticle = document.createElement('article');
let newDiv = document.createElement('div');
newDiv.className = 'new-div';

function createArticle(contentArticle) {

    const {title, subtitle, content} = contentArticle 
    const newTitle = document.createElement('h2');
    newTitle.className = 'new-title title';
    const newSubtitle = document.createElement('p')
    newSubtitle.className = 'new-subtitle subtitle';
    const newText = document.createElement('p');
    newText.className = '';
    newTitle.textContent = title;
    newSubtitle.textContent = subtitle;
    newText.textContent = content;
    newArticle.append(newTitle, newSubtitle, newText);

    return newArticle;
}

function createDiv(statements) {
    statements.forEach(function (statement) {
        const article = createArticle(statement);
        newDiv.append(article);
    });
    return newDiv;
}

//récupération des datas
function fetchJSON(u) {
    return fetch(u)
        .then(function (resp) {
            return resp.json();
        })
        .catch(function (err) {
            throw err;
        });
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
    fetchJSON(datas)
        .then(function (statements) {
            
            //pour chaque items,
            const navbarEnd = document.getElementById('navbar-end');
            items.forEach(item => {
                //creer un <a>
                const navbarItem = document.createElement('a');
                //ajouter la class
                navbarItem.className = 'navbar-item num';
                //mettre le texte dans le <a> 
                navbarItem.textContent = item;
                //ajoute les <a> en fin de balise
                navbarEnd.appendChild(navbarItem);
                // console.log(navbarItem)
                //ecouter l'evenement au click des a.nav-item.num
                
                //declarer une variable qui est = à newDiv 
                //pour eviter la création d'un nouveau
                navbarItem.addEventListener('click', () => {
                    const partOne = statements.slice(0, 25)
                    const partTwo = statements.slice(25, 50)
                    const partThree = statements.slice(50, 75)
                    const partFour = statements.slice(75, 100)
                    const partFive = statements.slice(100, 125)
                    const partSix = statements.slice(125, 150)
                    switch (item) {
                            case '1-25':
                               createDiv(partOne);
                                break;
                            case '26-50':
                                createDiv(partTwo);
                                break;
                            case '51-75':
                                createDiv(partThree);
                                break;
                            case '76-100':
                            createDiv(partFour);
                            break;
                        case '101-125':
                            createDiv(partFive);
                            break;
                        case '126-150':
                            createDiv(partSix);
                            break;
                        default:
                            createDiv();
                            break;
                    }
                    
                    // newArticle = nArticle;
                    
                    // newDiv.append(nArticle)
                    
                    currentDiv.replaceWith(newDiv);
                });
            });

        })
        .catch(function (e) {
            console.error(e);
        });

});