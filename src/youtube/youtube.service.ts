import { HttpService, Injectable } from '@nestjs/common';
import youtube from 'src/config/youtubeConfig';

@Injectable()
export class YoutubeService {
  constructor(private readonly http: HttpService) {}

  async latestLofiId() {
    const { items } = await this.getLofiLives();
    return items[0].id.videoId;
  }

  async getLofiLives() {
    const res = await this.http
      .get(`${youtube().lofi_url}${youtube().api_key}`)
      .toPromise();
    return res.data;
  }
}
