import fs from 'fs/promises';

class FileSystem {
  async fileExists(path) {
    try {
      await fs.access(path);

      return true;
    } catch (_) {
      return false;
    }
  }

  async readFile(path) {
    const file = await fs.readFile(path);

    return file;
  }

  async getFileMeta(path) {
    const meta = await fs.stat(path);

    return meta;
  }
}

export default new FileSystem();
