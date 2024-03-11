const languages = ["de", "en", "fr", "it", "pt", "zh", "es"] // available languages

// check for language set in localStorage if not available set to browser language
const getLanguage = () => {
    if(navigator.language.match(/^de\-/)) return "de";
    if(navigator.language.match(/^en\-/)) return "en";
    if(navigator.language.match(/^fr\-/)) return "fr";
    if(navigator.language.match(/^it\-/)) return "it";
    if(navigator.language.match(/^pt\-/)) return "pt";
    if(navigator.language.match(/^zh\-/)) return "zh";
    if(navigator.language.match(/^es\-/)) return "es";
    return navigator.language
}
var lang = (localStorage.getItem("lang") !== null) ? localStorage.getItem("lang") : getLanguage();

// if a language is selected in a dropdown menu with the id language set lang key to localStorage
var languageSelect = document.getElementById('language'); 
if(languageSelect !== null && localStorage.getItem("lang") !== languageSelect.options[languageSelect.selectedIndex].value) {
    localStorage.setItem("lang", languageSelect.options[languageSelect.selectedIndex].value);
    location.reload();
}
if(languages.indexOf(lang) == -1) lang = "en"; // check if language is available if not default to english

(async() => {
    // kinda hacky way to fetch json files from github pages
    const response = await fetch(`https://otter-s-paw-studio.github.io/Otterpawswebsite/assets/languages/${lang}-text.json`)
    const langObject = await response.json();
    // this replaces every element with the id of "text-" with the values from the languageObject file
    var textContainers = document.querySelectorAll('*[id^="text-"]');
    for (var i = 0; i < textContainers.length; i++) {
        textContainers.item(i).innerHTML = langObject[textContainers.item(i).id];
    }
})();