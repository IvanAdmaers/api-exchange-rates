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

  /**
   * Change the file system timestamps of the object referenced by path
   *
   * @param {string} path - Path to file
   * @param {Date} atime - Atime
   * @param {Date} mtime - Mtime
   * @returns {<Promise>undefined}
   */
  async utimes(path, atime, mtime) {
    await fs.utimes(path, atime, mtime);
  }
}

export default new FileSystem();
