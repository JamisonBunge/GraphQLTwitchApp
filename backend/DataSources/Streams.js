const { RESTDataSource } = require("apollo-datasource-rest");

class Streams extends RESTDataSource {
    constructor() {
        super();
        this.ClientID = "ed2n0vspsa3f8qjz10kbe7yq99vzvd";
        //this.baseURL = "";
    }
    willSendRequest(request) {
        request.headers.set('Client-ID', this.ClientID);
    }
    async getStreams() {
        var result = await this.get("https://api.twitch.tv/helix/streams?first=20")
        return result.data
    }
}
module.exports = Streams
