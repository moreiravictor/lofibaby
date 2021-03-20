import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import discord from './config/discordConfig';
import youtube from './config/youtubeConfig';
import { DiscordModule } from './discord/discord.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [discord, youtube] }),
    DiscordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
