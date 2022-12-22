const STORAGE = localStorage;
const appShortName = 'yams0.0.6';

if (STORAGE.getItem(`${appShortName}FirstTime`) === null) {
    STORAGE.setItem(`${appShortName}FirstTime`, '0');
    let userTMP = {
        settings: [
            {
                id: 1,
                name: 'Écran',
                settings: [
                    {
                        id: 'keepScreenAwake',
                        name: `Laisser l'écran allumé lorsque l'application est lancée`,
                        isActive: true
                    }
                ]
            },
            {
                id: 2,
                name: 'Avancé',
                settings: [
                    {
                        id: 'jsonWizard',
                        name: 'Activer JSON Wizard',
                        isActive: false
                    }
                ]
            }
        ],
        themeColor: '#749f69'
    };
    STORAGE.setItem(`${appShortName}User`, JSON.stringify(userTMP));
}
/* ------------------------------------------------------------------------- */
export const getUser = () => {
    return JSON.parse(STORAGE.getItem(`${appShortName}User`));
}
export const setUser = (user) => {
    STORAGE.setItem(`${appShortName}User`, JSON.stringify(user));
}
/* ------------------------------------------------------------------------- */
export const getUserSetting = (id) => {
    let settingToReturn = '';
    const user = getUser();
    const settings = user.settings;
    settings.forEach(settingsGroups => {
        settingsGroups.settings.forEach(setting => {
            if (setting.id == id) {
                settingToReturn = setting;
            }
        });
    });
    return settingToReturn;
}