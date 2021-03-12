const UI = function () {

    // https://www.w3schools.com/howto/howto_js_accordion.asp
    const accordian = function (id) {
        let acc = document.getElementsByClassName(id);

        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                /* Toggle between adding and removing the "active" class,
                to highlight the button that controls the panel */
                this.classList.toggle("active");

                /* Toggle between hiding and showing the active panel */
                let panel = this.nextElementSibling;
                if (panel.style.display === "grid") {
                    $(panel).animate({ 'max-height': 0 }, 200, () => {
                        panel.style.display = "none"
                    })

                } else {
                    panel.style.display = "grid";
                    panel.style.maxHeight = "0px";
                    const child_count = panel.childElementCount
                    const child_height = 40
                    console.log(panel.clientHeight)
                    let height_px = child_count * child_height
                    if(height_px > 200){
                        height_px = 200
                    }
                    $(panel).animate({ 'max-height': `${height_px}px` }, 200)
                }
            })
        }
    }

    const getElementYDimesionById = function (id) {
        const element_height = document.getElementById(id).offsetHeight
        return element_height
    }

    const setElementYDimesionsById = function (id, str_height) {
        document.getElementById(id)
            ? document.getElementById(id).style.height = str_height
            : null
    }

    const dynamicSizingOfScriptureViewer = function () {
        // seeting the max height for the scripture viewer
        // this allows for dynamic overflow-scroll
        getElementYDimesionById('map')
        setElementYDimesionsById('scripture_viewer', `${b}px`)

    }

    const dynamicSizingOfHolder_1 = ()=>{
        console.log('sizing')
        const px1 = getElementYDimesionById('nav_breadcrumb')
        const px2 = getElementYDimesionById('header')
        const window_px = window.innerHeight
        const total_px = px1+px2
        setElementYDimesionsById('holder_1', `${window_px - total_px}px`)
    }

    const init = function () {
        // set up scriptutre viewer max haight 
        // add method to window.onresize
        // dynamicSizingOfScriptureViewer()
        dynamicSizingOfHolder_1()
        window.addEventListener('resize', dynamicSizingOfHolder_1)
    }


    return {
        init,
        accordian,
        getElementYDimesionById,
        setElementYDimesionsById,
        dynamicSizingOfHolder_1
    }
}()