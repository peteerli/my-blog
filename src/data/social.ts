export type SocialLink = {
  platform: 'YouTube' | 'TikTok' | 'X';
  label: string;
  href: string;
  handle: string;
  /** Present only while the profile URL is still a placeholder. */
  todo?: string;
};

// TikTok is still a placeholder. Replace that URL when the real handle is known.
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
    label: 'X（Twitter）',
    href: 'https://x.com/Zong32078Wuw3',
    handle: '@Zong32078Wuw3',
  },
];
