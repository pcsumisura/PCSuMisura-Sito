// Dopo la build crea una index.html per ogni pagina (computer, assistenza),
// cosi' ogni indirizzo esiste davvero su GitHub Pages e risponde con codice 200.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const dir = process.argv[2] || 'docs'
const base = readFileSync(`${dir}/index.html`, 'utf8')

const pages = {
  computer: {
    title: 'PC su misura, upgrade e componenti | PC su Misura',
    description: 'PC assemblati su misura, nuovi o usati, upgrade hardware e componenti scelti in base a come li usi.',
  },
  assistenza: {
    title: 'Assistenza informatica per aziende e privati | PC su Misura',
    description: 'Assistenza informatica, reti, backup, sicurezza e gestione dei computer per aziende, studi e privati.',
  },
}

for (const [name, m] of Object.entries(pages)) {
  let html = base
    .replace(/<title>.*?<\/title>/, `<title>${m.title}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${m.description}" />`)
  html = html.replace('</head>', `    <link rel="canonical" href="https://pcsumisura.net/${name}/" />\n  </head>`)
  mkdirSync(`${dir}/${name}`, { recursive: true })
  writeFileSync(`${dir}/${name}/index.html`, html)
}

// canonical anche per la home
writeFileSync(
  `${dir}/index.html`,
  base.replace('</head>', '    <link rel="canonical" href="https://pcsumisura.net/" />\n  </head>'),
)
console.log('Pagine create: /computer/ e /assistenza/')
