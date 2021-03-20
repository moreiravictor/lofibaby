import { PageInfo } from './pageInfo';
import { Video } from './video';

export interface Videos {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Video[];
}
