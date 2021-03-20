import { Injectable } from '@nestjs/common';
import discordConfig from 'src/config/discordConfig';
import * as discord from 'discord.js';
import { DiscordService } from './services/discord.service';

@Injectable()
export class DiscordHandler {
  private client;
  private prefix = '?';

  constructor(private readonly disc: DiscordService) {
    this.client = new discord.Client();
  }

  connect() {
    this.client.login(discordConfig().bot_token);
  }

  setup() {
    this.client.on('message', async (message) => {
      if (this.notSafe(message)) return;
      const command = this.getCommand(message);
      if (command === 'lofi') {
        this.disc.playLofi(message);
      }
    });
  }

  notSafe(message) {
    if (message.author.bot) return true;
    if (!message.content.startsWith(this.prefix)) return true;
  }

  getCommand(message) {
    const commandBody = message.content.slice(this.prefix.length);
    const args = commandBody.split(' ');
    return args.shift().toLowerCase();
  }
}
