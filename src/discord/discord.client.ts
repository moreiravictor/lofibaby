import { Injectable } from '@nestjs/common';
import discordConfig from 'src/config/discordConfig';
import { Message, Client } from 'discord.js';
import { LofiMessage } from './entities/classes/lofiMessage';
import { CommandHandler } from './command.handler';

@Injectable()
export class DiscordClient {
  private client: Client;
  private botToken: string;

  constructor(private readonly commandHander: CommandHandler) {
    this.client = new Client();
    this.botToken = discordConfig().bot_token;
  }

  connect() {
    this.client.login(this.botToken);
  }

  setup() {
    this.client.on('message', (message: Message) => this.setupMessage(message));
  }

  async setupMessage(message: Message) {
    const lofi = new LofiMessage(message);
    if (lofi.notSafe()) return;
    this.commandHander.executeCommand(lofi);
  }
}
