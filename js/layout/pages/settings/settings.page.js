import * as LAZR from '../../../lazR/lazR.js';

const colors = [
    '#749f69',
    '#a441bd',
    '#428a6f',
    '#1d55b5',
    '#d16615',
    '#c43b3b',
    '#9e8403',
    "#5b3a91",
    "#358c15"
]

let user = LAZR.STORAGE.getUser();
let settings = user.settings;

const handleCheck = (id) => {
    settings.forEach(settingsGroups => {
        settingsGroups.settings.forEach(setting => {
            if (setting.id == id) {
                setting.isActive = document.getElementById(id).checked;
            }
        });
    });
    user.settings = settings;
    LAZR.STORAGE.setUser(user);
};
window.handleCheck = handleCheck;

const renderSettingsGroup = (settingsGroup) => {
    let str = `
    <div id="settingsGroup${settingsGroup.id}" class="settings-group">
        <span class="settings-group-name">${settingsGroup.name}</span>`
        
    settingsGroup.settings.forEach(setting => {
        str += `
        <div class="setting-tile">
            <div class="setting-label-area">
                <span class="setting-label">${setting.name}</span>
            </div>
            <div class="setting-switch-area">
                <label class="switch">
                    <input id="${setting.id}" type="checkbox"
                        onclick="handleCheck('${setting.id}')" ${setting.isActive ? "checked" : ""} />
                    <span class="slider round"></span>
                </label>
            </div>    
        </div>`
    });
    str += `</div>`;
    return str;
}

const changeThemeColor = (color) => {
    let user = LAZR.STORAGE.getUser();
    user.themeColor = color;
    document.documentElement.style.setProperty('--primary', `${color}`);
    LAZR.STORAGE.setUser(user);
}
window.changeThemeColor = changeThemeColor;

export const renderPage = () => {

    LAZR.DOM.setHTMLTitle('Settings');

    const page = LAZR.DOM.createElement('div', 'settingsPage', 'page', `
        <h1 style="padding-left: var(--horizontal-padding)">Paramètres</h1>`);
    settings.forEach(settingsGroup => {
        page.appendChild(LAZR.DOM.getElementFromHTMLString(renderSettingsGroup(settingsGroup)));
    });

    page.appendChild(LAZR.DOM.createElement('h3', 'themeTitle', '', 'Thème'))

    const themeColorArea = LAZR.DOM.createElement('div', 'themeColorArea', 'theme-color-area', '');
    colors.forEach(color => {
        themeColorArea.appendChild(LAZR.DOM.getElementFromHTMLString(`<div class="color-round" style="background-color: ${color}" onclick="changeThemeColor('${color}')"></div>`));
    });

    page.appendChild(themeColorArea);
    
    return page;
}