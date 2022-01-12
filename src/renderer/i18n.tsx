import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

// import translationEN from '/public/locales/en/translation.json';

i18n.use(Backend)
	// .use(LanguageDetector)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		lng: 'fr',
		fallbackLng: 'en', // use en if detected lng is not available

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
		react: {
			useSuspense: false,
		},
		debug: true,
	});

export default i18n;
