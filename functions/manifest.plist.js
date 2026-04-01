export async function onRequest(context) {
  const REPO = 'darkflareplays8/dsd';

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'dsdirect-pages' }
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = await res.json();

    const asset = data.assets && data.assets[0];
    if (!asset) throw new Error('No asset on latest release');

    const ipaUrl = asset.browser_download_url;
    const version = (data.tag_name || '').replace(/^v/i, '');

    const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>items</key>
  <array>
    <dict>
      <key>assets</key>
      <array>
        <dict>
          <key>kind</key>
          <string>software-package</string>
          <key>url</key>
          <string>${ipaUrl}</string>
        </dict>
      </array>
      <key>metadata</key>
      <dict>
        <key>bundle-identifier</key>
        <string>com.gloop.deltamobile</string>
        <key>bundle-version</key>
        <string>${version}</string>
        <key>kind</key>
        <string>software</string>
        <key>title</key>
        <string>Delta Executor</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>`;

    return new Response(plist, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-store'
      }
    });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}
