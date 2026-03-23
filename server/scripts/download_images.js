const fs = require('fs');
const https = require('https');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        }).on('error', (err) => {
          fs.unlink(dest, () => reject(err));
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

const run = async () => {
  const catDir = path.join(__dirname, '../public/uploads/categories');
  const prodDir = path.join(__dirname, '../public/uploads/products');
  
  // Ensure directories exist
  if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });
  if (!fs.existsSync(prodDir)) fs.mkdirSync(prodDir, { recursive: true });

  const catImages = [
    'cat_rtw.jpg', 'cat_footwear.jpg', 'cat_bag.jpg', 'cat_accessories.jpg'
  ];
  const prodImages = [
    'prod_rtw_1.jpg', 'prod_rtw_2.jpg', 'prod_rtw_3.jpg',
    'prod_shoes_1.jpg', 'prod_shoes_2.jpg', 'prod_shoes_3.jpg',
    'prod_bags_1.jpg', 'prod_bags_2.jpg', 'prod_bags_3.jpg',
    'prod_acc_1.jpg', 'prod_acc_2.jpg', 'prod_acc_3.jpg'
  ];

  console.log('Downloading category images...');
  for (const name of catImages) {
    await download('https://picsum.photos/600/400', path.join(catDir, name));
    console.log('Downloaded', name);
  }

  console.log('Downloading product images...');
  for (const name of prodImages) {
    await download('https://picsum.photos/500/600', path.join(prodDir, name));
    console.log('Downloaded', name);
  }

  console.log('Done downloading images.');
};

run().catch(console.error);
