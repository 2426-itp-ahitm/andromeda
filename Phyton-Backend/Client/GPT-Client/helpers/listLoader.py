import requests
class listLoader:
    def getStandartURL(self, selectedURL):
        r = requests.get(url = selectedURL)
        data = r.json()
        return data
    def getUserPrompts(self, selectedURL, userID):
        PARAMS = {'userID':userID}
        r = requests.get(url = selectedURL, params = PARAMS)
        data = r.json()
        return data

