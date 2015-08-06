/*
Social Inviter
Copyright (c) 2014  www.socialinviter.com
You can use the script on you website for free but this comment part should not be removed.
version 1.0 (June 11,2014)
*/
var auth = (function () {
    var authEndpoint = "./", scriptid = "apiscript", cssFileUrl = "contactimporter.css";
    var getQueryString = function (name, target) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(target);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    var getFromStore = function (name) {
        var c_name = name;
        var i, x, y, ARRcookies = document.cookie.split(";").reverse();
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
        if (window.opener) {
            var selPdt = window.opener.thiselectedpdt;
            if (selPdt == "contactimporter") {
                if (window.opener.contactimporter)
                    return window.opener.contactimporter.getFromStore(name);
            }
            else if (selPdt == "friendsinviter") {
                if (window.opener.friendsinviter)
                    return window.opener.friendsinviter.getFromStore(name);
            }
            else if (selPdt == "socialconnect") {
                if (window.opener.socialconnect)
                    return window.opener.socialconnect.getFromStore(name);
            }
        }
    }
    var putInToStore = function (name, value) {
        var c_name = name;
        var exdays = 300;
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        //document.cookie = c_name + "=" + c_value;
        if (document.domain === 'localhost') {
            document.cookie = c_name + "=" + c_value + ";path=/;";
        } else {
            document.cookie = c_name + "=" + c_value + ';domain=.' + document.domain + ';path=/;';
        }
    }
    var init = function () {
        var lKey = getQueryString("key", window.location.href);
        var pdt = getQueryString("product", window.location.href);
        if (pdt != "") {
            putInToStore("product", pdt);
        }
        else {
            pdt = getFromStore("product");
        }
        var jsFileUrl = "contactimporter.js";
        if (pdt == "socialconnect") {
            scriptid = "apiscscript";
            jsFileUrl = "socialconnect.js";
            if (lKey != "") {
                var dmid = getQueryString("did", window.location.href);
                var urid = getQueryString("id", window.location.href);
                jsFileUrl = "socialconnect.js?key=" + lKey + "&id=" + urid + "&did=" + dmid;
            }
            else {
                var lKey = getFromStore("key");
                if (lKey != "") {
                    var urid = getFromStore("id");
                    var dmid = getFromStore("domid");
                    jsFileUrl = "socialconnect.js?key=" + lKey + "&id=" + urid + "&did=" + dmid;
                }
            }
            cssFileUrl = "socialconnect.css";
        }
        else if (pdt == "friendsinviter") {
            jsFileUrl = "friendsinviter.js";
            if (lKey != "") {
                var dmid = getQueryString("did", window.location.href);
                var urid = getQueryString("id", window.location.href);
                jsFileUrl = "friendsinviter.js?key=" + lKey + "&id=" + urid + "&did=" + dmid;
            }
            else {
                var lKey = getFromStore("key");
                if (lKey != "") {
                    var urid = getFromStore("id");
                    var dmid = getFromStore("domid");
                    jsFileUrl = "friendsinviter.js?key=" + lKey + "&id=" + urid + "&did=" + dmid;
                }
            }
            cssFileUrl = "friendsinviter.css";
            scriptid = "apifiscript";
        }
        else {
            if (lKey != "") {
                var dmid = getQueryString("did", window.location.href);
                var urid = getQueryString("id", window.location.href);
                jsFileUrl = "contactimporter.js?key=" + lKey + "&id=" + urid + "&did=" + dmid;
            }
            else {
                var lKey = getFromStore("key");
                if (lKey != "") {
                    var urid = getFromStore("id");
                    var dmid = getFromStore("domid");
                    jsFileUrl = "contactimporter.js?key=" + lKey + "&id=" + urid + "&did=" + dmid;
                }
            }
        }
        var filerefcss = document.createElement("link")
        filerefcss.setAttribute("rel", "stylesheet")
        filerefcss.setAttribute("type", "text/css")
        filerefcss.setAttribute("href", authEndpoint + unescape(cssFileUrl))
        try { document.head.appendChild(filerefcss); }
        catch (e) { document.getElementsByTagName("head")[0].appendChild(filerefcss); }

        var fileref = document.createElement('script');
        fileref.setAttribute("id", scriptid);
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", authEndpoint + unescape(jsFileUrl));
        try { document.body.appendChild(fileref); }
        catch (e) { document.getElementsByTagName("head")[0].appendChild(fileref); }
    }
    return {
        init: init
    }
})();
$(document).ready(function () {
    auth.init();
});

