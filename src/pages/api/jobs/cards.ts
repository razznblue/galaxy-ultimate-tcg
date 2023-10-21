import { load } from 'cheerio';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import LOGGER from '../../../util/logger';
import { authenticateKey } from '../../../helpers/apiHelper';
import { CreateCardBody } from '../../../helpers/interfaces';
import { createCard, updateCard } from '../../../server/controllers/CardController';
import { assetServiceUrl } from '../../../util/constants';

const NAME_HEADER = 'NAME';
const JOB_NAME = 'CARDS_PIPELINE'

const scrapeData = async () => {
  const cardsSheetUrl = process.env.CARDS_SHEET_URL;
  if (!cardsSheetUrl) {
    return LOGGER.error(`unable to perform card job because CARDS_SHEET_URL was not found`);
  }

  const response = await axios.get(cardsSheetUrl);
  const $: any = load(response.data);
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
        variantName: $(columns[7]).text().trim(),
        visible: $(columns[8]).text().trim()
      };

      cards.push(rowData);
      count++;
    }
  });
  return { count, cards };
}

const formatAndSave = async (cards: any) => {
  const createPromises = cards.map(async (card: any) => {
    const body: CreateCardBody = {
      name: card?.name,
      abilityText: card?.ability,
      abilityType: card?.type,
      cost: card?.cost,
      power: card?.power,
      health: card?.health,
      tags: card?.tags.includes(', ') ? card?.tags.split(', ') : card?.tags === '' ? undefined : [card?.tags],
      isVariant: card?.variantName !== '' ? 'true' : 'false',
      variantName: card?.variantName || undefined,
      image: card?.variantName !== '' 
        ? `${assetServiceUrl}/IMAGES/card_fronts/${card?.name?.trim().toLowerCase().replaceAll(' ', '-')}-${card?.variantName}.webp`
        : `${assetServiceUrl}/IMAGES/card_fronts/${card?.name?.trim().toLowerCase().replaceAll(' ', '-')}.webp`,
      visible: card?.visible?.toLowerCase() === 'false' ? 'false' : 'true'
    }

    const createResponse = await createCard(body);

    if (process.env.UPDATE_CARDS === 'true' && createResponse?.responseCode !== 201) {
      await updateCard(body);
    }
  });

  await Promise.all(createPromises);

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req?.method !== 'POST') res.status(404).send('Method Not Found');
  LOGGER.info(`Starting ${JOB_NAME}`);

  try {
    if(await authenticateKey(req, res, 'cards')) {
      console.time(JOB_NAME);
      const data: any = await scrapeData();
      LOGGER.info(`Scraped ${data?.count} cards`);
      
      await formatAndSave(data?.cards);
      LOGGER.info(`Finished Processing ${JOB_NAME}`);
      console.timeEnd(JOB_NAME);
      res.send(data || []);
    }
  } catch(err) {
    LOGGER.error(err);
    res.status(500).send(err);
  }
}