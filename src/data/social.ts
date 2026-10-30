export type SocialLink = {
  platform: 'YouTube' | 'TikTok' | 'X';
  label: string;
  href: string;
  handle: string;
  /** Present only while the profile URL is still a placeholder. */
  todo?: string;
};

// TikTok and X are still placeholders. Replace those URLs when the real handles are known.
export const socialLinks: SocialLink[] = [
  {
    platform: 'YouTube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@吴宗臻',
    handle: '@吴宗臻',
  },
  {
    platform: 'TikTok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@TODO-peteerli',
    handle: '@TODO-peteerli',
    todo: 'TODO: 替换为真实 TikTok 主页地址',
  },
  {
    platform: 'X',
    label: 'X',
    href: 'https://x.com/TODO-peteerli',
    handle: '@TODO-peteerli',
    todo: 'TODO: 替换为真实 X（Twitter）主页地址',
  },
];
