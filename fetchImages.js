fetch('https://sparshhospitals.com/')
  .then(res => res.text())
  .then(html => {
    const matches = html.match(/<img[^>]+src="([^">]+)"/g);
    const urls = matches.map(m => m.match(/src="([^">]+)"/)[1]).filter(u => u.includes('sparsh'));
    console.log([...new Set(urls)].join('\n'));
  });
