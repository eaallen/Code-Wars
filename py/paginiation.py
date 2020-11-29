# TODO: complete this class
import math
class PaginationHelper:
    # The constructor takes in an array of items and a integer indicating
    # how many items fit within a single page
    def __init__(self, collection, items_per_page):
        self.collection = list(collection)
        
        self.items_per_page = items_per_page
        
        self.pageCount = math.ceil(len(self.collection) / self.items_per_page)
        self.pages = list()
        for i in range(self.pageCount): 
            self.pages.append(self.collection[i*self.items_per_page:(i+1)*self.items_per_page])
        

        return
    # returns the number of items within the entire collection

    def item_count(self):
        return len(self.collection)

    # returns the number of pages
    def page_count(self):
        return self.pageCount

    # returns the number of items on the current page. page_index is zero based
    # this method should return -1 for page_index values that are out of range
    def page_item_count(self, page_index): 
        print(self.pages)
        if page_index < 0 or page_index >= len(self.pages): 
            return -1
        return len(self.pages[page_index])

    # determines what page an item is on. Zero based indexes.
    # this method should return -1 for item_index values that are out of range
    def page_index(self, item_index):
        if item_index < 0 or item_index >= len(self.collection):
            return -1
        page_idx = (item_index) / self.items_per_page
        return math.floor(page_idx)

ph = PaginationHelper(range(1,25),10)
print(ph.item_count())
print('page count',ph.page_count())
print('page item count',ph.page_item_count(1))
print('item page index',ph.page_index(0))