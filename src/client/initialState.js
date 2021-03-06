const { List, Map } = require('immutable');

export default {
    gallery: Map({
        images: List(),
        openLightBox: false,
        activeImage: 0,
        activeFilter: List(),
        galleryWidth: 0
    }),
    app: Map({
        size: 200,
        tag: 'art',
        tags: List()
    }),
    register_login:Map({
        isOpened: {isLogin:false, isRegister:false},
        user: {login_name:"", password:""},
        token: "",
        available: true,
        login_error:false,
        showEditWindow: false,
        enableEdit: false
    }),
    add_review:Map({
        show:false,
        review:{}
    }),
    review_list:Map({
        reviews:[],
        rest_names:[],
        user: {},
        show: false,
        show_advanced_search : false,
        advanced_search_form:{rest_name:"", avg_score:0},
        open_edit_id: "",
        edit_review: {}
    }),
};
