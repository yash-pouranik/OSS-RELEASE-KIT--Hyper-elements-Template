import React from 'react';
import fs from 'fs';
import path from 'path';
import { validate, render } from '@hyper-elements/react';
import { emailClients, renderInEmailClients } from '@hyper-elements/email-clients';
import { renderPdf } from '@hyper-elements/react/pdf';
import { renderImage } from '@hyper-elements/react/image';
import ReleaseEmail from '../src/templates/email/ReleaseEmail';
import ReleaseDocument from '../src/templates/document/ReleaseDocument';
import ReleaseCanvas from '../src/templates/canvas/ReleaseCanvas';
import { defaultReleaseData } from '../src/data/defaultRelease';
import { defaultBrandTheme } from '../src/theme/brand';

async function testAdvanced() {
  console.log('=== Testing Email Clients Validation ===');
  const emailEl = React.createElement(ReleaseEmail, { release: defaultReleaseData, theme: defaultBrandTheme });
  
  try {
    const plugin = await emailClients();
    const emailCheck = validate(emailEl, { plugins: [plugin] });
    console.log('Email with client plugins valid:', emailCheck.valid, 'Diagnostics count:', emailCheck.diagnostics.length);
  } catch (e) {
    console.log('emailClients plugin error:', e);
  }

  console.log('\n=== Testing renderPdf ===');
  const docEl = React.createElement(ReleaseDocument, { release: defaultReleaseData, theme: defaultBrandTheme });
  try {
    const pdfRes = await renderPdf(docEl);
    console.log('renderPdf success! PDF byte length:', pdfRes.pdf.length, 'Diagnostics:', pdfRes.diagnostics);
  } catch (e) {
    console.log('renderPdf error:', e);
  }

  console.log('\n=== Testing renderImage ===');
  const fontBuffer = fs.readFileSync(path.join(__dirname, '../src/fonts/Inter-Regular.ttf'));
  const canvasEl = React.createElement(ReleaseCanvas, { release: defaultReleaseData, theme: defaultBrandTheme });
  try {
    const imgRes = await renderImage(canvasEl, {
      fonts: [
        {
          family: 'Inter',
          src: fontBuffer,
          weight: 400,
          style: 'normal',
        },
      ],
      strict: false,
    });
    console.log('renderImage success! Image byte length:', imgRes.image.length, 'Width:', imgRes.width, 'Height:', imgRes.height, 'Diagnostics:', imgRes.diagnostics);
  } catch (e) {
    console.log('renderImage error:', e);
  }
}

testAdvanced().catch(console.error);
