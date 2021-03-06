var express = require('express');
var router = express.Router();
var fs = require('fs')

var db = 'mongodb+srv://admin:adameva22@cluster0.kv2rn.mongodb.net/mydata?retryWrites=true&w=majority'

const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
    console.log("co loi xay ra" + error)
});

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = [0, 5, 4, 3, 6, 4, 7, 6, 5, 4];

    var student = {name: 'Quan', sinhNhat: '2022', address: 'Ha Noi city'}

    res.render('index', {
        title: 'Express', name: 'Huy Nguyen',
        mang: data, sinhVien: student
    });

});

router.get('/asia', function (req, res, next) {

    var name = "Huy Nguyen"

    var tuoi = 8

    var array = [6, 54, 4, 4, 5, 6, 4, 3, 34, 5, 4, 3]

    var sinhVien = {name: 'Huy Nguyen', sdt: '091345678'}

    var danhSach = [
        {name: 'Huy Nguyen', sdt: '091345678'},
        {name: 'Huy Nguyen', sdt: '091345678'},
        {name: 'Huy Nguyen', sdt: '091345678'},
        {name: 'Huy Nguyen', sdt: '091345678'}
    ]

    var thongTin = {
        name: 'Huy Nguyen', sdt: '091345678',
        danhSach: [
            {name: 'Huy Nguyen', sdt: '091345678'},
            {name: 'Huy Nguyen', sdt: '091345678'},
            {name: 'Huy Nguyen', sdt: '091345678'},
            {name: 'Huy Nguyen', sdt: '091345678'}
        ]
    }
    res.render('category', {
        title: 'Asia', message: '', name: name, tuoi: tuoi, array: array, sinhVien: sinhVien, danhSach: danhSach
        , thongTin: thongTin
    });

});
router.get('/euro', function (req, res, next) {
    res.render('category', {title: 'Euro', message: ''});
});

router.get('/america', function (req, res, next) {
    res.render('category', {title: 'America', message: ''});
});

router.get('/about', function (req, res, next) {
    res.render('about', {title: 'About', message: ''});
});
router.get('/sua',function (rep,res){
    res.render('sua',{title: 'Sua',message:''});

})
var studentSch = new mongoose.Schema({
    ten: 'string',
    noidung: 'string',
    duong: 'string'
});
// b2 : khai b??o Schema v???i th?? vi???n mongosee
var Anh = mongoose.model('anh', studentSch);

router.post('/student', function (request, response) {

    var ten = request.body.ten;
    var noidung = request.body.noidung;
    var duong = request.body.duong;

    console.log(ten + noidung + duong);

    const data = new Anh({
        ten: ten,
        noidung: noidung,
        duong: duong
    });
    data.save(function (error) {
        var mes;
        if (error == null) {
            mes = 'Them thanh cong'
            console.log('them thanh cong')
        } else mes = error
        response.render('sua', {message: mes})
    })

    // l???y danh s??ch
    Anh.find({}, function (err, data) {

        response.render('sua', {data: data})

    })
    // x??a
    Anh.deleteOne({_id: ''}, function (error) {

    })

    // s???a
    Anh.updateOne({_id: ''}, {email: 'ABC@gmail.com', name: 'AAAAAAA'}, function (error) {

    })


})

router.get('/hot-view', function (req, res, next) {
    // bi???n b??nh th?????ng
    var diaChi = 'Ha Noi - Nam Tu Liem - 19 To Huu'

    // bi???n ki???u array
    var mang = [5, 3, 6, 7, 5, 3, 3, 5, 6, 7, 7]

    // bi???n ki???u object
    var sinhVien = {name: 'Huy Nguyen', sinhNhat: '08092022', sdt: '0913360468'}

    // bi???n ki???u array c??c object
    var danhSach = [{name: 'Huy Nguyen 1', sinhNhat: '08092022444', sdt: '0913360468'},
        {name: 'Huy Nguyen 2', sinhNhat: '08092022444', sdt: '0913360468'},
        {name: 'Huy Nguyen 3', sinhNhat: '08092022555', sdt: '0913360468'},
        {name: 'Huy Nguyen 4', sinhNhat: '08092022555', sdt: '0913360468'},
        {name: 'Huy Nguyen 5', sinhNhat: '080920223333', sdt: '0913360468'}]

    // bi???n ki???u k???t h???p
    var thongTin = {
        name: 'Huy Nguyen',
        yeuThich: 'laptop',
        danhSachBanGai: [
            {name: 'Huy Nguyen 1', sinhNhat: '08092022444', sdt: '0913360468'},
            {name: 'Huy Nguyen 2', sinhNhat: '08092022444', sdt: '0913360468'},
            {name: 'Huy Nguyen 3', sinhNhat: '08092022555', sdt: '0913360468'},
            {name: 'Huy Nguyen 4', sinhNhat: '08092022555', sdt: '0913360468'},
            {name: 'Huy Nguyen 5', sinhNhat: '080920223333', sdt: '0913360468'}
        ]

    }
    res.render('hot', {
        title: 'Hot', diaChi: diaChi, mang: mang, sinhVien: sinhVien, danhSach: danhSach,
        thongTin: thongTin
    });
});

// vi???t c??u l???nh th??m v??o collection - students - database - mydata

// b?????c 1 : ?????nh ngh??a Schema - t????ng ??????ng v???i model b??n Java
const studentSchema = new mongoose.Schema({
    email: 'string',
    content: 'string'
});
// students : l?? t??n c???a collection t???o ph??a trang mongoDB ban n??y
const Student = mongoose.model('students', studentSchema);

router.post('/support', async function (req, res) {
    // l???y tham s??? ra
    var email = req.body.email;
    var content = req.body.content;
    // in ra log ????? ki???m tra
    console.log(email)
    console.log(content)

    // b?????c 2 : g???i c??u l???nh th??m v??o database
    const data = new Student({
        email: email,
        content: content
    });

    data.save(function (err) {
        if (err) return handleError(err);
        res.render('about', {
            title: 'About',
            message: 'Ch??ng t??i ???? nh???n th??ng tin'
        })

    });

//c??u l???nh c???p nh???t
    const filter = {email: email};
    const update = {content: content};
    let ketqua = await Student.findOneAndUpdate(filter, update, {
        new: true
    });

// ///c??u l???nh x??a


    // let xoa = await Student.findOneAndDelete(filter,function (error){
    //     console.log(error)
    //     console.log("xoa thanh cong")
    // })

});
router.post('/delete', function (req, res) {
    var email = req.body.email;
    fs.unlink('files/' + email + '.text', function (err) {
        res.render('about', {
            title: 'About',
            message: err
        })
    });
})

router.get('/all', function (req, res) {

    // l???y danh s??ch students
    Student.find({}, function (err, data) {
        // tr??? v??? 1 file ejs.
        res.render('all', {data: data})
    })

});

router.get('/allMobile', function (req, res) {

    // l???y danh s??ch students
    Student.find({}, function (err, data) {
        // tr??? v??? 1 file ejs.
        res.send(data)
    })

});

router.post('/test', function (request
    , response) {

    var email = request.body.email;
    var content = request.body.content;

    fs.unlink('myFile/' + email + content + '.txt', function (error) {
        if (error) {
            response.render('hot',
                {message: error})
        } else
            response.render('hot',
                {message: 'Ch??ng t??i ???? nh???n ph???n h???i'})
    })
});


var fs = require('fs')

router.post('/hotro', function (request,
                                response) {
    var email = request.body.email
    var noidung = request.body.noidung

    fs.writeFile('luutru/' + email + '.txt', noidung, function (error) {
        var message = ''
        if (error) {
            message = error
        } else {
            message = "OK, chung toi da nhan phan hoi"
        }
        response.render('category', {title: 'OK', message: message})
    })


});


module.exports = router;
