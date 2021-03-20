import { Message } from 'discord.js';

export class LofiMessage {
  public message: Message;
  private prefix = '?';

  constructor(message: Message) {
    this.message = message;
  }

  notSafe() {
    if (this.message.author.bot) return true;
    if (!this.message.content.startsWith(this.prefix)) return true;
  }

  getCommand() {
    const commandBody = this.message.content.slice(this.prefix.length);
    const args = commandBody.split(' ');
    return args.shift().toLowerCase();
  }
}
