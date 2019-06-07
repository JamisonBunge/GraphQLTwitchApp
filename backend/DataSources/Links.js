const { RESTDataSource } = require("apollo-datasource-rest");

class Links extends RESTDataSource {
    constructor() {
        super();
        this.ClientID = "ed2n0vspsa3f8qjz10kbe7yq99vzvd"
    }
    willSendRequest(request) {
        request.headers.set('Client-ID', this.ClientID);
    }
    // async getUser(login) {
    //     var result = await this.get("https://api.twitch.tv/helix/users?login=" + login)
    //     return result.data[0];
    // }
    async getLinks(user_name) {
        var links = [];
        // var twitter = [];

        var result = await this.get("https://api.twitch.tv/api/channels/" + user_name + "/panels ")

        //THIS DOES NOT WORK FULLY YET, ONLY GRABS LINKS THAT ARE IN PANNEL IMAGE FORMAT
        //NEED TO ALSO PARSE HTML_DESCRIPTION


        for (var x in result) {
            console.log(result[x].data.link)
            if (result[x].data.link != undefined) {
                links.push(result[x].data.link)
            }
        }

        return { "links": links }
    }
}
module.exports = Links
