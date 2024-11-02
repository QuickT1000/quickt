import { TranslationInterface } from '../interfaces/translation.interface';

const translationsDefaults = {
  id: null,
  client: '',
  key: '',
  value: '',
  country: '',
  language: '',
}

export class TranslationModel {
  id: number
  key: string;
  value: string;
  country: string;
  language: string;

  constructor(translation: TranslationInterface = translationsDefaults) {
    this.id = translation.id;
    this.key = translation.key;
    this.value = translation.value;
    this.country = translation.country;
    this.language = translation.language;
  }
}
