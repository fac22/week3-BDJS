function buildPage(title, content) {
  return /*html*/ `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Place your coffee order">
      <link rel="stylesheet" href="/style.css">
      <link rel="preconnect" href="https://fonts.googleapis.com/%22%3E
      <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@800;900&display=swap" rel="stylesheet">
      <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" rel="stylesheet">
   <title>${title}</title>
   </head>
   <body>
   <header><h1>CoffeeWish<h1></header>
   <main><section><div class="main">${content}<div></section></main>
   </body>`;
}

module.exports = { buildPage };
