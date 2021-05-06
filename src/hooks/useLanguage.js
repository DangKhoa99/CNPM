import { useState } from 'react';

export default function useLanguage() {
    const getLanguage = () => {
        let languageStoredInLocalStorage = localStorage.getItem("language");
        return languageStoredInLocalStorage ? languageStoredInLocalStorage : "Vietnam"
      };

    let [language, setLanguage] = useState(getLanguage());

    const storeLanguageInLocalStorage = language => {
        localStorage.setItem("language", language);
    };

    return {
        setLanguage: storeLanguageInLocalStorage,
        language
    }

}