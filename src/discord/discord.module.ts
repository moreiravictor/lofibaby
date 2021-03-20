import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { DiscordHandler } from './discord.handler';
import { DiscordService } from './services/discord.service';

@Module({
  imports: [ConfigModule.forRoot(), YoutubeModule],
  providers: [DiscordHandler, DiscordService],
  exports: [DiscordHandler, DiscordService],
})
export class DiscordModule {
  constructor(private handler: DiscordHandler) {}

  onModuleInit() {
    this.handler.connect();
    this.handler.setup();
  }
}
