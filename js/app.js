// - - - - DATA - - - - //
let data = {
    currentCat: null,
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

//Starts App
octo.init();