import { CheerioAPI, load } from 'cheerio';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import LOGGER from '../../../util/logger';
import { authenticateKey } from '../../../helpers/apiHelper';
import { CreateLocationBody } from '../../../helpers/interfaces';
import { createLocation, updateLocation } from '../../../server/controllers/LocationController';

const HEADER_CHECK = 'ABILITY';

const scrapeData = async () => {
  const sheetUrl = process.env.LOCATIONS_SHEET_URL;
  if (!sheetUrl) {
    return LOGGER.error(`unable to perform locations job because LOCATIONS_SHEET_URL was not found`);
  }

  const response = await axios.get(sheetUrl);
  const $: CheerioAPI = load(response.data);
  const rows = $('#waffle-grid-container tbody tr');
  const locations = [];
  let count = 0;

  rows.each((i, element) => {
    const columns = $(element).find('td');

    if ($(columns[1]).text().trim() && $(columns[1]).text().trim() !== HEADER_CHECK) {
      const rowData = {
        name: $(columns[0]).text().trim(),
        ability: $(columns[1]).text().trim(),
        type: $(columns[2]).text().trim(),
        tags: $(columns[3]).text().trim(),
        visible: $(columns[4]).text().trim()
      };

      locations.push(rowData);
      count++;
    }
  });
  return { count, locations };
}

const formatAndSave = async (locations: any) => {
  for (const location of locations) {
    const body: CreateLocationBody = {
      name: location?.name,
      abilityText: location?.ability,
      abilityType: location?.type,
      tags: location?.tags.includes(', ') ? location?.tags.split(', ') : location?.tags === '' ? undefined : [location?.tags],
      image: `https://swgu-library.onrender.com/images/LOCATIONS/location-${location?.name?.trim().toLowerCase().replaceAll(' ', '-')}.webp`,
      visible: location?.visible?.toLowerCase() === 'false' ? 'false' : 'true'
    }

    const createResponse = await createLocation(body);
    createResponse.responseCode !== 201
      ? LOGGER.error(`Could not save location ${body?.name} to DB. Err Code: ${createResponse?.responseCode}. Msg: ${createResponse?.msg}`)
      : LOGGER.info(`Created new Location ${body?.name}`);
    
    if (process.env.UPDATE_LOCATIONS === 'true' && createResponse.responseCode !== 201) {
      const updateReponse = await updateLocation(body);
      updateReponse.responseCode !== 204
        ? LOGGER.error(`Could not update location ${body?.name} to DB. Err Code: ${updateReponse?.responseCode}. Msg: ${updateReponse?.msg}`)
        : LOGGER.info(`Updated Location ${body?.name}`);
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req?.method !== 'POST') res.status(404).send('Method Not Found');
  LOGGER.info(`Starting LOCATIONS Job`);

  try {
    if(await authenticateKey(req, res, 'cards')) {
      const data: any = await scrapeData();
      LOGGER.info(`Scraped ${data?.count} locations`);
      res.send(data || []);

      await formatAndSave(data?.locations);
      LOGGER.info(`Finished Processing LOCATIONS Job`);
    }
  } catch(err) {
    LOGGER.error(err);
    res.status(500).send(err);
  }
}