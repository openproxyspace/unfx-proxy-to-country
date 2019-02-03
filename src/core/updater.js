import rp from 'request-promise';
import { remote } from 'electron';
import { sort } from 'js-flock';

const {
    app: { getVersion }
} = remote;

export const currentVersion = getVersion();

export const getLatestVersionInfo = async () => {
    try {
        const releases = await rp.get({
            url: 'https://api.github.com/repos/assnctr/unfx-proxy-to-country/releases',
            json: true,
            timeout: 5000,
            headers: {
                'User-Agent': 'Unfx Version Lookup'
            }
        });

        const [latest] = releases;
        const version = latest.tag_name.slice(1);

        if (version > currentVersion) {
            const releaseNotes = releases
                .filter(item => item.tag_name.slice(1) > currentVersion)
                .map(item => ({
                    version: item.tag_name.slice(1),
                    body: item.body
                }));

            sort(latest.assets).desc(item => item.size);

            const assets = {
                windows: latest.assets.filter(asset => asset.name.match(/win|nsis/i)),
                linux: latest.assets.filter(asset => asset.name.match(/linux/i))
            };

            return {
                latestVersion: version,
                releaseNotes,
                assets
            };
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};
