// ==UserScript==

// ----------------------------------- MetaData --------------------------------------

// @name        quiCKIETakeout
// @author      WirlyWirly + enhancer + malefis + contributors 🫶
// @version     1.0.1
// @description A quiCKIE way to send torrents from various trackers to qui!
//              To be used with a running instance of qui: https://getqui.com/. Also works with takeout, which shows OPS torrents inside of RED
//              Written on LibreWolf via Violentmonkey

// @icon        https://gist.github.com/user-attachments/assets/b3d2b863-6aaf-48ab-a4d5-28d0c5df3bae
// @namespace   https://github.com/WirlyWirly
// @run-at      document-end

// @resource    configMenuCSS https://gist.github.com/WirlyWirly/1ffd87e5a3d3f7ce206860d8c100df88/raw/quiCKIEConfigMenu.css
// @require     https://cdn.jsdelivr.net/gh/sizzlemctwizzle/GM_config@43fd0fe4de1166f343883511e53546e87840aeaf/gm_config.js

// ----------------------------------- Permissions --------------------------------------

// @grant   GM_getResourceText
// @grant   GM_getValue
// @grant   GM_listValues
// @grant   GM_registerMenuCommand
// @grant   GM_setValue
// @grant   GM_xmlhttpRequest
// @connect cyclingarchive.club
// @connect orpheus.network

// ----------------------------------- Matches --------------------------------------

// How to add new trackers: https://gist.github.com/WirlyWirly/1ffd87e5a3d3f7ce206860d8c100df88?permalink_comment_id=5974494#gistcomment-5974494

// @match   https://animebytes.tv/artist.php?id=*
// @match   https://animebytes.tv/collage.php?id=*
// @match   https://animebytes.tv/company.php?id=*
// @match   https://animebytes.tv/series.php?id=*
// @match   https://animebytes.tv/torrents*

// @match   https://bibliotik.me/collections/*
// @match   https://bibliotik.me/torrents/*

// @match   https://broadcasthe.net/collages.php?id=*
// @match   https://broadcasthe.net/series.php?id=*
// @match   https://broadcasthe.net/torrents.php*
//
// @match   https://www.deepbassnine.com/artist.php?id=*
// @match   https://www.deepbassnine.com/collages.php?id=*
// @match   https://www.deepbassnine.com/torrents.php*
//
// @match   https://www.empornium.sx/collage/*
// @match   https://www.empornium.sx/top10.php*
// @match   https://www.empornium.sx/torrents.php*
// @match   https://www.empornium.sx/user.php?id=*
//
// @match   https://gazellegames.net/collections.php?id=*
// @match   https://gazellegames.net/torrents.php*

// @match   https://www.happyfappy.org/collage/*
// @match   https://www.happyfappy.org/top10.php*
// @match   https://www.happyfappy.org/torrents.php*
// @match   https://www.happyfappy.org/user.php?id=*

// @match   https://hdbits.org/browse.php*
// @match   https://hdbits.org/details.php?id=*
// @match   https://hdbits.org/film/info?id=*

// @match   https://jpopsuki.eu/artist.php?id=*
// @match   https://jpopsuki.eu/collages.php?id=*
// @match   https://jpopsuki.eu/top10.php*
// @match   https://jpopsuki.eu/torrents.php*

// @match   https://www.myanonamouse.net/
// @match   https://www.myanonamouse.net/t/*
// @match   https://www.myanonamouse.net/tor/browse.php*

// @match   https://nyaa.si/*
// @match   https://nyaa.si/view/*
// @match   https://sukebei.nyaa.si/*
// @match   https://sukebei.nyaa.si/view/*

// @match   https://orpheus.network/artist.php?id=*
// @match   https://orpheus.network/collages.php?id=*
// @match   https://orpheus.network/top10.php*
// @match   https://orpheus.network/torrents.php*

// @match   https://passthepopcorn.me/torrents.php?id=*

// @match   https://redacted.sh/artist.php?id=*
// @match   https://redacted.sh/collages.php?id=*
// @match   https://redacted.sh/top10.php*
// @match   https://redacted.sh/torrents.php*

// @match   https://secret-cinema.pw/artist.php?id=*
// @match   https://secret-cinema.pw/collages.php?id=*
// @match   https://secret-cinema.pw/top10.php*
// @match   https://secret-cinema.pw/torrents.php*

// @match   https://anthelion.me/torrents.php*
// @match   https://anthelion.me/collages.php*


// @match   https://nebulance.io/torrents.php*
// @match   https://nebulance.io/top10.php*
// @match   https://nebulance.io/bookmarks.php*

// @match   https://lst.gg/torrents*

// @match   https://fearnopeer.com/torrents*

// @match   https://seedpool.org/torrents*

// @match   https://www.nordicq.org/torrents*

// @match   https://cyclingarchive.club/details.php?id=*




// ----------------------------------- Script Links --------------------------------------
//
// @homepage    https://gist.github.com/WirlyWirly/1ffd87e5a3d3f7ce206860d8c100df88
// @downloadURL https://update.greasyfork.org/scripts/565309/qui%20-%20quiCKIE.user.js
// @updateURL https://update.greasyfork.org/scripts/565309/qui%20-%20quiCKIE.meta.js
// ==/UserScript==


// =================================== TRACKER LABELS ======================================

// @trackerSettingsPanelEntries
const settingsPanelEntries = {
    // Each entry below uses the tracker's unique domain (lowercase) as the property, followed by the row label (TitleCase) as the value.
    // Keep the list alphabetical, as these entries will be used to generate a row for each tracker in the settings panel.
    // Example: https://broadcasthe.net/ --> broadcasthe
    // Example: https://www.myanonamouse.net/ --> myanonamouse 

    'animebytes': 'AnimeBytes',
    'bibliotik': 'Biblitok',
    'broadcasthe': 'BroadcasTheNet',
    'deepbassnine': 'DeepBassNine', // @tartuffe
    'empornium': 'Empornium',
    'gazellegames': 'GazelleGames',
    'happyfappy': 'HappyFappy', // @Tamlar
    'hdbits': 'HDBits',
    'jpopsuki': 'JpopSuki', // @tartuffe
    'myanonamouse': 'MyAnonaMouse',
    'nyaa': 'Nyaa',
    'orpheus': 'Orpheus',
    'passthepopcorn': 'PassThePopcorn',
    'redacted': 'Redacted',
    'secret-cinema': 'SecretCinema', // @tartuffe
    'anthelion': 'Anthelion',
    'nebulance': 'Nebulance',
    'lst': 'LST',
    'fearnopeer': 'FearNoPeer',
    'seedpool': 'Seedpool',
    'nordicq': 'NordicQ',
    'cyclingarchive': 'CyclingArchive',
}

// =================================== CONFIG MENU ======================================

// @trackerFieldGeneration
let gmConfigTrackerFields = {}
let trackerDomains = Object.keys(settingsPanelEntries)
for ( let trackerDomain of trackerDomains ) {
    // For each trackerDomain (property) of the settingsPanelEntries object, generate the fields that will be used by GM_config() to save\load settings. 
    // Each tracker MUST have the fields displayed in the settings panel; Category (+ row label), SavePath, Tags, RatioLimit, Paused, Piece

    // --- GM_config() Fields ---
    let generatedTrackerFields = {
        [`${trackerDomain}-category`]: {
            'label': settingsPanelEntries[trackerDomain],
            'type': 'text'
        },
        [`${trackerDomain}-savePath`]: {
            'type': 'text'
        },
        [`${trackerDomain}-tags`]: {
            'type': 'text'
        },
        [`${trackerDomain}-ratioLimit`]: {
            'type': 'text'
        },
        [`${trackerDomain}-startPaused`]: {
            'type': 'checkbox',
            'default': false
        },
        [`${trackerDomain}-seqPieces`]: {
            'type': 'checkbox',
            'default': false
        }
    }

    gmConfigTrackerFields = {...gmConfigTrackerFields, ...generatedTrackerFields}

}

// The element the settings menu will be appended to, so that it's not a floating iFrame and can be inspected.
let configFrame = document.createElement('div')
document.body.appendChild(configFrame)

let reloadWindow = false
GM_config.init({
    // The quiCKIE settings menu, which can then be displayed by calling 'GM_config.open()'
    'id': 'quiCKIE_config',
    'frame': configFrame,
    'title': `
        <div>
            <div style="padding: 30px 0 0 0"></div>
            🐰
            <span style="user-select: none; font-family: 'Bebas Neue', Helvetica, Tahoma, Geneva, sans-serif; background: none; background-color: #FFFFFF; -webkit-background-clip: text; -webkit-text-fill-color: transparent; -webkit-filter: brightness(110%); filter: brightness(110%); text-shadow: 0 0 20px rgba(0, 124, 255, 0.60); transition: all 0.3s; font-weight: bold;"><a href="${GM_info.script.homepage}" target="_blank" style="text-decoration: none; background: none; line-height: 30px">quiCKIE</a></span>
            🐰
            <div style="margin-top: 10px"><span style="color: #b7b7b7; display: block; font-size: 10pt">Hover over column headers for details</span></div>
        </div>
    `,

    'fields': {...gmConfigTrackerFields, ...{

        'quiURL': {
            'label': '🔗 quiURL:',
            'type': 'text',
        },
        'quiApiKey': {
            'label': '🔑 ApiKey:',
            'type': 'text',
        },
    }},
    'events': {
        'open': function (doc) {
            
            let panelStyle = this.frame.style
            panelStyle.backdropFilter = 'blur(9px)'
            panelStyle.background = '#191d2aa3'
            panelStyle.border = '1px solid #2C3E50'
            panelStyle.borderRadius = '10px'
            panelStyle.boxShadow = '0px 0px 15px #2C3E50'
            panelStyle.color = '#ffffff'
            panelStyle.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
            panelStyle.height = 'auto'
            panelStyle.inset = '50% auto auto 50%'
            panelStyle.lineHeight = '20px'
            panelStyle.margin = '0'
            panelStyle.maxHeight = '90%'
            panelStyle.padding = '0px 0px'
            panelStyle.position = 'fixed'
            panelStyle.transform = 'translate(-50%,-50%)'
            panelStyle.width = '900px'

            // Placeholders for the text-input fields
            document.getElementById('quiCKIE_config_field_quiURL').placeholder = 'http://localhost:7476/qui/instances/1'
            document.getElementById('quiCKIE_config_field_quiApiKey').placeholder = 'abc123'

            document.getElementById('quiCKIE_config_field_bibliotik-savePath').placeholder = '/downloads/Bibliotik/'
            document.getElementById('quiCKIE_config_field_gazellegames-category').placeholder = 'GazelleGames'
            document.getElementById('quiCKIE_config_field_orpheus-tags').placeholder = 'music,private'
            document.getElementById('quiCKIE_config_field_happyfappy-ratioLimit').placeholder = '1.25'

            reloadWindow = false

            let table = document.createElement('table')
            table.id = 'quiCKIE_config_table'

            let tcolg = document.createElement('colgroup')
            tcolg.id = 'quiCKIE_config_table_colg'

            let thead = document.createElement('thead')
            thead.id = 'quiCKIE_config_table_thead'

            let tbody = document.createElement('tbody')
            tbody.id = 'quiCKIE_config_table_tbody'

            table.appendChild(tcolg)
            table.appendChild(thead)
            table.appendChild(tbody)


            document.getElementById('quiCKIE_config_header').insertAdjacentElement('afterend', table)

            let headersRow = document.createElement('tr')
            for (let columnHeader of ['Tracker', 'Category', 'SavePath', 'Tags', 'Ratio', 'Paused', 'SeqPieces']) {
                let columnGroupElement = document.createElement('col')
                columnGroupElement.id = `quiCKIE_config_table_colg_col_${columnHeader.toLowerCase()}`
                columnGroupElement.classList.add(`quiCKIE_config_table_colg_col`)
                columnGroupElement.span = 1
                tcolg.appendChild(columnGroupElement)

                let headerElement = document.createElement('th')
                headerElement.innerHTML = columnHeader
                headerElement.id = `quiCKIE_config_table_thead_th_${columnHeader.toLowerCase()}`
                headerElement.classList.add('quiCKIE_config_table_thead_th')
                headersRow.appendChild(headerElement)
            }

            thead.appendChild(headersRow)

            document.getElementById('quiCKIE_config_table_thead_th_tracker').setAttribute('title', 'Tracker\n\nThe tracker (site) for which these fields will be applied to')
            document.getElementById('quiCKIE_config_table_thead_th_category').setAttribute('title', 'Category\n\nSpecify the category to apply to these these torrents')
            document.getElementById('quiCKIE_config_table_thead_th_savepath').setAttribute('title', 'Save Path\n\nSpecify the full-path for where to save these torrents\n\n* The path must be accessible and writable by the torrent client itself')
            document.getElementById('quiCKIE_config_table_thead_th_tags').setAttribute('title', 'Tags\n\nA comma seperated list of tags to apply to these torrents\n\nFilms, Private Tracker, Videos')
            document.getElementById('quiCKIE_config_table_thead_th_ratio').setAttribute('title', 'Ratio Limit\n\nStop the torrents when they have seeded to the specified ratio limit')
            document.getElementById('quiCKIE_config_table_thead_th_paused').setAttribute('title', 'Start Paused\n\nPause torrents when they are added')
            document.getElementById('quiCKIE_config_table_thead_th_seqpieces').setAttribute('title', 'Download Pieces Sequentially\n\nDownload torrent pieces sequentially to allow for media playback while downloading\n\n* This may impact download speed')

            document.getElementById('quiCKIE_config_table_thead_th_paused').textContent = '⏸️'
            document.getElementById('quiCKIE_config_table_thead_th_seqpieces').textContent = '🧩'


            // The field suffixes as specified in @trackerFieldGeneration
            let fieldSuffixes = ['category', 'savePath', 'tags', 'ratioLimit', 'startPaused', 'seqPieces']
            let uniqueDomains = Object.keys(settingsPanelEntries)
            for (let uniqueDomainKey of uniqueDomains) {
 
                let trackerRow = document.createElement('tr')
                trackerRow.classList.add('quiCKIE_config_table_tbody_tr')
                tbody.appendChild(trackerRow)

                let labelData = document.createElement('td')
                labelData.classList.add('quiCKIE_config_table_td_label')

                labelData.appendChild(document.getElementById(`quiCKIE_config_${uniqueDomainKey}-category_field_label`))
                trackerRow.appendChild(labelData)

                for (let fieldSuffix of fieldSuffixes) {

                    let fieldElement = document.getElementById(`quiCKIE_config_field_${uniqueDomainKey}-${fieldSuffix}`)

                    let dataElement = document.createElement('td')
                    dataElement.classList.add('quiCKIE_config_table_td_field')

                    dataElement.appendChild(fieldElement)

                    trackerRow.appendChild(dataElement)

                    document.getElementById(`quiCKIE_config_${uniqueDomainKey}-${fieldSuffix}_var`).remove()

                }

            }
            
            let quiURLElement = document.getElementById('quiCKIE_config_quiURL_var')

            let quiApiKeyLabel = document.getElementById('quiCKIE_config_quiApiKey_field_label')
            let quiApiKeyField = document.getElementById('quiCKIE_config_field_quiApiKey')

            quiURLElement.appendChild(quiApiKeyLabel)
            quiURLElement.appendChild(quiApiKeyField)

            quiURLElement.title = ''
            quiApiKeyLabel.style.marginLeft = '20px'

            document.getElementById('quiCKIE_config_quiApiKey_var').remove()
            
            let githubSVG = '<svg width="16" height="16" viewBox="0 0 98 96" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_730_27136)"><path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" fill="white"/></g><defs><clipPath id="clip0_730_27136"><rect width="98" height="96" fill="white"/></clipPath></defs></svg>'

            let versionElement = document.createElement('a')
            versionElement.classList = 'version_label reset'
            versionElement.title = 'Source Code on GistHub'
            versionElement.target = '_blank'
            versionElement.href = `${GM_info.script.homepage}`
            versionElement.innerHTML = `${githubSVG} Version ${GM_info.script.version}`

            doc.getElementById('quiCKIE_config_buttons_holder').appendChild(versionElement)

            let saveButton = doc.getElementById('quiCKIE_config_saveBtn')
            saveButton.addEventListener('click', () => {
                saveButton.classList.add('success')
                setTimeout(() => saveButton.classList.remove('success'), 500)
            })

        },
        'save': function () {
            reloadWindow = true
            GM_listValues().forEach(key => {
                if (key !== 'quiCKIE_config') {
                    GM_setValue(key, null)
                }
            })
        },
        'close': function () {
            if (reloadWindow) {
                if (this.frame) {
                    window.location.reload()
                } else {
                    setTimeout(() => {
                        window.location.reload()
                    }, 250)
                }
            }
        },
        'reset': function () {
            if (typeof resetToDefaults === 'function') {
                resetToDefaults()
            }
        }
    },
    'css': GM_getResourceText('configMenuCSS')
})

GM_registerMenuCommand('Settings', () => {
    GM_config.open()
})


// =================================== FUNCTIONS ======================================

function setClickedStatus(emoji) {
    // Update the clicked bunnyButton's text and release the __CLICKED__ id
    const el = document.getElementById('__CLICKED__')
    if (el) {
        el.textContent = emoji
        el.removeAttribute('id')
    }
}

function parseQuiApiURL(quiURL) {
    // Parse the quiURL into the API endpoint for adding torrents
    const match = quiURL.match(/^(.*)\/(instances\/\d+)/)
    if (!match) throw new Error('Invalid quiURL')
    return `${match[1]}/api/${match[2]}/torrents`
}

function quiAddTorrent(quiURL, quiApiKey, {torrentURL, torrentBlob, filename} = {}, category = '', savePath = '', tags = '', ratioLimit = '', startPaused = false, seqPieces = false) {
    // Add a torrent to qui using the provided arguments (supports both URL and file upload)

    try {
        var quiApiAddTorrentURL = parseQuiApiURL(quiURL)
    } catch(error) {
        // Failed to parse quiURL
        console.log(error)
        setClickedStatus(' ❌ ')
        window.alert(`❌ quiCKIE ❌\n\nFailed to generate the qui API endpoint from the saved quiURL.\n\nCheck your quiURL for typos.\n\n${quiURL}`)
        return
    }

    // The form data that will be passed to qui
    let form = new FormData()

    if (torrentBlob) {
        form.append('torrent', torrentBlob, filename)
    } else {
        form.append('urls', torrentURL)
    }

    form.append('category', category)
    form.append('savepath', savePath)
    form.append('tags', tags)
    form.append('ratioLimit', ratioLimit)
    form.append('paused', startPaused)

    if ( seqPieces ) {
        // Allow for playback while downloading by enabling "Sequential Piece Downloading" AND "First\Last Piece Priority"
        form.append('sequentialDownload', true)
        form.append('firstLastPiecePrio', true)
    }

    GM_xmlhttpRequest({
        method: 'POST',
        url: quiApiAddTorrentURL,
        data: form,
        headers: {
            'X-API-Key': quiApiKey,
        },
        timeout: 30000,
        onload: function(response) {

            if (response.status == 201) {
                // Success: The torrent has been added to qui
                setClickedStatus(' ✔️ ')

            } else {
                // Failed: The torrent was NOT added to qui, log the response and display an alert...
                console.log(response)
                setClickedStatus(' ❌ ')

                if (response.status == 401) {
                    // Unauthorized
                    window.alert(`❌ quiCKIE ❌\n\nStatus Code: ${response.status}\n\n${response.responseText}\nVerify that your ApiKey is correct\n\nApiKey: ${quiApiKey}`)
                } else {
                    window.alert(`❌ quiCKIE ❌\n\nFailed to Add the Torrent to qui\n\nStatus Code: ${response.status}\n\n${response.responseText}`)
                }

            }

        },
        onerror: function(response) {
            // There was an error making the POST
            console.log(response)
            setClickedStatus(' ❌ ')
            window.alert(`❌ quiCKIE ❌\n\nThere was a problem connecting with qui. Verify that qui is running and check your quiURL and ApiKey for any typos\n\nStatus Code: ${response.status}\n\n${response.responseText}`)

        },
        ontimeout: function(response) {
            // The connection timed out
            console.log(response)
            setClickedStatus(' ❌ ')
            window.alert(`❌ quiCKIE ❌\n\nThe connection to qui timedout\n\nApiUrl: ${quiApiAddTorrentURL}\n\nStatus Code: ${response.status}\n\n${response.responseText}`)

        }
    })

}

function createBunnyButton(torrentURL, buttonText = ' 🐰 ', fontSize = 'inherit', {titlePrefix, onLeftClick} = {}) {
    // Create the bunnyButton that will be displayed on the site
    // onLeftClick(button): optional async callback for the left-click action; defaults to URL-based add

    let bunnyButton = document.createElement('a')
    bunnyButton.classList.add('quiCKIE_bunnyButton')
    bunnyButton.href = 'javascript:void(0)'
    bunnyButton.textContent = buttonText
    bunnyButton.title = `${titlePrefix || 'quiCKIE'}\n-----------------\nCategory: ${SETTINGS.category}\nSavePath: ${SETTINGS.savePath}\nTags: ${SETTINGS.tags}\nRatioLimit: ${SETTINGS.ratioLimit}\nStartPaused: ${SETTINGS.startPaused}\nSeqPiece: ${SETTINGS.seqPieces}`
    bunnyButton.setAttribute('torrentURL', torrentURL)
    bunnyButton.setAttribute('style', `font-size: ${fontSize}; text-align: center; text-decoration: none`)

    bunnyButton.addEventListener('mouseover', function(event) {
        this.style.textShadow = '0px 0px 1px black, 0 0 5px #2cadff'
    })

    bunnyButton.addEventListener('mouseout', function(event) {
        this.style.textShadow = ''
    })

    bunnyButton.addEventListener('mouseup', async function(event) {
        // When this bunnyButton is clicked, determine what kind of click it was and respond accordingly...

        if ( event.ctrlKey ) {
            // Ctrl-Click: Open the quiURL in a new tab
            window.open(SETTINGS.quiURL).focus()

        } else if ( event.shiftKey ) {
            // Shift-Click: Open the quiCKIE settings panel
            GM_config.open()

        } else if ( event.button == 1 ) {
            // Middle-Click: Open the quiURL in a new tab
            window.open(SETTINGS.quiURL, '_blank').focus()

        } else if ( event.button == 0 ) {
            // Left-Click: Add the torrentURL to qui

            if (SETTINGS.quiURL == '' || SETTINGS.quiApiKey == '') {
                // Alert the user that both a quiURL or ApiKey are required
                window.alert('🐰 quiCKIE 🐰\n\nBoth a quiURL and ApiKey are required to communicate with qui\n\nShift-Click the BunnyButton to open the setting panel')

            } else if (onLeftClick) {
                // Custom left-click handler (e.g. Takeout blob download + upload)
                await onLeftClick(this)

            } else {
                // Default: add the torrent URL to qui with the current site settings
                this.id = '__CLICKED__'
                this.textContent = ' 🕓 '
                quiAddTorrent(SETTINGS.quiURL, SETTINGS.quiApiKey, {torrentURL: torrentURL}, SETTINGS.category, SETTINGS.savePath, SETTINGS.tags, SETTINGS.ratioLimit, SETTINGS.startPaused, SETTINGS.seqPieces)
            }
        }

    })

    return bunnyButton

}


// ---------------- Takeout (OPS on RED) integration ----------------
// When Takeout injects OPS DL/FL links (href="#", class="ops_dl", data-id="..."),
// add quiCKIE 🐰 buttons that download the OPS .torrent (via OPS API key stored by Takeout)
// and upload it to qui using multipart field "torrent" (per qui API docs).

function getTakeoutOpsApiKey() {
    // Takeout stores OPS API key in IndexedDB:
    // DB: "takeout" | store: "api-key" | key: "ops"
    return new Promise((resolve) => {
        const req = indexedDB.open('takeout', 1);
        req.onerror = () => resolve('');
        req.onupgradeneeded = () => resolve(''); // don't create anything; just bail
        req.onsuccess = () => {
            try {
                const db = req.result;
                if (!db.objectStoreNames.contains('api-key')) return resolve('');
                const tx = db.transaction('api-key', 'readonly');
                const store = tx.objectStore('api-key');
                const getReq = store.get('ops');
                getReq.onerror = () => resolve('');
                getReq.onsuccess = () => resolve(getReq.result || '');
            } catch {
                resolve('');
            }
        };
    });
}

function filenameFromHeaders(responseHeaders) {
    const h = responseHeaders || '';
    const m = /filename\*=(?:UTF-8'')?([^;\r\n]+)|filename="?([^\";\r\n]+)"?/i.exec(h);
    const raw = (m && (m[1] || m[2])) ? (m[1] || m[2]).trim() : 'download.torrent';
    try { return decodeURIComponent(raw.replace(/^"(.*)"$/, '$1')); }
    catch { return raw.replace(/^"(.*)"$/, '$1'); }
}

function downloadTorrentBlobFromURL(url) {
    // Generic: download a .torrent file as a blob via GM_xmlhttpRequest (uses the browser's cookies)
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: 'GET',
            url,
            responseType: 'blob',
            timeout: 30000,
            onload: (res) => {
                if (res.status !== 200) return reject(new Error(`Download failed (HTTP ${res.status})`));
                const blob = res.response;
                const filename = filenameFromHeaders(res.responseHeaders);
                resolve({ blob, filename });
            },
            onerror: () => reject(new Error('Torrent download failed (network error)')),
            ontimeout: () => reject(new Error('Torrent download timed out')),
        });
    });
}

async function downloadOpsTorrentBlob(opsId, useToken) {
    const opsApiKey = await getTakeoutOpsApiKey();
    if (!opsApiKey) throw new Error('No OPS API key found. Add it in Takeout first.');

    const url = useToken
        ? `https://orpheus.network/ajax.php?action=download&id=${encodeURIComponent(opsId)}&usetoken=1`
        : `https://orpheus.network/ajax.php?action=download&id=${encodeURIComponent(opsId)}`;

    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: 'GET',
            url,
            headers: { Authorization: opsApiKey },
            responseType: 'blob',
            timeout: 30000,
            onload: async (res) => {
                if (res.status !== 200) return reject(new Error(`OPS download failed (HTTP ${res.status})`));

                const blob = res.response;

                // OPS can return JSON errors; detect and surface them
                if (blob && blob.type && blob.type.startsWith('application/json')) {
                    try {
                        const data = await new Response(blob).json();
                        return reject(new Error(data && (data.error || data.message) ? (data.error || data.message) : 'OPS returned an error'));
                    } catch {
                        return reject(new Error('OPS returned an error (unreadable JSON)'));
                    }
                }

                const filename = filenameFromHeaders(res.responseHeaders);
                resolve({ blob, filename });
            },
            onerror: () => reject(new Error('OPS download failed (network error)')),
            ontimeout: () => reject(new Error('OPS download timed out')),
        });
    });
}

function createTakeoutOpsBunnyButton(opsId, useToken, fontSize = 'inherit') {
    // Thin wrapper: creates a bunnyButton with a custom left-click that downloads the OPS .torrent and uploads to qui
    return createBunnyButton('', ' 🐰 ', fontSize, {
        titlePrefix: `quiCKIE (Takeout OPS)\n${useToken ? 'Uses FL token' : 'Normal download'}`,
        onLeftClick: async function(button) {
            button.id = '__CLICKED__';
            button.textContent = ' 🕓 ';
            try {
                const { blob, filename } = await downloadOpsTorrentBlob(opsId, useToken);
                quiAddTorrent(SETTINGS.quiURL, SETTINGS.quiApiKey, {torrentBlob: blob, filename: filename}, SETTINGS.category, SETTINGS.savePath, SETTINGS.tags, SETTINGS.ratioLimit, SETTINGS.startPaused, SETTINGS.seqPieces);
            } catch (e) {
                console.log(e);
                setClickedStatus(' ❌ ');
                window.alert(`❌ quiCKIE ❌\n\n${e.message}`);
            }
        }
    });
}

function injectTakeoutOpsButtons(root = document) {
    const links = root.querySelectorAll('a.ops_dl[data-id]:not([data-quicked])');

    for (let link of links) {
        const opsId = link.getAttribute('data-id');
        const useToken = link.classList.contains('ops_fl');

        const bunnyButton = createTakeoutOpsBunnyButton(opsId, useToken);

        link.setAttribute('data-quicked', '1');

        // Insert the bunny right after DL/FL link
        link.insertAdjacentElement('afterend', bunnyButton);
    }
}

// -----------------------------------------------------------------


// =================================== CODE ======================================

// To save resources while allowing cross-site compatibility, the domain of the site is used when saving settings and creating GM_config fields
// Example: https://broadcasthe.net/ --> broadcasthe
let trackerDomain = document.location.hostname.match(/^(\w+\.)?(.*?)(\.\w+)$/)[2].toLowerCase()

// @trackerSettings
const SETTINGS = {
    // The saved settings (cache) of the current tracker
    quiURL: GM_config.get('quiURL'),
    quiApiKey: GM_config.get('quiApiKey'),
    category: GM_config.get(`${trackerDomain}-category`),
    savePath: GM_config.get(`${trackerDomain}-savePath`),
    tags: GM_config.get(`${trackerDomain}-tags`),
    ratioLimit: GM_config.get(`${trackerDomain}-ratioLimit`),
    startPaused: GM_config.get(`${trackerDomain}-startPaused`),
    seqPieces: GM_config.get(`${trackerDomain}-seqPieces`),
}


// @trackerIfBlocks
//     ! This is the same domain used when creating the tracker's settings fields below @trackerFields
//
// How to add new trackers: add an entry to simpleTrackers below (selector + separator, optional buttonText/fontSize).
// Only trackers with non-standard insertion logic need their own block after the simple-tracker loop.

const simpleTrackers = {
    'animebytes':     { selector: 'a[href^="/torrent/"][title="Download torrent"]', separator: ' |' },
    'bibliotik':      { selector: 'a[href^="/torrents/"][title="Download"]', separator: '  ' },
    'broadcasthe':    { selector: 'a[href^="torrents.php?action=download&id="]', separator: ' |' },
    'deepbassnine':   { selector: 'a[href^="torrents.php?action=download&id="]', separator: '|' },
    'gazellegames':   { selector: 'a[href^="torrents.php?action=download&id="]', separator: '|' },
    'happyfappy':     { selector: 'a[href^="/torrents.php?action=download&id="]', separator: '  ', buttonText: '🐰', fontSize: '125%' },
    'hdbits':         { selector: 'a.js-download[href^="/download.php/"]', separator: '  ', buttonText: '🐰', fontSize: '140%' },
    'jpopsuki':       { selector: 'a[href^="torrents.php?action=download&id="]', separator: ' |' },
    'nyaa':           { selector: 'a[href^="magnet:?xt\\=urn:btih:"]', separator: ' ' },
    'orpheus':        { selector: 'a[href^="torrents.php?action=download&id="]', separator: '|' },
    'passthepopcorn': { selector: 'a[href^="torrents.php?action=download&id="]', separator: ' |' },
    'secret-cinema':  { selector: 'a[href^="torrents.php?action=download&id="]', separator: ' |' },
    'anthelion':      { selector: 'a[href^="torrents.php?action=download&id="]', separator: ' |' },
    'nebulance':      { selector: 'a[href^="torrents.php?action=download&id="]', separator: ' |' },
}

const unit3dTrackers = {
    'lst':        { domain: 'lst.gg',         title: 'LST.gg' },
    'fearnopeer': { domain: 'fearnopeer.com', title: 'FearNoPeer.com' },
    'seedpool':   { domain: 'seedpool.org',   title: 'Seedpool.org' },
    'nordicq':     { domain: 'www.nordicq.org',     title: 'NordicQ.org' },
}

// Trackers where qBittorrent can't fetch the .torrent itself (e.g. cookie-gated).
// The userscript downloads the blob via GM_xmlhttpRequest and uploads it to qui.
// Requires a matching @connect entry in the metadata block.
const blobTrackers = {
    'cyclingarchive': { selector: 'a[href^="download.php?"]', separator: ' |', title: 'CyclingArchive' },
}

if ( simpleTrackers[trackerDomain] ) {
    // ----------------------------------- Simple Trackers -----------------------------------
    // Trackers that follow the standard pattern: query download links, insert bunnyButton after each

    const cfg = simpleTrackers[trackerDomain]
    let allDownloadElements = document.querySelectorAll(cfg.selector)

    for (let downloadElement of allDownloadElements) {

        let bunnyButton = createBunnyButton(downloadElement.href, cfg.buttonText, cfg.fontSize)

        downloadElement.insertAdjacentElement('afterend', bunnyButton)
        downloadElement.insertAdjacentText('afterend', cfg.separator)

    }

} else if ( trackerDomain == 'empornium' ) {
    // ----------------------------------- Empornium -----------------------------------
    // Browse | Collages | Details | Top10 (special: collage page uses parentElement insertion)

    let allDownloadElements = document.querySelectorAll('a[href^="/torrents.php?action=download&id="]')

    for (let downloadElement of allDownloadElements) {

        let bunnyButton = createBunnyButton(downloadElement.href, '🐰', '125%')

        if ( document.location.pathname.match(/\/collage\/\d+/) ) {
            // Collage Page: Insert bunnyButton in the same row as the other buttons
            downloadElement.parentElement.insertAdjacentElement('afterend', bunnyButton)
        } else {
            downloadElement.insertAdjacentElement('afterend', bunnyButton)
            downloadElement.insertAdjacentText('afterend', '  ')
        }

    }

} else if ( trackerDomain == 'myanonamouse' ) {
    // ----------------------------------- MyAnonaMouse -----------------------------------
    // Browse | Details | Homepage (special: uses MutationObserver for browse/homepage)

    if ( document.URL.match(/\/t\/\d+/) ) {
        // The book details page, which doesn't require a MutationObserver

        let downloadButton = document.querySelector('a[href^="/tor/download.php/"][title*="Download"]')

        let bunnyButton = createBunnyButton(downloadButton.href, '🐰', '150%')

        downloadButton.insertAdjacentElement('afterend', bunnyButton)

    } else {
        // The Browse or Homepage, both of which require a MutationObserver

        let observer = new MutationObserver(function(mutations) {
            // Functionality to run when changes are detected to the target element

            try {

                let allDownloadElements = document.querySelectorAll('a[href^="/tor/download.php/"][title*="Download"]')

                for (let downloadElement of allDownloadElements) {

                    let bunnyButton = createBunnyButton(downloadElement.href, '🐰', '150%')

                    downloadElement.insertAdjacentElement('afterend', bunnyButton)

                }

            } catch(error) {
                // console.log(error)
                return
            }
        })

        let target = document.getElementById('ssr')
        let config = { childList: true }

        observer.observe(target, config)
    }

} else if ( trackerDomain == 'redacted' ) {
    // ----------------------------------- Redacted -----------------------------------
    // Album | Artist | Browse (special: includes Takeout integration)

    let allDownloadElements = document.querySelectorAll('a[href^="torrents.php?action=download&id="]')

    for (let downloadElement of allDownloadElements) {

        let bunnyButton = createBunnyButton(downloadElement.href)

        downloadElement.insertAdjacentElement('afterend', bunnyButton)
        downloadElement.insertAdjacentText('afterend', '|')

    }

    // Takeout integration (OPS cross-seeds): add 🐰 next to Takeout's injected DL/FL buttons
    injectTakeoutOpsButtons();

    document.addEventListener('takeout:rows-added', () => injectTakeoutOpsButtons());

    const takeoutTarget = document.querySelector('table.torrent_table') || document.body;
    let takeoutTick = false;
    new MutationObserver(() => {
        if (takeoutTick) return;
        takeoutTick = true;
        setTimeout(() => {
            takeoutTick = false;
            injectTakeoutOpsButtons();
        }, 150);
    }).observe(takeoutTarget, { childList: true, subtree: true });

} else if ( unit3dTrackers[trackerDomain] ) {
    // ----------------------------------- UNIT3D Trackers (LST, FearNoPeer, Seedpool, ...) -----------------------------------

    const cfg = unit3dTrackers[trackerDomain]
    let allDownloadElements = document.querySelectorAll(
        `a.torrent-actions__btn--download[href*="/torrents/download/"], a[href^="https://${cfg.domain}/torrents/download/"], a[href^="/torrents/download/"]`
    )

    for (let downloadElement of allDownloadElements) {

        // Avoid duplicates if the page re-renders
        if (downloadElement.nextElementSibling && downloadElement.nextElementSibling.classList && downloadElement.nextElementSibling.classList.contains('quiCKIE_bunnyButton')) {
            continue
        }

        const downloadURL = downloadElement.href

        const bunnyButton = createBunnyButton(downloadURL, ' 🐰 ', 'inherit', {
            titlePrefix: `quiCKIE (${cfg.title})`,
            onLeftClick: async function(button) {
                button.id = '__CLICKED__'
                button.textContent = ' 🕓 '
                try {
                    const { blob, filename } = await downloadTorrentBlobFromURL(downloadURL)
                    quiAddTorrent(SETTINGS.quiURL, SETTINGS.quiApiKey, { torrentBlob: blob, filename: filename }, SETTINGS.category, SETTINGS.savePath, SETTINGS.tags, SETTINGS.ratioLimit, SETTINGS.startPaused, SETTINGS.seqPieces)
                } catch (e) {
                    console.log(e)
                    setClickedStatus(' ❌ ')
                    window.alert(`❌ quiCKIE ❌\n\n${e.message}`)
                }
            }
        })

        // Add some spacing so it doesn't stick to the Download button
        bunnyButton.style.marginLeft = '6px'

        downloadElement.insertAdjacentElement('afterend', bunnyButton)
    }

} else if ( blobTrackers[trackerDomain] ) {
    // ----------------------------------- Blob Trackers (CyclingArchive, ...) -----------------------------------
    // Trackers where the userscript must download the .torrent blob and upload it to qui

    const cfg = blobTrackers[trackerDomain]
    let allDownloadElements = document.querySelectorAll(cfg.selector)

    for (let downloadElement of allDownloadElements) {

        const downloadURL = downloadElement.href

        const bunnyButton = createBunnyButton(downloadURL, ' 🐰 ', 'inherit', {
            titlePrefix: `quiCKIE (${cfg.title})`,
            onLeftClick: async function(button) {
                button.id = '__CLICKED__'
                button.textContent = ' 🕓 '
                try {
                    const { blob, filename } = await downloadTorrentBlobFromURL(downloadURL)
                    quiAddTorrent(SETTINGS.quiURL, SETTINGS.quiApiKey, { torrentBlob: blob, filename: filename }, SETTINGS.category, SETTINGS.savePath, SETTINGS.tags, SETTINGS.ratioLimit, SETTINGS.startPaused, SETTINGS.seqPieces)
                } catch (e) {
                    console.log(e)
                    setClickedStatus(' ❌ ')
                    window.alert(`❌ quiCKIE ❌\n\n${e.message}`)
                }
            }
        })

        downloadElement.insertAdjacentElement('afterend', bunnyButton)
        downloadElement.insertAdjacentText('afterend', cfg.separator)
    }

} else {
    // ----------------------------------- NONE -----------------------------------
    console.log(`quiCKIE: The parsed trackerDomain of this URL did not match any of the supported trackers\n\ntrackerDomain: ${trackerDomain}`)
}

// ---------------- Takeout (embedded) ----------------

(async function () {
    "use strict";
    // Combined-script guard: only run Takeout on RED artist/torrents pages.
    if (location.hostname !== "redacted.sh" || !["/artist.php", "/torrents.php"].includes(location.pathname)) return;

    let opsApiKey, artistCache, artistAlias, redData, opsData, searchAlias;
    const defaults = { "mode_automatic": true, "mode_manual": false, "show_bar": true, "cache_interval": 24, "last_pruned": 0, "accent_color": "#20c098", "error_color": "#FA7373", "label_text": "OPS", "label_style": "font-variant: all-small-caps", "highlight_color": "#20c09822", "marked_style": "text-decoration-line: line-through", "bar_outlink": true, "insert_downloadable_link": false };
    const settings = JSON.parse(localStorage.getItem("takeout_settings")) || defaults;
    Object.keys(defaults).forEach(x => {
        settings[x] ??= defaults[x];
    });
    localStorage.setItem("takeout_settings", JSON.stringify(settings));
    localStorage.removeItem("takeout_queue");
    const page = globalThis.location.href;
    const linkbox = document.querySelector(".header .linkbox");
    if (page.includes("revisionid=") || !linkbox) return;
    const cache = Math.max(3600000 * settings.cache_interval, 3600000);
    const style = document.createElement("style");
    document.head.append(style);
    appendStyles();
    const redApiUrl = "https://redacted.sh/ajax.php?action=artist&artistname=";
    const opsApiUrl = "https://orpheus.network/ajax.php?action=artist&artistname=";
    const opsTorrentUrl = "https://orpheus.network/torrents.php?torrentid=";
    const artistPage = page.includes("artist.php?id=");
    const header = document.querySelector(".header h2");
    const menuToggle = document.createElement("a");
    const menu = document.createElement("div");
    linkbox.append(menuToggle);
    document.querySelector(".sidebar").insertAdjacentElement("afterbegin", menu);
    menuToggle.textContent = "Takeout";
    menuToggle.id = "takeout_toggle";
    menuToggle.classList.add("brackets");
    menu.id = "takeout_menu";
    menu.classList.add("box");
    menu.style.display = "none";
    const databaseName = "takeout";
    const initDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(databaseName, 1);
            request.onupgradeneeded = event => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("matches")) {
                    db.createObjectStore("matches", {
                        keyPath: "artist"
                    });
                }
                if (!db.objectStoreNames.contains("aliases")) {
                    db.createObjectStore("aliases", {
                        keyPath: "artist"
                    });
                }
                if (!db.objectStoreNames.contains("api-key")) {
                    db.createObjectStore("api-key");
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    };
    const getData = async (storeName, key) => {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    };
    const addData = async (storeName, record, key) => {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = key ? store.put(record, key) : store.put(record);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    };
    const clearData = async (storeName, key) => {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    };
    const getKeys = async storeName => {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.getAllKeys();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    };
    function queueRequest() {
        return new Promise(resolve => {
            const now = Date.now();
            const queue = JSON.parse(localStorage.getItem("api_request_queue"))?.filter(x => now < x) || [];
            const delay = queue.at(-1) - now || 0;
            queue.push(now + delay + 3000);
            localStorage.setItem("api_request_queue", JSON.stringify(queue));
            if (delay !== 0) {
                console.log(`Takeout: Rate limit queue, API call in ${Math.round(delay / 1000)}s.`);
            }
            setTimeout(resolve, delay);
        });
    }
    async function redApi(name) {
        const res = await fetch(redApiUrl + encodeURIComponent(name))
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                console.error(`Takeout: RED API call failed (status ${response.status})`);
            })
            .catch(e => console.error(e));
        return res;
    }
    function opsApi(endpoint, name) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: endpoint + encodeURIComponent(name),
                headers: { "Authorization": opsApiKey },
                onload: async res => {
                    if (res.status !== 200) {
                        menuToggle.style.color = settings.error_color;
                        console.error(`Takeout: OPS API call failed (status ${res.status})`);
                        return;
                    }
                    if (JSON.parse(res.responseText).error === "invalid token") {
                        menuToggle.style.color = settings.error_color;
                        await clearKey();
                        alert("Takeout: Request rejected (invalid token). Please enter a working Orpheus API key.");
                        console.log("Takeout: Request rejected (invalid token). Please enter a working Orpheus API key.");
                    } else {
                        resolve(JSON.parse(res.responseText));
                    }
                },
                onerror: res => reject(res)
            });
        });
    }
    function escape(string) {
        const str = string.toString();
        const len = str.length;
        const unescaped = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@*+-./";
        let result = "";
        for (let k = 0; k < len; k++) {
            const char = str[k];
            const code = char.charCodeAt(0);
            if (unescaped.includes(char)) {
                result += char;
            } else if (code < 256) {
                result += "%" + code.toString(16);
            } else {
                result += "%u" + ("0000").substring(0, 4 - result.length) + result;
            }
        }
        return result;
    }
    function decode(filename) {
        try {
            try {
                return decodeURIComponent(escape(decodeURIComponent(escape(filename))));
            } catch {
                return decodeURIComponent(escape(filename));
            }
        } catch {
            return filename;
        }
    }
    function addRows() {
        if (!artistCache.artist) return;
        for (const tr of document.querySelectorAll("tr[id^='matched_']")) {
            tr.remove();
        }
        for (const tr of document.querySelectorAll("tr.group_torrent")) {
            const a = tr.querySelector("a[href*='torrentid']");
            if (!a) continue;
            const i = /\d+/.exec(a.onclick) || new URLSearchParams(a.search).get("torrentid");
            const match = artistCache.matches.find(x => x.red_id == i);
            if (!match) continue;
            const info = tr.querySelector("a[onclick*='#torrent'], a[href*='torrents.php?id=']").innerHTML;
            const excluded = ["Seeding", "Uploaded", "Leeching", "Snatched", "Downloaded", "Seeded", "Reported", "Freeleech", "Freeload", "Neutral"];
            const trumpable = Array.from(tr.querySelectorAll("strong.tl_notice"))?.find(x => x.textContent.includes("Trumpable"));
            const copy = info.split(" / ").filter(x => !excluded.some(e => x.includes(e))).join(" / ");
            const size = tr.querySelector("td.nobr.number_column").outerHTML;
            const files = tr.querySelector("td.gmfc_files")?.textContent;
            const matchTr = document.createElement("tr");
            matchTr.className = tr.className.split(" ").filter(x => !x.endsWith("_torrent") || x === "group_torrent").join(" ");
            matchTr.id = `matched_${i}`;
            matchTr.innerHTML = `
                <td${artistPage ? ` colspan="2"` : ""}>
                    <span class="torrent_action_buttons ${tr.querySelector("span.torrent_action_buttons.multiple") ? "multiple" : ""}"> <a href="#" class="ops_dl" data-id="${match.ops_id}" title="Download">DL</a> | <a href="#" class="ops_dl ops_fl" data-id="${match.ops_id}" title="Use a FL Token">FL</a></span>
                    ${artistPage ? "&nbsp;&nbsp;»&nbsp;" : " » "}
                    <a href="${opsTorrentUrl + match.ops_id}" target="_blank">${copy}</a>${artistPage && trumpable ? ` / <strong class="torrent_label tooltip tl_notice tl_trumpable" style="white-space: nowrap;">Trumpable</strong>` : ""}
                    <strong class="torrent_label"><a class="tl_ops">${settings.label_text}</a></strong>
                </td>
                ${!artistPage && files ? `<td class="number_column nobr matched_files">${files}</td>` : ""}
                ${size}
                <td class="number_column">${match.snatched}</td>
                <td class="number_column">${match.seeders}</td>
                <td class="number_column">${match.leechers}</td>
            `;
            artistPage ? tr.after(matchTr) : tr.nextElementSibling.after(matchTr);
        }
            // Notify other scripts that Takeout has injected OPS rows
        document.dispatchEvent(new CustomEvent("takeout:rows-added"));
}
    function appendStyles() {
        style.textContent = `a.tl_ops { color: ${settings.accent_color} !important; font-weight: bolder !important; ${settings.label_style} } a.tl_ops { margin: 0; padding: 0 0 0 4px; } tr[id^='matched_'] { background: ${settings.highlight_color} !important; } :is(tr:is(.seeding_torrent, .uploaded_torrent, .snatched_torrent) + tr[id^='matched'], tr:is(.seeding_torrent, .uploaded_torrent, .snatched_torrent) + tr[id^='torrent'] + tr[id^='matched']) a[href*='orpheus'] { ${defaults.marked_style} } #takeout_toggle, :is(#takeout_info_bar, #takeout_menu) a { cursor: pointer } div[id^='takeout_info'] { display: flex; align-content: center } div[id^='takeout_info'] > :not(:first-child, .takeout_menu_match) { margin-left: 2px } div[id^='takeout_info'] a:first-of-type { flex: auto } #takeout_info_bar { padding: 10px 15px !important } #takeout_info_bar * { align-content: center } #takeout_menu .head:not(:first-of-type) { margin-top: 10px } .takeout_container:has(#takeout_info_main) { margin: 8px 0; padding: 0 5px 0 4px } #takeout_cache_age, .remove-alias { font-size: .9em } #takeout_refresh_artist, #takeout_search_toggle, #takeout_settings_toggle, .takeout-default { font-size: .9em; float: right } #takeout_search_container { padding: 5px 5px 5px 4px } #takeout_search_container input { margin: 3px 0 } #takeout_search_group { width: 100% } .takeout_menu_match { font-weight: bold } #takeout_menu ul li { margin-right: 5px } #takeout_settings_container { padding: 5px } #takeout_settings_container div { margin: 5px 0 } #takeout_settings_container input { line-height: 1 } #takeout_settings_container .label { margin: 0 0 5px; border-bottom: 1px solid #303134; } #takeout_save_button { margin: 10px 0 20px }`;
    }
    function timeAgo(time) {
        const date = time instanceof Date ? time : new Date(time);
        const formatter = new Intl.RelativeTimeFormat("en");
        const ranges = { "years": 3600 * 24 * 365, "months": 3600 * 24 * 30, "weeks": 3600 * 24 * 7, "days": 3600 * 24, "hours": 3600, "minutes": 60, "seconds": 1 };
        const elapsed = (date.getTime() - Date.now()) / 1000;
        for (const key in ranges) {
            if (ranges[key] < Math.abs(elapsed)) {
                let delta = elapsed / ranges[key];
                let remainder = -Math.abs(delta - Math.ceil(delta)) * ranges[key];
                delta = formatter.format(Math.ceil(delta), key);
                for (const key in ranges) {
                    if (ranges[key] < Math.abs(remainder)) {
                        remainder = formatter.format(Math.ceil(remainder / ranges[key]), key);
                        return delta.replace(" ago", `, ${remainder}`);
                    }
                }
                return delta;
            }
        }
        return "just now";
    }
    opsApiKey = await getData("api-key", "ops") || "";
    const various = document.getElementById("torrent_details") && (header.innerText.startsWith("Various") || header.innerText.includes("under") && header.querySelectorAll("a[href*='artist.php?id=']").length > 1);
    const artistId = artistPage
        ? parseInt(new URLSearchParams(globalThis.location.search).get("id"))
        : various
            ? parseInt(new URLSearchParams(document.getElementById("artist_list").querySelector("a[href*='artist.php?id=']").search).get("id"))
            : parseInt(new URLSearchParams(document.querySelector("a[href*='artist.php?id=']").search).get("id"));
    const artist = artistPage
        ? header.textContent
        : header.innerText.startsWith("Various") || header.querySelectorAll("a[href*='artist.php?id=']").length > 1
            ? document.getElementById("artist_list").querySelector("a[href*='artist.php?id=']").textContent
            : header.querySelector("a[href*='artist.php?id=']").textContent;
    const groupTrim = /^[^\(]+/.exec(document.querySelector("table.torrent_table a[href*='torrents.php?id=']")?.textContent);
    const groupName = artistPage && groupTrim
        ? groupTrim[0].trim()
        : artistPage
            ? ""
            : header.querySelector("span").textContent;
    artistCache = await getData("matches", artistId) || new Object;
    artistAlias = await getData("aliases", artistId) || new Object;
    const pendingUpdate = settings.mode_manual && (!artistCache.artist || Date.now() > artistCache.time + cache);
    const matchCount = `<span title="Matched torrents" class="takeout_menu_match r20">${new Intl.NumberFormat("en-US").format(artistCache.matches?.length || 0)}</span>`;
    const outlink = `<a title="Open artist at OPS" target="_blank" href="${`https://orpheus.network/artist.php?artistname=` + artist}"><svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg></a>`;
    const refreshIcon = `<a id="takeout_call_manual" title="Refresh artist cache"><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M197-197q-54-55-85.5-127.5T80-480q0-84 31.5-156.5T197-763l57 57q-44 44-69 102t-25 124q0 67 25 125t69 101l-57 57Zm113-113q-32-33-51-76.5T240-480q0-51 19-94.5t51-75.5l57 57q-22 22-34.5 51T320-480q0 33 12.5 62t34.5 51l-57 57Zm170-90q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm170 90-57-57q22-22 34.5-51t12.5-62q0-33-12.5-62T593-593l57-57q32 32 51 75.5t19 94.5q0 50-19 93.5T650-310Zm113 113-57-57q44-44 69-102t25-124q0-67-25-125t-69-101l57-57q54 54 85.5 126.5T880-480q0 83-31.5 155.5T763-197Z"/></svg></a>`;
    if (settings.show_bar) {
        const minimalBar = document.createElement("div");
        menu.before(minimalBar);
        minimalBar.outerHTML = `<div id="takeout_info_bar" class="box"><a href="artist.php?id=${artistId}">${artistCache.name || artist}</a> ${matchCount} ${settings.bar_outlink ? outlink : ""} ${pendingUpdate ? refreshIcon : ""}</div>`;
    }
    menu.innerHTML = `<div class="head"><strong>Takeout Menu</strong></div><div class="takeout_container"><div id="takeout_info_main"><a href="artist.php?id=${artistId}">${artistCache.name || artist}</a> ${matchCount} ${outlink}</div>${artistAlias.alias ? `<div id="takeout_alias_info"><a title="Open alias at OPS" href="${`https://orpheus.network/artist.php?artistname=` + artistAlias.alias}">${artistAlias.alias}</a> (alias) <a class="remove-alias takeout-small" title="Remove alias">(delete)</a></div>` : ""}<br><div><span id="takeout_cache_age">Updated: ${artistCache.time ? `${timeAgo(artistCache.time)}` : "never"}</span>${opsApiKey ? `<a id="takeout_refresh_artist" title="Refresh artist cache">(refresh)</a>` : ""}</div></div><div class="head"><strong>Search</strong><a id="takeout_search_toggle">Expand</a></div><div id="takeout_search_container" style="display: none"><div><input id="takeout_search_artist" name="takeout_search_artist" type="text" placeholder="Artist"/> <input id="takeout_search_button" type="button" value="Search"/></div><div><input id="takeout_search_group" name="takeout_search_group" type="text" placeholder="Group name"/></div><div id="takeout_search_results" style="display: none"></div></div><div class="head"><strong>Settings</strong><a id="takeout_settings_toggle">Expand</a></div><div id="takeout_settings_container" style="display: none"><div><div class="label">Cache update interval</div><input id="takeout_cache_interval" name="takeout_cache_interval" type="text" size="2" value="${settings.cache_interval}"/> hours</div><div><div class="label" title="Color used on matched torrent labels and the Takeout menu toggle during API calls.">Accent color</div><input id="takeout_accent_color" name="takeout_accent_color" type="text" size="8" value="${settings.accent_color}"/> <span style="padding-left: 4px; color: ${settings.accent_color}">■</span></div><div><div class="label">Matched torrent label</div><input id="takeout_label_text" name="takeout_label_text" type="text" size="8" value="${settings.label_text}"/> <a class="tl_ops">${settings.label_text}</a></div><div><div class="label">Matched torrent label style</div><input id="takeout_label_style" name="takeout_label_style" type="text" size="20" value="${settings.label_style}"/></div><div><div class="label">Matched row highlight color</div><input id="takeout_highlight_color" name="takeout_highlight_color" type="text" size="8" value="${settings.highlight_color}"/></div><div><div class="label" title="Color used on the Takeout menu toggle in the event of an API error.">Error color</div><input id="takeout_error_color" name="takeout_error_color" type="text" size="8" value="${settings.error_color}"/> <span style="padding-left: 4px; color: ${settings.error_color}">■</span></div><div><div class="label">Default artist search mode</div><ul class="options_list nobullet"><li><input type="radio" name="takeout_mode" id="takeout_mode_automatic" value="automatic"> <label for="takeout_mode_automatic">Automatic</label></li> <li><input type="radio" name="takeout_mode" id="takeout_mode_manual" value="manual"> <label for="takeout_mode_manual">Manual</label></li></ul></div><div><div class="label">Info bar</div><ul class="options_list nobullet"><li title="Add a minimal Takeout bar to the top of the page sidebar."><input type="checkbox" name="takeout_show_bar" id="takeout_show_bar"> <label for="takeout_show_bar">Enable minimal info bar</label></li> <li><input type="checkbox" name="takeout_bar_outlink" id="takeout_bar_outlink"> <label for="takeout_bar_outlink">Enable artist OPS link</label></li></ul><div class="label">Compatibility mode</div><ul class="options_list nobullet"><li title="Convert button to savable file link on right click."><input type="checkbox" name="takeout_insert_downloadable_link" id="takeout_insert_downloadable_link"> <label for="takeout_insert_downloadable_link">Enable savable links on right click</label></li></ul></div><input id="takeout_save_button" type="button" value="Save settings"/><div class="head"><strong>Key</strong></div><input id="takeout_api_key" name="takeout_api_key" type="button" value="${opsApiKey ? "Clear OPS API key" : "Enter OPS API key"}"/></div>`;
    document.getElementById("takeout_search_artist").setAttribute("value", various ? "" : artist);
    document.getElementById("takeout_search_group").setAttribute("value", groupName);
    menuToggle.addEventListener("click", () => {
        if (menu.style.display === "none") {
            menu.style.display = "grid";
        } else {
            menu.style.display = "none";
        }
    });
    const inputs = menu.querySelectorAll("#takeout_settings_container input:is([type='text'], [type='radio'], [type='checkbox'])");
    for (const x of inputs) {
        if (x.type === "radio") continue;
        const reset = document.createElement("a");
        reset.classList.add("takeout-default");
        reset.textContent = "Reset";
        x.parentElement.firstElementChild.append(reset);
        reset.addEventListener("click", () => {
            x.value = defaults[x.id.replace("takeout_", "")];
            if (x.nextElementSibling.classList.contains("tl_ops")) {
                x.nextElementSibling.outerHTML = `<a class="tl_ops">${defaults.label_text}</a>`;
            } else if (x.id === "takeout_accent_color") {
                x.nextElementSibling.style.color = defaults.accent_color;
            } else if (x.id === "takeout_error_color") {
                x.nextElementSibling.style.color = defaults.error_color;
            } else if (x.id === "takeout_label_text") {
                x.nextElementSibling.textContent = defaults.label_text;
            }
        });
    }
    document.getElementById("takeout_save_button").addEventListener("click", () => {
        inputs.forEach(x => {
            settings[x.id.replace("takeout_", "")] = x.type === "text" && validate(x) ? x.value : x.checked;
        });
        localStorage.setItem("takeout_settings", JSON.stringify(settings));
        appendStyles();
        addRows();
    });
    function validate(target) {
        if (target.id === "takeout_cache_interval") {
            return target.value >= 1;
        } else if (target.id.endsWith("color")) {
            return CSS.supports(`color: ${target.value}`);
        } else if (target.id.endsWith("style")) {
            return CSS.supports(`${target.value}`);
        } else {
            return true;
        }
    }
    const searchContainer = document.getElementById("takeout_search_container");
    const settingsContainer = document.getElementById("takeout_settings_container");
    const apiButton = document.getElementById("takeout_api_key");
    settingsContainer.addEventListener("input", (event) => {
        if (["takeout_accent_color", "takeout_error_color"].includes(event.target.id) && validate(event.target)) {
            event.target.nextElementSibling.style.color = event.target.value;
        } else if (event.target.id === "takeout_label_text") {
            event.target.nextElementSibling.textContent = event.target.value;
        }
    });
    menu.addEventListener("click", async (event) => {
        if (event.target.id === "takeout_settings_toggle") {
            if (settingsContainer.style.display === "none") {
                inputs.forEach(x => {
                    x.type === "text" ? x.value = settings[x.id.replace("takeout_", "")] : x.checked = settings[x.id.replace("takeout_", "")];
                });
                event.target.textContent = "Collapse";
                settingsContainer.removeAttribute("style");
            } else {
                event.target.textContent = "Expand";
                settingsContainer.style.display = "none";
            }
        } else if (event.target.id === "takeout_search_toggle") {
            if (searchContainer.style.display === "none") {
                event.target.textContent = "Collapse";
                searchContainer.removeAttribute("style");
            } else {
                event.target.textContent = "Expand";
                searchContainer.style.display = "none";
            }
        } else if (event.target.id === "takeout_refresh_artist") {
            event.target.remove();
            await clearData("matches", artistId);
            artistCache = new Object;
            await refresh();
            printStatus();
        } else if (event.target.classList.contains("remove-alias")) {
            event.target.parentElement.remove();
            await clearData("aliases", artistId);
            artistAlias = new Object;
            console.log(`Takeout: Deleted alias for artist`, artistId, artist);
        } else if (event.target.id === "takeout_save_alias" && event.target.value === "Save") {
            if (various && !confirm(`This is a Various Artists release. Are you sure you want to add ${searchAlias} as an alias of ${artist}?`)) {
                return;
            }
            await addData("aliases", artistAlias);
            event.target.value = "Saved!";
            console.log(`Takeout: Saved ${searchAlias} as an alias of`, artistId, artist);
        } else if (event.target.id === "takeout_api_key") {
            if (opsApiKey && confirm("Takeout: Clear saved OPS API key?")) {
                await clearKey();
                console.log("Takeout: OPS API key cleared.");
            } else if (!opsApiKey) {
                opsApiKey = prompt("Takeout: Enter your Orpheus API key.");
                if (!opsApiKey) return;
                await addData("api-key", opsApiKey, "ops");
                apiButton.value = "Clear OPS API key";
                console.log("Takeout: OPS API key saved.");
            }
        }
    });
    async function clearKey() {
        opsApiKey = "";
        await addData("api-key", opsApiKey, "ops");
        apiButton.value = "Enter OPS API key";
        for (const tr of document.querySelectorAll("tr[id^='matched_']")) {
            tr.remove();
        }
    }
    if (!opsApiKey) {
        console.log("Takeout: Please enter an Orpheus API key.");
        return;
    }
    document.getElementById("takeout_call_manual")?.addEventListener("click", async () => {
        document.getElementById("takeout_call_manual").remove();
        await refresh();
        printStatus();
    });
    document.addEventListener("click", event => {
        if (event.target.classList.contains("ops_dl")) {
            fetchTorrentFile(event);
        }
    });
    document.addEventListener("contextmenu", event => {
        if (!settings.insert_downloadable_link) {
            return;
        }
        if (event.target.classList.contains("ops_dl")) {
            fetchTorrentFile(event);
        }
    });
    function fetchTorrentFile(event) {
        if (event.target.href.startsWith("blob")) {
            return;
        }
        event.preventDefault();
        const opsId = event.target.getAttribute("data-id");
        const opsUrl = event.target.classList.contains("ops_fl")
            ? `https://orpheus.network/ajax.php?action=download&id=${opsId}&usetoken=1`
            : `https://orpheus.network/ajax.php?action=download&id=${opsId}`;
        event.target.style.setProperty("color", settings.accent_color, "important");
        menuToggle.style.color = settings.accent_color;
        const start = Date.now();
        GM_xmlhttpRequest({
            method: "GET",
            url: opsUrl,
            headers: { "Authorization": opsApiKey },
            responseType: "blob",
            onload: async res => {
                if (res.status == 200 && res.response.type.startsWith("application/x-bittorrent")) {
                    event.target.removeAttribute("style");
                    menuToggle.removeAttribute("style");
                    const filename = decode(res.responseHeaders.split("\r\n").find(x => x.includes("filename")).match(/"([^"]*)"$/)[1]);
                    const file = new Blob([res.response], { type: "application/x-bittorrent" });
                    if (event.type === "click") {
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(file);
                        a.download = filename;
                        a.click();
                        URL.revokeObjectURL(a.href);
                    } else if (event.type === "contextmenu") {
                        event.target.href = URL.createObjectURL(file);
                        event.target.download = filename;
                    }
                } else if (res.status == 200 && res.response.type.startsWith("application/json")) {
                    event.target.style.setProperty("color", settings.error_color, "important");
                    menuToggle.style.color = settings.error_color;
                    const response = await new Response(res.response).json();
                    const errorText = response.error.includes("already freeleech")
                        ? "Takeout: Cannot use tokens here (torrent is already freeleech)."
                        : response.error.includes("could not find torrent")
                            ? "Takeout: Unregistered torrent. It may have been deleted since the last cache update."
                            : response.error.includes("invalid token")
                                ? "Takeout: Request rejected (invalid token). Please enter a working Orpheus API key."
                                : `Takeout: ${response.error}`;
                    if (response.error.includes("invalid token")) {
                        await clearKey();
                    }
                    alert(errorText);
                    console.log(errorText);
                } else {
                    event.target.style.setProperty("color", settings.error_color, "important");
                    menuToggle.style.color = settings.error_color;
                    console.error(`Takeout: Torrent download failed (request sent ${timeAgo(start)}):`, res);
                }
            },
            onerror: error => {
                event.target.style.setProperty("color", settings.error_color, "important");
                menuToggle.style.color = settings.error_color;
                console.error(`Takeout: Download request failed (request sent ${timeAgo(start)}):`, error);
            }
        });
    }
    const searchButton = document.getElementById("takeout_search_button");
    const searchResults = document.getElementById("takeout_search_results");
    async function manualSearch(searchArtist, searchGroup) {
        const opsSearchUrl = `https://orpheus.network/ajax.php?action=browse&groupname=${searchGroup}&artistname=`;
        console.log("Takeout: Performing manual alias search.");
        menuToggle.style.color = settings.accent_color;
        await queueRequest();
        const res = await Promise.allSettled([redApi(artist), opsApi(opsSearchUrl, searchArtist)]);
        if (!res.every(x => x.value?.status === "success")) {
            menuToggle.style.color = settings.error_color;
            console.log("Takeout: API call failed. Please refresh and try again.");
            return;
        }
        redData = res[0].value.response.torrentgroup.map(x => x.torrent).flat();
        opsData = Object.values(res[1].value.response.results).map(x => x.torrents).flat();
        menuToggle.removeAttribute("style");
        const cacheMatches = artistCache.matches;
        const searchMatches = [];
        for (const ops of opsData) {
            const match = redData.find(red => red.size === ops.size && !searchMatches.map(x => x.red_id).includes(red.id) && !cacheMatches.map(x => x.red_id).includes(red.id));
            if (!match) continue;
            searchAlias = ops.artists[0].name;
            searchMatches.push({ "red_id": match.id, "red_groupid": match.groupId, "ops_id": ops.torrentId, "size": ops.size, "snatched": ops.snatches, "seeders": ops.seeders, "leechers": ops.leechers });
            break;
        }
        if (searchMatches.length == 0) {
            searchResults.innerHTML = `<ul><li><span class="r20">0</span> new results.</li></ul>`;
            searchResults.removeAttribute("style");
            return;
        }
        menuToggle.style.color = settings.accent_color;
        await queueRequest();
        const aliasRes = await opsApi(opsApiUrl, searchAlias);
        if (aliasRes.status !== "success") {
            console.log("Takeout: OPS API call failed. Please refresh and try again.");
            menuToggle.style.color = settings.error_color;
            return;
        }
        menuToggle.removeAttribute("style");
        const aliasData = aliasRes.response.torrentgroup.map(x => x.torrent).flat();
        const aliasMatches = [];
        for (const ops of aliasData) {
            const match = redData.find(red => red.size === ops.size && !aliasMatches.map(x => x.red_id).includes(red.id) && !cacheMatches.map(x => x.red_id).includes(red.id));
            if (!match) continue;
            aliasMatches.push({ "red_id": match.id, "red_groupid": match.groupId, "ops_id": ops.id, "size": ops.size, "snatched": ops.snatched, "seeders": ops.seeders, "leechers": ops.leechers });
        }
        return aliasMatches;
    }
    searchButton.addEventListener("click", async () => {
        const searchArtist = document.getElementById("takeout_search_artist").value;
        const searchGroup = document.getElementById("takeout_search_group").value;
        const aliasMatches = await manualSearch(searchArtist, searchGroup);
        if (!aliasMatches) return;
        searchResults.innerHTML = `<ul><li><span class="r20">${aliasMatches.length}</span> new ${aliasMatches.length == 1 ? "result" : "results"} for <a title="Open alias at OPS" target="_blank" href="https://orpheus.network/artist.php?artistname=${searchAlias}">${searchAlias}</a>.</li><li>Save ${searchAlias} as an alias of ${artist}?</li></ul><input id="takeout_save_alias" title="This artist alias will be automatically queried for matching torrents on future cache updates." type="button" value="Save"/>`;
        searchResults.removeAttribute("style");
        artistAlias.artist = artistId;
        artistAlias.alias = searchAlias;
        artistCache.time = Date.now();
        artistCache.matches = artistCache.matches.concat(aliasMatches);
        await addData("matches", artistCache);
        document.querySelectorAll(".takeout_menu_match").forEach(x => {
            x.textContent = artistCache.matches.length;
        });
        document.getElementById("takeout_cache_age").textContent = `Updated: ${timeAgo(artistCache.time)}`;
        printStatus();
        addRows();
    });
    addRows();
    async function refresh() {
        if (artistPage && !document.querySelector("table.torrent_table a[href*='torrents.php?id=']")) {
            console.log("Takeout: Artist", artistId, `(${artist}) has no torrents to match.`);
            return;
        }
        if (!artistCache.artist || Date.now() > artistCache.time + cache) {
            console.log("Takeout: Refreshing cache.");
            menuToggle.style.color = settings.accent_color;
            await queueRequest();
            const res = await Promise.allSettled([redApi(artist), opsApi(opsApiUrl, artist)]);
            if (res[0].status !== "fulfilled" || res[0].value.status !== "success") {
                console.log("Takeout: RED API call failed. Please refresh and try again.");
                menuToggle.style.color = settings.error_color;
                return;
            }
            if (res[1].status !== "fulfilled" || res[1].value.status === "failure" && res[1].value.error !== "bad artistname") {
                console.log("Takeout: OPS API call failed. Please refresh and try again.");
                menuToggle.style.color = settings.error_color;
                return;
            }
            menuToggle.removeAttribute("style");
            redData = res[0].value.response.torrentgroup.map(x => x.torrent).flat();
            artistCache.name = res[0].value.response.name;
            if (res[1].value.status === "success") {
                opsData = res[1].value.response.torrentgroup.map(x => x.torrent).flat();
            }
            if (artistAlias.alias) {
                console.log("Takeout: OPS artist alias found. Searching alias.");
                menuToggle.style.color = settings.accent_color;
                await queueRequest();
                const retry = await opsApi(opsApiUrl, artistAlias.alias);
                if (retry.status !== "success") {
                    menuToggle.style.color = settings.error_color;
                    if (retry.error === "bad artistname") {
                        await clearAlias(artistId);
                        console.log(`Takeout: Deleted alias for artist`, artistId, artist, `(OPS returned bad artistname)`);
                        return;
                    }
                    console.log("Takeout: OPS API call failed. Please refresh and try again.");
                    return;
                }
                menuToggle.removeAttribute("style");
                const flat = retry.response.torrentgroup.map(x => x.torrent).flat();
                const filtered = flat.filter(ops => redData.some(red => red.size === ops.size));
                if (filtered.length == 0) {
                    await clearAlias(artistId);
                    console.log(`Takeout: Deleted alias for artist`, artistId, artist, `(returned zero matches)`);
                } else {
                    opsData = opsData?.concat(flat) ?? flat;
                }
            } else if (artist.includes(" (") && artist.endsWith(")")) {
                const trim = /^[^\(]+/.exec(artist);
                if (trim) {
                    console.log("Takeout: Artist name may contain a romanization or translation. Searching root name.");
                    const alias = trim[0].trim();
                    menuToggle.style.color = settings.accent_color;
                    await queueRequest();
                    const retry = await opsApi(opsApiUrl, alias);
                    if (retry.status !== "success" && retry.error !== "bad artistname") {
                        console.log("Takeout: OPS API call failed. Please refresh and try again.");
                        menuToggle.style.color = settings.error_color;
                        return;
                    }
                    menuToggle.removeAttribute("style");
                    if (retry.status === "success") {
                        const flat = retry.response.torrentgroup.map(x => x.torrent).flat();
                        const filtered = flat.filter(x => !opsData?.map(x => x.id).includes(x.id));
                        if (filtered.length > 0) {
                            artistAlias.artist = artistId;
                            artistAlias.alias = alias;
                            opsData = opsData?.concat(flat) ?? flat;
                            await addData("aliases", artistAlias);
                        }
                    }
                } else {
                    console.log("Takeout: Failed to isolate root name (may be a false positive).");
                }
            }
            if (artist !== res[0].value.response.name) {
                console.log(`Takeout: ${artist} is a non-redirecting alias of ${res[0].value.response.name}. Placing an additional call to OPS for the primary artist.`);
                menuToggle.style.color = settings.accent_color;
                await queueRequest();
                const retry = await opsApi(opsApiUrl, res[0].value.response.name);
                if (retry.status !== "success" && retry.error !== "bad artistname") {
                    console.log("Takeout: OPS API call failed. Please refresh and try again.");
                    menuToggle.style.color = settings.error_color;
                    return;
                }
                menuToggle.removeAttribute("style");
                if (retry.status === "success") {
                    const flat = retry.response.torrentgroup.map(x => x.torrent).flat();
                    const filtered = flat.filter(x => !opsData?.map(x => x.id).includes(x.id));
                    if (filtered.length > 0) {
                        opsData = opsData?.concat(flat) ?? flat;
                    }
                }
            }
            if (!opsData) {
                console.log(`Takeout: Artist ${artistCache.name} not found at OPS (may not exist).`);
                artistCache = { "artist": artistId, "name": artistCache.name, "time": Date.now(), "matches": [] };
                await addData("matches", artistCache);
                return;
            }
            const matches = [];
            for (const ops of opsData) {
                const match = redData.find(red => red.size === ops.size && !matches.map(x => x.red_id).includes(red.id));
                if (!match) continue;
                matches.push({ "red_id": match.id, "red_groupid": match.groupId, "ops_id": ops.id, "size": ops.size, "snatched": ops.snatched, "seeders": ops.seeders, "leechers": ops.leechers });
            }
            artistCache.artist = artistId;
            artistCache.time = Date.now();
            artistCache.matches = matches;
            await addData("matches", artistCache);
            document.querySelectorAll(".takeout_menu_match").forEach(x => {
                x.textContent = new Intl.NumberFormat("en-US").format(matches.length);
            });
            document.getElementById("takeout_cache_age").textContent = `Updated: ${timeAgo(artistCache.time)}`;
            addRows();
        }
    }
    async function clearAlias(artistId) {
        await clearData("aliases", artistId);
        artistAlias = new Object;
        document.getElementById("takeout_alias_info").remove();
    }
    function printStatus() {
        console.log(`Takeout:`, artistCache.matches.length, `matches for artist`, artistCache.artist, artistCache.name, `(cached ${timeAgo(artistCache.time)})`);
    }
    if (settings.mode_automatic) {
        await refresh();
    }
    if (artistCache.artist) {
        printStatus();
    }
    if (Date.now() > settings.last_pruned + cache) {
        const cacheKeys = await getKeys("matches");
        for await (const entry of cacheKeys.map(async artist => await getData("matches", artist))) {
            if (Date.now() > entry.time + cache) {
                await clearData("matches", entry.artist);
            }
        }
        settings.last_pruned = Date.now();
        localStorage.setItem("takeout_settings", JSON.stringify(settings));
        console.log("Takeout: Pruned expired match data from cache.")
    }
})();
