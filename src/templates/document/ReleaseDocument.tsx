import React from 'react';
import {
  Document,
  PageHeader,
  PageFooter,
  PageNumber,
  Row,
  Column,
  Heading,
  Text,
  Table,
  TableRow,
  TableCell,
  Divider,
  Span,
  LineBreak,
} from '@hyper-elements/react';
import { ReleaseData } from '../../data/release';
import { defaultReleaseData } from '../../data/defaultRelease';
import { BrandTheme, defaultBrandTheme } from '../../theme/brand';

export interface ReleaseDocumentProps {
  release?: ReleaseData;
  theme?: BrandTheme;
}

export const PreviewProps: ReleaseDocumentProps = {
  release: defaultReleaseData,
  theme: defaultBrandTheme,
};

export default function ReleaseDocument({
  release = defaultReleaseData,
  theme = defaultBrandTheme,
}: ReleaseDocumentProps = PreviewProps) {
  return (
    <Document
      size="A4"
      lang="en"
      orientation="portrait"
      margin={48}
      title={`${release.projectName} v${release.version} Release & Migration Guide`}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.textPrimary,
        fontSize: 13,
        lineHeight: 1.5,
        backgroundColor: '#ffffff',
      }}
    >
      {/* Running Header on every page */}
      <PageHeader
        style={{
          padding: [0, 0, 12, 0],
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Column style={{ gap: 2 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: theme.textPrimary,
                letterSpacing: 0.5,
              }}
            >
              {release.projectName.toUpperCase()} TECHNICAL SPECIFICATION
            </Text>
            <Text style={{ fontSize: 10, color: theme.textMuted }}>
              RELEASE &amp; MIGRATION GUIDE • VERSION {release.version}
            </Text>
          </Column>

          <Text
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: theme.primary,
              textTransform: 'uppercase',
            }}
          >
            CONFIDENTIAL &amp; OSS PUBLIC SPEC
          </Text>
        </Row>
      </PageHeader>

      {/* Running Footer on every page */}
      <PageFooter
        style={{
          padding: [12, 0, 0, 0],
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 9, color: theme.textMuted }}>
            {release.projectName} Core Architecture • Generated with OSS Release Kit
          </Text>
          <Text style={{ fontSize: 9, color: theme.textMuted, fontWeight: 600 }}>
            Page <PageNumber /> of <PageNumber total />
          </Text>
        </Row>
      </PageFooter>

      {/* Page 1: Executive Summary & Technical Metrics */}
      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 6 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: theme.primary,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Engineering Release Documentation
          </Text>
          <Heading
            level={1}
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: theme.textPrimary,
              letterSpacing: -0.5,
            }}
          >
            {release.projectName} v{release.version}: Architecture &amp; Migration
          </Heading>
          <Text style={{ fontSize: 12, color: theme.textSecondary }}>
            Published: {release.releaseDate} • Release Type: {release.releaseType.toUpperCase()}
          </Text>
        </Column>

        <Divider style={{ borderTop: `1px solid ${theme.borderColor}` }} />

        {/* Overview Box */}
        <Column
          style={{
            padding: 14,
            backgroundColor: theme.bgCardSubtle,
            borderRadius: theme.borderRadius,
            border: `1px solid ${theme.borderColor}`,
            gap: 6,
          }}
        >
          <Heading level={3} style={{ fontSize: 14, fontWeight: 700 }}>
            1. Executive Overview
          </Heading>
          <Text style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.5 }}>
            {release.summary}
          </Text>
        </Column>

        {/* Verification & Performance Benchmark Table */}
        <Column style={{ gap: 8 }}>
          <Heading level={3} style={{ fontSize: 14, fontWeight: 700 }}>
            2. Performance Benchmarks &amp; Quality Metrics
          </Heading>

          <Table
            style={{
              cellPadding: [8, 10],
              rowBorder: `1px solid ${theme.borderColor}`,
              border: `1px solid ${theme.borderColor}`,
              borderCollapse: 'collapse',
            }}
          >
            <TableRow header style={{ backgroundColor: theme.bgCardSubtle }}>
              <TableCell style={{ fontSize: 11, fontWeight: 700, color: theme.textPrimary }}>
                Benchmark Metric
              </TableCell>
              <TableCell style={{ fontSize: 11, fontWeight: 700, color: theme.textPrimary, textAlign: 'center' }}>
                v1.x Legacy
              </TableCell>
              <TableCell style={{ fontSize: 11, fontWeight: 700, color: theme.primary, textAlign: 'center' }}>
                v2.0 Verified
              </TableCell>
              <TableCell style={{ fontSize: 11, fontWeight: 700, color: '#166534', textAlign: 'right' }}>
                Impact
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ fontSize: 11 }}>Core Bundle Footprint (gzip)</TableCell>
              <TableCell style={{ fontSize: 11, textAlign: 'center', color: theme.textSecondary }}>14.5 kB</TableCell>
              <TableCell style={{ fontSize: 11, textAlign: 'center', fontWeight: 700, color: theme.primary }}>8.4 kB</TableCell>
              <TableCell style={{ fontSize: 11, textAlign: 'right', fontWeight: 600, color: '#166534' }}>-42% reduction</TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ fontSize: 11 }}>Initial Input Latency (INP)</TableCell>
              <TableCell style={{ fontSize: 11, textAlign: 'center', color: theme.textSecondary }}>28 ms</TableCell>
              <TableCell style={{ fontSize: 11, textAlign: 'center', fontWeight: 700, color: theme.primary }}>16 ms</TableCell>
              <TableCell style={{ fontSize: 11, textAlign: 'right', fontWeight: 600, color: '#166534' }}>+43% faster</TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ fontSize: 11 }}>Automated Test Coverage</TableCell>
              <TableCell style={{ fontSize: 11, textAlign: 'center', color: theme.textSecondary }}>91.2%</TableCell>
              <TableCell style={{ fontSize: 11, textAlign: 'center', fontWeight: 700, color: theme.primary }}>99.4%</TableCell>
              <TableCell style={{ fontSize: 11, textAlign: 'right', fontWeight: 600, color: '#166534' }}>+8.2% delta</TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ fontSize: 11 }}>W3C / WCAG Accessibility</TableCell>
              <TableCell style={{ fontSize: 11, textAlign: 'center', color: theme.textSecondary }}>AA partial</TableCell>
              <TableCell style={{ fontSize: 11, textAlign: 'center', fontWeight: 700, color: theme.primary }}>AAA 100%</TableCell>
              <TableCell style={{ fontSize: 11, textAlign: 'right', fontWeight: 600, color: '#166534' }}>Full compliance</TableCell>
            </TableRow>
          </Table>
        </Column>

        {/* Architectural Changes Summary */}
        <Column style={{ gap: 8 }}>
          <Heading level={3} style={{ fontSize: 14, fontWeight: 700 }}>
            3. Feature Primitives Delivered
          </Heading>
          {release.features.slice(0, 3).map((f) => (
            <Row
              key={f.id}
              style={{
                padding: 10,
                backgroundColor: '#ffffff',
                border: `1px solid ${theme.borderColor}`,
                borderRadius: theme.borderRadius,
                alignItems: 'center',
                gap: 12,
              }}
            >
              <Column style={{ gap: 2, flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: 700, color: theme.textPrimary }}>
                  {f.title}
                </Text>
                <Text style={{ fontSize: 11, color: theme.textSecondary }}>
                  {f.description}
                </Text>
              </Column>
            </Row>
          ))}
        </Column>
      </Document.Page>

      {/* Page 2: Migration Procedures & Breaking Changes */}
      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 4 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#b91c1c',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Section 4
          </Text>
          <Heading
            level={2}
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: theme.textPrimary,
              letterSpacing: -0.5,
            }}
          >
            Breaking Changes &amp; Step-by-Step Migration
          </Heading>
          <Text style={{ fontSize: 12, color: theme.textSecondary }}>
            Follow these upgrade steps carefully to ensure seamless migration to v2.0.
          </Text>
        </Column>

        <Divider style={{ borderTop: `1px solid ${theme.borderColor}` }} />

        {/* Breaking Changes List */}
        {release.breakingChanges.map((change, idx) => (
          <Column
            key={change.id}
            style={{
              padding: 14,
              backgroundColor: '#fef2f2',
              borderRadius: theme.borderRadius,
              border: '1px solid #fecaca',
              gap: 8,
            }}
          >
            <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Heading
                level={4}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#991b1b',
                }}
              >
                4.{idx + 1}. {change.title}
              </Heading>
              <Text style={{ fontSize: 10, fontWeight: 700, color: '#b91c1c' }}>
                ACTION REQUIRED
              </Text>
            </Row>

            <Text style={{ fontSize: 11, color: '#7f1d1d' }}>
              {change.description}
            </Text>

            <Table
              style={{
                cellPadding: [6, 8],
                border: '1px solid #fca5a5',
                borderCollapse: 'collapse',
                backgroundColor: '#ffffff',
              }}
            >
              <TableRow header style={{ backgroundColor: '#fee2e2' }}>
                <TableCell style={{ fontSize: 10, fontWeight: 700, color: '#991b1b', width: '50%' }}>
                  Deprecated Pattern (v1.x)
                </TableCell>
                <TableCell style={{ fontSize: 10, fontWeight: 700, color: '#166534', width: '50%' }}>
                  Updated Standard (v2.0)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontSize: 10, fontFamily: theme.fontMono, color: '#991b1b' }}>
                  {change.beforeCode}
                </TableCell>
                <TableCell style={{ fontSize: 10, fontFamily: theme.fontMono, color: '#166534' }}>
                  {change.afterCode}
                </TableCell>
              </TableRow>
            </Table>

            <Text style={{ fontSize: 11, color: '#475569' }}>
              <Span style={{ fontWeight: 600 }}>Automated Migration:</Span> {change.migrationNote}
            </Text>
          </Column>
        ))}

        {/* Automated Migration Codemod Guide */}
        <Column
          style={{
            padding: 14,
            backgroundColor: theme.codeBg,
            borderRadius: theme.borderRadius,
            border: `1px solid ${theme.borderStrong}`,
            gap: 6,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: theme.textMuted,
              textTransform: 'uppercase',
            }}
          >
            Automated Codemod CLI
          </Text>
          <Text
            style={{
              fontFamily: theme.fontMono,
              fontSize: 12,
              color: theme.codeText,
              fontWeight: 600,
            }}
          >
            $ npx @prism-ui/codemod upgrade-v2 --write
          </Text>
          <Text style={{ fontSize: 10, color: '#94a3b8' }}>
            Applies import consolidations and AST prop renames safely with dry-run support.
          </Text>
        </Column>

        {/* Sign-off & Resources */}
        <Column
          style={{
            padding: 12,
            backgroundColor: theme.bgCardSubtle,
            borderRadius: theme.borderRadius,
            border: `1px solid ${theme.borderColor}`,
            gap: 4,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: 700, color: theme.textPrimary }}>
            5. Support &amp; Verification Resources
          </Text>
          <Text style={{ fontSize: 10, color: theme.textSecondary }}>
            Full documentation: {release.links.documentation} • GitHub Issues: {release.links.github}/issues • Package: {release.links.npm}
          </Text>
        </Column>
      </Document.Page>
    </Document>
  );
}
