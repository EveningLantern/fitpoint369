const fs = require('fs');
const path = require('path');
const dir = './src/pages/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  if (file === 'Home.jsx') return;

  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const regex = /<footer className="site-footer"[\s\S]*?<\/footer>/;
  const match = content.match(regex);
  if (match) {
    let footerReplacement = '<Footer />';
    if (match[0].includes("marginTop: 'auto'")) {
       footerReplacement = '<Footer style={{ marginTop: \'auto\' }} />';
    } else if (match[0].includes("position: 'relative', zIndex: 1")) {
       footerReplacement = '<Footer style={{ position: \'relative\', zIndex: 1 }} />';
    }
    content = content.replace(regex, footerReplacement);
    
    // add import Footer
    if (!content.includes("import Footer from")) {
       content = "import Footer from '../components/Footer.jsx';\n" + content;
    }

    fs.writeFileSync(filePath, content);
    console.log('Updated', file);
  }
});
