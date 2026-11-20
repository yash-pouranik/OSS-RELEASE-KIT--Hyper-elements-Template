export type ReleaseType = 'major' | 'minor' | 'patch';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  codeSnippet?: string;
}

export interface BreakingChange {
  id: string;
  title: string;
  description: string;
  beforeCode: string;
  afterCode: string;
  migrationNote: string;
}

export interface Contributor {
  name: string;
  handle: string;
  avatarUrl?: string;
}

export interface ReleaseLinks {
  documentation: string;
  github: string;
  npm: string;
  changelog?: string;
  demo?: string;
}

export interface ReleaseData {
  projectName: string;
  version: string;
  releaseType: ReleaseType;
  tagline: string;
  summary: string;
  releaseDate: string;
  installation: {
    npm: string;
    pnpm: string;
    yarn: string;
    bun: string;
  };
  features: FeatureItem[];
  breakingChanges: BreakingChange[];
  stats: {
    label: string;
    value: string;
  }[];
  links: ReleaseLinks;
  contributors: Contributor[];
  announcementAuthor: {
    name: string;
    role: string;
    avatarUrl: string;
  };
}
