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
      reviews:[]
    }),
    profile_view:Map({
       user: {},
       show: false
    })
};
