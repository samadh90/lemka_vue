// eslint-disable-next-line no-unused-vars
import {formatRelative, subDays, formatDistanceToNow} from 'date-fns'
import be from 'date-fns/locale/be'

export function dateTime (t) {
    if (typeof t === 'string' && !t.includes('+')) {
        t = t.concat('+02:00')
    }
    return new Date(t)
}

export function date2now (d) {
    return d
}

export function date (d) {
    return formatDistanceToNow(d, {locale: be})
}

function pluralize (time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}

export function timeAgo (time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' heure')
    } else {
        return pluralize(~~(between / 86400), ' jour')
    }
}

export function parseTime (time, cFormat) {
    if (arguments.length === 0) {
        return null
    }

    if ((time + '').length === 10) {
        time = +time * 1000
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        date = new Date(parseInt(time))
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
}
export function localTimeStr(t) {
    return dateTime(t).toLocaleString()
}
export function formatTime(time, option) {
    const d = dateTime(time)
    const now = new Date()

    const diff = (now - d) / 1000
    if (diff >= 0) {
        if (diff < 30) {
            return '刚刚'
        } else if (diff < 3600) { // less 1 hour
            return Math.ceil(diff / 60) + '分钟前'
        } else if (diff < 3600 * 24) {
            return Math.ceil(diff / 3600) + '小时前'
        } else if (diff < 3600 * 24 * 2) {
            return '1天前'
        }
    }
    if (option) {
        return parseTime(time, option)
    } else {
        if (d.getYear() !== now.getYear()) {
            return parseTime(d, '{y}-{m}-{d} {h}:{i}')
        }
        return (d.getMonth() + 1) + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}

/* 数字 格式化 */
export function nFormatter (num, digits, inChinese) {
    const si = inChinese ? [
        {value: 1E12, symbol: '兆'},
        {value: 1E8, symbol: '亿'},
        {value: 1E4, symbol: '万'}
    ] : [
        {value: 1E18, symbol: 'E'},
        {value: 1E15, symbol: 'P'},
        {value: 1E12, symbol: 'T'},
        {value: 1E9, symbol: 'G'},
        {value: 1E6, symbol: 'M'},
        {value: 1E3, symbol: 'k'}
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
        }
    }
    return num.toString()
}

export function html2Text (val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

export function toThousandslsFilter (num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function percent (value, fixed) {
    let a = value && (value * 100).toFixed(fixed === undefined ? 2 : fixed)
    return `${a}%`
}

export function duration (a) {
    let m = Math.floor(a / 60)
    let s = Math.floor(a % 60)
    return `${m}'${s}''`
}

export function json(value, items) {
    console.log(value)
    if(items) {
        return items.map(a => {
            return `${a.label || a.name}: ${value[a.name]}`
        }).join('\n')
    } else {
        return Object.keys(value).map(k => {
            return `${k}: ${value[k]}`
        }).join('\n')
    }
}

export function date2str(x, y) {
    let z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    });

    return y.replace(/(y+)/g, function(v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}

export function date2fullStr (date, local = 'fr-BE') {
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    return new Date(date).toLocaleString(local, options)
}

export default {
    date,
    dateTime,
    date2now,
    parseTime,
    timeAgo,
    formatTime,
    nFormatter,
    html2Text,
    toThousandslsFilter,
    percent,
    duration,
    json,
    date2str,
    date2fullStr
}
