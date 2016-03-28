# Contact Importer - SocialInviter
Import contacts from Gmail, Yahoo, outlook, mail.ru, mailchimp, eventbrite and CSV. The script imports contacts details such as name, emails, addresses, phone numbers, notes, birthday and websites. Completely painless and easy to integrate in your website.

For more info: https://socialinviter.com/contactimporter.html

Documentation: https://socialinviter.com/inviter.aspx#!/ciplugindoc

Trial license: https://socialinviter.com/inviter.aspx#!/trial

Download code for ASP.net, PHP and JAVA: https://socialinviter.com/download.aspx

#Settings:

```
    <div class="socialinviter" type="contactimporter"></div>
```

To initialize the plugin

```
    var licenses = "Your license key here"; //replace your license key
    var SIConfiguration = {
        "path": {
            "authpage": "http://localhost:8080/oauth.html" //replace the web url of oauth.html
        }
    }
    var fileref=document.createElement("script");fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("id","apiscript");fileref.setAttribute("src","//socialinviter.com/all.js?keys="+licenses);
    try{document.body.appendChild(fileref)}catch(a){document.getElementsByTagName("head")[0].appendChild(fileref);}
    var loadInitFlg=0,socialinviter,loadConf=function(){window.setTimeout(function(){$(document).ready(function(){loadInitFlg++;
    socialinviter?socialinviter.load(SIConfiguration):15>loadInitFlg&&window.setTimeout(loadConf,200)})},
    250)};window.setTimeout(loadConf,200);
```





