import { SITE } from "@/lib/site";

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>${SITE.name}</ShortName>
  <Description>${SITE.description}</Description>
  <Tags>dating friendship anonymous chat stranger omegle</Tags>
  <Contact>${SITE.contact.support}</Contact>
  <Url type="text/html" template="${SITE.url}/topics/{searchTerms}"/>
  <Image width="32" height="32" type="image/x-icon">${SITE.url}/favicon.ico</Image>
  <Image width="64" height="64" type="image/svg+xml">${SITE.url}/icon.svg</Image>
  <Developer>Anonmee</Developer>
</OpenSearchDescription>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/opensearchdescription+xml; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
}
