import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting Hostinger deployment process...');

try {
  // Step 1: Build the project
  console.log('📦 Building the project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Step 2: Create deployment directory
  const deployDir = 'hostinger-deploy';
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true, force: true });
  }
  fs.mkdirSync(deployDir, { recursive: true });

  // Step 3: Copy built files
  console.log('📁 Copying built files...');
  const distDir = 'dist';
  if (fs.existsSync(distDir)) {
    // Copy all files from dist to hostinger-deploy
    const copyRecursive = (src, dest) => {
      const entries = fs.readdirSync(src, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
          fs.mkdirSync(destPath, { recursive: true });
          copyRecursive(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };
    
    copyRecursive(distDir, deployDir);
  }

  // Step 4: Copy .htaccess file
  if (fs.existsSync('.htaccess')) {
    fs.copyFileSync('.htaccess', path.join(deployDir, '.htaccess'));
    console.log('✅ .htaccess file copied');
  }

  // Step 5: Create public_html structure
  const publicHtmlDir = path.join(deployDir, 'public_html');
  if (!fs.existsSync(publicHtmlDir)) {
    fs.mkdirSync(publicHtmlDir, { recursive: true });
  }

  // Move all files to public_html
  const files = fs.readdirSync(deployDir);
  for (const file of files) {
    if (file !== 'public_html') {
      const srcPath = path.join(deployDir, file);
      const destPath = path.join(publicHtmlDir, file);
      if (fs.statSync(srcPath).isDirectory()) {
        if (fs.existsSync(destPath)) {
          fs.rmSync(destPath, { recursive: true, force: true });
        }
        fs.renameSync(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
        fs.unlinkSync(srcPath);
      }
    }
  }

  console.log('✅ Hostinger deployment files ready!');
  console.log('📁 Deployment files are in: hostinger-deploy/public_html/');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Upload the contents of hostinger-deploy/public_html/ to your Hostinger public_html folder');
  console.log('2. Make sure your domain is pointing to the correct directory');
  console.log('3. Test your website to ensure everything is working');
  console.log('');
  console.log('🔗 Your website should be accessible at your domain name');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}