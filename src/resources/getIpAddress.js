import $ from 'jquery';
import StockProvider from './stock_provider';
const stockService = new StockProvider();

async function GetIpAddress(to, from) {
  // get ip address
  var ip = '';
  var access_key = '142b8ac74c490d26788b4702f69850b6';
  await $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', data => {
    ip = data.geobytesipaddress;
  });
  // get the API result via jQuery.ajax
  $.ajax({
    url: 'http://api.ipapi.com/' + ip + '?access_key=' + access_key,
    dataType: 'jsonp',
    success: async function(json) {
      // output the "calling_code" object inside "location"
      var result = {};
      result['IP_Address'] = json.ip;
      result['Continent'] = json.continent_name;
      result['Country'] = json.country_name;
      result['Region'] = json.region_name;
      result['Latitude'] = json.latitude;
      result['Longitude'] = json.longitude;
      result['Flag'] = json.location.country_flag;
      result['Path_To'] = document.location.origin + to;
      result['Path_From'] = document.location.origin + from;
      await stockService.postVisitor(
        'https://cors-anywhere.herokuapp.com/http://ec2-54-206-110-80.ap-southeast-2.compute.amazonaws.com:4001/api/visitor',
        result
      );
    }
  });
}

export default GetIpAddress;
