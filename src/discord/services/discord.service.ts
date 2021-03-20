import * as ytdl from 'ytdl-core';
import { Injectable } from '@nestjs/common';
import { YoutubeService } from 'src/youtube/youtube.service';
import { Youtube } from 'src/youtube/entities/classes/youtube';

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
      const dispatcher = connection.play(ytdl(Youtube.URL(lofi_id)));
      this.setupBroadcastSafety(dispatcher, message, lofi_id);
    }
  }

  setupBroadcastSafety(dispatcher, message, video_id) {
    dispatcher.on('error', () => this.playLofi(message));
    dispatcher.on('start', () => message.channel.send(Youtube.URL(video_id)));
    dispatcher.on('speaking', (isSpeaking) => {
      if (!isSpeaking) {
        this.playLofi(message);
      }
    });
  }
}
