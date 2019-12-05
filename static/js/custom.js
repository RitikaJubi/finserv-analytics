$(document).ready(function () {
    let flow2 = document.getElementById("code2")
    let f2 = flow2.style.display = 'none'

    let chart2 = flowchart.parse(flow2.value)
    chart2.drawSVG('canvas', {
        'flowstate': {
            'start': { 'fill': 'yellow', 'font-color': 'black' },
            'end': { 'fill': 'yellow', 'font-color': 'black' }
        }
    });

    
})

function dateCall(id) {
    let defaultDate;
    if (id == 'one') {
        defaultDate = Date.now() - (86400000)
        //window.location.reload()
    }

    if (id == 'two') {
        defaultDate = Date.now() - 2 * (86400000)
        // window.location.reload()
    }

    if (id == 'three') {
        defaultDate = Date.now() - 3 * (86400000)
        // window.location.reload()
    }

    if (id == 'zero') {
        defaultDate = Date.now()
        // window.location.reload()
    }


    $.ajax({
        type: "POST",
        url: 'http://development.jubi.ai/finserv-emi-analytics/buttonData',
        data: {
            'button': defaultDate
        },
        success: function (data) {
            console.log(data)
            console.log('success')
            window.location.reload()
        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + "<->" + textStatus + "<->" + errorThrown)
        }
    });
}