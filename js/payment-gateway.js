$(window).bind("load", gather);
$("form").keyup(gather);

function gather() {
    var price = document.getElementById("price").value;
    var price = price.replace(/[^\d.]/g, "").replace(/\.(\d{2})\d+/, '.$1');
    var unit = document.getElementById("unit").value;
    var unit = unit.replace(/\D/g, '');
    var discount = document.getElementById("discount").value;
    var discount = discount.replace(/\D/g, '');
    if (unit < 1000) {
        var gm_p_m = 10;
    } else if (unit < 2000) {
        var gm_p_m = 25;
    } else if (unit < 5000) {
        var gm_p_m = 50;
    } else if (unit < 10000) {
        var gm_p_m = 75;
    } else if (unit < 15000) {
        var gm_p_m = 100;
    } else if (unit < 25000) {
        var gm_p_m = 150;
    } else if (unit < 50000) {
        var gm_p_m = 200;
    } else {
        var gm_p_m = 250;
    }
    var after_discount = ((100 - discount) / 100);
    var result = (price * after_discount * unit);
    var gr_f = ((price * after_discount * unit) - (price * after_discount * unit * 8.5 / 100) - (0.3 * unit));
    var gr_p = ((price * after_discount * unit) - (price * after_discount * unit * 3.5 / 100) - (0.3 * unit) - gm_p_m);
    var pd = ((price * after_discount * unit) - (price * after_discount * unit * 5 / 100) - (0.5 * unit));
    var pp = ((price * after_discount * unit) - (price * after_discount * unit * 2.9 / 100) - (0.3 * unit));
    var st = ((price * after_discount * unit) - (price * after_discount * unit * 2.9 / 100) - (0.3 * unit));

    $("tbody").html(
        '<tr class="">' +
        '<td class="">' +
        '<p class="before-fees">Before any Fees</p>' +
        '</td>' +
        '<td class=""></td>' +
        '<td class="results-data">$' + result.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class=""></td>' +
        '<td class=""></td>' +
        '</tr>' +
        '<tr class="">' +
        '<td class=""><a href="" target="_blank" class="open-link"><img src="images/2checkout.png">2Checkout</a></td>' +
        '<td class="stripe-fee"></td>' +
        '<td class="stripe">$' + st.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="stripe-loss">$' + (result - st).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="">' + ((result - st) / result * 100).toFixed(1).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '%</td>' +
        '</tr>' +
        '<tr class="">' +
        '<td class=""><a href="" target="_blank" class="open-link"><img src="images/braintreepayments.png">Braintree</a></td>' +
        '<td class="stripe-fee"></td>' +
        '<td class="stripe">$' + st.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="stripe-loss">$' + (result - st).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="">' + ((result - st) / result * 100).toFixed(1).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '%</td>' +
        '</tr>' +
        '<tr class="">' +
        '<td class=""><a href="" target="_blank" class="open-link"><img src="images/gumroad.png">Gumroad</a></td>' +
        '<td class="gumroad-free-fee">' +
        '<p>8.5% + $0.3</p><span>per transaction</span>' +
        '</td>' +
        '<td class="gumroad-free">$' + gr_f.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="gumroad-free-loss">$' + (result - gr_f).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="">' + ((result - gr_f) / result * 100).toFixed(1).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '%</td>' +
        '</tr>' +
        '<tr class="">' +
        '<td class=""><a href="" target="_blank" class="open-link"><img src="images/gumroad.png">Gumroad Pro</a></td>' +
        '<td class="gumroad-pro-fee"></td>' +
        '<td class="gumroad-pro">$' + gr_p.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="gumroad-pro-loss">$' + (result - gr_p).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="">' + ((result - gr_p) / result * 100).toFixed(1).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '%</td>' +
        '</tr>' +
        '<tr class="">' +
        '<td class=""><a href="" target="_blank" class="open-link"><img src="images/paddle.png">Paddle</a></td>' +
        '<td class="paddle-fee"></td>' +
        '<td class="paddle">$' + pd.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="paddle-loss">$' + (result - pd).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="">' + ((result - pd) / result * 100).toFixed(1).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '%</td>' +
        '</tr>' +
        '<tr class="">' +
        '<td class=""><a href="" target="_blank" class="open-link"><img src="images/paypal.png">Paypal</a></td>' +
        '<td class="paypal-fee"></td>' +
        '<td class="paypal">$' + pp.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="paypal-loss">$' + (result - pp).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="">' + ((result - pp) / result * 100).toFixed(1).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '%</td>' +
        '</tr>' +
        '<tr class="">' +
        '<td class=""><a href="" target="_blank" class="open-link"><img src="images/stripe.png">Stripe</a></td>' +
        '<td class="stripe-fee"></td>' +
        '<td class="stripe">$' + st.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="stripe-loss">$' + (result - st).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
        '<td class="">' + ((result - st) / result * 100).toFixed(1).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '%</td>' +
        '</tr>'
    );

    $("td").not(":nth-child(1)").each(function() {
        var text = $(this).text();
        $(this).text(text.replace("$-", "-$").replace("NaN%", "0%").replace("Infinity%", "-"));
    });

};


$("#discount,#unit").on("keyup", function(event) {
    var selection = window.getSelection().toString();
    if (selection !== '') {
        return;
    }
    if ($.inArray(event.keyCode, [38, 40, 37, 39, 188, 190]) !== -1) {
        return;
    }
    var $this = $(this);
    var input = $this.val();
    var input = input.replace(/[\D\s\._\-]+/g, "");
    input = input ? parseInt(input, 10) : 0;
    $this.val(function() {
        return (input === 0) ? "" : input.toLocaleString("en-US");
    });
});
$("#price").on("keyup", function(event) {
    var selection = window.getSelection().toString();
    if (selection !== '') {
        return;
    }
    if ($.inArray(event.keyCode, [38, 40, 37, 39, 188, 190]) !== -1) {
        return;
    }
    var $this = $(this);
    var input = $this.val();
    var input = input
        // Keep only digits and decimal points:
        .replace(/[^\d.]/g, "")
        // Remove duplicated decimal point, if one exists:
        .replace(/^(\d*\.)(.*)\.(.*)$/, '$1$2$3')
        // Keep only two digits past the decimal point:
        .replace(/\.(\d{2})\d+/, '.$1')
        .replace(/^0/gi, '1')
        // Add thousands separators:
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $this.val(function() {
        return (input === 0) ? "" : input;
    });
});