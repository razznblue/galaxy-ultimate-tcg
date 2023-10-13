import { load } from 'cheerio';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import LOGGER from '../../../util/logger';
import { authenticateKey } from '../../../helpers/apiHelper';
import { CreateLocationBody } from '../../../helpers/interfaces';
import { createLocation, updateLocation } from '../../../server/controllers/LocationController';

const HEADER_CHECK = 'ABILITY';
const JOB_NAME = 'LOCATIONS_PIPELINE';

const scrapeData = async () => {
  const sheetUrl = process.env.LOCATIONS_SHEET_URL;
  if (!sheetUrl) {
    return LOGGER.error(`unable to perform locations job because LOCATIONS_SHEET_URL was not found`);
  }

  const response = await axios.get(sheetUrl);
  const $: any = load(response.data);
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
  const createPromises = locations.map(async (location) => {
    const body: CreateLocationBody = {
      name: location?.name,
      abilityText: location?.ability,
      abilityType: location?.type,
      tags: location?.tags.includes(', ') ? location?.tags.split(', ') : location?.tags === '' ? undefined : [location?.tags],
      image: `https://swgu-library.onrender.com/images/LOCATIONS/location-${location?.name?.trim().toLowerCase().replaceAll(' ', '-')}.webp`,
      visible: location?.visible?.toLowerCase() === 'false' ? 'false' : 'true'
    }

    const createResponse = await createLocation(body);
    
    if (process.env.UPDATE_LOCATIONS === 'true' && createResponse.responseCode !== 201) {
      await updateLocation(body);
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
      LOGGER.info(`Scraped ${data?.count} locations`);
      
      await formatAndSave(data?.locations);
      LOGGER.info(`Finished Processing ${JOB_NAME}`);
      console.timeEnd(JOB_NAME);
      res.send(data || []);
    }
  } catch(err) {
    LOGGER.error(err);
    res.status(500).send(err);
  }
}