import * as ytdl from 'ytdl-core';
import { Injectable } from '@nestjs/common';
import { YoutubeService } from 'src/youtube/youtube.service';

@Injectable()
export class DiscordService {
  constructor(private readonly youtube: YoutubeService) {}

  pong(message) {
    message.reply('pong');
  }

  async playLofi(message) {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const lofi_id = await this.youtube.latestLofiId();
      const dispatcher = connection.play(ytdl(this.youtubeURL(lofi_id)));
      this.setupBroadcastSafety(dispatcher, message, lofi_id);
    }
  }

  setupBroadcastSafety(dispatcher, message, video_id) {
    dispatcher.on('error', () => this.playLofi(message));
    dispatcher.on('start', () =>
      message.channel.send(this.youtubeURL(video_id)),
    );
    dispatcher.on('speaking', (isSpeaking) => {
      if (!isSpeaking) {
        this.playLofi(message);
      }
    });
  }

  youtubeURL(id) {
    return `https://www.youtube.com/watch?v=${id}`;
  }
}
