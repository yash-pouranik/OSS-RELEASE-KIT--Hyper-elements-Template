import React from 'react';
import { render, validate, outline } from '@hyper-elements/react';
import { renderPdf } from '@hyper-elements/react/pdf';
import { renderImage } from '@hyper-elements/react/image';
import ReleaseEmail from '../src/templates/email/ReleaseEmail';
import ReleasePage from '../src/templates/page/ReleasePage';
import ReleaseDocument from '../src/templates/document/ReleaseDocument';
import ReleaseCanvas from '../src/templates/canvas/ReleaseCanvas';
import { defaultReleaseData } from '../src/data/defaultRelease';
import { defaultBrandTheme } from '../src/theme/brand';

async function main() {
  console.log('=== 1. Validating ReleaseEmail ===');
  const emailEl = React.createElement(ReleaseEmail, { release: defaultReleaseData, theme: defaultBrandTheme });
  const emailVal = validate(emailEl);
  console.log('Email Valid:', emailVal.valid, 'Diagnostics:', emailVal.diagnostics);
  const emailOut = outline(emailEl);
  console.log('Email Outline Sample:', emailOut.slice(0, 150) + '...');
  const emailRender = await render(emailEl);
  console.log('Email HTML length:', emailRender.html.length, 'Text length:', emailRender.text.length);

  console.log('\n=== 2. Validating ReleasePage ===');
  const pageEl = React.createElement(ReleasePage, { release: defaultReleaseData, theme: defaultBrandTheme });
  const pageVal = validate(pageEl);
  console.log('Page Valid:', pageVal.valid, 'Diagnostics:', pageVal.diagnostics);
  const pageRender = await render(pageEl);
  console.log('Page HTML length:', pageRender.html.length);

  console.log('\n=== 3. Validating ReleaseDocument ===');
  const docEl = React.createElement(ReleaseDocument, { release: defaultReleaseData, theme: defaultBrandTheme });
  const docVal = validate(docEl);
  console.log('Document Valid:', docVal.valid, 'Diagnostics:', docVal.diagnostics);
  const docRender = await render(docEl);
  console.log('Document HTML length:', docRender.html.length);

  console.log('\n=== 4. Validating ReleaseCanvas ===');
  const canvasEl = React.createElement(ReleaseCanvas, { release: defaultReleaseData, theme: defaultBrandTheme });
  const canvasVal = validate(canvasEl);
  console.log('Canvas Valid:', canvasVal.valid, 'Diagnostics:', canvasVal.diagnostics);
  const canvasRender = await render(canvasEl);
  console.log('Canvas HTML length:', canvasRender.html.length);
}

main().catch(err => {
  console.error('Error running test:', err);
  process.exit(1);
});
