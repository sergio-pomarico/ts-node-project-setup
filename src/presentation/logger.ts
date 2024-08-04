import { injectable } from 'inversify';
import pino, {
  Logger as PinoLogger,
  transport as PinoTransport,
  levels,
} from 'pino';

@injectable()
export class Logger {
  constructor() {
    const transport = PinoTransport({
      targets: [
        {
          target: 'pino-pretty',
          options: {
            destination: './log/errors.log',
            mkdir: true,
            colorize: false,
            level: 'error',
          },
        },
        {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      ],
    });
    this.logger = pino(
      {
        level: levels.labels[levels.values.info],
      },
      transport,
    );
  }

  private logger: PinoLogger;

  info(message: string) {
    this.logger.info(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  trace(message: string) {
    this.logger.trace(message);
  }
}
