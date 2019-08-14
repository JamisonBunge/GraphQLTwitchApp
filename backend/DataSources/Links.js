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


    parseUserName(siteTitle, siteLink) {

    }

    async getLinks(user_name) {
        var links = [];
        var httpLinks = [];
        var allLinksSet = new Set()  //use this to move all the links to lower case to see if theres any duplicates
        var allLinks = []           //will hold the regular cased links
        var rawLink;
        var twitter = [];
        var siteTitle = ["twitter.com", "instagram.com"]
        var user_name_list = [String]
        //0 -> twitter
        //1 -> instagram

        try {


            var result = await this.get("https://api.twitch.tv/api/channels/" + user_name + "/panels ")


            //bug: some user_names have a space in their name... this needs to be fixed some how...

            //links, httpLinks, allLinks
            for (var x in result) {
                if (result[x].data.link != undefined) {
                    rawLink = result[x].data.link
                    links.push(rawLink)
                    if (!allLinksSet.has(rawLink.toLowerCase())) {
                        allLinks.push(rawLink)
                        allLinksSet.add(rawLink.toLowerCase())
                    }
                } else {
                    var splitRes = result[x].html_description.split("href=\"");
                    for (var y = 1; y < splitRes.length; y++) {
                        rawLink = splitRes[y].substr(0, splitRes[y].indexOf('"'));
                        httpLinks.push(rawLink)
                        if (!allLinksSet.has(rawLink.toLowerCase())) {
                            allLinks.push(rawLink)
                            allLinksSet.add(rawLink.toLowerCase())
                        }

                    }
                }
            }

            //twitter_user_name, instagram_user_name
            for (var site in siteTitle) {
                var arraytopush = []
                for (var x in allLinks) {
                    var temp = allLinks[x].toLowerCase()
                    if (temp.includes(siteTitle[site])) {
                        var siteByParts = allLinks[x].split("/")
                        for (var y in siteByParts) {
                            console.log(y)
                            console.log(siteByParts[y])
                        }
                        arraytopush.push(siteByParts[3]) //this direct accessing of 3 could become a problem, consider making sure its safe to do this
                    }
                }
                user_name_list[site] = arraytopush;
            }
            return { "user_name": user_name, "allLinks": allLinks, "links": links, "httpLinks": httpLinks, "twitter_user_name": user_name_list[0], "instagram_user_name": user_name_list[1] }
        }
        catch {
            console.log("here")
            return { "user_name": "", "allLinks": [], "links": [], "httpLinks": [], "twitter_user_name": [], "instagram_user_name": [] }
        }
    }
}
module.exports = Links
