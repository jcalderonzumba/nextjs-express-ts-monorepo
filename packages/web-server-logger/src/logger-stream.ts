import bunyan from 'bunyan';
import { Writable } from 'stream';

/**
 * Taco stream class
 */
class LoggerStream extends Writable {
  // eslint-disable-next-line
  public write(data: any): boolean {
    const logObject = JSON.parse(data);
    // Change logger level number to name and write it out
    logObject.loglevel = bunyan.nameFromLevel[logObject.level];
    //  We don't need this number if we are giving a string of the level
    delete logObject.level;
    if (process.env.NODE_ENV === 'development') {
      process.stdout.write(JSON.stringify(logObject, null, 2) + '\n');
    } else {
      process.stdout.write(JSON.stringify(logObject) + '\n');
    }

    return true;
  }
}

export default LoggerStream;
