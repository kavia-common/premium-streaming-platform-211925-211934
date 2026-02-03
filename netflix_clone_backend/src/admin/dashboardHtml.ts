export function renderAdminDashboardHtml(): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Netflix Clone Admin</title>
  <style>
    :root { color-scheme: dark; }
    body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; background: #0b0b0b; color: #e5e7eb; }
    header { padding: 18px 22px; border-bottom: 1px solid #1f2937; display:flex; align-items:center; justify-content:space-between; }
    header h1 { font-size: 16px; margin: 0; letter-spacing: 0.02em; }
    main { padding: 18px 22px; max-width: 1100px; margin: 0 auto; }
    .row { display:flex; gap: 12px; flex-wrap: wrap; margin: 12px 0; }
    input, textarea { background:#111827; color:#e5e7eb; border:1px solid #374151; border-radius:10px; padding:10px 12px; outline:none; }
    textarea { width: 100%; min-height: 72px; }
    button { background:#e50914; color:white; border:0; border-radius:10px; padding:10px 12px; cursor:pointer; font-weight:600; }
    button.secondary { background:#374151; }
    .card { background:#0f172a; border:1px solid #1f2937; border-radius:14px; padding:14px; }
    .card h2 { font-size: 14px; margin: 0 0 10px 0; }
    pre { background:#0b1220; border:1px solid #1f2937; border-radius:12px; padding:12px; overflow:auto; }
    .muted { color:#9ca3af; font-size: 12px; }
    .ok { color:#10b981; }
    .err { color:#ef4444; }
  </style>
</head>
<body>
  <header>
    <h1>Netflix Clone Admin</h1>
    <div class="muted">API: <code>/admin/api</code></div>
  </header>

  <main>
    <div class="card">
      <h2>Auth token</h2>
      <div class="row">
        <input id="token" type="password" placeholder="ADMIN_API_TOKEN" style="min-width:320px" />
        <button class="secondary" id="saveToken">Save token</button>
        <span id="tokenStatus" class="muted"></span>
      </div>
      <div class="muted">Requests send <code>Authorization: Bearer &lt;token&gt;</code>.</div>
    </div>

    <div class="row">
      <div class="card" style="flex:1; min-width: 320px;">
        <h2>Health</h2>
        <button id="checkHealth">GET /health</button>
        <pre id="healthOut"></pre>
      </div>

      <div class="card" style="flex:1; min-width: 320px;">
        <h2>Mock data</h2>
        <div class="row">
          <button class="secondary" id="getMock">GET /mock-data</button>
          <button id="resetMock">POST /mock-data (reset)</button>
        </div>
        <pre id="mockOut"></pre>
      </div>
    </div>

    <div class="row">
      <div class="card" style="flex:1; min-width: 320px;">
        <h2>Feature flags</h2>
        <div class="row">
          <button class="secondary" id="getFlags">GET /feature-flags</button>
          <button id="setFlags">POST /feature-flags</button>
        </div>
        <textarea id="flagsBody" spellcheck="false">{ "enableKidsMode": true }</textarea>
        <pre id="flagsOut"></pre>
      </div>

      <div class="card" style="flex:1; min-width: 320px;">
        <h2>Content</h2>
        <div class="row">
          <button class="secondary" id="listContent">GET /content</button>
          <button id="createContent">POST /content</button>
        </div>
        <textarea id="contentBody" spellcheck="false">{ "title": "New Title", "type": "series", "genre": "Drama", "year": 2024 }</textarea>
        <pre id="contentOut"></pre>
      </div>
    </div>

    <div class="card">
      <h2>Update/Delete content by id</h2>
      <div class="row">
        <input id="contentId" placeholder="content id (e.g., t_001)" style="min-width:260px"/>
        <button class="secondary" id="updateContent">PUT /content/:id</button>
        <button id="deleteContent">DELETE /content/:id</button>
      </div>
      <textarea id="contentPatchBody" spellcheck="false">{ "title": "Updated Title" }</textarea>
      <pre id="contentMutOut"></pre>
      <div class="muted">Tip: list content first to grab an id.</div>
    </div>
  </main>

<script>
  const apiBase = '/admin/api';

  function getToken() {
    return localStorage.getItem('adminToken') || '';
  }
  function setToken(v) {
    localStorage.setItem('adminToken', v);
  }

  const tokenInput = document.getElementById('token');
  const tokenStatus = document.getElementById('tokenStatus');
  tokenInput.value = getToken();
  tokenStatus.textContent = tokenInput.value ? 'token loaded' : 'no token';

  document.getElementById('saveToken').addEventListener('click', () => {
    setToken(tokenInput.value.trim());
    tokenStatus.textContent = tokenInput.value.trim() ? 'token saved' : 'no token';
  });

  async function callApi(path, opts = {}) {
    const token = getToken();
    const headers = Object.assign(
      { 'Accept': 'application/json' },
      opts.headers || {},
      token ? { 'Authorization': 'Bearer ' + token } : {}
    );
    const res = await fetch(apiBase + path, Object.assign({}, opts, { headers }));
    const text = await res.text();
    let json;
    try { json = text ? JSON.parse(text) : null; } catch { json = { raw: text }; }
    return { ok: res.ok, status: res.status, json };
  }

  function setOut(el, result) {
    el.textContent = JSON.stringify(result, null, 2);
    el.className = result && result.ok ? 'ok' : 'err';
  }

  document.getElementById('checkHealth').addEventListener('click', async () => {
    setOut(document.getElementById('healthOut'), await callApi('/health'));
  });

  document.getElementById('getMock').addEventListener('click', async () => {
    setOut(document.getElementById('mockOut'), await callApi('/mock-data'));
  });
  document.getElementById('resetMock').addEventListener('click', async () => {
    setOut(document.getElementById('mockOut'), await callApi('/mock-data', { method: 'POST' }));
  });

  document.getElementById('getFlags').addEventListener('click', async () => {
    setOut(document.getElementById('flagsOut'), await callApi('/feature-flags'));
  });
  document.getElementById('setFlags').addEventListener('click', async () => {
    const body = document.getElementById('flagsBody').value;
    setOut(document.getElementById('flagsOut'), await callApi('/feature-flags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    }));
  });

  document.getElementById('listContent').addEventListener('click', async () => {
    setOut(document.getElementById('contentOut'), await callApi('/content'));
  });
  document.getElementById('createContent').addEventListener('click', async () => {
    const body = document.getElementById('contentBody').value;
    setOut(document.getElementById('contentOut'), await callApi('/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    }));
  });

  document.getElementById('updateContent').addEventListener('click', async () => {
    const id = document.getElementById('contentId').value.trim();
    const body = document.getElementById('contentPatchBody').value;
    setOut(document.getElementById('contentMutOut'), await callApi('/content/' + encodeURIComponent(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body
    }));
  });

  document.getElementById('deleteContent').addEventListener('click', async () => {
    const id = document.getElementById('contentId').value.trim();
    setOut(document.getElementById('contentMutOut'), await callApi('/content/' + encodeURIComponent(id), {
      method: 'DELETE'
    }));
  });
</script>
</body>
</html>`;
}
