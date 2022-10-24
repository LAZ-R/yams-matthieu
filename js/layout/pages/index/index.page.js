import * as LAZR from '../../../lazR/lazR.js';

let completedTilesCount = 0;
let xCount = 0;

const diceFilter = LAZR.CSS.getFilterStringForHexValue(LAZR.CSS.getCssRootVariableValue('--gray-30'));
const crossFilter = LAZR.CSS.getFilterStringForHexValue(LAZR.CSS.getCssRootVariableValue('--lazr-red'));

const isNumberTile = (tileId) => {
    return tileId.charAt(1) == '0' && (
        tileId.charAt(2) == '1'
        || tileId.charAt(2) == '2'
        || tileId.charAt(2) == '3'
        || tileId.charAt(2) == '4'
        || tileId.charAt(2) == '5'
        || tileId.charAt(2) == '6');
}

const isChanceTile = (tileId) => {
    return tileId.charAt(1) == '1' && (tileId.charAt(2) == '0' || tileId.charAt(2) == '1');
}

const isFigureTile = (tileId) => {
    return tileId.charAt(1) == '1' && (
        tileId.charAt(2) == '3'
        || tileId.charAt(2) == '4'
        || tileId.charAt(2) == '5'
        || tileId.charAt(2) == '6');
}

const handleTileClick = (tileId) => {
    if (completedTilesCount < 48) {
        const tileElement = document.getElementById(tileId);
        if (tileElement.classList.contains('clickable')) {
            appearPopIn(tileElement);
        }
    }
}
window.handleTileClick = handleTileClick;

const appearPopIn = (tileElement) => {
    const tileId = tileElement.id;
    const previousValue = parseInt(tileElement.innerHTML);
    const popInBackground = LAZR.DOM.createElement('div', 'popInBackground', 'pop-in-background', '');

    const popIn = LAZR.DOM.createElement('div', 'popIn', 'pop-in', '');

    let popInInnerHTML = `
        <span id="tileId">${getDisplayNameForTileId(tileId)}</span>
        <div id="scoreDisplay" class="score-display" ${isChanceTile(tileId) ? `` : `style="display: none;"`}>${previousValue}</div>`;

    if (isNumberTile(tileId)) {
        let buttonsList = `<div class="select-score-button-list">`;
        switch (tileId.charAt(2)) {
            case '1': buttonsList += `
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('1', '${tileId}')">1</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('2', '${tileId}')">2</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('3', '${tileId}')">3</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('4', '${tileId}')">4</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('5', '${tileId}')">5</button>`; break;
            case '2': buttonsList += `
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('2', '${tileId}')">2</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('4', '${tileId}')">4</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('6', '${tileId}')">6</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('8', '${tileId}')">8</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('10', '${tileId}')">10</button>`; break;
            case '3': buttonsList += `
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('3', '${tileId}')">3</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('6', '${tileId}')">6</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('9', '${tileId}')">9</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('12', '${tileId}')">12</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('15', '${tileId}')">15</button>`; break;
            case '4': buttonsList += `
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('4', '${tileId}')">4</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('8', '${tileId}')">8</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('12', '${tileId}')">12</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('16', '${tileId}')">16</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('20', '${tileId}')">20</button>`; break;
            case '5': buttonsList += `
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('5', '${tileId}')">5</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('10', '${tileId}')">10</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('15', '${tileId}')">15</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('20', '${tileId}')">20</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('25', '${tileId}')">25</button>`; break;
            case '6': buttonsList += `
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('6', '${tileId}')">6</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('12', '${tileId}')">12</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('18', '${tileId}')">18</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('24', '${tileId}')">24</button>
                <button class="select-score-button good-score-button" onclick="handleScoreButtonClick('30', '${tileId}')">30</button>`; break;
            default: break;
        }
        buttonsList += `
            <button class="select-score-button bad-score-button" onclick="handleScoreButtonClick('0', '${tileId}')">
                <img src="./medias/images/font-awsome/xmark-solid.svg" style="filter: ${crossFilter};">
            </button>
        </div>`;
        popInInnerHTML += buttonsList;
    } else if (isChanceTile(tileId)) { popInInnerHTML += `
        <div class="num-pad">
            <div class="num-row">
                <span id="numSpan7" class="num-span" onclick="handleNumberClick('7')">7</span>
                <span id="numSpan8" class="num-span" onclick="handleNumberClick('8')">8</span>
                <span id="numSpan9" class="num-span" onclick="handleNumberClick('9')">9</span>
            </div>
            <div class="num-row">
                <span id="numSpan4" class="num-span" onclick="handleNumberClick('4')">4</span>
                <span id="numSpan5" class="num-span" onclick="handleNumberClick('5')">5</span>
                <span id="numSpan6" class="num-span" onclick="handleNumberClick('6')">6</span>
            </div>
            <div class="num-row">
                <span id="numSpan1" class="num-span" onclick="handleNumberClick('1')">1</span>
                <span id="numSpan2" class="num-span" onclick="handleNumberClick('2')">2</span>
                <span id="numSpan3" class="num-span" onclick="handleNumberClick('3')">3</span>
            </div>
            <div class="num-row">
                <span id="numSpanC" class="num-span" onclick="handleNumberClick('C')">C</span>
                <span id="numSpan0" class="num-span" onclick="handleNumberClick('0')">0</span>
                <span id="numSpan<-" class="num-span" onclick="handleNumberClick('<-')">◄</span>
            </div>
        </div>
        <div class="select-score-button-list">
            <button class="select-score-button bad-score-button" onclick="handleScoreButtonClick('0', '${tileId}')">
                <img src="./medias/images/font-awsome/xmark-solid.svg" style="filter: ${crossFilter};">
            </button>
        </div>`;
    } else if (isFigureTile(tileId)) {
        let buttonsList = `<div class="select-score-button-list">`;
        switch (tileId.charAt(2)) {
            case '3': buttonsList += `<button class="select-score-button good-score-button" onclick="handleScoreButtonClick('30', '${tileId}')">30</button>`; break;
            case '4': buttonsList += `<button class="select-score-button good-score-button" onclick="handleScoreButtonClick('20', '${tileId}')">20</button>`; break;
            case '5': buttonsList += `<button class="select-score-button good-score-button" onclick="handleScoreButtonClick('40', '${tileId}')">40</button>`; break;
            case '6': buttonsList += `<button class="select-score-button good-score-button" onclick="handleScoreButtonClick('50', '${tileId}')">50</button>`; break;
            default: break;
        }
        buttonsList += `
            <button class="select-score-button bad-score-button" onclick="handleScoreButtonClick('0', '${tileId}')">
                <img src="./medias/images/font-awsome/xmark-solid.svg" style="filter: ${crossFilter};">
            </button>
        </div>`;
        popInInnerHTML += buttonsList;
    }

    popInInnerHTML += `
    <div class="pop-in-bottom-buttons-area">
        <button class="pop-in-cancel-button" onclick="disappearPopIn()">Annuler</button>
        ${isChanceTile(tileId) ? `<button class="pop-in-validate-button" onclick="validateTileScore('${tileId}')">Valider</button>` : ``}
    </div>`;

    popIn.innerHTML = popInInnerHTML;
    
    popInBackground.appendChild(popIn);
    document.getElementById('main').appendChild(popInBackground);
}

const disappearPopIn = () => {
    const popInBackground = document.getElementById('popInBackground');
    popInBackground.remove();
}
window.disappearPopIn = disappearPopIn;

const handleNumberClick = (number) => {
    const numSpan = document.getElementById(`numSpan${number}`);
    numSpan.classList.add('animate');
    setTimeout(() => {
        numSpan.classList.remove('animate');
    }, 400);
    const scoreDisplay = document.getElementById('scoreDisplay');
    let score = scoreDisplay.innerHTML;
    score = score == '0' ? '' : score; 
    if (number != 'C' && number != '<-') {
        score = score + number;
    } else if (number == 'C') {
        score = '0';
    } else if (number == '<-') {
        score = score.slice(0, -1);
        score = score == '' ? '0' : score; 
    }
    scoreDisplay.innerHTML = `${score}`;
}
window.handleNumberClick = handleNumberClick;

const handleScoreButtonClick = (number, tileId) => {
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.innerHTML = `${number}`;
    validateTileScore(tileId);
}
window.handleScoreButtonClick = handleScoreButtonClick;

const validateTileScore = (tileId) => {
    const scoreDisplay = document.getElementById('scoreDisplay');
    let score = scoreDisplay.innerHTML;
    if (isChanceTile(tileId)
        && tileId.charAt(2) == '0'
        && score > 30) {
            window.alert('Impossible de mettre une valeur supérieure à 30');
    } else if (isChanceTile(tileId)
        && tileId.charAt(2) == '1'
        && score > 29) {
            window.alert('Impossible de mettre une valeur supérieure à 29');
    } else if (isChanceTile(tileId)
        && tileId.charAt(2) == '0'
        && parseInt(document.getElementById(`${tileId.charAt(0)}11`).innerHTML) != 0
        && score < parseInt(document.getElementById(`${tileId.charAt(0)}11`).innerHTML)) {
        window.alert('Impossible de mettre un score inférieur à la case "-" de la même colonne');
    } else if (isChanceTile(tileId)
        && tileId.charAt(2) == '1'
        && parseInt(document.getElementById(`${tileId.charAt(0)}10`).innerHTML) != 0
        && score > parseInt(document.getElementById(`${tileId.charAt(0)}10`).innerHTML)) {
        window.alert('Impossible de mettre un score supérieure à la case "+" de la même colonne');
    } else {
        if (score == 0) {
            xCount += 1;
            document.getElementById('xCountDisplay').innerHTML = `
                <img src="./medias/images/font-awsome/xmark-solid.svg" style="filter: ${crossFilter}; margin-right: 4px;"><span>: ${xCount}</span>`;
        };
        const tileElement = document.getElementById(tileId);
        tileElement.innerHTML = score == 0 ? `<img src="./medias/images/font-awsome/xmark-solid.svg" style="filter: ${crossFilter};">` : score;
        tileElement.style.backgroundColor = 'var(--gray-80)';
        tileElement.style.color = 'var(--gray-10)';
        tileElement.classList.remove('clickable');
        refreshTotal();
        disappearPopIn();
        setTimeout(() => {
            completedTilesCount += 1;
            if (completedTilesCount == 48) {
                if (window.confirm(`
                Partie terminée
                Score final : ${
                    parseInt(document.getElementById('A18').innerHTML)
                    + parseInt(document.getElementById('B18').innerHTML)
                    + parseInt(document.getElementById('C18').innerHTML)
                    + parseInt(document.getElementById('D18').innerHTML)} pts
                    
                Faire une nouvelle partie ?`)) {
                    window.location = './';
                }
            }
        }, 100);
    }
}
window.validateTileScore = validateTileScore;

const refreshTotal = () => {
    // numbers
    const setNumbersWithoutBonusSubTotal = (section) => {
        const subTotal =
            (parseInt(document.getElementById(`${section}01`).innerHTML) ? parseInt(document.getElementById(`${section}01`).innerHTML) : 0) +
            (parseInt(document.getElementById(`${section}02`).innerHTML) ? parseInt(document.getElementById(`${section}02`).innerHTML) : 0) +
            (parseInt(document.getElementById(`${section}03`).innerHTML) ? parseInt(document.getElementById(`${section}03`).innerHTML) : 0) +
            (parseInt(document.getElementById(`${section}04`).innerHTML) ? parseInt(document.getElementById(`${section}04`).innerHTML) : 0) +
            (parseInt(document.getElementById(`${section}05`).innerHTML) ? parseInt(document.getElementById(`${section}05`).innerHTML) : 0) +
            (parseInt(document.getElementById(`${section}06`).innerHTML) ? parseInt(document.getElementById(`${section}06`).innerHTML) : 0);
            document.getElementById(`${section}07`).innerHTML = subTotal;
    }
    const setNumbersBonus = (section) => {
        if (parseInt(document.getElementById(`${section}07`).innerHTML) >= 60) {
            document.getElementById(`${section}08`).innerHTML = 30;
            document.getElementById(`${section}08`).style.color = 'var(--primary)';
        } else {
            document.getElementById(`${section}08`).innerHTML = 0;
            document.getElementById(`${section}08`).style.color = 'var(--font-default-color)';
        }
    }
    const setNumbersWithBonusSubTotal = (section) => {
        const subTotal =
            parseInt(document.getElementById(`${section}07`).innerHTML) +
            parseInt(document.getElementById(`${section}08`).innerHTML);
            document.getElementById(`${section}09`).innerHTML = subTotal;
    }
    // chance
    const setChanceSubTotal = (section) => {
        const subTotal =
            (parseInt(document.getElementById(`${section}10`).innerHTML) ? parseInt(document.getElementById(`${section}10`).innerHTML) : 0) +
            (parseInt(document.getElementById(`${section}11`).innerHTML) ? parseInt(document.getElementById(`${section}11`).innerHTML) : 0);
            document.getElementById(`${section}12`).innerHTML = subTotal;
    }
    // figures
    const setFiguresSubTotal = (section) => {
        const subTotal =
            (parseInt(document.getElementById(`${section}13`).innerHTML) ? parseInt(document.getElementById(`${section}13`).innerHTML) : 0) +
            (parseInt(document.getElementById(`${section}14`).innerHTML) ? parseInt(document.getElementById(`${section}14`).innerHTML) : 0) +
            (parseInt(document.getElementById(`${section}15`).innerHTML) ? parseInt(document.getElementById(`${section}15`).innerHTML) : 0) +
            (parseInt(document.getElementById(`${section}16`).innerHTML) ? parseInt(document.getElementById(`${section}16`).innerHTML) : 0);
            document.getElementById(`${section}17`).innerHTML = subTotal;
    }
    // total
    const setTotal = (section) => {
        const subTotal =
            parseInt(document.getElementById(`${section}09`).innerHTML) +
            parseInt(document.getElementById(`${section}12`).innerHTML) +
            parseInt(document.getElementById(`${section}17`).innerHTML);
            document.getElementById(`${section}18`).innerHTML = subTotal;
    }

    const setColumnTotal = (section) => {
        setNumbersWithoutBonusSubTotal(section);
        setNumbersBonus(section);
        setNumbersWithBonusSubTotal(section);
        setChanceSubTotal(section);
        setFiguresSubTotal(section);
        setTotal(section);
    }
    
    setColumnTotal('A'); // descending
    setColumnTotal('B'); // ascending
    setColumnTotal('C'); // free
    setColumnTotal('D'); // dry
}

const getDisplayNameForTileId = (tileId) => {
    let displayName = '';
    const tileRawColumn = tileId.charAt(0);
    let tileColumn = '';
    const tileRawType = tileId.charAt(1) + tileId.charAt(2);
    let tileType = '';
    switch (tileRawColumn) {
        case 'A': tileColumn = `<span>▼</span>`; break;
        case 'B': tileColumn = `<span>▲</span>`; break;
        case 'C': tileColumn = `<span>Libre</span>`; break;
        case 'D': tileColumn = `<span>Sec</span>`; break;
        default: break;
    }
    switch (tileRawType) {
        case '01': tileType = `<img src="./medias/images/font-awsome/dice-one-solid.svg" style="filter: ${diceFilter};">`; break;
        case '02': tileType = `<img src="./medias/images/font-awsome/dice-two-solid.svg" style="filter: ${diceFilter};">`; break;
        case '03': tileType = `<img src="./medias/images/font-awsome/dice-three-solid.svg" style="filter: ${diceFilter};">`; break;
        case '04': tileType = `<img src="./medias/images/font-awsome/dice-four-solid.svg" style="filter: ${diceFilter};">`; break;
        case '05': tileType = `<img src="./medias/images/font-awsome/dice-five-solid.svg" style="filter: ${diceFilter};">`; break;
        case '06': tileType = `<img src="./medias/images/font-awsome/dice-six-solid.svg" style="filter: ${diceFilter};">`; break;

        case '10': tileType = `<span>+</span>`; break;
        case '11': tileType = `<span>-</span>`; break;

        case '13': tileType = `<span>Suite</span>`; break;
        case '14': tileType = `<span>Full</span>`; break;
        case '15': tileType = `<span>Carré</span>`; break;
        case '16': tileType = `<span>Yams</span>`; break;
        default: break;
    }

    displayName = tileColumn + `<span>•</span>` + tileType;

    return displayName;
}

export const renderPage = () => {
    const pageTitle = LAZR.APP_DATA.getAppName();
    LAZR.DOM.setHTMLTitle(pageTitle);

    /* --------------------------------------------------------------------- */

    const page = LAZR.DOM.createElement('div', 'indexSection1', 'page page-section', `
    <div class="index-vertical-section section1">
        <div id="xCountDisplay" class="sub-section section-legend bottom-border">
            <img src="./medias/images/font-awsome/xmark-solid.svg" style="filter: ${crossFilter}; margin-right: 4px;"><span>: ${xCount}</span>
        </div>
        <div class="sub-section section-legend">
            <img src="./medias/images/font-awsome/dice-one-solid.svg" style="filter: ${diceFilter};">
        </div>
        <div class="sub-section section-legend">
            <img src="./medias/images/font-awsome/dice-two-solid.svg" style="filter: ${diceFilter};">
        </div>
        <div class="sub-section section-legend">
            <img src="./medias/images/font-awsome/dice-three-solid.svg" style="filter: ${diceFilter};">
        </div>
        <div class="sub-section section-legend">
            <img src="./medias/images/font-awsome/dice-four-solid.svg" style="filter: ${diceFilter};">
        </div>
        <div class="sub-section section-legend">
            <img src="./medias/images/font-awsome/dice-five-solid.svg" style="filter: ${diceFilter};">
        </div>
        <div class="sub-section section-legend bottom-border">
            <img src="./medias/images/font-awsome/dice-six-solid.svg" style="filter: ${diceFilter};">
        </div>
        <div class="sub-section section-legend">
            Sous-total
        </div>
        <div class="sub-section section-legend bottom-border">
            Bonus
        </div>
        <div class="sub-section section-legend bottom-border">
            Sous-total
        </div>
        <div class="sub-section section-legend">
            +
        </div>
        <div class="sub-section section-legend bottom-border">
            -
        </div>
        <div class="sub-section section-legend bottom-border">
            Sous-total
        </div>
        <div class="sub-section section-legend">
            Suite
        </div>
        <div class="sub-section section-legend">
            Full
        </div>
        <div class="sub-section section-legend">
            Carré
        </div>
        <div class="sub-section section-legend bottom-border">
           Yams
        </div>
        <div class="sub-section section-legend bottom-border">
           Sous-total
        </div>
        <div class="sub-section section-legend">
           Total
        </div>
    </div>
    <div class="index-vertical-section section2">
        <div id="A0" class="sub-section bottom-border section-legend">
            ▼
        </div>
        <div id="A01" class="sub-section clickable" onclick="handleTileClick('A01')">
            0
        </div>
        <div id="A02" class="sub-section clickable" onclick="handleTileClick('A02')">
            0
        </div>
        <div id="A03" class="sub-section clickable" onclick="handleTileClick('A03')">
            0
        </div>
        <div id="A04" class="sub-section clickable" onclick="handleTileClick('A04')">
            0
        </div>
        <div id="A05" class="sub-section clickable" onclick="handleTileClick('A05')">
            0
        </div>
        <div id="A06" class="sub-section clickable bottom-border" onclick="handleTileClick('A06')">
            0
        </div>
        <div id="A07" class="sub-section">
            0
        </div>
        <div id="A08" class="sub-section bottom-border">
            0
        </div>
        <div id="A09" class="sub-section bottom-border">
            0
        </div>
        <div id="A10" class="sub-section clickable" onclick="handleTileClick('A10')">
            0
        </div>
        <div id="A11" class="sub-section clickable bottom-border" onclick="handleTileClick('A11')">
            0
        </div>
        <div id="A12" class="sub-section bottom-border">
            0
        </div>
        <div id="A13" class="sub-section clickable" onclick="handleTileClick('A13')">
            0
        </div>
        <div id="A14" class="sub-section clickable" onclick="handleTileClick('A14')">
            0
        </div>
        <div id="A15" class="sub-section clickable" onclick="handleTileClick('A15')">
            0
        </div>
        <div id="A16" class="sub-section clickable bottom-border" onclick="handleTileClick('A16')">
           0
        </div>
        <div id="A17" class="sub-section bottom-border">
           0
        </div>
        <div id="A18" class="sub-section">
           0
        </div>
    </div>
    <div class="index-vertical-section section3">
        <div id="B0" class="sub-section bottom-border section-legend">
            ▲
        </div>
        <div id="B01" class="sub-section clickable" onclick="handleTileClick('B01')">
            0
        </div>
        <div id="B02" class="sub-section clickable" onclick="handleTileClick('B02')">
            0
        </div>
        <div id="B03" class="sub-section clickable" onclick="handleTileClick('B03')">
            0
        </div>
        <div id="B04" class="sub-section clickable" onclick="handleTileClick('B04')">
            0
        </div>
        <div id="B05" class="sub-section clickable" onclick="handleTileClick('B05')">
            0
        </div>
        <div id="B06" class="sub-section clickable bottom-border" onclick="handleTileClick('B06')">
            0
        </div>
        <div id="B07" class="sub-section">
            0
        </div>
        <div id="B08" class="sub-section bottom-border">
            0
        </div>
        <div id="B09" class="sub-section bottom-border">
            0
        </div>
        <div id="B10" class="sub-section clickable" onclick="handleTileClick('B10')">
            0
        </div>
        <div id="B11" class="sub-section clickable bottom-border" onclick="handleTileClick('B11')">
            0
        </div>
        <div id="B12" class="sub-section bottom-border">
            0
        </div>
        <div id="B13" class="sub-section clickable" onclick="handleTileClick('B13')">
            0
        </div>
        <div id="B14" class="sub-section clickable" onclick="handleTileClick('B14')">
            0
        </div>
        <div id="B15" class="sub-section clickable" onclick="handleTileClick('B15')">
            0
        </div>
        <div id="B16" class="sub-section clickable bottom-border" onclick="handleTileClick('B16')">
           0
        </div>
        <div id="B17" class="sub-section bottom-border">
           0
        </div>
        <div id="B18" class="sub-section">
           0
        </div>
    </div>
    <div class="index-vertical-section section4">
        <div id="C0" class="sub-section bottom-border section-legend">
            Libre
        </div>
        <div id="C01" class="sub-section clickable" onclick="handleTileClick('C01')">
            0
        </div>
        <div id="C02" class="sub-section clickable" onclick="handleTileClick('C02')">
            0
        </div>
        <div id="C03" class="sub-section clickable" onclick="handleTileClick('C03')">
            0
        </div>
        <div id="C04" class="sub-section clickable" onclick="handleTileClick('C04')">
            0
        </div>
        <div id="C05" class="sub-section clickable" onclick="handleTileClick('C05')">
            0
        </div>
        <div id="C06" class="sub-section clickable bottom-border" onclick="handleTileClick('C06')">
            0
        </div>
        <div id="C07" class="sub-section">
            0
        </div>
        <div id="C08" class="sub-section bottom-border">
            0
        </div>
        <div id="C09" class="sub-section bottom-border">
            0
        </div>
        <div id="C10" class="sub-section clickable" onclick="handleTileClick('C10')">
            0
        </div>
        <div id="C11" class="sub-section clickable bottom-border" onclick="handleTileClick('C11')">
            0
        </div>
        <div id="C12" class="sub-section bottom-border">
            0
        </div>
        <div id="C13" class="sub-section clickable" onclick="handleTileClick('C13')">
            0
        </div>
        <div id="C14" class="sub-section clickable" onclick="handleTileClick('C14')">
            0
        </div>
        <div id="C15" class="sub-section clickable" onclick="handleTileClick('C15')">
            0
        </div>
        <div id="C16" class="sub-section clickable bottom-border" onclick="handleTileClick('C16')">
           0
        </div>
        <div id="C17" class="sub-section bottom-border">
           0
        </div>
        <div id="C18" class="sub-section">
           0
        </div>
    </div>
    <div class="index-vertical-section section5">
        <div id="D0" class="sub-section bottom-border section-legend">
            Sec
        </div>
        <div id="D01" class="sub-section clickable" onclick="handleTileClick('D01')">
            0
        </div>
        <div id="D02" class="sub-section clickable" onclick="handleTileClick('D02')">
            0
        </div>
        <div id="D03" class="sub-section clickable" onclick="handleTileClick('D03')">
            0
        </div>
        <div id="D04" class="sub-section clickable" onclick="handleTileClick('D04')">
            0
        </div>
        <div id="D05" class="sub-section clickable" onclick="handleTileClick('D05')">
            0
        </div>
        <div id="D06" class="sub-section clickable bottom-border" onclick="handleTileClick('D06')">
            0
        </div>
        <div id="D07" class="sub-section">
            0
        </div>
        <div id="D08" class="sub-section bottom-border">
            0
        </div>
        <div id="D09" class="sub-section bottom-border">
            0
        </div>
        <div id="D10" class="sub-section clickable" onclick="handleTileClick('D10')">
            0
        </div>
        <div id="D11" class="sub-section clickable bottom-border" onclick="handleTileClick('D11')">
            0
        </div>
        <div id="D12" class="sub-section bottom-border">
            0
        </div>
        <div id="D13" class="sub-section clickable" onclick="handleTileClick('D13')">
            0
        </div>
        <div id="D14" class="sub-section clickable" onclick="handleTileClick('D14')">
            0
        </div>
        <div id="D15" class="sub-section clickable" onclick="handleTileClick('D15')">
            0
        </div>
        <div id="D16" class="sub-section clickable bottom-border" onclick="handleTileClick('D16')">
           0
        </div>
        <div id="D17" class="sub-section bottom-border">
           0
        </div>
        <div id="D18" class="sub-section">
           0
        </div>
    </div>`);
    /* --------------------------------------------------------------------- */
    
    return page;
}
