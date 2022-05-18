const path = require('path');
const fs = require('fs/promises');
const { constants } = require('fs');

const REMOTE_URLS_FILE = path.join(process.cwd(), 'remotes.txt');

const getRemoteUrls = async () => {
  try {
    const file = REMOTE_URLS_FILE;
    const mode = constants.R_OK;
    await fs.access(file, mode);

    const content = await fs.readFile(file, { encoding: 'utf-8' });

    if (!content.length) {
      return [];
    }

    return content.split('\n');
  } catch {
    return [];
  }
};

const spectateRemote = async (gameUrl) => {
  const remotes = await getRemoteUrls();
  const { default: fetch } = await import('node-fetch');

  const tasks = remotes
    .filter((specUrl) => specUrl.length)
    .map((specUrl) =>
      fetch(`${specUrl}/spectate`, {
        method: 'PUT',
        body: JSON.stringify({ gameUrl }),
        headers: { 'Content-Type': 'application/json' },
      }),
    );

  return Promise.all(tasks);
};

module.exports = {
  spectateRemote,
};
