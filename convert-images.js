const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function convertImagesToWebP() {
  const inputDir = path.join(__dirname, 'public', 'images');
  const images = [
    { input: 'club_hero_banner.jpeg', output: 'club_hero_banner.webp' },
    { input: 'club_team.jpeg', output: 'club_team.webp' }
  ];

  for (const image of images) {
    const inputPath = path.join(inputDir, image.input);
    const outputPath = path.join(inputDir, image.output);
    
    try {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`✅ Converted ${image.input} to ${image.output}`);
      
      // Remove the original JPEG file
      fs.unlinkSync(inputPath);
      console.log(`🗑️  Removed original ${image.input}`);
    } catch (error) {
      console.error(`❌ Error converting ${image.input}:`, error);
    }
  }
}

convertImagesToWebP();
