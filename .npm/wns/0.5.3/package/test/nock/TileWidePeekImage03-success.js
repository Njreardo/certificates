exports.setupMockScopes = function (nock) { var scopes = []; var scope; scope = 
nock('https://login.live.com:443')
  .post('/accesstoken.srf', "grant_type=client_credentials&client_id=ms-app%3A%2F%2Fs-1-15-2-145565886-1510793020-2797717260-1526195933-3912359816-44086043-2211002316&client_secret=FF9yfJLxSH3uI32wNKGye643bAZ4zBz7&scope=notify.windows.com")
  .reply(200, "{\"token_type\":\"bearer\",\"access_token\":\"EgAaAQMAAAAEgAAACoAA4VgJKpdg3JHM/PaLZ50sNfcOVLTuCWvLpH8ltXxGV+0C2ums/9X/7hHE2pzChrGtxRdpL5OLWhAUroYtCat06C/d7m+Turmxnc3ff6gPkoClUl8sALOw+QGRfkUQ80nyReIURKKNJgbBDqgv+TupqzBoX9oXXw61cGZ4nTZDOnaJAFoAiQAAAAAAaoEOREpOJFFKTiRR60gEAA0ANjcuMTg1LjE0OC44AAAAAABcAG1zLWFwcDovL3MtMS0xNS0yLTE0NTU2NTg4Ni0xNTEwNzkzMDIwLTI3OTc3MTcyNjAtMTUyNjE5NTkzMy0zOTEyMzU5ODE2LTQ0MDg2MDQzLTIyMTEwMDIzMTYA\",\"expires_in\":86400}", { 'cache-control': 'no-store',
  'content-length': '436',
  'content-type': 'application/json',
  server: 'Microsoft-IIS/7.5',
  ppserver: 'PPV: 30 H: BAYIDSLGN1K33 V: 0',
  date: 'Wed, 20 Feb 2013 04:17:13 GMT',
  connection: 'close' });
scopes.push(scope);scope = 
nock('https://bn1.notify.windows.com:443')
  .post('/?token=AgYAAACFGdWBiRCTypHebfvngI7DuNBXWuGjdiczDOZ7bSgkbCRrD2M1b10CpzCmipzknHbU4nLzapQbooXzJ%2fVwHAfSl%2fWMk8OsetohEVMlsIicoLP99rDg7g2AdENA99DZoAU%3d', "<tile><visual><binding template=\"TileWidePeekImage03\"><image id=\"1\" src=\"http://textParam1.com\" alt=\"http://textParam2.com\"/><text id=\"1\">http://textParam3.com</text></binding></visual></tile>")
  .reply(200, "", { 'content-length': '0',
  'x-wns-notificationstatus': 'received',
  'x-wns-msg-id': '374F2308304F11BB',
  'x-wns-debug-trace': 'BN1WNS1011331',
  date: 'Wed, 20 Feb 2013 04:17:14 GMT' });
scopes.push(scope);return scopes; };