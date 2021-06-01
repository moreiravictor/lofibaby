import * as ytdl from 'ytdl-core';
import { Injectable } from '@nestjs/common';
import { YoutubeService } from 'src/youtube/youtube.service';
import { Youtube } from 'src/youtube/entities/classes/youtube';
import { Message, StreamDispatcher, VoiceConnection } from 'discord.js';

@Injectable()
export class DiscordService {
  constructor(private readonly youtube: YoutubeService) {}

  pong(message: Message) {
    message.reply('pong');
  }

  help(message: Message) {
    message.channel.send(`Hey there, I'm lofibaby :musical_note: . Want some help?\n\n`+
                          `Commands:\n`+
                          `- type **?lofi** to start playing lofi\n`+
                          `- type **?bye** to kick me from the channel`);
  }

  async exit(message: Message) {
    message.reply('bye onii-chan!');
    message.member.voice.channel.leave();
    console.log('bot disconnected!');
  }

  async playLofi(message: Message) {
    if (message.member.voice.channel) {
      console.log('bot connected!');
      const connection = await message.member.voice.channel.join();
      const lofi_id = await this.youtube.latestLofiId();
      const dispatcher = connection.play(ytdl(Youtube.URL(lofi_id)));
      this.setupConnectionSafety(connection, message);
      this.setupBroadcastSafety(dispatcher, message, lofi_id);
    } else {
      message.reply('you must be in a voice channel to play lofi!');
    }
  }

  setupConnectionSafety(connection: VoiceConnection, message: Message) {
    connection.on('error', () => this.playLofi(message));
    connection.on('failed', (fail) => {console.log('connection: ', fail)});
  }

  setupBroadcastSafety(dispatcher: StreamDispatcher, message: Message, video_id: string) {
    dispatcher.on('error', () => this.playLofi(message));
    dispatcher.on('debug', (message) => {console.log('broadcast: ', message)});
    dispatcher.on('speaking', (isSpeaking) => {
      if (!isSpeaking) {
        this.playLofi(message);
      }
    });
  }
}
