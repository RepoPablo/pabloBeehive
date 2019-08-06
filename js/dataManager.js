'use strict';

class DataManager {
    constructor(pAppManager) {
        this.appManager = pAppManager;
        this.url = 'https://jsonplaceholder.typicode.com/';
        this.bees = [];
        this.getData();
    };

    getData() {
        const request = this.getUsers();
    };

    //Get JSON
    getUsers() {
        let request = this.createRequest('users', this.getUsersCallback);
    };

    getPosts() {
        let request = this.createRequest('posts', this.getPostsCallback);
    };

    getComments() {
        let request = this.createRequest('comments', this.getComentsCallback);
    };

    getAlbums() {
        let request = this.createRequest('albums', this.getAlbumsCallback);

        // request = new XMLHttpRequest();
        // request.open('GET', this.url + 'albums', true);
        // request.onreadystatechange = this.getAlbumsCallback.bind(this);
        // request.send();
        // return request;
    };

    getPhotos() {
        let request = this.createRequest('photos', this.getPhotosCallback);

        // request = new XMLHttpRequest();
        // request.open('GET', this.url + 'photos', true);
        // request.onreadystatechange = this.getPhotosCallback.bind(this);
        // request.send();
        // return request;
    };

    getTodos() {
        let request = this.createRequest('todos', this.getTodosCallback);

        // request = new XMLHttpRequest();
        // request.open('GET', this.url + 'todos', true);
        // request.onreadystatechange = this.getTodosCallback.bind(this);
        // request.send();
        // return request;
    };

    createRequest(value, callback) {
        let request = new XMLHttpRequest();
        request.open('GET', this.url + value, true);
        request.onreadystatechange = callback.bind(this);
        request.send();
        return request;
    }

    //Get CallBacks
    getUsersCallback(e) {
        let request = e.target;

        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const data = JSON.parse(request.response);
                console.log(data);

                let geo = new Geo(0, 0);
                let address = new Address('San José', geo, 'Contiguo a Escuela Josefita Jurado de Alvarado', '1000', '1000');
                let company = new Company('Todos para uno y uno para todos.', 'La luna es bonita', 'Arajo');
                let bee = new Bee(0, 'Pablo', 'pablorc', 'pablorcg12@gmail,com', address, '87223382', 'pablorodriguezc.com', 'Pablo Company');
                this.bees.push(bee);

                data.forEach(userData => {
                    geo = new Geo(userData.address.geo.lat, userData.address.geo.lng);
                    address = new Address(userData.address.city, geo, userData.address.street, userData.address.suite, userData.address.zipcode);
                    company = new Company(userData.company.bs, userData.company.catchPhrase, userData.company.name);
                    bee = new Bee(userData.id, userData.name, userData.username, userData.email, address, userData.phone, userData.website, company);
                    this.bees.push(bee);
                });

                this.getPosts();
            };
        };
    };

    getPostsCallback(e) {
        let request = e.target;

        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const postsData = JSON.parse(request.response);

                postsData.forEach(postData => {
                    let post = new Post(postData.id, postData.userId, postData.body, postData.title);
                    this.addPostToBee(post);
                });
            };

            this.getComments();
        };
    };

    addPostToBee(post) {
        for (let i = 0; i < this.bees.length; i++) {
            const bee = this.bees[i];
            if (bee.id === post.userId) {
                bee.posts.push(post);
                break;
            }
        }
    }

    getComentsCallback(e) {
        let request = e.target;

        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const data = JSON.parse(request.response);

                //TODO: Parsear los comentarios
                console.log(data);
            };
        };
    };

    getAlbumsCallback(e) {
        let request = e.target;

        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const data = JSON.parse(request.response);
                //TODO: Parsear los album
                console.log(data);
            };
        };
    };

    getPhotosCallback(e) {
        let request = e.target;

        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const data = JSON.parse(request.response);
                //TODO Parsear las photo
                console.log(data);
            };
        };
    };

    getTodosCallback(e) {
        let request = e.target;

        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                const data = JSON.parse(request.response);
                //TODO parsear los todos
                console.log(data);
            };
        };
    };

    /*
    //Compare
    setUserPost(post) {
        this.users.map(user => {
            if (user.id === post.userId) {
                //add post to user
            }
        });
    }
    */
};