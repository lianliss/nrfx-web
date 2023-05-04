import moment from 'moment';

/**
 * Returns "from time" and "to time" diff.
 * @param {Date} to
 * @param {Date} from
 * @returns {number}
 */
export const getTimeDiff = (to, from) => moment(to).diff(moment(from));

/**
 * Returns rounded time in string.
 * @param {Date} time
 * @returns {string}
 */
export const getRoundedTime = (time) => moment.duration(time).humanize(true);
