import { CheerioAPI, load } from 'cheerio';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import LOGGER from '../../../util/logger';
import { authenticateKey } from '../../../helpers/apiHelper';
import { CreateCardBody } from '../../../helpers/interfaces';

const NAME_HEADER = 'NAME';

const scrapeData = async () => {
  const cardsSheetUrl = process.env.CARDS_SHEET_URL;
  if (!cardsSheetUrl) {
    return LOGGER.error(`unable to perform card job because CARDS_SHEET_URL was not found`);
  }

  const response = await axios.get(cardsSheetUrl);
  const $: CheerioAPI = load(response.data);
  const rows = $('#waffle-grid-container tbody tr');
  const cards = [];
  let count = 0;

  rows.each((i, element) => {
    const columns = $(element).find('td');

    if ($(columns[0]).text().trim() && $(columns[0]).text().trim() !== NAME_HEADER) {
      const rowData = {
        name: $(columns[0]).text().trim(),
        ability: $(columns[1]).text().trim(),
        type: $(columns[2]).text().trim(),
        cost: $(columns[3]).text().trim(),
        power: $(columns[4]).text().trim(),
        health: $(columns[5]).text().trim(),
        tags: $(columns[6]).text().trim(),
        visible: $(columns[7]).text().trim()
      };

      cards.push(rowData);
      count++;
    }
  });
  return { count, cards };
}

const formatAndSaveCards = async (cards: any) => {

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req?.method !== 'POST') res.status(404).send('Method Not Found');

  try {
    if(await authenticateKey(req, res, 'cards')) {
      const data: any = await scrapeData();
      LOGGER.info(`Scraped ${data?.count} cards`);
      res.send(data || []);
    }
  } catch(err) {
    LOGGER.error(err);
    res.status(500).send(err);
  }
}