import React from 'react';
import {
  Page,
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
  Grid,
} from '@hyper-elements/react';
import { ReleaseData } from '../../data/release';
import { defaultReleaseData } from '../../data/defaultRelease';
import { BrandTheme, defaultBrandTheme } from '../../theme/brand';

export interface ReleasePageProps {
  release?: ReleaseData;
  theme?: BrandTheme;
}

export const PreviewProps: ReleasePageProps = {
  release: defaultReleaseData,
  theme: defaultBrandTheme,
};

export default function ReleasePage({
  release = defaultReleaseData,
  theme = defaultBrandTheme,
}: ReleasePageProps = PreviewProps) {
  return (
    <Page
      width={1120}
      lang="en"
      title={`${release.projectName} v${release.version} — Release Notes & Changelog`}
      description={`${release.projectName} ${release.version}: ${release.tagline}`}
      style={{
        backgroundColor: theme.bgPage,
        fontFamily: theme.fontFamily,
        color: theme.textPrimary,
        fontSize: 16,
        lineHeight: 1.6,
      }}
    >
      {/* Top Navigation */}
      <Section
        style={{
          padding: [24, 32],
          backgroundColor: theme.bgCard,
          border: `1px solid ${theme.borderColor}`,
          gap: 16,
        }}
      >
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Row style={{ alignItems: 'center', gap: 12 }}>
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
            <Column
              style={{
                padding: [4, 10],
                backgroundColor: theme.primaryLight,
                borderRadius: 20,
                border: `1px solid ${theme.primary}`,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: theme.primary,
                }}
              >
                v{release.version}
              </Text>
            </Column>
          </Row>

          <Row style={{ alignItems: 'center', gap: 24 }}>
            <Link
              href={release.links.documentation}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: theme.textSecondary,
                textDecoration: 'none',
              }}
            >
              Docs
            </Link>
            <Link
              href={release.links.github}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: theme.textSecondary,
                textDecoration: 'none',
              }}
            >
              GitHub
            </Link>
            <Button
              href={release.links.npm}
              style={{
                backgroundColor: theme.primary,
                color: '#ffffff',
                padding: [8, 16],
                borderRadius: theme.borderRadius,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Get Started
            </Button>
          </Row>
        </Row>
      </Section>

      {/* Hero Section */}
      <Section
        style={{
          padding: [56, 32, 40, 32],
          backgroundColor: theme.bgCard,
          border: `1px solid ${theme.borderColor}`,
          gap: 24,
        }}
      >
        <Column style={{ gap: 12 }}>
          <Row style={{ alignItems: 'center', gap: 8 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: theme.primary,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
              }}
            >
              Release Announcement • {release.releaseDate}
            </Text>
          </Row>

          <Heading
            level={1}
            style={{
              fontSize: 42,
              fontWeight: 800,
              lineHeight: 1.15,
              color: theme.textPrimary,
              letterSpacing: -1,
            }}
          >
            {release.tagline}
          </Heading>

          <Text
            style={{
              fontSize: 18,
              color: theme.textSecondary,
              lineHeight: 1.6,
              maxWidth: 820,
            }}
          >
            {release.summary}
          </Text>
        </Column>

        {/* Installation Box with Package Manager Tabs */}
        <Column
          style={{
            padding: 24,
            backgroundColor: theme.codeBg,
            borderRadius: theme.borderRadius + 2,
            border: `1px solid ${theme.borderStrong}`,
            gap: 14,
          }}
        >
          <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#e4e4e7',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Install {release.projectName} v{release.version}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#cbd5e1',
                fontFamily: theme.fontMono,
              }}
            >
              React 18 & 19 Ready
            </Text>
          </Row>

          <Row
            style={{
              padding: [12, 16],
              backgroundColor: '#18181b',
              borderRadius: theme.borderRadius,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontFamily: theme.fontMono,
                fontSize: 15,
                color: theme.codeText,
                fontWeight: 600,
              }}
            >
              $ {release.installation.npm}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#94a3b8',
                fontFamily: theme.fontMono,
              }}
            >
              copy
            </Text>
          </Row>

          <Row style={{ gap: 16 }}>
            <Text style={{ fontSize: 12, color: '#94a3b8', fontFamily: theme.fontMono }}>
              pnpm: <Span style={{ color: '#f1f5f9' }}>{release.installation.pnpm}</Span>
            </Text>
            <Text style={{ fontSize: 12, color: '#94a3b8', fontFamily: theme.fontMono }}>
              bun: <Span style={{ color: '#f1f5f9' }}>{release.installation.bun}</Span>
            </Text>
          </Row>
        </Column>

        {/* Stats Grid */}
        {release.stats && (
          <Grid
            columns={4}
            style={{
              gap: 16,
            }}
          >
            {release.stats.map((stat, i) => (
              <Column
                key={i}
                style={{
                  padding: 20,
                  backgroundColor: theme.bgPage,
                  borderRadius: theme.borderRadius,
                  border: `1px solid ${theme.borderColor}`,
                  gap: 6,
                }}
              >
                <Heading
                  level={2}
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: theme.primary,
                  }}
                >
                  {stat.value}
                </Heading>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: theme.textSecondary,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  {stat.label}
                </Text>
              </Column>
            ))}
          </Grid>
        )}
      </Section>

      {/* Feature Deep Dive */}
      <Section
        style={{
          padding: [48, 32],
          backgroundColor: theme.bgCard,
          border: `1px solid ${theme.borderColor}`,
          gap: 32,
        }}
      >
        <Column style={{ gap: 6 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: theme.primary,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
            }}
          >
            Deep Dive
          </Text>
          <Heading
            level={2}
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: theme.textPrimary,
              letterSpacing: -0.5,
            }}
          >
            What&apos;s New in Version {release.version}
          </Heading>
        </Column>

        {release.features.map((feature) => (
          <Column
            key={feature.id}
            style={{
              padding: 28,
              backgroundColor: theme.bgPage,
              borderRadius: theme.borderRadius + 2,
              border: `1px solid ${theme.borderColor}`,
              gap: 16,
            }}
          >
            <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Heading
                level={3}
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: theme.textPrimary,
                }}
              >
                {feature.title}
              </Heading>
              {feature.tag && (
                <Column
                  style={{
                    padding: [4, 12],
                    backgroundColor: theme.primaryLight,
                    borderRadius: 16,
                    border: `1px solid ${theme.primary}`,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
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
                fontSize: 15,
                color: theme.textSecondary,
                lineHeight: 1.6,
              }}
            >
              {feature.description}
            </Text>

            {feature.codeSnippet && (
              <Column
                style={{
                  padding: 16,
                  backgroundColor: theme.codeBg,
                  borderRadius: theme.borderRadius,
                  border: `1px solid ${theme.borderStrong}`,
                  gap: 8,
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
                  Usage Example
                </Text>
                <Text
                  style={{
                    fontFamily: theme.fontMono,
                    fontSize: 13,
                    color: theme.codeText,
                    lineHeight: 1.5,
                  }}
                >
                  {feature.codeSnippet}
                </Text>
              </Column>
            )}
          </Column>
        ))}
      </Section>

      {/* Breaking Changes & Migration Guide */}
      {release.breakingChanges && release.breakingChanges.length > 0 && (
        <Section
          style={{
            padding: [48, 32],
            backgroundColor: theme.bgCard,
            border: `1px solid ${theme.borderColor}`,
            gap: 28,
          }}
        >
          <Column style={{ gap: 6 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#b91c1c',
                textTransform: 'uppercase',
                letterSpacing: 1.5,
              }}
            >
              Migration Guide
            </Text>
            <Heading
              level={2}
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: theme.textPrimary,
                letterSpacing: -0.5,
              }}
            >
              Upgrading from Prism UI v1.x to v2.0
            </Heading>
            <Text
              style={{
                fontSize: 15,
                color: theme.textSecondary,
              }}
            >
              Please review the breaking changes below before bumping versions in production.
            </Text>
          </Column>

          {release.breakingChanges.map((change) => (
            <Column
              key={change.id}
              style={{
                padding: 24,
                backgroundColor: '#fef2f2',
                borderRadius: theme.borderRadius + 2,
                border: '1px solid #fecaca',
                gap: 16,
              }}
            >
              <Column style={{ gap: 6 }}>
                <Heading
                  level={3}
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#991b1b',
                  }}
                >
                  {change.title}
                </Heading>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#7f1d1d',
                    lineHeight: 1.5,
                  }}
                >
                  {change.description}
                </Text>
              </Column>

              {/* Side-by-Side Diff */}
              <Row style={{ gap: 16 }}>
                <Column
                  style={{
                    padding: 16,
                    backgroundColor: '#ffffff',
                    borderRadius: theme.borderRadius,
                    border: '1px solid #fca5a5',
                    gap: 6,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#b91c1c',
                      textTransform: 'uppercase',
                    }}
                  >
                    Before (v1.x)
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.fontMono,
                      fontSize: 12,
                      color: '#991b1b',
                      lineHeight: 1.5,
                    }}
                  >
                    {change.beforeCode}
                  </Text>
                </Column>

                <Column
                  style={{
                    padding: 16,
                    backgroundColor: '#ffffff',
                    borderRadius: theme.borderRadius,
                    border: '1px solid #86efac',
                    gap: 6,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#15803d',
                      textTransform: 'uppercase',
                    }}
                  >
                    After (v2.0)
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.fontMono,
                      fontSize: 12,
                      color: '#166534',
                      lineHeight: 1.5,
                    }}
                  >
                    {change.afterCode}
                  </Text>
                </Column>
              </Row>

              <Column
                style={{
                  padding: 12,
                  backgroundColor: '#ffffff',
                  borderRadius: theme.borderRadius,
                  border: '1px solid #fecaca',
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: '#475569',
                    fontWeight: 500,
                  }}
                >
                  💡 <Span style={{ fontWeight: 700 }}>Migration Tip:</Span> {change.migrationNote}
                </Text>
              </Column>
            </Column>
          ))}
        </Section>
      )}

      {/* Footer */}
      <Section
        style={{
          padding: [40, 32, 56, 32],
          backgroundColor: theme.bgPage,
          border: `1px solid ${theme.borderColor}`,
          gap: 20,
        }}
      >
        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Column style={{ gap: 4 }}>
            <Heading
              level={4}
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: theme.textPrimary,
              }}
            >
              {release.projectName} Open Source Project
            </Heading>
            <Text
              style={{
                fontSize: 13,
                color: theme.textSecondary,
              }}
            >
              Released under the MIT License • Built with pride by open source maintainers.
            </Text>
          </Column>

          <Row style={{ gap: 16 }}>
            <Button
              href={release.links.github}
              style={{
                backgroundColor: theme.bgCard,
                color: theme.textPrimary,
                border: `1px solid ${theme.borderColor}`,
                padding: [8, 16],
                borderRadius: theme.borderRadius,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Star on GitHub
            </Button>
            <Button
              href={release.links.documentation}
              style={{
                backgroundColor: theme.primary,
                color: '#ffffff',
                padding: [8, 16],
                borderRadius: theme.borderRadius,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Full Documentation
            </Button>
          </Row>
        </Row>
      </Section>
    </Page>
  );
}
