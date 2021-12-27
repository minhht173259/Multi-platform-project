import moment from 'moment';

export const getTimeAndDate = created => {
  if (created) {
    const now = moment.now();
    const time = moment.utc(created).fromNow();
    // console.log('time: ', { time, created: moment.utc(created).format('DD/MM/YYYY HH:mm') });
    const result = moment(created).format('DD/MM HH:mm');
    return result;
  }
};
