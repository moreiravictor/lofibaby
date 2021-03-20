import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import * as discord from 'discord.js';
import discordConfig from './config/discordConfig';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(helmet);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);

  const prefix = '?';
  const client = new discord.Client();
  client.login(discordConfig().bot_token);

  client.on('message', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if (command === 'ping') {
      message.reply('pong');
    }
    if (command === 'lofi') {
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
      }
    }
  });
  // client.off(discordConfig().bot_token);
}
bootstrap();
