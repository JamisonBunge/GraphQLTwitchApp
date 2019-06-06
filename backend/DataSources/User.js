const { RESTDataSource } = require("apollo-datasource-rest");

class User extends RESTDataSource {
    constructor() {
        super();
        this.ClientID = "ed2n0vspsa3f8qjz10kbe7yq99vzvd"
    }
    willSendRequest(request) {
        request.headers.set('Client-ID', this.ClientID);
    }
    async getUser(login) {
        var result = await this.get("https://api.twitch.tv/helix/users?login=" + login)
        return result.data[0];
    }
}
module.exports = User
