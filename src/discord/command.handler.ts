import { Injectable } from '@nestjs/common';
import { LofiMessage } from './entities/classes/lofiMessage';
import { DiscordService } from './services/discord.service';

@Injectable()
export class CommandHandler {
  constructor(private readonly disc: DiscordService) {}

  execute(lofi: LofiMessage) {
    const command = lofi.getCommand();
    if (command === 'lofi') {
      this.disc.playLofi(lofi.message);
    } else if (command === 'bye') {
      this.disc.exit(lofi.message);
    } else if (command === 'help') {
      this.disc.help(lofi.message);
    }
  }
}
