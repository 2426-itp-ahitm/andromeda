import requests
class listLoader:
    def getStandartURL(self, selectedURL):
        r = requests.get(url = selectedURL)
        data = r.json()
        return data
    def getUserPrompts(self, selectedURL, userID):
        url_with_user_id = selectedURL.replace("${userId}", str(userID))
        r = requests.get(url=url_with_user_id)
        data = r.json()
        return data