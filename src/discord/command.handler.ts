import { Injectable } from '@nestjs/common';
import { LofiMessage } from './entities/classes/lofiMessage';
import { DiscordService } from './services/discord.service';

@Injectable()
export class CommandHandler {
  constructor(private readonly disc: DiscordService) {}

  executeCommand(lofi: LofiMessage) {
    const command = lofi.getCommand();
    if (command === 'lofi') {
      this.disc.playLofi(lofi.message);
    }
  }
}
