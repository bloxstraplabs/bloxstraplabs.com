import fs from 'fs';

const url = "https://api.github.com/repos/bloxstraplabs/bloxstrap/releases?per_page=100";
const headers = {
  "Accept": "application/vnd.github+json",
  // "Authorization": "Bearer <YOUR-TOKEN>",
  "X-GitHub-Api-Version": "2026-03-10"
};

console.log("Getting release data from Github...");

const response = await fetch(url, { headers: headers });
const data = await response.json();

console.log(`Got release data (${data.length} releases)`);

let version_data = data.map(({
    name,
    tag_name,
    html_url,
    body,
    published_at,
    assets
  }) => ({
    version: tag_name.substring(1),
    published_at,
    url: html_url,
    name,
    body,
    assets: assets.map(({ name, size, browser_download_url }) => ({ name, size, url: browser_download_url }))
  }));

fs.writeFile("src/data/generated/versions.json", JSON.stringify(version_data, null, 4), 'utf-8', () => console.log('Data written'));
