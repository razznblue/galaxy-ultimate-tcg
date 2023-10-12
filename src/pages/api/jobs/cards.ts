import { CheerioAPI, load } from 'cheerio';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import LOGGER from '../../../util/logger';
import { authenticateKey } from '../../../helpers/apiHelper';
import { CreateCardBody } from '../../../helpers/interfaces';
import { createCard, updateCard } from '../../../server/controllers/CardController';

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
  for (const card of cards) {
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
        ? `https://swgu-library.onrender.com/images/CARD_FRONTS/${card?.name?.trim().toLowerCase().replaceAll(' ', '-')}-${card?.variantName}.webp`
        : `https://swgu-library.onrender.com/images/CARD_FRONTS/${card?.name?.trim().toLowerCase().replaceAll(' ', '-')}.webp`,
      visible: card?.visible?.toLowerCase() === 'false' ? 'false' : 'true'
    }

    const createResponse = await createCard(body);
    createResponse?.responseCode !== 201
      ? LOGGER.error(`Could not save card ${body?.name} to DB. Err Code: ${createResponse?.responseCode}. Msg: ${createResponse?.msg}`)
      : LOGGER.info(`Created new card ${body?.name}`);

    if (process.env.UPDATE_CARDS === 'true' && createResponse?.responseCode !== 201) {
      const updateReponse = await updateCard(body);
      updateReponse.responseCode !== 204
        ? LOGGER.error(`Could not update card ${body?.name} to DB. Err Code: ${updateReponse?.responseCode}. Msg: ${updateReponse?.msg}`)
        : LOGGER.info(`Updated card ${body?.name}`);
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req?.method !== 'POST') res.status(404).send('Method Not Found');

  try {
    if(await authenticateKey(req, res, 'cards')) {
      const data: any = await scrapeData();
      LOGGER.info(`Scraped ${data?.count} cards`);
      res.send(data || []);

      await formatAndSave(data?.cards);
    }
  } catch(err) {
    LOGGER.error(err);
    res.status(500).send(err);
  }
}