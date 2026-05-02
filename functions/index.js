export async function onRequest(context) {
  const REPO = 'darkflareplays8/dsd';
  const response = await context.env.ASSETS.fetch(context.request);

  let description = 'Install Delta Executor directly on iOS via VoidHub. No ads. No BS. Open source.';
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'dsdirect-pages' }
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    const version = (data.tag_name || '').replace(/^v/i, '');
    if (version) description = `Install Delta Executor directly on iOS via VoidHub. No ads. No BS. Open source. Current Version: ${version}`;
  } catch (_) {}

  return new HTMLRewriter()
    .on('meta[name="description"]', {
      element(el) { el.setAttribute('content', description); }
    })
    .on('meta[property="og:description"]', {
      element(el) { el.setAttribute('content', description); }
    })
    .transform(response);
}
