const { WSClient } = require('@0x/mesh-rpc-client');

(
  async function() {
    const client = new WSClient('http://localhost:60559');
    //console.log('stats', await client.getStatsAsync());
  }
)();