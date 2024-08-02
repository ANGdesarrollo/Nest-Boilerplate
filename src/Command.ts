import { CommandFactory } from 'nest-commander';
import { AppModule } from './AppModule';
import { Logger } from '@nestjs/common';

(async () => {
  const logger = new Logger();
  await CommandFactory.run(AppModule, logger);
})();
