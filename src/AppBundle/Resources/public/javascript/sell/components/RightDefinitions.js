export const RightDefinitions = [
    {
        name: "Right to sublicense",
        key: "SUBLICENSE",
        superRights: [],
        options : [
            "SUBLICENSE_YES",
            "SUBLICENSE_YES_APPROVAL",
            "SUBLICENSE_NO"
        ],
        showTextArea:"ALL",
        multiple : false,
        description: 'Means the licensee\'s right to sublicense the program to a third party.'
    },
    {
        name : "Transmission Obligation",
        key: "BROADCASTING",
        superRights: [],
        options : [
            "BROADCASTING_NO",
            "BROADCASTING_YES"
        ],
        showTextArea:"ALL",
        textAreaRequired:"BROADCASTING_YES",
        multiple : false,
        description: 'Means the licensee\'s obligation to transmit the program.'
    },
    {
        name : "Transmission means",
        key: "TRANSMISSION_MEANS",
        superRights: [],
        options : [
            "TRANSMISSION_MEANS_ALL",
            "TRANSMISSION_MEANS_CABLE",
            "TRANSMISSION_MEANS_SATELLITE",
            "TRANSMISSION_MEANS_DIGITAL",
            "TRANSMISSION_MEANS_OTT",
            "TRANSMISSION_MEANS_INTERNET",
            "TRANSMISSION_MEANS_MOBILE"
        ],
        showTextArea:"ALL",
        multiple : true,
        description: 'Means the technical means on which the licensee may transmit the program to the end-user.'
    },
    {
        name: "Transmission Form",
        key : "EXPLOITATION_FORM",
        superRights : [],
        options: [
            "EXPLOITATION_FORM_ALL",
            "EXPLOITATION_FORM_FREE",
            "EXPLOITATION_FORM_PAY",
            /*"EXPLOITATION_FORM_IN-SHIP",*/
            "EXPLOITATION_FORM_CLOSED"
        ],
        showTextArea:"ALL",
        multiple: true,
        description: 'Means the commercial form by means of which the licensee may transmit the program to the end-user.'
    },
    {
        name : "Licensed languages",
        key : "LICENSED_LANGUAGES",
        superRights : [],
        options : [],
        showTextArea:"ALL",
        global : true,
        language : true,
        description: 'Means the language in which the licensee my exploit the granted rights.'
    },
    {
        name : "Number of runs",
        key: "RUNS",
        superRights: ["CL","NA","PR", "DT", "HL"],
        options : [
            "RUNS_UNLIMITED",
            "RUNS_LIMITED",
        ],
        showTextArea:"ALL",
        multiple : false,
        description: 'Means the number of Transmission of the Program.'
    },
    {
        name : "Exploitation window",
        key: "EXPLOITATION_WINDOW",
        superRights: ["CL","NA","PR", "DT", "HL"],
        options : [
            "EXPLOITATION_WINDOW_UNLIMITED",
            "EXPLOITATION_WINDOW_LIMITED",
        ],
        showTextArea:"ALL",
        textAreaRequired:"EXPLOITATION_WINDOW_LIMITED",
        multiple : false,
        description: 'Means the specific time frame within the license period in which the licensee may exploit a specific right.',
    },
    {
        name : "Reserved rights",
        key: "RESERVED_RIGHTS",
        superRights: [],
        options : [
            "RESERVED_RIGHTS_NO",
            "RESERVED_RIGHTS_YES",
        ],
        multiple : false,
        description: 'Means the audio-visual rights to the program that you, or your sublicensee, may exploit irrespective of any exclusivity granted.',
        showTextArea:"ALL",
        textAreaRequired:"RESERVED_RIGHTS_YES",
    },
];