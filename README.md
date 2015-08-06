# Contact Importer - SocialInviter
Import contacts from Gmail, Yahoo, windows live, outlook, thunderbird and more. The script imports contacts details such as name, emails, addresses, phone numbers, notes, birthday and websites. Completely painless and easy to integrate in your website.

For more info: http://socialinviter.com/#!/contactimporter

Documentation: http://socialinviter.com/#!/cidoc

Interactive console: http://socialinviter.com/#!/console

```
$(document).ready(function () {
    socialinviter.load({
        "target": "socialinviter-CI",
        "callbacks": {
            "loaded": function (service, data) {
                console.log(service, data);
            },
            "send": function (event,selected) {
                console.log(event, selected);
            }
        },
    });
});
```
#Trial key:
Get trial license key from here (http://socialinviter.com/#!/trial)
#Settings:

To make use of the below configuration, please replace the configuration at the end of contactimporter.js with below
```
$(document).ready(function () {
    socialinviter.load({
        "target": "socialinviter-CI",
        "callbacks": {
            "loaded": function (service, data) {
                console.log(service, data);
            },
            "send": function (event,selected) {
                console.log(event, selected);
            }
        },
    });
});
```

If you want to set the "click" event of Contact Importer to your custom icons, please use as below:
```
<img src="your icon url here" onclick="contactimporter.auth('gmail','contactimporter','icon')" >
```

Example for each service
```
For Gmail:
    contactimporter.auth('gmail','contactimporter','icon')
For Yahoo:
    contactimporter.auth('yahoo','contactimporter','icon')
For Windows live:
    contactimporter.auth('hotmail','contactimporter','icon')
For Outlook:
    contactimporter.auth('outlook','contactimporter','icon')
For Email:
    contactimporter.auth('email','contactimporter','icon')
```

To close the contacts importer plugin
```
//Close contacts importer plugin
contactimporter.close();
```
To get all selected sevice, use below
```
//To get the selected service
contactimporter.getService();
```

To get all imported contacts, use below
```
//To get the addressbook object
contactimporter.getAllContacts();
//TO get array of contacts
contactimporter.getAllContacts().addressbook;
```

To get all receipients, use below
```
//To get all receipients including the user entered email address
contactimporter.getRecipients();
```

To get all selected contacts, use below
```
//To get all selected contacts(this will not contain the user entered email address)
contactimporter.getSelectedContacts();
```

To customize the content
```
//{0} and {1} are placeholders
socialinviter.load({
    "target": "socialinviter-CI",
    "content": {
        "step1": {
            "title": "Connect with people you know on {0}.",
            "description": "We found {0} people from your address book.",
            "selected": "{0} Selected",
            "selectall": "Select all",
            "validation": {
                "selectcontact": "Please select a contact to proceed"
            },
            "button": {
                "refresh": "Refresh",
                "proceed": "Proceed"
            }
        },
        "step2": {
            "title": "Sendinvitation/messagetoyourfriends",
            "note": "Note: Seperate emails by semicolon(';')",
            "to": "To",
            "subject": "Subject",
            "message": "Message",
            "validation": {
                "to": "Enter to address",
                "subject": "Enter subject",
                "message": "Enter message"
            },
            "button": {
                "back": "Back",
                "send": "Send"
            }
        },
        "navigation": "Step {0} of {1}",
        "outlook": {
            "label": "Please select a CSV file",
            "supported": "Supported CSV files from:",
            "link": {
                "back": "Back",
                "backtolist": "Back to list"
            },
            "validation": {
                "selectfile": "Please select a CSV file.",
                "wrongupload": "Please upload a file of type *.CSV"
            },
            "button": {
                "upload": "Upload"
            }
        }
    }
});
```
