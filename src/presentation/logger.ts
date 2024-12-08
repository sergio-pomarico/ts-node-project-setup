import { injectable } from 'inversify';
import pino, {
  DestinationStream,
  Logger as PinoLogger,
  transport as PinoTransport,
  levels,
} from 'pino';

@injectable()
export class Logger {
  constructor() {
    const transport: DestinationStream = PinoTransport({
      targets: [
        {
          target: 'pino-pretty',
          options: {
            destination: './log/output.log',
            mkdir: true,
            colorize: false,
          },
        },
        {
          target: 'pino-pretty',
          options: {
            destination: process.stdout.fd,
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

  info(message: string, args?: unknown) {
    this.logger.info(args, message);
  }

  warn(message: string, args?: unknown) {
    this.logger.warn(args, message);
  }

  error(message: string, args?: unknown) {
    this.logger.error(args, message);
  }

  debug(message: string, args?: unknown) {
    this.logger.debug(args, message);
  }

  trace(message: string, args?: unknown) {
    this.logger.trace(args, message);
  }
}
