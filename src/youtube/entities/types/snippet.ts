import { Thumbnails } from './thumbnails';

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
  thumbnails: Thumbnails;
}
