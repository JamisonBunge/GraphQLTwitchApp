const { RESTDataSource } = require("apollo-datasource-rest");

class Page extends RESTDataSource {
    constructor() {
        super();
        this.ClientID = "ed2n0vspsa3f8qjz10kbe7yq99vzvd"
    }
    willSendRequest(request) {
        //  request.headers.set('Client-ID', this.ClientID);
    }
    async getGame(id) {
        var result = await this.get("https://www.twitch.tv/shadowchefsteve")
        console.log(result)
        return result
    }
}
module.exports = Page
