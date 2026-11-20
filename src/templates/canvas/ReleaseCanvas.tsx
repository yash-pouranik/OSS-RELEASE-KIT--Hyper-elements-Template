import React from 'react';
import {
  Canvas,
  Row,
  Column,
  Heading,
  Text,
  Span,
  Grid,
} from '@hyper-elements/react';
import { ReleaseData } from '../../data/release';
import { defaultReleaseData } from '../../data/defaultRelease';
import { BrandTheme, defaultBrandTheme } from '../../theme/brand';

export interface ReleaseCanvasProps {
  release?: ReleaseData;
  theme?: BrandTheme;
}

export const PreviewProps: ReleaseCanvasProps = {
  release: defaultReleaseData,
  theme: defaultBrandTheme,
};

export default function ReleaseCanvas({
  release = defaultReleaseData,
  theme = defaultBrandTheme,
}: ReleaseCanvasProps): React.ReactElement {
  return (
    <Canvas
      width={1200}
      height={630}
      lang="en"
      title={`${release.projectName} ${release.version} Launch Announcement`}
      style={{
        backgroundColor: theme.bgPage, // Unified light neutral background matching Email, Page & PDF
        fontFamily: theme.fontFamily,
        color: theme.textPrimary,
        padding: [44, 56],
        justifyContent: 'space-between',
      }}
    >
      {/* Top Header Row */}
      <Row style={{ alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Row style={{ alignItems: 'center', gap: 16 }}>
          <Column
            style={{
              padding: [8, 16],
              backgroundColor: theme.primary,
              borderRadius: theme.borderRadius,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: 0.5,
              }}
            >
              {release.projectName.toUpperCase()}
            </Text>
          </Column>

          <Column
            style={{
              padding: [6, 14],
              backgroundColor: theme.primaryLight,
              borderRadius: 20,
              border: `1px solid ${theme.primary}`,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: theme.primary,
              }}
            >
              v{release.version} • {release.releaseType.toUpperCase()}
            </Text>
          </Column>
        </Row>

        <Text
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: theme.textSecondary,
            letterSpacing: 0.5,
          }}
        >
          {release.releaseDate} • Official Launch
        </Text>
      </Row>

      {/* Main Hero Headline & Summary */}
      <Column style={{ gap: 12, width: '100%' }}>
        <Heading
          level={1}
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: theme.textPrimary,
            lineHeight: 1.15,
            letterSpacing: -1,
          }}
        >
          {release.tagline}
        </Heading>

        <Text
          style={{
            fontSize: 17,
            color: theme.textSecondary,
            lineHeight: 1.5,
            maxWidth: 1000,
          }}
        >
          {release.summary}
        </Text>
      </Column>

      {/* 4 Feature Cards Grid (Clean white surface cards on light neutral canvas) */}
      <Grid
        columns={4}
        style={{
          gap: 16,
          width: '100%',
        }}
      >
        {release.features.slice(0, 4).map((f) => (
          <Column
            key={f.id}
            style={{
              padding: 16,
              backgroundColor: theme.bgCard,
              borderRadius: theme.borderRadius,
              border: `1px solid ${theme.borderColor}`,
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: theme.primary,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {f.tag || 'Feature'}
            </Text>
            <Heading
              level={4}
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: theme.textPrimary,
              }}
            >
              {f.title}
            </Heading>
            <Text
              style={{
                fontSize: 12,
                color: theme.textSecondary,
                lineHeight: 1.4,
              }}
            >
              {f.description}
            </Text>
          </Column>
        ))}
      </Grid>

      {/* Bottom Footer Bar */}
      <Row
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: [16, 24],
          backgroundColor: theme.bgCard,
          borderRadius: theme.borderRadius,
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        {/* Terminal Command in Sleek Slate Container */}
        <Row style={{ alignItems: 'center', gap: 10 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: theme.textSecondary,
              textTransform: 'uppercase',
            }}
          >
            QUICK INSTALL:
          </Text>
          <Column
            style={{
              padding: [4, 12],
              backgroundColor: theme.codeBg,
              borderRadius: 6,
              border: `1px solid ${theme.borderStrong}`,
            }}
          >
            <Text
              style={{
                fontFamily: theme.fontMono,
                fontSize: 13,
                fontWeight: 600,
                color: theme.codeText,
              }}
            >
              $ {release.installation.npm}
            </Text>
          </Column>
        </Row>

        {/* Key Metrics & Documentation Link */}
        <Row style={{ alignItems: 'center', gap: 20 }}>
          {release.stats &&
            release.stats.slice(0, 3).map((s, idx) => (
              <Row key={idx} style={{ alignItems: 'center', gap: 6 }}>
                <Text style={{ fontSize: 13, fontWeight: 800, color: theme.primary }}>
                  {s.value}
                </Text>
                <Text style={{ fontSize: 11, color: theme.textSecondary, fontWeight: 500 }}>
                  {s.label}
                </Text>
              </Row>
            ))}

          <Text
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: theme.primary,
            }}
          >
            example.com/docs
          </Text>
        </Row>
      </Row>
    </Canvas>
  );
}
