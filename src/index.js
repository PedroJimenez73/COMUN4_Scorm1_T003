import ApiService from './services/ApiServices'; 
 
(async () => {
  await new ApiService().getConfiguration();
  require('./indexApp.js'); 
})();