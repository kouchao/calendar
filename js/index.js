var mySwiper = new Swiper('.swiper-container', {
    loop: true
})

// 今年
var year = new Date().getFullYear();

// 今月
var month = new Date().getMonth() + 1;

// 今天
var day = new Date().getDate();


$('.kc-year').html(year)
$('.kc-month').html(month + 1)
$('.kc-day').html(day)


// 判断闰年
function is_leap(year) {
    return year % 4 == 0 ? 1 : 0
}

// 定义12个月份
var m_days = [31, 28 + is_leap(2001), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31];


// 获取月份的第一天
function getFirstWeek(y, m) {
    return new Date(y, m - 1, 1).getDay()
}


function build(m) {
    var content = $('<div class="kc-content"></div>');



    for(var i = 0; i < 7; i++) {
        var col = $('<div class="kc-col"></div>');
        content.append(col)
        for(var j = 0; j < 6; j++) {
            var unit = $('<div class="kc-unit"></div>');
            unit.html(m[j * 6 + i].text)
            unit.addClass(m[j * 6 + i].class)
            col.append(unit)
        }
    }

    console.log(content)

    return content
}


$('.month1').append(build(getMonthArray(year, month)))
$('.month2').append(build(getMonthArray(year, month - 1)))
$('.month3').append(build(getMonthArray(year, month + 1)))


function getMonthArray(y, m) {
    var monthDays = []
    // 生成月之前数据
    var firstWeek = getFirstWeek(y, m)

    var afterMonth = m_days[m - 1 > 0 ? m - 1 : 11]

    for (var i = 1; i < firstWeek; i++) {
        monthDays.unshift({
            text: afterMonth - i,
            class: 'kc-befor'
        })
    }


    // 生成月默认数据
    for (var i = 0; i < m_days[m - 1]; i++) {
        monthDays.push({
            text: i + 1,
            class: 'kc-now'
        })
    }


    // 生成月之后数据
    var surplus = 42 - monthDays.length
    for (var i = 1; i <= surplus; i++) {
        monthDays.push({
            text: i,
            class: 'kc-after'
        })
    }

    return monthDays
}
