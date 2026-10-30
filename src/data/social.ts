export type SocialLink = {
  platform: 'YouTube' | 'TikTok' | 'X';
  label: string;
  href: string;
  handle: string;
  /** Shown on the page so placeholder URLs are obvious. */
  todo: string;
};

// TODO: replace these placeholder profile URLs with the real handles.
export const socialLinks: SocialLink[] = [
  {
    platform: 'YouTube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@TODO-peteerli',
    handle: '@TODO-peteerli',
    todo: 'TODO: 替换为龙傲天 / peteerli 的真实 YouTube 频道地址',
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
