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

// - - - - VIEW - - - - //

let catDisplay = {
    init: function() {
        //Initialize and link variables with HTML elements
        this.displayCat = document.getElementById('cat-display');
        this.displayName = document.getElementById('cat-name');
        this.displayCount = document.getElementById('click-count');
        this.displayImg = document.getElementById('cat-img');

        //increment to currently displayed cats counter
        this.displayImg.addEventListener('click', function(){
            octo.incrementCounter();
        });

        //render view
        this.render();
    },

    render: function() {
        //update variables with values from the current cat
        let currentCat = octo.getCurrentCat();
        this.displayName.textContent = currentCat.name;
        this.displayCount.textContent = currentCat.clickCount;
        this.displayName.src = currentCat.imgSrc;
    }
};