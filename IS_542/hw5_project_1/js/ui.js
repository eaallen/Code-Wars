const UI = function () {

    const accordian = function (id) {
        // https://www.w3schools.com/howto/howto_js_accordion.asp

        let acc = document.getElementsByClassName(id);
        let i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                /* Toggle between adding and removing the "active" class,
                to highlight the button that controls the panel */
                console.log(this)
                this.classList.toggle("active");

                /* Toggle between hiding and showing the active panel */
                let panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }
    }

    const init = function () {
        accordian()
    }

    const getElementYDimesionById = function(id){
        const element_height = document.getElementById(id).offsetHeight
        return element_height
    }

    const setElementYDimesionsById = function(id, str_height){
        document.getElementById(id).style.maxHeight = str_height 
    }

    return {
        init,
        accordian,
        getElementYDimesionById,
        setElementYDimesionsById
    }
}()