// TODO: complete this object/class

const { throws } = require("assert")

// The constructor takes in an array of items and a integer indicating how many
// items fit within a single page
function PaginationHelper(collection, itemsPerPage) {
    this.collection = collection
    this.itemsPerPage = itemsPerPage

    this.page_count = Math.ceil(this.collection.length / this.itemsPerPage)

    this.pages = []
    for (let i = 0; i < this.collection.length; i++) {
        const arr = this.collection.slice(i * this.itemsPerPage, (i + 1) * this.itemsPerPage)
        arr[0] ? this.pages.push(arr) : null
    }
}

// returns the number of items within the entire collection
PaginationHelper.prototype.itemCount = function () {
    return this.collection.length
}

// returns the number of pages
PaginationHelper.prototype.pageCount = function () {
    return this.page_count
}

// returns the number of items on the current page. page_index is zero based.
// this method should return -1 for pageIndex values that are out of range
PaginationHelper.prototype.pageItemCount = function (pageIndex) {
    if (pageIndex < 0 || pageIndex >= this.pages.length) {
        return -1
    }
    return this.pages[pageIndex].length
}

// determines what page an item is on. Zero based indexes
// this method should return -1 for itemIndex values that are out of range
PaginationHelper.prototype.pageIndex = function (itemIndex) {
    if (pageIndex < 0 || pageIndex >= this.pages.length) {
        return -1
    }
    idx = itemIndex / this.itemsPerPage
    return Math.floor(idx)
}

PaginationHelper.prototype.test = () => { console.log('test') }

const yeet = new PaginationHelper([1, 2, 3, 4], 1)
console.log(yeet.pages)
console.log(yeet.pageItemCount(1))