import axios from 'axios';

const URL_USER = 'https://baas.kinvey.com/user/kid_SJ-WH6II7/'
const URL_DATA = 'https://baas.kinvey.com/appdata/kid_SJ-WH6II7/'
const APP_KEY = 'kid_SJ-WH6II7'
const APP_SECRET = 'b08a871ed65f4f2183a2ee08f5b98ee3'

let operations = {
    onSubmit: (e) => e.preventDefault(),
    onChange: (e, str) => str.setState({ [e.target.name]: e.target.value}),
    register: function register(obj) {
        let sendObj = {
            'username': obj.email,
            'password': obj.password,
            'name': obj.username
        }
        return(axios({
            method: 'post',
            url: URL_USER,
            headers: {
                'Authorization': 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(sendObj)
        }))
    },
    login: function login(obj) {
        let sendObj = {
            'username': obj.email,
            'password': obj.password
        }
        return(axios({
            method: 'post',
            url: URL_USER + 'login',
            headers: {
                'Authorization': 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(sendObj)
        }))
    },
    logout: function logout(token) {
        return(axios({
            method: 'post',
            url: URL_USER + '_logout',
            headers: {
                'Authorization': 'Kinvey ' + token
            }
        }))
    },
    create: function create(obj, token) {
        let sendObj = {
            'make': obj.make,
            'model': obj.model,
            'year': obj.year,
            'description': obj.description,
            'price': obj.price,
            'image': obj.image,
            'material': obj.material
        }
        return(axios({
            method: 'post',
            url: URL_DATA + 'articuls',
            headers: {
                'Authorization': 'Kinvey ' + token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(sendObj)
        }))
    },
    getAllArticuls: function getAllArticuls() {
        return(axios({
            method: 'get',
            url: 'https://baas.kinvey.com/appdata/kid_SJ-WH6II7/articuls',
            headers: {
                'Authorization': 'Basic ' + btoa('kid_SJ-WH6II7:49298c4967984d9d8fc00b1020d5ffb1')
            }
        }))
    },
    deleteArticul: function deleteArticul(id, authToken) {
        return (axios({
            method: 'DELETE',
            url: URL_DATA + 'articuls/' + id,
            headers: {
                'Authorization': 'Kinvey ' + authToken
            }
        }))
    },
    calcTime: function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);
        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    },
    createComment: function createComment(author, content, id, authToken, rating) {
        let obj = {
            'author': author,
            'content': content,
            'postId': id,
            'rating': rating
        }
        return (axios({
            method: 'POST',
            url: URL_DATA + 'comments',
            headers: {
                'Authorization': 'Kinvey ' + authToken,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(obj)
        }))
    },
    getComments: function getComments(id, authToken) {
        return (axios({
            method: 'get',
            url: URL_DATA + `comments?query={"postId":"${id}"}&sort={"_kmd.ect": -1}`,
            headers: {
                'Authorization': 'Kinvey ' + authToken
            }
        }))
    },
    deleteComment: function deleteComment(id, authToken) {
        return (axios({
            method: 'DELETE',
            url: URL_DATA + 'comments/' + id,
            headers: {
                'Authorization': 'Kinvey ' + authToken
            }
        }))
    }

}

export default operations