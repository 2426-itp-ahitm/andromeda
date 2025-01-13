class TextFormatter:
      keyword = ""
      def __init__(self,keyword ) -> None:
        self.keyword = keyword
        pass
      def clearTextBeforeKeyword(self,input_string):
            index = input_string.find(self.keyword)
            if index != -1:
                return input_string[index:]
            pass