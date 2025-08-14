addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let url = new URL(request.url);

  // Split path into parts
  let parts = url.pathname.split("/").filter(Boolean);
  if (parts.length === 0) {
    return new Response("No target specified in URL", { status: 400 });
  }

  let appName = parts[0];
  let newPath = parts.slice(1).join("/");

  let targetUrl;

  // If starts with "rd" -> go to Seedr
  if (appName.startsWith("rd")) {
    targetUrl = `https://${appName}.seedr.cc/${newPath}${url.search}`;
  } 
  else {
    targetUrl = `https://${appName}.seedr.cc/${newPath}${url.search}`;
  }

  // Forward request
  let newRequest = new Request(targetUrl, request);
  return fetch(newRequest);
}
