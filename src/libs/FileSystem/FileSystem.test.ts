import { fs as memFS, vol } from 'memfs';
import FileSystem from '.';

const fs = memFS.promises;

jest.mock('fs/promises', () => memFS.promises);

const filePath: string = '/bababooey.md';
const fileContent: string = '🗿';

describe('FileSystem', () => {
  afterEach(() => {
    vol.reset();
  });

  it('should check does a file exist and return true', async () => {
    await fs.writeFile(filePath, fileContent);

    const exists: boolean = await FileSystem.fileExists(filePath);

    expect(exists).toBe(true);
  });

  it('should check does a file exist and return false', async () => {
    const exists: boolean = await FileSystem.fileExists(filePath);

    expect(exists).toBe(false);
  });

  it('should read a file', async () => {
    await fs.writeFile(filePath, fileContent);
    const fileBuffer: Buffer = await FileSystem.readFile(filePath);
    const content: string = fileBuffer.toString();

    expect(content).toBe(fileContent);
  });

  it('should get a file meta', async () => {
    await fs.writeFile(filePath, fileContent);
    const meta: object = await fs.stat(filePath);

    const fileMeta: object = await FileSystem.getFileMeta(filePath);

    expect(fileMeta).toEqual(meta);
  });

  it('should write a file', async () => {
    await FileSystem.writeFile(filePath, fileContent);

    const file = await fs.readFile(filePath);
    const content: string = file.toString();

    expect(content).toBe(fileContent);
  });

  it('should change the file system timestamps of the object referenced by path', async () => {
    await fs.writeFile(filePath, fileContent);

    const date: Date = new Date(2022, 3, 11, 0, 0, 0);
    const dateTime: number = date.getTime();
    await FileSystem.utimes(filePath, date, date);

    const { atimeMs, mtimeMs } = await fs.stat(filePath);

    expect(atimeMs).toBe(dateTime);
    expect(mtimeMs).toBe(dateTime);
  });
});
