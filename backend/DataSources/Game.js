const { RESTDataSource } = require("apollo-datasource-rest");

class Game extends RESTDataSource {
    constructor() {
        super();
        this.ClientID = "ed2n0vspsa3f8qjz10kbe7yq99vzvd"
    }
    willSendRequest(request) {
        request.headers.set('Client-ID', this.ClientID);
    }
    async getGame(id) {
        var result = await this.get("https://api.twitch.tv/helix/games?id=" + id)
        console.log(result.data)
        return result.data[0];
    }
}
module.exports = Game
