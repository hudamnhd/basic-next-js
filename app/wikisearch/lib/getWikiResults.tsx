export default async function getWikiResults(query: string) {
  const searchParams = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrlimit: "20",
    prop: "pageimages|extracts",
    exchars: "100",
    exinto: "true",
    explaintext: "true",
    exlimit: "max",
    format: "json",
    origin: "*",
  });

  const res = await fetch("https://en.wikipedia.org/w/api.php?" + searchParams);
  return res.json();
}
