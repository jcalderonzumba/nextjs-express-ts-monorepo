import bunyan from 'bunyan';
import LoggerStream from './logger-stream';

/**
 *  Basically  setups  the log-level of the  logger based on the following:
 *  1)  LOG_LEVEL env has  priority over everything
 *  2) If not present log-level is set depending on environment and dev is debug, pre is iNFO and prod is ERROR
 *  3) We need a level always and by default is info
 * @return {any}
 */
function getLogLevel(): number {
  const ENV_TO_BUNYAN_LEVEL = {
    development: bunyan.DEBUG,
    preproduction: bunyan.INFO,
    production: bunyan.INFO,
    test: bunyan.TRACE
  };
  const LEVEL_TO_BUNYAN_LEVEL = {
    trace: bunyan.TRACE,
    debug: bunyan.DEBUG,
    info: bunyan.INFO,
    error: bunyan.ERROR
  };
  if (process.env.LOG_LEVEL && process.env.LOG_LEVEL !== '') {
    // we might get log levels in the  form of "DEBUG" or "debug" so we normalise
    const logLevel = process.env.LOG_LEVEL.toLowerCase();
    if (LEVEL_TO_BUNYAN_LEVEL[logLevel]) {
      return LEVEL_TO_BUNYAN_LEVEL[logLevel];
    }
  } else if (
    process.env.NODE_ENV &&
    ENV_TO_BUNYAN_LEVEL[process.env.NODE_ENV]
  ) {
    return ENV_TO_BUNYAN_LEVEL[process.env.NODE_ENV];
  }
  return bunyan.INFO;
}

/**
 *      Basically to tell the logger to log the the file, function and line number
 *  Logging this is SLOW therefore it will be only available on DEV and PRE
 * @return {boolean}
 */
function getSrcInfo(): boolean {
  const ENV_TO_SRC_INFO = {
    development: true,
    preproduction: true,
    production: false
  };
  if (process.env.NODE_ENV && ENV_TO_SRC_INFO[process.env.NODE_ENV]) {
    return ENV_TO_SRC_INFO[process.env.NODE_ENV];
  }
  return false;
}

/**
 *  Mostly function created to be able to  test the logger
 *  because  we are using an approach of "singleton"
 * @return {Logger}
 */
export function createServerLogger(): bunyan {
  return bunyan.createLogger({
    name: 'webserver',
    serializers: {
      req: bunyan.stdSerializers.req,
      err: bunyan.stdSerializers.err
    },
    src: getSrcInfo(),
    streams: [
      {
        level: getLogLevel(),
        stream: new LoggerStream()
      }
    ]
  });
}

/**
 * This is the logger we will use throughout the entire application
 * @type {Logger}
 */
export const logger = createServerLogger();
