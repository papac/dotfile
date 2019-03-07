
/**
 * Convert Date
 * 
 * @param {Number|String} time
 * @return {Number}
 */
function convertDateToTimestemp(time) {
  if (time === 'now') {
    return 0;
  }

  if (time instanceof Date) {
    return (new Date) - time;
  }

  return time;
}

/**
 * Create the cron job  
 * 
 * @param {Object} setting 
 * @param {Function} task
 */
function cronjob(setting, task) {
  let timer;
  let isDone = false;
  let time = convertDateToTimestemp(setting.time || 0);
  let data = setting.data || {};

  function done() {
    if (timer) {
      clearTimeout(timer);
      isDone = true;
    }
  }

  timer = setTimeout(() => {
    task(data, done);
    if (!isDone) {
      cronjob({time, data}, task);
    }
  }, time);
}
