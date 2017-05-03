function template(vo) {
  return `
    <!doctype html>
    <html lang="zh-CN">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
            <script src="/material.min.js"></script>
            <link rel="stylesheet" href="/material.min.css">
            <link rel="stylesheet" href="/font.css">
            <link rel="stylesheet" href="/index.css">
            ${vo.cssBundle ? '<link rel="stylesheet" type="text/css" href="' + vo.cssBundle + '">' : ''}
            <title>Create Shirt</title>
        </head>
        <body>
            <div id="root">${vo.root}</div>
            <script>window.__PRELOADED_STATE__ = ${JSON.stringify(vo.state).replace(/</g, '\\u003c')}</script>
            <script src="${vo.jsBundle}"></script>
        </body>
    </html>
  `;
}

export default template;
