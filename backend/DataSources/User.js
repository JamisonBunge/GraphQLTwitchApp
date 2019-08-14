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
        try {
            var result = await this.get("https://api.twitch.tv/helix/users?login=" + login)
            return result.data[0];
        } catch {
            return { "id": "", "description": "", "display_name": "", "profile_image_url": "", "view_count": "", "broadcaster_type": "", "stream": "", "links": "" }
        }
    }
    async getUserr(id) {
        var result = await this.get("https://api.twitch.tv/helix/users?id=" + id)
        console.log(id)
        console.log(result.data[0])
        return result.data[0];
    }
}
module.exports = User
