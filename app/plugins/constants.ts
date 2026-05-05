import { TYPES } from '~~/constants/types';
import { ROLES } from '~~/constants/roles';
import { CHANNELS } from '~~/constants/channels';
import { MAIN } from '~~/constants/main';
import { CATEGORIES } from '~~/constants/categories';
import { BOOLEANS } from '~~/constants/booleans';
import { TEXTS } from '~~/constants/texts';
import { TEXTPARAGRAPHS } from '~~/constants/textParagraphs';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            constants: {
                types: TYPES,
                roles: ROLES,
                channels: CHANNELS,
                main: MAIN,
                categories: CATEGORIES,
                booleans: BOOLEANS,
                texts: TEXTS,
                textParagraphs: TEXTPARAGRAPHS,
            },
        },
    };
});
