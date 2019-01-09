// - - - - DATA - - - - //
let data = {
    currentCat: null,
    adminShow: false,
    cats: [
        {
            clickCount : 0,
            name : 'Bat',
            imgSrc : 'img/cat1.jpg'
        },
        {
            clickCount : 0,
            name : 'Hat',
            imgSrc : 'img/cat2.jpg'
        },
        {
            clickCount : 0,
            name : 'Rat',
            imgSrc : 'img/cat3.jpg'
        },
        {
            clickCount : 0,
            name : 'Shat',
            imgSrc : 'img/cat4.jpg'
        },
        {
            clickCount : 0,
            name : 'Nat',
            imgSrc : 'img/cat5.jpg'
        }
    ]
};


// - - - - OCTO - - - - //

let octo = {
    init: function() {
        //sets inital currentCat
        data.currentCat = data.cats[0];

        //iniialize views
        listView.init();
        catView.init();
        adminView.init();
        adminView.hide();
    },

    getCurrentCat: function () {
        return data.currentCat;
    },

    getCats: function() {
        return data.cats;
    },
    
    setCurrentCat: function(cat) {
        data.currentCat = cat;
    },

    incrementCount: function () {
        data.currentCat.clickCount++;
        //render to display new count number
        catView.render();
    },

    showForm: function() {
        if (data.adminShow === false) {
            data.adminShow = true;
            adminView.show();
        }
        else if (data.adminShow ===true) {
            data.adminShow = false;
            adminView.hide();
        }
    },

    cancelForm: function() {
        adminView.hide();
    },

    saveForm: function() {
        data.currentCat.name = adminView.formName.value;
        data.currentCat.imgSrc = adminView.formSource.value;
        data.currentCat.clickCount = adminView.formClicks.value;
        
        catView.render();
        listView.render();
        adminView.hide();
    }
};


// - - - - VIEW - - - - //
//View for displayed image and clickCount
let catView = {
    init: function() {
        //Initialize and link variables with HTML elements
        this.displayCat = document.getElementById('cat-display');
        this.displayName = document.getElementById('cat-name');
        this.displayCount = document.getElementById('click-count');
        this.displayImg = document.getElementById('cat-img');

        //increment to currently displayed cats counter
        this.displayImg.addEventListener('click', function(){
            octo.incrementCount();
        });

        //render view
        this.render();
    },

    render: function() {
        //update variables with values from the current cat
        let currentCat = octo.getCurrentCat();
        this.displayName.textContent = currentCat.name;
        this.displayCount.textContent = currentCat.clickCount;
        this.displayImg.src = currentCat.imgSrc;
    }
};

//View for list of cats to select from
let listView = {
    init: function() {
        //inialize and link with the HTML elem
        this.displayList = document.getElementById('cat-list');

        this.render();
    },

    render: function() {
        let cat, catElem, i;

        let cats = octo.getCats();

        //Clears list before loop
        this.displayList.innerHTML = '';

        for (i = 0; i < cats.length; i++) {
            //cat currently being looped over
            cat = cats[i];

            //create a new list item and set its text
            catElem = document.createElement('li');
            catElem.textContent = cat.name;

            //on click will update the currentCat and re run the catView render
            catElem.addEventListener('click', (function(copyCat) {
                return function() {
                    octo.setCurrentCat(copyCat);
                    catView.render();
                }
            })(cat));

            this.displayList.appendChild(catElem);
        }
    }
};

let adminView = {
    init: function() {
        let container = document.getElementById('form-container');

        this.adminButton = document.getElementById('admin-button');
        this.formName = document.getElementById('form-name');
        this.formSource = document.getElementById('form-source');
        this.formClicks = document.getElementById('form-clicks');
        this.formCancel = document.getElementById('form-cancel');
        this.formSave = document.getElementById('form-save');

        this.adminButton.addEventListener('click', function(){
            octo.showForm();
        });
        
        this.formCancel.addEventListener('click', function(){
            octo.cancelForm();
        });
        
        this.formSave.addEventListener('click', function(){
            octo.saveForm();
        });

        this.render();
    },

    render: function() {
        let currentCat = octo.getCurrentCat();
        
        this.formName.value = currentCat.name;
        this.formSource.value = currentCat.imgSrc;
        this.formClicks.value = currentCat.clickCount;
    },

    show: function() {
        this.render();
        container.style.display = 'block';
    },

    hide: function() {
        container.style.display = 'none';
    }
};

//Starts App
octo.init();