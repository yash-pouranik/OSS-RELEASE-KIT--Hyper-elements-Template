import React from 'react';
import {
  Email,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Button,
  Divider,
  Span,
  LineBreak,
  Link,
} from '@hyper-elements/react';
import { ReleaseData } from '../../data/release';
import { defaultReleaseData } from '../../data/defaultRelease';
import { BrandTheme, defaultBrandTheme } from '../../theme/brand';

export interface ReleaseEmailProps {
  release?: ReleaseData;
  theme?: BrandTheme;
}

export const PreviewProps: ReleaseEmailProps = {
  release: defaultReleaseData,
  theme: defaultBrandTheme,
};

export default function ReleaseEmail({
  release = defaultReleaseData,
  theme = defaultBrandTheme,
}: ReleaseEmailProps = PreviewProps) {
  return (
    <Email
      width={600}
      lang="en"
      title={`${release.projectName} ${release.version} Released`}
      previewText={`${release.projectName} ${release.version} is here — ${release.tagline}`}
      style={{
        backgroundColor: theme.bgPage,
        fontFamily: theme.fontFamily,
        color: theme.textPrimary,
        fontSize: 15,
        lineHeight: 1.6,
      }}
    >
      {/* Header Bar */}
      <Section
        style={{
          padding: [32, 24, 20, 24],
          backgroundColor: theme.bgCard,
          border: `1px solid ${theme.borderColor}`,
          gap: 16,
        }}
      >
        <Row
          style={{
            alignItems: 'center',
          }}
        >
          <Column style={{ gap: 4, flex: 1 }}>
            <Heading
              level={2}
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: theme.textPrimary,
                letterSpacing: -0.5,
              }}
            >
              {release.projectName}
            </Heading>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: theme.primary,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Official Release Notes
            </Text>
          </Column>

          <Column
            style={{
              padding: [6, 12],
              backgroundColor: theme.primaryLight,
              borderRadius: 16,
              border: `1px solid ${theme.primary}`,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: theme.primary,
              }}
            >
              v{release.version} • {release.releaseType.toUpperCase()}
            </Text>
          </Column>
        </Row>
      </Section>

      {/* Hero Announcement */}
      <Section
        style={{
          padding: [28, 24],
          backgroundColor: theme.bgCard,
          border: `1px solid ${theme.borderColor}`,
          gap: 16,
        }}
      >
        <Heading
          level={1}
          style={{
            fontSize: 26,
            fontWeight: 800,
            lineHeight: 1.3,
            color: theme.textPrimary,
            letterSpacing: -0.5,
          }}
        >
          {release.tagline}
        </Heading>

        <Text
          style={{
            fontSize: 15,
            color: theme.textSecondary,
            lineHeight: 1.6,
          }}
        >
          {release.summary}
        </Text>

        {/* Quick Install Box */}
        <Column
          style={{
            padding: 16,
            backgroundColor: theme.codeBg,
            borderRadius: theme.borderRadius,
            border: `1px solid ${theme.borderStrong}`,
            gap: 6,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              color: '#94a3b8',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            Quick Install
          </Text>
          <Text
            style={{
              fontFamily: theme.fontMono,
              fontSize: 14,
              color: theme.codeText,
              fontWeight: 600,
            }}
          >
            {release.installation.npm}
          </Text>
        </Column>

        <Row style={{ gap: 12 }}>
          <Button
            href={release.links.documentation}
            style={{
              backgroundColor: theme.primary,
              color: '#ffffff',
              padding: [10, 20],
              borderRadius: theme.borderRadius,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Explore Documentation
          </Button>
          <Button
            href={release.links.github}
            style={{
              backgroundColor: theme.bgCardSubtle,
              color: theme.textPrimary,
              border: `1px solid ${theme.borderColor}`,
              padding: [10, 20],
              borderRadius: theme.borderRadius,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            View on GitHub
          </Button>
        </Row>
      </Section>

      {/* Key Metrics / Stats */}
      {release.stats && release.stats.length > 0 && (
        <Section
          style={{
            padding: [20, 24],
            backgroundColor: theme.bgCard,
            border: `1px solid ${theme.borderColor}`,
            gap: 12,
          }}
        >
          <Row style={{ gap: 16 }}>
            {release.stats.map((stat, idx) => (
              <Column
                key={idx}
                style={{
                  padding: 12,
                  backgroundColor: theme.bgPage,
                  borderRadius: theme.borderRadius,
                  border: `1px solid ${theme.borderColor}`,
                  alignItems: 'center',
                  gap: 4,
                  flex: 1,
                }}
              >
                <Heading
                  level={2}
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: theme.primary,
                  }}
                >
                  {stat.value}
                </Heading>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: theme.textSecondary,
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </Text>
              </Column>
            ))}
          </Row>
        </Section>
      )}

      {/* Feature Highlights */}
      <Section
        style={{
          padding: [28, 24],
          backgroundColor: theme.bgCard,
          border: `1px solid ${theme.borderColor}`,
          gap: 20,
        }}
      >
        <Column style={{ gap: 4 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: theme.primary,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            What&apos;s New
          </Text>
          <Heading
            level={2}
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: theme.textPrimary,
            }}
          >
            Key Release Highlights
          </Heading>
        </Column>

        {release.features.map((feature) => (
          <Column
            key={feature.id}
            style={{
              padding: 16,
              backgroundColor: theme.bgPage,
              borderRadius: theme.borderRadius,
              border: `1px solid ${theme.borderColor}`,
              gap: 8,
            }}
          >
            <Row style={{ alignItems: 'center' }}>
              <Column style={{ flex: 1 }}>
                <Heading
                  level={3}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: theme.textPrimary,
                  }}
                >
                  {feature.title}
                </Heading>
              </Column>
              {feature.tag && (
                <Column
                  style={{
                    padding: [2, 8],
                    backgroundColor: theme.primaryLight,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: theme.primary,
                    }}
                  >
                    {feature.tag}
                  </Text>
                </Column>
              )}
            </Row>
            <Text
              style={{
                fontSize: 14,
                color: theme.textSecondary,
                lineHeight: 1.5,
              }}
            >
              {feature.description}
            </Text>
          </Column>
        ))}
      </Section>

      {/* Breaking Changes & Migration Note */}
      {release.breakingChanges && release.breakingChanges.length > 0 && (
        <Section
          style={{
            padding: [24, 24],
            backgroundColor: theme.bgCard,
            border: `1px solid ${theme.borderColor}`,
            gap: 16,
          }}
        >
          <Column style={{ gap: 4 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#b91c1c',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Breaking Changes
            </Text>
            <Heading
              level={2}
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: theme.textPrimary,
              }}
            >
              Migration Required for v2.0
            </Heading>
          </Column>

          {release.breakingChanges.map((change) => (
            <Column
              key={change.id}
              style={{
                padding: 14,
                backgroundColor: '#fef2f2',
                borderRadius: theme.borderRadius,
                border: '1px solid #fecaca',
                gap: 6,
              }}
            >
              <Heading
                level={3}
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#991b1b',
                }}
              >
                {change.title}
              </Heading>
              <Text
                style={{
                  fontSize: 13,
                  color: '#7f1d1d',
                  lineHeight: 1.4,
                }}
              >
                {change.migrationNote}
              </Text>
            </Column>
          ))}
        </Section>
      )}

      {/* Footer */}
      <Section
        style={{
          padding: [24, 24, 36, 24],
          backgroundColor: theme.bgPage,
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Divider style={{ borderTop: `1px solid ${theme.borderColor}`, width: '100%' }} />

        <Text
          style={{
            fontSize: 12,
            color: theme.textMuted,
            textAlign: 'center',
          }}
        >
          Released on {release.releaseDate} by the {release.projectName} Core Team.
          <LineBreak />
          This announcement was generated automatically by OSS Release Kit.
        </Text>

        <Row style={{ gap: 16, justifyContent: 'center' }}>
          <Link
            href={release.links.github}
            style={{
              fontSize: 12,
              color: theme.primary,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            GitHub
          </Link>
          <Link
            href={release.links.documentation}
            style={{
              fontSize: 12,
              color: theme.primary,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Documentation
          </Link>
          <Link
            href={release.links.npm}
            style={{
              fontSize: 12,
              color: theme.primary,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            npm Registry
          </Link>
        </Row>
      </Section>
    </Email>
  );
}
