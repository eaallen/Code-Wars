/*================================================================================
 * FILE:    scriptures.js
 * AUTHOR:  Elijah Allen
 * DATE:    Winter 2021
 * 
 * DESCRIPTION: Forntend web dev IS 452 Scriptures and google maps
 * 
 * GLOBALS: 
 *  <object> HTMLHelper - static methods for creating html elements, 
 *  <object> map - google map object
 *  <object> MarkerWithLabel - marker for map, 
 *  <object> UI - handles UI spesific logic (accordian and div size), 
 * 
 * TABLE OF CONTENTS:
 *  1. Constants
 *  2. Full Scope Module Wide Variables
 *  3. Functions
 *      a. Imported Moduels
 *      b. Grid Rendering
 *      c. Hash Managment
 *      d. Marker Handlers
 *      e. Navigation Handlers
 *      f. Other Rendering
 *      g. Show Location
 *      h. Initalization and Getting Data
 * 
 ===============================================================================*/



const Scriptures = (function () {
    // ------------------------------------- Constants -----------------------------------
    const CLASS_BOOKS = 'books'
    const CLASS_BUTTON = 'btn'
    const CLASS_BUTTON_LINK = 'btn-link'
    const CLASS_CHAPTER = 'chapter'
    const CLASS_VOLUMES = 'volume'
    const CLASS_ACCORDIAN = 'accordion'
    const CLASS_PANEL_FOR_ACCORDIAN = 'panel-for-accordian'
    const CLASS_MAP_LABELS = 'labels'

    const DIV_SCRIPTURE_NAVIGATOR = 'scripnav'
    const DIV_SCRIPTURES = 'scriptures'
    const TAG_HEADER_5 = 'h5'

    const REQUEST_GET = "GET"
    const REQUEST_STATUS_OK = 200
    const REQUEST_STATUS_ERROR = 400

    const URL_BASE = 'https://scriptures.byu.edu/'
    const URL_BOOKS = `${URL_BASE}mapscrip/model/books.php`
    const URL_VOLUMES = `${URL_BASE}mapscrip/model/volumes.php`
    const URL_SCRIPTURES = `${URL_BASE}mapscrip/mapgetscrip.php`

    const GEO_LOCATION_REGEX = /\((.*),'(.*)',(.*),(.*),(.*),(.*),(.*),(.*),(.*),(.*),'(.*)'\)/
    const GEO_LOCATION_INDEX_FLAG = 11
    const GEO_LOCATION_INDEX_LATITUDE = 3
    const GEO_LOCATION_INDEX_LONGITUDE = 4
    const GEO_LOCATION_INDEX_PLACE_NAME = 2

    //--------------------------------------- Variables -----------------------------------

    // using state to keep track of these varaibles in this module
    const state = {
        books: null, // will be turned into an array
        volumes: null, // will be turned into an array
        gmap_markers: []
    }

    // ==================================== Functions ======================================
    // static class with helper functions 
    const HTML = HTMLHelper // addess: ./HTMLHelper.js

    // ----------------------------------- Grid Rendering ---------------------------------
    // generates a grid for the books 
    const booksGrid = function (volume) {
        return HTML.div({
            class_name: `${CLASS_BOOKS} ${CLASS_PANEL_FOR_ACCORDIAN}`,
            content: booksGridContent(volume)
        })
    }

    // this is the content for the grid
    const booksGridContent = function (volume) {
        let grid_content = ''
        volume.books.forEach(book => {
            grid_content += HTML.link({
                class_name: CLASS_BUTTON_LINK,
                id: '',
                href: `#${volume.id}:${book.id}`,
                content: HTML.div({
                    class_name: CLASS_BUTTON,
                    id: book.id,
                    content: book.gridName
                })
            })
        })
        return grid_content
    }

    const volumesGridContent = function (volume_id) {
        let grid_content = ''
        state.volumes.forEach(volume => {
            //  show all volumes            show one volume
            if (volume_id === undefined || volume_id === volume.id) {
                grid_content += HTML.div({
                    class_name: `${CLASS_VOLUMES} ${CLASS_ACCORDIAN}`,
                    content: HTML.element(TAG_HEADER_5, volume.fullName)
                })
                grid_content += booksGrid(volume)
            }
        }
        )

        return grid_content
    }


    // generates a grid for the chapters of a book 
    const chaptersGrid = function (book) {
        return HTML.div({
            class_name: CLASS_VOLUMES,
            content: HTML.element(TAG_HEADER_5, book.fullName)
        }) + HTML.div({
            class_name: CLASS_BOOKS,
            content: chaptersGriContent(book)
        })
    }

    // this is the content for the grid
    const chaptersGriContent = function (book) {
        let grid_content = ''
        let chapter = 1

        // loops for all chapters in book
        while (chapter <= book.numChapters) {
            grid_content += HTML.link({
                class_name: CLASS_CHAPTER,
                id: chapter.toString() + '_chapter_id',
                href: `#0:${book.id}:${chapter}`,
                content: HTML.div({
                    class_name: CLASS_BUTTON,
                    content: chapter
                })
            })
            chapter++
        }
        return grid_content
    }

    // ------------------------------------ Hash Managment -------------------------------------
    //  use the url hash as state management. we store 
    //  important data in the url hash and read it when it changes to 
    //  to render the rest of the app. 
    const onHashChange = function () {
        const id_array = []
        const location = window.location
        const hash = location.hash

        if (hash !== "" && hash.length > 1) {
            id_array.push(...hash.slice(1).split(":"))
        }

        // state management 
        if (hash.length <= 0) {
            navigateHome()
            return
        } else if (id_array.length === 1) {
            let volume_id = Number(id_array[0]) // convert id_array[0] from str to num

            if (volume_id < state.volumes[0].id || volume_id > state.volumes.slice(-1)[0].id) {
                navigateHome()
                return
            } else {
                navigateHome(volume_id)
                return
            }
        } else {
            let book_id = Number(id_array[1])
            console.log('----', state.books[book_id])
            if (state.books[book_id] === undefined) {
                navigateHome()
                return
            } else {
                if (id_array.length === 2) {
                    // Somthing should happen here but i do not know what 
                } else {
                    let chapter = Number(id_array[2])
                    if (chapter > state.books[book_id].numChapters) {
                        navigateHome()
                        return
                    } else {
                        navigateChapter(book_id, chapter)
                        return
                    }
                }
                navigateBook(book_id)
                return
            }
        }
    }


    // --------------------------------- Marker Handlers ----------------------------------
    const addMarker = function (place_name, lat, lng) {
        // make sure these are floating values 
        lat = Number(lat)
        lng = Number(lng)

        // remove duplicate

        //  creat new marker and add to array of markers 
        const label_text = place_name.replace(/[<>~?]/, '')
        let marker = new MarkerWithLabel({
            position: { lat: lat, lng: lng },
            map: map,
            labelContent: label_text, // can also be HTMLElement
            labelAnchor: new google.maps.Point(((label_text.length / 2) * -10), 3),
            labelClass: CLASS_MAP_LABELS, // the CSS class for the label
            labelStyle: { opacity: 1.0 },
            title: place_name,
        })
        state.gmap_markers.push(marker)
    }

    const centerMapMarkers = function (map_markers_array) {
        if (map_markers_array.length > 0) {
            let bounds = new google.maps.LatLngBounds();
            for (const marker of map_markers_array) {
                loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                bounds.extend(loc);
            }
            map.fitBounds(bounds);
        }
        return
    }

    const clearMarkers = function () {
        for (let i = 0; i < state.gmap_markers.length; i++) {
            state.gmap_markers[i].setMap(null)
        }
        state.gmap_markers = []
    }

    const setUpMarkers = function () {
        // clear existing markers
        if (state.gmap_markers.length > 0) {
            console.log('clear markers!!!')
            clearMarkers()
        }
        // add a marker for each link that calles the "showLocation" method in the chapter contents
        document.querySelectorAll("a[onclick^=\"showLocation(\"]").forEach(element => {
            let matches = GEO_LOCATION_REGEX.exec(element.getAttribute('onclick'))

            if (matches) {
                let place_name = matches[GEO_LOCATION_INDEX_PLACE_NAME]
                let lat = matches[GEO_LOCATION_INDEX_LATITUDE]
                let lng = matches[GEO_LOCATION_INDEX_LONGITUDE]
                let flag = matches[GEO_LOCATION_INDEX_FLAG]

                if (flag !== '') {
                    place_name = `${place_name} ${flag}`
                }
                addMarker(place_name, lat, lng)
            }
        })
        // filter markers, remove duplicates
        uniqueMarkers()
    }

    const uniqueMarkers = function () {
        // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
        
        let j = {}
        for (const marker of state.gmap_markers) {
            const lat = marker.position.lat()
            const lng = marker.position.lng()
            const labelContent = marker.labelContent
            if (j[`${lat}:${lng}`]) {
                if (!j[`${lat}:${lng}`].labelContent.includes(labelContent)) {
                    console.log('filter succes')

                    let label = j[`${lat}:${lng}`].labelContent + `, ${labelContent}`

                    j[`${lat}:${lng}`].setMap(null)

                    j[`${lat}:${lng}`] = new MarkerWithLabel({
                        position: { lat: lat, lng: lng },
                        map: map,
                        labelContent: label, // can also be HTMLElement
                        labelAnchor:
                            new google.maps.Point(((labelContent.length / 2) * -10), 3),
                        labelClass: CLASS_MAP_LABELS, // the CSS class for the label
                        labelStyle: { opacity: 1.0 },
                        title: this.labelContent,
                    })
                }
                marker.setMap(null)
            } else {
                j[`${lat}:${lng}`] = marker
            }
        }
        state.gmap_markers = Object.keys(j).map(key => j[key])
    }

    // ---------------------------------- Navigation Hanlers ------------------------------
    // Navigates to the Home View
    const navigateHome = function (volume_id) {

        document.getElementById(DIV_SCRIPTURES).innerHTML = HTML.div({
            id: DIV_SCRIPTURE_NAVIGATOR,
            content: volumesGridContent()
        })

        UI.accordian(CLASS_ACCORDIAN)

        // show accordian section as active if it matches the volume ID
        if (volume_id) {
            let acc = document.getElementsByClassName(CLASS_ACCORDIAN);
            acc[volume_id - 1].classList.add('active')
            acc[volume_id - 1].nextElementSibling.style.display = "block";
        }

        // bread crumb
        document.getElementById('breadcrumb_book').style.visibility = 'hidden'
        document.getElementById('breadcrumb_chapter').style.visibility = 'hidden'
    }

    // navigate to the books contents, display book name in breadcrumb 
    const navigateBook = function (book_id) {
        let book = state.books[book_id];

        // handleing breadcrum
        document.getElementById('breadcrumb_chapter').style.visibility = 'hidden'
        document.getElementById('breadcrumb_book').style.visibility = 'visible'
        document.getElementById('breadcrumb_book').innerHTML = HTML.hashLink(
            `0:${book_id}`,
            `${book.citeFull}`
        )

        if (book.numChapters <= 1) {
            navigateChapter(book_id, book.numChapters)
        } else {
            document.getElementById(DIV_SCRIPTURES).innerHTML = HTML.div({
                id: DIV_SCRIPTURE_NAVIGATOR,
                content: chaptersGrid(book)
            })
        }
    }

    // Ajax call to get chapter data, see getScripturesCallback for 
    // how this data is processed
    const navigateChapter = function (book_id, chapter_id) {
        ajax(
            encodedScripturesUrlParams(book_id, chapter_id),
            html => getScripturesCallback(html, book_id, chapter_id),
            getScripturesFailure,
            true
        )
    }

    // handles date recieved from the server:
    // Renders: chapter contents, next / back links, and breadcrumb 
    const getScripturesCallback = function (html, book_id, chapter_id) {
        // getting next and previous chapters
        const [next_book_id, next_chapter_value, next_title] = nextChapter(book_id, chapter_id) ||
            [false, false, false]
        const [prev_book_id, prev_chapter_value, prev_title] = prevChapter(book_id, chapter_id) ||
            [false, false, false]

        // display the "next" & "back" elements, if there are no more 
        // chapters in the volume then go back to the volumes list
        const back_to_volumes = HTML.hashLink('0', 'Volumes')
        document.getElementById(DIV_SCRIPTURES).innerHTML = `
        <div class="chapter-nav">
            <div id="prev_btn" class="chapter-nav-btn" title="${prev_title}"> ${prev_book_id ? HTML.hashLink(
            `0:${prev_book_id}:${prev_chapter_value}`,
            'Back'
        ) : back_to_volumes} </div>
            <div id="next_btn" class="chapter-nav-btn" title="${next_title}">  ${next_book_id ? HTML.hashLink(
            `0:${next_book_id}:${next_chapter_value}`,
            'Next'
        ) : back_to_volumes} </div> 
        </div>${html}`

        // display the makers on the map
        setUpMarkers()

        // fit all of the markers in the map's view
        centerMapMarkers(state.gmap_markers)

        // set up breadcrumb
        document.getElementById('breadcrumb_book').style.visibility = 'visible'
        document.getElementById('breadcrumb_book').innerHTML = HTML.hashLink(
            `0:${book_id}`,
            `${state.books[book_id].citeFull}`
        )
        if (chapter_id) {
            document.getElementById('breadcrumb_chapter').style.visibility = 'visible'
            document.getElementById('breadcrumb_chapter').innerHTML = HTML.hashLink(
                `0:${book_id}:${chapter_id}`,
                `Chapter ${chapter_id}`
            )
            // clicking the chapter breadcrumb will recenter the markers on the map
            document.getElementById('breadcrumb_chapter').addEventListener('click', () => {
                centerMapMarkers(state.gmap_markers)
            })
        } else {
            document.getElementById('breadcrumb_chapter').style.visibility = 'hidden'
        }

    }


    // encodes data for GET request, used with navigateChapter
    const encodedScripturesUrlParams = function (book_id, chapter_id, verses, is_jst) {
        if (book_id !== undefined && chapter_id !== undefined) {
            let options = '';
            if (verses !== undefined) {
                options += verses
            }
            if (is_jst !== undefined) {
                options += '&jst=JST'
            }
            return `${URL_SCRIPTURES}?book=${book_id}&chap=${chapter_id}&verses=${options}`
        }
        console.error('Book ID or Chapter ID are Undefined')
    }

    // errer handling for navigateChapter()
    const getScripturesFailure = function (data) {
        document.getElementById(DIV_SCRIPTURES).innerHTML = 'Error'
        console.error('unable to retireve data', data)
    }



    // gets the info for the next chapter / book in the volume
    // returns null if there are no more books or chapters
    const nextChapter = function (book_id, chapter_num) {
        let book = state.books[book_id]
        if (book !== undefined) {
            // looking for next chapter in book
            if (chapter_num < book.numChapters) {
                return [
                    book_id,
                    chapter_num + 1,
                    titleForBookChapter(book, chapter_num + 1)
                ]
            }

            let next_book = state.books[book_id + 1]

            if (next_book !== undefined) {
                let next_chapter_value = 0
                if (next_book.numChapters > 0) {
                    next_chapter_value = 1
                }

                return [
                    next_book.id,
                    next_chapter_value,
                    titleForBookChapter(next_book, next_chapter_value)
                ]
            }
        }
        return null
    }

    // gets the info for the previous chapter / book in the volume
    // returns null if there are no more books or chapters
    const prevChapter = function (book_id, chapter_num) {
        console.log('prev chapter')
        let book = state.books[book_id]
        console.log('book -->', book)
        if (book !== undefined) {
            // looking for next chapter in book
            if (chapter_num > 1) {
                return [
                    book_id,
                    chapter_num - 1,
                    titleForBookChapter(book, chapter_num - 1)
                ]
            }
            // else: look for next book
            let next_book = state.books[book_id - 1]

            if (next_book !== undefined) {
                let next_chapter_value = 0
                if (next_book.numChapters > 0) {
                    next_chapter_value = next_book.numChapters
                }

                return [
                    next_book.id,
                    next_chapter_value,
                    titleForBookChapter(next_book, next_chapter_value)
                ]
            }
        }
        return null
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

    // ------------------------------- Other Rendering --------------------------------
    const titleForBookChapter = function (book, chapter_num) {
        if (book !== undefined) {
            if (chapter_num > 0) {
                return `${book.tocName} ${chapter_num}`
            }

            return book.tocName
        }
    }

    // ----------------------------------- SHOW LOCATION -----------------------------------
    const showLocation = function (
        geotagId,
        placename,
        latitude,
        longitude,
        viewLatitude,
        viewLongitude,
        viewTilt,
        viewRoll,
        viewAltitude,
        viewHeading,
        symbol,
    ) {
        // convert strings to numbers
        const lat = Number(latitude)
        const lng = Number(longitude)
        const alt = Number(viewAltitude)

        const latLng = new google.maps.LatLng({ lat, lng })

        // set the zoom level depending on the altitude 
        if (alt >= 5000) {
            map.setZoom(12)
        } else if (alt >= 2000) {
            map.setZoom(15)
        } else {
            map.setZoom(17)
        }

        // show the marker in the center of the map
        map.setCenter(latLng)
    }


    // ------------------------ Initalization and Getting Data -----------------------------
    // combines books with thier propper volume
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

        }
    }

    // XHR Requests 
    const ajax = function (url, successCallback, failCallback, skip_json_parse) {
        let request = new XMLHttpRequest();
        request.open(REQUEST_GET, url, true);

        request.onload = function () {
            if (request.status >= REQUEST_STATUS_OK && request.status < REQUEST_STATUS_ERROR) {
                // Success!
                let data = skip_json_parse
                    ? request.response
                    : JSON.parse(request.response);
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
        }, () => console.error('error loading books'))
        ajax(URL_VOLUMES, data => {
            state.volumes = data
            vols_loaded = true
            if (books_loaded) {
                cacheBooks(callback)
            }
        }, () => console.error('error loading volumes'))

    }

    return {
        init,
        onHashChange,
        showLocation,
    }
}())