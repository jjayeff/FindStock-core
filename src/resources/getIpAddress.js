import $ from 'jquery'
import StockProvider from './stock_provider';
const stockService = new StockProvider()

async function GetIpAddress (to, from) {
  // get ip address
  await $.getJSON("https://ipapi.co/json/", async function(json) {
    var result = {}
    result["IP_Address"] = json.ip;
    result["Continent"] = json.continent_code;
    result["Country"] = json.country_name;
    result["Region"] = json.region;
    result["Org"] = json.org;
    result["Latitude"] = json.latitude;
    result["Longitude"] = json.longitude;
    result["Path_To"] = document.location.origin + to;
    result["Path_From"] = document.location.origin + from;
    //await stockService.postVisitor('https://cors-anywhere.herokuapp.com/http://findstockapi.cloudapp.net/api/visitor', result);
  });

}

export default GetIpAddress