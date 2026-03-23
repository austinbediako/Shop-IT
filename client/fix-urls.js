const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.js')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    
    // Replace src={`${apiURL}/uploads/folder/${variable}`}
    // We want: src={variable.match(/^https?:\/\//) ? variable : `${apiURL}/uploads/folder/${variable}`}
    content = content.replace(/`\$\{apiURL\}\/uploads\/([a-zA-Z0-9_-]+)\/\$\{([^}]+)\}`/g, (match, folder, variable) => {
        return `${variable}.match(/^https?:\\/\\//) ? ${variable} : \`\${apiURL}/uploads/${folder}/\${${variable}}\``;
    });

    // Replace background-image logic which might be plain string
    // e.g. backgroundImage: `url(${apiURL}/uploads/customize/${item.slideImage})`
    // We want: backgroundImage: `url(${item.slideImage.match(/^https?:\/\//) ? item.slideImage : `${apiURL}/uploads/customize/${item.slideImage}`})`
    content = content.replace(/`url\(\$\{apiURL\}\/uploads\/([a-zA-Z0-9_-]+)\/\$\{([^}]+)\}\)`/g, (match, folder, variable) => {
        return `\`url(\${${variable}.match(/^https?:\\/\\//) ? ${variable} : \`\${apiURL}/uploads/${folder}/\${${variable}}\`})\``;
    });

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});

console.log('Done!');
