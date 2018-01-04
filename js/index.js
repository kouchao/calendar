var setClass = {
    isToday(json, y, m, d) {
        if(y == year && m == month && day == d){
            json.class = 'kc-now kc-today'
        }
    },
    isAbnormal(json, y, m, d) {
        if(d == 10){
            json.class = 'kc-now kc-abnormalDay'
        }
    }
}



// 今年
const year = new Date().getFullYear();

// 今月
const month = new Date().getMonth() + 1;

// 今天
const day = new Date().getDate();


$('.kc-year').html(year)
$('.kc-month').html(month)
$('.kc-day').html(day)


let nowYear = year
let nowMonth = month
// let nowDay = day


let orderBy = ['month3', 'month2']

const mySwiper = new Swiper('.swiper-container', {
    loop: true,
    onSlideChangeEnd: function (swiper) {
        if($('.swiper-slide-active').attr('mmmm')) {
            nowYear = parseInt($('.swiper-slide-active').attr('yyyy'))
            nowMonth = parseInt($('.swiper-slide-active').attr('mmmm'))

            let cccc = $('.swiper-slide-active').attr('cccc')

            if(cccc == 'month1'){
                orderBy = ['month3', 'month2']
            } else if(cccc == 'month2') {
                orderBy = ['month1', 'month3']
            } else {
                orderBy = ['month2', 'month1']
            }

            $('.' + orderBy[0]).html('')
            $('.' + orderBy[1]).html('')

            if(nowMonth > 1){
                $('.' + orderBy[0]).append(build(getMonthArray(nowYear, nowMonth - 1)))
                $('.' + orderBy[0]).attr('yyyy', nowYear)
                $('.' + orderBy[0]).attr('mmmm', nowMonth - 1)
                $('.' + orderBy[0]).attr('cccc', orderBy[0])
            }else {
                $('.' + orderBy[0]).append(build(getMonthArray(nowYear - 1, 12)))
                $('.' + orderBy[0]).attr('yyyy', nowYear - 1)
                $('.' + orderBy[0]).attr('mmmm', 12)
                $('.' + orderBy[0]).attr('cccc', orderBy[0])

            }

            if(nowMonth < 12) {
                $('.' + orderBy[1]).append(build(getMonthArray(nowYear, nowMonth + 1)))
                $('.' + orderBy[1]).attr('yyyy', nowYear)
                $('.' + orderBy[1]).attr('mmmm', nowMonth + 1)
                $('.' + orderBy[1]).attr('cccc', orderBy[1])

            } else {
                $('.' + orderBy[1]).append(build(getMonthArray(nowYear + 1, 1)))
                $('.' + orderBy[1]).attr('yyyy', nowYear + 1)
                $('.' + orderBy[1]).attr('mmmm', 1)
                $('.' + orderBy[1]).attr('cccc', orderBy[1])

            }
        }

        $('.kc-nowYear').html(nowYear)
        $('.kc-nowMonth').html(nowMonth)
    }
})

setHtml()


// 判断闰年
function is_leap(year) {
    return year % 4 == 0 ? 1 : 0
}

// 定义12个月份
function getNowYearMonthgetNowYearMonth(y) {
    return [31, 28 + is_leap(y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

// 获取月份的第一天
function getFirstWeek(y, m) {
    return new Date(y, m, 1).getDay()
}


function build(m) {
    let content = $('<div class="kc-content"></div>');

    let utilNum = m.length == 35 ? 5 : 6

    for(let i = 0; i < 7; i++) {
        let col = $('<div class="kc-col"></div>');
        content.append(col)
        for(let j = 0; j < utilNum; j++) {
            let unit = $('<div class="kc-unit"></div>');
            unit.html(m[j * 7 + i].text)
            unit.addClass(m[j * 7 + i].class)
            col.append(unit)
        }
    }
    return content
}



function setHtml() {
    $('.month1').html('')
    $('.month2').html('')
    $('.month3').html('')

    $('.month1').append(build(getMonthArray(nowYear, nowMonth)))
    $('.month1').attr('yyyy', nowYear)
    $('.month1').attr('mmmm', nowMonth)
    $('.month1').attr('cccc', 'month1')

    if(nowMonth > 1){
        $('.month3').append(build(getMonthArray(nowYear, nowMonth - 1)))
        $('.month3').attr('yyyy', nowYear)
        $('.month3').attr('mmmm', nowMonth - 1)
        $('.month3').attr('cccc', 'month3')

    }else {
        $('.month3').append(build(getMonthArray(nowYear - 1, 12)))
        $('.month3').attr('yyyy', nowYear - 1)
        $('.month3').attr('mmmm', 12)
        $('.month3').attr('cccc', 'month3')

    }

    if(nowMonth < 12) {
        $('.month2').append(build(getMonthArray(nowYear, nowMonth + 1)))
        $('.month2').attr('yyyy', nowYear)
        $('.month2').attr('mmmm', nowMonth + 1)
        $('.month2').attr('cccc', 'month2')
    } else {
        $('.month2').append(build(getMonthArray(nowYear + 1, 1)))
        $('.month2').attr('yyyy', nowYear + 1)
        $('.month2').attr('mmmm', 1)
        $('.month2').attr('cccc', 'month2')
    }


    console.log(build(getMonthArray(nowYear + 1, 1)))

}


function getMonthArray(y, m) {
    let monthDays = []
    // 生成月之前数据
    let firstWeek = getFirstWeek(y, m - 1) || 7


    let afterMonth = getNowYearMonthgetNowYearMonth(y)[m - 1 > 0 ? m - 1 : 11]
    for (let i = 0; i < firstWeek - 1; i++) {
        let json = {
            text: afterMonth - i,
            class: 'kc-befor'
        };
        monthDays.unshift(json)
    }


    // 生成月默认数据
    for (let i = 0; i < getNowYearMonthgetNowYearMonth(y)[m - 1]; i++) {
        let json = {
            text: i + 1,
            class: 'kc-now '
        };

        if(y == year && m == month && day == i + 1){
            json.class = 'kc-now kc-today'
        }
        setClass.isToday(json, y, m, i + 1)
        setClass.isAbnormal(json, y, m, i + 1)

        monthDays.push(json)
    }


    // 生成月之后数据
    let surplus = monthDays.length <= 35 ? 35 - monthDays.length : 42 - monthDays.length
    for (let i = 1; i <= surplus; i++) {
        let json = {
            text: i,
            class: 'kc-after'
        };

        monthDays.push(json)
    }

    return monthDays
}

