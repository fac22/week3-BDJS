function buildPage(title, content) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Place your coffee order">
   <title>${title}</title>
   </head>
   <body>
   ${content}
   </body>`;
}

module.exports = { buildPage };
