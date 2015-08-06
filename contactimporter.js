/*
Social Inviter
Copyright (c) 2014  www.socialinviter.com
You can use the script on you website for free but this comment part should not be removed.
version 1.4 (July 29, 2015)
*/

var socialinviter = (function () {
    var config = {
        servicepanel: {
            type: "",
            target: "popup",
            alignment: "vertical",
            path: {
                css: "./",
                js: "./"
            },
            position: {
                left: "wall",
                top: "wall"
            },
            callbacks: undefined
        },
        contactspanel: {

        }
    };
    var contentObj = { "step1": { "title": "Connect with people you know on {0}.", "description": "We found {0} people from your address book. Select the people you'd like to connect to.", "selected": "{0} Selected", "selectall": "Select all", "validation": { "selectcontact": "Please select a contact to proceed" }, "button": { "refresh": "Refresh", "proceed": "Proceed"} }, "step2": { "title": "Send invitation/message to your friends", "note": "Note: Seperate emails by semicolon(';')", "to": "To", "subject": "Subject", "message": "Message", "validation": { "to": "Enter to address", "subject": "Enter subject", "message": "Enter message" }, "button": { "back": "Back", "send": "Send"} }, "navigation": "Step {0} of {1}", "outlook": { "label": "Please select a CSV file", "supported": "Supported CSV files from:", "link": { "back": "Back", "backtolist": "Back to list" }, "validation": { "selectfile": "Please select a CSV file.", "wrongupload": "Please upload a file of type *.CSV" }, "button": { "upload": "Upload"}} };
    var getConfig = function () {
        return config;
    }
    var setConfig = function (conf) {
        var flagIconLoader = 0;
        contactimporter.init();
        if (conf) {
            if (conf.alignment || conf.type || conf.position) {
                flagIconLoader = 1;
            }
        }
        modalSI.init();
        if (conf) {
            if (conf.target)
                config.servicepanel.target = conf.target;
            else
                config.servicepanel.target = "popup";

            if (conf.alignment)
                config.servicepanel.alignment = conf.alignment;
            else
                config.servicepanel.alignment = "horizontal";

            if (conf.path) {
                if (conf.path.css) {
                    config.servicepanel.path.css = conf.path.css;
                }
                if (conf.path.js) {
                    config.servicepanel.path.js = conf.path.js;
                }
            }

            if (conf.showmore == false) {
                config.servicepanel.showmore = conf.showmore;
            }
            else {
                config.servicepanel.showmore = true;
            }
            if (conf.content) {
                config.servicepanel.content = $.extend({}, contentObj, conf.content);
            }
            else {
                config.servicepanel.content = contentObj;
            }
            if (conf.urltopostemailrequest && conf.urltopostemailrequest != "") {
                config.servicepanel.urltopostemailrequest = conf.urltopostemailrequest;
            }
            else {
                config.servicepanel.urltopostemailrequest = "";
            }

            if (conf.showsearch == false) {
                config.servicepanel.showsearch = conf.showsearch;
            }
            else {
                config.servicepanel.showsearch = true;
            }

            if (conf.showform == false) {
                config.servicepanel.showform = conf.showform;
            }
            else {
                config.servicepanel.showform = true;
            }

            if (conf.subject) {
                config.servicepanel.subject = conf.subject
            }
            else {
                config.servicepanel.subject = "Lets spread the word!";
            }

            if (conf.message) {
                config.servicepanel.message = conf.message
            }
            else {
                config.servicepanel.message = "";
            }

            if ($("#socialinviter-CI-template").length > 0) {
                config.servicepanel.showmodal = conf.showmodal;
                $(document).ready(function () {
                    //$(".modal-SI-CI").addClass("nomodal");
                    $("#socialinviter-CI-template").find(".modal-SI-CI").css({ "position": "relative", "z-index": 0 });
                });
            }
            else {
                config.servicepanel.showmodal = true;
                $(document).ready(function () {
                    //$(".modal-SI-CI-BG").show();
                    //$(".modal-SI-CI").removeClass("nomodal");
                    $("body").prepend($("#socialinviter-CI-template").remove());
                });
            }
            if (conf.callbacks) {
                config.callbacks = {};
                if (conf.callbacks.proceed)
                    config.callbacks.proceed = conf.callbacks.proceed
                if (conf.callbacks.send)
                    config.callbacks.send = conf.callbacks.send
                if (conf.callbacks.back)
                    config.callbacks.back = conf.callbacks.back
                if (conf.callbacks.loaded)
                    config.callbacks.loaded = conf.callbacks.loaded

            }
            if (conf.position) {
                if (conf.position.left)
                    config.servicepanel.position.left = conf.position.left;
                else
                    config.servicepanel.position.left = "";
                if (conf.position.top)
                    config.servicepanel.position.top = conf.position.top;
                else
                    config.servicepanel.position.top = "";
                if (conf.position.right)
                    config.servicepanel.position.right = conf.position.right;
                else
                    config.servicepanel.position.right = "";
                if (conf.position.bottom)
                    config.servicepanel.position.bottom = conf.position.bottom;
                else
                    config.servicepanel.position.bottom = "";
            }
            if (conf.type == "slide") {
                config.servicepanel.type = conf.type;
                config.servicepanel.target = "popup";
            }
            else if (conf.type == "full") {
                config.servicepanel.type = conf.type;
            }
            else
                config.servicepanel.type = "";
        }
        else {
            console.log("Input configuration missing");
        }
        if (flagIconLoader == 1) {
            configureServicePanel();
        }
    }
    var services = [
        {
            title: "Gmail",
            desc: "Import your contacts",
            classRef: "gmail"
        },
        {
            title: "Yahoo",
            desc: "Import your contacts",
            classRef: "yahoo"
        },
        {
            title: "Hotmail",
            desc: "Import your contacts",
            classRef: "hotmail"
        },
        {
            title: "Outlook",
            desc: "Import your contacts",
            classRef: "outlook"
        },
        {
            title: "Email",
            desc: "Import your contacts",
            classRef: "email"
        }]
    var configureServicePanel = function () {
        $(document).ready(function () {
            if (config.servicepanel.target == "popup")
                $("body").append(buildServicePanel());
            else {
                //'socialinviter-CI'
                $("#" + config.servicepanel.target).ready(function () {
                    if ($("#" + config.servicepanel.target).length > 0)
                        $("#" + config.servicepanel.target).prepend(buildServicePanel());
                    else
                        $("#" + config.servicepanel.target).html(buildServicePanel());
                });
            }
            window.setTimeout(attachEvents, 500);
        });
    }
    var attachEvents = function () {
        if (config.servicepanel.type == "slide") {
            $(".CI-SI-Holder").find(".CI-SI-services").unbind("mouseenter").unbind("mouseleave");
            $(".CI-SI-Holder").find(".CI-SI-services").mouseenter(function () {
                $(this).find(".CI-SI-text").fadeIn("slow").addClass("CI-SI-text-lines");
            }).mouseleave(function () {
                $(this).find(".CI-SI-text").addClass("CI-SI-text-nolines").removeClass("CI-SI-text-lines")
            });
        }
        if ((config.servicepanel.type != "slide") && (config.servicepanel.type != "full")) {
            if ($(".CI-SI-i").eq(0).css("margin-left") != "14px")
                showTextAnimation();
        }

    }

    var showTextAnimation = function () {
        $(".CI-SI-text").hide().removeClass("hide");
        $(".CI-SI-services").mouseenter(function () {
            $(this).css({ "font-size": "13px", "text-align": "center", "height": "55px" });
            $(this).find(".CI-SI-text").css({ "float": "left", "margin-top": "-25px", "clear": "both", "opacity": 0, "width": "100%" }).show();
            $(this).find("i").animate({ "margin-top": "3px" }, 150);
            $(this).find(".CI-SI-text").animate({ "opacity": 1, "margin-top": "-15px" }, 150);

        }).mouseleave(function () {
            $(this).find("i").animate({ "margin-top": "10px" }, 150);
            $(this).find(".CI-SI-text").animate({ "opacity": 0 }, 50);
            $(this).find(".CI-SI-text").css({ "margin-top": "10px" }).hide();
        });
    }
    var buildServicePanel = function () {
        var len = services.length;
        var servicePanelDom = "";
        var pos = "";
        if (config.servicepanel.target == "popup") {
            pos = "position:absolute;overflow:hidden;";
            if (config.servicepanel.position.left && config.servicepanel.position.left != "") {
                if (config.servicepanel.position.left.toLowerCase() == "wall")
                    pos += "left:0px;"
                else
                    pos += "left:" + config.servicepanel.position.left + ";";
                if (config.servicepanel.position.top.toLowerCase() == "wall")
                    pos += "left:0px;"
                else
                    pos += "top:" + config.servicepanel.position.top + ";";
            }
            else if (config.servicepanel.position.right && config.servicepanel.position.right != "") {
                if (config.servicepanel.position.right.toLowerCase() == "wall")
                    pos += "right:0px;"
                else
                    pos += "right:" + config.servicepanel.position.right + ";";
                if (config.servicepanel.position.top.toLowerCase() == "wall")
                    pos += "left:0px;"
                else
                    pos += "top:" + config.servicepanel.position.top + ";";
            }
            else {
                pos += "left:0px;top:" + ($(window).height() / 2) + ";";
            }
        }

        $(".CI-SI-Holder").remove();
        var alignCls = "horiz";
        if (config.servicepanel.alignment.toLowerCase() == "vertical") {
            alignCls = "vert";
            if (config.servicepanel.type == "")
                pos += "width: 63px;"
        }
        var lineCls = "CI-SI-text-nolines";
        if (config.servicepanel.type == "full") {
            alignCls += " CI-SI-horiz-full";
            lineCls = "CI-SI-text-lines";
        }
        var rightSideFlag = 0;
        if ((config.servicepanel.target == "popup") && (config.servicepanel.position.right.toLowerCase() == "wall") && (config.servicepanel.type == "slide")) {
            rightSideFlag = 1;
        }
        servicePanelDom += "<div class=\"CI-SI-Holder\" style=\"" + pos + "\">";
        servicePanelDom += "<div class=\"CI-SI\">";
        servicePanelDom += "    <ul class=\"CI-SI-ul\">";
        for (var i = 0; i < len; i++) {
            servicePanelDom += "        <li class=\"CI-SI-ul-li\" onclick=\"contactimporter.auth('" + services[i].classRef + "','contactimporter','icon')\">";
            servicePanelDom += "            <div class=\"CI-SI-services CI-SI-shape-circle " + ((rightSideFlag == 1) ? "CI-SI-services-rev" : "") + " CI-SI-" + services[i].classRef + " CI-SI-" + alignCls + "\" >";
            if (rightSideFlag == 0)
                servicePanelDom += "            <i class=\"CI-SI-i-" + services[i].classRef + " CI-SI-i\"></i>";
            if ((config.servicepanel.type != "slide") && (config.servicepanel.type != "full")) {
                servicePanelDom += "            <div class=\"CI-SI-text hide" + ((rightSideFlag == 1) ? " CI-SI-text-rev" : "") + "\">";
                servicePanelDom += "                <div class=\"CI-SI-text-line1\">" + services[i].title + "</div>";
            }
            else {
                servicePanelDom += "            <div class=\"CI-SI-text " + lineCls + ((rightSideFlag == 1) ? " CI-SI-text-rev" : "") + "\">";
                servicePanelDom += "                <div class=\"CI-SI-text-line1\">" + services[i].title + "</div>";
            }

            if ((config.servicepanel.type != "slide") && (config.servicepanel.type != "full"))
                servicePanelDom += "                <div class=\"CI-SI-text-line2 " + lineCls + "\">" + services[i].desc + "</div>";
            else
                servicePanelDom += "                <div class=\"CI-SI-text-line2\">" + services[i].desc + "</div>";
            servicePanelDom += "            </div>";
            if (rightSideFlag == 1)
                servicePanelDom += "            <i class=\"CI-SI-i-" + services[i].classRef + " CI-SI-i\"></i>";
            servicePanelDom += "            </div>";
            servicePanelDom += "        </li>";
        }
        servicePanelDom += "    </ul>";
        servicePanelDom += "</div>";
        servicePanelDom += "</div>";
        return servicePanelDom;
    }
    var init = function () {
        configureServicePanel()
    }
    return {
        init: init,
        load: setConfig,
        getConfig: getConfig
    }
})();

var modalSI = (function () {
    var init = function () {
        if ($(".modal-SI-CI-BG").length == 0) {
            $(document).ready(function () {
                var mdl = "<div class=\"modal-SI-CI-BG\"></div>";
                mdl += "<div class=\"modal-SI-CI\"><div class=\"modal-SI-holder\"><div class=\"modal-SI-header\">";
                mdl += "<div class=\"modal-SI-title\"><div class=\"fl\"><img class=\"modal-SI-title-icon\" src=\"\"/></div>";
                mdl += "<div class=\"title-modal-text\"></div></div><div class=\"modal-SI-close\">";
                if (window.location.href.indexOf("oauth") != -1) {
                    mdl += "<img src=\"\"/></div></div>";
                }
                else {
                    mdl += "<img src=\"//socialinviter.com/assets/img/icons/close-small.png\"/></div></div>";
                }
                mdl += "<div class=\"modal-SI-body\"><div class='modal-message-holder'><div class='modal-message'></div></div></div></div></div>";
                if ($("#socialinviter-CI-template").length > 0) {
                    $("#socialinviter-CI-template").append(mdl);
                    $(".modal-SI-CI").css({ "position": "relative", "float": "left" }).find(".modal-SI-close").hide();
                }
                else {
                    $("body").append(mdl);
                    attachModalEvents();
                }

            });
        }
        $(".modal-SI-CI").find(".modal-SI-holder").removeClass("modal-SI-small");
    }
    var attachModalEvents = function () {
        $(".modal-SI-CI").find(".modal-SI-close").unbind("click").click(function () {
            modalSI.hide();
        });
        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                if ($("#socialinviter-CI-template").length == 0)
                    $(".modal-SI-CI").find('.modal-SI-close').click();
            }   // esc
        });
    }
    var show = function () {
        $(document).ready(function () {
            if (socialinviter.getConfig().servicepanel.showmodal == false || $("#socialinviter-CI-template").length > 0) {
                $(".modal-SI-SC-BG").hide();
                $(".modal-SI-CI-BG").hide();
                $(".modal-SI-FI-BG").hide();
                $(".modal-SI-CI").css({ "z-index": 0 }).find(".modal-SI-close").hide();
            }
            else {
                $(".modal-SI-SC-BG").hide();
                $(".modal-SI-FI-BG").hide();
                $(".modal-SI-CI-BG").fadeIn("slow");
                $(".modal-SI-CI").css({
                    position: "fixed",
                    left: 0
                }).find(".modal-SI-close").show();
            }
            attachModalEvents();
            $(".modal-SI-CI").fadeIn("slow");
            $(".modal-SI-CI").find(".modal-SI-holder").removeClass("modal-SI-small");
        });
    }
    var hide = function () {
        $(".modal-SI-CI-BG").fadeOut("slow");
        $(".modal-SI-CI").fadeOut("slow");
    }
    var load = function (obj, type) {
        //obj = {title:"",body:""}
        if (obj) {
            if (obj.title)
                $(".modal-SI-CI").find(".title-modal-text").html(obj.title);
            if (obj.icon)
                $(".modal-SI-CI").find(".modal-SI-title-icon").attr("src", obj.icon);
            if (obj.body)
                $(".modal-SI-CI").find(".modal-SI-body").html(obj.body).prepend("<div class='modal-message-holder'><div class='modal-message'></div></div>"); ; ;

            $(".modal-SI-CI").find(".modal-SI-holder").removeClass("modal-SI-small");
        }
        if (type == "show")
            show();
    }
    var showErrorMessage = function (errmsg) {
        $(".modal-SI-CI").find(".modal-SI-body").find(".modal-message").addClass("modal-message-error").html(errmsg).fadeIn(500, function () {
            window.setTimeout(function () {
                $(".modal-SI-CI").find(".modal-SI-body").find(".modal-message").html("").fadeOut(500).removeClass("modal-message-error");
            }, 3000);
        });
    }
    var showSuccessMessage = function (succmsg) {
        $(".modal-SI-CI").find(".modal-SI-body").find(".modal-message").addClass("modal-message-success").html(succmsg).fadeIn(500, function () {
            window.setTimeout(function () {
                $(".modal-SI-CI").find(".modal-SI-body").find(".modal-message").html("").fadeOut(500).removeClass("modal-message-success");
            }, 3000);
        });
    }
    return {
        init: init,
        load: load,
        show: show,
        hide: hide,
        showErrorMessage: showErrorMessage,
        showSuccessMessage: showSuccessMessage
    }
})();
thiselectedpdt = "contactimporter";
var gmailwin, poptracker, pollTimer, authLock = 0, sendemailtimer = 0;
var contactimporter = (function () {
    var invalidkey = "";
    var endpoint = "//localhost:58572/socialinviter/api/contacts.aspx";
    if (window.location.href.toString().indexOf("58572") == -1)
        endpoint = "//socialinviter.com/api/contacts.aspx";
    var userendpoint = "//localhost:58572/socialinviter/api/connect.aspx";
    if (window.location.href.toString().indexOf("58572") == -1)
        userendpoint = "//socialinviter.com/api/connect.aspx";
    var uploadendpoint = "//socialinviter.com/API/uploader.aspx";
    var addressbookData = {}, selectedAddressbookData = {}, selectedMailService = "", popuperror = "", allImportedContacts = "", addedrecipient = [];
    var icons = {
        "gmail": "//socialinviter.com/assets/img/icons/gmail-icon.png",
        "yahoo": "//socialinviter.com/assets/img/icons/yahoo-icon.png",
        "hotmail": "//socialinviter.com/assets/img/icons/hotmail-icon.png",
        "outlook": "//socialinviter.com/assets/img/icons/outlook-icon.png",
        "facebook": "//socialinviter.com/assets/img/icons/facebook-icon.png",
        "email": "//socialinviter.com/assets/img/icons/email-icon.png"
    };
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
    var setPopupError = function (poperr) {
        popuperror = poperr;
    }
    var makecall = function (apiurl) {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        var filerefUrls = apiurl
        fileref.setAttribute("src", decodeMe(apiurl));
        try {
            document.body.appendChild(fileref);
        }
        catch (e) {
            document.getElementsByTagName("head")[0].appendChild(fileref)
        }
    }
    var decodeMe = function (a) {
        a = unescape(a);
        while (a.indexOf("%20") != -1) {
            a = a.replace("%20", "");
        }
        return unescape(a);
    }
    var putInToStore = function (name, value) {
        var c_name = name;
        var exdays = 300;
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        //document.cookie = c_name + "=" + c_value + ";path=/;";
        if (document.domain === 'localhost') {
            document.cookie = c_name + "=" + c_value + ";path=/;";
        } else {
            document.cookie = c_name + "=" + c_value + ';domain=.' + document.domain + ';path=/;';
        }
    }
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
    }
    var removeFromStore = function (name, path, domain) {
        if (path)
            document.cookie = name + "=" + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        else
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    }
    var displayError = function (msg) {
        msg = decodeURIComponent(msg);
        if (document.getElementById("loadingStatus") != null) {
            document.getElementById("loadingStatus").innerHTML = "<div class='errhldr'><img class='erricn' src='//socialinviter.com/assets/img/icons/alert-icon.png'/><span class='errmsg'>Error:   " + unescape(decodeURIComponent(msg)) + "</span></div>";
        }
        else {
            try { console.log(msg); } catch (e) { };
        }
        $(".modal-SI-CI").find(".modal-SI-holder").addClass("modal-SI-small");
    }
    var closepopup = function (accData) {
        var verificationurl = getFromStore("verificationurl");
        if (verificationurl) {
            clearCache();
            window.location.href = verificationurl
        }
        else {
            window.opener.contactimporter.startgrabbing(accData.data);
            window.self.close();
        }
    }
    var clearCache = function () {
        removeFromStore("service", "/", "." + document.domain);
        removeFromStore("product", "/", "." + document.domain);
        removeFromStore("authData", "/", "." + document.domain);
        removeFromStore("verificationurl", "/", "." + document.domain);
    }
    var authCallback = function (data) {
        putInToStore("authData", decodeURIComponent(decodeURIComponent(data)));
        data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
        if (data.responseStatus.type == "error") {
            removeFromStore("authData", "/", "." + document.domain);
            displayError(data.responseStatus.message);
            window.opener.contactimporter.setPopupError(data.responseStatus.message);
        }
        else {
            data = data.data;
            if ($.trim(data.authurl) == "")
                displayError("Something went wrong.");
            else
                window.location.href = data.authurl;
        }
    }
    var accessCallback = function (data) {
        data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
        if (data.responseStatus.type == "error") {
            displayError(data.responseStatus.message);
            window.opener.contactimporter.setPopupError(data.responseStatus.message);
        }
        else {
            closepopup(data);
        }
    }
    var contactsCallback = function (data) {
        var dataStr = data;
        try {
            data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
        }
        catch (e) {
            data = { responseStatus: { type: "error", message: "Something went wrong, Please <a href=\"javascript:;\" onclick=\"contactimporter.auth('" + contactimporter.getService() + "','contactimporter')\">try again.</a>" }, data: { service: contactimporter.getService()} };
        }
        if (data.responseStatus.type == "error") {
            modalSI.load({ "title": convertName(data.data.service), "body": "<div class='CI-loading'>" + decodeURIComponent(data.responseStatus.message) + "</div>" }, "show");
            $(".modal-SI-CI").find(".modal-SI-holder").addClass("modal-SI-small");
        }
        else {
            if ($(".grabbedcontacts").length == 0) {
                $("body").append("<div class=\"posabs grabbedcontacts\"></div>");
                $(".grabbedcontacts").attr("contacts", dataStr);
            }
            else {
                $(".grabbedcontacts").attr("contacts", dataStr);
            }
            allImportedContacts = "";
            window.setTimeout(function () {
                modalSI.load({ "title": convertName(data.data.service), "body": "<div class='CI-loading'>Loading contacts...</div>" }, "show");
                window.setTimeout(function () {
                    contactimporter.showStep1(data.data);
                }, 1500);
            }, 1);
        }
    }
    var uploadCallback = function (data) {
        if (data.responseStatus.type == "error") {
            modalSI.load({ "title": "", "body": "<div class='CI-loading'>" + data.responseStatus.message + "</div>" }, "show");
            $(".modal-SI-CI").find(".modal-SI-holder").addClass("modal-SI-small");
        }
        else {
            $(".upload-SI-loading").hide();
            startgrabbing({ token: "", tokensecret: "", tokenverifier: "", userid: "", uploadedfile: data.data.uploadedFileUrl });
        }
    }
    var submitUploading = function () {
        $(".upload-SI-loading").show();
        if (document.getElementById("fupload").value == "") {
            $(".upload-SI-loading").hide();
            $(".upload-SI-error-panel").find(".model-err-msg").html(socialinviter.getConfig().servicepanel.content.outlook.validation.selectfile);
            $(".upload-SI-error-panel").show();
            document.getElementById("fupload").value = "";
            $("#fupload").focus();
            return false;
        }
        else {
            var flag = 0;
            if ((document.getElementById("fupload").value.lastIndexOf(".csv") != -1) || (document.getElementById("fupload").value.lastIndexOf(".CSV") != -1))
                flag = 1;

            if (flag == 0) {
                $(".upload-SI-loading").hide();
                $(".upload-SI-error-panel").find(".model-err-msg").html(socialinviter.getConfig().servicepanel.content.outlook.validation.wrongupload);
                $(".upload-SI-error-panel").show();
                document.getElementById("fupload").value = "";
                $("#fupload").focus();
                return false;
            }
            else {
                document.getElementById("pluginloc").value = window.location.href.split("/").slice(0, -1).join('/') + "/";
                $(".upload-SI-error-panel").find(".model-err-msg").html("");
                $(".upload-SI-error-panel").hide();
                return true;
            }
        }
    }
    var getInputData = function (data) {
        var urlValue = "";
        var pageUrl = window.location.href;
        if (data.service == "yahoo") {
            urlValue = "&token=" + getQueryString("oauth_token", pageUrl) + "&tokenverifier=" + getQueryString("oauth_verifier", pageUrl) + "&tokensecret=" + data.tokensecret;
        }
        else {
            urlValue = "&token=" + getQueryString("code", pageUrl) + "&tokensecret=" + data.tokensecret + "&tokenverifier=";
        }
        return urlValue;
    }

    var startgrabbing = function (authData) {
        contactimporter.processLock("release");
        var srcUrl = document.getElementById("apiscript").src;
        var id = getQueryString("id", srcUrl);
        var key = getQueryString("key", srcUrl);
        var did = getQueryString("did", srcUrl);
        if (id == "" && did == "") {
            var data = getFromStore("userIdentityCI");
            data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
            data = data.data;
            id = data.userid;
            did = data.domid;
        }
        var serv = contactimporter.getFromStore("service");
        if (authData) {
            modalSI.load({ "title": convertName(serv), "body": "<div class='CI-loading'>Fetching contacts...</div>" }, "show");
            var reqParam = "&token=" + authData.token + "&tokensecret=" + authData.tokensecret + "&tokenverifier=" + authData.tokenverifier + "&userid=" + authData.userid;
            if (serv == "outlook")
                reqParam += "&uploadedfile=" + authData.uploadedfile;
            else
                reqParam += "&uploadedfile=";
            makecall(endpoint + "?id=" + id + "&did=" + did + "&product=" + getFromStore("product") + "&key=" + key + "&service=" + serv + "&callback=contactimporter.contactsCallback" + reqParam);
        }
        else {
            modalSI.showErrorMessage("Invalid request: something went wrong.");
        }
    }
    var updateUser = function (data) {
        putInToStore("userIdentityCI", decodeURIComponent(decodeURIComponent(data)));
        data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
        if (data.responseStatus.type == "error") {
            invalidkey = data.responseStatus.message;
            removeFromStore("userIdentityCI", "/", "." + document.domain);
            displayError(data.responseStatus.message);
        }
        else {
            invalidkey = "";
            data = data.data;
            putInToStore("key", data.licensekey);
            putInToStore("id", data.userid);
            putInToStore("domid", data.domid);
            init();
        }
    }
    var initialize = function () {
        if ((getQueryString("key", window.location.href) == "") && (getQueryString("uploadedstatus", window.location.href) == "") && (getQueryString("domid", window.location.href) == "") && (window.location.href.indexOf("/oauth.html") == -1)) {
            removeFromStore("service", "/", "." + document.domain);
            removeFromStore("product", "/", "." + document.domain);
            removeFromStore("key", "/", "." + document.domain);
            removeFromStore("id", "/", "." + document.domain);
            removeFromStore("domid", "/", "." + document.domain);
            removeFromStore("userIdentityCI", "/", "." + document.domain);
            removeFromStore("verificationurl", "/", "." + document.domain);
            var srcUrl = document.getElementById("apiscript").src;
            var key = getQueryString("key", srcUrl);
            makecall(userendpoint + "?key=" + key + "&callback=contactimporter.updateUser");
        }
        else {
            init();
        }

    }
    var init = function () {
        var service = getQueryString("service", window.location.href);
        var product = getQueryString("product", window.location.href);
        if (document.getElementById("apiscript")) {
            var srcUrl = document.getElementById("apiscript").src;
            var id = getQueryString("id", srcUrl);
            var key = getQueryString("key", srcUrl);
            var did = getQueryString("did", srcUrl);
            if (id == "" && did == "") {
                var data = getFromStore("userIdentityCI");
                data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
                data = data.data;
                id = data.userid;
                did = data.domid;
            }
            if (product != "" && service != "") {
                //authentication
                document.getElementById("loadingtext").innerHTML = "Authenticating";
                clearCache();
                var verificationurl = getQueryString("verification", window.location.href);
                if (verificationurl != "") {
                    putInToStore("verificationurl", verificationurl);
                }
                else {
                    removeFromStore("verificationurl", "/", "." + document.domain);
                }
                if (service) {
                    putInToStore("service", service);
                    putInToStore("product", product);
                    putInToStore("key", key);
                    putInToStore("id", id);
                    putInToStore("domid", did);
                    makecall(endpoint + "?id=" + id + "&did=" + did + "&key=" + key + "&product=" + product + "&service=" + service + "&callback=contactimporter.authCallback");
                }
            }
            else if ((getQueryString("oauth_token", window.location.href) != "") || getQueryString("code", window.location.href)) {
                //accesstoken
                document.getElementById("loadingtext").innerHTML = "Verifying credentials";
                var authData = contactimporter.getFromStore("authData");
                if (authData) {
                    authData = eval("(" + authData + ")").data;
                    var constructedData = getInputData(authData);
                    var getAccessUrl = endpoint + "?id=" + id + "&did=" + did + "&key=" + key + "&service=" + authData.service + "&product=" + getFromStore("product");
                    getAccessUrl += constructedData + "&callback=contactimporter.accessCallback";
                    makecall(getAccessUrl);
                }
                else {
                    displayError(escape("Invalid request"));
                }
            }
            else if (getQueryString("uploadedstatus", window.location.href) != "") {
                var uploadedstatus = getQueryString("uploadedstatus", window.location.href);
                if (uploadedstatus != "") {
                    var uploadedObj = eval("(" + uploadedstatus + ")");
                    parent.contactimporter.uploadCallback(uploadedObj);

                }
            }
            else if (getQueryString("error", window.location.href) == "access_denied") {
                try {
                    window.opener.processor.setPopupError("Permission denied");
                }
                catch (e) {
                }
                window.self.close();
            }
            else {
                if (window.location.href.indexOf("/oauth.html") != -1) {
                    displayError("Invalid request, some parameters are missing.");
                }
            }
        }
        else if (getQueryString("uploadedstatus", window.location.href) != "") {
            var uploadedstatus = getQueryString("uploadedstatus", window.location.href);
            if (uploadedstatus != "") {
                var uploadedObj = eval("(" + uploadedstatus + ")");
                parent.contactimporter.uploadCallback(uploadedObj);
            }
        }
    }
    var processLock = function (lck) {
        if (lck == "release")
            authLock = 0;
        else
            authLock = 1;
        return authLock;
    }
    var scrollToWindow = function () {
        if ($("#socialinviter-CI-template").length > 0) {
            $('body,html').animate({
                scrollTop: $("#socialinviter-CI-template").offset().top - 20
            }, 600);
        }
    }
    var auth = function (service, product, iconclick) {
        thiselectedpdt = "contactimporter";
        popuperror = "";
        if (iconclick) {
            addressbookData = {};
            selectedAddressbookData = { "addressbook": [], "service": service };
            addedrecipient = [];
        }
        selectedMailService = service;
        putInToStore("product", product);
        putInToStore("service", service);
        contactimporter.processLock("lock");
        try { window.clearInterval(gmailwin); } catch (e) { }
        try { window.clearInterval(pollTimer); } catch (e) { }
        if (invalidkey != "") {
            var errorStatDom = "<div class=\"error-stat\"><div class=\"model-err-msg\">" + decodeURIComponent(invalidkey) + "</div></div>";
            modalSI.load({ "title": convertName(service), "icon": icons[service], "body": "<div class='CI-loading'>Contact importing failed, please <a href=\"javascript:;\" onclick=\"contactimporter.auth('" + service + "','contactimporter')\">Try again.</a>" + errorStatDom + "</div>" }, "show");
            $(".modal-SI-CI").find(".modal-SI-holder").addClass("modal-SI-small");
            return true;
        }
        if (service == "outlook") {
            modalSI.load({ "title": convertName(service), "icon": icons[service], "body": "<div class='CI-loading'>Please authenticate your " + convertName(service) + " account, make sure the authenticating window is not blocked by popup blocker.</div>" }, "show");
            $(".modal-SI-CI").find(".modal-SI-holder").addClass("modal-SI-small");
            scrollToWindow();
            showcsvupload();
        }
        else if (service == "email") {
            modalSI.load({ "title": convertName(service), "icon": icons[service], "body": "<div class='CI-loading'>Please authenticate your " + convertName(service) + " account, make sure the authenticating window is not blocked by popup blocker.</div>" }, "show");
            $(".CI-loading").hide();
            scrollToWindow();
            contactimporter.showStep2("email");
            if ($(".mailing-step-count").length > 0) {
                var stp1 = socialinviter.getConfig().servicepanel.content.navigation.replace("{0}", "1").replace("{1}", "1");
                $(".mailing-step-count").html(stp1);
            }
            $(".mailing-footer-back").hide();
            $(".modal-SI-CI").find(".toaddresserror").hide();
        }
        else {
            modalSI.load({ "title": "Authenticating...", "icon": icons[service], "body": "<div class='CI-loading'>Please authenticate your " + convertName(service) + " account, make sure the authenticating window is not blocked by popup blocker.</div>" }, "show");
            $(".modal-SI-CI").find(".modal-SI-holder").addClass("modal-SI-small");
            scrollToWindow();
            var srcUrl = document.getElementById("apiscript").src;
            var id = getQueryString("id", srcUrl);
            var key = getQueryString("key", srcUrl);
            var did = getQueryString("did", srcUrl);
            if (id == "" && did == "") {
                var data = getFromStore("userIdentityCI");
                data = eval("(" + decodeURIComponent(decodeURIComponent(data)) + ")");
                data = data.data;
                id = data.userid;
                did = data.domid;
            }
            putInToStore("id", data.userid);
            putInToStore("domid", data.domid);
            putInToStore("csspath", socialinviter.getConfig().servicepanel.path.css);
            putInToStore("jspath", socialinviter.getConfig().servicepanel.path.js);

            poptracker = window.open("oauth.html?key=" + key + "&id=" + id + "&did=" + did + "&service=" + service + "&product=" + product, "", "width=700, height=600");
            window.clearInterval(pollTimer);
            pollTimer = window.setInterval(function () {
                if (poptracker == undefined) {
                    window.clearInterval(pollTimer);
                    modalSI.load({ "title": convertName(contactimporter.getService()), "body": "<div class='CI-loading'>Please make sure you browser doesn't block our authentication popup window. Operation failed, please <a href=\"javascript:;\" onclick=\"contactimporter.auth('" + contactimporter.getService() + "','contactimporter','true')\">Try again.</a></div>" }, "show", "fast");
                    $(".modal-SI-CI").find(".modal-SI-holder").addClass("modal-SI-small");
                }
                else if (poptracker.closed !== false) { // !== is required for compatibility with Opera
                    window.clearInterval(pollTimer);
                    if (authLock == 1) {
                        var errorStatDom = "";
                        if (popuperror != "")
                            errorStatDom = "<div class=\"error-stat\"><div class=\"model-err-msg\">" + decodeURIComponent(popuperror) + "</div></div>";
                        modalSI.load({ "title": convertName(contactimporter.getService()), "body": "<div class='CI-loading'>Authentication failed, please <a href=\"javascript:;\" onclick=\"contactimporter.auth('" + contactimporter.getService() + "','contactimporter')\">Try again.</a>" + errorStatDom + "</div>" }, "show");
                        contactimporter.processLock("release");
                        $(".modal-SI-CI").find(".modal-SI-holder").addClass("modal-SI-small");
                    }
                }
            }, 200);
        }

    }
    var getService = function () {
        return selectedMailService;
    }
    var convertName = function (name) {
        if (name != "" && name != undefined) {
            var fLetter = name.substr(0, 1).toUpperCase();
            var name_ = name.substr(1, name.length - 1);
            name = fLetter + name_;
        }
        return name;
    }
    var getAllContacts = function () {
        var evalData = "";
        if (allImportedContacts == "") {
            allImportedContacts = eval("(" + decodeURIComponent(decodeURIComponent($(".grabbedcontacts").attr("contacts"))) + ")").data;
            $(".grabbedcontacts").attr("contacts", "");
        }
        return allImportedContacts;
    }
    var getSelectedContacts = function () {
        var len = selectedAddressbookData.addressbook.length;
        var SelCont = [];
        for (var i = 0; i < len; i++) {
            if (selectedAddressbookData.addressbook[i])
                SelCont.push(selectedAddressbookData.addressbook[i]);
        }
        return { "addressbook": SelCont };
    }
    var selectContact = function (index) {
        selectedAddressbookData.addressbook[index] = (contactimporter.getAllContacts().addressbook[index]);
        if (contactimporter.getSelectedContacts().addressbook.length == 0) {
            $(".step1-proceed").addClass("steptwodisable");
        }
        else {
            $(".step1-proceed").removeClass("steptwodisable");
        }
    }
    var deSelectContact = function (index) {
        //selectedAddressbookData.addressbook.splice(parseInt(index), 1);
        selectedAddressbookData.addressbook[index] = undefined;
        if (contactimporter.getSelectedContacts().addressbook.length == 0) {
            $(".step1-proceed").addClass("steptwodisable");
        }
        else {
            $(".step1-proceed").removeClass("steptwodisable");
        }
    }
    var selectAllContacts = function () {
        $(".selectcontact").prop("checked", true);
        selectedAddressbookData.addressbook = addressbookData.addressbook;
        $(".step1-proceed").removeClass("steptwodisable");
        $(".CI-Contact-count").html(contactimporter.getSelectedContacts().addressbook.length + " Selected");
    }
    var deSelectAllContacts = function () {
        selectedAddressbookData = { "addressbook": [], "service": selectedAddressbookData.service };
        $(".selectcontact").prop("checked", false);
        $(".step1-proceed").addClass("steptwodisable");
        $(".CI-Contact-count").html(contactimporter.getSelectedContacts().addressbook.length + " Selected");
    }
    var setData = function (data) {
        selectedAddressbookData = data;
    }
    var showcsvupload = function () {
        var tgturl = "//socialinviter.com/";
        var csvStr = "<div class=\"file-SI-upload\"><div class=\"file-SI-upload-left fl\">";
        csvStr += "<div><iframe src=\"\" id=\"fuploadframe\" name=\"fuploadframe\" height=\"0px\" width=\"0px\" frameborder=\"0\" scrolling=\"no\"></iframe></div>";
        csvStr += "<form action=\"" + uploadendpoint + "\" id=\"fuploadform\" method=\"post\" target=\"fuploadframe\" onsubmit=\"javascript:return contactimporter.submitUploading()\" enctype=\"multipart/form-data\">";
        csvStr += "<div><div><div class=\"fl\"><label for=\"fupload\" class=\"upload-SI-label\">" + socialinviter.getConfig().servicepanel.content.outlook.label + "</label></div>";
        csvStr += "<div class=\"upload-SI-control\"><input type=\"file\" name=\"fupload\" id=\"fupload\"/><input type=\"hidden\" id=\"pluginloc\" name=\"pluginloc\" /></div></div>";
        csvStr += "<div class=\"upload-SI-button-holder fl\"><button type=\"submit\" class=\"upload-SI-button\">" + socialinviter.getConfig().servicepanel.content.outlook.button.upload + "</button></div>";
        csvStr += "<div class=\"upload-SI-loading\"><img src=\"" + tgturl + "assets/img/icons/processing.gif\" /></div></div></form></div>";
        csvStr += "<div class=\"dile-SI-upload-right fr\"><div class=\"supp-SI-lbl\">" + socialinviter.getConfig().servicepanel.content.outlook.supported + " </div><div>";
        csvStr += "<ul class=\"supp-SI-list\"><li><img src=\"" + tgturl + "assets/img/icons/outlook-icon.png\" /></li><li><img src=\"" + tgturl + "assets/img/icons/thunderbird-icon.png\" /></li>";
        csvStr += "<li><img src=\"" + tgturl + "assets/img/icons/gmail-icon.png\" /></li><li><img src=\"" + tgturl + "assets/img/icons/yahoo-icon.png\" /></li>";
        csvStr += "<li><img src=\"" + tgturl + "assets/img/icons/hotmail-icon.png\" /></li><li><img src=\"" + tgturl + "assets/img/icons/linkedin-icon.png\" /></li>";
        csvStr += "</ul></div></div><div class=\"break upload-SI-error-panel\">";
        csvStr += "<div class=\"error-stat\"><div class=\"model-err-msg\"></div></div>";
        csvStr += "</div></div>";
        if (addressbookData.addressbook) {
            csvStr += "<div class=\"CI-list-container-footer CI-footer-back-list\">";
            csvStr += "<div class=\"CI-contact-refresh-holder\">";
            var stp1backtolist = socialinviter.getConfig().servicepanel.content.outlook.link.backtolist
            csvStr += "<a href=\"javascript:;\" class=\"CI-contact-refresh backtolist-CI\">" + stp1backtolist + "</a>";
            csvStr += "</div></div>";
        }
        $(".modal-SI-CI").find(".modal-SI-body").html(csvStr);
        $("#fupload").change(function () {
            $(".upload-SI-button").focus();
        });
        $(".backtolist-CI").unbind("click").click(function () {
            $(".modal-SI-CI").find(".modal-SI-holder").removeClass("modal-SI-small");
            contactimporter.showStep1();
        });
    }
    var showStep1 = function (contactsData) {
        if (contactsData) {
            addressbookData = contactsData;
            setData(addressbookData);
        }
        else {
            contactsData = addressbookData;
        }
        var len = contactsData.addressbook.length;
        var contactsDom = "<div class=\"CI-list-container step1\" style=\"opacity:0\">";
        contactsDom += "<div class=\"CI-list-container-header\">";
        var stp1title = socialinviter.getConfig().servicepanel.content.step1.title;
        contactsDom += "<div class=\"CI-list-container-header-title\">" + stp1title.replace("{0}", convertName(contactsData.service)) + "</div>";
        var stpnavig = socialinviter.getConfig().servicepanel.content.navigation.replace("{0}", "1");
        if (socialinviter.getConfig().servicepanel.showform == false)
            contactsDom += "<div class=\"fr CI-list-header-step\">" + stpnavig.replace("{1}", "1") + "</div>";
        else
            contactsDom += "<div class=\"fr CI-list-header-step\">" + stpnavig.replace("{1}", "2") + "</div>";
        contactsDom += "</div>";
        contactsDom += "<div class=\"CI-list-container-status\">";
        var stp1desc = socialinviter.getConfig().servicepanel.content.step1.description;
        contactsDom += stp1desc.replace("{0}", len);
        contactsDom += "</div>";
        contactsDom += "<div class=\"CI-contact-Panel " + ((len == 0) ? "hide" : "") + "\">";
        contactsDom += "<div class=\"CI-contact-Panel-header\">";
        contactsDom += "<div class=\"fl CI-contact-selectall\">";
        contactsDom += "<div class=\"CI-chkselall\">";
        contactsDom += "<input type=\"checkbox\" id=\"chkselall\" checked=\"checked\"></div>";
        contactsDom += "<div class=\"CI-chkselall-label\">";
        var stp1selectall = socialinviter.getConfig().servicepanel.content.step1.selectall;
        contactsDom += "<label for=\"chkselall\">" + stp1selectall + "</label>";
        contactsDom += "</div></div>";
        contactsDom += "<div class=\"fr CI-Contact-count\">";
        var stp1selected = socialinviter.getConfig().servicepanel.content.step1.selected.replace("{0}", len);
        contactsDom += stp1selected;
        contactsDom += "</div>";
        if (socialinviter.getConfig().servicepanel.showsearch != false)
            contactsDom += "<div class=\"fr CI-Contact-search\"><input id=\"txtsearchname\" type=\"text\" value=\"Search...\"></div>";
        contactsDom += "</div>";
        contactsDom += "<div class=\"CI-contact-Panel-body\">";
        contactsDom += "<ul class=\"CI-contact-ul-list\">";
        for (var i = 0; i < len; i++) {
            contactsDom += "<li class=\"CI-contact-ul-li-list CI-contacts-def\" contactindex=\"" + i + "\"><div class=\"fl CI-li-holdr\">";
            contactsDom += "<div class=\"CI-contact-selectbox\">";
            contactsDom += "<input type=\"checkbox\" checked=\"checked\" class=\"selectcontact hand\">";
            contactsDom += "</div>";
            contactsDom += "<div class=\"fl CI-contact-photo-holder\">";
            contactsDom += "<img class=\"CI-contact-photo\" src=\"//socialinviter.com/assets/img/sicon/nopic_m.jpg\" originalsrc=\"" + ((contactsData.addressbook[i].imageurl == "") ? "//socialinviter.com/assets/img/sicon/nopic_m.jpg" : contactsData.addressbook[i].imageurl) + "\" style=\"border-radius:500px\">";
            contactsDom += "<div class=\"more-holder\"><div class=\"CI-contact-more " + ((socialinviter.getConfig().servicepanel.showmore == false) ? "hide" : "") + " \">";
            contactsDom += "<img src=\"//socialinviter.com/assets/img/icons/moredetails.png\"/>";
            contactsDom += "<div class=\"CI-contact-more-details\">loading...</div></div></div>";
            contactsDom += "</div>";
            contactsDom += "<div class=\"CI-contact-namesection\">";
            contactsDom += "<div class=\"CI-contactPanel-title b\">"
            var nme = "";
            try {
                nme = (decodeURIComponent(contactsData.addressbook[i].name.first_name) == "null") ? "" : decodeURIComponent(contactsData.addressbook[i].name.first_name);
                nme += " ";
                nme += (decodeURIComponent(contactsData.addressbook[i].name.last_name) == "null") ? "" : decodeURIComponent(contactsData.addressbook[i].name.last_name);
            }
            catch (e) {
                nme = (unescape(contactsData.addressbook[i].name.first_name) == "null") ? "" : unescape(contactsData.addressbook[i].name.first_name);
                nme += " ";
                nme += (unescape(contactsData.addressbook[i].name.last_name) == "null") ? "" : unescape(contactsData.addressbook[i].name.last_name);
            }

            contactsDom += $.trim(nme) + "</div>";
            contactsDom += "<div class=\"CI-contactPanel-email\">" + contactsData.addressbook[i].email[0] + "</div>";
            contactsDom += "</div></div>";
            contactsDom += "</li>";
        }
        contactsDom += "</ul>";
        contactsDom += "</div></div>";
        contactsDom += "<div class=\"CI-list-container-footer\">";
        contactsDom += "<div class=\"CI-contact-refresh-holder\">";
        var stp1refresh = socialinviter.getConfig().servicepanel.content.step1.button.refresh;
        var stp1back = socialinviter.getConfig().servicepanel.content.outlook.link.back;
        contactsDom += "<a href=\"javascript:;\" onclick=\"contactimporter.auth('" + contactsData.service + "','contactimporter')\" class=\"CI-contact-refresh\">" + ((contactsData.service == "outlook") ? stp1back : stp1refresh) + "</a>";
        contactsDom += "</div>";
        var stp1proceed = socialinviter.getConfig().servicepanel.content.step1.button.proceed;
        contactsDom += "<div class=\"CI-list-container-proceed step1-proceed " + ((len == 0) ? "hide" : "") + "\">" + stp1proceed + "</div>";
        contactsDom += "</div></div>";
        $(".modal-SI-CI").find(".modal-SI-body").html(contactsDom);
        if ($(".modal-SI-CI").find(".modal-SI-body").find(".modal-message-holder").length == 0) {
            $(".modal-SI-CI").find(".modal-SI-body").prepend("<div class='modal-message-holder'><div class='modal-message'></div></div>"); ;
        }

        if (contactsData.service == "gmail") {
            gmailImageProcessor();
        }
        if (socialinviter.getConfig().servicepanel.showsearch != false) {
            $("#txtsearchname").off("click").on("click", function () {
                var me = $(this);
                if ($.trim(me.val()) == "Search...") {
                    me.val("");
                }
                else if (me.val().length > 1) {
                    contactimporter.autoSuggest(me.val());
                }
            }).off("blur").on("blur", function () {
                var me = $(this);
                if ($.trim(me.val()) == "") {
                    me.val("Search...");
                }
                window.setTimeout(function () {
                    $("#autosuggestholder").hide();
                }, 500);
            }).off("keyup").on("keyup", function () {
                var me = $(this);
                if (me.val().length > 1) {
                    if (me.val().indexOf("Search...") != -1)
                        me.val(me.val().replace("Search...", ""));
                    contactimporter.autoSuggest(me.val());
                }

            });
        }
        $(".step1").animate({
            opacity: 1.0
        })
        $(".step1-proceed").unbind("click").click(function (event) {
            if ($(this).hasClass("steptwodisable")) {
                modalSI.showErrorMessage(socialinviter.getConfig().servicepanel.content.step1.validation.selectcontact);
            }
            else {
                if (socialinviter.getConfig().servicepanel.showform == false) {
                    if (socialinviter.getConfig().callbacks) {
                        if (socialinviter.getConfig().callbacks.proceed) {
                            socialinviter.getConfig().callbacks.proceed(event, convertName(contactimporter.getService()));
                        }
                    }
                }
                else {
                    contactimporter.showStep2();
                    if (socialinviter.getConfig().callbacks) {
                        if (socialinviter.getConfig().callbacks.proceed) {
                            socialinviter.getConfig().callbacks.proceed(event, convertName(contactimporter.getService()));
                        }
                    }
                    $(".proceed-send").removeClass("steptwodisable");
                }
            }
        });
        $("#chkselall").unbind("change").change(function () {
            if ($(this).prop("checked") == true) {
                contactimporter.selectAllContacts()
            }
            else {
                contactimporter.deSelectAllContacts();
            }
        });
        $(".CI-contact-more").unbind("click").click(function () {
            var me = $(this);
            me.find("img").hide();
            me.find(".more-text").hide();
            var liObj = me.closest(".CI-contact-ul-li-list");
            liObj.removeClass("CI-contacts-def").addClass("CI-contacts-moredet");
            liObj.find(".CI-li-holdr").addClass("CI-li-moredet");
            $(this).closest(".CI-contact-ul-li-list").unbind("mouseenter").unbind("mouseleave").mouseenter(function () {
                var thisObj = $(this).find(".CI-contact-more-details");
                var tgt = thisObj.parent();
                if (thisObj.is(":visible"))
                    tgt.find("img").hide();
                else
                    tgt.find("img").show();
                tgt.find(".more-text").hide();
                if (thisObj.find(".details-CI-panel").length == 0) {
                    var index = tgt.closest(".CI-contact-ul-li-list").attr("contactindex");
                    var data = (contactimporter.getAllContacts().addressbook[index]);
                    contactimporter.loadContactDetails(thisObj, data);
                }
                else
                    thisObj.find(".details-CI-panel").show();

            }).mouseleave(function () {
                var meObj = $(this).find(".CI-contact-more-details");
                meObj.parent().find("img").css({ "margin-left": "0px" }).show();
                meObj.hide();
                var liObj = $(this);
                liObj.removeClass("CI-contacts-moredet").addClass("CI-contacts-def");
                liObj.find(".CI-li-holdr").removeClass("CI-li-moredet");
            }).find(".CI-contact-more-details").show().css({ "border": "2px solid #C5CCDF", "border-top": "none" });
            var tgt = me.parent();
            if (tgt.find(".details-CI-panel").length == 0) {
                var index = tgt.closest(".CI-contact-ul-li-list").attr("contactindex");
                var data = (contactimporter.getAllContacts().addressbook[index]);
                contactimporter.loadContactDetails(tgt.find(".CI-contact-more-details"), data);
            }
            var bdyObj = $(".CI-contact-Panel-body");
            var sTop = bdyObj.scrollTop() + me.closest(".CI-contact-ul-li-list").position().top - bdyObj.height() + 34;
            bdyObj.animate({
                scrollTop: sTop
            });
        }).mouseenter(function () {
            // $(this).find("img").show();
            var thisObj = $(this);
            var tgt = thisObj.parent();
            if (thisObj.find(".details-CI-panel").length == 0) {
                var index = tgt.closest(".CI-contact-ul-li-list").attr("contactindex");
                var data = (contactimporter.getAllContacts().addressbook[index]);
                contactimporter.loadContactDetails(thisObj.find(".details-CI-panel"), data);
                //thisObj.find(".details-CI-panel").hide();
            }
        })
        $(".selectcontact").unbind("change").change(function () {
            if ($(this).prop("checked") == true) {
                contactimporter.selectContact($(this).closest("li").attr("contactindex"));
                if ($(".CI-Contact-count").length > 0)
                    $(".CI-Contact-count").html(contactimporter.getSelectedContacts().addressbook.length + " Selected");
                if (contactimporter.getAllContacts().addressbook.length == contactimporter.getSelectedContacts().addressbook.length)
                    $("#chkselall").prop("checked", true);
                else
                    $("#chkselall").prop("checked", false);
            }
            else {
                contactimporter.deSelectContact($(this).closest("li").attr("contactindex"));
                if ($(".CI-Contact-count").length > 0)
                    $(".CI-Contact-count").html(contactimporter.getSelectedContacts().addressbook.length + " Selected");
                $("#chkselall").prop("checked", false);
            }
        });
        resizeStep1();
        if (socialinviter.getConfig().callbacks) {
            if (socialinviter.getConfig().callbacks.loaded) {
                socialinviter.getConfig().callbacks.loaded(convertName(contactsData.service), contactsData.addressbook);
            }
        }
    }
    var autoSuggest = function (val) {
        var list = contactimporter.getAllContacts().addressbook;
        var len = list.length;
        var pattern = new RegExp(val, "gi");
        var matchedArr = [];
        for (var i = 0; i < len; i++) {
            var name = "";
            if ((list[i].name.first_name != null) && (list[i].name.last_name != null)) {
                try {
                    name = decodeURIComponent(list[i].name.first_name + " " + list[i].name.last_name);
                }
                catch (e) { name = unescape(list[i].name.first_name + " " + list[i].name.last_name); }
                if (name.match(pattern)) {
                    matchedArr.push({ index: i, name: name, nameDetails: { first_name: list[i].name.first_name, last_name: list[i].name.last_name} });
                }

            }
            else if ((list[i].name.first_name != null) && (list[i].name.last_name == null)) {
                try { name = decodeURIComponent(list[i].name.first_name); } catch (e) { name = unescape(list[i].name.first_name); }
                if (name.match(pattern)) {
                    matchedArr.push({ index: i, name: name, nameDetails: { first_name: list[i].name.first_name, last_name: list[i].name.last_name} });
                }
            }
            else if ((list[i].name.first_name == null) && (list[i].name.last_name != null)) {
                try { name = decodeURIComponent(list[i].name.last_name); } catch (e) { name = unescape(list[i].name.last_name); }
                if (name.match(pattern)) {
                    matchedArr.push({ index: i, name: name, nameDetails: { first_name: list[i].name.first_name, last_name: list[i].name.last_name} });
                }
            }
        }
        $("#autosuggestholder").remove();
        var matchlen = matchedArr.length;
        if (matchlen > 0) {
            var suggestDom = "<div id=\"autosuggestholder\"><ul id=\"autosuggestname\">";
            for (var i = 0; i < matchlen; i++) {
                suggestDom += "<li index=\"" + matchedArr[i].index + "\">" + decodeURIComponent(matchedArr[i].name) + "</li>";
            }
            suggestDom += "</ul></div>";
            $("#txtsearchname").closest("div").append(suggestDom);
            $("#autosuggestname").find("li").off("click").on("click", function () {
                var me = $(this);
                $("#txtsearchname").val(me.text());
                $(".highlightmyselect").removeClass("highlightmyselect");
                var pickedCont = $(".CI-contact-ul-li-list[contactindex='" + me.attr("index") + "']");
                pickedCont.addClass("highlightmyselect");
                $("#autosuggestholder").hide();
                var bdyObj = $(".CI-contact-Panel-body");
                var sTop = bdyObj.scrollTop() + pickedCont.position().top - bdyObj.height() + 26;
                bdyObj.animate({
                    scrollTop: sTop
                });
            });
        }
        else {
            if ($("#autosuggestholder").length == 0) {
                $("#txtsearchname").closest("div").append("<div id=\"autosuggestholder\" class=\"autosuggest-nores\">No result found.</div>");
            }
        }
        return matchedArr;
    }
    var resizeStep1 = function () {
        if ($(".CI-list-container-header").is(":visible") == true) {
            $(".modal-SI-CI").find(".modal-SI-holder").height($(".step1").height() + 85);
        }
        else {
            $(".modal-SI-CI").find(".modal-SI-holder").height($(".step1").height() + 65);
        }
        var contLen = contactimporter.getSelectedContacts().addressbook.length;
        if (contLen == 0)
            $(".step1-proceed").addClass("steptwodisable");
        else
            $(".step1-proceed").removeClass("steptwodisable");
    }
    var loadContactDetails = function (dom, data) {
        var domHTML = "<div class=\"details-CI-panel\"><ul>";
        domHTML += "<li>";
        domHTML += "<div class=\"leftpnl\"><i class=\"addr_i_CI CI-i\"></i><span>Address: </span></div>";
        domHTML += "<div class=\"rightpnl\">";
        var addrLen = data.address.length;
        var checklen = 0;
        for (var i = 0; i < addrLen; i++) {
            if ($.trim(decodeURIComponent(data.address[i].formattedaddress)) != "") {
                checklen = 1;
                domHTML += "<div class=\"fl break\">" + decodeURIComponent(data.address[i].formattedaddress) + "</div>";
            }
        }
        if (checklen == 0) {
            domHTML += "<div class=\"fl break na\">Not available</div>";
        }
        domHTML += "</div>";
        domHTML += "</li>";
        domHTML += "<li>";
        domHTML += "<div class=\"leftpnl\"><i class=\"email_i_CI CI-i\"></i><span>Email: </span></div>";
        domHTML += "<div class=\"rightpnl\">";
        var emailLen = data.email.length;
        if (emailLen == 0) {
            domHTML += "<div class=\"fl break na\">Not available</div>";
        }
        else {
            for (var i = 0; i < emailLen; i++) {
                domHTML += "<div class=\"fl break\">" + decodeURIComponent(data.email[i]) + "</div>";
            }
        }
        domHTML += "</div>";
        domHTML += "</li>";
        domHTML += "<li>";
        domHTML += "<div class=\"leftpnl\"><i class=\"phone_i_CI CI-i\"></i><span>Phone: </span></div>";
        domHTML += "<div class=\"rightpnl\">";
        var phoneLen = data.phone.length;
        if (phoneLen == 0) {
            domHTML += "<div class=\"fl break na\">Not available</div>";
        }
        else {
            for (var i = 0; i < phoneLen; i++) {
                domHTML += "<div class=\"fl break\">" + decodeURIComponent(data.phone[i]) + "</div>";
            }
        }
        domHTML += "</div>";
        domHTML += "</li>";
        domHTML += "<li>";
        domHTML += "<div class=\"leftpnl\"><i class=\"birthday_i_CI CI-i\"></i><span>Birthday: </span></div>";
        domHTML += "<div class=\"rightpnl\">";
        var bday = [];
        if ((data.birthday.month != "0") && (data.birthday.month != null))
            bday.push(data.birthday.month);
        if ((data.birthday.day != "0") && (data.birthday.day != null))
            bday.push(data.birthday.day);
        if ((data.birthday.year != "00") && (data.birthday.year != null))
            bday.push(data.birthday.year);
        if (bday.length != 0) {
            domHTML += "<div class=\"fl break\">" + bday.join("-") + "</div>";
        }
        else {
            domHTML += "<div class=\"fl break na\">Not available</div>";
        }
        domHTML += "</div>";
        domHTML += "</li>";
        domHTML += "<li>";
        domHTML += "<div class=\"leftpnl\"><i class=\"website_i_CI CI-i\"></i><span>Website: </span></div>";
        domHTML += "<div class=\"rightpnl\">";
        var websiteLen = data.website.length;
        if (websiteLen == 0) {
            domHTML += "<div class=\"fl break na\">Not available</div>";
        }
        else {
            for (var i = 0; i < websiteLen; i++) {
                domHTML += "<div class=\"fl break\">" + decodeURIComponent(data.website[i]) + "</div>";
            }
        }
        domHTML += "</div>";
        domHTML += "</li>";
        domHTML += "<li>";
        domHTML += "<div class=\"leftpnl\"><i class=\"notes_i_CI CI-i\"></i><span>Notes: </span></div>";
        domHTML += "<div class=\"rightpnl\">";
        if ($.trim(decodeURIComponent(data.notes)) == "") {
            domHTML += "<div class=\"fl break na\">Not available</div>";
        }
        else {
            domHTML += "<div class=\"fl break\">" + decodeURIComponent(data.notes) + "</div>";
        }
        domHTML += "</div>";
        domHTML += "</li>";
        domHTML += "</ul></div>";
        dom.html(domHTML);
    }
    var gmailImageProcessor = function () {
        gmailPicArray = $(".CI-contact-photo");
        gmailwin = window.setInterval(function () {
            for (var i = 0; i < 10; i++) {
                if (gmailPicArray.length > 0) {
                    var tgt = $(gmailPicArray.splice(0, 1));
                    tgt.attr("src", tgt.attr("originalsrc"));
                }
                else {
                    window.clearInterval(gmailwin);
                    break;
                }
            }
        }, 1000);
    }
    var showStep2 = function (stepType) {
        var step2Dom = "";
        if ($(".mailing-step2").length != 0) {
            step2Dom = "";
            var abookContacts = selectedAddressbookData.addressbook;
            if (abookContacts) {
                var len = abookContacts.length;
                for (var i = 0; i < len; i++) {
                    if (abookContacts[i]) {
                        step2Dom += "<li class=\"to-contacts-ul-li\">";
                        step2Dom += "<div class=\"selected-email\" title=\"" + abookContacts[i].email[0] + "\">";
                        var name = ((abookContacts[i].name.first_name != null) ? abookContacts[i].name.first_name : "");
                        name += ((abookContacts[i].name.last_name != null) ? " " + abookContacts[i].name.last_name : "");
                        step2Dom += "<div class=\"text-email\">" + ((name != "") ? name : abookContacts[i].email[0]) + "</div>";
                        step2Dom += "<div class=\"remove-email\" index=\"" + i + "\">X</div>";
                        step2Dom += "</div>";
                        step2Dom += "</li>";
                    }
                }
            }
            $(".mailing-step2").show();
            $(".to-contacts-ul").html(step2Dom);
        }
        else {
            step2Dom = "<div class=\"mailing-wrapper step2 mailing-step2\">";
            step2Dom += "<div class=\"mailing-wrapper-header\">";
            step2Dom += "<div class=\"fl mailing-header-title\">";
            step2Dom += socialinviter.getConfig().servicepanel.content.step2.title;
            step2Dom += "</div>";
            step2Dom += "<div class=\"fr mailing-step-count\">";
            var stpnavig = socialinviter.getConfig().servicepanel.content.navigation.replace("{0}", "2");
            step2Dom += stpnavig.replace("{1}", "2");
            step2Dom += "</div></div>";
            step2Dom += "<div class=\"mailing-row\">";
            var stp2to = socialinviter.getConfig().servicepanel.content.step2.to;
            step2Dom += "<div class=\"mailing-label\">" + stp2to + "</div>";
            step2Dom += "<div class=\"fl\">";

            if (stepType) {
                step2Dom += "<div class=\"to-contacts\">";
                var stp2note = socialinviter.getConfig().servicepanel.content.step2.note;
                step2Dom += "</div><div class=\"CI-email-note\">" + stp2note + "</div>";
            }
            else {
                step2Dom += "<div class=\"to-contacts\">";
                step2Dom += "<ul class=\"to-contacts-ul\">";
                var abookContacts = selectedAddressbookData.addressbook;
                if (abookContacts) {
                    var len = abookContacts.length;
                    for (var i = 0; i < len; i++) {
                        if (abookContacts[i]) {
                            step2Dom += "<li class=\"to-contacts-ul-li\">";
                            step2Dom += "<div class=\"selected-email\" title=\"" + abookContacts[i].email[0] + "\">";
                            var name = ((abookContacts[i].name.first_name != null) ? abookContacts[i].name.first_name : "");
                            name += ((abookContacts[i].name.last_name != null) ? " " + abookContacts[i].name.last_name : "");
                            step2Dom += "<div class=\"text-email\">" + ((name != "") ? name : abookContacts[i].email[0]) + "</div>";
                            step2Dom += "<div class=\"remove-email\" index=\"" + i + "\">X</div>";
                            step2Dom += "</div>";
                            step2Dom += "</li>";
                        }
                    }
                }
                step2Dom += "</ul></div>";
            }
            var stp2validto = socialinviter.getConfig().servicepanel.content.step2.validation.to;
            step2Dom += "<div class=\"error-form toaddresserror\">" + stp2validto + "</div>";
            step2Dom += "</div></div><div class=\"mailing-row\">";
            var stp2subject = socialinviter.getConfig().servicepanel.content.step2.subject;
            step2Dom += "<div class=\"mailing-label\">" + stp2subject + "</div>";
            step2Dom += "<div class=\"fl\">";
            var pluginsub = "", pluginmsg = "";
            if (toString.call(socialinviter.getConfig().servicepanel.subject) == "[object String]") {
                pluginsub = decodeURIComponent(socialinviter.getConfig().servicepanel.subject);
            }
            else if (toString.call(socialinviter.getConfig().servicepanel.subject) == "[object Object]") {
                if (socialinviter.getConfig().servicepanel.subject[contactimporter.getService()])
                    pluginsub = socialinviter.getConfig().servicepanel.subject[contactimporter.getService()];
            }
            if (toString.call(socialinviter.getConfig().servicepanel.message) == "[object String]") {
                pluginmsg = decodeURIComponent(socialinviter.getConfig().servicepanel.message);
            }
            else if (toString.call(socialinviter.getConfig().servicepanel.message) == "[object Object]") {
                if (socialinviter.getConfig().servicepanel.message[contactimporter.getService()])
                    pluginmsg = socialinviter.getConfig().servicepanel.message[contactimporter.getService()];
            }
            step2Dom += "<input type=\"text\" class=\"mailing-subject txtbx\" value=\"" + pluginsub + "\">";
            var stp2validsubject = socialinviter.getConfig().servicepanel.content.step2.validation.subject;
            step2Dom += "<div class=\"error-form subjecterror\">" + stp2validsubject + "</div>";
            step2Dom += "</div></div><div class=\"mailing-row\">";
            var stp2message = socialinviter.getConfig().servicepanel.content.step2.message;
            step2Dom += "<div class=\"mailing-label\">" + stp2message + "</div>";
            step2Dom += "<div class=\"fl\">";
            step2Dom += "<textarea class=\"mailing-message txtarea\">" + pluginmsg + "</textarea>";
            var stp2validmessage = socialinviter.getConfig().servicepanel.content.step2.validation.message;
            step2Dom += "<div class=\"error-form messageerror\">" + stp2validmessage + "</div>";
            step2Dom += "</div></div>";
            step2Dom += "<div class=\"mailing-footer-holder\" >";
            step2Dom += "<div class=\"mailing-footer\" style=\"border:\">";
            step2Dom += "<div class=\"fl mailing-footer-back\" >";
            var stp2back = socialinviter.getConfig().servicepanel.content.step2.button.back;
            var stp2send = socialinviter.getConfig().servicepanel.content.step2.button.send;
            step2Dom += "<div class=\"CI-list-container-back step2-back\">" + stp2back + "</div></div>";
            step2Dom += "<div class=\"fr\" >";
            step2Dom += "<div class=\"CI-list-container-proceed proceed-send\">" + stp2send + "</div>";
            step2Dom += "</div></div></div></div>";
            if ($(".step2").length == 0) {
                $(".modal-SI-CI").find(".modal-SI-body").append(step2Dom);
                if ($(".modal-SI-CI").find(".modal-SI-body").find(".modal-message-holder").length == 0) {
                    $(".modal-SI-CI").find(".modal-SI-body").prepend("<div class='modal-message-holder'><div class='modal-message'></div></div>"); ;
                }
            }
            else {
                $(".modal-SI-CI").find(".modal-SI-body").html(step2Dom).prepend("<div class='modal-message-holder'><div class='modal-message'></div></div>");
            }
            $(".mailing-subject").keyup(function () {
                if ($.trim($(this).val()) == "") {
                    $(".subjecterror").show();
                }
                else
                    $(".subjecterror").hide();

                if (contactimporter.getRecipients().length > 0 && $.trim($(".mailing-subject").val()) != "" && $.trim($(".mailing-message").val()) != "") {
                    $(".proceed-send").removeClass("steptwodisable");
                }
                else
                    $(".proceed-send").addClass("steptwodisable");
                $(".modal-SI-CI").find(".modal-SI-holder").height($(".step2").height() + 70);
            });
            $(".mailing-message").keyup(function () {
                if ($.trim($(this).val()) == "") {
                    $(".messageerror").show();
                }
                else
                    $(".messageerror").hide();

                if (contactimporter.getRecipients().length > 0 && $.trim($(".mailing-subject").val()) != "" && $.trim($(".mailing-message").val()) != "") {
                    $(".proceed-send").removeClass("steptwodisable");
                }
                else
                    $(".proceed-send").addClass("steptwodisable");
                $(".modal-SI-CI").find(".modal-SI-holder").height($(".step2").height() + 70);
            });
        }

        $(".proceed-send").unbind("click").click(function (event) {
            var flgfrm = 0;
            $("#txtrecipients").val($("#txtrecipients").val() + ";");
            addEmail($("#txtrecipients"));
            if (contactimporter.getRecipients().length == 0) {
                flgfrm = 1;
                $(".toaddresserror").show();
            }
            else
                $(".toaddresserror").hide();
            if ($.trim($(".mailing-subject").val()) == "") {
                flgfrm = 1;
                $(".subjecterror").show();
            }
            else
                $(".subjecterror").hide();
            if ($.trim($(".mailing-message").val()) == "") {
                flgfrm = 1;
                $(".messageerror").show();
            }
            else
                $(".messageerror").hide();
            $(".modal-SI-CI").find(".modal-SI-holder").height($(".step2").height() + 70);
            if (flgfrm == 0) {
                sendemail(event);
            }
        });
        $(".step1").hide();
        $(".step2-back").unbind("click").click(function (event) {
            $(".step2").hide();
            $(".step1").show();
            resizeStep1();
            if (socialinviter.getConfig().callbacks) {
                if (socialinviter.getConfig().callbacks.back) {
                    socialinviter.getConfig().callbacks.back(event, convertName(contactimporter.getService()));
                }
            }
        });
        if ($(".mailing-wrapper-header").is(":visible") == true) {
            $(".modal-SI-CI").find(".modal-SI-holder").height($(".step2").height() + 80);
        }
        else {
            $(".modal-SI-CI").find(".modal-SI-holder").height($(".step2").height() + 65);
        }
        removeContact();
        if ($("#txtrecipients").length == 0) {
            $(".to-contacts").append("<input type='text' id='txtrecipients' onkeydown='javascript:return contactimporter.watchkeystroke(event)'/>");
        }
        $("#txtrecipients").keyup(function () {
            addEmail($(this));
        }).focusout(function () {
            if (validateEmail($("#txtrecipients").val())) {
                $("#txtrecipients").val($("#txtrecipients").val() + ";");
                addEmail($(this));
            }
        });
        if ($(".remove-email[index*='-']").length == 0) {
            $("#txtrecipients").val(addedrecipient.join(";"));
            addEmail($("#txtrecipients"));
        }
        $("#txtrecipients").focus();
    }
    var getRecipients = function () {
        var reciplen = addedrecipient.length;
        var retary = contactimporter.getSelectedContacts().addressbook;
        for (var i = 0; i < reciplen; i++) {
            if (addedrecipient[i])
                retary.push(addedrecipient[i]);
        }
        return retary;
    }
    var validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    var watchkeystroke = function (e) {
        var code;
        if (!e) var e = window.event;
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        if (code == 8) {
            var remstatus = removeLastEmail();
            if (contactimporter.getRecipients().length == 0) {
                $(".toaddresserror").show();
            }
            else
                $(".toaddresserror").hide();

            if (contactimporter.getRecipients().length > 0 && $.trim($(".mailing-subject").val()) != "" && $.trim($(".mailing-message").val()) != "") {
                $(".proceed-send").removeClass("steptwodisable");
            }
            else
                $(".proceed-send").addClass("steptwodisable");
            $(".modal-SI-CI").find(".modal-SI-holder").height($(".step2").height() + 70);
            return remstatus;
        }
        else if (code == 13) {

            var tgt = $("#txtrecipients");
            if (validateEmail(tgt.val())) {
                tgt.val(tgt.val() + ";");
                addEmail(tgt);
            }
            return false;
        }
    }
    var addEmail = function (me) {
        var val = me.val();
        if (val != "") {
            if ((val.indexOf(";") != -1) || (val.indexOf(",") != -1)) {
                var recipArry = [];
                if (val.indexOf(";") != -1)
                    recipArry = val.split(";");
                if (val.indexOf(",") != -1)
                    recipArry = val.split(",");
                var len = recipArry.length;
                for (var i = 0; i < len; i++) {
                    var recipval = recipArry[i];
                    if (validateEmail(recipval)) {
                        var tgt = $(".to-contacts");
                        if (tgt.find(".to-contacts-ul").length == 0) {
                            var appendtext = '<ul class="to-contacts-ul">';
                            appendtext += '<li class="to-contacts-ul-li"><div class="selected-email" title="' + recipval + '"><div class="text-email">' + recipval + '</div><div class="remove-email" index="-' + addedrecipient.length + '">X</div></div></li>';
                            appendtext += '</ul>';
                            $(".to-contacts").prepend(appendtext);
                            addedrecipient.push(recipval);
                        }
                        else {
                            //var index = $(".to-contacts-ul").find(".to-contacts-ul-li").length + 1;
                            var index = addedrecipient.length;
                            var appendtext = '<li class="to-contacts-ul-li"><div class="selected-email" title="' + recipval + '"><div class="text-email">' + recipval + '</div><div class="remove-email" index="-' + index + '">X</div></div></li>';
                            $(".to-contacts-ul").append(appendtext);
                            addedrecipient.push(recipval);
                        }
                        if ($(".mailing-wrapper-header").is(":visible") == true) {
                            $(".modal-SI-CI").find(".modal-SI-holder").height($(".step2").height() + 80);
                        }
                        else {
                            $(".modal-SI-CI").find(".modal-SI-holder").height($(".step2").height() + 65);
                        }
                        $(".to-contacts").scrollTop($(".to-contacts").height());
                    }
                }
                me.val("");
            }

        }
        if (contactimporter.getRecipients().length == 0) {
            $(".toaddresserror").show();
        }
        else
            $(".toaddresserror").hide();

        if (contactimporter.getRecipients().length > 0 && $.trim($(".mailing-subject").val()) != "" && $.trim($(".mailing-message").val()) != "") {
            $(".proceed-send").removeClass("steptwodisable");
        }
        else
            $(".proceed-send").addClass("steptwodisable");
        $(".modal-SI-CI").find(".modal-SI-holder").height($(".step2").height() + 70);
        removeContact();
    }
    var removeLastEmail = function () {
        if ($("#txtrecipients").val() == "") {
            var index = $(".to-contacts-ul").find(".to-contacts-ul-li").length;
            if (index != 0) {
                index--;
                var tgt = $(".to-contacts-ul").find(".to-contacts-ul-li").eq(index);
                var remEm = tgt.find(".remove-email");
                if (remEm.attr("index").indexOf("-") == -1)
                    remEm.click();
                else {
                    addedrecipient[remEm.attr("index").replace("-", "")] = undefined;
                    tgt.remove();
                }
                return false;
            }
            else
                return true;
        }
        else
            return true;
    }
    var removeContact = function () {
        $(".remove-email").unbind("click").click(function () {
            var tgtindx = $(this).attr("index");
            if (tgtindx.indexOf("-") == -1) {
                var index = parseInt($(this).attr("index"));
                selectedAddressbookData.addressbook[index] = undefined;
                $(".CI-contact-ul-li-list").eq(index).find("input").prop("checked", false);
                $("#chkselall").prop("checked", false);
                $(this).closest("li").remove();
                var contLen = contactimporter.getSelectedContacts().addressbook.length;
                if (contLen == 0)
                    $(".proceed-send").addClass("steptwodisable");
                else
                    $(".proceed-send").removeClass("steptwodisable");
                $(".CI-Contact-count").html(contLen + " Selected");
            }
            else {
                addedrecipient[tgtindx.replace("-", "")] = undefined;
                $(this).closest(".to-contacts-ul-li").remove();
            }
            if (contactimporter.getRecipients().length == 0) {
                $(".toaddresserror").show();
            }
            else
                $(".toaddresserror").hide();

            if (contactimporter.getRecipients().length > 0 && $.trim($(".mailing-subject").val()) != "" && $.trim($(".mailing-message").val()) != "") {
                $(".proceed-send").removeClass("steptwodisable");
            }
            else
                $(".proceed-send").addClass("steptwodisable");
            $(".modal-SI-CI").find(".modal-SI-holder").height($(".step2").height() + 70);
        });
    }
    var sendemail = function (event) {
        if (socialinviter.getConfig().callbacks) {
            if (socialinviter.getConfig().callbacks.send) {
                socialinviter.getConfig().callbacks.send(event, convertName(contactimporter.getService()), contactimporter.getRecipients());
            }
        }
    }
    var closeimporter = function () {
        modalSI.hide();
    }
    return {
        init: initialize,
        getFromStore: getFromStore,
        authCallback: authCallback,
        accessCallback: accessCallback,
        contactsCallback: contactsCallback,
        updateUser: updateUser,
        close: closeimporter,
        uploadCallback: uploadCallback,
        startgrabbing: startgrabbing,
        getAllContacts: getAllContacts,
        getSelectedContacts: getSelectedContacts,
        selectContact: selectContact,
        deSelectContact: deSelectContact,
        deSelectAllContacts: deSelectAllContacts,
        selectAllContacts: selectAllContacts,
        showStep1: showStep1,
        showStep2: showStep2,
        auth: auth,
        processLock: processLock,
        getService: getService,
        setPopupError: setPopupError,
        submitUploading: submitUploading,
        loadContactDetails: loadContactDetails,
        autoSuggest: autoSuggest,
        watchkeystroke: watchkeystroke,
        getRecipients: getRecipients
    }
})();
window.onload = new function () {
    if (window.location.href.indexOf("/oauth.html") != -1) {
        contactimporter.init();
        modalSI.init();
        $(".modal-SI-CI-BG,.modal-SI-CI").hide();
    }
}
var sendSelectedContacts = function (service, service, recipients) {
}
var storeImportedContacts = function (service, data) {
}
var loadWidget = function(){
    $(document).ready(function(){
        if (window.location.href.indexOf("/oauth.html") == -1){
           socialinviter.load({
               target:"socialinviter-CI",
               showmodal:true,
               showform:true,
               showmore:false,
               callbacks: { 
                   "loaded": function (service, data) {
                       storeImportedContacts(service, data);
                   },
                   "send": function (service, recipients) {
                       sendSelectedContacts(service, recipients);
                   }
               },
               subject:"Lets spread the word!",
               message:"Your custom message goes here...",
               type:"full",
               alignment:"horizontal",
               position:{
                   right:"",
                   left:"wall",
                   top:"200px"
               }
           });
        }
   });
};
loadWidget();
