import { NextRequest, NextResponse } from 'next/server';
import {
  renderEmailOutput,
  renderPageOutput,
  renderDocumentOutput,
  renderCanvasOutput,
  validateEmailWithClients,
} from '@/lib/render';
import { validateAllTemplates } from '@/lib/validate';
import { defaultReleaseData } from '@/data/defaultRelease';
import { defaultBrandTheme } from '@/theme/brand';
import { ReleaseData } from '@/data/release';
import { BrandTheme } from '@/theme/brand';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format') || 'summary';
  const download = searchParams.get('download') === 'true';

  try {
    if (format === 'summary') {
      const report = await validateAllTemplates(defaultReleaseData, defaultBrandTheme);
      return NextResponse.json({ success: true, report });
    }

    if (format === 'email') {
      const res = await renderEmailOutput(defaultReleaseData, defaultBrandTheme);
      if (download) {
        return new NextResponse(res.html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Disposition': `attachment; filename="prism-ui-v${defaultReleaseData.version}-email.html"`,
          },
        });
      }
      return NextResponse.json({ success: true, ...res });
    }

    if (format === 'page') {
      const res = await renderPageOutput(defaultReleaseData, defaultBrandTheme);
      if (download) {
        return new NextResponse(res.html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Disposition': `attachment; filename="prism-ui-v${defaultReleaseData.version}-page.html"`,
          },
        });
      }
      return NextResponse.json({ success: true, ...res });
    }

    if (format === 'document') {
      const res = await renderDocumentOutput(defaultReleaseData, defaultBrandTheme);
      const asPdf = searchParams.get('type') === 'pdf' || download;

      if (asPdf && res.pdf) {
        return new NextResponse(Buffer.from(res.pdf), {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="prism-ui-v${defaultReleaseData.version}-guide.pdf"`,
          },
        });
      }

      return NextResponse.json({
        success: true,
        valid: res.valid,
        diagnostics: res.diagnostics,
        outline: res.outline,
        html: res.html,
        hasPdf: !!res.pdf,
      });
    }

    if (format === 'canvas') {
      const res = await renderCanvasOutput(defaultReleaseData, defaultBrandTheme);
      const asPng = searchParams.get('type') === 'png' || download;

      if (asPng && res.image) {
        return new NextResponse(Buffer.from(res.image), {
          headers: {
            'Content-Type': 'image/png',
            'Content-Disposition': `attachment; filename="prism-ui-v${defaultReleaseData.version}-social.png"`,
          },
        });
      }

      return NextResponse.json({
        success: true,
        valid: res.valid,
        diagnostics: res.diagnostics,
        outline: res.outline,
        html: res.html,
        width: res.width,
        height: res.height,
      });
    }

    return NextResponse.json({ error: 'Unknown format requested' }, { status: 400 });
  } catch (err: any) {
    console.error('API render error:', err);
    return NextResponse.json({ error: err.message || 'Render failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const release: ReleaseData = body.release || defaultReleaseData;
    const theme: BrandTheme = body.theme || defaultBrandTheme;
    const format: string = body.format || 'email';
    const action: string = body.action || 'render';

    if (action === 'validate') {
      const report = await validateAllTemplates(release, theme);
      return NextResponse.json({ success: true, report });
    }

    if (format === 'email') {
      const res = await renderEmailOutput(release, theme);
      return NextResponse.json({ success: true, ...res });
    }

    if (format === 'page') {
      const res = await renderPageOutput(release, theme);
      return NextResponse.json({ success: true, ...res });
    }

    if (format === 'document') {
      const res = await renderDocumentOutput(release, theme);
      const base64Pdf = res.pdf ? Buffer.from(res.pdf).toString('base64') : null;
      return NextResponse.json({
        success: true,
        valid: res.valid,
        diagnostics: res.diagnostics,
        outline: res.outline,
        html: res.html,
        pdfBase64: base64Pdf,
      });
    }

    if (format === 'canvas') {
      const res = await renderCanvasOutput(release, theme);
      const base64Image = res.image ? Buffer.from(res.image).toString('base64') : null;
      return NextResponse.json({
        success: true,
        valid: res.valid,
        diagnostics: res.diagnostics,
        outline: res.outline,
        html: res.html,
        imageBase64: base64Image,
        width: res.width,
        height: res.height,
      });
    }

    return NextResponse.json({ error: 'Unsupported format' }, { status: 400 });
  } catch (err: any) {
    console.error('POST render error:', err);
    return NextResponse.json({ error: err.message || 'Render failed' }, { status: 500 });
  }
}
