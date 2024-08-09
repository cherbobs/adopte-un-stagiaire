function makeHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function makeUrl(path: string) {
  const slashlessPath = path.startsWith("/") ? path.slice(1) : path;
  const domainResponse = await fetch("/api-info.json");
  if (!domainResponse.ok) {
    throw new Error(`Failed to fetch domain information: ${domainResponse.statusText}`);
  }
  const { domain } = await domainResponse.json();
  const domainSlash = domain.endsWith("/") ? domain : `${domain}/`;
  return `${domainSlash}${slashlessPath}`;
}

export async function authenticatedGet(token: string, path: string) {
  const url = await makeUrl(path);
  const headers = makeHeaders(token);
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Expected JSON response from server");
  }

  const data = await response.json();
  return data;
}


export async function authenticatedPost<T>(token: string, path: string, body: T) {
  const url = await makeUrl(path);
  const headers = makeHeaders(token);
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}
