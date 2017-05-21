function template(vo) {
  return `
    <!doctype html>
    <html lang="zh-CN">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
            <script src="/material.min.js"></script>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto'>
            <link rel="stylesheet" href="/material.min.css">
            <link rel="stylesheet" href="/index.css">
            ${vo.cssBundle ? '<link rel="stylesheet" href="' + vo.cssBundle + '">' : ''}
            <title>T舍网</title>
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
