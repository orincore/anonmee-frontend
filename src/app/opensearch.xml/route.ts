import { SITE } from "@/lib/site";

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>${SITE.appName}</ShortName>
  <Description>${SITE.description}</Description>
  <Tags>anonmee dating app anonymous chat stranger omegle friendship</Tags>
  <Contact>${SITE.contact.support}</Contact>
  <Url type="text/html" template="${SITE.url}/topics/{searchTerms}"/>
  <Image width="32" height="32" type="image/x-icon">${SITE.url}/favicon.ico</Image>
  <Image width="128" height="128" type="image/png">${SITE.url}/anonme-logo.png</Image>
  <Developer>Anonmee</Developer>
</OpenSearchDescription>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/opensearchdescription+xml; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
}
