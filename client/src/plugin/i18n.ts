export default {
	install (app: any, options: any) {
		app.config.globalProperties.$language = "pt";

		const i18n = {
			translate (key: string) {
				return options[app.config.globalProperties.$language][key];
			},
			setLanguage (language: string) {
				console.log(language);
				app.config.globalProperties.$language = language;
			}
		}

		app.config.globalProperties.$i18n = i18n;
	}
}

export interface i18n {
	$language: string;
	translate: (name: string) => string;
	setLanguage: (language: string) => void;
}

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$i18n: i18n
	}
}
