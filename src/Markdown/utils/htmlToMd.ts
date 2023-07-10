import TurndownService from 'turndown';
import * as TurndownPluginGfm from 'turndown-plugin-gfm';

const gfm = TurndownPluginGfm.gfm;

export const turndownService = new TurndownService({ hr: '---', headingStyle: 'atx' });
turndownService.use(gfm);
