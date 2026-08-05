import fs from 'node:fs/promises';
import path from 'node:path';

export interface LanguageOption {
  code: string;
  name: string;
}

let cache: LanguageOption[] | null = null;

export class LanguageService {
  async getLanguages(): Promise<LanguageOption[]> {
    if (cache) return cache;
    const filePath = path.join(process.cwd(), 'data', 'languages.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    cache = JSON.parse(raw) as LanguageOption[];
    return cache;
  }

  async isSupported(languageCode: string): Promise<boolean> {
    const languages = await this.getLanguages();
    return languages.some((language) => language.code === languageCode);
  }
}
