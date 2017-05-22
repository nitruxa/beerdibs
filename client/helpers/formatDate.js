import moment from 'moment';

export default function formatDate(date) {
    const today = moment(new Date()).format('YYYY-MM-DDT00:00Z');
    const diffDays = moment(moment(date).format('YYYY-MM-DDT00:00Z')).diff(today, 'days');
    const dateFormat = diffDays < 0 ? (diffDays > -7 ? 'ddd HH:mm' : 'MMM DD HH:mm') : 'HH:mm';
    return moment(date).format(dateFormat);
}
