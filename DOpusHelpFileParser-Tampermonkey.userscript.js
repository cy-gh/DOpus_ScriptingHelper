// ==UserScript==
// @name         Cü's DOpus Help Parser - GitHub
// @namespace    https://github.com/cy-gh/DOpus_ScriptingHelper
// @version      1.0
// @description  Parse current Scripting Object and produce a .d.ts output
// @author       Cü
// @icon         http://cuneytyilmaz.com/favicon.ico
// @match        file:///*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @grant        none

// ==/UserScript==
const DEBUG_LEVEL = 0;
const LOG_PREFIX = 'Cü\'s DOpus Help Parser',
      LOG_CSS_NORMAL = 'font-weight: bold;color: #e33c7b;',
      LOG_CSS_ERROR = 'font-weight: bold;color: #ff0000;';
const Util = {
    log(...args) {
        if(!DEBUG_LEVEL) { return; }
        args.unshift(`%c${LOG_PREFIX}:`, LOG_CSS_NORMAL);
        console.log(...args);
        // console.trace();
    }
};


let mapHrefToObjectName = new Map([
    [ "DOpus.htm", "DOpus" ],
    [ "Script.htm", "Script" ],
    [ "AboutData.htm", "AboutData" ],
    [ "ActivateListerData.htm", "ActivateListerData" ],
    [ "ActivateTabData.htm", "ActivateTabData" ],
    [ "AddCmdData.htm", "AddCmdData" ],
    [ "AddColData.htm", "AddColData" ],
    [ "AfterFolderChangeData.htm", "AfterFolderChangeData" ],
    [ "BeforeFolderChangeData.htm", "BeforeFolderChangeData" ],
    [ "ClickData.htm", "ClickData" ],
    [ "CloseListerData.htm", "CloseListerData" ],
    [ "CloseTabData.htm", "CloseTabData" ],
    [ "ConfigChangeData.htm", "ConfigChangeData" ],
    [ "DisplayModeChangeData.htm", "DisplayModeChangeData" ],
    [ "DoubleClickData.htm", "DoubleClickData" ],
    [ "FileOperationCompleteData.htm", "FileOperationCompleteData" ],
    [ "FlatViewChangeData.htm", "FlatViewChangeData" ],
    [ "GetCopyQueueNameData.htm", "GetCopyQueueNameData" ],
    [ "GetCustomFieldData.htm", "GetCustomFieldData" ],
    [ "GetHelpContentData.htm", "GetHelpContentData" ],
    [ "GetNewNameData.htm", "GetNewNameData" ],
    [ "ListerResizeData.htm", "ListerResizeData" ],
    [ "ListerUIChangeData.htm", "ListerUIChangeData" ],
    [ "OpenListerData.htm", "OpenListerData" ],
    [ "OpenTabData.htm", "OpenTabData" ],
    [ "ScriptColumnData.htm", "ScriptColumnData" ],
    [ "ScriptCommandData.htm", "ScriptCommandData" ],
    [ "ScriptInitData.htm", "ScriptInitData" ],
    [ "ShutdownData.htm", "ShutdownData" ],
    [ "SourceDestData.htm", "SourceDestData" ],
    [ "StartupData.htm", "StartupData" ],
    [ "styleselecteddata.htm", "StyleSelectedData" ],
    [ "TabClickData.htm", "TabClickData" ],
    [ "ViewerEventData.htm", "ViewerEventData" ],
    [ "Alias.htm", "Alias" ],
    [ "Aliases1.htm", "Aliases" ],
    [ "Args.htm", "Args" ],
    [ "AudioMeta.htm", "AudioMeta" ],
    [ "AudioCoverArt.htm", "AudioCoverArt" ],
    [ "Blob.htm", "Blob" ],
    [ "BusyIndicator.htm", "BusyIndicator" ],
    [ "Column.htm", "Column" ],
    [ "Command.htm", "Command" ],
    [ "Control.htm", "Control" ],
    [ "CustomFieldData.htm", "CustomFieldData" ],
    [ "Date.htm", "Date" ],
    [ "Dialog.htm", "Dialog" ],
    [ "DialogListColumn.htm", "DialogListColumn" ],
    [ "DialogListColumns.htm", "DialogListColumns" ],
    [ "DialogListGroup.htm", "DialogListGroup" ],
    [ "DialogListItem.htm", "DialogListItem" ],
    [ "DialogOption.htm", "DialogOption" ],
    [ "Dock.htm", "Dock" ],
    [ "DocMeta.htm", "DocMeta" ],
    [ "DOpusFactory.htm", "DOpusFactory" ],
    [ "DPI.htm", "DPI" ],
    [ "Drive.htm", "Drive" ],
    [ "ExeMeta.htm", "ExeMeta" ],
    [ "Favorite.htm", "Favorite" ],
    [ "Favorites2.htm", "Favorites" ],
    [ "File1.htm", "File" ],
    [ "FileAttr.htm", "FileAttr" ],
    [ "FileGroup.htm", "FileGroup" ],
    [ "FileSize.htm", "FileSize" ],
    [ "filetypegroup.htm", "FiletypeGroup" ],
    [ "filetypegroups.htm", "FiletypeGroups" ],
    [ "FolderEnum.htm", "FolderEnum" ],
    [ "FontMeta.htm", "FontMeta" ],
    [ "Format.htm", "Format" ],
    [ "FSUtil.htm", "FSUtil" ],
    [ "Func.htm", "Func" ],
    [ "globalfilters1.htm", "GlobalFilters" ],
    [ "Image1.htm", "Image" ],
    [ "ImageMeta.htm", "ImageMeta" ],
    [ "Item.htm", "Item" ],
    [ "Lister.htm", "Lister" ],
    [ "Listers.htm", "Listers" ],
    [ "Map.htm", "Map" ],
    [ "Metadata1.htm", "Metadata" ],
    [ "Msg.htm", "Msg" ],
    [ "OtherMeta.htm", "OtherMeta" ],
    [ "Path.htm", "Path" ],
    [ "Progress.htm", "Progress" ],
    [ "QuickFilter.htm", "QuickFilter" ],
    [ "Rect.htm", "Rect" ],
    [ "Results.htm", "Results" ],
    [ "ScriptColumn.htm", "ScriptColumn" ],
    [ "ScriptCommand.htm", "ScriptCommand" ],
    [ "ScriptConfig.htm", "ScriptConfig" ],
    [ "ScriptStrings.htm", "ScriptStrings" ],
    [ "ShellProperty.htm", "ShellProperty" ],
    [ "SmartFavorite.htm", "SmartFavorite" ],
    [ "SmartFavorites2.htm", "SmartFavorites" ],
    [ "SortOrder.htm", "SortOrder" ],
    [ "StringTools.htm", "StringTools" ],
    [ "StringSet.htm", "StringSet" ],
    [ "SysInfo.htm", "SysInfo" ],
    [ "Tab.htm", "Tab" ],
    [ "TabGroup.htm", "TabGroup" ],
    [ "TabGroups.htm", "TabGroups" ],
    [ "TabGroupTabEntry.htm", "TabGroupTabEntry" ],
    [ "TabGroupTabList.htm", "TabGroupTabList" ],
    [ "TabStats.htm", "TabStats" ],
    [ "Toolbar1.htm", "Toolbar" ],
    [ "Toolbars3.htm", "Toolbars" ],
    [ "UnorderedSet.htm", "UnorderedSet" ],
    [ "Var.htm", "Var" ],
    [ "Vars.htm", "Vars" ],
    [ "Vector.htm", "Vector" ],
    [ "Version.htm", "Version" ],
    [ "VideoMeta.htm", "VideoMeta" ],
    [ "Viewer11.htm", "Viewer" ],
    [ "Viewers.htm", "Viewers" ],
    [ "Wild.htm", "Wild" ],
    [ "WinVer.htm", "WinVer" ]
]);

let arrObjectNames = Array.from(mapHrefToObjectName.values());

(function() {
    'use strict';

    String.prototype.normalizeWhitespace = function() {
        return this
            .replace(/&nbsp;/g, ' ')
            .replace(/\r\n|\r|\n/g, ' ')
            .replace(/^\s+/mg, '')
            .replace(/\s+$/mg, '')
            .replace(/\s+/, ' ');
    }
    String.prototype.normalizeHTML = function() {
        return this
            .replace(/\r\n|\r|\n/g, ' ')
            .replace(/<![^>]+>/g, '')
            .replace(/<(?!\/?(a|strong|br|b))[^>]+>/g, '')
            .replace(/>\s*</g, '><')
            .replace(/\s+/g, ' ')
            .replace(/<([^>]+)>/, '<$1>'.toLowerCase())
            .normalizeWhitespace();
    }
    String.prototype.stripHTML = function() {
        return this
            .replace(/<.+?>/g, ' ')
            .normalizeWhitespace();
    }

    let $ = window.jQuery;

    let reArgsTypeExtractor = /<([^:]+):([^>]+)>/m;
    const DEFAULT_VALUE_PROPERTY = '<default value>';
    const OBJECT_PREFIX = 'DOpus'; // 'DOpusObjectPrefix__';
    const UPPER_CASE_METHOD_PREFIX = ''; // 'DOpusMethodUpperCase__';
    const LOWER_CASE_METHOD_PREFIX = ''; // 'DOpusMethodLowerCase__';

    function translateType(str) {
        let stripped = str.stripHTML();
        let typesCombined = stripped;

        // some return values are concatenated by 'or'
        // we will split them and try to translate each token
        let typesArr = typesCombined.split(/\W+or\W+/mg);
        let translatedTypesArr = [];
        let type;
        let isVector, isCollection, isDOpusObject;


        for (type of typesArr){
            type = type.trim();
            if (type.match(/&(lt|gt);/)) {
                type = type.replace(/&(lt|gt);/g, ''); // only for Rect object so far
            }
            if (type.indexOf('byte, byte') !== -1) {
                type = 'byte'; // only DOpusFactory object so far
            }
            isVector = false;
            isCollection = false;
            isDOpusObject = false;
            // check if we have an object
            if (type.indexOf('Vector') !== -1) {
                isVector = true;
                // split the string and change the type to the part after :
                // we will check if the type is a DOpus object or not below
                if (type.split(':').length > 1) {
                    type = type.split(':')[1].trim(); // Vector:string
                } else {
                    type = 'variant';
                }
            }
            if (type.indexOf('collection') !== -1) {
                isCollection = true;
                type = type.split(':')[1].trim();
            }
            // the first/regex part of the if below is for occassionally non-linked DOpus objects
            if (type.match(/Blob|Favorite|Currency|FileSize|FiletypeGroups|Path|Tab/i) || arrObjectNames.includes(type)) {
                isDOpusObject = true;
            }
            // the 2 tables for properties & methods are constructed slightly differently,
            // the Vector in the regexp below is not needed for method table
            // since we already checked it above but it is needed for the properties table
            if (type.match(/(object|Vector|collection)\s*(:|\()/)) {
                // type = stripped.slice(7);
                if (type.split(':')[1]) {
                    type = type.split(':')[1].trim(); // Vector:string
                } else {
                    type = type.split('(')[1].trim(); // Vector(string)
                }

                if (str.match(new RegExp('<a.+?>' + type + '<'))) {
                    // it is already a DOpus object, no need to check further
                    type = OBJECT_PREFIX + type;
                    if (isVector) {
                        return OBJECT_PREFIX + 'Vector<' + type+ '>';
                    } else if (isCollection) {
                        return type + '<T: any>';
                    } else {
                        return type;
                    }
                }
                // it's not a DOpus object, we will continue & translate the 2nd part below
            }
            if (type && isDOpusObject) {
                translatedTypesArr.push(OBJECT_PREFIX + type);
            } else {
                // switch(stripped.toLowerCase()) {
                switch(type.trim().toLowerCase()) {
                    case 'array(string)': translatedTypesArr.push('string[]'); break; // only in Dialog so far
                    case 'array(bool': translatedTypesArr.push('boolean[]'); break; // only in Dialog so far
                    case 'array(int': translatedTypesArr.push('number[]'); break; // only in Dialog so far
                    case 'byref string': translatedTypesArr.push('string'); break; // only in Dialog so far
                    case 'bool': translatedTypesArr.push('boolean'); break;
                    case 'int': translatedTypesArr.push('number'); break;
                    case 'int:index': translatedTypesArr.push('number'); break; // only in SysInfo.Monitors so far
                    case 'index': translatedTypesArr.push('number'); break; // only in DialogListItem so far
                    case 'byte': translatedTypesArr.push('number'); break;
                    case 'date': translatedTypesArr.push('Date'); break;
                    case 'string': translatedTypesArr.push('string'); break;
                    case 'object': translatedTypesArr.push('object'); break;
                    case 'variant': translatedTypesArr.push('any'); break;
                    case 'none': translatedTypesArr.push('void'); break;
                    case 'safearray of vt_ui1': translatedTypesArr.push('object'); break; // ignore, not usable by JS anyways
                    case 'safearray of vt_variant': translatedTypesArr.push('object'); break; // ignore, not usable by JS anyways
                    default:
                        debugger;
                        throw new Error('unrecognized type XXX: (' + str + ')');
                }
            }
        }
        type = translatedTypesArr.join('|');
        if (isVector) {
            return OBJECT_PREFIX + 'Vector<' + type+ '>';
        } else {
            return type;
        }
    }

    function translateArgumentTypes(str) {
        let allArgs = [];
        let parts;
        while(parts = str.match(reArgsTypeExtractor)) {
            allArgs.push({ name: parts[2], type: translateType(parts[1]) });
            str = str.replace(parts[0], '');
        }
        return allArgs;
    }



    function fnParseP(elj) {
        // extract the object name (assumed: first strong-ed name)
        let commandName, relatedCommandArr, commandDescriptionHTML, commandDescriptionText;
        let relatedCommands = new Set();

        // remove everything except a & strong tags, and normalize the remaining tags
        commandDescriptionHTML = elj.html().normalizeHTML();
        commandDescriptionText = commandDescriptionHTML.stripHTML();

        // find linked objects in the same directory
        // the scripting objects are all in one directory in the decompiled sources: dopus/Documents/Scripting/....
        let linkedChildren = elj.find('a');

        let currentFileURL = window.location.href.replace(/.+\/([^/]+)$/g, '$1');
        commandName = mapHrefToObjectName.get(currentFileURL);
        if (!commandName) {
            debugger;
        }

        linkedChildren.each((index, elD) => {
            let eljj = $(this);
            relatedCommandArr = elD.outerHTML.match(/href="(?!\.\.)(.+)\.htm/);
            if (relatedCommandArr && relatedCommandArr.length === 2) {
                relatedCommands.add(elD.innerText.trim());
            }
        });
        return { name: commandName, related: relatedCommands, descriptionHTML: commandDescriptionHTML, descriptionText: commandDescriptionText };
    }

    function fnParsePropertiesTable(elj) {
        // the properties table consists of 3 columns: name, type, description
        let outObj = new Map(), allRows = elj.find('tr');

        for (let row of allRows) {
            let cols = $(row).find('td');
            if (!cols.length) continue;
            if (cols.length !== 3 && DEBUG_LEVEL) {
                debugger; continue;
            }
            let name = $(cols[0]).text().normalizeWhitespace();
            let type;
            // only ScriptColumn.graph_threshold & ScriptColumn.namerefresh so far
            if (name === 'graph_threshold') {
                type = 'number';
            } else if(name === 'namerefresh') {
                type = 'boolean';
            } else {
                type = translateType( $(cols[1]).html() );
            }
            let desc = $(cols[2]).text().normalizeWhitespace();
            outObj.set(name, { type: type, desc: desc });
        }
        return outObj;
    }

    function fnParseMethodsTable(elj, elDom) {
        // the methods table consists of 4 columns: name, arguments, return type, description
        let outObj = new Map(), allRows = elj.find('tr');

        for (let row of allRows) {
            let cols = $(row).find('td');
            if (!cols.length) continue;
            if (cols.length !== 4) {
                // some header lines erroneously include td's ignore them but stop otherwise
                if ($(row).find('th').length === 0 && DEBUG_LEVEL) {
                    debugger;
                }
                continue;
            }
            let name = $(cols[0]).text().normalizeWhitespace();
            let args = translateArgumentTypes( $(cols[1]).text() );
            let type = translateType( $(cols[2]).html().normalizeHTML() );
            let desc = $(cols[3]).text().normalizeHTML();

            outObj.set(name, { args: args, type: type, desc: desc });
        }
        return outObj;
    }

    function downloadGenerated(contents, filename) {
        let outfile = new Blob([contents], {type: 'text/x.typescript'});
        let href = window.URL.createObjectURL(outfile);
        let link = '<a id="dtsdownload" download="' + filename + '" style="display: none !important;" href="' + href + '">dummy</a>';
        // $(link).insertBefore($('body').children()[0]).trigger('click'); // doesn't work
        // $(link).insertBefore($('body').children()[0]).click(); // doesn't work
        $(link).insertBefore($('body').children()[0])[0].click(); // the last [0] does the trick, otherwise doesn't work for me
    }

    function fnMain() {
        // $('#nsbanner').css('display', 'none');
        let headers = $('#nsbanner').find(":header");
        headers.each(function(index, elDom){
            elDom.outerHTML = elDom.outerHTML.replace(/<(\/?)h[1-6]/g, '<$1h3');
        });

        let mainBlock = $('#nstext'); mainBlock.css('overflow', 'unset');
        let currentDOSO = {};
        mainBlock.children().each(function(index, elDom){
            if (elDom.innerText.trim() === '') return;
            let elj = $(this);
            let tag = elDom.tagName.toLowerCase();

            switch(tag) {
                case 'p':
                case 'ol':
                case 'ul':
                case 'li':
                case 'blockquote':
                case 'h5':
                    // normal text
                    if (!currentDOSO.name) {
                        currentDOSO = fnParseP(elj);
                    } else {
                        if (tag === 'ol' || tag === 'ul') {
                            currentDOSO.descriptionHTML += '\n<'+tag+'>\n';
                            for(let li of $(elj).find('li')) {
                                let nextBlock = fnParseP($(li));
                                currentDOSO.descriptionHTML += '<li>' + nextBlock.descriptionHTML + '</li>\n';
                                currentDOSO.descriptionText += '\n\n * ' + nextBlock.descriptionText;
                            }
                            currentDOSO.descriptionHTML += '</'+tag+'>';
                        } else {
                            let nextBlock = fnParseP(elj);
                            currentDOSO.descriptionHTML += '<br/>\n' + nextBlock.descriptionHTML;
                            currentDOSO.descriptionText += '\n\n' + nextBlock.descriptionText;
                        }
                    }
                    break;
                case 'table':
                    // listing
                    if (!currentDOSO.props) {
                        // these have no properties table
                        if (currentDOSO.name.match(/AddCmdData|AddColData|DialogListColumns|DOpusFactory|FSUtil|GetHelpContentData|SortOrder|StringTools|TabGroups/)) {
                            currentDOSO.methods = fnParseMethodsTable(elj);
                        } else if (currentDOSO.name === 'Vars') {
                            debugger;
                            return;
                        } else if (currentDOSO.name === 'Dialog') {
                            debugger;
                            currentDOSO.props = fnParsePropertiesTable(elj);
                            return;
                        } else {
                            currentDOSO.props = fnParsePropertiesTable(elj);
                            return;
                        }
                    }
                    if (!currentDOSO.methods) {
                        currentDOSO.methods = fnParseMethodsTable(elj);
                        return;
                    }
                    break;
                default:
                    debugger;
                    // nothing found, unrecognized
                    throw new Error('not recognized yet');
            }
        });
        Util.log('Result:\n' + JSON.stringify(currentDOSO, null, 4) );

        // we have all the data now
        // generate the output
        let out = '';
        let extendsClass = '';

        // check if the first property is <default value> or not
        // in that case we need to extend String
        if (currentDOSO.props && currentDOSO.props.has(DEFAULT_VALUE_PROPERTY)) {
            extendsClass = currentDOSO.props.get(DEFAULT_VALUE_PROPERTY).type;
            extendsClass = extendsClass[0].toUpperCase() + extendsClass.slice(1);
        }
        let relatedHelperArr = Array.from(currentDOSO.related, rel => ' * @see {' + OBJECT_PREFIX + rel + '}');
        out += '/**\n * ' + currentDOSO.descriptionText + '\n'
        out += relatedHelperArr.join('\n');
        if (extendsClass) {
            out += '\n *\n * @returns {' + currentDOSO.props.get(DEFAULT_VALUE_PROPERTY).type + '} ' + currentDOSO.props.get(DEFAULT_VALUE_PROPERTY).desc;
            currentDOSO.props.delete(DEFAULT_VALUE_PROPERTY);
        }
        out += '\n */\n';

        out += 'interface ' + OBJECT_PREFIX + currentDOSO.name.trim() + (extendsClass ? ' extends ' + extendsClass : '') +' {\n\n';

        if (currentDOSO.props) {
            for (let [prop, attr] of currentDOSO.props) {
                out += '\t/** ' + attr.desc + ' */\n';
                out += '\treadonly ' + prop + ': ' + attr.type + ';\n\n';
            }
        }
        if (currentDOSO.methods) {
            for (let [name, attr] of currentDOSO.methods) {
                let argsHelperArr = [];
                for (let arg of attr.args) {
                    argsHelperArr.push( arg.name + '?: ' + arg.type );
                }
                // add case-sensitive version;
                out += '\t/**\n\t *' + attr.desc + '\n\t */\n';
                out += '\t' + UPPER_CASE_METHOD_PREFIX + name + '(';
                out += argsHelperArr.join(', ');
                out += '): ' + attr.type + ';\n\n';

                // add lower-case version;
                out += '\t/**\n\t *' + attr.desc + '\n\t */\n';
                out += '\t' + LOWER_CASE_METHOD_PREFIX + name.toLowerCase() + '(';
                out += argsHelperArr.join(', ');
                out += '): ' + attr.type + ';\n\n';
            }
        }

        out += '}\n\n';
        // Util.log('\n' + out);
        console.log('\n' + out);
        downloadGenerated(out, currentDOSO.name + '.d.ts');
    }

    fnMain();

})();
