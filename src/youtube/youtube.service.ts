import { HttpService, Injectable } from '@nestjs/common';
import youtube from 'src/config/youtubeConfig';
import { Videos } from './entities/types/videos';

@Injectable()
export class YoutubeService {
  lofiUrl: string;
  apiKey: string;

  constructor(private readonly http: HttpService) {
    this.lofiUrl = youtube().lofi_url;
    this.apiKey = youtube().api_key;
  }

  async latestLofiId(): Promise<string> {
    const videos: Videos = await this.getLofiLives();
    return videos.items[0].id.videoId;
  }

  async getLofiLives(): Promise<Videos> {
    const res = await this.http
      .get(`${this.lofiUrl}${this.apiKey}`)
      .toPromise();
    return res.data;
  }
}
