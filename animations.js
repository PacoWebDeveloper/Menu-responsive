window.addEventListener('load', () => {
    /* ---> DOM variables <---- */
    const btnMenu = document.querySelector('.btn-menu');
    const bgrImageBtn = document.querySelector('.bgr-image');

    const navbar = document.querySelector('.navbar');
    const mainMenu = document.querySelector('.main-menu');

    const containerSubmenu = document.querySelectorAll('.container-submenu');
    const containerSubmenu2 = document.querySelectorAll('.container-submenu2');

    const btnContainer = document.querySelectorAll('.btn-container');
    const btnContainer2 = document.querySelectorAll('.btn-container2');

    const submenu = document.querySelectorAll('.submenu');
    const submenu2 = document.querySelectorAll('.submenu2');


    /* ================================================= */
    /* ==================== MOBILE ===================== */
    /* ================================================= */

    
    /* Global variables */
    var firstNode, previousText, previousText2 = null;

    /* ----> MENU BUTTON <---- */
    btnMenu.addEventListener('click', () => {
        if (getNavbarHeight() > 0) {
            turnButton(0);
            for (let i = 0; i < submenu.length; i++)
                setSubmenuHeight(i, 0);
            for (let i = 0; i < submenu2.length; i++)
                setSubmenuHeight2(i, 0);
            setNavbarHeight(0);
            previousText = previousText2 = null;
        } else {
            turnButton(90);
            setNavbarHeight(250);
        }
    })

    /* ----> SUBMENU <---- */
    for (let i = 0; i < btnContainer.length; i++) {
        if (window.innerWidth < 900){
            btnContainer[i].addEventListener('click', () => {
            
                const submenuHeights = {
                    'Productos' : 90,
                    'Servicios': 60,
                    'Iniciar sesion': 120
                };

                let text = (btnContainer[i].textContent).trim(); 
                text = text.split('\n',1);
                text = text[0];
                const textGotten = text.trim();
                
                closeSubmenus();
                closeChildrenSubmenus();
                
                if (previousText == textGotten) {                    
                    setSubmenuHeight(i, 0);

                    closeChildrenSubmenus();

                    previousText = null;
                } else {
                    setSubmenuHeight(i, submenuHeights[textGotten]);

                    let navbarHeight = getNavbarHeight();
                    navbarHeight += submenuHeights[textGotten];                
                    setNavbarHeight(navbarHeight);
                    previousText = textGotten;
                    
                }

                firstNode = i;
            })
        }
        
    }
    
    /* ----> SUBMENU 2 <---- */
    for (let i = 0; i < btnContainer2.length; i++) {
        if (window.innerWidth < 900) {
            btnContainer2[i].addEventListener('click', () => {
                const submenuHeights2 = {
                    'Autos': 120,
                    'Motos': 150
                };
                let text = (containerSubmenu2[i].textContent).trim();
                text = text.split('\n', 1);
                text = text[0];
                const textGotten = text.trim();

                closeSubmenus2(firstNode);
    
                if (previousText2 == textGotten) {                    
                    previousText2 = null;
                } else {
                    let submenuHeight = getSubmenuHeight(firstNode);                    
                    submenuHeight += submenuHeights2[textGotten];                    
                    
                    let navbarHeight = getNavbarHeight();                    

                    navbarHeight += submenuHeights2[textGotten];                    
                    
                    setNavbarHeight(navbarHeight);     
                    
                    setSubmenuHeight(firstNode, submenuHeight);
                    
                    setSubmenuHeight2(i, submenuHeights2[textGotten]);                    
                    
                    previousText2 = textGotten;
                }
                                    
            })
        }
    }

    /* Funcitons */
    /* Button menu */
    function turnButton(grades) {
        bgrImageBtn.style.transform = 'rotate(' + grades + 'deg)';
    }
    /* ----> NAVBAR <---- */
    function getNavbarHeight() { 
        let navbarHeight = navbar.style.height;
        let height = 0;
        if (navbarHeight.length > 4){
            height = parseInt((navbar.style.height).substr(0,3));            
        } else {
            height = parseInt((navbar.style.height).substr(0,2));            
        }        
        return height;
    }
    function setNavbarHeight(height) {
        navbar.style.height = height + 'px';
        mainMenu.style.height = height + 'px';
    }
    /* ----> SUBMENU <---- */
    function getSubmenuHeight(node) {
        let height = 0;
        if(submenu[node].style.height.length > 4){
            height = parseInt((submenu[node].style.height).substr(0,3));
        } else {
            height = parseInt((submenu[node].style.height).substr(0,2));
        }        
        return height;
    }
    function setSubmenuHeight(node, height) {
        submenu[node].style.height = height + 'px';
        let containerHeight = 0;
        if(containerSubmenu[node].style.height == '' || containerSubmenu[node].style.height == 0) {            
            containerHeight = height + 50 + 'px';
            containerSubmenu[node].style.height = containerHeight;        
        } else {
            containerHeight = height + 50;        
            containerSubmenu[node].style.height = containerHeight + 'px';
        }        
    }
    /* ----> SUBMENU 2 <---- */
    function getSubmenuHeight2(node) {
        const height = parseInt((submenu2[node].style.height).substr(0,3));
        return height;
    }
    function setSubmenuHeight2(node, height) {
        submenu2[node].style.height = height + 'px';        
    }    

    /* Close open submenu when click another submenu */
    function closeSubmenus() {
        for (let i = 0; i < submenu.length; i++) {
            if (getSubmenuHeight(i) > 0) {
                setNavbarHeight(getNavbarHeight() - getSubmenuHeight(i));
                setSubmenuHeight(i, 0);
            }
        }
    }
    function closeSubmenus2(submenuNode) {
        for (let i = 0; i < submenu2.length; i++) {
            if (getSubmenuHeight2(i) > 0) {
                setNavbarHeight(getNavbarHeight() - getSubmenuHeight2(i));
                setSubmenuHeight(submenuNode, getSubmenuHeight(submenuNode) - getSubmenuHeight2(i));
                setSubmenuHeight2(i, 0);
            }
        }
    }
    /* Close submenu when click parent submenu */
    function closeChildrenSubmenus() {
        for(let i = 0; i < submenu2.length; i++) {
            submenu2[i].style.height = 0;
            previousText2 = null;
        }
    }
})