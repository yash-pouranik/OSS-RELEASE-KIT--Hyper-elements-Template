import fs from 'fs';
import path from 'path';
import {
  renderEmailOutput,
  renderPageOutput,
  renderDocumentOutput,
  renderCanvasOutput,
} from '../src/lib/render';
import { validateAllTemplates } from '../src/lib/validate';
import { defaultReleaseData } from '../src/data/defaultRelease';
import { defaultBrandTheme } from '../src/theme/brand';

async function generateOutputs() {
  console.log('🚀 Generating OSS Release Kit Sample Deliverables...');
  const outDir = path.join(process.cwd(), 'outputs');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Validation Report
  console.log('1️⃣  Running validation across all four templates...');
  const validation = await validateAllTemplates(defaultReleaseData, defaultBrandTheme);
  fs.writeFileSync(
    path.join(outDir, 'validation-report.json'),
    JSON.stringify(validation, null, 2),
    'utf8'
  );
  console.log('   ✓ validation-report.json created.');

  // 2. Email HTML
  console.log('2️⃣  Rendering Release Announcement Email (<Email>)...');
  const emailRes = await renderEmailOutput(defaultReleaseData, defaultBrandTheme);
  fs.writeFileSync(path.join(outDir, 'prism-ui-v2.0.0-email.html'), emailRes.html, 'utf8');
  console.log(`   ✓ prism-ui-v2.0.0-email.html saved (${emailRes.html.length.toLocaleString()} bytes).`);

  // 3. Page HTML
  console.log('3️⃣  Rendering Developer Release Web Page (<Page>)...');
  const pageRes = await renderPageOutput(defaultReleaseData, defaultBrandTheme);
  fs.writeFileSync(path.join(outDir, 'prism-ui-v2.0.0-page.html'), pageRes.html, 'utf8');
  console.log(`   ✓ prism-ui-v2.0.0-page.html saved (${pageRes.html.length.toLocaleString()} bytes).`);

  // 4. Document PDF
  console.log('4️⃣  Rendering PDF Release & Migration Guide (<Document>)...');
  const docRes = await renderDocumentOutput(defaultReleaseData, defaultBrandTheme);
  fs.writeFileSync(path.join(outDir, 'prism-ui-v2.0.0-guide.pdf'), Buffer.from(docRes.pdf));
  fs.writeFileSync(path.join(outDir, 'prism-ui-v2.0.0-guide-print.html'), docRes.html, 'utf8');
  console.log(`   ✓ prism-ui-v2.0.0-guide.pdf saved (${docRes.pdf.length.toLocaleString()} bytes).`);

  // 5. Canvas PNG
  console.log('5️⃣  Rendering Social Media Release Graphic (<Canvas>)...');
  const canvasRes = await renderCanvasOutput(defaultReleaseData, defaultBrandTheme);
  fs.writeFileSync(path.join(outDir, 'prism-ui-v2.0.0-social.png'), Buffer.from(canvasRes.image));
  console.log(`   ✓ prism-ui-v2.0.0-social.png saved (${canvasRes.image.length.toLocaleString()} bytes, ${canvasRes.width}x${canvasRes.height}).`);

  console.log('\n✨ All 4 deliverables generated successfully with zero errors!\n');
}

generateOutputs().catch((err) => {
  console.error('Fatal error generating outputs:', err);
  process.exit(1);
});
