import moment from 'moment';

export class DateFormatValueConverter {
  // dateFormat
  toView(value) {
    return moment(value).format('Do MMMM YYYY, h:mm a');
  }

  fromView(value) {
    //
  }
}
