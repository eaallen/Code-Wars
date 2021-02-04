/*================================================================================
 * FILE:    scriptures.js
 * AUTHOR:  Elijah Allen
 * DATE:    Winter 2021
 * 
 * DESCRIPTION: Forntend web dev IS452 Scriptures and google maps
 */


const Scriptures = (function () {
    // ------------------------------------- Constants -----------------------------------
    const REQUEST_GET = "GET"
    const REQUEST_STATUS_OK = 200
    const REQUEST_STATUS_ERROR = 400
    //--------------------------------------- Variables -----------------------------------
    let books
    let volumes

    // ----------------------------------- Functions --------------------------------------
    const HTML = HTMLHelper // statuc class with helper functions 

    const onHashChange = function(){
        let hash = window.location.hash
        hash = hash.slice(1).split(":")
        console.log(hash)
    }

    const cacheBooks = function (callback) {
        volumes.forEach(volume => {
            const volume_books = []
            let book_id = volume.minBookId

            while (book_id <= volume.maxBookId) {
                volume_books.push(books[book_id])
                book_id++
            }
            volume.books = volume_books
        });
        if (typeof callback === 'function') {
            callback(volumes)
        }
    }

    const ajax = function (url, successCallback, failCallback) {
        let request = new XMLHttpRequest();
        request.open(REQUEST_GET, url, true);

        request.onload = function () {
            if (this.status >= REQUEST_STATUS_OK && this.status < REQUEST_STATUS_ERROR) {
                // Success!
                let data = JSON.parse(this.response);
                if (typeof successCallback === 'function') {
                    successCallback(data)
                }
            } else {
                // We reached our target server, but it returned an error
                if (typeof failCallback === 'function') {
                    failCallback(data)
                }
            }
        };

        request.onerror = failCallback

        request.send();
    }
    const init = function (callback) {
        let books_loaded = false
        let vols_loaded = false
        ajax('https://scriptures.byu.edu/mapscrip/model/books.php', data => {
            books = data
            books_loaded = true
            if (vols_loaded) {
                cacheBooks(callback)
            }
        }, () => console.error('error books'))
        ajax('https://scriptures.byu.edu/mapscrip/model/volumes.php', data => {
            volumes = data
            vols_loaded = true
            if (books_loaded) {
                cacheBooks(callback)
            }
        }, () => console.error('error volumes'))

    }

    return {
        init: init,
        onHashChange: onHashChange
    }
}())





