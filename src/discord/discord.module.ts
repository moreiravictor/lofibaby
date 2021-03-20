import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { CommandHandler } from './command.handler';
import { DiscordClient } from './discord.client';
import { DiscordService } from './services/discord.service';

@Module({
  imports: [ConfigModule.forRoot(), YoutubeModule],
  providers: [DiscordClient, DiscordService, CommandHandler],
  exports: [DiscordClient, DiscordService],
})
export class DiscordModule {
  constructor(private client: DiscordClient) {}

  onModuleInit() {
    this.client.connect();
    this.client.setup();
  }
}
