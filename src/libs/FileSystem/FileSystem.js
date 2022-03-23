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

  async writeFile(path, data) {
    await fs.writeFile(path, data);

    return true;
  }
}

export default new FileSystem();
