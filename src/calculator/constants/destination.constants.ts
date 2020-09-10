export class DESTINATION_REQUEST {
  static readonly ENDPOINT = 'https://maps.googleapis.com/maps/api/directions/';
  static readonly OUTPUT_FORMAT = 'json?';
  static readonly FULL_ENDPOINT = `${DESTINATION_REQUEST.ENDPOINT}${DESTINATION_REQUEST.OUTPUT_FORMAT}`;
  static readonly CORS_SERVER: 'https://cors-anywhere.herokuapp.com/';
  static readonly APIKEY = 'AIzaSyCXYNK5snYeEqmSLWOw15Z_Rihuv0T5z54';
}
