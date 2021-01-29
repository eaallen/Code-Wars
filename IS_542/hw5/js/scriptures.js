
const Scriptures = (function () {
    // Constants
    let books
    let volumes

    const cacheBooks = function(callback){
        volumes.forEach(volume => {
            const volume_books = [] 
            let book_id = volume.minBookId

            while(book_id <= volume.maxBookId){
                volume_books.push(books[book_id])
                book_id++
            }
            volume.books = volume_books
        });
        if(typeof callback === 'function'){
            callback()
        }
        console.log(volumes)
    }

    const ajax = function (url, successCallback, failCallback) {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
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
            if(vols_loaded){
                cacheBooks(callback)
            }
        }, () => console.error('error'))
        ajax('https://scriptures.byu.edu/mapscrip/model/volumes.php', data => {
            volumes = data
            vols_loaded = true
            if(books_loaded){
                cacheBooks(callback)
            }
        })

    }

    return {
        init: init,
        books:books,
        volumes:volumes
    }
}())