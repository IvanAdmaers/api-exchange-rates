import { fs, vol } from 'memfs';
import prepare from '.';
import { FileSystem } from '../../../libs';
import {
  RATES_CACHE_PATH_TO_FOLDER,
  RATES_CACHE_PATH,
  RATES_PLUG,
} from '../../../constants';

vol.mkdirSync(RATES_CACHE_PATH_TO_FOLDER, { recursive: true });

jest.mock('fs/promises', () => fs.promises);

beforeEach(() => {
  jest.resetAllMocks();
});

describe('prepare', () => {
  it('should create a plug rates file', async () => {
    await prepare();

    const file: Buffer = await FileSystem.readFile(RATES_CACHE_PATH);
    const fileContent: string = file.toString();

    expect(fileContent).toBe(RATES_PLUG);
  });
});
