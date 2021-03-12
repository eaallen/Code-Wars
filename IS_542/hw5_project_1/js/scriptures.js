/*================================================================================
 * FILE:    scriptures.js
 * AUTHOR:  Elijah Allen
 * DATE:    Winter 2021
 * 
 * DESCRIPTION: Frontend web dev IS 452 Scriptures and google maps
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

// ------------------------------------- Constants -----------------------------------
const CLASS_BOOKS = 'books'
const CLASS_BUTTON = 'btn'
const CLASS_ACCORDIAN_GRID = 'accordian-grid'
const CLASS_FILLER = 'filler'
const CLASS_GRID = 'grid'
const CLASS_GRID_ITEM = 'grid-item'
const CLASS_DISPLAY = 'display'
const CLASS_BUTTON_LINK = 'btn-link'
const CLASS_CHAPTER = 'chapter'
const CLASS_VOLUMES = 'volume'
const CLASS_ACCORDIAN = 'accordion'
const CLASS_PANEL_FOR_ACCORDIAN = 'panel-for-accordian'
const CLASS_MAP_LABELS = 'labels'

const DIV_SCRIPTURE_NAVIGATOR = 'current_view'
const DIV_CHAPTER_NAV = 'navigator'
const DIV_SCRIPTURES = 'current_view'
const DIV_NEXT_VIEW = 'next_view'
const DIV_PREV_VIEW = 'prev_view'
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
const GEO_LOCATION_INDEX_ALTITUDE = 9
const GEO_LOCATION_INDEX_LATITUDE = 3
const GEO_LOCATION_INDEX_LONGITUDE = 4
const GEO_LOCATION_INDEX_PLACE_NAME = 2

const ANIMATION_SPEED = 300

//--------------------------------------- Variables -----------------------------------

// using state to keep track of these varaibles in this module
const state = {
    books: null, // will be turned into an array
    volumes: null, // will be turned into an array
    gmap_markers: [],
    animation_direction: null,
    prev_html: '',
    next_html: '',
    in_animation: true,
}

// ==================================== Functions ======================================
// static class with helper functions 
const HTML = HTMLHelper // addess: ./HTMLHelper.js

// ----------------------------------- Grid Rendering ---------------------------------
// generates a grid for the books 
const booksGrid = function (volume) {
    return HTML.div({
        class_name: `${CLASS_BOOKS} ${CLASS_PANEL_FOR_ACCORDIAN} ${CLASS_ACCORDIAN_GRID}`,
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
                class_name: `${CLASS_BUTTON} ${CLASS_GRID_ITEM}`,
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
    })
    grid_content += HTML.div({
        class_name: `${CLASS_FILLER}`,
        content: ''
    })


    return grid_content
}


// generates a grid for the chapters of a book 
const chaptersGrid = function (book) {
    return HTML.div({
        class_name: `${CLASS_VOLUMES} ${CLASS_DISPLAY}`,
        content: HTML.element(TAG_HEADER_5, book.fullName)
    }) + HTML.div({
        class_name: `${CLASS_BOOKS} ${CLASS_GRID}`,
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
            class_name: `${CLASS_CHAPTER}`,
            id: chapter.toString() + '_chapter_id',
            href: `#0:${book.id}:${chapter}`,
            content: HTML.div({
                class_name: `${CLASS_BUTTON} ${CLASS_GRID_ITEM}`,
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
            let loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
            bounds.extend(loc);
        }
        map.fitBounds(bounds);
        if (state.gmap_markers.length === 1) {
            //  this method could be hard to keep track of
            zoomMapWithAltitude(state.onlyOneAltitude || 12)
        }
    }

    return
}

const clearMarkers = function () {
    for (let i = 0; i < state.gmap_markers.length; i++) {
        state.gmap_markers[i].setMap(null)
        state.gmap_markers[i].visible = false
        console.log('markers', state.gmap_markers[i])
    }
    state.gmap_markers = []
}

const setUpMarkers = function () {
    // clear existing markers
    if (state.gmap_markers.length > 0) {
        clearMarkers()
    }
    // add a marker for each link that calles the "showLocation" method in the chapter contents
    let matches
    document.querySelectorAll("#current_view a[onclick^=\"showLocation(\"]").forEach(element => {
        matches = GEO_LOCATION_REGEX.exec(element.getAttribute('onclick'))

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
    if (matches) {
        uniqueMarkers(Number(matches[GEO_LOCATION_INDEX_ALTITUDE]))
    }

}

const uniqueMarkers = function (alt) {
    // this gets unique elelemts using an object (j)
    // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    let j = {}
    for (const marker of state.gmap_markers) {
        const lat = marker.position.lat()
        const lng = marker.position.lng()
        const labelContent = marker.labelContent
        if (j[`${lat}:${lng}`]) {
            if (!j[`${lat}:${lng}`].labelContent.includes(labelContent)) {
                let label = `${j[`${lat}:${lng}`].labelContent}| ${labelContent}`

                j[`${lat}:${lng}`].setMap(null)

                j[`${lat}:${lng}`] = new MarkerWithLabel({
                    position: { lat: lat, lng: lng },
                    map: map,
                    labelContent: label,
                    labelAnchor:
                        new google.maps.Point(((label.length / 2) * -10), 3),
                    labelClass: CLASS_MAP_LABELS,
                    labelStyle: { opacity: 1.0 },
                    title: label,
                })
            }
            marker.setMap(null)
        } else {
            j[`${lat}:${lng}`] = marker
        }
    }
    state.gmap_markers = Object.keys(j).map(key => j[key])
    if (state.gmap_markers.length === 1) {
        state.onlyOneAltitude = alt
    }
}

// ---------------------------------- Navigation Hanlers ------------------------------
// Navigates to the Home View
const navigateHome = function (volume_id) {
    state.animation_direction = null
    animateNavigation(() => {
        document.getElementById(DIV_SCRIPTURE_NAVIGATOR).innerHTML = HTML.div({
            id:'holder_1',
            content: volumesGridContent()
        })
        UI.accordian(CLASS_ACCORDIAN)
        UI.dynamicSizingOfHolder_1()

        // show accordian section as active if it matches the volume ID
        if (volume_id) {
            let acc = document.getElementsByClassName(CLASS_ACCORDIAN);
            acc[volume_id - 1].classList.add('active')
            acc[volume_id - 1].nextElementSibling.style.display = "block";
        }

        // bread crumb
        document.getElementById('breadcrumb_book').style.visibility = 'hidden'
        document.getElementById('breadcrumb_chapter').style.visibility = 'hidden'

        // document.getElementById('vol_book_nav').style.display = 'block'
    })
    $('#navigator').animate({ opacity: 0 }, ANIMATION_SPEED)

}

// navigate to the books contents, display book name in breadcrumb 
const navigateBook = function (book_id) {
    state.animation_direction = null
    animateNavigation(() => {
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
            document.getElementById(DIV_SCRIPTURE_NAVIGATOR).innerHTML = HTML.div({
                content: chaptersGrid(book)
            })
        }

    })
    $('#navigator').animate({ opacity: 0 }, ANIMATION_SPEED)
}


// fetch call to get chapter data, see getScripturesCallback for 
// how this data is processed
const navigateChapter = async (book_id, chapter_id) => {
    const html = await genHtml(book_id, chapter_id)
    getScripturesCallback(html, book_id, chapter_id)

}

const genHtml = async (book_id, chapter_id) => {
    const encoded = encodedScripturesUrlParams(book_id, chapter_id)
    return await getData(encoded, true)
}

const handleMarks = () => {
    setUpMarkers()
    centerMapMarkers(state.gmap_markers)
}

// handles date recieved from the server:
// Renders: chapter contents, next / back links, and breadcrumb 
const getScripturesCallback = async function (html, book_id, chapter_id) {
    // getting next and previous chapters
    const [next_book_id, next_chapter_value, next_title] = nextChapter(book_id, chapter_id) ||
        [false, false, false]
    const [prev_book_id, prev_chapter_value, prev_title] = prevChapter(book_id, chapter_id) ||
        [false, false, false]
    state.prev_html = await genHtml(prev_book_id, prev_chapter_value)
    state.next_html = await genHtml(next_book_id, next_chapter_value)

    // display the "next" & "back" elements, if there are no more 
    // chapters in the volume then go back to the volumes list
    const back_to_volumes = HTML.hashLink('0', 'Volumes')
    document.getElementById(DIV_CHAPTER_NAV).innerHTML = `
        <div class="chapter-nav">
            <div id="prev_btn" class="chapter-nav-btn" title="${prev_title}"> ${prev_book_id
            ? '<span class="material-icons cursor-pointer">skip_previous</span>' // HTML.hashLink(`0:${prev_book_id}:${prev_chapter_value}`, 'Back') 
            : back_to_volumes} </div>
            <div id="next_btn" class="chapter-nav-btn" title="${next_title}">  ${next_book_id
            ? '<span class="material-icons cursor-pointer">skip_next</span>'
            : back_to_volumes} </div> 
        </div>`

    if (state.animation_direction === 'from_left') {
        // document.getElementById(DIV_PREV_VIEW).innerHTML = state.prev_html
    } else if (state.animation_direction === 'from_right') {
        // document.getElementById(DIV_NEXT_VIEW).innerHTML = state.next_html
    } else {
        animateNavigation(() => {
            document.getElementById(DIV_SCRIPTURES).innerHTML = html
            $('#navigator').animate({ opacity: 1 }, ANIMATION_SPEED, handleMarks)
        })
    }

    const afterAnimate = (data, book_id, chapter_id) => {
        $('.slide-container').removeAttr("style")
        window.location.hash = `0:${book_id}:${chapter_id}`
        document.getElementById(DIV_SCRIPTURES).innerHTML = data
        setTimeout(() => {
            handleMarks()
        }, 200)
    }

    document.getElementById('next_btn').addEventListener('click', async () => {
        state.animation_direction = 'from_right'
        state.next_html = await genHtml(next_book_id, next_chapter_value)
        document.getElementById(DIV_NEXT_VIEW).innerHTML = state.next_html

        if (next_book_id && next_chapter_value) {
            $(".slide-container").animate({ right: '200%' }, ANIMATION_SPEED, () =>
                afterAnimate(state.next_html, next_book_id, next_chapter_value));
        }

    })
    document.getElementById('prev_btn').addEventListener('click', async () => {
        state.animation_direction = 'from_left'
        state.prev_html = await genHtml(prev_book_id, prev_chapter_value)
        document.getElementById(DIV_PREV_VIEW).innerHTML = state.prev_html

        if (prev_book_id && prev_chapter_value) {
            $(".slide-container").animate({ right: '0' }, ANIMATION_SPEED, () =>
                afterAnimate(state.prev_html, prev_book_id, prev_chapter_value));
        }
    })

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
    let book = state.books[book_id]
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

// ----------------------------- Animation ----------------------------------------
const animateNavigation = (callback) => {
    $(`#${DIV_SCRIPTURE_NAVIGATOR}`).animate({ opacity: 0 }, ANIMATION_SPEED, () => {
        callback()
        $(`#${DIV_SCRIPTURE_NAVIGATOR}`).animate({ opacity: 1 }, ANIMATION_SPEED)
    })
}
const initOpenCloseAnimations = () => {
    document.getElementById('close').addEventListener('click', closeAnimation)
    document.getElementById('open').addEventListener('click', openAnimation)
}
const openAnimation = (callback) => {
    resetAnimation(() => {
        $('#close').animate({ right: '8px' }, ANIMATION_SPEED)
        $('#map').animate({ left: '25%' }, ANIMATION_SPEED)
        $('#scripture_viewer').animate({ right: '0%' }, ANIMATION_SPEED,
            () => typeof callback === 'function' ? callback() : null
        )
    }, ['#close', '#map', '#scripture_viewer'])
    UI.dynamicSizingOfHolder_1()
}
const closeAnimation = (callback) => {
    resetAnimation(() => {
        $('#close').animate({ right: '100%' }, ANIMATION_SPEED)
        $('#map').animate({ left: '0' }, ANIMATION_SPEED)
        $('#scripture_viewer').animate({ right: '100%' }, ANIMATION_SPEED,
            () => typeof callback === 'function' ? callback() : null
        )
    }, ['#close', '#map', '#scripture_viewer'])
    UI.dynamicSizingOfHolder_1()
}

const resetAnimation = (callback, arr_query_selectors) => {
    if (window.innerWidth < 770) {
        callback()
    } else {
        $('#map').animate({ left: '35%' }, ANIMATION_SPEED)
        $('#scripture_viewer').animate({ right: '65%' }, ANIMATION_SPEED,() =>{
            for (const selector of arr_query_selectors) {
                $(selector).removeAttr("style")
            }
        })

    }
}

const closeAnimationPromise = () => new Promise((resolve) => {
    closeAnimation(setTimeout(resolve, 500))
})

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
    closeAnimationPromise().then(() => {
        const lat = Number(latitude)
        const lng = Number(longitude)
        const alt = Number(viewAltitude)

        const latLng = new google.maps.LatLng({ lat, lng })

        zoomMapWithAltitude(alt)

        // show the marker in the center of the map
        map.setCenter(latLng)
    })
}

const zoomMapWithAltitude = function (alt) {
    alt = Number(alt)
    // set the zoom level depending on the altitude
    if (alt >= 5000) {
        map.setZoom(12)
    } else if (alt >= 2000) {
        map.setZoom(15)
    } else {
        map.setZoom(17)
    }
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

// using fetch 
async function getData(url, is_html = false) {
    const data = await fetch(url).then(success => is_html
        ? success.text()
        : success.json())
        .catch(err => console.error(err))
    return data
}

const init = async function (callback) {
    state.books = await getData(URL_BOOKS)
    state.volumes = await getData(URL_VOLUMES)
    cacheBooks(callback)
    initOpenCloseAnimations()
}

const Scriptures = {
    init,
    onHashChange,
    showLocation,
}

export default Object.freeze(Scriptures)
