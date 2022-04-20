import fs from 'fs/promises';

class FileSystem {
  /**
   * This method checks a file exists
   */
  public async fileExists(path: string): Promise<boolean> {
    try {
      await fs.access(path);

      return true;
    } catch (_) {
      return false;
    }
  }

  /**
   * This method reads a file
   */
  public async readFile(path: string): Promise<Buffer> {
    const file = await fs.readFile(path);

    return file;
  }

  /**
   * This method gets a file meta
   */
  public async getFileMeta(path: string) {
    const meta = await fs.stat(path);

    return meta;
  }

  /**
   * This method writes data to a file
   */
  public async writeFile(path: string, data: string) {
    await fs.writeFile(path, data);

    return true;
  }

  /**
   * Change the file system timestamps of the object referenced by path
   */
  public async utimes(path: string, atime: Date, mtime: Date): Promise<void> {
    await fs.utimes(path, atime, mtime);
  }
}

export default new FileSystem();
