import path from 'path';
import { promises as fs } from 'fs';
import { Database } from '../types';

const dbFilePath = path.resolve(__dirname, '..', '..', 'db', 'db.json');

const getData = async () =>
    JSON.parse(await fs.readFile(dbFilePath, 'utf8')) as Promise<Database>;

const writeData = async (dbData: Database) =>
    await fs.writeFile(dbFilePath, JSON.stringify(dbData, null, 2));

export default {
    getData,
    writeData,
};