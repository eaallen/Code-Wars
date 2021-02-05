/*================================================================================
 * FILE:    scriptures.js
 * AUTHOR:  Elijah Allen
 * DATE:    Winter 2021
 * 
 * DESCRIPTION: Forntend web dev IS452 Scriptures and google maps
 */


const Scriptures = (function () {
    // ------------------------------------- Constants -----------------------------------
    const CLASS_BOOKS = 'books'
    const CLASS_VOLUMES = 'volume'
    const DIV_SCRIPTURE_NAVIGATOR = 'scripnav'
    const DIV_SCRIPTURES = 'scriptures'
    const TAG_HEADERS = 'h5'

    const REQUEST_GET = "GET"
    const REQUEST_STATUS_OK = 200
    const REQUEST_STATUS_ERROR = 400

    const URL_BASE = 'https://scriptures.byu.edu/'
    const URL_BOOKS = `${URL_BASE}mapscrip/model/books.php`
    const URL_VOLUMES = `${URL_BASE}mapscrip/model/volumes.php`
    //--------------------------------------- Variables -----------------------------------

    // useing state to keep track of the state of these varaibles in this module
    const state = {
        books: null, // array
        volumes: null // array
    }

    // ----------------------------------- Functions --------------------------------------
    const HTML = HTMLHelper // statuc class with helper functions 

    const onHashChange = function () {
        console.log('on hash change')
        const id_array = []
        const location = window.location
        const hash = location.hash

        if (hash !== "" && hash.length > 1) {
            id_array.push(...hash.slice(1).split(":"))
        }

        if (hash.length <= 0) {
            navigateHome()
        } else if (id_array.length === 1) {
            let volume_id = Number(id_array[0]) // convert id_array[0] from str to num

            if (volume_id < state.volumes[0].id || volume_id > state.volumes.slice(-1)[0].id) {
                navigateHome()
            } else {
                navigateHome(volume_id)
            }
        } else {
            let book_id = Number(id_array[1])
            console.log('----', state.books[book_id])
            if (state.books[book_id] === undefined) {
                navigateHome()
            } else {
                if (id_array.length === 2) {

                } else {
                    let chapter = Number(id_array[2])
                    // video part 6 -- 6:53 time in
                    navigateChapter(book_id, chapter)
                }
                navigateBook(book_id)
            }
        }


    }

    const navigateBook = function (book_id) {
        console.log('book', book_id)
    }
    const navigateChapter = function (book_id, chapter_id) {
        if (bookChapterValid(book_id, chapter_id)) {
           console.log('book', book_id, 'chapter', chapter_id)
           
        }else{
            console.error('Book or Chapter not Valid!')
        }
    }

    // refactor this for better validation 
    const bookChapterValid = function (book_id, chapter) {
        let book = state.books[book_id]

        // bad book, bad chapter, or chapter number is not in book
        if (book === undefined || chapter < 0 || chapter > book.numChapters) {
            return false
        }

        // chapter is zero and book has 1 or more chapters 
        if (chapter === 0 && book.numChapters > 0) {
            return false
        }

        return true
    }

    const navigateHome = function (volume_id) {
        const divs = [
            '<div>Old Testament </div>',
            '<div>New Testament</div>',
            '<div>Book of Mormon</div>',
            '<div>Doctrine and Covenants</div>',
            '<div>Pearl of Great Price</div>',
        ]

        document.getElementById(DIV_SCRIPTURES).innerHTML = divs.join('') + (volume_id ? volume_id : '')
    }

    const cacheBooks = function (callback) {
        state.volumes.forEach(volume => {
            const volume_books = []
            let book_id = volume.minBookId

            while (book_id <= volume.maxBookId) {
                volume_books.push(state.books[book_id])
                book_id++
            }
            volume.books = volume_books
        });
        if (typeof callback === 'function') {
            callback(state.volumes)
            // show the home options 
            navigateHome()
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
        ajax(URL_BOOKS, data => {
            state.books = data
            books_loaded = true
            if (vols_loaded) {
                cacheBooks(callback)
            }
        }, () => console.error('error books'))
        ajax(URL_VOLUMES, data => {
            state.volumes = data
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





