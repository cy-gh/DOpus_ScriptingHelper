type DOpusCurrency = number;

/**
 * If a script add-in provides an OnAboutScript method, it is passed an AboutData object when invoked via the user clicking the About button in Preferences.
 *
 * @see {DOpusOnAboutScript}
 */
interface DOpusAboutData {

	/**
	 * This is a handle to the parent window that the script should use if displaying a dialog via the Dialog object. Even though this is not a Lister or Tab, it can still be assigned to the Dialog.window property to set the parent window of the dialog.
	 */
	readonly window: number;

}

/**
 * If a script add-in implements the OnActivateLister event, the method receives an ActivateListerData whenever the window activation state of a Lister changes.
 *
 * @see {DOpusOnActivateLister}
 */
interface DOpusActivateListerData {

	/**
	 * Returns True if this Lister is activating, False if deactivating. Note that if the activation moves from one Lister straight to another the script will be called twice.
	 */
	readonly active: boolean;

	/**
	 * Returns  a Lister object object representing the Lister that is closing.
	 */
	readonly lister: DOpusLister;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: shift ctrl, alt, lwin, rwin
	 *
	 * If no qualifiers were down, the string will be: none
	 */
	readonly qualifiers: string;

}

/**
 * If a script add-in implements the OnActivateTab event, the method receives an ActivateTabData object whenever the activation state of a tab changes.
 *
 * @see {DOpusOnActivateTab}
 */
interface DOpusActivateTabData {

	/**
	 * Returns a Tab object representing the tab that has become active.
	 */
	readonly newTab: DOpusTab;

	/**
	 * Returns a Tab object representing the tab that has gone inactive.
	 */
	readonly oldTab: DOpusTab;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: shift ctrl, alt, lwin, rwin
	 *
	 * If no qualifiers were down, the string will be: none
	 */
	readonly qualifiers: string;

}

/**
 * The AddCmdData object is passed to the OnAddCommands event in a script add-in . The script can use this to add internal commands using the AddCommand method.
 *
 * @see {DOpusOnAddCommands}
 */
interface DOpusAddCmdData {

	/**
	 * Adds a new internal command to Opus. The returned ScriptCommand object must be properly initialized. A script add-in can add as many internal commands as it likes to the Opus internal command set.
	 */
	addCommand(): DOpusScriptCommand;

}

/**
 * The AddColData object is passed to the OnAddColumns event in a script add-in . The script can use this to add columns using the AddColumn method.
 */
interface DOpusAddColData {

	/**
	 * Adds a new information column to Opus. The returned ScriptColumn object must be properly initialized. A script add-in can add as many columns as it likes, and these will be available in file displays, infotips and the Advanced Find function.
	 */
	addColumn(): DOpusScriptColumn;

}

/**
 * If a script add-in implements the OnAfterFolderChange event, the method receives an AfterFolderChangeData object once the folder read is complete.
 *
 * @see {DOpusOnAfterFolderChange}
 */
interface DOpusAfterFolderChangeData {

	/**
	 * Returns a string indicating the action that triggered the folder read. The string will be one of the following: * **normal, refresh, refreshsub, parent, root, back, forward, dblclk.**
	 *
	 * The refreshsub actions means the folder (and sub-folders) are being refreshed while Flat View is on. The other action names should be self-explanatory.
	 */
	readonly action: string;

	/**
	 * If the read failed, this will return a Path object representing the path that Opus tried to read.
	 *
	 * If the read was successful, this property is not provided - instead, the tab property provides access to this information.
	 *
	 * Use the result **property** to know if the read was a success.
	 */
	readonly path: DOpusPath;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: shift ctrl, alt, lwin, rwin
	 *
	 * If no qualifiers were down, the string will be: none
	 */
	readonly qualifiers: string;

	/**
	 * Returns True if the folder was read successfully, or False on failure.
	 */
	readonly result: boolean;

	/**
	 * Returns a Tab object representing the tab that read the folder.
	 */
	readonly tab: DOpusTab;

}

/**
 * An Alias object represents a defined folder alias . It is retrieved by enumerating or indexing the Aliases object.
 *
 * @see {DOpusAliases}
 *
 * @returns {string} Returns the name of the alias.
 */
interface DOpusAlias extends String {

	/**
	 * Returns the target of the alias as a Path object.
	 */
	readonly path: DOpusPath;

	/**
	 * True if the object is a system-defined alias, False if it is user defined.
	 */
	readonly system: boolean;

}

/**
 * The Aliases object holds a collection of all the defined folder aliases . It is retrieved from the DOpus .aliases method.
 *
 * @see {DOpusConstructor}
 *
 * @returns {DOpusAlias} You can enumerate the Aliases object, or query the value of an individual alias by name (e.g. DOpus.Output(DOpus.aliases("desktop").path);)
 */
// interface DOpusAliases extends DOpusAlias {
interface DOpusAliases {

	// // new <T = any>(safearray: SafeArray<T>): Enumerator<T>;
	// // new <T = any>(collection: { Item(index: any): T }): Enumerator<T>;
	// // new <T = any>(collection: any): Enumerator<T>;
	// new <T = any>(safearray: SafeArray<DOpusAlias>): Enumerator<DOpusAlias>;
	// new <T = any>(collection: { Item(index: any): DOpusAlias }): Enumerator<DOpusAlias>;
	// new <T = any>(collection: DOpusAlias): Enumerator<DOpusAlias>;

	/**
	 * Adds a new alias to the system with the specified name and path. Note that you should not provide the leading forward-slash (/) in the alias name.
	 */
	add(name?: string, path?: string): void;

	/**
	 * Deletes the specified alias.
	 */
	delete(name?: string): void;

	/**
	 * Updates the state of this object. When the Aliases object is first retrieved via DOpus.aliases, a snapshot is taken of the aliases at that time. If you make changes via the object it will reflect them but any changes made outside the script (e.g. via the Favorites ADD=alias command) will not be detected unless you call the Update method.
	 */
	update(): void;

}

interface DOpusArgsHelper {
	/**
	 * The got_arg property returns an object with a bool child property for each argument in the template. It lets you test if a particular argument was provided on the command line, before you actually query for the value of the argument. For example, If Args.got_arg.size Then...
	 */
	readonly [key: string]: boolean;
}
/**
 * The Args object is passed to a script when it is invoked via a command, via the Func .args property. It is used when a command added by a script has a command line template and provides access to any arguments provided on the command line.
 *
 * @see {DOpusFunc}
 */
interface DOpusArgs {

	/**
	 * The Args object will have one property corresponding to each of the arguments in the command line template.
	 *
	 * For example, if the command line template is NAME/K,SIZE/N, the Args object would have two properties, called name and size.
	 *
	 * The type returned by each property is also defined by the template. In the above example, name would return a string and size an int.
	 *
	 * A /S argument returns a bool, a /N argument returns an int, and all other argument types return a string. Note that a /O argument will also return a bool if no string value is provided on the command line.
	 *
	 * If an argument is marked in the template as /M (multiple) then it returns a Vector containing elements of the appropriate type.
	 *
	 * If an argument was not provided on the command line by the user, its property will either return bool (for a /S or /O argument), or an empty variant otherwise. */
	// readonly [key: string]: boolean | number | string | DOpusVector<boolean | number | string>;
	readonly [key: string]: boolean | number | string | DOpusVector<boolean | number | string> | DOpusArgsHelper;

	/**
	 * The got_arg property returns an object with a bool child property for each argument in the template. It lets you test if a particular argument was provided on the command line, before you actually query for the value of the argument. For example, If Args.got_arg.size Then...
	 */
	readonly got_arg: DOpusArgsHelper;

}


/**
 * The AudioCoverArt object provides access to an audio file's embedded cover art. It is obtained through the AudioMeta .coverart property.
 *
 * @see {DOpusAudioMeta}
 *
 * @returns {string} Returns a string indicating the intended use for this cover art. Possible values are:
 *
 * *artist, back, band, bandlogo, colorfulfish* (this is unfortunately part of the ID3 specification), *composer, conductor, front, icon, illustration, leadartist, leaflet, location, lyricist, media, other, otherfileicon, performance, publisherlogo, recording, vidcap.*
 */
interface DOpusAudioCoverArt extends String {

	/**
	 * Returns a Blob object representing the actual image data.
	 */
	readonly data: DOpusBlob;

	/**
	 * Returns the bit depth of this image.
	 */
	readonly depth: number;

	/**
	 * Returns the description of this image (if any).
	 */
	readonly desc: string;

	/**
	 * Returns the default file extension for this image, if it can be determined.
	 */
	readonly ext: string;

	/**
	 * Returns the height of this image, in pixels.
	 */
	readonly height: number;

	/**
	 * Returns the image's MIME type, if specified in the file.
	 */
	readonly mime: string;

	/**
	 * Returns a FileSize object representing the size of the image data.
	 */
	readonly size: DOpusFileSize;

	/**
	 * Returns a "pretty" form of the intended use string (i.e. the default value), translated to the current Opus user interface language.
	 */
	readonly type: string;

	/**
	 * Returns the width of this image, in pixels.
	 */
	readonly width: number;

}

/**
 * The AudioMeta object is retrieved from the Metadata .audio or Metadata .audio_text properties. It provides access to metadata relating to sound files.
 *
 * @see {DOpusMetadata}
 */
interface DOpusAudioMeta {

	/**
	 * Album
	 */
	readonly mp3Album: any;

	/**
	 * Album artist
	 */
	readonly mp3AlbumArtist: any;

	/**
	 * Artists
	 */
	readonly mp3Artist: any;

	/**
	 * Audio codec
	 */
	readonly audioCodec: any;

	/**
	 * Audio codec
	 */
	readonly mp3Type: any;

	/**
	 * BPM
	 */
	readonly mp3Bpm: any;

	/**
	 * Bit depth
	 */
	readonly picDepth: any;

	/**
	 * Bit rate
	 */
	readonly mp3Bitrate: any;

	/**
	 * Compilation
	 */
	readonly compilation: any;

	/**
	 * Composers
	 */
	readonly composers: any;

	/**
	 * Conductors
	 */
	readonly conductors: any;

	/**
	 * Copyright
	 */
	readonly copyright: any;

	/**
	 * Disc number
	 */
	readonly mp3Disc: any;

	/**
	 * Disc number
	 */
	readonly mp3Disk: any;

	/**
	 * Duration
	 */
	readonly mp3SongLength: any;

	/**
	 * Encoded by
	 */
	readonly mp3Encoder: any;

	/**
	 * Encoding Software
	 */
	readonly mp3EncodingSoftware: any;

	/**
	 * Genre
	 */
	readonly mp3Genre: any;

	/**
	 * Initial key
	 */
	readonly initialKey: any;

	/**
	 * Mode
	 */
	readonly mp3Mode: any;

	/**
	 * Music comment
	 */
	readonly mp3Comment: any;

	/**
	 * Music info
	 */
	readonly mp3Info: any;

	/**
	 * Music title
	 */
	readonly mp3Title: any;

	/**
	 * Protected
	 */
	readonly mp3Drm: any;

	/**
	 * Release date
	 */
	readonly releaseDate: any;

	/**
	 * Sample rate
	 */
	readonly mp3Samplerate: any;

	/**
	 * Track number
	 */
	readonly mp3Track: any;

	/**
	 * Year
	 */
	readonly mp3Year: any;

	/**
	 * Returns a collection of AudioCoverArt objects representing any cover art imagery stored in the audio file.
	 *
	 * The default value of this property returns the number of cover art images - for performance reasons, you should check whether this is greater than 0 before enumerating or accessing individual items in the collection.
	 */
	readonly coverArt: DOpusAudioCoverArt;
}

/**
 * If a script add-in implements the OnBeforeFolderChange event, the method receives a BeforeFolderChangeData object before the new folder is read.
 * @see {DOpusOnBeforeFolderChange}
 */
interface DOpusBeforeFolderChangeData {

	/**
	 * Returns a string indicating the action that triggered the folder read. The string will be one of the following: normal, refresh, refreshsub, parent, root, back, forward, dblclk.
	 *
	 * The refreshsub actions means the folder (and sub-folders) are being refreshed while Flat View is on. The other action names should be self-explanatory.
	 */
	readonly action: string;

	/**
	 * Returns True if this is the first path to be read into this tab (i.e. previously the tab was empty).
	 */
	readonly initial: boolean;

	/**
	 * Returns a Path object representing the new path that is to be read.
	 */
	readonly path: DOpusPath;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: shift ctrl, alt, lwin, rwin
	 *
	 * If no qualifiers were down, the string will be: none
	 */
	readonly qualifiers: string;

	/**
	 * Returns a Tab object representing the tab that is changing folder.
	 */
	readonly tab: DOpusTab;

}

/**
 * A Blob object represents a chunk of binary data. Scripting languages like VBScript and JScript have no built-in support for binary data - this object can be used to allocate a chunk of memory and manipulate it in a similar way to low-level languages like C. You can use Blob objects in conjunction with the File object to read or write binary data from or to disk files.
 *
 * Blob objects are convertible to and from two types of ActiveX arrays - a SAFEARRAY of type VT_UI1 (known as an array ) and a SAFEARRAY of type VT_VARIANT, with each variant holding a VT_UI1 (known as a VB array ). You can initialize a Blob with either of these two types of array (either when creating it via the DOpusFactory.Blob method or with the Blob.CopyFrom method), and you can also convert a Blob back to an array with the ToArray and ToVBArray methods. Support for these array types is dependent on the scripting language.
 *
 * You can read and write individual bytes within the Blob by indexing the byte offset starting from 0. For example, my_blob(5) = 128 would set the value of the sixth byte in the blob to 128.
 *
 * @see {DOpusFile}
 */
interface DOpusBlob {

	/**
	 * Returns a FileSize object representing the size of this Blob in bytes.
	 */
	readonly size: DOpusFileSize;

	/**
	 * Compares the contents of this Blob against another Blob (or array). By default the entire contents of the two blobs are compared. The optional parameters that let you configure the operation are:
	 *
	 * * **to** - specifies the byte offset within this Blob to compare against. Defaults to 0.
	 * * **from** - specifies the byte offset within the source Blob to compare with. Defaults to 0.
	 * * **size** - specifies the number of bytes to compare. Defaults to the full size of the source Blob.
	 *
	 * The return value is 0 if the two blobs are the same. A value of -1 indicates this blob is less than the other blob, and 1 indicates this blob is greater than the other blob.
	 */
	compare(source?: DOpusBlob, to?: number, from?: number, size?: number): number;

	/**
	 * Copies data from the source Blob (or array) into this Blob. By default the entire contents of the source Blob will be copied over the top of this one. The optional parameters that let you configure the operation are:
	 *
	 * * **to** - specifies the byte offset within this Blob to copy to. Defaults to 0.
	 * * **from** - specifies the byte offset within the source Blob to copy from. Defaults to 0.
	 * * **size** - specifies the number of bytes to copy. Defaults to the full size of the source Blob.
	 *
	 * As well as copying from another Blob, you can use this method to initialise a Blob from a string. By default the Blob will be set to the Unicode form of the string; if you pass "utf8" as the second parameter it will initialise the Blob with the UTF8-encoded form of the string.
	 *
	 * If this Blob is not currently large enough to contain the copied data it will be resized automatically.
	 */
	copyFrom(sourceOrString?: DOpusBlob | string, toOrType?: number | string, from?: number, size?: number): void;

	/**
	 * Searches the contents of this Blob for the data contained in another Blob (or array). By default the entire contents of this Blob are searched. The optional from parameter lets you specify the starting position for the search, and the optional size parameter lets you specify the length of data in this Blob to search through.
	 *
	 * The return value is -1 if the search data were not found, otherwise the offset from the start of the Blob data is returned.
	 */
	find(search?: DOpusBlob, from?: number, size?: number): DOpusFileSize;

	/**
	 * Frees the memory associated with this Blob and resets its size to 0.
	 */
	free(): void;

	/**
	 * Initialises the contents of the Blob (every byte within the blob will be set to 0). Equivalent to Set(0).
	 */
	init(): void;

	/**
	 * Resizes the Blob to the specified number of bytes.
	 */
	resize(size?: number): void;

	/**
	 * Reverses the contents of the Blob.
	 */
	reverse(): void;

	/**
	 * Sets the contents of the Blob to the specified byte value (every byte within the blob will be set to that value). By default the whole Blob will be affected. The option to parameter lets you specify a byte offset to start at, and the optional size parameter lets you control the number of bytes affected.
	 */
	set(value?: number, to?: number, size?: number): void;

	/**
	 * Converts the contents of this Blob to a SAFEARRAY of type VT_UI1. By default the entire contents of the Blob will be copied to the array. The optional parameters that let you configure the operation are:
	 *
	 * * **from** - specifies the byte offset within the source Blob to copy from. Defaults to 0.
	 * * **size** - specifies the number of bytes to copy. Defaults to the full size of the source Blob.
	 */
	toArray(from?: number, size?: number): object;

	/**
	 * Converts the contents of this Blob to a SAFEARRAY of type VT_VARIANT. Each variant in the array contains a VT_UI1. By default the entire contents of the Blob will be copied to the array. The optional parameters that let you configure the operation are:
	 * * **from** - specifies the byte offset within the source Blob to copy from. Defaults to 0.
	 * * **size** - specifies the number of bytes to copy. Defaults to the full size of the source Blob.
	 */
	toVBArray(from?: number, size?: number): object;

}

/**
 * A BusyIndicator object lets you control the breadcrumbs bar busy indicator from your script.
 *
 * By default a busy indicator simply indicates that something is happening; it can also be used to indicate the progress of a job (percentage complete from 0% to 100%). The user can click the spinning circle to see a description of the jobs that are running, and each job can optionally allow the user to abort it by displaying an Abort link they can click.
 *
 * BusyIndicator objects are created using the DOpusFactory.BusyIndicator method. The basic steps for using one in your script are:
 *
 * 1. Create the object by calling DOpus.Create.BusyIndicator() .
 *
 * 2. Optionally set the abort property to True to enable user aborting.
 *
 * 3. Call the Init method to initialize and display the busy indicator.
 *
 * 4. Call the Update method when needed to update the progress or explanatory text.
 *
 * 5. Poll the abort property to check for user abort if desired.
 *
 * 6. Call the Destroy method to remove the busy indicator when the job is complete.
 */
interface DOpusBusyIndicator {

	/**
	 * Before the Init method has been called, you can set this property to True to enable abort by the user (as shown above). After Init has been called, this property will return True if the user has clicked the Abort link.
	 */
	readonly abort: boolean;

	/**
	 * Removes the busy indicator from display and destroys its internal data structures. The BusyIndicator object itself can be re-used by calling the Init method again.
	 */
	destroy(): void;

	/**
	 * Removes the busy indicator from display, but does not destroy its internal data. The indicator can be re-displayed by calling the Show method.
	 */
	hide(): void;

	/**
	 * Initializes a BusyIndicator object and optionally displays it. The window parameter specifies the Lister that the indicator is to be attached to - you can pass either a Lister or a Tab object.
	 *
	 * The optional description parameter lets you specify a text string that is displayed to the user when they click the spinning circle.
	 *
	 * The optional visible parameter lets you make the indicator visible immediately by passing True. Alternatively, call the Show method to make the indicator visible.
	 */
	init(window?: object, description?: string, visible?: boolean): boolean;

	/**
	 * Displays the busy indicator.
	 */
	show(): void;

	/**
	 * Updates the busy indicator. The description parameter lets you specify a new description string, and the optional percentage parameter lets you specify a new percentage complete value from 0 to 100.
	 */
	update(description?: string, percentage?: number): void;

}

/**
 * The ClickData object is passed to the OnClick method in a script function.
 * @see {DOpusOnClick}
 */
interface DOpusClickData {

	/**
	 * Returns a Func object relating to this function. This provides access to information about the function's environment - (source and destination tabs, qualifier keys, etc).
	 */
	readonly func: DOpusFunc;

}

/**
 * If a script add-in implements the OnCloseLister event, the method receives a CloseListerData object before a Lister is closed.
 * @see {DOpusOnCloseLister}
 */
interface DOpusCloseListerData {

	/**
	 * Returns a Lister object representing the Lister that is closing.
	 */
	readonly lister: DOpusLister;

	/**
	 * Set this to True to prevent the closing Lister from being saved as the new default Lister.
	 */
	readonly prevent_save: boolean;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: none
	 */
	readonly qualifiers: string;

	/**
	 * Returns True if the Lister is closing because Opus is shutting down.
	 */
	readonly shutdown: boolean;

}

/**
 * If a script add-in implements the OnCloseTab event, the method receives a CloseTabData object when a tab is closed.
 * @see {DOpusOnCloseTab}
 */
interface DOpusCloseTabData {

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: none
	 */
	readonly qualifiers: string;

	/**
	 * Returns a Tab object representing the tab that is closing.
	 */
	readonly tab: DOpusTab;

}

/**
 * The Column object represents an information column displayed in a tab (e.g. name, size, attributes, etc). A collection of Column objects can be retrieved from the Format .columns property.
 * @see {DOpusFormat}
 *
 * @returns {string} Returns the name of the column.
 */
interface DOpusColumn extends String {

	/**
	 * Returns True if the column width is set to auto.
	 */
	readonly autosize: boolean;

	/**
	 * Returns True if the column width is set to collapse.
	 */
	readonly collapse: boolean;

	/**
	 * Returns True if the column width is set to expand.
	 */
	readonly expand: boolean;

	/**
	 * Returns True if the column width is set to fill.
	 */
	readonly fill: boolean;

	/**
	 * Returns the name of the column as displayed in the Lister column header.
	 */
	readonly header: string;

	/**
	 * Returns the name of the column as displayed in the Columns tab in the Folder Options dialog.
	 */
	readonly label: string;

	/**
	 * Returns the maximum width of the column in pixels, or the string "fill" if the maximum is set to fill.
	 */
	readonly max: number | string;

	/**
	 * Returns the name of the column.
	 */
	readonly name: string;

	/**
	 * Returns True if the sort direction of the column is reversed.
	 */
	readonly reverse: boolean;

	/**
	 * Returns the sort order of the column (e.g. 1 for the primary sort field, 2 for the secondary sort field, etc). Returns 0 if the display is not sorted by this column.
	 */
	readonly sort: number;

	/**
	 * Returns the current display width of the column in pixels.
	 */
	readonly width: number;

}

/**
 * The Command object is used by a script to run Opus commands. Any command that you can run from a button or hotkey you can run from a script - a script can even run commands added by other scripts . Fundamentally, using the Command object is similar to configuring an Opus button. You add one or more command lines to the object just the same as you add one or more command lines to a button's function. You can tell it which files and folders to act upon, and you can use the various methods and properties of the object to modify the behavior of the command. Once the object has been initialized you can use the Run or RunCommand methods to invoke the command.
 *
 * A Command object can be created by the DOpusFactory.Command method. By default, this object has no source, destination, files to operate on, etc. - you must use the appropriate methods to configure the command before running it. You can also retrieve a Command object from the Func .command property, and in this case the source, destination, files to operate on and several other properties are pre-initialized for you.
 */
interface DOpusCommand {

	/**
	 * Set this property to False to prevent files used by this command from being deselected, and True to deselect them once the function is finished. Note that files will only be deselected if they came from a Tab object, and only then if the command is successful.
	 */
	deselect: boolean;

	/**
	 * Returns a Path object that represents the destination folder of this command. If a destination tab is set, this will be the path in the tab. You can not set this property directly - instead, use either the SetDest or SetDestTab methods to change the destination folder.
	 */
	readonly dest: DOpusPath;

	/**
	 * Returns a Tab object that represents the destination tab for this command (if it has one - not all commands require a destination). You can not set this property directly - instead, use the SetDestTab method to change the destination tab.
	 */
	readonly destTab: DOpusTab;

	/**
	 * Returns the number of items in the files collection.
	 */
	readonly fileCount: number;

	/**
	 * Returns a collection of all Item objects that represent the files and folders this command is to act upon. You can not modify this collection directly - instead you can use the various methods (ClearFiles, SetFiles, AddFile, RemoveFile, etc.) to modify the list of items to act upon.
	 */
	readonly files: DOpusItem;

	/**
	 * Returns the number of instruction lines added to the command.
	 */
	readonly lineCount: number;

	/**
	 * Returns a Progress object that you can use to display a progress indicator to the user.
	 */
	readonly progress: DOpusProgress;

	/**
	 * After every command that is run with this object, a Results object is available from this property. This provides information about the outcome of the command.
	 */
	readonly results: DOpusResults;

	/**
	 * Returns a Path object that represents the source folder of this command. If a source tab is set, this will be the path in the tab. You can not set this property directly - instead, use either the SetSource or SetSourceTab methods to change the source folder.
	 */
	readonly source: DOpusPath;

	/**
	 * Returns a Tab object that represents the source tab for this command. You can not set this property directly - instead, use the SetSourceTab method to change the source tab.
	 */
	readonly sourceTab: DOpusTab;

	/**
	 * This Vars object represents all defined variables with command scope (that are scoped to this function - e.g. that were set using the @set directive).
	 */
	readonly vars: DOpusVars;

	/**
	 * Adds the specified item to the collection of items this command is to act upon. You can pass the item's path as either a string or a Path object, and you can also pass an Item object directly.
	 *
	 * This method returns the total number of items in the collection.
	 */
	addFile(pathStringOrPathOrItem?: string | DOpusPath | DOpusItem): number;

	/**
	 * Adds the items in the specified collection to the list of items this command is to act upon. The return value is the new number of items in the collection.
	 *
	 * You can also pass a Vector of Item or Path objects, or of strings (full paths), instead of a collection.
	 */
	addFiles(): number;

	/**
	 * Adds the contents of the clipboard to the collection of items this command is to act upon. This method supports both files and file paths copied to the clipboard as text. The return value is the new number of items in the collection.
	 */
	addFilesFromClipboard(): number;

	/**
	 * Reads file paths from the contents of the specified file and adds them to the item collection. You can provide the file's path as either a string or a Path object. The file must consist of one absolute path per line.
	 *
	 * The encoding of the file is assumed to be ANSI, unless it has a BOM (byte-order-mark) at the start, or you specify the encoding argument. If you specify the encoding this must be a string equal to one of the following: utf16be, utf16le, utf8, ansi or cp:XXXX where XXXX specifies the code page number).
	 *
	 * The return value is the new number of items in the collection.
	 */
	addFilesFromFile(path?: string, encoding?: string): number;

	/**
	 * Adds the contents of the specified folder to the collection of items this command is to act upon. You can pass the folder's path as either a string or a Path object. You can also append a wildcard pattern to the path to only add files matching the specified pattern.
	 */
	addFilesFromFolder(path?: string): number;

	/**
	 * Adds the specified instruction line to the command that this object will run. The AddLine method lets you build up complicated multiple line commands - add each line in turn and then run the command using the Run method. For a single line command it is simpler to use the RunCommand method.
	 */
	addLine(instruction?: string): void;

	/**
	 * Clears all instruction lines from the command.
	 */
	clear(): void;

	/**
	 * Clears the failure flags from the Item collection. Any items that fail when a command is run will have their failed property set to True, and once this has happened the file will be skipped over by any subsequent commands. You can call this method to reset all the failure flags.
	 */
	clearFailed(): void;

	/**
	 * Clears the collection of items this command is to act upon.
	 */
	clearFiles(): void;

	/**
	 * Clears any modifiers that have been set for this command. The supported modifiers are a subset of the full list of command modifiers - see the SetModifier method for a list of these. You can also pass * to clear all modifiers that have been set.
	 */
	clearModifier(modifier?: string): void;

	/**
	 * Returns a StringSet containing the names of all the Opus commands. You can optionally filter this set by providing one or more of the following flags as an argument to the CommandList method:
	 *
	 * * **i** - internal (built-in) commands
	 * * **s** - script commands
	 * * **u** - user commands
	 */
	commandList(types?: string): DOpusStringSet;

	/**
	 * Creates a new Dialog object, that lets you display dialogs and popup menus. The dialog's window property will be automatically assigned to the source tab.
	 */
	dlg(): DOpusDialog;

	/**
	 * Returns a Map of the modifiers that have been set for this command (either by the SetModifier method, or in the case of script add-ins any modifiers that were set on the button that invoked the script).
	 */
	getModifiers(): DOpusMap;

	/**
	 * Returns True if the specified Set command condition is true. This is the equivalent of the @ifset command modifiers. The optional second parameter lets you test a condition based on a command other than Set - for example, IsSet("VIEWERCMD=mark", "Show") in the viewer to test if the current image is marked.
	 */
	isSet(condition?: string, command?: string): boolean;

	/**
	 * Removes the specified file from the Item collection. You can pass the file's path as either a string or a Path object. You can also pass the Item itself, or its index (starting from 0) within the collection. The return value is the new number of items in the collection.
	 */
	removeFile(path?: string | DOpusPath, item?: DOpusItem, index?: number): number;

	/**
	 * Runs the command that has been built up with this object. The return value indicates whether or not the command ran successfully. Zero indicates the command could not be run or was aborted; any other number indicates the command was run for at least some files. (Note that this is not the "exit code" for external commands. For external commands it only indicates whether or not Opus launched the command. If you need the exit code of an external command, use the WScript.Shell Run or Exec methods to run the command.) You can use the Results property to find out more information about the results of the command, and also discover which files (if any) failed using the failed property of each Item in the files collection.
	 */
	run(): number;

	/**
	 * Runs the single line command given by the instruction argument. Calling this method is the equivalent of adding the single line with the AddLine method and then calling the Run method.
	 */
	runCommand(instruction?: string): number;

	/**
	 * Sets the command's destination to the specified path. You can provide the path as either a string or a Path object. Calling this method clears the destination tab property from the command.
	 */
	setDest(path?: string): void;

	/**
	 * Sets the command's destination to the specified tab. The destination path will be initialized from the tab automatically (so you don't need to call SetDest as well as SetDestTab).
	 */
	setDestTab(tab?: DOpusTab): void;

	/**
	 * Configures the command to use the files in the specified Item collection as the items the command will act upon.You can also pass a Vector of Item objects instead of a collection.
	 */
	setFiles(): void;

	/**
	 * Turns on a modifier for this command. The supported modifiers are a subset of the full list of command modifiers:
	 *
	 * *admin, async, codepage, externalonly, leavedoswindowopen, nodeselect, noexpandenv, nofilenamequoting, nolocalizefiles, noprogress, norunbatch, resolvelinks, runmode*
	 *
	 * Using this method is the equivalent of using the AddLine method to add the modifier to the command as an instruction; e.g. Command.SetModifier("async") is the same as Command.AddLine("@async"). If the modifier requires a value it is passed as the second argument, e.g. Command.SetModifier("runmode", "hide").
	 */
	setModifier(modifier?: string, value?: string): void;

	/**
	 * Lets you share the progress indicator from one command with another command. You can pass this method the value of progress property obtained from another Command object.
	 */
	setProgress(progress?: DOpusProgress): void;

	/**
	 * This method lets you control which qualifier keys the command run by this object will consider to have been pressed when it was invoked. For example, several internal commands change their behavior when certain qualifier keys are held down - calling this method allows you to set which keys they will see.
	 *
	 * The qualifiers argument must consist of one or more of the following strings (comma-separated): *none, shift, ctrl, alt, lwin, rwin, win.*
	 */
	setQualifiers(qualifiers?: string): void;

	/**
	 * Sets the command's source to the specified path. You can provide the path as either a string or a Path object. Calling this method clears the source tab property from the command.
	 */
	setSource(path?: string): void;

	/**
	 * Sets the command's source to the specified tab. The source path will be initialized from the tab automatically (so you don't need to call SetSource as well as SetSourceTab).
	 */
	setSourceTab(tab?: DOpusTab): void;

	/**
	 * Sets the type of function that this command will run. This is equivalent to the drop-down control in the Advanced Command Editor. The type argument must be one of the following strings: std, msdos, script, wsl. Standard (std) is the default if the type is not specifically set.
	 */
	setType(type?: string): void;

	/**
	 * This method can be used to update the appearance of toolbar buttons that use @toggle:if to set their selection state based on the existence of a global-, tab- or Lister-scoped variable. You would call this method if you have changed such a variable from a script to force buttons that use it to update their selection status.
	 */
	updateToggle(): void;

}

declare var Command: DOpusCommand;

/**
 * If a script add-in implements the OnScriptConfigChange event, the method receives a ConfigChangeData object whenever the user modifies the script's configuration via the Preferences editor.
 * @see {DOpusOnScriptConfigChange}
 */
interface DOpusConfigChangeData {

	/**
	 * Returns a Vector containing the names of the configuration items that were modified.
	 */
	readonly changed: DOpusVector<string>;

}

/**
 * The Control object represents a control on a script dialog ; it lets you read and modify a control's value (and contents). Use the Dialog .Control method to obtain a Control object.
 * @see {DOpusDialog}
 */
interface DOpusControl {

	/**
	 * Set or query the color used for the background (fill) of this control. This is in the format #RRGGBB (hexadecimal) or RRR,GGG,BBB (decimal).
	 *
	 * Currently only static text and list view controls are supported for this property.
	 */
	readonly bg: string;

	/**
	 * For a list view control, returns a DialogListColumns object that lets you query or modify the columns in Details mode.
	 */
	readonly columns: DOpusDialogListColumns;

	/**
	 * Returns the number of items contained in the control (e.g. in a combo box, list box or list view, returns the number of items in the list).
	 */
	readonly count: number;

	/**
	 * Set or query the width of the control, in pixels.
	 */
	readonly cx: number;

	/**
	 * Set or query the height of the control, in pixels.
	 */
	readonly cy: number;

	/**
	 * Set or query the enabled state of the control. Returns True if the control is enabled, False if it's disabled. You can set this property to change the state.
	 */
	readonly enabled: boolean;

	/**
	 * Set or query the color used for the text (foreground) of this control. This is in the format #RRGGBB (hexadecimal) or RRR,GGG,BBB (decimal).
	 *
	 * Currently only static text and list view controls are supported for this property.
	 */
	readonly fg: string;

	/**
	 * Set or query the input focus state of the control. Returns True if the control currently has input focus, False if it doesn't. Set to True to give the control input focus.
	 */
	readonly focus: boolean;

	/**
	 * Set or query the control's label. Not all controls have labels - this will have no effect on controls (like the list view) that don't.
	 *
	 * Note that for combo box controls, this property is only valid for an editable combo - that is, one that you can type your own text into. You can use this property to set or query the current value of the editable text.
	 *
	 * For a static control set to "image" mode you can also provide an Image object that you obtained from the DOpus.LoadImage or Script.LoadImage methods.
	 */
	readonly label: DOpusImage;

	/**
	 * For a list view control, lets you change or query the current view mode. Valid values are icon, details, smallicon, list.
	 */
	readonly mode: string;

	/**
	 * Set or query the read only state of an edit control.
	 */
	readonly readonly: boolean;

	/**
	 * For a static text control set to "image" mode, you can set this property to rotate the displayed image. The value provided is the number of degrees from the image's initial orientation.
	 */
	readonly rotate: number;

	/**
	 * Set or query the font styles used to display this control's label. The string consists of zero or more characters; valid characters are b for bold and i for italics. Currently only static text controls are supported for this property.
	 */
	readonly style: string;

	/**
	 * Set or query the color used for the text background (fill) of this control. This is in the format #RRGGBB (hexadecimal) or RRR,GGG,BBB (decimal).
	 *
	 * Currently only list view controls are supported for this property.
	 */
	readonly textbg: string;

	/**
	 * Set or query the control's value. The meaning of this property depends on the type of the control:
	 *
	 * * **Edit control**: Returns or accepts a string representing the current contents of the edit control.
	 * * **Check box**: For a simple on/off check box, returns or accepts a bool - True for checked and False for unchecked. For a tri-state check box, returns or accepts an int - 0 for unchecked, 1 for checked and 2 for the indeterminate state.
	 * * **Radio button**: Returns or accepts a bool - True for checked and False for unchecked.
	 * * **Tab**: Returns or accepts an int indicating the currently selected page in the tab control.
	 * * **List box / combo box / list view**: Returns or accepts a DialogListItem representing the selected item. When setting the value it also accepts an int representing the 0-based index of the selected item.
	 *
	 * Note that for a multiple-selection list box or list view, this value will return a Vector of DialogListItem objects, representing all currently selected items.
	 */
	readonly value: DOpusDialogListItem;

	/**
	 * Set or query the visible state of the control. Returns True if the control is visible and False if it's hidden. You can set this property to hide or show the control.
	 */
	readonly visible: boolean;

	/**
	 * Set or query the left (x) position of the control, in pixels.
	 */
	readonly x: number;

	/**
	 * Set or query the top (y) position of the control, in pixels.
	 */
	readonly y: number;

	/**
	 * Adds a new group to a list view control. Items you add to the list can optionally be placed in groups. Each group must have a unique ID.
	 *
	 * The optional flags are "c" (group is collapsible) and "d" (group starts out collapsed). E.g. AddGroup("Unimportant", 100, "cd") would add a group called Unimportant that is initially collapsed.
	 */
	addGroup(name?: string, id?: number, flags?: string): number;

	/**
	 * Adds a new item to the control (list box, combo box or list view). The first parameter is the item's name, and the optional second parameter is a data value to associate with the item.
	 *
	 * When adding to a grouped list view, the optional third parameter provides the ID of the group you want to add the item to (the second parameter must be provided in this case, and can be set to 0 if no value is required).
	 *
	 * The item is added to the end of the list.
	 *
	 * You can also pass a DialogListItem object obtained from another control.
	 *
	 * The return value indicates the position in the list of the new item. If you are adding to a listview control and need to add an item with multiple columns, you can do it like this (JScript):
	 *
	 * ```javascript
	 * var i = listview.AddItem("This is col 1");
	 * listview.GetItemAt(i).subitems(0) = "This is col 2";
	 * listview.GetItemAt(i).subitems(1) = "This is col 3";
	 * ```
	 */
	addItem(name?: string, value?: number, groupid?: number, item?: object): number;

	/**
	 * This method is mainly for use with multiple-selection list box and list view controls. It lets you deselect individual items in the control while leaving other items selected (or unaffected).
	 *
	 * You can specify either the index of the item to select (0 means the first item, 1 means the second and so on) or a DialogListItem object obtained from the GetItemAt or GetItemByName methods.
	 *
	 * You can also specify -1 to deselect all items in the list box.
	 */
	deselectItem(position?: number, item?: object): number;

	/**
	 * Only applies to list view controls. By default group view is off; after adding groups with the AddGroup method, use EnableGroupView to turn group view on.
	 */
	enableGroupView(enable?: boolean): void;

	/**
	 * Returns a DialogListGroup object representing the group with the specified ID that you've previous added to a list view control using the AddGroup method.
	 */
	getGroupById(id?: number): DOpusDialogListGroup;

	/**
	 * Returns a DialogListItem object representing the item contained in the control at the specified index (list box, combo box or list view). Item 0 represents the first item in the list, item 1 the second, and so on.
	 */
	getItemAt(position?: number): DOpusDialogListItem;

	/**
	 * Returns a DialogListItem object representing the item contained in the control with the specified name (list box, combo box or list view). This method has two names (...Label and ...Name) for historical reasons, you can use either method name interchangeably).
	 */
	getItemByLabel(name?: string): DOpusDialogListItem;

	/**
	 * Returns a DialogListItem object representing the item contained in the control with the specified name (list box, combo box or list view). This method has two names (...Label and ...Name) for historical reasons, you can use either method name interchangeably).
	 */
	getItemByName(name?: string): DOpusDialogListItem;

	// TODO - REVIEW
	/**
	 * Inserts a new item in the control (list box, combo box or list view). The first parameter is the position to insert the item at (0 means the beginning of the list, 1 means the second position and so on). The second parameter is the item's name, and the optional third parameter is a data value to associate with the item.
	 *
	 * When adding to a grouped list view, the optional fourth parameter provides the ID of the group you want to add the item to (the third parameter must be provided in this case, and can be set to 0 if no value is required).
	 *
	 * Instead of the name and value you can also pass a DialogListItem object obtained from another control.
	 *
	 * The return value indicates the position in the list of the new item.
	 */
	insertItemAt(position?: number, name?: string, value?: number, groupid?: number, item?: object): number;

	/**
	 * Moves an existing item to a new location (list box, combo box or list view). The first parameter is the item to move (you can pass either its index or a DialogListItem object), and the second parameter is the new position the item should be moved to. The return value indicates the position in the list of the moved item.
	 */
	moveItem(position?: number, item?: object, newposition?: number): number;

	/**
	 * Removes the specified group from a list view control.
	 */
	removeGroup(id?: number): void;

	/**
	 * Removes an item from the control (list box, combo box or list view). You can provide either the index of the item to remove (0 means the first item, 1 means the second and so on) or a DialogListItem object obtained from the GetItemAt or GetItemByName methods.
	 *
	 * You can also specify -1 to completely clear the contents of the control, removing all items at once.
	 */
	removeItem(position?: number, item?: object): void;

	/**
	 * Selects an item in the control. For a list box, combo box or list view, you can specify either the index of the item to select (0 means the first item, 1 means the second and so on) or a DialogListItem object obtained from the GetItemAt or GetItemByName methods.
	 *
	 * For a multiple-selection list box or list view you can also specify -1 to select all items in the control.
	 *
	 * For a tab control, you can change which page is visible by specifying the name of the page (i.e. the name of the child dialog) to show.
	 *
	 * The return value indicates the new selected index.
	 */
	selectItem(position?: number, item?: object, tab?: string): number;

	/**
	 * Selects text within an edit control (or the edit field in a combo box control). The two parameters represent the start and end position of the desired selection. To select the entire contents, use 0 for the start and -1 for the end.
	 *
	 * The return value is a Vector with two members that provide the current start and end of the selection. To query the range without changing it, simply call the SelectRange method with no arguments.
	 *
	 * In a list box or list view control, this method selects a range of items.
	 */
	selectRange(start?: number, end?: number, item1?: object, item2?: object): DOpusVector<object>;

	/**
	 * Sets the position of this control. The x and y coordinates are specified in pixels.
	 */
	setPos(x?: number, y?: number): void;

	/**
	 * Sets the position and size of the control, in a single operation. All coordinates are specified in pixels.
	 */
	setPosAndSize(x?: number, y?: number, cx?: number, cy?: number): void;

	/**
	 * Sets the size of this control. The cx (width) and cy (height) values are specified in pixels.
	 */
	setSize(cx?: number, cy?: number): void;

}

/**
 * The CustomFieldData object is provided to a rename script via the GetNewNameData .custom property. It provides access to the value of any custom fields that your script added to the Rename dialog.
 *
 * The properties of the CustomFieldData object are entirely determined by the script itself.
 *
 * In the OnGetCustomFields method, assign the default values of any custom fields you want to the GetCustomFieldData.fields property. The type of each default value controls the type of the property.
 *
 * The Rename dialog only supports certain types of variables for custom fields, so you must only assign properties of compatible types. Supported types are:
 *
 * * **Boolean options (True or False)** - the variable type must be bool
 * * **Numeric options** - the variable type must be int
 * * **String options** - the variable type must be string
 * * **Drop-down list** - the variable type must be a Vector with an int as the first element (to specify the default selection), and strings for the remaining elements.
 *
 * @see {DOpusGetNewNameData}
 */
interface DOpusCustomFieldData extends Object {
}

/**
 * The Date object is provided to make it easier to deal with variables representing dates. It converts automatically to an ActiveX VT_DATE value and so can function as a drop-in replacement for a scripting language's native date variables. The main advantage is that it retains milliseconds, unlike VT_DATE which has a one second resolution. It also provides some utility methods to manipulate dates. The Item object has a number of properties that returns Date objects.
 *
 * You can create a new Date object using the DOpusFactory .Date method.
 *
 * @see {DOpusItem}
 *
 * @returns {Date} Returns a VT_DATE representing the value of this Date object (excluding the milliseconds).
 */
interface DOpusDate extends Date {

	/**
	 * Get or set the day value of the date.
	 */
	day: number;

	/**
	 * Get or set the hour value of the date.
	 */
	hour: number;

	/**
	 * Get or set the minute value of the date.
	 */
	min: number;

	/**
	 * Get or set the month value of the date.
	 */
	month: number;

	/**
	 * Get or set the milliseconds value of the date.
	 */
	ms: number;

	/**
	 * Get or set the seconds value of the date.
	 */
	sec: number;

	/**
	 * Get the day-of-the-week value of the date.
	 */
	readonly wday: number;

	/**
	 * Get or set the year value of the date.
	 */
	readonly year: number;

	/**
	 * Adds the specified value to the date. The interpretation of the specified value is controlled by the type string:
	 *
	 * * **l** - milliseconds
	 * * **s** - seconds
	 * * **m** - minutes
	 * * **h** - hours
	 * * **d** - days
	 * * **w** - weeks
	 * * **M** - months
	 * * **y** - years
	 */
	add(value?: number, type?: string): void;

	/**
	 * Returns a new Date object set to the same date as this one.
	 */
	clone(): Date;

	/**
	 * Compares this date against the other date. The return value will be **0** (equal), **1** (greater) or **-1** (less).
	 *
	 * The optional type string controls how the comparison is performed:
	 *
	 * * **s** - ignore seconds. If specified, the optional tolerance argument specifies the comparison tolerance in seconds.
	 * * **sD** - ignore seconds, and compensate automatically for daylight savings.
	 * * **t** - compare times only
	 * * **d** - compare dates only
	 */
	compare(other?: Date, type?: string, tolerance?: number): number;

	/**
	 * Returns a formatted date or time string. The format and flags arguments are both optional.
	 *
	 * If you do not give a format, the result will include both date and time, formatted the same as date-time columns in the file display.
	 *
	 * If you give a format of just **"d"** or **"t"** then the result will be just the date or time part, formatted the same as date or time columns in the file display.
	 *
	 * The file display's formats depend on the user's locale and Windows settings. You should use those options if you wish to present a date/time to the user in the way they expect them to look, but not if you need to store them in a specific format.
	 *
	 * When using the file display's format (that is, the format argument is empty, **"d"** or **"t"**), you can optionally pass one or more case-sensitive flags in the second flags argument to override a few settings:
	 *
	 * * **N** - Force day names on in dates within the last week. "Today", "Monday", etc.
	 * * **n** - Force day names off.
	 * * **S** - Force seconds on in times.
	 * * **s** - Force seconds off.
	 * * **M** - Force milliseconds on in times. (Milliseconds will be zero if the stored time does not have millisecond accuracy.)
	 * * **m** - Force milliseconds off.
	 * * **P** - Force time hours to be padded to two digits.
	 * * **p** - Do not force time hours to be padded.
	 *
	 * For example, to get just the date, using the user's locale, but with day names forced off: `myDate.Format("d","n")`. To get the date and time, using the user's locale, but with day names forced on and seconds forced off: `myDate.Format("","Ns")`.
	 *
	 * The format can also use the syntax shown in Codes for date and time, allowing for arbitrary formats. For example, `myDate.Format("D#yyyy-MM-dd T#HH:mm:ss")` would return a string like 2016-07-28 15:45:26.
	 *
	 * When explicitly specifying a format, the flags argument should not be used and will be ignored.
	 */
	format(format?: string, flags?: string): string;

	/**
	 * Returns a new Date object with the date converted from UTC (based on the local time zone).
	 */
	fromUTC(): Date;

	/**
	 * Resets the date to the current local date/time.
	 */
	reset(): void;

	/**
	 * Sets the value of this Date object to the supplied date.
	 */
	set(newdate?: Date): void;

	/**
	 * Subtracts the specified value from the date. The parameters are the same as for the Add method.
	 */
	sub(value?: number, type?: string): void;

	/**
	 * Returns a new Date object with the date converted to UTC (based on the local time zone).
	 */
	toUTC(): Date;

}

/**
 * The Dialog object allows you to display dialogs that prompt the user for confirmation, allow them to input text strings or passwords, and select checkbox options or choose from a drop-down list. You can also use this object to display a popup menu on screen.
 *
 * You can create a Dialog object from the DOpus.Dlg, Lister.Dlg, Tab.Dlg, Func.Dlg and Command.Dlg methods.
 *
 * See the Example Scripts section for an example of its use.
 *
 * There are two different ways to use the Dialog object. You can either:
 *
 * * Use the one-shot methods ( Folder , GetString , Multi , Open , Request or Save ) to display a simple dialog of various types, or
 *
 * * Configure the dialog first by setting the values of the various properties, and then call the Show function to display it. This method also lets you create and use script dialogs .
 *
 * The one-shot methods accept several parameters but are generally not as flexible as building up the dialog and then calling Show .
 */
interface DOpusDialog {

	/**
	 * Specifies the buttons that are displayed at the bottom of the dialog. These buttons are used to close the dialog. The Show method returns a value indicating which button was chosen (and this value is also available in the result property).
	 *
	 * Multiple button strings must be separated with vertical bar characters (|). If a button has more than one button then by definition the last one is the "cancel" button. For example:
	 * ```javascript
	 * dlg.buttons = "OK|Retry|Cancel"
	 * ```
	 *
	 * To specify accelerators for the buttons prefix the desired key with an ampersand (&) character. For example:
	 *
	 * ```javascript
	 * dlg.buttons = "&OK|&Retry|&Cancel"
	 * ```
	 *
	 * Buttons can also have drop-down menus attached to them, by separating the drop-down items with plus signs (+). For example:
	 *
	 * ```javascript
	 * dlg.buttons = "OK|Retry+Retry All|Cancel"
	 * ```
	 *
	 * Within drop-down menus, you can specify that certain menu items can be accessed directly from the main button by holding Shift, Ctrl or Shift+Ctrl. This is done by adding an equals sign (=) and then the label the button should display when the key is held down (usually an abbreviated version of the menu item label, or a repetition of the label itself if it is already short enough). The keys are automatically assigned and you can only do this for at most three items. For example:
	 *
	 * ```javascript
	 * dlg.buttons = "OK|Retry+Retry All=Retry All|Skip+Skip if same modified time=Skip Same Time|Cancel"
	 * ```
	 */
	buttons: string;

	/**
	 * This property uses either a Vector or an array of strings to provide a list of multiple options that can be shown to the user. The list can be presented in one of three ways:
	 *
	 * * **Drop-down list:** By default, the dialog will display a drop-down list allowing the user to select one option. The index of the chosen selection is available via the selection property when the Show method returns.
	 * * **Checkbox list:** If the list property is also given the dialog will display a scrolling list of items, each with a checkbox allowing it to be turned on or off.
	 * * **Popup menu:** If the menu property is also given, a popup menu will be displayed at the current mouse coordinates. Use a single hyphen ("-") as a menu label to insert a separator.
	 *
	 * When shown as a checkbox list the dialog is resizable; you can set the initial size using the cx and cy properties (and retrieve them afterwards if you want to save the size).
	 */
	choices: string | string[];

	/**
	 * In a text entry dialog (i.e. the max property has been specified) setting confirm to True will require that the user types the entered text again (in a second text field) to confirm it (e.g. for a password).
	 */
	confirm: boolean;

	/**
	 * For script dialogs marked as resizable, this property lets you override the width of the dialog defined in the resource - although note you can't resize a dialog smaller than its initial size.
	 */
	cx: number;

	/**
	 * For script dialogs marked as resizable, this property lets you override the height of the dialog defined in the resource - although note you can't resize a dialog smaller than its initial size.
	 */
	cy: number;

	/**
	 * In a text entry dialog (i.e. the max property has been specified) this property allows you to initialize the text field with a default value.
	 *
	 * (Old scripts may use "default" instead of "defvalue"; this is deprecated because it does not work in JScript where "default" is a reserved keyword.)
	 */
	defValue: string;

	/**
	 * Allows you to change the default button (i.e. the action that will occur if the user hits enter) in the dialog. Normally the first button is the default - this has a defid of 1. The second button would have a defid of 2, and so on. If a dialog has more than one button then by definition the very last button is the "cancel" button, and this has a defid of 0.
	 */
	defId: number;

	/**
	 * Set to True if you want a script dialog to run in “detached” mode, where your script provides its message loop.
	 */
	detach: boolean;

	/**
	 * Use this to cause the dialog to automatically disable another window when it's displayed. The user will be unable to click or type in the disabled window until the dialog is closed. Normally if you use this you would set this to the same value as the window property.
	 *
	 * You can provide either a Lister or a Tab object, or another Dialog. If you are showing this dialog in response to the OnAboutScript event, you can also pass the value of the AboutData.window property.
	 */
	disable_window: DOpusLister;

	/**
	 * Displays one of several standard icons in the top-left corner of the dialog, which can be used, for example, to indicate the severity of an error condition. The valid values for this property are warning, error, info and question.
	 *
	 * When used with a script dialog this property lets you control the icon shown in the dialog's title bar. In this instance, instead of a string you can also provide an Image object that you obtained from the DOpus.LoadImage or Script.LoadImage methods. Note that the image must have been loaded from a .ico file.
	 */
	icon: DOpusImage;

	/**
	 * In a text entry dialog, this property returns the text string that the user entered (i.e. once the Show method has returned).
	 */
	input: string;

	/**
	 * Set this property to create a script dialog in a particular language (if one or more language overlays have been provided), rather than the currently selected language.
	 */
	language: string;

	/**
	 * In conjunction with the choices property, this will cause the choices to be presented as a checkbox list. You can initialize this Vector or array with the same number of items as the choices property, and set each one to True or False to control the default state of each checkbox. Or, simply set this value to 0 to activate the checkbox list without having to initialize the state of each checkbox.
	 *
	 * When the Show method returns, this property will return a Vector of bools that provide the state of each checkbox as set by the user.
	 */
	list: boolean | boolean[] | number;

	/**
	 * This property enables text entry in the dialog - a text field will be displayed allowing the user to enter a string. Set this property to the maximum length of the string you want the user to be able to enter (or 0 to have no limit).When the Show method returns the text the user entered will be available in the input property.
	 */
	max: number;

	/**
	 * In conjunction with the choices property, this will cause the choices to be presented as a popup menu rather than in a dialog. The menu will be displayed at the current mouse coordinates.
	 *
	 * You can initialize this Vector or array with the same number of items as the choices property, and set each one to a value representing various flags that control the appearance of the menu item. The available flags are as follows - their values must be added together if you need to specify more than one flag per item.
	 *
	 * * **1** - bold (indicates the default item)
	 * * **2** - checked (a checkmark will appear next to the item)
	 * * **4** - radio (a radio button will appear next to the item)
	 * * **8** - disabled (the user will not be able to select the item)
	 *
	 * You can also simply set this value to 0 or 1 to activate the popup menu without having to provide flags for each item (if set to 1, the top item in the menu will appear bolded).
	 *
	 * The Show method returns the index of the menu item the user chose (with 1 being the first item), or 0 if the menu was cancelled.
	 */
	menu: number | number[] | number;

	/**
	 * Specifies the message text displayed in the dialog.
	 */
	message: string;

	/**
	 * For script dialogs this property retrieves or sets the current dialog opacity level, from 0 (totally transparent) to 255 (totally opaque).
	 */
	opacity: number;

	/**
	 * This is a collection of five options that will be displayed as checkboxes in the dialog. Unlike the choices / list scrolling checkbox list, these options are displayed as physical checkbox controls. By default the five checkboxes are uninitialized and won't be displayed, but if you assign a label to any of them they will be shown to the user.
	 *
	 * When the Show method returns you can obtain the state of the checkboxes using the state property of each DialogOption object.
	 */
	options: DOpusDialogOption;

	/**
	 * In a text entry dialog, set this property to True to make the text entry field a password field. In a password field the characters the user enters are not displayed.
	 */
	password: boolean;

	/**
	 * When used with a script dialog this property lets you control the dialog's position on screen. Accepted values are:
	 *
	 * * **center** - center the dialog over the parent window (the default)
	 * * **absolute** - specify an absolute position using the x and y properties
	 * * **parent** - position relative to the parent window (using x and y)
	 * * **monitor** - position relative to the current monitor (using x and y)
	 *
	 * Except when set to "center" the x and y properties can be used to adjust the dialog's position.
	 */
	position: string;

	/**
	 * By default, Opus checks the size and position of your dialog just before it opens and fixing them if they would place any of the dialog off-screen. Positioning a dialog off-screen is usually an accident caused by saving window positions on one system and restoring them on another with different monitor resolutions or arrangements. In the rare cases where you want your dialog to open off-screen, where the user cannot see some of all of it, set this property to False.
	 */
	position_fix: boolean;

	/**
	 * This property returns the index of the button chosen by the user to close the dialog. The left-most button is index 1, the next button is index 2, and so on. If a dialog has more than one button then by definition the last (right-most) button is the "cancel" button and so this will return index 0.
	 *
	 * If any buttons have associated drop-down menus then the contents of the menus also contribute to the index value. For example, if button index 2 has an additional item in a drop-down menu, then that item would be index 3, and the next button would be index 4.
	 */
	readonly result: number;

	/**
	 * In a text entry dialog, set this property to True to automatically select the contents of the input field (as specified by the defvalue property) when the dialog opens.
	 */
	select: boolean;

	/**
	 * In a drop-down list dialog (one with the choices property set without either list or menu), this property returns the index of the item chosen from the drop-down list after the Show method returns.
	 */
	readonly selection: number;

	/**
	 * Set this property to True if the list of choices given by the choices property should be sorted alphabetically.
	 */
	sort: boolean;

	/**
	 * Lets you create a script dialog. The template property can be set to the name of the script dialog to display (as defined in your script resources), or a string that contains raw XML defining the dialog.
	 */
	template: string;

	/**
	 * Specifies the title text of the dialog.
	 */
	title: string;

	/**
	 * Set this property to True to make the dialog "top level", or False to allow it to go behind other non-top level windows.
	 */
	top: boolean;

	/**
	 * Set this property to True if you want the script dialog to generate close events in your message loop when the user clicks the window close button. You'll need to close the dialog yourself using the EndDlg method.
	 */
	want_close: boolean;

	/**
	 * Set this property to True if you want the script dialog to generate resize events in your message loop when the user resizes the dialog.
	 */
	want_resize: boolean;

	/**
	 * Use this to specify the parent window of the dialog. The dialog will appear centered over the top of the specified window. You can provide either a Lister or a Tab object, or another Dialog. If you are showing this dialog in response to the OnAboutScript event, you can also pass the value of the AboutData.window property.
	 *
	 * You only need to set this property if you obtain the Dialog option from the DOpus.Dlg method. If the Dialog object comes from one of the other objects (e.g. Tab.Dlg) then its parent window will already be set to the window which launched the action your script is responding to.
	 */
	window: DOpusLister;

	/**
	 * Specifies the x-position of a script dialog. Use the position property to control how the position is interpreted. After the dialog has been displayed you can change this property to move the dialog around on-screen.
	 */
	x: number;

	/**
	 * Specifies the y-position of a script dialog. Use the position property to control how the position is interpreted. After the dialog has been displayed you can change this property to move the dialog around on-screen.
	 */
	y: number;

	/**
	 * Creates a hotkey (or keyboard accelerator) for the specified key combination. When the user presses this key combination in your dialog, a hotkey event will be triggered.
	 *
	 * The name parameter is a name you assign that lets you identify the hotkey. The key parameter specified the actual key combination; this can optionally combine the qualifiers ctrl, shift and alt with a character or name of a special key. For example, ctrl+t or alt+shift+F7.
	 */
	addHotkey(name?: string, key?: string): void;

	/**
	 * When creating a script dialog, calling this method creates the underlying dialog but does not display it. This lets you create the dialog and then initialize its controls before it is shown to the user.
	 *
	 * Using Create implies a detached dialog; the detach property will be set True automatically. However, you can call RunDlg afterwards if you don't need a custom message loop and just want to set up some controls before displaying the dialog.
	 *
	 * Once the dialog has been created and its controls initialized, you should call Show or RunDlg to make it visible to the user. It will also go visible at the first GetMsg call if it hasn't already been shown.
	 */
	create(): void;

	/**
	 * Returns a Control object corresponding to one of the controls on a script dialog. The control is identified by its name, as defined in the script dialog resource.
	 *
	 * The optional second and third parameters are only used when the control is in a tab control (that is, when it's in a dialog that's a child of another dialog). The dialog parameter specifies the name of its parent dialog. The tab parameter specifies the name of the tab control hosting the child dialog. You would only need to specify the name of the tab if you have multiple tab controls and the same dialog is hosted inside more than one of them (this would be quite a rare occurrence).
	 *
	 * Note that none of the controls will exist until Create has been called.
	 */
	control(name?: string, dialog?: string, tab?: string): DOpusControl;

	/**
	 * Deletes a hotkey you previously created with the AddHotkey method.
	 */
	delHotkey(name?: string): void;

	/**
	 * Allows the user to drag and drop one or more files from your dialog (and drop them in another window or application).
	 *
	 * You would usually call this in response to a drag event you receive from a static or list view control.
	 *
	 * The first parameter is an Item collection (or Vector of Item objects) representing the files to be dragged.
	 *
	 * The optional second parameter lets you control which actions are available. This should be a string containing one or more of copy, move, link. The default action can be indicated by prefixing it with a * (e.g. copy,*move,link). If you don't specify this parameter the default is to only allow copy.
	 *
	 * The string this method returns indicates the result of the drag. For a left button drag, this will be "copy", "move", "link" or "drop". For a right-button drag it will always be "drop". If the drag is cancelled it will return "cancel".
	 */
	drag(actions?: string): string;

	/**
	 * Ends a script dialog running in detached mode. Normally dialogs end automatically when the user clicks the close button or another button that has its Close Dialog property set to True. This method lets you end a dialog under script control. The optional parameter specifies the result code that the Dialog.result property will return.
	 */
	endDlg(result?: number): void;

	/**
	 * Displays a "Browse for Folder" dialog letting the user select a folder. The optional parameters are:
	 *
	 * * **title** - specify title of the dialog
	 * * **default** - specify the default path selected in the dialog
	 * * **expand** - specify True to automatically expand the initial path
	 * * **window** - specify parent window for the dialog (a Lister or a Tab). If not specified, the Dialog object's window property will be used.
	 *
	 * A Path object is returned to indicate the folder chosen by the user. This object will have an additional result property that will be False if the user cancelled the dialog - the other normal Path properties will only be valid if result is True.
	 */
	folder(title?: string, defaultValue?: string, expand?: boolean, window?: DOpusLister | DOpusTab): DOpusPath;

	/**
	 * Returns a Msg object representing the most recent input event in a script dialog (only used in detached mode).
	 *
	 * The return value will evaluate to False when the dialog is closed, which is when you should exit your message loop.
	 *
	 * If the dialog is not already visible (because Show has not been called) then it will become visible when you first call GetMsg.
	 */
	getMsg(): DOpusMsg;

	/**
	 * Displays a text entry dialog allowing the user to enter a string. The optional parameters are:
	 *
	 * * **message** - specify message string in the dialog
	 * * **default** - specify default string value
	 * * **max** - specify maximum string length
	 * * **buttons** - specify button labels (in the same format as the buttons property described above)
	 * * **title** - specify dialog window title
	 * * **window** - specify parent window for the dialog (a Lister or a Tab). If not specified, the Dialog object's window property will be used.result - for scripting languages that support ByRef parameters, this can specify a variable to receive the string the user enters.
	 *
	 * The return value is the entered string, or an empty value if the dialog was cancelled. The index of the button selected by the user will be available via the result property once this method returns. The left-most button is index 1, the next button is index 2, and so on. If a dialog has more than one button then by definition the last (right-most) button is the "cancel" button and so this will return index 0.
	 */
	getString(message?: string, defaultValue?: string, max?: string, buttons?: string, title?: string, window?: DOpusLister | DOpusTab, result?: string): string;

	/**
	 * Stops the specified timer. The timer must previously have been created by a call to the SetTimer method.
	 */
	killTimer(name?: string): void;

	/**
	 * Restores the previously saved position of a script dialog. The position must have previously been saved by a call to the SavePosition method.
	 *
	 * The id string is a string that Opus can use to identify your dialog or the script it comes from. The template name of the dialog will be automatically appended to this. For example, you might specify id as "kundal" - Opus would then internally save the position of a dialog called "dialog1" as "kundal!dialog1". Make sure you pick a string that other script authors are unlikely to use as Opus has no other way of telling the saved positions apart.
	 *
	 * The optional type parameter lets you control which position elements are restored - specify "pos" to only restore the position, "size" to only restore the size, or "pos,size" to restore both (this is also the default, so you can also omit the argument all together).
	 */
	loadPosition(id?: string, type?: string): void;

	/**
	 * Displays a "Browse to Open File" dialog that lets the user select one or more files. The optional parameters are:
	 *
	 * * **title** - specify title of the dialog
	 * * **default** - specify the default file selected in the dialog (if a folder is specified this specifies the default location but no file will be selected)
	 * * **window** - specify parent window for the dialog (a Lister or a Tab). If not specified, the Dialog object's window property will be used.
	 *
	 * A collection of Item objects is returned to indicate the files selected by the user. The returned object will have a result property that you should check first - the collection of items is only valid if result returns True. If it returns False it means the user cancelled the dialog.
	 */
	multi(title?: string, defaultValue?: string, window?: DOpusLister | DOpusTab): DOpusItem;

	/**
	 * Displays a "Browse to Open File" dialog that lets the user select a single file. The optional parameters are:
	 *
	 * * **title** - specify title of the dialog
	 * * **default** - specify the default file selected in the dialog (if a folder is specified this specifies the default location but no file will be selected)
	 * * **window** - specify parent window for the dialog (a Lister or a Tab). If not specified, the Dialog object's window property will be used.
	 *
	 * A single Item object is returned to indicate the file selected by the user. This object will have an additional result property that will be False if the user cancelled the dialog - the other normal Item properties will only be valid if result is True.
	 *
	 * CYREADME - the documentation on this seems to be wrong: when as 3rd parameter allowed file extension, e.g. '*.txt', is given it also seems to work
	 */
	open(title?: string, defaultValue?: string, windowOrFileExt?: DOpusLister | DOpusTab | string): DOpusItem;

	/**
	 * Displays a dialog with one or more buttons. The optional parameters are:
	 *
	 * * **message** - specify message string in the dialog
	 * * **buttons** - specify button labels (in the same format as the buttons property described above)
	 * * **title** - specify dialog window title
	 * * **window** - specify parent window for the dialog (a Lister or a Tab). If not specified, the Dialog object's window property will be used.
	 *
	 * The return value is the index of the button selected by the user, and this is also available in the result property once the method returns. The left-most button is index 1, the next button is index 2, and so on. If a dialog has more than one button then by definition the last (right-most) button is the "cancel" button and so this will return index 0.
	 */
	request(message?: string, buttons?: string, title?: string, window?: DOpusLister | DOpusTab): number;

	/**
	 * Turns a previously detached dialog into a non-detached one, by taking over and running the default message loop. The RunDlg method won't return until the dialog has closed. You might use this if you created a dialog using Create, in order to initialize its controls, but don't actually want to run an interactive message loop.
	 *
	 * The return value is the same as the object's result property, and represents the index of the close button selected by the user.
	 *
	 * If the dialog is not already visible (because neither Show nor GetMsg were called) then it will become visible when you call RunDlg. (Compatibility note: Prior to Opus 12.22, scripts needed to call Show explicitly.)
	 */
	runDlg(): number;

	/**
	 * Saves the position (and size) of the dialog to your Opus configuration. The position can then be restored later on by a call to LoadPosition.
	 *
	 * Normally you would call LoadPosition before displaying your dialog, and SavePosition after the dialog has been closed.
	 *
	 * The id string is a string that Opus can use to identify your dialog or the script it comes from. The template name of the dialog will be automatically appended to this. For example, you might specify id as "kundal" - Opus would then internally save the position of a dialog called "dialog1" as "kundal!dialog1". Make sure you pick a string that other script authors are unlikely to use as Opus has no other way of telling the saved positions apart.
	 */
	savePosition(id?: string): void;

	/**
	 * Creates a timer that will generate a periodic timer event for your script. The period must be specified in milliseconds (e.g. 1000 would equal one second).
	 *
	 * You can optionally specify a name for the timer - if you don't provide a name, one will be generated automatically (and the name of the new timer will be returned).
	 */
	setTimer(period?: number, name?: string): string;

	/**
	 * Displays the dialog that has been pre-configured using the various properties of this object. See the properties section above for a full description of these.
	 *
	 * If the detach property is False, the call will not return until the dialog has been closed. The return value is the index of the button selected by the user, and this is also available in the result property once the method returns. The left-most button is index 1, the next button is index 2, and so on. If a dialog has more than one button then by definition the last (right-most) button is the "cancel" button and so this will return index 0.
	 *
	 * If the detach property is True, the call will return immediately and the return value is meaningless. You should then either run a message loop for the “detached” dialog, or call RunDlg to run the standard loop.
	 */
	show(): number;

	/**
	 * Displays a "Browse to Save File" dialog that lets the user select a single file or enter a new filename to save. The optional parameters are:
	 *
	 * * **title** - specify title of the dialog
	 * * **default** - specify the default file selected in the dialog (if a folder is specified this specifies the default location but no file will be selected)
	 * * **type** - specify a list of filetypes to populate the "Save as Type" dropdown in the save dialog.
	 * * **window** - specify parent window for the dialog (a Lister or a Tab). If not specified, the Dialog object's window property will be used.
	 *
	 * The optional type parameter consists of one or more pairs of strings, separated by exclamation marks (!). The first string of each pair is the plain text string shown in the drop-down, and the second string of each pair is the actual file extension. You can also specify multiple extensions for the one type by separating them with semicolon. If you want the default "All files" item to be added to the list, add a # character at the start of the string. For example, `#Text Files!*.txt!Doc Files!*.doc.`
	 *
	 * A Path object is returned to indicate the file chosen by the user. This object will have an additional result property that will be False if the user cancelled the dialog - the other normal Path properties will only be valid if result is True.
	 */
	save(title?: string, defaultValue?: string, window?: DOpusLister | DOpusTab, type?: string): DOpusPath;

	/**
	 * Used to change how custom dialogs are grouped with other Opus windows on the taskbar. Specify a group name to move the window into an alternative group, or omit the group argument to reset back to the default group. If one or more windows are moved into the same group, they will be grouped together, separate from other the default group.
	 *
	 * This only works on Windows 7 and above, and only when taskbar grouping is enabled. Group names are limited to 103 characters and will be truncated if longer. Spaces and dots in group names are automatically converted to underscores.
	 *
	 * Only works with custom script dialogs (i.e. when you are using the template property). Must be called after the dialog has been created (i.e. after Show has been called -- see the RunDlg method if you want to avoid writing your own message loop just for this).
	 *
	 * Returns true on success.
	 */
	setTaskbarGroup(group?: string): boolean;

	/**
	 * Returns a Vars object that represents the variables that are scoped to this particular dialog. This allows scripts to use variables that persist from one use of the dialog to another.
	 *
	 * The id string is a string that Opus can use to identify your dialog or the script it comes from. The template name of the dialog will be automatically appended to this. For example, you might specify id as "kundal" - Opus would then internally save these variables for a dialog called "dialog1" as "kundal!dialog1". Make sure you pick a string that other script authors are unlikely to use as Opus has no other way of telling the saved variables apart.
	 */
	vars(id?: string): DOpusVars;

	/**
	 * Allows a script dialog to monitor events in a folder tab. You will receive notifications of the requested events through your message loop.
	 *
	 * The tab parameter specifies the Tab you want to watch. The events string is a comma-separated list of events you want to watch for. The id string is an optional parameter; it lets you assign your own ID to the tab to make it easier to tell where events are coming from (if you're monitoring multiple tabs, for instance).
	 *
	 * These are the events you can watch for are. Note that some are equivalent to the existing script events (e.g. OnActivateTab):
	 *
	 * * **select** - items in the tab are selected or deselected
	 * * **navigate** - the folder is changed in the tab
	 * * **add** - items are added to the folder
	 * * **delete** - items are deleted from the folder
	 * * **change** - items in the folder are changed (size, date, name, etc)
	 * * **activate** - tab activated or deactivated
	 * * **srcdst** - source/destination state changed
	 * * **view** - view mode changed
	 * * **flat** - flat view state changed
	 *
	 * Once notification has been established you will be notified of all requested events when they occur. Note that no specific information is sent with notifications - e.g. for the "change" event, you aren't told which items have changed, only that something has.
	 *
	 * You will receive notification events in your message loop. The various properties of the Msg object let you determine what happened.
	 *
	 * The Msg.event property will be set to tab for notifications from a watched folder tab.
	 *
	 * The Msg.control property tells you which tab the change occurred in; if you specified an ID when you called the WatchTab function, this will be in the Msg.control property - otherwise, it will be the numeric handle of the tab. Note that it's *not* the actual Tab object. You can access the Tab object via the Msg.tab property but this can be inefficient, as it requires a new Tab object to be created every time. If you're only monitoring one tab it's better to store the Tab object in your own variable - and if you're monitoring multiple tabs you could, e.g. use a unique ID for each one and keep the objects in a Map.
	 *
	 * The Msg.value property tells you which notification event occurred. Possible values are select, navigate, filechange, activate, srcdst, view, flat, and close (sent if the tab is closed while you are monitoring it).
	 *
	 * For the filechange event, the Msg.data property contains a bit mask indicating which file events occurred. 1 = add, 2 = delete, 4 = change. The values will be added together (so e.g. 6 indicates at least one item was changed and at least one was deleted). It's up to your script to determine exactly what changed.
	 *
	 * You can change the events you're monitoring for by calling the WatchTab method again with the same tab and new event list.
	 *
	 * To stop monitoring an existing tab, call WatchTab with the second parameter set to stop. Monitoring is automatically cancelled if your dialog closes (and also if the tab closes).
	 */
	watchTab(Tab?: DOpusTab, events?: string, id?: string): boolean;

}

declare var Dialog: DOpusDialog;

/**
 * The DialogListColumn object represents a column in a Details mode list view control in a script dialog. Use the Control .columns property to obtain a DialogListColumns object, and then enumerate it to obtain individual DialogListColumn objects.
 * @see {DOpusControl}
 * @see {DOpusDialogListColumns}
 */
interface DOpusDialogListColumn {

	/**
	 * Returns or sets the column's name.
	 */
	readonly name: string;

	/**
	 * Set this property to True if you want this column to automatically resize when the list view is resized horizontally. Only one column can be set to auto-resize at a time.
	 */
	readonly resize: boolean;

	/**
	 * Returns 1 if the list view is currently sorted forwards by this column, -1 if it's currently sorted backwards by this column, or 0 otherwise. Settings this property will re-sort the list.
	 */
	readonly sort: number;

	/**
	 * Returns or sets the column's width in pixels. Set it to -1 to automatically size the column to fit its content. You can automatically resize all columns at once using the DialogListColumns.AutoSize method.
	 */
	readonly width: number;

}


/**
 * The DialogListColumns object lets you query or modify the columns in a Details mode list view control in a script dialog. Use the Control .columns property to obtain a DialogListColumns object.
 *
 * You can enumerate this object to query the current columns. Each column is represented by a DialogListColumn object.
 *
 * @see {DOpusControl}
 */
interface DOpusDialogListColumns {

	/**
	 * Adds a new column to the list view, and returns the index of the new column.
	 */
	addColumn(name?: string): number;

	/**
	 * Automatically sizes all columns in the list view to fit their content.
	 */
	autoSize(): void;

	/**
	 * Deletes the specified column.
	 */
	deleteColumn(index?: number): void;

	/**
	 * Returns a DialogListColumn object representing the column in the specified position.
	 */
	getColumnAt(index?: number): DOpusDialogListColumn;

	/**
	 * Inserts a new column in the list view at the specified position, and returns the index of the new column.
	 */
	insertColumn(name?: string, position?: number): number;

}


/**
 * The DialogListGroup object represents a group in a list view control in a script dialog . It's returned by the Control .GetGroupById method.
 * @see {DOpusControl}
 */
interface DOpusDialogListGroup {

	/**
	 * Returns or sets the expansion state of this group. The group must have been added as "collapsible" via the Control.AddGroup method.
	 */
	readonly expanded: boolean;

	/**
	 * Returns the ID of this group.
	 */
	readonly id: number;

	/**
	 * Returns the name of this group.
	 */
	readonly name: string;

}

/**
 * The DialogListItem object represents an item in a combo box or list box control in a script dialog . It's returned by the Control .GetItemAt and Control .GetItemByName methods.
 * @see {DOpusControl}
 */
interface DOpusDialogListItem {

	/**
	 * Set or query the color used for the background (fill) of this item. This is in the format **#RRGGBB** (hexadecimal) or **RRR,GGG,BBB** (decimal).
	 *
	 * Currently only items in list view controls are supported for this property.
	 */
	readonly bg: string;

	/**
	 * For a list view control with checkboxes enabled, returns or sets the check state of the item.
	 *
	 * Check states are **0** (unchecked), **1** (checked), **2** (indeterminate), **3** (unchecked/disabled), **4** (checked/disabled), **5** (indeterminate/disabled).
	 */
	readonly checked: number;

	/**
	 * Returns or sets the optional data value associated with this item.
	 */
	readonly data: number;

	/**
	 * For a list view control, returns or sets the disable state of this item. When a list view item is disabled it appears ghosted and can't be selected or right-clicked.
	 */
	readonly disabled: boolean;

	/**
	 * Set or query the color used for the text (foreground) of this control. This is in the format #RRGGBB (hexadecimal) or RRR,GGG,BBB (decimal).
	 *
	 * Currently only items in list view controls are supported for this property.
	 */
	readonly fg: string;

	/**
	 * Returns or sets the list view group that this item is a member of.
	 */
	readonly group: number;

	/**
	 * For a list view control, returns or sets the icon associated with this item. You can specify the path of a file or folder to use its icon, or a file extension (e.g. ".txt") to use a generic filetype icon. You can also set it to "dir", "file", "ftp" and "ftps" to use generic icons. You can also extract an icon from a DLL or EXE by providing the path of the file followed by a comma and then the icon index within the file.
	 */
	readonly icon: string;

	/**
	 * Returns the 0-based index of this item within the control.
	 *
	 * For a combo edit box, this will return -1 if the user typed in a string rather than selecting one from the list. The string they entered can be retrieved from the name property.
	 */
	readonly index: number;

	/**
	 * Returns or sets the item's name.
	 */
	readonly name: string;

	/**
	 * Returns or sets the item's selection state. Mostly useful with multiple-selection list box controls.
	 */
	readonly selected: boolean;

	/**
	 * Returns or sets the text style this item will be displayed in. You should provide a string containing one or more of the following flags: "b" (bold), "i" (italics), "u" (underline).
	 *
	 * Currently only items in list view controls are supported for this property.
	 */
	readonly style: string;

	/**
	 * For a list view control in Details mode, returns a collection of strings that lets you query or change the text of the item's sub-items. There will be one string in the collection for each column in the list, excluding the first column.
	 *
	 * For example, assuming the list has three columns in total, the string for the first column would be set using the name property above. The strings for the second and third columns would be set with subitems(0) and subitems(1).
	 */
	readonly subitems: string;

}

/**
 * The DialogOption object is used with the options property of the Dialog object. A collection of five of these is provided, and any you initialize will be displayed to the user as physical checkbox controls.
 * @see {DOpusDialog}
 */
interface DOpusDialogOption {

	/**
	 * Set this to the desired label of the checkbox.
	 */
	readonly label: string;

	/**
	 * Set this to the desired initial state of the checkbox. When the Dialog.Show method returns, you can read this property to find out the state the user chose.
	 */
	readonly state: boolean;

}

/**
 * If a script add-in implements the OnDisplayModeChange event, the method receives a DisplayModeChangeData object when the display mode is changed in a tab.
 * @see {DOpusOnDisplayModeChange}
 */
interface DOpusDisplayModeChangeData {

	/**
	 * Returns a string indicating the new display mode. Will be one of *largeicons, smallicons, list, details, power, thumbnails* or *tiles*.
	 */
	readonly mode: string;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

	/**
	 * Returns a Tab object representing the tab the display mode changed in.
	 */
	readonly tab: DOpusTab;

}

/**
 * A collection of Dock objects is accessed from the Toolbar .docks property. It corresponds to a currently open floating toolbar.
 * @see {DOpusToolbar}
 *
 * @returns {number} This is a handle to the window of the floating toolbar. It is not particularly useful.
 */
interface DOpusDock extends Number {

}

/**
 * The DocMeta object is retrieved from the Metadata .doc or Metadata .doc_text properties. It provides access to metadata relating to document files.
 * @see {DOpusMetadata}
 */
interface DOpusDocMeta {

	/**
	 * Returns the value of the specified column, as listed in the Documents section of the Keywords for Columns page.
	 */

	/**
	 * Authors
	 */
	readonly author: any;

	/**
	 * Category
	 */
	readonly category: any;

	/**
	 * Comment
	 */
	readonly comments: any;

	/**
	 * Company
	 */
	readonly companyName: any;

	/**
	 * Copyright
	 */
	readonly copyright: any;

	/**
	 * Creator
	 */
	readonly creator: any;

	/**
	 * Document created date
	 */
	readonly docCreatedDate: any;

	/**
	 * Last edit time
	 */
	readonly docEditTime: any;

	/**
	 * Last saved by
	 */
	readonly docLastSavedBy: any;

	/**
	 * Last saved date
	 */
	readonly docLastSavedDate: any;

	/**
	 * Pages
	 */
	readonly pages: any;

	/**
	 * Producer
	 */
	readonly producer: any;

	/**
	 * Subject
	 */
	readonly subject: any;

	/**
	 * Title
	 */
	readonly title: any;

}


interface DOpusConstructor {
	/**
	 * The Aliases object gives the script access to the defined folder aliases.
	 */
	readonly aliases: DOpusAliases;

	/**
	 * Returns a collection of Format objects representing the used-defined favorite formats.
	 */
	readonly favoriteformats: DOpusFormat;

	/**
	 * Returns a Favorites object which lets you query and modify the user-defined favorite folders.
	 */
	readonly favorites: DOpusFavorites;

	/**
	 * Returns a FiletypeGroups object which lets you enumerate and query the configured file type groups.
	 */
	readonly filetypegroups: DOpusFiletypeGroups;

	/**
	 * Returns a GlobalFilters object which lets you access information about the global filter settings (configured on the Folders / Global Filters page in Preferences).
	 */
	readonly filters: DOpusGlobalFilters;

	/**
	 * Returns a string representing the current user interface language.
	 */
	readonly language: string;

	/**
	 * Returns a Listers object which represents any currently open Lister windows (each one is represented by a Lister object).
	 */
	readonly listers: DOpusListers;


	/**
	 * Returns a SmartFavorites object which lets you query the SmartFavorites data.
	 */
	readonly smartfavorites: DOpusSmartFavorites;

	/**
	 * Returns a ScriptStrings object which lets your script access any strings defined as string resources.
	 */
	readonly strings: DOpusScriptStrings;

	/**
	 * Returns a TabGroups object which lets your script access and manipulate the configured folder tab groups.
	 */
	readonly tabgroups: DOpusTabGroups;

	/**
	 * This Vars object represents all defined variables with global scope.
	 */
	readonly vars: DOpusVars;

	/**
	 * The Version object provides information about the current Opus program version.
	 */
	readonly version: DOpusVersion;

	/**
	 * Returns a Viewers object which represents any currently open standalone image viewers (each one is represented by a Viewer object).
	 */
	readonly viewers: DOpusViewers;

	/**
	 * Clears the script output log.
	 */
	clearOutput(): void;

	/**
	 * Creates and returns a new DOpusFactory object, which can be used to create various lightweight helper objects like Blob, Map and Vector.
	 */
	create(): DOpusFactoryConstructor;

	/**
	 * Delays for the specified number of milliseconds before returning.
	 */
	delay(time?: number): void;

	/**
	 * Creates a new Dialog object, that lets you display dialogs and popup menus.
	 *
	 * **Note:** Scripts should not usually use this when responding to events triggered by toolbars or folder tabs. The Dialog returned by DOpus.Dlg will not have its parent window configured. Most scripting events provide you an object which can either create a pre-configured Dialog or which includes a SourceTab property or similar which can do the same. In almost all situations you should use those instead.
	 */
	dlg(): DOpusDialog;


	/**
	 * Creates the DPI helper object which assists when dealing with different system scaling settings (e.g. high-DPI monitors).
	 */
	dpi(): DOpusDPI;


	/**
	 * Creates a new FSUtil object, that provides helper methods for accessing the file system.
	 */
	fsUtil(): DOpusFSUtil;

	/**
	 * Retrieves the current contents of the system clipboard, if it contains either text or files.
	 *
	 * You can control the returned type by passing either "text" or "files" for the <type> argument - Opus will convert to the requested type if possible.
	 *
	 * If <type> is not specified the contents will be returned in their native format.
	 */
	getClip(type?: string): string | DOpusItem;


	/**
	 * Returns a string indicating the native format of the clipboard contents - **"text"**, **"files"** or an *empty string* in any other case.
	 */
	getClipFormat(): string;

	/**
	 * Returns a string indicating which qualifier keys are currently held down. If none are held down, the string will be "none". Otherwise, the string can contain any or all of the following, separated by commas: **"shift"**, **"ctrl"**, **"alt"**, **"lwin"**, **"rwin"**.
	 *
	 * Note that many events pass you a similar list of qualifiers. If you are passed a list of qualifiers, you should generally use that list rather than call DOpus.GetQualifiers.
	 *
	 * For example, script commands are passed a Func object with a qualifiers property. That property will tell you which keys were held down when the command was triggered, and that may be different to the keys held down a few seconds later. When the user clicks a button to run a command, they normally expect the command to use the keys they held when they clicked, not the keys they are touching later while waiting for it to finish.
	 *
	 * Similarly, events like OnBeforeFolderChange will often pass you an object like BeforeFolderChangeData containing a qualifiers property which indicates key state when the event was triggered. You should normally use that instead of calling DOpus.GetQualifiers.
	 *
	 * If you do call DOpus.GetQualifiers, you would normally want to call it as soon as possible and then store the result, so there is less time for the user to let go of a key after triggering your script.
	 *
	 * If you call DOpus.GetQualifiers more than once, you may get a different result each time, due to keys being pushed or released between calls. Call it once and store the result if you need to do multiple checks and need them to be consistent. This does not generally affect the qualifiers properties mentioned earlier, since they are usually stored snapshots of the key state.
	 */
	getQualifiers(): string;

	/**
	 * Loads an image file from the specified external file. You can optionally specify the desired size to load the image at, and whether the alpha channel (if any) should be loaded or not.
	 *
	 * You can also provide a Blob object containing the image data instead of a filename.
	 *
	 * The returned Image object can be given as the value of the Control.label property for a static control in a script dialog (when that control is in "image" mode). You can also assign as to the icon property of a Dialog object to specify a custom window icon for your script dialog.
	 *
	 */
	loadImage(filename?: string | DOpusBlob, width?: number, height?: number, alpha?: boolean): DOpusImage;

	/**
	 * Extracts a thumbnail from the specified external file. You can optionally specify a timeout (in milliseconds) and the desired size to load the thumbnail at.
	 *
	 * The optional flags value supports the following flags (supplied as a string):
	 *
	 * * **i** - prevents Opus from waiting for thumbnails that may take some time to generate, and instead returns a large icon if the thumbnail can't be generated immediately.
	 * * **c** - modifies the i flag to only apply to Cloud storage folders.
	 *
	 * If loading fails (or the timeout expires before the thumbnail could be generated) this method returns False.
	 *
	 * The returned Image object can be given as the value of the Control.label property for a static control in a script dialog (when that control is in "image" mode). You can also assign as to the icon property of a Dialog object to specify a custom window icon for your script dialog.
	 */
	loadThumbnail(filename?: string, timeout?: number, width?: number, height?: number): DOpusImage | false;

	/**
	 * Prints the specified text string to the script output log (found in the Utility Panel, the CLI in script mode, the Rename dialog and the Command Editor in script mode).
	 *
	 * If the second argument is provided and set to True, the message will be displayed as an error. This means the text will be displayed in red and if no log windows are currently open, a warning icon will flash in the Lister status bar to alert the user of an error condition.
	 *
	 * If the optional third argument is provided and set to True then the log message will have a timestamp prepended to it. Timestamps only appear in the utility panel, not in places like the Command Editor's output panel. Error messages always get timestamps so if the second argument is True then the third is ignored
	 */
	output(text?: string | boolean | number, error?: boolean, timestamp?: boolean): void;

	/**
	 * Causes Opus to reload and reinitialize the specified script. You must provide the full pathname of the script on disk (if a script add-in wants to reload itself you can pass the value of the Script.file property).
	 */
	reloadScript(file?: string): void;

	/**
	 * Places the specified text, or Item collection (or Vector of Item objects) on the system clipboard. If called with no arguments the clipboard will be cleared.
	 */
	setClip(text?: string | DOpusItem | DOpusVector<DOpusItem>): void;

	/**
	 * Returns a Toolbars object which lets you enumerate all defined toolbars (whether they are currently open or not).
	 *
	 * You can restrict this object to only return in-use toolbars by specifying the optional type parameter - specify "listers" to only return toolbars currently turned on in a Lister, and "docks" to only return toolbars that are currently floating.
	 */
	toolbars(type?: string): DOpusToolbars;

	/**
	 * Returns a string indicating the type of an object or variable.
	 */
	typeOf(arg0: any): string;

}

declare var DOpus: DOpusConstructor;


/**
 * The DOpusFactory object is a helper object that you can use to create various other objects. Unlike the objects that represent existing things (e.g. Lister or Tab ), the objects created by DOpusFactory are independent objects that you can instantiate whenever you need their functionality. The DOpusFactory object is obtained via the DOpus .Create method.
 * @see {DOpusLister}
 * @see {DOpusTab}
 * @see {DOpusConstructor}
 */
interface DOpusFactoryConstructor {

	/**
	 * Returns a new Blob object, that lets you access and manipulate a chunk of binary data from a script. If no parameters are given the new Blob will be empty - you can set its size using the resize method - otherwise you can specify the initial size as a parameter.
	 *
	 * You can also create a Blob pre-filled with data by specifying the actual byte values (e.g. Blob(72,69,76,76,79)).
	 *
	 * If another Blob (or an array - see the documentation on the Blob object for a discussion of this) is given then the new Blob will be created as a copy of the existing one.
	 */
	blob(size?: number, source?: number | DOpusBlob): DOpusBlob;

	/**
	 * Creates a new BusyIndicator object, that lets you control the breadcrumbs bar busy indicator from your script.
	 */
	busyIndicator(): DOpusBusyIndicator;

	/**
	 * Creates a new Command object, that lets you run Opus commands from a script.
	 */
	command(): DOpusCommand;

	/**
	 * Creates a new Date object. If an existing Date object or date value is specified the new object will be initialized to that value, otherwise the date will be set to the current local time.
	 */
	date(date?: any): DOpusDate;

	/**
	 * Creates a new Map object. If no arguments are provided, the Map will be empty. Otherwise, the Map will be pre-initialized with the supplied key/value pairs. For example: Map("firstname","fred","lastname","bloggs");. The individual keys and values can be different types.
	 */
	map(key?: any, value?: any, ...keyValueTuples: any): DOpusMap;

	/**
	 * Creates a new case-sensitive StringSet object. If no arguments are provided, the StringSet will be empty. Otherwise it will be pre-initialized with the supplied strings; for example: StringSet("dog","cat","pony");
	 *
	 * You can also pass an array of strings or Vector object to initialise the set.
	 */
	stringSet(): DOpusStringSet;

	/**
	 * Creates a new case-insensitive StringSet object. If no arguments are provided, the StringSet will be empty. Otherwise it will be pre-initialized with the supplied strings.
	 */
	stringSetI(): DOpusStringSet;

	/**
	 * Creates a new StringTools object, that provides helper functions for string encoding and decoding.
	 */
	stringTools(): DOpusStringTools;

	/**
	 * Creates a new SysInfo object, that lets scripts access miscellaneous system information that may not be otherwise easy to obtain from a script.
	 */
	sysInfo(): DOpusSysInfo;


	/**
	 * Creates a new UnorderedSet object. If no arguments are provided the UnorderedSet will be empty. Otherwise it will be pre-initialized with the supplied elements.
	 *
	 * You can also pass an array or Vector to initialise the set.
	 */
	unorderedSet(): DOpusUnorderedSet;

	/**
	 * Creates a new Vector object. If no arguments are provided, the Vector will be empty.
	 *
	 * If a single integer argument is provided, the Vector will be pre-initialized to that number of elements.
	 *
	 * If more than one argument is provided, the Vector will be pre-initialized with those elements; for example: Vector("dog","cat","horse"); The individual elements can be different types.
	 *
	 * You can also pass another Vector or a JScript array as the argument to initialise the new Vector from an existing one.
	 */
	vector(elements?: number): DOpusVector<any>;

}

declare var DOpusFactory: DOpusFactoryConstructor;


/**
 * If a script add-in implements the OnDoubleClick event, the method receives a DoubleClickData object when the user double-clicks a file or folder.
 * @see {DOpusOnDoubleClick}
 */
interface DOpusDoubleClickData {

	/**
	 * Set this property to False to prevent the OnDoubleClick event being called for any further files during this operation (this is only effective if more than one file was double-clicked). Any remaining files will be opened according to their default handlers.
	 */
	call: boolean;

	/**
	 * Set this property to False to abort double-click processing altogether on any further files during this operation (this is only effective if more than one file was double-clicked).
	 */
	cont: boolean;

	/**
	 * Returns True if your OnDoubleClick event is being called with only a path (via the path property) and not a full Item object. This will occur if you set the ScriptInitData.early_dblclk property to True when initialising your script.
	 *
	 * When early is True, you can set the skipfull to True to prevent the second call with a full Item object.
	 */
	early: boolean;

	/**
	 * Returns True if the item double-clicked is a directory, False if it's a file.
	 */
	readonly is_dir: boolean;

	/**
	 * Returns a Item object representing the item that was double-clicked. This property is only present if the early property is False.
	 */
	readonly item: DOpusItem;

	/**
	 * Returns a string that indicates the mouse button that launched the double-click. The string can be one of the following: *left, middle, none.*
	 */
	readonly mouse: string;

	/**
	 * This is set to True if multiple files were double-clicked.
	 */
	readonly multiple: boolean;

	/**
	 * Returns a Path object providing the full pathname of the item that was double-clicked.
	 */
	readonly path: DOpusPath;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

	/**
	 * When the early property is True, set skipfull to True to prevent your OnDoubleClick event from being called a second time.
	 */
	readonly skipfull: boolean;

	/**
	 * Returns a Tab object representing the tab that the item was double-clicked in.
	 */
	readonly tab: DOpusTab;

}

/**
 * The DPI object is a helper object that provides a number of methods and properties relating to the system DPI setting. For example, you can use it to convert a pixel width into one scaled for the current system DPI. The DPI object is returned via the DOpus .DPI property.
 * @see {DOpusConstructor}
 */
interface DOpusDPI {

	/**
	 * Returns the system DPI setting as a “dpi value” (e.g. 96, 192).
	 */
	readonly dpi: number;

	/**
	 * Returns the DPI settings as a “scale factor” (e.g. 100, 125, 200).
	 */
	readonly factor: number;

	/**
	 * Divides the provided size by the system DPI; e.g. if the system DPI was set to 150%, DPI.Divide(60) would return 40.
	 */
	divide(value?: number): number;

	/**
	 * Scales the provided size by the system DPI; e.g. if the system DPI was set to 200%, DPI.Scale(75) would return 150.
	 */
	scale(value?: number): number;

}

/**
 * The Drive object provides information about a drive (hard drive, CD ROM, etc) on your system. You can obtain a Vector of Drive objects, one for each drive on your system, from the FSUtil .Drives method.
 * @see {DOpusVector}
 * @see {DOpusFSUtil}
 *
 * @returns {string} Returns the root of the drive (e.g. C:\).
 */
interface DOpusDrive extends String {

	/**
	 * Returns a FileSize object indicating the available free space on the drive.
	 */
	readonly avail: DOpusFileSize;

	/**
	 * Returns the bytes-per-cluster value for the drive.
	 */
	readonly bpc: number;

	/**
	 * Returns a string representing the filesystem type.
	 */
	readonly filesys: string;

	/**
	 * Returns a value representing filesystem flags for the drive.
	 */
	readonly flags: number;

	/**
	 * Returns a FileSize object indicating the total free space on the drive.
	 */
	readonly free: DOpusFileSize;

	/**
	 * Returns the drive's label.
	 */
	readonly label: string;

	/**
	 * Returns a FileSize object indicating the total size of the drive.
	 */
	readonly total: DOpusFileSize;

	/**
	 * Returns a string indicating the drive type (removable, fixed, remote, cdrom, ramdisk).
	 */
	readonly type: string;

}

/**
 * The ExeMeta object is retrieved from the Metadata .exe or Metadata .exe_text properties. It provides access to metadata relating to executable (program) files.
 * @see {DOpusMetadata}
 */
interface DOpusExeMeta {

	/**
	 * Returns the value of the specified column, as listed in the Programs section of the Keywords for Columns page.
	 */

	/**
	 * Copyright
	 */
	readonly copyright: any;

	/**
	 * Company
	 */
	readonly companyName: any;

	/**
	 * Module Description
	 */
	readonly modDesc: any;

	/**
	 * Module Version
	 */
	readonly modVersion: any;

	/**
	 * Product Name
	 */
	readonly prodName: any;

	/**
	 * Product Version
	 */
	readonly prodVersion: any;

}

/**
 * A Favorite object represents a favorite folder . It is retrieved by enumerating or indexing the Favorites object.
 * @see {DOpusFavorites}
 *
 * @returns {string} Returns the name of the favorite folder or sub-folder.
 */
interface DOpusFavorite extends String {

	/**
	 * Returns True if this is a sub-folder, False if it's a favorite folder or separator.
	 *
	 * If this object is a sub-folder it also behaves like a Favorites object as well as a Favorite object, and can be enumerated and have elements added and removed from it.
	 */
	readonly folder: boolean;

	/**
	 * Returns True if this is a separator.
	 */
	readonly separator: boolean;

	/**
	 * Returns the path this favorite folder refers to as a Path object.
	 */
	readonly path: DOpusPath;

	/**
	 * Changes the name of this favorite folder. Note that changes you make to the list are not saved until you call the Favorites.Save method.
	 */
	setName(name?: string): void;

	/**
	 * Changes the path this favorite folder refers to. Note that changes you make to the list are not saved until you call the Favorites.Save method.
	 */
	setPath(path?: string, Path?: object): void;

}

/**
 * The Favorites object holds a collection of all the defined favorite folders . It is retrieved from the DOpus .favorites property.
 * @see {DOpusConstructor}
 *
 * @returns {DOpusFavorite} You can enumerate the Favorites object to retrieve individual Favorite objects.
 */
interface DOpusFavorites extends DOpusFavorite {

	/**
	 * Adds a new favorite folder to the favorites list. Note that changes you make to the list are not saved until you call the Save method.
	 *
	 * This method performs three separate functions; it can add a separator, a sub-folder or a favorite folder.
	 *
	 * * To add a separator, the parameters should be the type string sep, optionally followed by the insertion position (see below).
	 *
	 * 	For example, `Favorites.Add("sep");`
	 *
	 * * To add a folder, the first parameter should be the string folder: followed by the name of the folder (as a single parameter), optionally followed by the insertion position.
	 *
	 * 	For example, `Favorites.Add("folder:Picture Locations");`
	 *
	 * * To add a new favorite, the first parameter can optionally be the name of the favorite, and the second parameter can be the path of the folder to add, or the name can be omitted and only the path can be provided. In either case you can optionally include the insertion position as the last parameter.
	 *
	 * 	For example, `Favorites.Add("myfave", "c:\folder\path");or Favorites.Add("c:\folder\path");`
	 *
	 * In all three cases the new item is added to the end by default, but you can optionally specify a position to insert the item somewhere else. E.g. specifying 0 for the insertion position would add it at the top of the list. You can provide either a number or another Favorite object.
	 *
	 * For example, `Favorites.Add("myfave", "c:\folder\path", 0);`
	 *
	 * The return value is either a Favorite or a Favorites object (depending on whether you added a sub-folder or a favorite folder).
	 */
	add(typeOrName?: string, path?: string, insertpos?: number, Favorite?: object): DOpusFavorite;

	/**
	 * Deletes the specified favorite or sub-folder. Note that changes you make to the list are not saved until you call the Save method.
	 */
	delete(Favorite?: object, Favorites?: object): void;

	/**
	 * Lets you locate a sub-folder one or more levels below the current one. The name parameter is the name or path and name of the sub-folder to look for (e.g. "myfave", "pictures/local", etc).
	 *
	 * The optional index parameter lets you handle the case when there might be more than one sub-folder with the same name. Favorites.Find("pictures", 1); would find the second sub-folder called "pictures" below the current level.
	 */
	find(name?: string, index?: number): DOpusFavorites;

	/**
	 * Saves any changes you've made to the favorites list. Once you call this method changes you have made will be reflected in Preferences and the favorites list in Listers. Note that you can only call this method on the main "root" Favorites object obtained from the DOpus.favorites property
	 */
	save(): void;

	/**
	 * Changes the name of this sub-folder. Note that changes you make to the list are not saved until you call the Save method. You can only call this method on Favorites objects that refer to sub-folders, and not the main "root" folder.
	 */
	setName(name?: string): void;

}

/**
 * The File object lets you read and write binary data from and to a file on disk (or in a Zip file, FTP site, etc). While the Microsoft Scripting.FileSystemObject object lets you read and write files already, it only supports text, not binary data. You can also use the File object to modify a file's attributes and timestamps.
 *
 * You can obtain a File object using the FSUtil .OpenFile and Item .Open methods. You can open a file in one of three modes:
 *
 * * read mode - you can read data from the file via the Read method. You cannot write to it or modify its attributes.
 * * write mode - you can write data to the file via the Write method, and you can also modify the file's attributes. You cannot read data from it.
 * * modify mode - you can modify the file's attributes and timestamps, but you cannot read or write data.
 * @see {DOpusFSUtil}
 * @see {DOpusItem}
 *
 * @returns {string} Returns the full pathname of the file.
 */
interface DOpusFile extends String {

	/**
	 * Returns a Win32 error code that indicates the success or failure of the last operation. If the previous operation succeeded this will generally be 0.
	 *
	 * For example, if you try to open a non-existing file for reading using FSUtil.OpenFile, a valid File object will be returned - but the file itself would not be open. You can check if error returns 0 before proceeding to use the File object.
	 */
	readonly error: number;

	/**
	 * Returns the full pathname of the file as a Path object.
	 */
	readonly path: DOpusPath;

	/**
	 * Returns a FileSize object representing the size of this file, in bytes.
	 */
	readonly size: DOpusFileSize;

	/**
	 * Returns a FileSize object representing the current position of the read or write cursor within this file, in bytes.
	 */
	readonly tell: DOpusFileSize;

	/**
	 * Closes the underlying file handle. After this call the File object is still valid but it can no longer read or write data.
	 *
	 * If you want to use the SetAttr method to modify the attributes of a file you have created, you may want to call Close first otherwise the file system will set the A (archive) attribute on the file whether you want it set or not.
	 *
	 * You may also want to close a file manually if you want to delete it, as some scripting languages (e.g. JScript) have lazy garbage collection and otherwise may keep the file handle open much longer than you intend.
	 */
	close(): void;

	/**
	 * Reads data from the file. If you provide a target Blob as the first parameter, the data will be stored in that Blob. Otherwise, a Blob will be created automatically.
	 *
	 * The optional size parameter specifies the number of bytes to read - the default behavior is to read the remaining contents of the file.
	 *
	 * If you provide a Blob then the return value indicates the number of bytes read successfully from the file. If a Blob isn't provided then the return value is the automatically created Blob - you can use its size property to discover the number of bytes that were read.
	 */
	read(target?: DOpusBlob, size?: number): DOpusBlob;

	/**
	 * Moves the read or write cursor within this file. The delta parameter specifies how many bytes to move - how this is interpreted depends on the optional method parameter:
	 *
	 * * **b** - move relative to the beginning of the file
	 * * **e** - move relative to the end of the file
	 * * **c** - move relative to the current position (this is the default method)
	 *
	 * The return value is a FileSize object indicating the new cursor position.
	 */
	seek(delta?: number, method?: string): DOpusFileSize;

	/**
	 * Modifies the attributes of this file. You can either pass a string indicating the attributes to set, or a FileAttr object. When using a string, valid attributes are:
	 *
	 * * **a** - archive
	 * * **c** - compressed
	 * * **e** - encrypted
	 * * **h** - hidden
	 * * **n** - normal
	 * * **r** - read-only
	 * * **s** - system
	 * * **p** - pinned
	 * * **i** - non-content indexed
	 *
	 * Note that both c and e attributes cannot be set at the same time.
	 *
	 * When you pass a string you can also use `+` and `-` to turn some attributes on or off without affecting others. For example, `SetAttr("-r")` would turn off the read-only attribute.
	 *
	 * The return value is True if the operation was successful.
	 */
	setAttr(attributes?: string): boolean;

	/**
	 * Modifies one or more of the file's timestamps. The create and access parameters are optional. If you wish to specify no change for a timestamp, specify 0.
	 *
	 * Timestamps are specified as local time - use SetTimeUTC to specify them as UTC.
	 *
	 * The return value is True for success.
	 */
	setTime(modify?: Date, create?: Date, access?: Date): boolean;

	/**
	 * Modifies one or more of the file's timestamps. The create and access parameters are optional. If you wish to specify no change for a timestamp, specify 0.Timestamps are specified as UTC time - use SetTime to specify them as local time.
	 *
	 * The return value is True for success.
	 */
	setTimeUTC(modify?: Date, create?: Date, access?: Date): boolean;

	/**
	 * Truncates the file at the current position of the write cursor. You can use this in conjunction with the Seek method to pre-allocate a file's space on disk, for greater performance (i.e. seek to the final size of the file, truncate at that point, and then seek back to the start and write the data).The return value is True for success.
	 */
	truncate(): boolean;

	/**
	 * Writes data from the specified Blob (or array) or string to the file. By default the entire contents of the Blob will be written - you can use the optional from parameter to specify the source byte offset, and the size parameter to specify the number of bytes to write.
	 *
	 * If you provide a string rather than a Blob the string will be automatically encoded as UTF-8.
	 *
	 * The return value indicates the number of bytes successfully written to the file.
	 */
	write(sourceStringOrBlob?: string | DOpusBlob, from?: number, size?: number): number;

}

/**
 * The FileAttr object is provided to make it easier to deal with file attributes. Rather than dealing with attributes as a string of characters, or a number, it provides properties for each attribute that can be set or queried independently. You can create a new FileAttr object using the FSUtil .NewFileAttr method. FileAttr objects are also returned by properties of the Format and Item objects.
 *
 * Each attribute is represented by two properties; a single character (e.g. a ) and its full name (e.g. archive ). Each property returns True if the attribute is set, and False if not. For FileAttr objects you create yourself, you can also set the value of these properties (and then, for example, apply the attributes to a file using the File .SetAttr method).
 * @see {DOpusFSUtil}
 * @see {DOpusFormat}
 * @see {DOpusItem}
 * @see {DOpusFile}
 *
 * @returns {string} Returns a string representing the attributes that are set (similar to the format displayed in the Attr column in the file display).
 */
interface DOpusFileAttr extends String {

	/**
	 * A file or directory that has changes which need archiving. The A bit is usually set on new or modifies files, and may then be cleared by backup software after it has added the changes to a backup.
	 */
	readonly a: boolean;

	/**
	 * A file or directory that has changes which need archiving. The A bit is usually set on new or modifies files, and may then be cleared by backup software after it has added the changes to a backup.
	 */
	readonly archive: boolean;

	/**
	 * A file or directory that is compressed. For a file, all of the data in the file is compressed. For a directory, compression is the default for newly created files and subdirectories.
	 */
	readonly c: boolean;

	/**
	 * A file or directory that is compressed. For a file, all of the data in the file is compressed. For a directory, compression is the default for newly created files and subdirectories.
	 */
	readonly compressed: boolean;

	/**
	 * A file or directory that is encrypted. For a file, all data streams in the file are encrypted. For a directory, encryption is the default for newly created files and subdirectories.
	 */
	readonly e: boolean;

	/**
	 * A file or directory that is encrypted. For a file, all data streams in the file are encrypted. For a directory, encryption is the default for newly created files and subdirectories.
	 */
	readonly encrypted: boolean;

	/**
	 * The file or directory is hidden. It is not included in an ordinary directory listing.
	 */
	readonly h: boolean;

	/**
	 * The file or directory is hidden. It is not included in an ordinary directory listing.
	 */
	readonly hidden: boolean;

	/**
	 * The file or directory is not to be indexed by the content indexing service.
	 */
	readonly i: boolean;

	/**
	 * The file or directory is not to be indexed by the content indexing service.
	 */
	readonly nonindexed: boolean;

	/**
	 * The data of a file is not available immediately. This attribute indicates that the file data is physically moved to offline storage. This attribute is used by Remote Storage, which is the hierarchical storage management software. Applications should not arbitrarily change this attribute.
	 */
	readonly o: boolean;

	/**
	 * The data of a file is not available immediately. This attribute indicates that the file data is physically moved to offline storage. This attribute is used by Remote Storage, which is the hierarchical storage management software. Applications should not arbitrarily change this attribute.
	 */
	readonly offline: boolean;

	/**
	 * The data of the file is to be kept available at all times; it should not be offloaded to offline storage.
	 */
	readonly p: boolean;

	/**
	 * The data of the file is to be kept available at all times; it should not be offloaded to offline storage.
	 */
	readonly pinned: boolean;

	/**
	 * A file that is read-only. Applications can read the file, but cannot write to it or delete it. This attribute is not honored on directories.
	 */
	readonly r: boolean;

	/**
	 * A file that is read-only. Applications can read the file, but cannot write to it or delete it. This attribute is not honored on directories.
	 */
	readonly readonly: boolean;

	/**
	 * A file or directory that the operating system uses a part of, or uses exclusively.
	 */
	readonly s: boolean;

	/**
	 * A file or directory that the operating system uses a part of, or uses exclusively.
	 */
	readonly system: boolean;

	/**
	 * Assigns a new set of attributes to this object. You can pass another FileAttr object, or a string (e.g. "hsr").
	 */
	assign(): void;

	/**
	 * Given a single character representing an attribute (e.g. "a") this method returns the name of the attribute in the user's current language (e.g. "Archive").
	 */
	attrName(): string;

	/**
	 * Clears (turns off) the specified attributes in this object. You can pass another FileAttr object, or a string representing the attributes to turn off.
	 */
	clear(): void;

	/**
	 * Sets (turns on) the specified attributes in this object. You can pass another FileAttr object, or a string representing the attributes to turn on.
	 */
	set(): void;

	/**
	 * Returns a string representing the attributes that are set (similar to the format displayed in the Attr column in the file display).
	 */
	toString(): string;

}

/**
 * The FileGroup object exposes information about a file group (when the file display is set to group by a particular column). The Tab .filegroups property returns a collection representing the current file groups in that tab, and the Item .filegroup property returns the current file group of a particular item.
 * @see {DOpusTab}
 * @see {DOpusItem}
 *
 * @returns {string} Returns the name of the group.
 */
interface DOpusFileGroup extends String {

	/**
	 * Returns True if the group is currently collapsed.
	 */
	readonly collapsed: boolean;

	/**
	 * Returns the number of items in this group. Note that groups can be empty; empty groups are not displayed in the file display but will still be returned by the Tab.filegroups property.
	 */
	readonly count: number;

	/**
	 * Returns the id number of this group. Id numbers are arbitrary - you shouldn't place any meaning on the actual value, but you can compare the id fields as an easy way to tell if two items are in the same group.
	 */
	readonly id: number;

	/**
	 * Returns a collection of Item objects that represents all the files and folders in this group.
	 */
	readonly members: DOpusItem;

	/**
	 * Returns a string indicating the collation type of the group.
	 */
	readonly type: string;

}

/**
 * If a script add-in implements the OnFileOperationComplete event, the method receives a FileOperationCompleteData object whenever a supported file operation begins. If you return True to indicate that you want to be notified about the operation, you'll receive another call when the operation is complete.
 * @see {DOpusOnFileOperationComplete}
 */
interface DOpusFileOperationCompleteData {

	/**
	 * Returns a string that indicates the type of file operation. Currently the only supported value is "rename".
	 */
	readonly action: string;

	/**
	 * Returns a string that provides the entire command line that launched this operation.
	 */
	readonly cmdline: string;

	/**
	 * When the query property is False this provides further information about the operation that completed.
	 *
	 * For "rename" this returns a Map object that provides a map of all items that were renamed and their new names.
	 */
	readonly data: any;

	/**
	 * Returns a Path object representing the destination path of the operation.
	 */
	readonly dest: DOpusPath;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the operation was initiated.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin *
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

	/**
	 * Returns True the first time the OnFileOperationComplete event is called. You should examine the action and other properties and return True if you decide you want notification about this operation. This will be False when you are called the second time, when the operation is complete.
	 */
	readonly query: boolean;

	/**
	 * Returns a Path object representing the source path of the operation.
	 */
	readonly source: DOpusPath;

	/**
	 * Returns a Tab object representing the source folder tab.
	 */
	readonly tab: DOpusTab;

}

/**
 * The FileSize object is provided to make it easier to deal with variables representing file sizes. It's very common these days for files to be larger than 4GB but unfortunately ActiveX scripting does not have proper support for the 64-bit integers needed to represent such large numbers. Therefore, any time a file size or number representing a number of bytes is returned by the Opus scripting objects, it is as a FileSize object. For example, the Item .size property returns a FileSize representing the size of a particular file or folder.
 *
 * You can create a new FileSize object using the FSUtil.NewFileSize method. A FileSize object normally represents an unsigned 64 bit integer but if you specify the "s" flag on creation, it will store a signed integer instead.
 *
 * @see {DOpusItem}
 *
 * @returns {string} Returns the number of bytes represented by this FileSize object as a string.
 */
interface DOpusFileSize extends String {

	/**
	 * Returns the number of bytes as a currency value. This is a 64 bit data type but it is stored as a fractional value, so you must multiply the returned value by 10000 to obtain the actual byte size.
	 */
	readonly cy: DOpusCurrency;

	/**
	 * Returns the number of bytes as an automatically formatted string (e.g. if the FileSize value is 1024, the string 1 KB would be returned).
	 */
	readonly fmt: string;

	/**
	 * Returns the highest (most significant) 32 bits of the file size. Not all scripting languages support this data type (e.g. VBScript does not).
	 */
	readonly high: number;

	/**
	 * Returns the highest 32 bits of the file size as a hexadecimal string.
	 */
	readonly highhex: string;

	/**
	 * Returns the lowest (least significant) 32 bits of the file size.
	 */
	readonly low: number;

	/**
	 * Returns the lowest 32 bits of the file size as a hexadecimal string.
	 */
	readonly lowhex: string;

	/**
	 * Returns the number of bytes as a decimal value. This is a 64 bit data type but not all scripting languages support it (e.g. VBScript does not).
	 */
	readonly val: number;

	/**
	 * Returns the number of bytes as a hexadecimal string.
	 */
	readonly valhex: string;

	/**
	 * Adds the supplied value to the value of this FileSize object. You can pass a string, int or currency type, or another FileSize object.
	 */
	add(): void;

	/**
	 * Clones this FileSize object and returns a new one set to the same value.
	 */
	clone(): DOpusFileSize;

	/**
	 * Compares the supplied value with the value of this FileSize object. The return value will be **0** (equal), **1** (greater) or **-1** (less).
	 */
	compare(): number;

	/**
	 * Divides the value of this FileSize object with the supplied value. You can pass a string, int or currency type, or another FileSize object.
	 */
	div(): void;

	/**
	 * Multiplies the value of this FileSize object with the supplied value. You can pass a string, int or currency type, or another FileSize object.
	 */
	mult(): void;

	/**
	 * Sets the FileSize to the supplied value. You can pass a string, int or currency type, or another FileSize object. You can also pass a Blob consisting of exactly 1, 2, 4 or 8 bytes, in which case the data contained in the Blob will be used to form the number. You can use a hexadecimal string by pre-pending `$` or `0x`.
	 */
	set(): void;

	/**
	 * Subtracts the supplied value from the value of this FileSize object. You can pass a string, int or currency type, or another FileSize object. Note that the FileSize object is unsigned and so the value cannot go below zero.
	 *
	 * @returns nothing but string is needed for default value compatibility
	 */
	sub(): string;

	/**
	 * Returns a Blob containing the bytes that make up the current value. By default 8 bytes will be copied to the Blob (the full 64 bit number) but you can pass an alternative number of bytes (1, 2 or 4) as a parameter to truncate the value.
	 */
	toBlob(): DOpusBlob;

}

/**
 * The FiletypeGroup object represents a file type group (as configured in the File Type Groups section of the file type editor ). You can find out which groups a file belongs to by querying the Item .groups property, or by using the FiletypeGroups object.
 *
 * This object can be enumerated to retrieve the file extensions it represents.
 *
 * @see {DOpusItem}
 * @see {DOpusFiletypeGroups}
 *
 * @returns {string} Returns the internal name of this group.
 *
 * The internal name is always the same in all languages.
 *
 * Groups that come pre-defined when you install Opus have internal names like "Archives" and "Music" (which are also their English display names).
 *
 * User-defined groups have internal names which are unique, automatically generated GUID strings like "{C4B716ED-2A9C-43C6-B325-7DADDEEFADA9}".
 */
interface DOpusFiletypeGroup extends String {

	/**
	 * Returns the display name of this group. The display name is what you see in the File Types editor. Display names may be translated differently in different languages.
	 */
	readonly display_name: string;

	/**
	 * Returns the tiles mode definition string for this group.
	 */
	readonly tiles: string;

	/**
	 * Returns the tooltip definition string for this group.
	 */
	readonly tooltip: string;

	/**
	 * Tests the filename (or extension) for membership of this group. Returns True if the file is a member of the group, or False if it is not.
	 */
	matchExt(filename?: string): boolean;

}

// CREDITS:
// https://www.damirscorner.com/blog/posts/20190712-ChangeMethodSignatureInTypescriptSubclass.html
// original example which removes 'get' method from Map,
// so that its signature can be changed in an extending subclass
// type MapWithoutGet = new<K, V>(entries?: ReadonlyArray<readonly [K, V]> | null)
// => { [P in Exclude<keyof Map<K, V>, 'get'>] : Map<K, V>[P] }
type DOpusFiletypeGroupWithoutMatchExt = new() => { [P in Exclude<keyof DOpusFiletypeGroup, 'matchExt'>] : DOpusFiletypeGroup[P] };


/**
 * The FileTypeGroups object represents a collection of FiletypeGroup objects. The object can be enumerated to retrieve the groups it represents.
 *
 * You can obtain an object representing all the configured file type groups from the DOpus.filetypegroups property. The Item .groupsobject property returns a FiletypeGroups object restricted to just the groups the Item is a member of.
 *
 * @see {DOpusFiletypeGroup}
 *
 * @returns {DOpusFiletypeGroup} Lets you enumerate the file type groups represented by this object.
 */
interface DOpusFiletypeGroups extends DOpusFiletypeGroupWithoutMatchExt {

	/**
	 * Searches the file type group collection for the named group.
	 *
	 * If Opus is not running in English, the translated name is compared first; if not found, it will search for the native English name for the built-in groups.
	 *
	 * Returns a FiletypeGroup object or False if not found.
	 * @returns {DOpusFiletypeGroup|false}
	 */
	getGroup(group?: string): DOpusFiletypeGroup;


	/**
	 *Returns a new FiletypeGroups object containing the subset of groups that the specified filename (or file extension) is a member of. You would normally only call this method on the object returned by the DOpus.filetypegroups property.
	 */
	matchExt(filename?: string): DOpusFiletypeGroups;

	/**
	 * Returns the translated name of the named built-in file type group.
	 *
	 * If not found, or no translation exists, the input string is returned.
	 *
	 * For example, when running in French, calling this method with "Movies" as the input string would return "Vidéos".
	 */
	translate(group?: string): string;

}

/**
 * If a script add-in implements the OnFlatViewChange event, the method receives a FlatViewChangeData object when the Flat View mode is changed in a tab.
 * @see {DOpusOnFlatViewChange}
 */
interface DOpusFlatViewChangeData {

	/**
	 * Returns a string indicating the new Flat View mode. Will be one of *off, grouped, mixed* or *mixednofolders*.
	 */
	readonly mode: string;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

	/**
	 * Returns a Tab object representing the tab the Flat View mode changed in.
	 */
	readonly tab: DOpusTab;

}

/**
 * The FolderEnum object is returned from the FSUtil .ReadDir method. It lets you enumerate (optionally, recursively) the contents of a folder.
 * @see {DOpusFSUtil}
 */
interface DOpusFolderEnum {

	/**
	 * True if the enumeration is complete, otherwise False.
	 */
	readonly complete: boolean;

	/**
	 * If an error occurs this will return the error code. It will return 0 on success.
	 */
	readonly error: number;

	/**
	 * Closes the underlying file system handle used to perform the enumeration. You might call this method if you want to delete the folder you just enumerated. After this method is called the complete property will return True.
	 */
	close(): void;

	/**
	 * Returns the next item in the enumeration.
	 *
	 * By default (with no arguments provided) a single Item object is returned. For higher performance, you can specify a number as the first argument to return more than one item at once - in this case, a Vector of Item objects is returned instead. Specify -1 to return all items in the folder in one call.
	 *
	 * You can also create your own Vector and pass it as the second argument to stop Opus creating a new Vector each time.
	 */
	next(count?: number, vector?: DOpusVector<any>): DOpusItem;

}

/**
 * The FontMeta object is retrieved from the Metadata .font property. It provides access to metadata relating to font files. The fields in this object correspond to those in the Windows SDK LOGFONT structure; further information about their meaning can be found on the MSDN website .
 * @see {DOpusMetadata}
 */
interface DOpusFontMeta {

	/**
	 * The character set.
	 */
	readonly charset: number;

	/**
	 * The clipping precision.
	 */
	readonly clipPrecision: number;

	/**
	 * The angle, in tenths of degrees, between the escapement vector and the x-axis of the device.
	 */
	readonly escapement: number;

	/**
	 * The typeface name of the font.
	 */
	readonly fontName: string;

	/**
	 * The height, in logical units, of the font's character cell or character.
	 */
	readonly height: number;

	/**
	 * An italic font if set to True.
	 */
	readonly italic: boolean;

	/**
	 * The angle, in tenths of degrees, between each character's base line and the x-axis of the device.
	 */
	readonly orientation: number;

	/**
	 * The output precision.
	 */
	readonly outPrecision: number;

	/**
	 * The pitch and family of the font.
	 */
	readonly pitchAndFamily: number;

	/**
	 * The output quality.
	 */
	readonly quality: number;

	/**
	 * A strikeout font if set to True.
	 */
	readonly strikeout: boolean;

	/**
	 * An underlined font if set to True.
	 */
	readonly underline: boolean;

	/**
	 * The weight of the font in the range 0 through 1000.
	 */
	readonly weight: number;

	/**
	 * The average width, in logical units, of characters in the font.
	 */
	readonly width: number;

}

/**
 * The Format object represents the current display format of a tab. It is obtained from the Tab .format property.
 * @see {DOpusTab}
 */
interface DOpusFormat {

	/**
	 * Returns True if folders are always sorted alphabetically, False if otherwise.
	 */
	readonly alpha_folders: boolean;

	/**
	 * Returns True if column width auto-sizing is enabled, False if otherwise.
	 */
	readonly autosize: boolean;

	/**
	 * Returns a collection of Column objects that represent all the individual columns currently added to the display.
	 */
	readonly columns: DOpusColumn;

	/**
	 * Returns a Vector of strings representing the explanation of the current folder format (the same text visible when hovering the mouse over the format lock icon in the status bar).
	 */
	readonly format_explain: DOpusVector<string>;

	/**
	 * Returns a string that indicates the state of the option to automatically calculate folder sizes. The string returned will be one of default, on or off.
	 */
	readonly getsizes: string;

	/**
	 * If grouping is enabled, returns the name of the column that the list is grouped by.
	 */
	readonly group_by: string;

	/**
	 * Returns True if the Individual groups option is enabled.
	 */
	readonly group_individual: boolean;

	/**
	 * Returns True if the groups are sorted in reverse order.
	 */
	readonly group_reverse: boolean;

	/**
	 * Returns a FileAttr object indicating the file attributes that are hidden (any items with these attributes set will be hidden from the display).
	 */
	readonly hide_attr: DOpusFileAttr;

	/**
	 * Returns the wildcard pattern of folders that are hidden from the display.
	 */
	readonly hide_dirs: string;

	/**
	 * Returns True if the current hide_dirs pattern is using regular expressions.
	 */
	readonly hide_dirs_regex: boolean;

	/**
	 * Returns True if filename extensions are hidden, or False if they are displayed.
	 */
	readonly hide_ext: boolean;

	/**
	 * Returns the wildcard pattern of files that are hidden from the display.
	 */
	readonly hide_files: string;

	/**
	 * Returns True if the current hide_files pattern is using regular expressions.
	 */
	readonly hide_files_regex: boolean;

	/**
	 * Returns a FileAttr object indicating the folder attributes that are hidden (any folders with these attributes set will be hidden from the display). If the separate folder attribute filter is disabled this property will return the string "off".
	 */
	readonly hide_folder_attr: DOpusFileAttr;

	/**
	 * Returns the filename prefixes that are ignored when sorting the list.
	 */
	readonly ignore_prefix: string;

	/**
	 * Returns True if the folder format is locked in the tab.
	 */
	readonly locked: boolean;

	/**
	 * Returns True if manual sorting is enabled.
	 */
	readonly manual_sort: boolean;

	/**
	 * If manual sorting is active, returns the name of the current sort order (if it has one).
	 */
	readonly manual_sort_name: string;

	/**
	 * If manual sort is active, returns a SortOrder object which lets you query and change the sort order.
	 */
	readonly manual_sort_order: DOpusSortOrder;

	/**
	 * Returns a string indicating the current file/folder mixing type. The string returned will be one of mixed, files (files first) or dirs (folders first).
	 */
	readonly mix_type: string;

	/**
	 * Returns True if filenames and extensions are sorted separately.
	 */
	readonly name_ext: boolean;

	/**
	 * Returns True if numeric name sorting is enabled.
	 */
	readonly numeric_name: boolean;

	/**
	 * Returns True if the over-all sort order is reversed.
	 */
	readonly reverse_sort: boolean;

	/**
	 * Returns a FileAttr object indicating the file attributes that are shown (only items with these attributes set will be shown in the display).
	 */
	readonly show_attr: DOpusFileAttr;

	/**
	 * Returns the wildcard pattern of folders that are shown (only folders matching this pattern will be shown).
	 */
	readonly show_dirs: string;

	/**
	 * Returns True if the current show_dirs pattern is using regular expressions.
	 */
	readonly show_dirs_regex: boolean;

	/**
	 * Returns the wildcard pattern of files that are shown.
	 */
	readonly show_files: string;

	/**
	 * Returns True if the current show_files pattern is using regular expressions.
	 */
	readonly show_files_regex: boolean;

	/**
	 * Returns a FileAttr object indicating the folder attributes that are shown (only folders with these attributes set will be shown in the display). If the separate folder attribute filter is disabled this property will return the string "off".
	 */
	readonly show_folder_attr: DOpusFileAttr;

	/**
	 * Returns True if the name column is sorted by filename extension rather than filename.
	 */
	readonly sort_ext: boolean;

	/**
	 * Returns a Column object representing the current sort field.
	 */
	readonly sort_field: DOpusColumn;

	/**
	 * Returns the current view mode as a string. The returned string will be one of large_icons, small_icons, list, details, power, thumbnails or tile.
	 */
	readonly view: string;

	/**
	 * Returns True if word sorting is enabled.
	 */
	readonly word_sort: boolean;

	/**
	 * The first time a script accesses a particular Format object, a snapshot is taken of the tab's format. If the script then makes changes to that tab (e.g. it changes the sort field, etc), these changes will not be reflected by the object. To re-synchronize the object with the tab, call the Format.Update method.
	 */
	update(): void;

}

/**
 * The FSUtil object provides several utility methods for dealing with the file system. It is obtained using the DOpus.FSUtil method.

 */
interface DOpusFSUtil {

	/**
	 * Compares the two provided path strings for equality - returns True if the two paths are equal, or False if otherwise.
	 *
	 * The optional flags parameter lets you modify the comparison behavior. This parameter is a string containing one or more of the following letters:
	 *
	 * * **c** - case sensitive (makes the comparison case sensitive)
	 * * **p** - parent (tests if path2 is a parent of, or equal to, path1)
	 */
	comparePath(path1?: string, path2?: string, flags?: string): boolean;

	/**
	 * Retrieves the display name of a path. This is the form of a path that is intended to be displayed to the user, rather than used internally by Opus. For example, for a library path it will strip off the internal ?xxxxxxx notation that Opus uses to identify library member folders.The optional flags parameter lets you modify the behavior. This parameter is a string containing one or more of the following letters:
	 *
	 * * **e** - for editing (returns a string designed for editing rather than for display)
	 * * **f** - file part (returns the display filename rather than the entire path)
	 * * **r** - resolve (resolves library paths to their underlying file system folder)
	 */
	displayName(path?: string, flags?: string): string;

	/**
	 * Returns a Vector of Drive objects, one for each drive on the system.
	 */
	drives(): DOpusVector<DOpusDrive>;

	/**
	 * Returns True if the specified file, folder or device exists, or False otherwise.
	 */
	exists(path?: string): boolean;

	/**
	 * Returns a StringSet containing the names of any alternate data streams (ADS) found for the specified file or folder.
	 */
	getADSNames(path: string): DOpusStringSet;

	/**
	 * Returns the localized text description for a system error code.
	 */
	getErrorMsg(error?: number): string;

	/**
	 * Creates an Item object for the specified file path.
	 */
	getItem(path?: string): DOpusItem;

	/**
	 * Returns a Metadata object representing the metadata for the specified file.
	 */
	getMetadata(path?: string): DOpusMetadata;

	/**
	 * Returns the value of one or more shell properties for the specified file. The file path must be provided as the first parameter. If the second parameter is the name (or PKEY) of the property to retrieve, the value of the property will be returned as the return value from this method.
	 *
	 * Alternatively, the second argument can be a Map object which lets you retrieve multiple properties at once. Each property you want to retrieve should be added to the Map with its name as a key, with an empty string as its value. The values in the Map will be replaced by the property values.
	 *
	 * The optional type argument lets you control how the properties are looked up by name. If the value of type is "R" then the first property whose raw name matches the supplied name will be used. If the value is "D" then the first property whose display name matches the supplied name will be used. If type is omitted then both raw and display names can match.
	 *
	 * Note that if a shell property is returned by the system as a SAFEARRAY type, it will be converted automatically to a Vector object.
	 */
	getShellProperty(path?: string, property?: string, properties?: DOpusMap, type?: string): any;

	/**
	 * Returns a Vector of ShellProperty objects which represents all the possible shell properties available on the system. You can optionally provide a wildcard pattern as the first argument - if you do, only properties whose names match the supplied pattern will be returned.
	 *
	 * The optional second argument lets you restrict the list of properties further. If the value of type is "R" then only properties whose raw name match the pattern will be returned. If the value is "D" then only properties whose display names match the pattern will be returned. If type is omitted then both raw and display names will be compared.
	 */
	getShellPropertyList(pattern?: string, type?: string): DOpusShellProperty;

	/**
	 * Creates a temporary folder (with a unique name) and returns the path to it in a Path object. Temporary folders created with this method have a limited lifetime after which Opus will automatically delete them (it will also clean them up when it's shutdown and restarted). The default lifetime is 20 minutes; you can change this using the optional parameter.
	 */
	getTempDirPath(lifetime?: number): DOpusPath;

	/**
	 * Creates a temporary file and returns a File object ready to be written to. You can obtain the name of the file using the File.path property.
	 *
	 * An optional prefix can be provided for the filename; if not provided (or an empty string is passed), the default is "dop".
	 *
	 * An optional suffix can also be provided; the default is ".tmp" if not provided.
	 *
	 * The valid values for the optional flags parameter are:
	 *
	 * * **d** - delete-on-close. File will be automatically deleted when closed.
	 * * **r** - read shareable. Other processes will be able to read from the file.
	 * * **w** - write shareable. Other processes will be able to write to the file.
	 *
	 * The optional window parameter lets you associate the File object with a Tab or a Lister, which will be used if Opus needs to display any dialogs (e.g. a UAC elevation dialog).
	 */
	getTempFile(suffix?: string, prefix?: string, flags?: string, window?: object): DOpusFile;

	/**
	 * Creates a temporary file (with a unique name) and returns the path to it in a Path object.
	 *
	 * An optional prefix can be provided for the filename; if not provided (or an empty string is passed), the default is "dop".
	 *
	 * An optional suffix can also be provided; the default is ".tmp" if not provided.
	*/
	getTempFilePath(prefix?: string, suffix?: string): DOpusPath;

	/**
	 * Returns a string indicating the type of the specified file path. The string will be either file, dir or invalid if the path doesn't exist. The optional flags argument is used to control the behavior with archives - normally an archive will be reported as dir, but if you specify "a" for the flags parameter it will be reported as file.
	 */
	getType(path?: string, flags?: string): string;

	/**
	 * Calculates a checksum for the specified file or Blob. By default the MD5 checksum is calculated, but you can use the optional type parameter to change the checksum algorithm - valid values are "md5", "sha1", "sha256", "sha512", "crc32", "crc32_php", and "crc32_php_rev".
	 *
	 * You can also specify multiple types (e.g. "md5,sha1,sha256") as the type, in which case then all checksums will be calculated at the same time, and the result will be returned as a Vector of strings (in the same order as you requested them).
	 *
	 * Unlike the other algorithms, CRC32 is a concept rather than a well-defined standard. We have provided the three CRC32 implementations you're most likely to encounter. "CRC32" is most common in the Windows world and matches what tools like 7-Zip and PKZip call "CRC32", and what PHP calls "CRC32b". "CRC32_PHP" is less common and matches what BZIP2 uses and what PHP outputs by default; "CRC32_PHP_REV" is the same but with the result's byte-order reversed, as output by some tools.
	 *
	 * Example (VBScript):
	 * ```vbscript
	 * DOpus.FSUtil.Hash("C:\Windows\Notepad.exe","md5")
	 * ```
	 */
	hash(pathOrBlob?: string | DOpusBlob, type?: string): string | DOpusVector<any>;

	/**
	 * Creates a new FileAttr object, which represents file attributes. You can initialize the new object by passing either a string representing the attributes to turn on (e.g. "hsr") or another FileAttr object. If you don't pass a value the new object will default to all attributes turned off.
	 */
	newFileAttr(): DOpusFileAttr;

	/**
	 * Creates a new FileSize object, which makes it easier to handle 64 bit file sizes. You can initialize this with a number of data types (int, string, decimal, currency, another FileSize object, or a Blob containing exactly 1, 2, 4 or 8 bytes). You can use a hexadecimal string by pre-pending $ or 0x.
	 *
	 * If the optional "s" flag is specified, the FileSize object will use a signed 64 bit value rather than unsigned.
	 */
	newFileSize(s?: string, size?: number): DOpusFileSize;

	/**
	 * Creates a new Path object initialised to the provided path string.
	 */
	newPath(path?: string): DOpusPath;

	/**
	 * Creates a new Wild object. If a pattern and flags are provided the pattern will be parsed automatically, otherwise you must call the Parse method to parse a pattern before using the object.See the description of the Wild.Parse method for a list of the valid flags.
	 */
	newWild(pattern?: string, flags?: string): DOpusWild;

	/**
	 *
	 * Opens or creates a file and returns a File object that lets you access its contents as binary data. You can pass a string or Path object representing a file to open, and you can also pass an existing Blob object to create a File object that gives you read/write stream access to a chunk of memory.
	 *
	 * By default the file will be opened in read mode - specify **"w"** for the optional mode parameter to open the file in write mode. Note that you cannot both read and write with the same File object, unless it was opened on a Blob.
	 *
	 * When opening in write mode, you can also specify optional flags that control how the file is opened:
	 *
	 * * **wc** - create a new file, only if it doesn't already exist.
	 * * **wa** - create a new file, always. If the file already exists it will be overwritten. (This is the default.)
	 * * **we** - open existing file. The file will not be created if it doesn't already exist.
	 * * **wo** - open existing file. If the file doesn't exist it will be created.
	 * * **wt** - truncate existing file. If the file exists it will be truncated. The file will not be created if it doesn't already exist.
	 * * **d** - delete-on-close. The file will be automatically deleted when closed.
	 *
	 * When using write mode, you may add **f (force)** to any of the above mode strings to tell Opus to clear the read-only file attribute if it blocks modifying an existing file; otherwise, attempting to open a read-only file for writing will fail. For example, **"wof"** is like **"wo"** mode but also clears the read-only attribute.
	 *
	 * If you only want to make changes to a file's attributes without modifying its data you can also specify **"m"** to open it in modify mode.
	 *
	 * The optional third parameter lets you associate the File object with a Tab or a Lister, which will be used if Opus needs to display any dialogs (e.g. a UAC elevation dialog). You may also specify the string **"NoElevate"** for the third parameter to prevent UAC elevation entirely, or **"ElevateNoAsk"** to prevent UAC prompts while still gaining elevation if something else has already performed it.
	 *
	 * A File object is always returned, even if the file could not be opened. Check File.error on the returned object immediately after creating it to see if opening the file succeeded. Even if the file was not be opened, some of the object's methods may still work. For example, if a file doesn't exist then you can't open it or set its attributes, but permissions on an existing file may allow you to set its attributes while blocking you from modifying it or vice versa.
	 *
	 */
	openFile(pathOrBlob?: string | DOpusBlob, mode?: string, window?: object, elevation?: string): DOpusFile;

	/**
	 * Returns a FolderEnum object that lets you enumerate the contents of the specified folder. The optional flags string consists of one or more flag characters:
	 *
	 * * **r** - **r**ecurse. Recursively enumerate the folder (i.e. to enumerate the contents of all its sub-folders, and their sub-folders, and so on).
	 * * **l** - skip **l**inks. Prevents the traversal of links and junctions when recursively enumerating folders.
	 * * **s** - use **s**hell. Lets you use ReadDir to enumerate shell (non-filesystem) folders; for example, the Quick Access folder on Windows 10 could be enumerated by passing "/quickaccess" for the path and "s" for the flags.
	 *
	 * If you don't need any flags, skip the second argument entirely. You may see older scripts pass True and False as the second argument, to turn recursion on and off; that is deprecated but remains supported for compatibility.
	 */
	readDir(path?: string, flags?: string): DOpusFolderEnum;

	/**
	 * Resolves the specified library or file collection path to its underlying file system path. This method can also be used to resolve a folder alias, as well as application paths in the form {apppath|appname}.
	 *
	 * The optional flags are:
	 *
	 * * **j** - resolve junctions and links to their target folder
	 */
	resolve(path?: string, flags?: string): DOpusPath;

	/**
	 * Returns True if this path refers to the same drive or partition as the supplied path. The optional flags are:
	 *
	 * * **c** - treat CD burning staging area as the CD itself
	 * * **m** - consider mount points
	 * * **r** - real paths only
	 * * **u** - compare user for FTP drives
	 * * **z** - consider zip folders
	 * * **Z** - consider zip folders (target)
	 */
	sameDrive(path?: string, flags?: string): boolean;

}

/**
 * The Func object is passed to a script when it is invoked via a command. In a script function , it is passed to the OnClick method as the ClickData .func property, and in a script add-in that adds an internal command , via the ScriptCommandData .func property. The Func object provides information about the default source and destination of the command, as well as details about how it was invoked.
 * @see {DOpusOnClick}
 * @see {DOpusClickData}
 * @see {DOpusScriptCommandData}
 */
interface DOpusFunc {

	/**
	 * Returns an Args object that provides access to any arguments given on the command line that invoked this script. This is used when the script has added an internal command to Opus. A command line template can be provided when the command is added, and any arguments the user provides on the command line for the script command will be available via this object.
	 *
	 * For most use the argsmap property may be an easier way to access your command's arguments.
	 */
	readonly args: DOpusArgs;

	/**
	 * Returns a Map object that provides keyword lookup for each of the arguments given on the command line. An argument will only be present in the Map if it was used on the command line, so you can easily check which arguments are present using the Map.exists() method.
	 */
	readonly argsMap: DOpusMap;

	/**
	 * This property returns a pre-filled Command object that can be used to run commands against the source and destination tabs. Using this object is the equivalent of calling DOpusFactory.Command and setting the source and destination tabs manually.
	 */
	readonly command: DOpusCommand;

	/**
	 * This object represents the default destination tab for the function.
	 */
	readonly destTab: DOpusTab;

	/**
	 * Returns True if the command was invoked via a drag-and-drop operation.
	 */
	readonly fromDrop: boolean;

	/**
	 * Returns True if the command was invoked via the keyboard (i.e. via a hotkey rather than a button).
	 */
	readonly fromKey: boolean;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the command was invoked.
	 *
	 * The string can contain any or all of the following: *shift, ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

	/**
	 * This object represents the default source tab for the function.
	 */
	readonly sourceTab: DOpusTab;

	/**
	 * If this button was run from the standalone image viewer, this object represents the viewer window.
	 */
	readonly viewer: DOpusViewer;

	/**
	 * Creates a new Dialog object, that lets you display dialogs and popup menus. The dialog's window property will be automatically assigned to the source tab.
	 */
	dlg(): DOpusDialog;

}

/**
 * If a script add-in implements the OnGetCopyQueueName event, the method receives a GetCopyQueueNameData object whenever a copy operation begins that uses automatically-managed copy queues (i.e. the Automatically manage file copy queues option on the File Operations / Copy Options page in Preferences is turned on).
 * @see {DOpusOnGetCopyQueueName}
 */
interface DOpusGetCopyQueueNameData {

	/**
	 * Returns a Path object representing the destination path of the copy operation.
	 */
	readonly dest: DOpusPath;

	/**
	 * Returns a Tab object representing the destination folder tab.
	 */
	readonly destTab: DOpusTab;

	/**
	 * Returns a binary string indicating the physical drive indices that the destination path is located on (if any). For example, 00100000000000000000000000 indicates that drive C: is the destination drive.
	 */
	readonly dest_drives: string;

	/**
	 * Returns True if the operation is a move instead of a copy.
	 */
	readonly move: boolean;

	/**
	 * Returns the default queue name for this operation.
	 */
	readonly name: string;

	/**
	 * Returns a Path object representing the source path of the copy operation.
	 */
	readonly source: DOpusPath;

	/**
	 * Returns a Tab object representing the source folder tab.
	 */
	readonly sourceTab: DOpusTab;

	/**
	 * Returns a binary string indicating the physical drive indices that the source path is located on (if any). For example, 00001000000000000000000000 indicates that drive E: is the source drive.
	 */
	readonly source_drives: string;

}

/**
 * If a rename script implements the OnGetCustomFields event, the method receives a GetCustomFieldData object whenever the Rename dialog runs the script.
 * @see {DOpusOnGetCustomFields}
 */
interface DOpusGetCustomFieldData {

	/**
	 * Returns a CustomFieldData object, that the script can use to add custom fields to the Rename dialog. Each property added to the object in this method will be create a new field in the dialog, allowing the user to supply additional information to your rename script.
	 */
	readonly fields: DOpusCustomFieldData;

	/**
	 * This lets you assign labels to your script's custom fields, that are shown to the user in the Rename dialog. To do this, set this property to a Map created via the DOpusFactory.Map method, filled with name/label string pairs.
	 */
	readonly field_labels: DOpusMap;

	/**
	 * This lets you assign "cue banners" to any edit fields created by your script. A cue banner is displayed inside an empty edit field to prompt the user what sort of data the field expects. To use this, set this property to a Map created via the DOpusFactory.Map method, filled with name/banner string pairs.
	 */
	readonly field_tips: DOpusMap;

	/**
	 * You can use this field to specify which control gets the input focus by default when your fields appear for the first time. Set it to the name of the desired control. You can also specify !oldname or !newname to assign focus to the standard old and new name fields.
	 */
	readonly focus: string;

}

/**
 * If a script implements the OnGetHelpContent event, it receives a GetHelpContentData object when the method is called. You can use the methods of this object to add your help content to the Directory Opus F1 help system.
 * @see {DOpusOnGetHelpContent}
 */
interface DOpusGetHelpContentData {

	/**
	 * Adds a PNG or JPG image and makes it available for your help pages. You can use any name you like for your images, although they must have either a .png or a .jpg suffix. Your help content can then refer to images by name, e.g. if you add an image and call it myimage.jpg, your html content could show it using:
	 * ```html
	 * <img src="myimage.jpg">
	 * ```
	 *
	 * If your script is bundled as a script package you can include image files in a sub-directory of the package called help, and then load them easily using the Script.LoadHelpImage method.
	 */
	addHelpImage(name?: string, image?: DOpusBlob): void;

	/**
	 * Adds a page of help content for your script to the F1 help file. You can call this method as many times as you like. If you add more than one page of help the first page will become the topic header and all subsequent pages will appear underneath it in the index.
	 *
	 * The name parameter is optional; if not supplied, a default name will be assigned automatically to each page you add. You can use the Script.ShowHelp method to trigger the display of a specific page of your help by name.
	 *
	 * The title parameter specifies the page title; this is shown in the help index and should be descriptive enough that the user can recognise it as referring to your script. The body parameter specifies the actual HTML content for the help page. This should be everything you would normally find between the <body>...</body> tags of an HTML page.
	 *
	 * If your script is bundled as a script package you can include HTML files in a sub-directory of the package called help, and then load them easily using the Script.LoadHelpFile method.
	 */
	addHelpPage(name?: string, title?: string, body?: string): void;

}

/**
 * If a rename script is implemented using the OnGetNewName method, it receives a GetNewNameData object for each item being renamed.
 * @see {DOpusOnGetNewName}
 */
interface DOpusGetNewNameData {

	/**
	 * Returns a CustomFieldData object which provides the values of any custom fields your script added to the Rename dialog.
	 */
	readonly custom: DOpusCustomFieldData;

	/**
	 * Returns an Item object representing the file or folder being renamed.
	 */
	readonly item: DOpusItem;

	/**
	 * Returns the proposed new name of the item. This will be the result of the application of any selected standard options in the rename dialog (numbering, capitalization, etc).
	 */
	readonly newname: string;

	/**
	 * Returns the file extension of the proposed new name. Does not take multi-part extensions into account (e.g. will return ".rar" rather than ".part1.rar").
	 */
	readonly newname_ext: string;

	/**
	 * Returns the file extension of the proposed new name, taking multi-part extensions into account (e.g. will return ".part1.rar" rather than ".rar").
	 */
	readonly newname_ext_m: string;

	/**
	 * Returns the contents of the New Name field (that is, not the calculated new name after all the options have been applied, but the actual text contents of the field as entered by the user).
	 */
	readonly newname_field: string;

	/**
	 * Returns the file stem of the proposed new name. Does not take multi-part extensions into account (e.g. will return "catpictures.part1" rather than "catpictures").
	 */
	readonly newname_stem: string;

	/**
	 * Returns the file stem of the proposed new name, taking multi-part extensions into account (e.g. will return "catpictures" rather than "catpictures.part1").
	 */
	readonly newname_stem_m: string;

	/**
	 * Returns the "old name" pattern as entered by the user in the rename dialog.
	 */
	readonly oldname_field: string;

}

/**
 * The GlobalFilters object provides information about the global file and folder filter settings (configured on the Folders / Global Filters page in Preferences). It is obtained from the DOpus .filters property.
 * @see {DOpusConstructor}
 */
interface DOpusGlobalFilters {

	/**
	 * Returns True if the global wildcard filters are enabled.
	 */
	readonly enable: boolean;

	/**
	 * Returns the global filename filter wildcard pattern. If the wildcard is configured to use regular expressions, it will have a regex: prefix in front of the pattern.
	 */
	readonly file: string;

	/**
	 * Returns the global folder filter wildcard pattern. If the wildcard is configured to use regular expressions, it will have a regex: prefix in front of the pattern.
	 */
	readonly folder: string;

	/**
	 * Returns True if the global option to hide hidden files is on.
	 */
	readonly hideHidden: boolean;

	/**
	 * Returns True if the global option to hide operating system files is on.
	 */
	readonly hideSystem: boolean;

}

/**
 * The Image object represents an image file or icon to be displayed in a script dialog . You can load an image or icon using the DOpus .LoadImage or Script .LoadImage methods. It can be displayed using a static control, or assigned as the dialog's icon.
 * @see {DOpusConstructor}
 * @see {DOpusScript}
 */
interface DOpusImage {

	/**
	 * Returns the bit count of the loaded image.
	 */
	readonly bitCount: number;

	/**
	 * Returns the height of the loaded image.
	 */
	readonly height: number;

	/**
	 * Returns the width of the loaded image.
	 */
	readonly width: number;

}

/**
 * The ImageMeta object is retrieved from the Metadata .image or Metadata .image_text properties. It provides access to metadata relating to picture files.
 * @see {DOpusMetadata}
 */
interface DOpusImageMeta {

	/**
	 * Returns the value of the specified column, as listed in the Pictures section of the Keywords for Columns page.
	 */

	/**
	 * Altitude
	 */
	readonly altitude: any;

	/**
	 * Aperture
	 */
	readonly apertureVal: any;

	/**
	 * Artists
	 */
	readonly mp3Artist: any;

	/**
	 * Camera make
	 */
	readonly cameraMake: any;

	/**
	 * Camera model
	 */
	readonly cameraModel: any;

	/**
	 * Color space
	 */
	readonly colorspace: any;

	/**
	 * Contrast
	 */
	readonly contrast: any;

	/**
	 * Coordinates
	 */
	readonly coords: any;

	/**
	 * Copyright
	 */
	readonly copyright: any;

	/**
	 * Creation software
	 */
	readonly software: any;

	/**
	 * Date digitized
	 */
	readonly dateDigitized: any;

	/**
	 * Date taken
	 */
	readonly dateTaken: any;

	/**
	 * Date taken
	 */
	readonly shootingTime: any;

	/**
	 * Digital Zoom
	 */
	readonly digitalZoom: any;

	/**
	 * Exposure bias
	 */
	readonly exposureBias: any;

	/**
	 * Exposure program
	 */
	readonly exposureProgram: any;

	/**
	 * Exposure time
	 */
	readonly exposureTime: any;

	/**
	 * F-number
	 */
	readonly fNumber: any;

	/**
	 * Flash
	 */
	readonly flash: any;

	/**
	 * Focal length
	 */
	readonly focalLength: any;

	/** DISABLED cannot use number as first char of a JS identifier - Focal length (35mm)*/
	readonly disabled_35mmfocallength: any;

	/**
	 * ISO speed
	 */
	readonly isoRating: any;

	/**
	 * Image description
	 */
	readonly imageDesc: any;

	/**
	 * Image quality
	 */
	readonly imageQuality: any;

	/**
	 * Latitude
	 */
	readonly latitude: any;

	/**
	 * Lens make
	 */
	readonly lensMake: any;

	/**
	 * Lens model
	 */
	readonly lensModel: any;

	/**
	 * Longitude
	 */
	readonly longitude: any;

	/**
	 * Macro mode
	 */
	readonly macroMode: any;

	/**
	 * Metering mode
	 */
	readonly meteringMode: any;

	/**
	 * Saturation
	 */
	readonly saturation: any;

	/**
	 * Scene capture type
	 */
	readonly sceneCaptureType: any;

	/**
	 * Scene mode
	 */
	readonly sceneMode: any;

	/**
	 * Sharpness
	 */
	readonly sharpness: any;

	/**
	 * Shutter speed
	 */
	readonly shutterSpeed: any;

	/**
	 * Subject
	 */
	readonly subject: any;

	/**
	 * Subject distance
	 */
	readonly subjectDistance: any;

	/**
	 * Special instructions
	 */
	readonly instructions: any;

	/**
	 * Title
	 */
	readonly title: any;

	/**
	 * White balance
	 */
	readonly whiteBalance: any;


}

/**
 * The Item object represents a file or folder displayed in a tab. You can obtain a collection of Item objects from the various methods of the Tab object. A collection of Item objects is also used with the Command object to specify the files or folders a command should operate on. Using the FSUtil .ReadDir method to enumerate the contents of a folder also returns an Item object. You can create an Item from a file path using the FSUtil .GetItem method.
 * @see {DOpusTab}
 * @see {DOpusCommand}
 * @see {DOpusFSUtil}
 *
 * @returns {string} Returns the full pathname of the item (i.e. path plus filename).
 */
interface DOpusItem extends String {

	/**
	 * Returns the "last accessed" date, in local time.
	 */
	readonly access: Date;

	/**
	 * Returns the "last accessed" date, in UTC.
	 */
	readonly access_utc: Date;

	/**
	 * Returns the item attributes. This value is a series of flags that are logically OR'd together. The attributes supported by Opus are:
	 *
	 * * **1** - read only
	 * * **2** - hidden
	 * * **4** - system
	 * * **32** - archive
	 * * **1024** - reparse point (junctions, etc.)
	 * * **2048** - compressed4096 - offline storage
	 * * **8192** - not content-indexed
	 * * **16384** - encrypted
	 * * **524288** - pinned
	 *
	 * Using the fileattr property, which returns a FileAttr object, may be easier than dealing with the raw attribute flags.
	 */
	readonly attr: number;

	/**
	 * Returns the item attributes as a string, as displayed in the file display.
	 */
	readonly attr_text: string;

	/**
	 * Returns True if the item was checked (in checkbox mode), or False otherwise.
	 */
	readonly checked: boolean;

	/**
	 * Returns the "creation" date, in local time.
	 */
	readonly create: Date;

	/**
	 * Returns the "creation" date, in UTC.
	 */
	readonly create_utc: Date;

	/**
	 * For Item objects obtained from a Viewer, this property is True if the item represents the currently displayed image and False otherwise.
	 *
	 * For Item objects obtained from a file display, the property indicates whether or not the item is the one with focus. The focus property is the more proper way to check this, but both work in case you forget which is which.
	 */
	readonly current: boolean;

	/**
	 * Returns the display name of the item. Only a few items have a display name that is different to their actual name - some examples are certain system folders (like C:\Users which might have a translated display name in non-English locales).
	 */
	readonly display_name: string;

	/**
	 * Returns the filename extension.
	 */
	readonly ext: string;

	/**
	 * Returns the filename extension, taking multi-part extensions into account. For example, a file called "file.part1.rar" might return ".rar" for ext but ".part1.rar" for ext_m.
	 */
	readonly ext_m: string;

	/**
	 * Returns True if the item failed when used by a command. This is only meaningful in conjunction with the Command.files collection - once the command has returned, this property will indicate success or failure on a per-file basis.
	 */
	readonly failed: boolean;

	/**
	 * Returns a FileAttr object that represents the item's attributes.
	 */
	readonly fileattr: DOpusFileAttr;

	/**
	 * If the file display this item came from is grouped by a particular column, this property returns a FileGroup object representing the group the item is in. If the item has no group this will return an empty string.
	 */
	readonly filegroup: DOpusFileGroup;

	/**
	 * For Item objects obtained from a file display, this property is True if the object represents the item with focus, and False otherwise. Only one item can have focus at a time. The item with focus is typically shown with an outline around it, and is usually the last item which was clicked on, or which was moved to with the keyboard. The item with focus is often also one of the selected items, but not always; selection and focus are two separate things.
	 *
	 * For Item objects obtained from a Viewer, the property indicates if the file is the one currently shown in the viewer. The current property is the more proper way to test this, but focus also works.
	 */
	readonly focus: boolean;

	/**
	 * Returns True for folder items if their size has been calculated by, for example, the GetSizes command. If False, the size property will be unreliable for folders.
	 */
	readonly got_size: boolean;

	/**
	 * Returns a Vector of FiletypeGroup objects representing any and all file type groups that this file is a member of.
	 *
	 * If you only want to check membership of a particular file type group, see the InGroup method in the section below.
	 */
	readonly groups: DOpusVector<DOpusFiletypeGroup>;

	/**
	 * Similar to the groups property, except a FiletypeGroups object is returned instead of a Vector.
	 */
	readonly groupsObject: DOpusFiletypeGroups;

	/**
	 * This is a unique ID for the item; it is used internally by Opus.
	 */
	readonly id: number;

	/**
	 * Returns True if the item represents a folder, and False for a file.
	 */
	readonly is_dir: boolean;

	/**
	 * Returns True if the item is a junction to another folder.
	 */
	readonly is_junction: boolean;

	/**
	 * Returns True if the item is a reparse point.
	 */
	readonly is_reparse: boolean;

	/**
	 * Returns True if the item is a symbolic link.
	 */
	readonly is_symlink: boolean;

	/**
	 * Returns a Metadata object that provides access to the item's metadata.
	 */
	readonly metadata: DOpusMetadata;

	/**
	 * Returns the "last modified" date, in local time.
	 */
	readonly modify: Date;

	/**
	 * Returns the "last modified" date, in UTC.
	 */
	readonly modify_utc: Date;

	/**
	 * Returns the name of the item.
	 */
	readonly name: string;

	/**
	 * Returns the filename "stem" of the item. This is the name of the item with the filename extension removed. It will be the same as the name for folders.
	 */
	readonly name_stem: string;

	/**
	 * Returns the filename "stem" of the item, taking multi-part extensions into account. For example, a file called "file.part1.rar" might return "file.part1" for name_stem but "file" for name_stem_m.
	 */
	readonly name_stem_m: string;

	/**
	 * Returns the path of the item's parent folder. This does not include the name of the item itself, which can be obtained via the name property.
	 */
	readonly path: DOpusPath;

	/**
	 * Returns the "real" path of the item. For items located in virtual folders like Libraries or Collections, this lets you access the item's underlying path in the real file system. The realpath property includes the full path to the item, including its own name.
	 */
	readonly realpath: DOpusPath;

	/**
	 * This property is set by DOpusDialog.open() & DOpusDialog.multi()
	 *
	 * A single Item object is returned to indicate the file selected by the user.
	 * This object will have an additional result property that will be False if the user cancelled the dialog
	 * the other normal Item properties will only be valid if result is True.
	 *
	 * @see {DOpusDialog}
	 */
	readonly result: boolean;

	/**
	 * Returns True if the item was selected, or False otherwise.
	 */
	readonly selected: boolean;

	/**
	 * Returns the short path of the item, if it has one. Note that short paths are disabled by default in Windows 10.
	 */
	readonly shortpath: DOpusPath;

	/**
	 * Returns the size of the item as a FileSize object.
	 */
	readonly size: DOpusFileSize;

	/**
	 * Tests the file for membership of the specified file type group.
	 *
	 * Each file type group has two names: An internal name which is always the same in all languages, and a display name which may be translated differently for each language. The display name is what you see in the File Types editor. Groups that come pre-defined when you install Opus have internal names like "Archives" and "Music" (which are also their English display names). User-defined groups have internal names which are unique, automatically generated GUID strings like "{C4B716ED-2A9C-43C6-B325-7DADDEEFADA9}".
	 *
	 * The group argument should be the name of the group you wish to test against, e.g. "Music".
	 *
	 * By default, both the internal name and the display name are checked, and a match on either will return true. Prefix the group argument with "name:" to restrict the search to internal names, or with "disp:" to restrict the search to display names.
	 *
	 * To get a list of all file type groups which the file matches, use the groups property instead (see the section above).
	 */
	inGroup(group?: string): boolean;

	/**
	 * This method returns a Vector of strings representing any labels that have been assigned to the item.
	 *
	 * Both arguments are optional. The first is a wildcard pattern that lets you filter the returned labels based on their category. For example, pass "Status" to only retrieve a list of status icons assigned to a file.
	 *
	 * The second optional argument contains flags keywords that control how the labels are returned. The only defined flag is "explicit" - if specified, wildcard and label filters will not be considered - only explicitly assigned labels will be returned. Note that if you want to provide the second argument but don't want to filter by category you should pass `"*"` for the first argument to match all categories.
	 */
	labels(category?: string, flags?: string): DOpusVector<string>;

	/**
	 * Opens this file and returns a File object that lets you access its contents as binary data.
	 *
	 * By default the file will be opened in read mode - specify **"w"** for the optional mode parameter to open the file in write mode. Note that you cannot both read and write with the same File object.
	 *
	 * When opening in write mode, you can also specify optional flags that control how the file is opened:
	 *
	 * * **wc** - create a new file, only if it doesn't already exist.
	 * * **wa** - create a new file, always. If the file already exists it will be overwritten. (This is the default.)
	 * * **we** - open existing file. The file will not be created if it doesn't already exist.
	 * * **wo** - open existing file. If the file doesn't exist it will be created.
	 * * **wt** - truncate existing file. If the file exists it will be truncated. The file will not be created if it doesn't already exist.
	 * * **d** - delete-on-close. The file will be automatically deleted when closed.
	 *
	 * When using write mode, you may add **f (force)** to any of the above mode strings to tell Opus to clear the read-only file attribute if it blocks modifying an existing file; otherwise, attempting to open a read-only file for writing will fail. For example, **"wof"** is like **"wo"** mode but also clears the read-only attribute.
	 *
	 * If you only want to make changes to the file's attributes without modifying its data you can also specify **"m"** to open it in modify mode.
	 *
	 * The optional window parameter lets you associate the File object with a Tab or a Lister, which will be used if Opus needs to display any dialogs (e.g. a UAC elevation dialog). You may also specify the string **"NoElevate"** to prevent UAC elevation entirely, or **"ElevateNoAsk"** to prevent UAC prompts while still gaining elevation if something else has already performed it.
	 *
	 * A File object is always returned, even if the file could not be opened. Check File.error on the returned object immediately after creating it to see if opening the file succeeded. Even if the file was not be opened, some of the object's methods may still work. For example, if a file doesn't exist then you can't open it or set its attributes, but permissions on an existing file may allow you to set its attributes while blocking you from modifying it or vice versa.
	 */
	open(mode?: string, window?: object): DOpusFile;

	/**
	 * Returns the value of the specified shell property for the item. The property argument can be the property's PKEY or its name.
	 *
	 * If you provide a name then the optional second argument lets you control how the properties are looked up by name. If the value of type is "R" then the first property whose raw name matches the supplied name will be used. If the value is "D" then the first property whose display name matches the supplied name will be used. If type is omitted then both raw and display names can match.
	 *
	 * Note that if a shell property is returned by the system as a SAFEARRAY type, it will be converted automatically to a Vector object.
	 */
	shellProp(property?: string, type?: string): any;

	/**
	 * Updates the Item object from the file on disk. You might use this if you had run a command to change an item's timestamp or attributes, and wanted to retrieve the new information.
	 */
	update(): void;

}

/**
 * The Lister object represents an open Lister window. A collection of currently open Lister objects is available from the DOpus .listers property, and if a command results in a new Lister being opened, the Results object.
 * @see {DOpusConstructor}
 * @see {DOpusResults}
 */
interface DOpusLister {

	/**
	 * Returns a Tab object representing the currently active (source) tab.
	 */
	readonly activeTab: DOpusTab;

	/**
	 * Lister window bottom-edge coordinate.
	 */
	readonly bottom: number;

	/**
	 * Returns the custom title of the Lister (if any) as set by the Set LISTERTITLE command. This may be an empty string. The title property returns the actual window title.
	 */
	readonly custom_title: string;

	/**
	 * Returns a Tab object representing the current destination tab (in a dual-display Lister).
	 */
	readonly destTab: DOpusTab;

	/**
	 * Indicates whether the Lister is in dual-display mode or not. Possible values are:
	 *
	 * * **0** - single-display mode
	 * * **1** - dual-display, vertical layout
	 * * **2** - dual-display, horizontal layout
	 */
	readonly dual: number;

	/**
	 * Returns the current split percentage of the dual displays (e.g. 50 indicates they are evenly sized).
	 */
	readonly dualSize: number;

	/**
	 * Returns True if this Lister is currently the foreground (active) window.
	 */
	readonly foreground: boolean;

	/**
	 * Returns True if this Lister is currently the active Lister (foreground window), or was the most recently active Lister.
	 */
	readonly lastActive: boolean;

	/**
	 * Provides the name of the Lister layout that this Lister came from (if any).
	 */
	readonly layout: string;

	/**
	 * Lister window left-edge coordinate.
	 */
	readonly left: number;

	/**
	 * Indicates whether the metadata pane is currently open or not. Possible values are:
	 *
	 * * **0** - metadata pane is not open
	 * * **1** - metadata pane is open, vertical layout
	 * * **2** - metadata pane is open, horizontal layout
	 */
	readonly metaPane: number;

	/**
	 * Lister window right-edge coordinate.
	 */
	readonly right: number;

	/**
	 * Returns the state of a single-display mode Lister:
	 *
	 * * **0** - off
	 * * **1** - source
	 * * **2** - destination
	 * * **4** - locked
	 */
	readonly state: string;

	/**
	 * Returns the name of the Lister style which was last applied to the Lister, or an empty string if there is none. This is just the last style which was loaded and does not mean the Lister still looks the same; the user may have opened or closed panels and made other changes via other methods in the time since the style was applied.
	 */
	readonly style: string;

	/**
	 * Returns a collection of Tab objects that represent all tabs in this Lister. In a dual-display Lister this includes tabs in both the left and right file displays.
	 */
	readonly tabs: DOpusTab;

	/**
	 * Returns the name of the Folder Tab Group which was last loaded into the left half of the Lister, or an empty string if no group has been loaded.
	 *
	 * The name only changes when a Folder Tab Group is loaded. The current tabs may no longer resemble the named tab group if the user has made changes since the group was loaded. The name persists across restarts, through the Default Lister and saved Layouts.
	 */
	readonly tabgroupLeft: string;

	/**
	 * Similar to tabgroupleft, above, but for the right half of the Lister (if any).
	 */
	readonly tabgroupRight: string;

	/**
	 * Returns a collection of Tab objects that represent the tabs in the left/top side of a dual-display Lister. In a single-display Lister this is equivalent to all the tabs in the Lister.
	 */
	readonly tabsLeft: DOpusTab;

	/**
	 * Returns a collection of Tab objects that represent the tabs in the right/bottom side of a dual-display Lister. In a single-display Lister this will return an empty collection.
	 */
	readonly tabsRight: DOpusTab;

	/**
	 * Returns the current title of the Lister window.
	 */
	readonly title: string;

	/**
	 * Returns a collection of Toolbar objects representing all currently open toolbars in this Lister.
	 */
	readonly toolbars: DOpusToolbar;

	/**
	 * Lister window top-edge coordinate;
	 */
	readonly top: number;

	/**
	 * Indicates whether or not the folder tree is currently open. Possible values are:
	 *
	 * * **0** - folder tree is not open
	 * * **1** - a single tree is open, at the left of the Lister
	 * * **2** - a single tree is open, at the right of the Lister
	 * * **3** - two folder trees are open (in a dual-display Lister)
	 */
	readonly tree: number;

	/**
	 * If the utility panel is currently open, returns a string indicating the currently selected utility page. Possible values are **find** (which means the Find panel's Simple version), **findadvanced, sync, dupe, undo, filelog, ftplog, otherlog, email.**
	 */
	readonly utilPage: string;

	/**
	 * Indicates whether or not the utility panel is currently open. Possible values are:
	 *
	 * * **0** - utility panel is not open
	 * * **1** - utility panel is open
	 */
	readonly utilPane: number;

	/**
	 * This Vars object represents all defined variables with Lister scope (that are scoped to this Lister).
	 */
	readonly vars: DOpusVars;

	/**
	 * Indicates whether or not the viewer pane is currently open. Possible values are:
	 *
	 * * **0** - viewer pane is not open
	 * * **1** - viewer pane is open, vertical layout
	 * * **2** - viewer pane is open, horizontal layout
	 */
	readonly viewPane: number;

	/**
	 * Creates a new Dialog object, that lets you display dialogs and popup menus. The dialog's window property will be automatically assigned to this Lister.
	 */
	dlg(): DOpusDialog;

	/**
	 * Used to change how the lister window is grouped with other Opus windows on the taskbar. Specify a group name to move the window into an alternative group, or omit the group argument to reset back to the default group. If one or more windows are moved into the same group, they will be grouped together, separate from other the default group.
	 *
	 * This only works on Windows 7 and above, and only when taskbar grouping is enabled. Group names are limited to 103 characters and will be truncated if longer. Spaces and dots in group names are automatically converted to underscores.
	 *
	 * Returns true on success.
	 */
	setTaskbarGroup(group?: string): boolean;

	/**
	 * The first time a script accesses a particular Lister object, a snapshot is taken of the Lister state. If the script then makes changes to that Lister (e.g. it opens a new tab, or moves the window), these changes will not be reflected by the object. To re-synchronize the object with the Lister, call the Lister.Update method.
	 */
	update(): void;
}

declare var Lister: DOpusLister;


type DOpusListerWithoutLastActive = new() => { [P in Exclude<keyof DOpusLister, 'lastActive'>] : DOpusLister[P] };
/**
 * The Listers object is a collection of all currently open Listers . It can be obtained via the DOpus .listers property.
 *
 * **Note:** If you are looking for a window to use as the parent for a Dialog , you are probably looking in the wrong place. Scripts should not assume that DOpus.listers(0) or DOpus.listers.lastActive are the lister which launched them. Most scripting events provide you an object which can either create a pre-configured Dialog for you or which includes a SourceTab property or similar which can do the same. In almost all situations you should use those instead.
 *
 * @see {DOpusConstructor}
 *
 * @returns {DOpusLister} Lets you enumerate the currently open Listers.
 *
 * Do not assume that DOpus.listers(0) is the window which launched your script. See the note near the top of the page.
 */
interface DOpusListers extends DOpusListerWithoutLastActive {

	/**
	 * Returns a Lister object representing the most recently active Lister window.
	 *
	 * Do not assume that DOpus.listers.lastActive is the window which launched your script. See the note near the top of the page.
	 */
	readonly lastActive: DOpusLister;

	/**
	 * The first time a script accesses the DOpus.listers property, a snapshot is taken of all currently open Listers. If the script then opens or closes Listers itself, these changes will not be reflected by this collection. To re-synchronize the collection, call the Update method.
	 */
	update(): void;

}

/**
 * If a script add-in implements the OnListerResize event, the method receives a ListerResizeData object whenever a Lister window is resized.
 * @see {DOpusOnListerResize}
 */
interface DOpusListerResizeData {

	/**
	 * Returns a string indicating the resize action that occurred. This will be one of the following strings: *resize, minimize, maximize, restore.*
	 */
	readonly action: string;

	/**
	 * Returns the new width of the Lister in pixels.
	 */
	readonly width: number;

	/**
	 * Returns the new height of the Lister in pixels.
	 */
	readonly height: number;

	/**
	 * Returns a Lister object representing the Lister that was resized.
	 */
	readonly lister: DOpusLister;

}



/**
 * If a script add-in implements the OnListerUIChange event, the method receives a ListerUIChangeData object when various user interface elements are opened or closed in a Lister.
 * @see {DOpusOnListerUIChange}
 */
interface DOpusListerUIChangeData {

	/**
	 * Returns a string indicating which UI elements changed. This will contain one or more of the following strings: *dual, tree, metapane, viewer, utility, duallayout, metapanelayout, viewerlayout, toolbars, toolbarset, toolbarsauto, minmax.*
	 */
	readonly change: string;

	/**
	 * Returns a Lister object representing the Lister that is changing.
	 */
	readonly lister: DOpusLister;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

}

/**
 * The Map object is an associative container . It is similar to an array or vector (e.g. Vector ) in that it can store one or more objects, but has the advantage of using a dictionary system to locate objects rather than numeric indexes. You can therefore insert or lookup objects using an arbitrary value (string, integer, date, etc.) as the key (e.g. Map("foo") to reference an element by the key "foo").
 *
 * You can access elements of the map as if the map is a function (e.g. Map("foo") to reference an element by the key "foo"). You can also use square brackets (like an array or Vector) but only if the name of the key begins with an underscore, or is completely numeric (e.g. Map[123] or Map["_foo"]). Additionally you can use the get and set methods.
 *
 * You can create a new Map using the DOpusFactory.Map method. The keys in a map can be enumerated, and are automatically kept sorted.
 *
 * The two examples below both output the following:
 *
 * ```count: 4
 * bird -> tweet
 * cat -> meow
 * dog -> woof
 * snake -> hiss
 * ```
 *
 * JScript Example:
 * ```javascript
 * var map = DOpus.Create.Map();
 * // CY - JS-conform usage: map.set("cat", "meow");
 * map("cat") = "meow";
 * map("dog") = "woof";
 * map("bird") = "tweet";
 * map("snake") = "hiss";
 * DOpus.Output("count: " + map.count);
 * for (var e = new Enumerator(map); !e.atEnd(); e.moveNext()) {
 *   var key = e.item();
 *   // CY - JS-conform usage: var value = map.get(key);
 *   var value = map(key);
 *   DOpus.Output(key + " -> " + value);
 * }
 * ```
 *
 * VBScript Example:
 * ```vbscript
 * Dim map, key, value
 * Set map = DOpus.Create.Map
 * map("cat") = "meow"
 * map("dog") = "woof"
 * map("bird") = "tweet"
 * map("snake") = "hiss"
 * DOpus.Output "count: " & map.count
 * For Each key In map
 *   value = map(key)
 *   DOpus.Output(key &amp; " -> " &amp; value)
 * Next
 * ```
 *
 * @see {DOpusVector}
 */
interface DOpusMap {

	/**
	 * Returns the number of elements the Map currently holds.
	 */
	readonly count: number;

	/**
	 * Returns True if the Map is empty, False if not.
	 */
	readonly empty: boolean;

	/**
	 * A synonym for count.
	 */
	readonly length: number;

	/**
	 * A synonym for count.
	 */
	readonly size: number;

	/**
	 * Copies the contents of another Map to this one.
	 */
	assign(from?: DOpusMap): void;

	/**
	 * Clears the contents of the Map.
	 */
	clear(): void;

	/**
	 * Erases the element matching the specified key, if it exists in the map.
	 */
	erase(key?: any): void;

	/**
	 * Returns True if the specified key exists in the map.
	 */
	exists(key?: any): boolean;

	/**
	 * Merges the contents of another Map with this one.
	 */
	merge(from?: DOpusMap): void;

	/**
	 * Returns the value of the specified key.
	 */
	get(key?: any): any;

	/**
	 * Sets the value of the specified key.
	 */
	set(key?: any, val?: any): any;

}

/**
 * The Metadata object provides metadata information about a file or folder (metadata are things like the track number of a music file, the dimensions of an image, the author of a document, etc). You can obtain a Metadata object from the Item .metadata property if you have an Item object, and if not you can obtain it using the path of the item using the FSUtil .GetMetadata method.
 *
 * The Metadata object provides different sub-objects as properties that group the available metadata into a number of categories, broadly corresponding to the categories listed on the Keywords for Columns page. You can determine the primary, or main type of metadata available using the default value of the Metadata object.
 *
 * @see {DOpusItem}
 * @see {DOpusFSUtil}
 *
 * @returns {string} Returns a string indicating the primary type of metadata available in this object. The string will be one of the following: none, video, audio, image, font, exe, doc, other.
 *
 * Note that sometimes more than one type of metadata will be available. For example, author is a document field (and so found under the doc property), but pictures can have authors as well. In this instance, the Metadata object would provide both ImageMeta and DocMeta objects.
 *
 * If the returned string is none it means that no metadata is available for the file, and you should not attempt to access any of the other properties.
 */
interface DOpusMetadata extends String {

	/**
	 * Returns an AudioMeta object providing access to audio metadata. The properties of this object are generally returned as their appropriate underlying type (e.g. a numeric field like "track number" will be returned as an int).
	 */
	readonly audio: DOpusAudioMeta;

	/**
	 * Returns an AudioMeta object that provides access to the unmodified text form of the audio metadata. This provides access to the same text as displayed in a Lister. For example, a numeric field like "track number" would be returned as a string rather than an int.
	 */
	readonly audio_text: DOpusAudioMeta;

	/**
	 * Returns a DocMeta object providing access to document metadata.
	 */
	readonly doc: DOpusDocMeta;

	/**
	 * Returns a DocMeta object that provides access to the unmodified text form of the document metadata.
	 */
	readonly doc_text: DOpusDocMeta;

	/**
	 * Returns an ExeMeta object providing access to executable (program) metadata.
	 */
	readonly exe: DOpusExeMeta;

	/**
	 * Returns an ExeMeta object that provides access to the unmodified text form of the program metadata.
	 */
	readonly exe_text: DOpusExeMeta;

	/**
	 * Returns a FontMeta object providing access to font file metadata.
	 */
	readonly font: DOpusFontMeta;

	/**
	 * Returns an ImageMeta object providing access to picture metadata.
	 */
	readonly image: DOpusImageMeta;

	/**
	 * Returns an ImageMeta object that provides access to the unmodified text form of the picture metadata.
	 */
	readonly image_text: DOpusImageMeta;

	/**
	 * Returns an OtherMeta object that provides access to miscellaneous metadata.
	 */
	readonly other: DOpusOtherMeta;

	/**
	 * Returns a collection of strings corresponding to the tags that are assigned to this item.
	 */
	readonly tags: string;

	/**
	 * Returns a VideoMeta object providing access to video metadata.
	 */
	readonly video: DOpusVideoMeta;

	/**
	 * Returns a VideoMeta object that provides access to the unmodified text form of the video metadata.
	 */
	readonly video_text: DOpusVideoMeta;

}

/**
 * The Msg object represents a script dialog input event message. It’s returned by the Dialog .GetMsg method which you call when running the message loop for a detached dialog .
 * @see {DOpusDialog}
 *
 * @returns {boolean} Returns True if the message is valid, or False if the dialog has been closed (which means you should exit your message loop).
 */
interface DOpusMsg extends Boolean {

	/**
	 * If the event type is checked, this indicates the check state of the item. If checkboxes are used in automatic mode, this will be the new check state of the item. In manual mode, this will indicate the existing state and it's up to you to change the state if desired.
	 *
	 * Check states are:
	 *
	 * * **0** - unchecked
	 * * **1** - checked
	 * * **2** - indeterminate
	 * * **3** - unchecked/disabled
	 * * **4** - checked/disabled
	 * * **5** - indeterminate/disabled
	 */
	readonly checked: number;

	/**
	 * Returns the name of the control involved in the event. You can get a Control object representing the control by passing this string to the Dialog.Control method.
	 *
	 * For a timer event this returns the name of the timer that was triggered. For a hotkey event this returns the name of the hotkey. For a drop event this returns the name of the control that the files were dropped on.
	 *
	 * For a tab event this tells you which monitored tab the event occurred in (either the ID you assigned in the Dialog.WatchTab method, or the numeric handle of the tab if you didn't assign an ID).
	 */
	readonly control: string;

	/**
	 * For resize events, this property returns the new width of the dialog.
	 */
	readonly cx: number;

	/**
	 * For resize events, this property returns the new height of the dialog.
	 */
	readonly cy: number;

	/**
	 * If the event type is focus, indicates the new focus state of the control - True if the control has gained the focus, or False if it's lost it.
	 *
	 * For a combo box or list box control: If the event type is selchange or dblclk, returns the data value associated with the selected item.
	 *
	 * For a two-state check box control or radio button: If the event type is click, returns a bool indicating the current check state.
	 *
	 * For a three-state check box: If the event type is click, returns an int representing the current state.
	 *
	 * If the event type is timer, this value indicates the number of milliseconds that have elapsed since the last time this timer was triggered.
	 *
	 * If the event type is tab, and the value property is set to filechange, this indicates which file change events occurred in the monitored tab. 1 = add, 2 = delete, 4 = change. The values will be added together (so e.g. 6 indicates at least one item was changed and at least one was deleted).
	 */
	readonly data: number | boolean;

	/**
	 * Returns the name of the parent dialog.
	 */
	readonly dialog: string;

	/**
	 * Returns a string indicating the event that occurred.
	 *
	 * Currently defined events are:
	 *
	 * * **invalid**: The dialog has been closed.
	 * * **checked**: For a listview control with the Checkboxes property enabled, indicates that the checkbox of a list item has been clicked.
	 * * **click**: The control was clicked (e.g. a button, check box, radio button or static control with Notify Clicks property enabled).
	 * * **dblclk**: An item in the list was double-clicked (list box, combo box or list view) or the control was double-clicked (static control with Notify Clicks property enabled).
	 * * **rclick**: An item in the list was right-clicked (list box, list view) or the control was right-clicked (static control with Notify Clicks property enabled).
	 * * **drop**: Files were dropped onto your dialog. The dialog template must have its Accept Drops property set to True to enable drag & drop support.
	 * * **editchange**: The contents of an edit field were modified. For a list view this event indicates that the label of a list item was edited.
	 * * **focus**: The control gained or lost focus.
	 * * **hotkey**: A key combination added as a hotkey with the Dialog.AddHotkey method has been pressed.
	 * * **resize**: The dialog was resized by the user. Only generated if the Dialog.want_resize property has been set to True. Don't mix manual and automatic resizing with the same control: If you move or resize a control in response to this event, the control should not have any of the resize flags set in the dialog editor.
	 * * **selchange**: The selection was changed (list box, combo box, list view or tab).
	 * * **timer**: A periodic timer created with the Dialog.SetTimer method has elapsed.
	 * * **tab**: An event has occurred in a tab monitored using the Dialog.WatchTab method.
	 * * **drag**: The user has initiated a drag and drop from a static or list view control. You can respond by calling the Dialog.Drag method. The Drag Source property must be enabled on the control for this event to be generated.
	 * * **close**: The user clicked the dialog's close button. Only generated if the Dialog.want_close property has been set to True. You'll need to close the dialog manually using the Dialog.EndDlg method.
	 */
	readonly event: string;

	/**
	 * Returns True if the control had focus when the message was generated.
	 */
	readonly focus: boolean;

	/**
	 * Returns the current selection index for a combo box, list box or tab control.
	 */
	readonly index: number;

	/**
	 * Returns the horizontal position of the mouse cursor when the message was generated.
	 */
	readonly mouseX: number;

	/**
	 * Returns the vertical position of the mouse cursor when the message was generated.
	 */
	readonly mouseY: number;

	/**
	 * For a drop event, this property returns a Vector of Item objects, representing the files that were dropped onto your dialog.
	 */
	readonly object: any;

	/**
	 * Returns a string indicating the qualifier keys (if any) that were held down when the message was generated.
	 *
	 * The string can contain any or all of the following: *shift, ctrl, alt, lwin, rwin *
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

	/**
	 * Returns True if the message is valid, or False if the dialog has been closed.
	 */
	readonly result: boolean;

	/**
	 * For a dialog tab control, returns the name of the parent tab (if the control is on a dialog that's inside a tab control). If the event type is tab, this returns a Tab object representing the monitored tab that the event occurred in. Calling this repeatedly may be inefficient.
	 */
	readonly tab: string;

	/**
	 * For the dblclk, editchange and selchange events, returns the current contents of the edit field (or selected item label).
	 *
	 * For the tab event, indicates which event occurred in the monitored tab. Possible values are select, navigate, filechange, activate, srcdst, view, flat, and close (sent if the tab is closed while you are monitoring it).
	 *
	 * For the drag event, this indicates which button is being used to drag (left or right).
	 */
	readonly value: string;

}

/**
 * If a script add-in implements the OnOpenLister event, the method receives an OpenListerData object when invoked when a new Lister opens.
 * @see {DOpusOnOpenLister}
 */
interface DOpusOpenListerData {

	/**
	 * Initially this is set to False, indicating that the event has been called before any tabs have been created. If you return True from the OnOpenLister event, it will be called again and after will be set to True to indicate all tabs have been created.
	 */
	readonly after: boolean;

	/**
	 * Returns a Lister object representing the newly opened Lister.
	 */
	readonly lister: DOpusLister;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

}

/**
 * If a script add-in implements the OnOpenTab event, the method receives an OpenTabData object when invoked when a new tab is opened.
 * @see {DOpusOnOpenTab}
 */
interface DOpusOpenTabData {

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

	/**
	 * Returns a Tab object representing the newly opened tab.
	 */
	readonly tab: DOpusTab;

}

/**
 * The OtherMeta object is retrieved from the Metadata .other property. It provides access to miscellaneous information about the file or folder.
 * @see {DOpusMetadata}
 */
interface DOpusOtherMeta {

	/**
	 * An automatically generated description string for the item. This is the same string that is shown in the Description column in a Lister. Opus automatically generates the description for various types of files using the other metadata in ways that make the most sense.
	 */
	readonly autoDesc: string;

	/**
	 * For a folder, the size of which has been calculated via GetSizes or similar, this provides the number of sub-folders directly underneath the folder.
	 */
	readonly dirCount: number;

	/**
	 * Similar to dircount, this provides the total number of sub-folders underneath the folder (this is a recursive count - it includes sub-sub-folders, sub-sub-sub-folders, etc.)
	 */
	readonly dirCountTotal: number;

	/**
	 * For a folder, the size of which has been calculated via GetSizes or similar, this provides the number of files directly located in that folder.
	 */
	readonly fileCount: number;

	/**
	 * Similar to filecount, this provides the total number of files in the folder and all its sub-folders, sub-sub-folders, etc.
	 */
	readonly fileCountTotal: number;

	/**
	 * For a folder, the size of which has been calculated via GetSizes or similar, this returns a string giving a summary of the contents of the folder.
	 */
	readonly folderContents: string;

	/**
	 * A description automatically generated for the item by its parent virtual file system.
	 */
	readonly nsDesc: string;

	/**
	 * Returns the user-assigned rating for this file or folder.
	 */
	readonly rating: number;

	/**
	 * Returns a Path object representing the target path of shortcuts and links.
	 */
	readonly target: DOpusPath;

	/**
	 * Returns a string indicating the type of the link: *unknown, linkfile, dosfile, url, junction, softlink*
	 */
	readonly target_type: string;

	/**
	 * Returns the user-assigned description for the file or folder.
	 */
	readonly userComment: string;

}

/**
 * The Path object represents a file or folder path. Many objects have properties that return a Path - for example, Tab .path returns the current folder in a tab as a Path object. You can create a new Path object from a string (or another Path ) using the DOpus . FSUtil .NewPath method.
 * @see {DOpusTab}
 * @see {DOpusConstructor}
 * @see {DOpusFSUtil}
 *
 * @returns {typeof string} Returns the full path as a string.
 */
interface DOpusPath extends String {

	/**
	 * Returns the full path as a string.
	 */
	toString(): string;

	/** only for tsc compatibility reasons */
	split(): string[];

	/**
	 * Returns the number of components in the path.
	 */
	readonly components: number;

	/**
	 * Returns a Vector of ints representing the physical disk drive or drives that this path resides on.
	 */
	readonly disks: DOpusVector<number>;

	/**
	 * Returns the drive number the path refers to (1=A, 2=B, etc.) or 0 if the path does not specify a drive. You can also change the drive letter of the path (while leaving the following path components alone) by modifying this value.
	 */
	readonly drive: number;

	/**
	 * Returns the filename extension of the path (the sub-string extending from the last . in the final component to the end of the string). This method does not check if the path actually refers to a file.
	 *
	 * You can also change a path's file extension by setting this property (and strip the extension altogether by setting it to an empty string).
	 */
	readonly ext: string;

	/**
	 * Returns the filename extension of the path, taking multi-part extensions into account. For example, ext might return ".rar" whereas ext_m would return ".part1.rar".
	 *
	 * You can't change the extension using ext_m, only ext.
	 */
	readonly ext_m: string;

	/**
	 * Returns the filename part of the path (the last component).
	 */
	readonly filepart: string;

	/**
	 * If this object represents a short pathname, this property returns the "long" equivalent.
	 */
	readonly longpath: DOpusPath;

	/**
	 * Returns the path minus the last component.
	 */
	readonly pathpart: string;

	/**
	 * This property is set by DOpusDialog.save() & DOpusDialog.folder()
	 *
	 * A Path object is returned to indicate the file chosen by the user.
	 * This object will have an additional result property that will be False if the user cancelled the dialog
	 * the other normal Path properties will only be valid if result is True.
	 * @see {DOpusDialog}
	 */
	readonly result: boolean;

	/**
	 * If this object represents a long pathname, this property returns the "short" equivalent, if it has one. Note that short paths are disabled by default in Windows 10.
	 */
	readonly shortpath: DOpusPath;

	/**
	 * Returns the filename stem of the path (i.e. filepart minus ext).
	 */
	readonly stem: string;

	/**
	 * Returns the filename stem taking multi-part extensions into account. For example, stem might return "pictures.part1" whereas stem_m would return "pictures".
	 */
	readonly stem_m: string;

	/**
	 * Returns True if a call to the Parent method would succeed.
	 */
	readonly test_parent: boolean;

	/**
	 * Returns True if a call to the Root method would succeed.
	 */
	readonly test_root: boolean;

	/**
	 * Adds the specified name to the path (it will become the last component). As well as a string, you can pass a Vector of strings and all items in the vector will be added to the path.
	 */
	add(name?: string, string?: DOpusVector<any>): void;

	/**
	 * Removes the last component of the path. Returns False if the path does not have a valid parent.
	 */
	parent(): boolean;

	/**
	 * Compares the beginning of the path with the "old" string, and if it matches replaces it with the "new" string. The match is performed at the path component level - for example, an "old" string of "C:\Foo" would match the path "C:\Foo\Bar" but not "C:\FooBar". If the optional "wholepath" argument is set to True then the whole path must match rather than just its beginning. Returns True if the string matched the path or False otherwise.
	 */
	replaceStart(oldval?: string, newval?: string, wholepath?: boolean): boolean;

	/**
	 * Strips off all but the first component of the path. Returns False if the path is already at the root.
	 */
	root(): boolean;

	/**
	 * Sets the path represented by the Path object to the specified string. You can also set one Path object to the value of another. If you pass a Vector of strings the path will be built from the items in the vector.
	 */
	set(path?: string | DOpusPath, string?: DOpusVector<any>): void;

	/**
	 * Returns a Vector of strings representing the components of the path. For example, if the path is C:\Foo\Bar, the vector will contain three items - "C:\", "Foo" and "Bar". By default all components of the path are returned, but you can optionally provide the index of the first component and also the number of components to return.
	 */
	split(first?: number, count?: number): DOpusVector<string>;

}

/**
 * The Progress object lets you display and control a standard Directory Opus progress indicator dialog. This object can be obtained from the Command .progress property.
 *
 * The basic steps for using a Progress object are:
 *
 * 1. Initialize the fundamental properties.
 * 2. Call the Init method to create the dialog (this creates it but does not show it to the user).
 * 3. When ready, call the Show method to make the dialog visible.
 * 4. Call the appropriate methods to initialize the state of the progress bars (by setting the total number of files, total byte size, etc).
 * 5. As your operation progresses, advance the progress bars using methods like StepFiles and StepBytes .
 * 6. If appropriate, poll the state of the Abort and other control buttons using GetAbortState .
 * 7. Call the Hide method and destroy the object when your operation is finished.
 *
 * @see {DOpusCommand}
 */
interface DOpusProgress {

	/**
	 * Before calling Init, set to True if the Abort button should be available, or False to disable it.
	 */
	abort: boolean;

	/**
	 * Before calling Init, set to True if the dialog should show progress in bytes rather than whole files.
	 */
	bytes: boolean;

	/**
	 * Before calling Init, set to True if the dialog should delay before appearing after the Show method is called. The delay is configured by the user in Preferences.
	 */
	delay: boolean;

	/**
	 * Before calling Init, set to True to enable a "full size" progress indicator with two separate progress bars (one for files and one for bytes).
	 */
	full: boolean;

	/**
	 * Before calling Init, set to True if the dialog should be owned by its parent window (the parent is given later, when the dialog is created via the Init method).
	 */
	owned: boolean;

	/**
	 * Before calling Init, set to True if the Pause button should be available.
	 */
	pause: boolean;

	/**
	 * Before calling Init, set to True if the Skip button should be available. (This just makes it so the Skip button can be enabled. You must still call EnableSkip later to actually enable it; usually once per file.)
	 */
	skip: boolean;

	/**
	 * Adds the specified number of files to the operation total. The bytes argument is optional - in a "full size" progress indicator this lets you add to the total byte size of the operation.
	 */
	addFiles(count?: number, bytes?: DOpusFileSize | number): void;

	/**
	 * Clears the state of the three "control" buttons (Abort / Pause / Skip) so they no longer register as being clicked when GetAbortState is called.
	 *
	 * If you only want to clear the Skip state, you should normally do that as part of a call to EnableSkip instead. That way you avoid accidentally clearing one of the other states if they become set between you calling GetAbortState and ClearAbortState. In fact, there are very few situations where you should call ClearAbortState.
	 */
	clearAbortState(): void;

	/**
	 * Enables the progress dialog's Skip button. For EnableSkip to work, you must have set the skip property to True before the progress dialog was created by the Init method.
	 *
	 * * **enable**: If True, the Skip button should be enabled; otherwise, it should be disabled.
	 * * **delay** (optional, True by default): If True, there will be a short delay before the Skip button is enabled, with it temporarily disabled during the delay; otherwise, the change is instant. See below for why a delay is usually a good idea.
	 * * **clear** (optional, True by default): If True, any record of the user pushing the Skip will be cleared, such that GetAbortState no longer returns "s". You usually want this if the progress dialog just moved to a new item.
	 *
	 * If you support the Skip button, you should normally call EnableSkip once per file, just after you call SetName and similar methods. When used that way, you'll usually want delay and clear to both be True, otherwise clicks of the Skip button intended for one file could affect the file(s) that come after it. For example, if a file takes a long time but then finishes just as the user gets tired of waiting and clicks Skip, the delay and cleared state ensure the unwanted click is harmless.
	 */
	enableSkip(enable?: boolean, delay?: boolean, clear?: boolean): void;

	/**
	 * Finish the current file. If the byte size of the current file has been set the total progress will be advanced by any remaining bytes.
	 */
	finishFile(): void;

	/**
	 * Polls the state of the three "control" buttons. This returns a string that indicates which, if any, of the three buttons have been clicked by the user. The button states are represented by the following letters in the returned string:
	 *
	 * * **a** - Abort
	 * * **p** - Pause
	 * * **s** - Skip
	 *
	 * If none of the states apply, an empty string is returned.
	 *
	 * **autoPause** (optional, False by default): If True, pausing is handled for you automatically. Calls to GetAbortState(True) block while paused and don't return until unpaused; the "p" state is never returned. (Note that clicking Skip or Abort will implicitly unpause the operation.)
	 *
	 * **wanted** (optional): If you only want to check one or two of the states, pass a string with their letters. For example, GetAbortState(True,"ap") will test for the Abort and Pause states, but not the Skip one. All states will be checked if the argument is an empty string or not given at all.
	 *
	 * **simple** (optional, True by default): If True, the result string will have at most one letter, indicating the most important state. If False, it is possible for multiple states to be indicated at once. For example if Skip and then Pause are clicked, in that order, without the script clearing the Skip state, then GetAbortState(False,"",False) would return "ps" while GetAbortState(False) would return just "p".
	 *
	 * To clear the state of the three buttons, call the ClearAbortState method. To clear just the Skip button's state, use the EnableSkip method.
	 */
	getAbortState(autoPause?: boolean, wanted?: string, simple?: boolean): string;

	/**
	 * Hides the progress indicator dialog. The dialog object itself remains valid, and can be redisplayed with the Show method if desired.
	 */
	hide(): void;

	/**
	 * Hides or shows the "XX bytes / YY bytes" string in the progress dialog. You can use this to hide the string if the progress does not indicate a number of bytes (e.g. when it indicates a percentage). Pass True for the show argument to show the string and False to hide it.
	 */
	hideFileByteCounts(show?: boolean): void;

	/**
	 * Initializes the dialog. This method causes the actual dialog to be created, although it will not be displayed until the Show method is called. The fundamental properties shown above must be set before this method is called - once the dialog has been created they can not be altered.
	 *
	 * The parent parameter can be either a Tab or a Lister - this controls which window the dialog is centered over, and if the owned property is set to True which window it is owned by (always appears on top of). If no parent is provided the dialog will not be associated with any particular window.
	 *
	 * The title parameter specifies the window title of the dialog.
	 */
	init(parent?: DOpusTab | DOpusLister, title?: string): void;

	/**
	 * Resets the byte count for the current file to zero.
	 */
	initFileSize(): void;

	/**
	 * Resets the total completed file and byte counts to zero.
	 */
	restart(): void;

	/**
	 * Sets the total completed byte count.
	 */
	setBytesProgress(bytes?: DOpusFileSize | number): void;

	/**
	 * Sets the size of the current file.
	 */
	setFileSize(bytes?: DOpusFileSize | number): void;

	/**
	 * Sets the total number of files.
	 */
	setFiles(count?: number): void;

	/**
	 * Sets the total completed file count.
	 */
	setFilesProgress(count?: number): void;

	/**
	 * Sets the text at the top of the dialog that indicates the source and destination of an operation. The header argument refers to the string that normally says From: - this allows you to change it in case that term is not applicable to your action. The from argument is the source path, and the to argument (if there is one) is the destination path. Note that if you specify a destination path this always has a To: header appended to it.
	 *
	 * If you omit the to argument entirely (not just passing an empty string), the destination line will become blank, including the To: header. Use that if you want the second line to be used sometimes but not always. If you never want anything on the second line, use the SetStatus method instead as it will not add space for the extra line.
	 */
	setFromTo(header?: string, from?: string, to?: string): void;

	/**
	 * Sets the name of the current file.
	 */
	setName(name?: string): void;

	/**
	 * Sets the current progress as a percentage (from 0 to 100).
	 */
	setPercentProgress(percent?: number): void;

	/**
	 * Sets the text displayed in the status line at the top of the dialog. This sets a single-line status message, while SetFromTo can be used to indicate source and destination paths on two lines.
	 */
	setStatus(status?: string): void;

	/**
	 * Sets the title of the dialog.
	 */
	setTitle(title?: string): void;

	/**
	 * Sets the type of the current item - either file or dir.
	 */
	setType(type?: string): void;

	/**
	 * Displays the progress indicator dialog. Call this once you have created the dialog using the Init method.
	 */
	show(): void;

	/**
	 * Skips over the current file. Set the complete argument to True to have the file counted as "complete", or False to count it as "skipped".
	 */
	skipFile(complete?: boolean): void;

	/**
	 * Step the byte progress indicator the specified number of bytes.
	 */
	stepBytes(bytes?: DOpusFileSize | number): void;

	/**
	 * Step the file progress indicator the specified number of files.
	 */
	stepFiles(count?: number): void;

}

/**
 * The QuickFilter object provides access to information about the quick filter state in a tab. It’s returned by the Tab .quickfilter property.
 * @see {DOpusTab}
 *
 * @returns {string} Returns the current filter string, if any.
 */
interface DOpusQuickFilter extends String {

	/**
	 * Returns True if the auto-clear mode is set in Preferences.
	 */
	readonly autoClear: boolean;

	/**
	 * Returns True if the auto-star mode is set in Preferences.
	 */
	readonly autoStar: boolean;

	/**
	 * Returns True if the filter is disabled.
	 */
	readonly disable: boolean;

	/**
	 * Returns True if easy mode is selected.
	 */
	readonly easyMode: boolean;

	/**
	 * Returns the current filter string.
	 */
	readonly filter: string;

	/**
	 * Returns True if all folders are being hidden.
	 */
	readonly hideAllDirs: boolean;

	/**
	 * Returns True if all files are being hidden.
	 */
	readonly hideAllFiles: boolean;

	/**
	 * Returns True if filtering in flatview is enabled.
	 */
	readonly overrideFlatview: boolean;

	/**
	 * Returns True if partial matching is enabled.
	 */
	readonly partial: boolean;

	/**
	 * Returns True if realtime filtering is enabled.
	 */
	readonly realtime: boolean;

	/**
	 * Returns True if regular expression mode is enabled.
	 */
	readonly regex: boolean;

	/**
	 * Returns True if all folders are being shown.
	 */
	readonly showAllDirs: boolean;

	/**
	 * Returns True if all files are being shown.
	 */
	readonly showAllFiles: boolean;

	/**
	 * Returns True if Show Everything mode is on, which overrides (almost) all filtering.
	 */
	readonly showeEerything: boolean;

}

/**
 * The Rect object represents a rectangle (or, in some cases, something relating to a rectangle's four sides).
 *
 * The descriptions below give the properties' typical meanings. Where a method returns a Rect with different meanings, it will be noted in the documentation for that method.
 */
interface DOpusRect {

	/**
	 * Returns the left edge of the rectangle.
	 */
	readonly left: number;

	/**
	 * Returns the top edge of the rectangle.
	 */
	readonly top: number;

	/**
	 * Returns the right edge of the rectangle.
	 *
	 * Note that this value is actually 1 outside the right edge.
	 *
	 * A rectangle includes everything from and including the left edge up to but excluding the right edge. A rectangle at position 0,7 with 0 width will have left=0 and right=0. The same but with a width of 1 will have left=0 and right=1, and so on.
	 */
	readonly right: number;

	/**
	 * Returns the bottom edge of the rectangle.
	 *
	 * Note that this value is actually 1 outside the right edge.
	 *
	 * A rectangle includes everything from and including the top edge up to but excluding the bottom edge. A rectangle at position 0,7 with 0 height will have top=7 and bottom=7. The same but with a height of 10 will have top=7 and bottom=17, and so on.
	 */
	readonly bottom: number;

	/**
	 * Returns the width of the rectangle. Equal to right-left.
	 */
	readonly width: number;

	/**
	 * Returns the height of the rectangle. Equal to bottom-top.
	 */
	readonly height: number;

	/**
	 * Returns a string describing the rectangle's position and size, as a convenience when debugging scripts. The format is "(L,T - R,B; WxH)" i.e. Left, Top, Right, Bottom, Width, and Height.
	 */
	toString(): string;

}

/**
 * The Results object provides information about the outcome of a function run by the Command object. It is obtained from the Command.results property.
 * @see {DOpusCommand}
 */
interface DOpusResults {

	/**
	 * Indicates whether or not the command ran successfully. Zero indicates the command could not be run or was aborted; any other number indicates the command was run for at least some files. (Note that this is not the "exit code" for external commands. For external commands it only indicates whether or not Opus launched the command. If you need the exit code of an external command, use the WScript.Shell Run or Exec methods to run the command.)
	 */
	readonly result: number;

	/**
	 * This property returns a collection of Tab objects representing any new tabs created by the command.
	 */
	readonly newTabs: DOpusTab;

	/**
	 * This property returns a collection of Lister objects representing any new Listers created by the command.
	 */
	readonly newListers: DOpusLister;

	/**
	 * This property returns a collection of Viewer objects representing any new image viewers created by the command. (This is only for standalone viewers, not the viewer pane.)
	 */
	readonly newViewers: DOpusViewer;

}

/**
 * The Script object is one of the two global script objects provided by Opus. This object is provided to script addins when their various event handlers are invoked (other than for the OnInit event). It provides information relating to the script itself.
 * @see {DOpusOnInit}
 */
interface DOpusScript extends DOpusVars {

	/**
	 * Returns a ScriptConfig object representing the configuration values for this script. In the OnInit method a script can define the properties that make up its configuration - the user can then edit these values in Preferences. The object returned by the config property represents the values that the user has chosen.
	 */
	readonly config: DOpusScriptConfig;

	/**
	 * Returns the path and filename of this script.
	 */
	readonly file: string;

	/**
	 * Returns a Vars object that represents the variables that are scoped to this particular script. This allows scripts to use variables that persist from one invocation of the script to another.
	 */
	readonly vars: DOpusVars;

	/**
	 * Returns True if local HTTP help is enabled (that is, if help is shown in the user's web browser), False if the old HtmlHelp-style help is enabled. If HTTP help is enabled, your script is able to add its own help pages via the OnGetHelpContent event, and it can trigger the display of its own help pages using the ShowHelp method.
	 */
	httpHelpEnabled(): boolean;

	/**
	 * If your script implements the OnAddColumns event, you can call the InitColumns method at any time to reinitialize your columns. You may want to do this, for example, in response to the user modifying your script's configuration.
	 */
	initColumns(): void;

	/**
	 * If your script implements the OnAddCommands event, you can call the InitCommands method at any time to reinitialize your commands. You may want to do this, for example, in response to the user modifying your script's configuration.
	 */
	initCommands(): void;

	/**
	 * Using the OnGetHelpContent event your script can add its own content to the F1 help. If your script is bundled as a script package you can include .html files in a sub-directory of the package called help, and then load them easily using this method. You can then pass the loaded data to the GetHelpContentData.AddHelpPage method to add the page.
	 */
	loadHelpFile(name?: string): string;

	/**
	 * If your script is bundled as a script package you can include PNG and JPG image files in a sub-directory of the package called help, and then load them easily using this method. You can then pass the loaded data to the GetHelpContentData.AddHelpImage method to add the image.
	 */
	loadHelpImage(name?: string): DOpusBlob;

	/**
	 * Loads an image file from the specified external file. If your script is bundled as a script package you can place image files in a sub-directory of the package called images and then load them from your script by giving their name. You can optionally specify the desired size to load the image at, and whether the alpha channel (if any) should be loaded or not.
	 *
	 * The returned Image object can be given as the value of the Control.label property for a static control in a script dialog (when that control is in "image" mode). You can also assign as to the icon property of a Dialog object to specify a custom window icon for your script dialog.
	 */
	loadImage(name?: string, width?: number, height?: number, alpha?: boolean): DOpusImage;

	/**
	 * Loads external script resources and makes them available to the script. You can either provide a filename or a raw XML string. If your script is bundled as a script package, the resource file must have a .odxml extension for LoadResources to be able to find it in the package.
	 */
	loadResources(name?: string, XML?: string): void;

	/**
	 * If your script implements any custom columns, you can use this method to cause them to be regenerated if they are currently shown in any tabs. You may want to do this, for example, in response to the user modifying your script's configuration. Pass the name of the column you want to regenerate as the argument to this method.
	 */
	refreshColumn(name?: string): void;

	/**
	 * If your script adds its own help pages via the OnGetHelpContent event, and the user has http help enabled, you can call this method to display your help in the user's web browser. You might want to do this when the user clicks a Help button in your script dialog, for example. You can use the HttpHelpEnabled method to check if http help is enabled before calling this function.
	 *
	 * The optional parameter must be the name of the desired page to show, which corresponds to the name you supplied when you added it in the OnGetHelpContent event handler. If you omit this parameter then your first help page will be shown.
	 */
	showHelp(page?: string): void;

}

declare var Script: DOpusScript;

/**
 * In a script's OnInit method it can call the ScriptInitData .AddColumn method to add custom columns to Opus. These columns can be displayed in file displays and infotips, and can be searched on using the Advanced Find function. Each call to AddColumn returns a ScriptColumn object that the script needs to initialize.
 * @see {DOpusOnInit}
 * @see {DOpusScriptInitData}
 */
interface DOpusScriptColumn {

	/**
	 * If this is set to True (which is the default), and the file display is grouped by this column, Opus will generate the groups automatically based on the column value. If you set this to False, Opus will expect you to provide grouping information in your OnScriptColumn function.
	 */
	autoGroup: boolean;

	/**
	 * Set to True (or 1) to force Opus to update the value for this column when a file changes. You can also set this value to 2 to force Opus to update the value when the file's attributes change (normally it would only update if the file modification time or size changed).
	 */
	autoRefresh: boolean | number;

	/**
	 * This property lets you control the default sort behavior for your column. Normally when the user clicks the column header to sort by a column the column is initially sorted in ascending order, and then clicking again reverses the sort order. If you set defsort to -1, the first click on the column header will sort in descending order. Date and size fields have this behavior set by default.
	 */
	defSort: number;

	/**
	 * Specifies a default width for your column, which will be used unless the file display has auto-sizing enabled. If you specify a simple integer value this represents a width measured in average characters (e.g. 12 specifies 12 average characters wide). You can also specify an absolute number of pixels by adding the px suffix (e.g. "150px" specifies 150 pixels).
	 */
	defWidth: number | string;

	/**
	 * For graph columns, specifies the first graph color set. The graph will be displayed in these colors as long as its percentage is below the threshold.
	 *
	 * You can either specify a single color (in r,g,b or #rrggbb format), in which case the graph will be a flat solid color, or exactly five colors to configure the graph's gradient. In the second case, the five colors correspond to outer bright, inner bright, inner dark, outer dark, and flat. The first four control the gradient and the fifth (flat) is used when gradients are disabled. 
	 *
	 * The graph_colors property returns a Vector; you need to use the push_back() method to add your colors to it.
	 */
	graph_colors: DOpusVector<object>;

	/**
	 * Similar to graph_colors, this property lets you configure a second set of colors for a graph column that will be used when the graph value exceeds the threshold.
	 */
	graph_colors2: DOpusVector<object>;

	/**
	 * For graph columns, specifies the percentage threshold at which the graph will switch from the first color set to the second (e.g. a blue graph goes red to indicate a drive is nearly full). Set the threshold to -1 to disable the second color set altogether.
	 */
	graph_threshold: number;

	/**
	 * If the autogroup property is set to False, the grouporder property lets you control the order your column's groups appear in. Each group should be listed in the string in the desired order, separated by a semi-colon (e.g. "Never Modified;Modified"). If not provided, groups will default to sorting alphabetically.
	 */
	groupOrder: string;

	/**
	 * If this property is set, this defines the string that will be displayed in the column header when this column is added to a Lister. If not set, the label value will be used.
	 */
	header: string;

	/**
	 * Set this to True if you want your column to be only available for use in Info Tips. You might want this if your column takes a significant amount of time to return a value, in which case the user would probably only want to use it in an Info Tip so they can see the value on demand. If set to False (the default) the column will be available everywhere.
	 */
	infotipOnly: boolean;

	/**
	 * This field lets you control the justification of your column. If not specified, columns default to left justify. Acceptable values are center, left, right and path.
	 */
	justify: string;

	/**
	 * If this is set to True, and the user has the Sort-field specific key scrolling Preferences option enabled, then your column will participate in this special mode.
	 */
	keyScroll: boolean;

	/**
	 * Use this to set a label for the column. This is displayed in the column header when the column is added to a Details/Power mode file display (unless overridden by the header property), and in various column lists such as in the Folder Options dialog.
	 */
	label: string;

	/**
	 * If you add strings to this Vector (e.g. via the push_back method) it will be used to provide a drop-down list of possible values when searching on this column using the Advanced Find function.
	 */
	match: DOpusVector<string>;

	/**
	 * If the column type is set to stars this property lets you specify the maximum number of stars that will be used. This is used to ensure the column is sized correctly.
	 */
	maxStars: number;

	/** This is the name of the method in your script that provides the actual values for your new column. This would typically be set to On*XXXXX* where *XXXXX* is the name of the command, however any method name can be used.
	 *
	 * When the method is invoked it is passed a single argument, a ScriptColumnData object. Generically this method is referred to as OnScriptColumn. */
	method: string;

	/**
	 * If your script implements multiple columns that require common calculations to perform, you may wish to set the multicol property. If this is set to True then your column handler function has the option of returning data for multiple columns simultaneously, rather than just the specific column it is being invoked for.
	 *
	 * When your handler is called, the ScriptColumnData object won't contain the usual group, sort, type and value properties. Instead, it will have a columns property that points to a Map that lets you set the values for one or more of your columns at once.
	 *
	 * For example, you might set the value of a column called MyColumn like this:
	 *
	 * `scriptColData.columns("MyColumn").value = "My Column Value";`
	 */
	multiCol: boolean;

	/**
	 * This is the raw name of the column. This determines the name that can be used to control the column programmatically (for example, the Set COLUMNSTOGGLE command can be used to toggle a column on or off by name).
	 *
	 * The name of a custom column is built from a combination of the name of the script that provides the column and the raw name of the column itself, and is preceded by the prefix scp:. For example, if your script were called My Script and your column's name were My Column, you could toggle this column using the command Set COLUMNSTOGGLE="scp:My Script/My Column". You can use the button editor menus to build the command automatically, if you are unsure of anything.
	 */
	name: string;

	/**
	 * Set to True to force Opus to update the value for this column when a file's name changes.
	 */
	nameRefresh: boolean;

	/**
	 * Set to True to prevent the file display being grouped by this column.
	 */
	noGroup: boolean;

	/**
	 * Set to True to prevent the file display being sorted by this column.
	 */
	noSort: boolean;

	/**
	 * Time, in milliseconds, before Opus may give up waiting for calculation of a column value.
	 *
	 * Defaults to 10000 (i.e. 10 seconds). Set to 0 (zero) to force Opus to wait forever in all situations.
	 *
	 * The timeout is not always applicable. When Opus asks a script for column data to show in a file display, the timeout is not used because the calculation happens in the background and doesn't hold anything up. But Opus can give up waiting if a column takes too long in situations where it does hold up other things. This is to avoid blocking forever when scripts get stuck in infinite loops.
	 *
	 * Find filters and the Print/Export Folder Listing dialog are two examples which use the timeout when requesting data from script columns. A column which calculates hashes of files with no size limit is an example which could be expected to take a long time and where it would make sense to increase the timeout or set it to 0.
	 */
	timeout: number;

	/**
	 * This field lets you set the default type of the column.
	 *
	 * If not specified, columns default to plain text.
	 *
	 * Acceptable values are:
	 *
	 * * **number**: The column displays integer numbers.
	 * * **double**: The column displays floating point (fractional) numbers.
	 * * **size**: The column displays file sizes (automatically displays bytes, KB, MB, etc.).
	 * * **zip**: The column displays file sizes (uses the settings for Zip file sizes).
	 * * **graph**: The column displays a bar graph (expects a value from 0 to 100).
	 * * **graphrel**: The column displays a bar graph. Opus automatically keeps track of the minimum and maximum values provided and scales the graph accordingly.
	 * * **graphrel0**: Similar to graphrel except the minimum value is always 0, and Opus keeps track of the maximum value.
	 * * **igraph**: The column displays an inverted bar graph.
	 * * **igraphrel**: Inverted relative bar graph.
	 * * **igraphrel0**: Inverted bar graph relative to 0.
	 * * **percent**: The column displays a percentage.
	 * * **percentrel**: Relative percentage.
	 * * **percentrel0**: Percentage relative to 0.
	 * * **date**: The column displays a date.
	 * * **time**: The column displays a time.
	 * * **datetime**: The column displays both a date and a time.
	 * * **stars**: The column displays stars (similar to the built-in Rating column).
	 *
	 * For plain text columns, you can specify numericsort or nonumericsort to override the "numeric order filename sorting" setting in Folder Options. Similarly, wordsort or nowordsort can be used to override the "word sort (special handling for hyphens, etc.)" setting. You can also combine both options, e.g. nonumericsort,nowordsort to request only basic sorting. Leave the type unset, or set it to an empty string, for plain text data which respects the Folder Options sort settings.
	 *
	 * For date, time and datetime columns, you can also specify utc to have the values automatically converted from UTC to local time (e.g. datetime,utc).
	 *
	 * For number and double columns, you can also specify signed to have the values treated as signed rather than unsigned (e.g. number,signed).
	 *
	 * For the graph columns, you can use graph_colors, graph_colors2 and graph_threshold to configure the graph's appearance.
	 *
	 * Your OnScriptColumn method can override the type on a per-file basis, however this field sets the default type and also controls the behavior of the Advanced Find function when searching using your column.
	 */
	type: string;

	/**
	 * Allows you to associate a data value with a column. The value will be passed to your column handler in the ScriptColumnData.userdata property
	 */
	userData: any;

}

/**
 * The ScriptColumnData object is passed to the script-defined entry points for any custom columns added by a script add-in . The method name for these events is defined by the script itself, but generically it's referred to as OnScriptColumn . Note that the fields group , sort , type and value are settable and are the way your method returns values for your column.
 * @see {DOpusOnScriptColumn}
 */
interface DOpusScriptColumnData {

	/**
	 * Provides the name of the column that Opus wants the script to return the value for. If you use the same OnScriptColumn method to provide multiple columns you can use this to tell the columns apart.
	 */
	col: string;

	/**
	 * If the ScriptColumn.multicol value is set to True when the column is added, then this property provides a Map that lets you return the values of one or more columns at once.
	 *
	 * You may want to use this method if your script returns multiple columns that all share common calculations (e.g. reading the contents of a folder). That way, you can avoid repeating potentially time consuming operations when you're called for the second and subsequent columns.
	 *
	 * The Map contains one member element for each of your columns. Each member element has **group, group_type, sort, type, userdata,** and **value** properties which are equivalent to the ones described below.
	 *
	 * For example, you might set the value of a column called MyColumn like this:
	 *
	 * `scriptColData.columns("MyColumn").value = "My Column Value";`
	 *
	 * You should check if a column exists in the map before populating data for it. In some situations, Opus will only request a some of the columns your add-in supports, not all of them.
	 *
	 * If you do not fill in data for a column which Opus still needs, Opus will call your method again to request it, with its name in the col property (but still in multi-column mode). You can take advantage of this if calculating one piece of data yields values for some of your columns but not all of them. You do not need to populate every column if you the data is not available, but you should at least populate the col column.
	 *
	 * As a consequence of the above, when using multi-column mode you should always set some kind of value for any column you have spent time calculating, even if the result of the calculation is that nothing should be shown in the column. If nothing should be shown, set the value to an empty string (this is fine even if the column normally displays numbers or another type of data). If you don't set any value at all, Opus will assume you haven't calculated that column yet and may call your script again to ask for it, which could cause you to waste time re-calculating it when you already know it is blank.
	 */
	columns: DOpusMap;

	/**
	 * If the ScriptColumn.autogroup value is set to False when the column is added, you should set this value to indicate the group that this file should be placed in when the list is grouped by your column. If you don't provide a group then this file will go into the Unspecified group. If autogroup is set to True this value is ignored.
	 *
	 * Note that if the ScriptColumn.multicol value is set to True when the column is added then this property will be found inside the columns Map.
	 */
	group: string;

	/**
	 * If the group is set via the group property, group_type lets you control the formatting of the group title using the same keywords as the type field (e.g. you can supply a number and have the group title formatted as a file size by setting group_type="size").
	 *
	 * Note that if the ScriptColumn.multicol value is set to True when the column is added then this property will be found inside the columns Map.
	 */
	group_type: string;

	/**
	 * Returns an Item object representing the file or folder that Opus wants the script to return the column value for.
	 */
	item: DOpusItem;

	/**
	 * Lets you control the sort order of your column by providing a sort key that can be different to the value. If provided, and the list is sorted by your column, Opus will use the value of this field to position this item rather than the value value.
	 *
	 * Note that if the ScriptColumn.multicol value is set to True when the column is added then this property will be found inside the columns Map.
	 */
	sort: any;

	/**
	 * Returns a Tab object representing the tab that contains the item.
	 */
	tab: DOpusTab;

	/**
	 *
	 * Lets you override the default type of the column (set via ScriptColumn.type when the column was added) on a per-file/folder basis.
	 *
	 * If not specified, and no default was specified either, then columns default to plain text.
	 *
	 * Note that if the ScriptColumn.multicol value is set to True when the column is added then this property will be found inside the columns Map.
	 *
	 * Acceptable values are:
	 *
	 * * **number**: The column displays integer numbers.
	 * * **double**: The column displays floating point (fractional) numbers.
	 * * **size**: The column displays file sizes (automatically displays bytes, KB, MB, etc.).
	 * * **zip**: The column displays file sizes (uses the settings for Zip file sizes).
	 * * **graph**: The column displays a bar graph (expects a value from 0 to 100).
	 * * **igraph**: The column displays an inverted bar graph.
	 * * **percent**: The column displays a percentage.
	 * * **date**: The column displays a date.
	 * * **time**: The column displays a time.
	 * * **datetime**: The column displays both a date and a time.
	 * * **stars**: The column displays stars (similar to the built-in Rating column). The value should be in the form "x" or "x/y".
	 *
	 * For date, time and datetime columns, you can also specify utc to have the values automatically converted from UTC to local time (e.g. datetime,utc).
	 *
	 * For number and double columns, you can also specify signed to have the values treated as signed rather than unsigned (e.g. number,signed).
	 *
	 * The options above are a subset of those you can specify via ScriptColumn.type, since not all options make sense on a per-file/folder basis.
	 *
	 * Note that if you mix different types within the one column then the results you get when sorting by this column, or searching on your column using the Advanced Find function, may be hard to predict.
	 */
	type: string;

	/**
	 * This field is how your method returns the actual value for your column - that is, the information that is displayed to the user in this column for each file and folder.
	 *
	 * If the type for this column has been set (either by ScriptColumnData.type or ScriptColumn.type) then Opus will try to convert the provided value to the specified type. If the type is not set then Opus will treat the value as a plain text string.
	 *
	 * If you don't provide a sort key via the sort field then Opus will also use this value to order the list when the list is sorted by this column.
	 *
	 * Note that if the ScriptColumn.multicol value is set to True when the column is added then this property will be found inside the columns Map.
	 */
	value: any;

	/**
	 * This returns the value associated with this column via ScriptColumn.userdata (if any) when the column was added.
	 *
	 * Note that if the ScriptColumn.multicol value is set to True when the column is added then this property will be found inside the columns Map.
	 */
	userData: any;

}

/**
 * In a script's OnInit method it can call the ScriptInitData .AddCommand method to add commands to the Opus internal command set. Each call to AddCommand returns a ScriptCommand object that the script needs to initialize.
 * @see {DOpusOnInit}
 * @see {DOpusScriptInitData}
 */
interface DOpusScriptCommand {

	/**
	 * Use this to set a description for the command, that is displayed in the Customize dialog when the user selects the command from the Commands tab.
	 */
	desc: string;

	/**
	 * Set to True to hide this command from the drop-down command list shown in the command editor. This lets you add commands that can still be used in buttons and hotkeys but won't clutter up the command list.
	 */
	hide: boolean;

	/**
	 * Use this property to assign a default icon to this command. You can specify the name of an internal icon (if you want to specify an icon from a particular set, use setname:iconname - use this if you have bundled your script in a script package with its own icon set) or the path of an external icon or image file.
	 */
	icon: string;

	/**
	 * Use this to set a label for the command. This is displayed in the Commands tab of the Customize dialog (under the Script Commands category), and will form the default label of the button created if the user drags that command out to a toolbar.
	 *
	 * The actual name of the command (used to invoke the command) is assigned through the name property.
	 */
	label: string;

	/** This is the name of the method that Opus will call in your script when the command is invoked. This would typically be set to On*XXXXX* where *XXXXX* is the name of the command, however any method name can be used.
	 *
	 * When the method is invoked it is passed a single argument, a ScriptCommandData object. Generically this method is referred to as OnScriptCommand. */
	method: string;

	/**
	 * This is the name of the command. This determines the name that will invoke the command when it is used in buttons and hotkeys.
	 */
	name: string;

	/**
	 * This lets you specify an optional command line template for the command. This is a string in the form **ARGNAME1/MOD,ARGNAME2/MOD,ARGNAME3/MOD,** etc, where ARGNAME is the name of the argument and /MOD are one or more modifiers used to indicate the argument type. The command line template can specify as many arguments as needed.
	 *
	 * When your command is invoked and its OnScriptCommand event is triggered, any arguments supplied on the command line are parsed according to this template and provided via the ScriptCommandData.func.args property.
	 */
	template: string;

}

/**
 * The ScriptCommandData object is passed to the script-defined entry points for any internal commands added by a script add-in . The method name for these events is defined by the script itself, but generically it's referred to as OnScriptCommand .
 * @see {DOpusOnScriptCommand}
 */
interface DOpusScriptCommandData {

	/**
	 * This returns the original command line that invoked the command. If any arguments were provided on the command line they are available in parsed form from the func.args property.
	 */
	readonly cmdline: string;

	/**
	 * Returns a Func object relating to this function. This provides access to information about the function's environment (source and destination tabs, etc) as well as any variables and parsed command line arguments.
	 */
	readonly func: DOpusFunc;

}

/**
 * The ScriptConfig object is accessed via the ScriptInitData .config and the Script .config properties. The ScriptInitData .config property allows a script (in its OnInit method) to specify what configuration properties it supports, and provide default values for them. The properties assigned in OnInit will then be available in Preferences for the user to edit, and the user-edited configuration can then be accessed by other script methods using Script .config .
 * @see {DOpusScriptInitData}
 * @see {DOpusScript}
 * @see {DOpusOnInit}
 */
interface DOpusScriptConfig {

	[key: string]: any;

	/**
	 * The properties of the ScriptConfig object are entirely determined by the script itself.
	 *
	 * In the OnInit method, assign the default values of any configuration properties you want to this object. The type of each default value controls the type of the property.
	 *
	 * The Preferences page only supports editing certain types of variables, so you must only assign properties of compatible types. Preferences supports:
	 *
	 * * **Boolean options (True or False)** - the variable type must be bool
	 * * **Numeric options** - the variable type must be int
	 * * **String options** - the variable type must be string
	 * * **Multi-line string options** - the variable type must be string and must contain at least one CR/LF pair. Note that a trailing CR/LF will be removed from the default value.
	 * * **Multiple string options** - the variable type must be a Vector of strings
	 * * **Drop-down list** - the variable type must be a Vector with an int as the first element (to specify the default selection), and strings for the remaining elements.
	 * */
	readonly any: any;

}

/**
 * The ScriptInitData object is passed to the OnInit event in a script add-in . The script should initialize the various properties to identify itself, and can optionally add internal commands using the AddCommand method, and custom columns using the AddColumn method, before returning.
 * @see {DOpusOnInit}
 */
interface DOpusScriptInitData {

	/**
	 * Returns a ScriptConfig object, that the script can use to initialize its default configuration. Properties added to the object in this method will be displayed to the user in Preferences, allowing them to change their value and thus configure the behavior of the script.
	 */
	config: DOpusScriptConfig;

	/**
	 * This lets you assign descriptions for your script's configuration options that are shown to the user in the editor dialog. To do this, set this property to a Map created via the DOpusFactory.Map method, filled with name/description string pairs.
	 */
	config_desc: DOpusMap;

	/**
	 * This lets you organize your script's configuration options into groups when shown to the user in the editor dialog. The group names are arbitrary - configuration options with the same group name will appear grouped together. Set this property to a Map created via the DOpusFactory.Map method, filled with name/group string pairs.
	 */
	config_groups: DOpusMap;

	/**
	 * Lets the script specify a copyright message that is displayed to the user in Preferences.
	 */
	copyright: string;

	/**
	 * Set this to True if the script should be enabled by default, or False if it should be disabled by default. The user can enable or disable scripts using Preferences - this simply controls the default state.
	 */
	default_enable: boolean;

	/**
	 * Lets the script specify a description message that is displayed to the user in Preferences.
	 */
	desc: string;

	/**
	 * Set this to True if your script implements the OnDoubleClick event and (for performance reasons) you want to be called with only a path to the double-clicked item rather than a full Item object. See the OnDoubleClick event documentation for more details.
	 */
	early_dblclk: boolean;

	/**
	 * Returns the path and filename of this script.
	 */
	readonly file: string;

	/**
	 * Lets you specify an arbitrary group for this script. If scripts specify a group they will be displayed in that group in the list in Preferences.
	 */
	group: string;

	/**
	 * Lets the script specify a string that will be prepended to any log output it performs. If not set the name of the script is used by default.
	 */
	log_prefix: string;

	/**
	 * Specifies the minimum Opus version required. If the current version is less than the specified version the script will be disabled. You can specify the major version only (e.g. "11"), a major and minor version (e.g. "11.3") or a specific beta version (e.g. "11.3.1" for 11.3 Beta 1).
	 */
	min_version: string;

	/**
	 * Lets the script specify a display name for the script that is shown in Preferences.
	 */
	name: string;

	/**
	 * The OnInit method is called in two different circumstances - once during Opus startup, and again if the script is installed or edited when Opus is already running. This property will return True if the OnInit method is being called during Opus startup, or False for any other time.
	 */
	readonly startup: boolean;

	/**
	 * Lets you provide a URL where the user can go to find out more about your script (it's displayed to the user in Preferences).
	 */
	url: string;

	/**
	 * Returns a Vars collection of user and script-defined variables that are local to this script. These variables are available to other methods in the script via the Script.vars property.
	 */
	readonly vars: DOpusVars;

	/**
	 * Lets the script specify a version number string that is displayed to the user in Preferences.
	 */
	version: string;

	/**
	 * Adds a new information column to Opus. The returned ScriptColumn object must be properly initialized. A script add-in can add as many columns as it likes, and these will be available in file displays, infotips and the Advanced Find function.
	 *
	 * Instead of adding columns in OnInit, your script can implement the OnAddColumns method. This is more flexible as it allows you to access your script's configuration at the time you add columns, and columns can be dynamically added and removed while Opus is running. If OnAddColumns is implemented then this method is unavailable in OnInit.
	 */
	addColumn(): DOpusScriptColumn;

	/**
	 * Adds a new internal command to Opus. The returned ScriptCommand object must be properly initialized. A script add-in can add as many internal commands as it likes to the Opus internal command set.
	 *
	 * Instead of adding commands in OnInit, your script can implement the OnAddCommands method. This is more flexible as it allows you to access your script's configuration at the time you add commands, and commands can be dynamically added and removed while Opus is running. If OnAddCommands is implemented then this method is unavailable in OnInit.
	 */
	addCommand(): DOpusScriptCommand;

}
declare var ScriptInitData: DOpusScriptInitData;

/**
 * The ScriptStrings object is returned by the DOpus .strings property. It lets you access any strings defined via string resources .
 * @see {DOpusConstructor}
 */
interface DOpusScriptStrings {

	/**
	 * Returns a Vector of strings representing the languages that strings have been defined for.
	 */
	readonly langs: DOpusVector<string>;

	/**
	 * Returns the text of a string specified by name. The name must match the name used in the string resources.
	 *
	 * Optionally you can provide a language name as the second parameter, to retrieve a string from a particular language. Otherwise, the string is returned in the current language.
	 */
	get(name?: string, language?: string): string;

	/**
	 * Returns True if strings in the specified language are defined in the resources.
	 */
	hasLanguage(language?: string): boolean;

}

/**
 * The ShellProperty object represents a shell property - an item of metadata for a file or folder that comes from Windows or third-party extensions (as opposed to metadata from Opus's native metadata system).
 *
 * The FSUtil.GetShellPropertyList method lets you retrieve a list of available shell properties. You can then use FSUtil.GetShellProperty or Item.ShellProp to retrieve the value of a property for a particular file.
 */
interface DOpusShellProperty {

	/**
	 * The default width in pixels a column displaying this property should use.
	 */
	readonly defWidth: number;

	/**
	 * The display name of this property (the name that should be shown to users).
	 */
	readonly display_name: string;

	/**
	 * The default column justification for this property (left, right, center).
	 */
	readonly justify: string;

	/**
	 * The PKEY (property key) for this property. This is a property's unique ID and the canonical way to refer to a property. You can use the raw_name and display_name values to access properties as well, but they are potentially inaccurate (since it's possible to have two properties with the same name) and also slower as the property has to be looked up by name each time.
	 */
	readonly pkey: string;

	/**
	 * An internal name used by the property provider.
	 */
	readonly raw_name: string;

	/**
	 * The type of data this property returns; string, number, datetime are the only supported types currently.
	 */
	readonly type: string;

}

/**
 * If a script add-in implements the OnShutdown event, the method receives a ShutdownData object when invoked on Opus shutdown.
 * @see {DOpusOnShutdown}
 */
interface DOpusShutdownData {

	/**
	 * Returns True if the Windows session is ending (that is, if Opus is shutting down because the system is shutting down), or False if it's just Opus that is quitting.
	 */
	readonly endSession: boolean;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

}

/**
 * A SmartFavorite object represents an entry for a folder in the SmartFavorites table. It is retrieved by enumerating or indexing the SmartFavorites object.
 * @see {DOpusSmartFavorites}
 */
interface DOpusSmartFavorite {

	/**
	 * Returns the path this entry represents, as a Path object.
	 */
	readonly path: DOpusPath;

	/**
	 * Returns the number of points this entry has as a source folder. The point score is used by Opus to determine which folders to display.
	 */
	readonly points: number;

	/**
	 * Returns the number of points this entry has as a destination folder.
	 */
	readonly destPoints: number;

}

/**
 * The SmartFavorites object lets you query the contents of the SmartFavorites table. It is retrieved from the DOpus .smartfavorites property.
 * @see {DOpusConstructor}
 *
 * @returns {DOpusSmartFavorite} You can enumerate the SmartFavorites object to retrieve individual SmartFavorite objects.
 */
interface DOpusSmartFavorites extends DOpusSmartFavorite {

	/**
	 * Returns the number of points an entry must have before it would be displayed in the SmartFavorites list.
	 */
	readonly threshhold: number;

	/**
	 * Returns the maximum number of entries that would be displayed in the SmartFavorites list.
	 */
	readonly max: number;

}

/**
 * The SortOrder object is returned by the Format .manual_sort_order property if manual sort mode is active. It lets you query and modify the sort order.
 * @see {DOpusFormat}
 */
interface DOpusSortOrder {

	/**
	 * Returns a Vector of strings representing the current sort order of files in the folder. If multiple manual sort orders have been defined, you can provide the name of a specific sort order as an argument to this method. If called with no arguments it returns the current sort order by default.
	 */
	getOrder(name?: string): DOpusVector<string>;

	/**
	 * You can pass this method a Vector of strings to change the sort order of the current folder. You can optionally provide the name of a sort order as the second parameter if you’ve got more than one sort order defined.
	 */
	setOrder(order?: DOpusVector<any>, name?: string): void;

	/**
	 * Resets the manual sort order to the currently selected sort order (e.g. if the file display header indicates that it is sorted by name, ResetOrder would reset to filename order). You can optionally provide the name of a sort order as the second parameter if you’ve got more than one sort order defined.
	 */
	resetOrder(name?: string): void;

}

/**
 * If a script add-in implements the OnSourceDestChange event, the method receives a SourceDestData object to indicate which tab's state changed.
 * @see {DOpusOnSourceDestChange}
 */
interface DOpusSourceDestData {

	/**
	 * Returns True if the tab is now the destination.
	 */
	readonly dest: boolean;

	/**
	 * Returns True if the tab is now the source. If both source and dest return False it indicates that the tab is now "off".
	 */
	readonly source: boolean;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

	/**
	 * Returns a Tab object representing the tab.
	 */
	readonly tab: DOpusTab;

}

/**
 * If a script add-in implements the OnStartup event, the method receives a StartupData object when Opus starts up.
 *
 * This object currently has no defined methods or properties.
 *
 * @see {DOpusOnStartup}
 */
interface DOpusStartupData {

}

/**
 * The StringSet object is container that stores one or more unique strings. It is similar to an array or vector (e.g. Vector ) but has the advantage of using a dictionary system to locate strings rather than numeric indexes. You can therefore lookup strings much more quickly than by linearly searching a Vector .
 *
 * You can create a new StringSet using the DOpusFactory object. A StringSet can be either case-sensitive ("cat" and "CAT" would be treated as two different strings) or case-insensitive.
 *
 * @see {DOpusVector}
 */
interface DOpusStringSet {

	/**
	 * Returns the number of elements the StringSet currently holds.
	 */
	readonly count: number;

	/**
	 * Returns True if the StringSet is empty, False if not.
	 */
	readonly empty: boolean;

	/**
	 * A synonym for count.
	 */
	readonly length: number;

	/**
	 * A synonym for count.
	 */
	readonly size: number;

	/**
	 * Copies the contents of another StringSet to this one. You can also pass an array of strings or Vector object.
	 */
	assign(from?: DOpusStringSet): void;

	/**
	 * Clears the contents of the StringSet.
	 */
	clear(): void;

	/**
	 * Erases the string if it exists in the set.
	 */
	erase(): void;

	/**
	 * Returns True if the specified string exists in the set.
	 */
	exists(): boolean;

	/**
	 * Inserts the string into the set if it doesn't already exist. Returns True if successful.
	 */
	insert(): boolean;

	/**
	 * Merges the contents of another StringSet with this one.
	 */
	merge(from?: DOpusStringSet): void;

}


/**
 * A StringTools object provides several utility methods for encoding and decoding strings. For example, you can use a StringTools object to Base64-encode a chunk of data, or decode a UTF-8 encoded message header.
 *
 * You can obtain a StringTools object using the DOpusFactory.StringTools method.
 */
interface DOpusStringTools {

	/**
	 * Decodes an encoded string or data.
	 *
	 * You can provide either a Blob object or a string as the source to decode. Depending on the value of the format argument, either a string or a Blob is returned.
	 *
	 * If format is specified as **"base64"** the source will be Base64-decoded, and a Blob is returned.
	 *
	 * If format is specified as **"quoted"** the source will be Quoted-printable-decoded, and a Blob is returned.
	 *
	 * If format is specified as **"auto"** or not supplied, special handling is invoked to decode a MIME-encoded email subject (e.g. one beginning with =?), and a string is returned. If **"auto"** is specified it will also detect UTF-8 or UTF-16 encoded data if it has a BOM at the beginning.
	 *
	 * If format is specified as **"utf-8"** the source will be converted from UTF-8 to a native string. Alternatively, if format is **"utf-16"** or **"utf-16-le"**, the source will be converted from UTF-16 Little Endian to a native string. Or, if format is **"utf-16-be"**, the source will be converted from UTF-16 Big Endian to a native string.
	 *
	 * If decoding UTF-8 or UTF-16 (via **"auto"** or **"utf-8"**, etc.), any byte-order-mark (BOM) will be skipped if one exists at the beginning of the input data.
	 *
	 * Otherwise, format must be set to a valid code-page name (e.g. **"gb2312"**, **"utf-8"**), or a Windows code-page ID (e.g. **"936"**, **"65001"**). The source will be decoded using the specified code-page and a string is returned.
	 */
	decode(source?: DOpusBlob | string, format?: string): string | DOpusBlob;

	/**
	 * Encodes a string or data.
	 *
	 * You can provide either a Blob object or a string as the source to decode. Depending on the value of the format argument, either a string or a Blob is returned.
	 *
	 * If format is specified as **"base64"** the source will be Base64-encoded, and a string is returned.
	 *
	 * If format is specified as **"quoted"** the source will be Quoted-printable-encoded, and a string is returned.
	 *
	 * If format is specified as **"utf-8 bom"**, the output data is encoded as UTF-8 with a byte-order-mark (BOM) at the start. Use **"utf-8"** if you want UTF-8 without the BOM.
	 *
	 * If format is specified as **"utf-16 bom"** or **"utf-16-le bom"**, the output data is encoded as UTF-16 Little Endian with a byte-order-mark (BOM) at the start. Use **"utf-16"** or **"utf-16-le"** if you do not want the BOM.
	 *
	 * If format is specified as **"utf-16-be bom"**, the output data is encoded as UTF-16 Big Endian with a byte-order-mark (BOM) at the start. Use **"utf-16-be"** if you do not want the BOM.
	 *
	 * Otherwise, format must be set to a valid code-page name (e.g. **"gb2312"**, **"utf-8"** etc.), or a Windows code-page ID (e.g. **"936"**, **"65001"**). The source will be encoded using the specified code-page and a Blob is returned.
	 */
	encode(source?: DOpusBlob | string, format?: string): string | DOpusBlob;

	/**
	 * Tests the input string to see if it only contains characters that can be represented in ASCII.
	 *
	 * If the result is false, the string is not safe to save into a text file unless you use a Unicode format such as UTF-8.
	 *
	 * This check is not affected by locales or codepages. Instead, it tests whether the string consists of only 7-bit ASCII characters, such that no characters will be lost of * modified if you save the string to a text file and then load it back on any other computer.
	 *
	 */
	isASCII(input?: string): boolean;

}

/**
 * If a script add-in implements the OnStyleSelected event, the method receives a StyleSelectedData object when the user chooses a new Lister style .
 * @see {DOpusOnStyleSelected}
 */
interface DOpusStyleSelectedData {

	/**
	 * Returns a Lister object representing the Lister that changing style.
	 */
	readonly lister: DOpusLister;

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

	/**
	 * Returns the name of the newly selected style.
	 */
	readonly style: string;

}

/**
 * The SysInfo object is created by the DOpusFactory .SysInfo method. It lets scripts access miscellaneous system information that may not be otherwise easy to obtain from a script.
 * @see {DOpusFactory}
 */
interface DOpusSysInfo {

	/**
	 * Allows you to test if a named process is currently running, and returns the process's ID if so. If the process isn't running 0 is returned. You can use wildcards or (by prefixing the pattern with regex:) regular expressions.
	 */
	findProcess(string): number;

	/**
	 * If called with no arguments, returns a Vector of Rect objects which provide information about the positions and sizes of the display monitors in the system.
	 *
	 * If called with an index argument, returns a single Rect with the information for just a particular monitor.
	 *
	 * The WorkAreas method, documented below, is sometimes what you should use instead of this.
	 */
	monitors(index?: number): DOpusVector<DOpusRect> | DOpusRect;

	/**
	 * Returns the index of the monitor the mouse pointer is currently positioned on.
	 * */
	mouseMonitor(): number;

	/**
	 * Returns the current x-coordinate of the mouse pointer.
	 */
	mousePosX(): number;

	/**
	 * Returns the current y-coordinate of the mouse pointer.
	 */
	mousePosY(): number;

	/**
	 * Returns a Rect giving the size of the invisible border around windows.
	 *
	 * On Windows 10, the top border is typically zero and the others are usually several pixels thick. The thickness varies by OS version, system DPI, and other factors; you should not store it to disk as it may not be correct for the system that loads it.
	 *
	 * On some operating systems (e.g. Windows 10), windows may be larger than they appear: Beyond the visible edge is a border that is part of the window but invisible. This border exists for legacy compatibility, allowing window frames to appear thin while providing something thick enough to resize with the mouse.
	 *
	 * You can usually ignore the border but it is important when positioning windows next to each other, or to screen edges, where ignoring it results in gaps between windows.
	 *
	 * The Rect returned by this method is unusual: The **left**, **right**, **top** and **bottom** properties do not represent the coordinates of a rectangle but rather the width of borders (if any) on each side of a window. As a consequence, the **width** and **height** properties of the Rect are meaningless.
	 *
	 * On Windows 10, the top border is typically zero and the others are usually several pixels thick. The thickness varies by OS version, system DPI, and other factors; you should not store it to disk as it may not be correct for the system that loads it.
	 *
	 * This property is relatively expensive to calculate. You should not, for example, call the method once for each side; instead, call it once and store the Rect in a variable, then query that for each side.
	 */
	shadowBorder(): DOpusRect;

	/**
	 * Similar to the Monitors method, documented above, except it returns the work area of each monitor rather than the full monitor area.
	 *
	 * A monitor's work area is the monitor's rectangle minus the Windows Taskbar and any other app bars (which can include docked toolbars created by Opus, or similar things added by other software). If a monitor does not have a Taskbar or other app bar docked to it, its work area will be the same as its full rectangle.
	 */
	workAreas(index?: number): DOpusVector<DOpusRect> | DOpusRect;

}

/**
 * The Tab object represents a folder tab in a Lister (even if the tab control isn't currently displayed, a Lister always has at least one open tab). You can obtain a collection of Tab objects from a Lister object. Tab objects are also used with the Command and Func objects, and if a command results in new tabs being opened, the Results object.
 * @see {DOpusLister}
 * @see {DOpusCommand}
 * @see {DOpusFunc}
 * @see {DOpusResults}
 */
interface DOpusTab {

	/**
	 * Returns a collection of Item objects that represents all the files and folders currently displayed in this tab.
	 *
	 * Note: The first time a script accesses this property (and all the other properties that return an Item collection), a snapshot is taken of all the appropriate items. If the script then makes changes to those items (e.g. by creating a new file, modifying the selection, etc), these changes will not be reflected by the collection. To re-synchronize the collection call the Update method on the collection.
	 */
	readonly all: DOpusItem;

	/**
	 * Returns a collection of Path objects that represents the paths in the "backward" history list for this tab (i.e. the folders you would get to by clicking the Back button).
	 */
	readonly backlist: DOpusPath;

	/**
	 * Returns the tab's assigned color (if one has been assigned via, for example, the Go TABCOLOR command). The color is returned as a string in R,G,B format.
	 */
	readonly color: string;

	/**
	 * Returns the current path from the tab's breadcrumb control (if it has one), including any ghost path.
	 */
	readonly crumbpath: DOpusPath;

	/**
	 * Returns a collection of Item objects that represents all the folders currently displayed in this tab.
	 */
	readonly dirs: DOpusItem;

	/**
	 * Returns True if the tab is marked as dirty, indicating its list of contents may be out of date. This can happen if the tab is in the background and the user has turned off the Preferences / Folder Tabs / Options / Process file changes in background tabs option.
	 */
	readonly dirty: boolean;

	/**
	 * Returns the currently displayed label of this tab.
	 */
	readonly displayed_label: string;

	/**
	 * Returns a collection of FileGroup objects that represents all the file groups in the tab (when the tab is grouped). You can use the format.group_by property to test if the tab is grouped or not.
	 */
	readonly filegroups: DOpusFileGroup;

	/**
	 * Returns a collection of Item objects that represents all the files currently displayed in this tab.
	 */
	readonly files: DOpusItem;

	/**
	 * Returns a Format object representing the current folder format in this tab.
	 */
	readonly format: DOpusFormat;

	/**
	 * Returns a collection of Path objects that represents the paths in the "forward" history list for this tab (i.e. the folders you would get to by clicking the Forward button).
	 */
	readonly forwardlist: DOpusPath;

	/**
	 * Returns a collection of Item objects that represents all the files and folders currently hidden from this tab.
	 */
	readonly hidden: DOpusItem;

	/**
	 * Returns a collection of Item objects that represents all the folders currently hidden from this tab.
	 */
	readonly hidden_dirs: DOpusItem;

	/**
	 * Returns a collection of Item objects that represents all the files currently hidden from this tab
	 */
	readonly hidden_files: DOpusItem;

	/**
	 * Returns the current assigned tab label. Note that this may be an empty string if no custom label has been assigned. The displayed_label property returns the currently displayed label in all cases.
	 */
	readonly label: string;

	/**
	 * If this tab is linked to another tab, returns a Tab object representing the linked tab. If this tab is not linked this property returns 0.
	 */
	readonly linktab: DOpusTab;

	/**
	 * Returns a Lister object representing the parent Lister that owns this tab.
	 */
	readonly lister: DOpusLister;

	/**
	 * Returns the current lock state of the tab; one of "off", "on", "changes", "reuse".
	 */
	readonly lock: string;

	/**
	 * Returns True if this tab is linked in Navigation Lock mode. This property does not exist if the tab is not linked, so make sure you check the value of linktab first.
	 */
	readonly navlock: boolean;

	/**
	 * Returns the current path shown in this tab.
	 */
	readonly path: DOpusPath;

	/**
	 * Returns a QuickFilter object providing information about the state of the quick filter in this tab.
	 */
	readonly quickfilter: DOpusQuickFilter;

	/**
	 * Returns True if this tab is currently on the right or bottom side of a dual-display Lister, and False otherwise.
	 */
	readonly right: boolean;

	/**
	 * Returns a collection of Item objects that represents all the selected files and folders currently displayed in this tab. Note that if checkbox mode is turned on in the tab, this will be a collection of checked items rather than selected.
	 */
	readonly selected: DOpusItem;

	/**
	 * Returns a collection of Item objects that represents all the selected folders currently displayed in this tab.
	 */
	readonly selected_dirs: DOpusItem;

	/**
	 * Returns a collection of Item objects that represents all the selected files currently displayed in this tab
	 */
	readonly selected_files: DOpusItem;

	/**
	 * Returns a TabStats object that provides various information about the tab, including the number of files, number of selected files, total size of selected files, etc. The "selected" counts provided by this object take checkbox mode into account (that is, if checkbox mode is currently turned on, the counts will be for checked files rather than for selected files).
	 */
	readonly selstats: DOpusTabStats;

	/**
	 * Returns True if this tab is currently the source, and False otherwise.
	 */
	readonly source: boolean;

	/**
	 * Returns a TabStats object that provides various information about the tab, including the number of files, number of selected files, total size of selected files, etc. Unlike selstats, this object does not take checkbox mode into account (so the "selected" counts will refer to selected rather than checked files).
	 */
	readonly stats: DOpusTabStats;

	/**
	 * This Vars object represents all defined variables with tab scope (that are scoped to this tab).
	 */
	readonly vars: DOpusVars;

	/**
	 * Returns True if this tab is currently visible (i.e. it is the active tab in either file display), and False otherwise.
	 */
	readonly visible: boolean;

	/**
	 * Creates a new Dialog object, that lets you display dialogs and popup menus. The dialog's window property will be automatically assigned to this tab.
	 */
	dlg(): DOpusDialog;

	/**
	 * Returns an Item object representing the file or folder which has focus in the tab.
	 *
	 * The focus item is typically indicated by an outline around its name, and is usually the last item which was clicked on, or the last item which was moved to with the keyboard. The focus item is often also selected, but not always; focus and selection are two different things.
	 *
	 * If no focus item exists, or if the focus item is a special file or folder, such as This PC, which cannot be represented by an Item object, then this method does not return an object. (In JScript, test if the result == null and in VBScript test if the result is nothing.)
	 */
	getFocusItem(): DOpusItem;

	/**
	 * When a script accesses particular properties of a Tab object, a snapshot is taken of the tab's state. For example, if you ask for the selected_files property, the list of selected files is calculated and then stored in memory. This can speed things up, and also means you don't have to worry about the list changing under you as you work through it. If the script then makes changes to the tab (e.g. it selects files, creates a new folder, etc.), these changes will not be reflected by the cached snapshot(s) if you access the same properties on the same tab object again. To clear the cached snapshots and re-synchronize the object with the tab's current state, call the Tab.Update method.
	 */
	update(): void;

}

declare var Tab: DOpusTab;

/**
 * If a script add-in implements the OnTabClick event, the method receives a TabClickData object when a tab is clicked with a qualifier key held down.
 * @see {DOpusOnTabClick}
 */
interface DOpusTabClickData {

	/**
	 * Returns a string indicating any qualifier keys that were held down by the user when the event was triggered.
	 *
	 * The string can contain any or all of the following: *shift ctrl, alt, lwin, rwin*
	 *
	 * If no qualifiers were down, the string will be: *none*
	 */
	readonly qualifiers: string;

	/**
	 * Returns a Tab object representing the tab that was clicked.
	 */
	readonly tab: DOpusTab;

}

/**
 * The TabGroup object represents a folder tab group or a folder into which other tab groups can be organized. Individual TabGroup objects can be accessed or enumerated from the TabGroups object.
 * @see {DOpusTabGroups}
 */
interface DOpusTabGroup {

	/**
	 * True if the Close existing folder tabs when opening this group option is turned on for this group. Only present when the folder property is False.
	 */
	readonly closeExisting: boolean;

	/**
	 * The description of this tab group, if any. Only present when the folder property is False.
	 */
	readonly desc: string;

	/**
	 * True if the Define tabs on specific sides of a dual-display Lister option is turned on for this group. Only present when the folder property is False.
	 */
	readonly dual: boolean;

	/**
	 * True if this object represents a folder within the tab group list, False if it's an actual tab group.
	 */
	readonly folder: boolean;

	/**
	 * True if this tab group or folder should be hidden from menus which list tab groups. The group will still always be visible in Preferences.
	 */
	readonly hidden: boolean;

	/**
	 * Returns a TabGroupTabList object representing the tabs in this group that open in the left/top side of a dual-display Lister. Only present when the folder property is False and the dual property is True.
	 */
	readonly leftTabs: DOpusTabGroupTabList;

	/**
	 * The name of this group or folder.
	 */
	readonly name: string;

	/**
	 * Returns a TabGroupTabList object representing the tabs in this group that open in the right/bottom side of a dual-display Lister. Only present when the folder property is False and the dual property is True.
	 */
	readonly rightTabs: DOpusTabGroupTabList;

	/**
	 * Returns a TabGroupTabList object representing the tabs in this group. Only present when both the folder and dual properties are False.
	 */
	readonly tabs: DOpusTabGroupTabList;

	/**
	 * Adds a new sub-folder to this tab group folder. Only available when the folder property is True. You can either provide a TabGroup object (which itself has the folder property set to True) or the name for the new folder. If the operation succeeds a TabGroup object is returned which represents the new folder. If the operation fails False is returned.
	 */
	addChildFolder(TabGroup?: object, name?: string): DOpusTabGroup;

	/**
	 * Adds a new tab group to this tab group folder. Only available when the folder property is True. You can either provide a TabGroup object or the name for the new group. If the operation succeeds a TabGroup object is returned which represents the new tab group. If the operation fails False is returned.
	 */
	addChildGroup(TabGroup?: object, name?: string): DOpusTabGroup;

	/**
	 * Deletes the child item (folder or tab group).
	 */
	deleteChild(TabGroup?: object): void;

	/**
	 * Returns a duplicate of this tab group or folder. When it's returned the duplicate has not yet been added to a tab list.
	 */
	duplicate(): DOpusTabGroup;

	/**
	 * In a tab group that has specific left and right tabs specified, this method links together a tab from the left side and a tab from the right side. Only available if the dual property is set to True. You can provide TabGroupTabEntry objects or the index numbers of the tabs you want to link.
	 *
	 * The optional type parameter can be set to "slave" to specify that the tabs should be slaved to each other.
	 */
	link(obj1?: DOpusTabGroupTabEntry, obj2?: DOpusTabGroupTabEntry, type?: string): void;

	/**
	 * Unlinks the specified tab from its partner. Only available if the dual property is set to True.
	 */
	unlink(TabGroupTabEntry?: object): void;

}

/**
 * The TabGroups object lets your script query and modify the configured Folder Tab Groups . You can obtain a TabGroups object from the DOpus .TabGroups property.
 *
 * The TabGroups object is a collection of TabGroup objects; you can enumerate it to discover the top-level tab groups and folders. Folders can also be enumerated to discover the tab groups and folders they contain, and so on.
 *
 * @see {DOpusConstructor}
 */
interface DOpusTabGroups {

	/**
	 * Adds a new folder to the list of tab groups. You can either provide a TabGroup object (which has the folder property set to True) or the name for the new folder. If the operation succeeds a TabGroup object is returned which represents the new folder. If the operation fails False is returned.
	 */
	addChildFolder(TabGroup?: object, name?: string): DOpusTabGroup;

	/**
	 * Adds a new tab group to the list of tab groups. You can either provide a TabGroup object or the name for the new group. If the operation succeeds a TabGroup object is returned which represents the new tab group. If the operation fails False is returned.
	 */
	addChildGroup(TabGroup?: object, name?: string): DOpusTabGroup;

	/**
	 * Deletes the child item (folder or tab group).
	 */
	deleteChild(TabGroup?: object): void;

	/**
	 * Saves the tab group list and any changes you have made.
	 *
	 * Note that this only saves changes made to the object it is called on, and each use of DOpus.TabGroups creates a new, independent object. Therefore, you should modify tab groups like this (JScript):
	 * ```javascript
	 * var tabGroups = DOpus.TabGroups;
	 * var group = tabGroups.AddChildGroup("New Tab Group");
	 * if (!group)
	 * 	DOpus.Output("Group already exists");
	 * else {
	 * 	group.desc = "Example description";
	 * 	var tabs = group.tabs;
	 * 	tabs.AddTab("C:\\");
	 * 	tabGroups.Save();
	 * }
	 * ```
	 *
	 * And **not** like this:
	 * ```javascript
	 * // This will not work correctly.
	 * var group = DOpus.TabGroups.AddChildGroup("New Tab Group");
	 * if (!group)
	 * 	DOpus.Output("Group already exists");
	 * else {
	 * 	group.desc = "Example description";
	 * 	group.tabs.AddTab("C:\\");
	 * 	DOpus.TabGroups.Save();
	 * }
	 * ```
	 * The second example will not work because the last line creates a second, unrelated snapshot of the current state, which is unaffected by the unsaved changes to the first snapshot, and then saves the second snapshot without making any changes to it.
	 */
	save(): void;

	/**
	 * Updates the TabGroups object to reflect any changes made through the Preferences user interface.
	 */
	update(): void;

}

/**
 * The TabGroupTabEntry object represents a single folder tab . The folder tabs in a tab group can be enumerated via the TabGroupTabList object.
 * @see {DOpusTabGroupTabList}
 */
interface DOpusTabGroupTabEntry {

	/**
	 * Returns the color, if any, assigned to this tab.
	 */
	readonly color: string;

	/**
	 * Returns the folder format of this tab.
	 */
	readonly format: DOpusFormat;

	/**
	 * Returns the link ID of this tab, if it is linked to another tab. Both tabs will have the same link ID but otherwise the value is meaningless. Use the TabGroup.Link and Unlink methods to change tab linkage.
	 */
	readonly linkId: number;

	/**
	 * If this tab is linked as a slave, returns the string **"slave"**.
	 */
	readonly linkType: string;

	/**
	 * Returns the lock type of this tab. Valid values are **"on"**, **"off"**, **"changes"** and **"reuse"**.
	 */
	readonly locked: string;

	/**
	 * Returns the name of this tab if one is assigned. Tabs that don't have specific names assigned will usually show the last component of the path as their name.
	 */
	readonly name: string;

	/**
	 * Returns the path that this tab will load when it's opened.
	 */
	readonly path: DOpusPath;

	/**
	 * Returns a duplicate of this tab entry.
	 */
	duplicate(): DOpusTabGroupTabEntry;

}

/**
 * The TabGroupTabList object represents a list of folders that will open as file display tabs when the parent tab group is opened. You can obtain this object from the tabs , lefttabs and righttabs properties of the TabGroup object.
 *
 * The TabGroupsTabList object is a collection of TabGroupTabEntry objects; you can enumerate it to discover each folder tab.
 *
 * @see {DOpusTabGroup}
 */
interface DOpusTabGroupTabList {

	/**
	 * Returns a TabGroupTabEntry object representing the active (default) folder tab in this tab list.
	 */
	readonly active: DOpusTabGroupTabEntry;

	/**
	 * Adds a folder tab entry to this list. You can provide a TabGroupTabEntry object, or the path and optional name of the new folder tab.
	 */
	addTab(TabGroupTabEntry?: object, path?: string, name?: string): DOpusTabGroupTabEntry;

	/**
	 * Deletes a folder tab entry from this list. You can provide a TabGroupTabEntry object, or the index of the tab entry to delete. If you specify the index as -1 then all tab entries will be deleted.
	 */
	deleteTab(TabGroupTabEntry?: object, index?: number): void;

	/**
	 * Inserts a folder tab entry to this list. You can provide a TabGroupTabEntry object, or the path and optional name of the new folder tab. The final parameter must be the index indicating the desired insertion position.
	 */
	insertTabAt(TabGroupTabEntry?: object, path?: string, name?: string, index?: number): DOpusTabGroupTabEntry;

	/**
	 * Moves the specified tab entry to a new position, and optionally a new tab list. If the second parameter is a TabGroupTabList object then the tab entry will be moved to that list. The final parameter must be the index indicating the desired insertion position.
	 */
	moveTabTo(TabGroupTabEntry?: object, TabGroupTabList?: object, index?: number): void;

}

/**
 * The TabStats object provides various information and statistics about the current folder displayed in a tab. Note that the Tab object provides two versions of this object. Tab.selstats takes Checkbox Mode into account, and in this mode the values of the "checked" and the "selected" properties will be the same. If the object was retrieved via Tab.stats and the file display is in Checkbox Mode, the two sets of properties will be different.
 * @see {DOpusTab}
 */
interface DOpusTabStats {

	/**
	 * Returns the width in pixels of the largest image in the folder.
	 */
	readonly bigimage_h: number;

	/**
	 * Returns the height in pixels of the largest image in the folder.
	 */
	readonly bigimage_w: number;

	/**
	 * Returns the total number of bytes in the folder as a FileSize object.
	 */
	readonly bytes: DOpusFileSize;

	/**
	 * Returns True if the tab is currently in Checkbox Mode.
	 */
	readonly checkbox_mode: boolean;

	/**
	 * Returns the total number of bytes in checked items as a FileSize object.
	 */
	readonly checkedBytes: DOpusFileSize;

	/**
	 * Returns the total number of bytes in checked folders as a FileSize object.
	 */
	readonly checkedDirBytes: DOpusFileSize;

	/**
	 * Returns the total number of checked folders.
	 */
	readonly checkedDirs: number;

	/**
	 * Returns the total number of bytes in checked files as a FileSize object.
	 */
	readonly checkedFileBytes: DOpusFileSize;

	/**
	 * Returns the total number of checked files.
	 */
	readonly checkedFiles: number;

	/**
	 * Returns the total number of checked items.
	 */
	readonly checkedItems: number;

	/**
	 * Returns the total length in seconds of all checked music files.
	 */
	readonly checkedMusicLength: number;

	/**
	 * Returns the total number of bytes in all folders as a FileSize object.
	 */
	readonly dirBytes: DOpusFileSize;

	/**
	 * Returns the total number of folders.
	 */
	readonly dirs: number;

	/**
	 * Returns the total number of bytes in all files as a FileSize object.
	 */
	readonly fileBytes: DOpusFileSize;

	/**
	 * Returns the latest (most recent) file date in the folder.
	 */
	readonly fileDate_max: Date;

	/**
	 * Returns the earliest (oldest) file date in the folder.
	 */
	readonly fileDate_min: Date;

	/**
	 * Returns the total number of files.
	 */
	readonly files: number;

	/**
	 * Returns the total number of items.
	 */
	readonly items: number;

	/**
	 * Returns the size of the largest file in the folder as a FileSize object.
	 */
	readonly largestFile: DOpusFileSize;

	/**
	 * Returns the total length in seconds of all music files.
	 */
	readonly musicLength: number;

	/**
	 * Returns the total number of bytes in all selected items as a FileSize object.
	 */
	readonly selBytes: DOpusFileSize;

	/**
	 * Returns the total number of bytes in all selected folders as a FileSize object.
	 */
	readonly selDirBytes: DOpusFileSize;

	/**
	 * Returns the number of selected folders.
	 */
	readonly selDirs: number;

	/**
	 * Returns the total number of bytes in all selected files as a FileSize object.
	 */
	readonly selFileBytes: DOpusFileSize;

	/**
	 * Returns the number of selected files.
	 */
	readonly selFiles: number;

	/**
	 * Returns the number of selected items.
	 */
	readonly selItems: number;

	/**
	 * Returns the total length in seconds of all selected music files.
	 */
	readonly selMusicLength: number;

	/**
	 * The first time a script accesses a particular TabStats object, a snapshot is taken of the tab state. If the script then makes changes to that tab (e.g. it selects files, creates a new folder, etc), these changes will not be reflected by the object. To re-synchronize the object with the tab, call the TabStats.Update method.
	 */
	update(): void;

}

/**
 * The Toolbar object represents a toolbar. Toolbar objects can represent a specific instance of a toolbar (open in a specific Lister), and can also represent the toolbar itself, on disk, that doesn't have to currently be open at all.
 *
 * * When retrieved from the Toolbars object (which in turn comes from the DOpus .Toolbars method), the object represents a toolbar on disk. You can find out where it is currently in use from its properties.
 * * When retrieved from the Lister .toolbars property, it represents an instance of a toolbar in that particular Lister.
 *
 * @returns {string} Returns the name of the toolbar.
 */
interface DOpusToolbar extends String {

	/**
	 * Returns True if this is a default (factory-provided) toolbar, or False if it was user-created.
	 *
	 * (Old scripts may use "default" instead of "deftoolbar"; this is deprecated because it does not work in JScript where "default" is a reserved keyword.)
	 */
	readonly defToolbar: boolean;

	/**
	 * Returns a collection of Lister objects representing any and all Listers this toolbar is currently open in.
	 */
	readonly listers: DOpusLister;

	/**
	 * Returns a collection of Dock objects representing any currently floating instances of this toolbar.
	 */
	readonly docks: DOpusDock;

	/**
	 * Returns a string indicating the group (position) of a particular instance of this toolbar.
	 *
	 * The returned string will be one of *top, bottom, left, right, center, fdright, fdbottom, tree.*
	 */
	readonly group: string;

	/**
	 * Returns the line number within the toolbar's group that it resides on. For example, the first toolbar at the top of the Lister would have a line of 0.
	 */
	readonly line: number;

	/**
	 * Returns the pixel position from the left/top of the toolbar's line. If there are two or more toolbars with the same line number, the pos value determines the order they appear in.
	 */
	readonly pos: number;

}

/**
 * The Toolbars object lets you enumerate all the defined toolbars in your Directory Opus configuration (whether currently turned on or not). It's retrieved using the DOpus .Toolbars method.
 * @see {DOpusConstructor}
 *
 * @returns {DOpusToolbar} Returns a collection of Toolbar objects that you can enumerate.
 */
interface DOpusToolbars extends DOpusToolbar {

	/**
	 * Returns the name(s) of the currently selected File Display Toolbar(s).
	 *
	 * If the FDB toolbar is disabled, returns the string !static to indicate a static header.
	 *
	 * If there is only one FDB toolbar configured (the usual case), it is returned as a simple string.
	 *
	 * If more than one FDB toolbar is configured, a Vector of strings is returned.
	 *
	 * You can use `DOpus.toolbars.fdb(0)` in both JScript and VBScript if you just want the name of the first toolbar without worrying about whether the number of other toolbars (if any). Otherwise, use `TypeName(...)` in VBScript and `typeof` in JScript to determine the return type.
	 */
	readonly fdb: DOpusVector<string | string>;

	/**
	 * Returns the name of the currently selected Viewer Toolbar.
	 */
	readonly viewer: string;

}

/**
 * The UnorderedSet object is container that stores one or more unique objects. It is similar to a StringSet except it can store variants of any type (rather than just strings), and the contents are not kept sorted (in fact, the order of set members is unspecified). Like a StringSet it uses a dictionary system to locate members rather than numeric indexes. You can therefore lookup members much more quickly than by linearly searching a Vector.
 *
 * You can create a new UnorderedSet using the DOpusFactory object.
 *
 * @see {DOpusVector}
 */
interface DOpusUnorderedSet {

	/**
	 * Returns the number of elements the UnorderedSet currently holds.
	 */
	readonly count: number;

	/**
	 * Returns True if the UnorderedSet is empty, False if not.
	 */
	readonly empty: boolean;

	/**
	 * A synonym for count.
	 */
	readonly length: number;

	/**
	 * A synonym for count.
	 */
	readonly size: number;

	/**
	 * Copies the contents of another UnorderedSet to this one. You can also pass an array or Vector object.
	 */
	assign(from?: DOpusUnorderedSet | any[] | DOpusVector<any>): void;

	/**
	 * Clears the contents of the UnorderedSet.
	 */
	clear(): void;

	/**
	 * Erases the element if it exists in the set.
	 */
	erase(key?: any): void;

	/**
	 * Returns True if the specified element exists in the set.
	 */
	exists(key?: any): boolean;

	/**
	 * Inserts the element into the set if it doesn't already exist. Returns True if successful.
	 */
	insert(key?: any): boolean;

	/**
	 * Merges the contents of another UnorderedSet with this one.
	 */
	merge(from?: DOpusUnorderedSet): void;

}

/**
 * The Var object represents an individual user or script-defined variable. Individual Var objects can be accessed or enumerated from the Vars object.
 * @see {DOpusVars}
 *
 * The default value of the Var object returns the value of the variable itself, with one exception. If the Var object is being accessed as part of an enumeration of the Vars collection, the default value returns the variable name.
 *
 * So for instance,
 * ```vbscript
 * For Each Var in DOpus.Vars
 * 	DOpus.Output("Variable name = " & Var)
 * Next
 * ```
 *
 * Versus:
 *
 * ```vbscript
 * Set Var = DOpus.Vars("myvar")
 * DOpus.Output("Variable value = " & Var)
 * ```
 *
 * @returns {any|string}
 */
interface DOpusVar extends String {

	/**
	 * Returns the name of the variable. You cannot change the name of a variable once it has been assigned - instead, delete the variable from its collection and add a new one.
	 */
	readonly name: string;

	/**
	 * Returns True if the variable is persistent (saved) or False if not. You can set this property to change the persistence state.
	 */
	readonly persist: boolean;

	/**
	 * Returns the value of the variable. You can set this property to change the value of the variable.You can store any type of variable in a Var object, although not all types can be saved to disk. If you want your variable to be persistent you should only use bool, int, string, date, currency or a Vector of those types.
	 */
	readonly value: any;

	/**
	 * Deletes this variable from its parent collection.
	 */
	delete(): void;

}


type DOpusVarWithoutDelete = new() => { [P in Exclude<keyof DOpusVar, 'delete'>] : DOpusVar[P] };
/**
 * The Vars object represents a collection of user and script-defined variables. There are a number of different sets of variables, with differing scopes. Some sets support persistent variables, that are saved and re-loaded from one session to the other.
 */
interface DOpusVars extends DOpusVarWithoutDelete {

	/**
	 * Deletes the named variable from the collection. You can also specify a wildcard pattern to delete multiple variables (or **\*** for all).
	 */
	delete(name: string): void;

	/**
	 * Returns True if the named variable exists in the collection, or False if it doesn't exist.
	 */
	exists(name: string): boolean;

	/**
	 * Returns the value of the named variable. You can use this method as an alternative to indexing the collection.
	 */
	get(name: string): any;

	/**
	 * Sets the named value to the specified value. You can use this method as an alternative to indexing the collection.
	 *
	 * You can store any type of variable in a Vars collection, although not all types can be saved to disk. If you want your variable to be persistent you should only use bool, int, string, date, currency or a Vector of those types.
	 */
	set(name?: string, value?: any): void;
}

/**
 * The Vector object is provided to address some short-comings in ActiveX scripting's array support. Some languages have better support than others for arrays, but the languages aren't consistent and some (like JScript) have incompatible arrays that Opus is unable to access at all. Therefore, any Opus scripting objects that take or return an array-like variable will use (or prefer to use) a Vector rather than an array.
 *
 * A Vector object is mostly able to be used as a straight drop-in replacement for an arrays. They are collections and so can be enumerated, or accessed via index (e.g. **Vector(4)** to access the fifth element). They also have a number of helper methods to make manipulating them easier than arrays often are.
 *
 * Note that in JScript you can access an element using square brackets (just like an array) or parentheses (as if it was a function parameter). In other languages, like VBScript, you can only use parentheses.
 *
 * You can create a new Vector using the DOpusFactory .Vector method.
 */
interface DOpusVector<T> {

	/**
	 * Return the element with given index
	 */
	 [index: number]: T;

	/**
	 * Returns the capacity of the Vector (the number of elements it can hold without having to reallocate memory). This is not the same as the number of elements it currently holds, which can be 0 even if the capacity is something larger.
	 */
	readonly capacity: number;

	/**
	 * Returns the number of elements the Vector currently holds.
	 */
	readonly count: number;

	/**
	 * Returns True if the Vector is empty, False if not.
	 */
	readonly empty: boolean;

	/**
	 * A synonym for count.
	 */
	readonly length: number;

	/**
	 * A synonym for count.
	 */
	readonly size: number;

	/**
	 * Copies the values of another Vector to the end of this one, preserving the existing values as well. If start and end are not provided, the entire Vector is appended - otherwise, only the specified elements are appended.
	 *
	 * Instead of a Vector object you can also pass a collection to this method and the contents of the collection will be copied to the end of the Vector.
	 *
	 * In JScript you can pass a standard array to this method to copy the array to the end of a Vector.
	 */
     append(from?: DOpusVector<T> | any[], start?: number, end?: number): void;

	/**
	 * Copies the value of another Vector to this one. If start and end are not provided, the entire Vector is copied - otherwise, only the specified elements are copied.
	 *
	 * Instead of a Vector object you can also pass a collection to this method and the contents of the collection will be copied to the Vector.
	 *
	 * In JScript you can pass a standard array to this method to copy the array into a Vector.
	 */
	assign(from?: DOpusVector<any> | any[], start?: number, end?: number): void;

	/**
	 * Returns the last element in the Vector.
	 */
	back(): any;

	/**
	 * Clears the contents of the Vector.
	 */
	clear(): void;

	/**
	 * Erases the element at the specified index.
	 */
	erase(index?: number): void;

	/**
	 * Exchanges the positions of the two specified elements.
	 */
	exchange(index1?: number, index2?: number): void;

	/**
	 * Returns the first element in the Vector.
	 */
	front(): any;

	/**
	 * Inserts the provided value at the specified position.
	 */
	insert(index?: number, value?: any): void;

	/**
	 * Removes the last element of the Vector.
	 */
	pop_back(): void;

	/**
	 * Adds the provided value to the end of the Vector.
	 */
	push_back(value?: any): void;

	/**
	 * Reserves space in the Vector for the specified number of elements (increases its capacity, although the count of elements remains unchanged).
	 *
	 * Note that Vectors grow dynamically - you don't have to specifically reserve or resize them. However if you want to add a large number of elements to a Vector it can be more efficient to reserve space for them first.
	 */
	reserve(capacity?: number): void;

	/**
	 * Resizes the Vector to the specified number of elements. Any existing elements past the new size of the Vector will be erased.
	 */
	resize(size?: number): void;

	/**
	 * Reduces the capacity of the Vector to the number of elements it currently holds.
	 */
	shrink_to_fit(): void;

	/**
	 * Sorts the contents of the Vector. Strings and numbers are sorted alphabetically and numerically - other elements are grouped by type but not specifically sorted in any particular order.
	 */
	sort(): void;

	/**
	 * Removes all but one of any duplicate elements from the Vector. The number of elements removed is returned.
	 */
	unique(): number;

}

/**
 * The Version object is retrieved from the DOpus .version property. It provides information about the current version of Directory Opus.
 * @see {DOpusConstructor}
 *
 * @returns {string} Full version string (as shown in the About dialog).
 */
interface DOpusVersion extends String {

	/**
	 * The current build number.
	 */
	readonly build: number;

	/**
	 * The current module version (the version of DOpus.exe itself). You can also enumerate or index this as a collection:int to retrieve the individual four digits of the module version.
	 */
	readonly module: string;

	/**
	 * The current product version (the release version of Directory Opus as a whole). You can also enumerate or index this as a collection:int to retrieve the individual four digits of the product version.
	 */
	readonly product: string;

	/**
	 * Returns a WinVer object which provides information about the current version of Windows.
	 */
	readonly winver: DOpusWinVer;

	/**
	 * Returns True if the current version of Opus is the specified version or greater. You can specify the major version only (e.g. "11"), a major and minor version (e.g. "11.3") or a specific beta version (e.g. "11.3.1").
	 */
	atLeast(version?: string): boolean;

}

/**
 * The VideoMeta object is retrieved from the Metadata .video or Metadata .video_text properties. It provides access to metadata relating to movie files.
 * @see {DOpusMetadata}
 */
interface DOpusVideoMeta {

	/**
	 * Returns the value of the specified column, as listed in the Movies section of the Keywords for Columns page.
	 */

	/**
	 * Aspect ratio
	 */
	readonly aspectRatio: any;

	/**
	 * Audio codec
	 */
	readonly audioCodec: any;

	/**
	 * Audio codec
	 */
	readonly mp3Type: any;

	/**
	 * Bit depth
	 */
	readonly picDepth: any;

	/**
	 * Bit rate
	 */
	readonly mp3Bitrate: any;

	/**
	 * Broadcast date
	 */
	readonly broadcastDate: any;

	/**
	 * Channel number
	 */
	readonly channel: any;

	/**
	 * Credits
	 */
	readonly credits: any;

	/**
	 * Data rate
	 */
	readonly datarate: any;

	/**
	 * Dimensions
	 */
	readonly picSize: any;

	/**
	 * Dimensions
	 */
	readonly dimensions: any;

	/**
	 * Duration
	 */
	readonly duration: any;

	/**
	 * Duration
	 */
	readonly mp3SongLength: any;

	/**
	 * Episode name
	 */
	readonly episodeName: any;

	/**
	 * FOURCC code
	 */
	readonly fourCC: any;

	/**
	 * Frame rate
	 */
	readonly framerate: any;

	/**
	 * Height
	 */
	readonly picHeight: any;

	/**
	 * High definition?
	 */
	readonly ishd: any;

	/**
	 * Mode
	 */
	readonly mp3Mode: any;

	/**
	 * Physical size
	 */
	readonly picPhysSize: any;

	/**
	 * Publisher
	 */
	readonly publisher: any;

	/**
	 * Recording time
	 */
	readonly recordingTime: any;

	/**
	 * Repeat?
	 */
	readonly isRepeat: any;

	/**
	 * Sample rate
	 */
	readonly mp3Samplerate: any;

	/**
	 * Station name
	 */
	readonly station: any;

	/**
	 * Video codec
	 */
	readonly videoCodec: any;

	/**
	 * Width
	 */
	readonly picWidth: any;

}

/**
 * The Viewer object represents a standalone image viewer . A collection of Viewer objects is returned by the Viewers object, which is obtainable via the DOpus .viewers property. For functions launched from within a viewer (e.g. from its toolbar), the current Viewer object is provided by the ClickData . func .viewer property.
 * @see {DOpusViewers}
 * @see {DOpusConstructor}
 * @see {DOpusClickData}
 * @see {DOpusfunc}
 */
interface DOpusViewer {

	/**
	 * Returns the bottom coordinate of the viewer window.
	 */
	readonly bottom: number;

	/**
	 * Returns an Item object representing the currently displayed image.
	 */
	readonly current: DOpusItem;

	/**
	 * Returns a collection of Item objects representing the images in the viewer's list.
	 */
	readonly files: DOpusItem;

	/**
	 * Returns True if the viewer is currently the foreground (active) window in the system.
	 */
	readonly foreground: boolean;

	/**
	 * Returns the index of the currently viewed image within the viewer's list of files.
	 */
	readonly index: number;

	/**
	 * Returns True if the viewer is the most recently active viewer.
	 */
	readonly lastActive: boolean;

	/**
	 * Returns the left coordinate of the viewer window.
	 */
	readonly left: number;

	/**
	 * Returns a Tab object representing the tab that launched the viewer (if there was one, and if it still exists).
	 */
	readonly parentTab: DOpusTab;

	/**
	 * Returns the right coordinate of the viewer window.
	 */
	readonly right: number;

	/**
	 * Returns or sets the title bar string for the viewer window.
	 *
	 * You can use several special "tokens" in the title string to insert:
	 *
	 * * **%P** - full path of the currently viewed image
	 * * **%N** - name of the current displayed image
	 * * **%R** - drive root of the current image
	 * * **%E** - displays * if the image's metadata has been modified and not saved
	 * * **%I** - current image's index (number) in the list of images
	 * * **%O** - total number of images in the list
	 * * **%W** - width of the current image
	 * * **%H** - height of the current image
	 * * **%D** - depth of the current image (bits per pixel)
	 * * **%M** - current image's dimensions
	 * * **%S** - file size on disk
	 * * **%F** - folder name
	 * * **%C** - collection name if current image is marked
	 * * **%L** - any labels assigned to the current image
	 * * **%T** - original title (useful for simply adding a prefix or suffix to the title)
	 * * **%%** - insert a literal % character
	 */
	title: string;

	/**
	 * Returns the top coordinate of the viewer window.
	 */
	readonly top: number;

	/**
	 * Adds the specified file to the viewer's current list of files. You can either pass a string or a Path object to indicate the file to add to the list. By default the file will be added to the end of the list, unless you specify a 0-based index as the second argument.
	 */
	addFile(filepath?: string, index?: number): void;

	/**
	 * Runs a command in the context of this viewer window. You can either pass a string or a Command object.
	 *
	 * If the argument you pass is a string then it can only be a viewer command argument as documented for the Show VIEWERCMD command. For example, Command(“next”) would run the Show VIEWERCMD=next command in the context of this viewer.
	 *
	 * If you pass a Command object then all commands (internal or external) can be used.
	 */
	command(command?: string | DOpusCommand): void;

	/**
	 * Removes the specified file from the viewer's current list of files. You can either pass the 0-based index of the file to remove, or the filepath (either as a string or a Path object).
	 */
	removeFile(index?: number, filepath?: string): void;

	/**
	 * Used to change how the viewer window is grouped with other Opus windows on the taskbar. Specify a group name to move the window into an alternative group, or omit the group argument to reset back to the default group. If one or more windows are moved into the same group, they will be grouped together, separate from other the default group.
	 *
	 * This only works on Windows 7 and above, and only when taskbar grouping is enabled. Group names are limited to 103 characters and will be truncated if longer. Spaces and dots in group names are automatically converted to underscores.
	 *
	 * Returns true on success.
	 */
	setTaskbarGroup(group?: string): boolean;

}

/**
 * If a script implements the OnViewerEvent event, it receives a ViewerEventData object whenever certain events occur in a standalone image viewer .
 * @see {DOpusOnViewerEvent}
 */
interface DOpusViewerEventData {

	/**
	 * Returns a string indicating the event that occurred. The events currently defined are:
	 *
	 * * **create**: A new viewer has been created.
	 * * **destroy**: A viewer window has been destroyed.
	 * * **load**: A new image has been loaded in a viewer. The item property can be used to find out which file was loaded.
	 * * **setfocus**: The viewer window has received focus (gone active).
	 * * **killfocus**: The viewer window has lost focus (gone inactive).
	 * * **click**: The left button was clicked on the image (requires mouse buttons to be set to trigger Script event in Preferences / Viewer / Mouse Buttons).
	 * * **dblclk**: The left button was double-clicked on the image.
	 * * **mclick**: The middle button was clicked on the image.
	 */
	readonly event: string;

	/**
	 * For the load event, returns an Item object representing the newly loaded image.
	 */
	readonly item: DOpusItem;

	/**
	 * Returns a Viewer object representing the viewer the event occurred in.
	 */
	readonly viewer: DOpusViewer;

	/**
	 * For the click events, returns the x coordinate within the viewer window that the click occurred.
	 */
	readonly x: number;

	/**
	 * For the click events, returns the y coordinate within the viewer window that the click occurred.
	 */
	readonly y: number;

	/**
	 * For the click events, returns the width of the viewer window.
	 */
	readonly w: number;

	/**
	 * For the click events, returns the height of the viewer window.
	 */
	readonly h: number;

}


type DOpusViewerWithoutLastActive = new() => { [P in Exclude<keyof DOpusViewer, 'lastActive'>] : DOpusViewer[P] };
/**
 * The Viewers object is a collection of all currently open standalone image viewers . It can be obtained via the DOpus .viewers property.
 * @see {DOpusConstructor}
 *
 * @returns {DOpusViewer} Lets you enumerate the currently open viewers.
 */
interface DOpusViewers extends DOpusViewerWithoutLastActive {

	/**
	 * Returns a Viewer object representing the most recently active viewer window.
	 */
	readonly lastActive: DOpusViewer;

}



type StringWithoutMatch = new() => { [P in Exclude<keyof String, 'match'>] : String[P] };

/**
 * The Wild object allows a script to access the in-built pattern matching functions in Opus. Even though most ActiveX scripting languages have their own pattern matching support (usually via a regular expression system of some sort), you may wish to use the one that Opus provides for consistency with internal Opus functions.
 *
 * You can create a Wild object using the FSUtil.NewWild method. To use the Wild object, you must first give it the pattern to match against (this step is called "parsing the pattern"). You can do this when it is created or later on using the Parse method. Once the object has a pattern you can call the Match method to test a string against the pattern.
 *
 * @returns {string} Returns the current pattern in the Wild object
 */
interface DOpusWild extends StringWithoutMatch {

	/**
	 * Escapes all wildcard characters in the input string and returns the result.
	 *
	 * For example, `"the * 'dog' said *"` would be conterted to `"the '* ''dog'' said '*"`.
	 *
	 * The optional type argument lets you specify the conversion:
	 *
	 * * *none*: Escape characters used in standard pattern matching
	 * * **r**: Escape characters used in regular expressions
	 * * **b**: Double all back-slashes
	 * * **n**: Double all back-slashes that come before the letter 'n'
	 *
	 * Note that these modes cannot be combined.
	 */
	escapeString(input?: string, type?: string): string;

	/**
	 * Compares the specified string against the previously-parsed pattern, and returns True if it matches.
	 */
	match(test?: string): boolean;

	/**
	 * Parses the supplied pattern. The flags string is optional - if supplied it must be a string consisting of one or more of the following characters:
	 *
	 * * **c** - case-sensitive (otherwise pattern matching is not case-sensitive)
	 * * **d** - DOS only (only standard MS-DOS wildcards are supported)
	 * * **f** - filename mode (special handling for matching filenames)
	 * * **r** - regular expression (otherwise standard pattern matching is used)
	 */
	parse(pattern?: string, flags?: string): boolean;

}

/**
 * The WinVer object is retrieved from the Version .winver property. It provides information about the current version of Windows.
 * @see {DOpusVersion}
 *
 * @returns {string} Full Windows version string.
 */
interface DOpusWinVer extends String {

	/**
	 * True if running on a Server edition of Windows.
	 */
	readonly server: boolean;

	/**
	 * True if running on Windows XP.
	 */
	readonly xp: boolean;

	/**
	 * True if running on Windows XP or better (this will always be true).
	 */
	readonly xpOrBetter: boolean;

	/**
	 * True if running on Windows Vista.
	 */
	readonly vista: boolean;

	/**
	 * True if running on Windows Vista or better (later).
	 */
	readonly vistaOrBetter: boolean;

	/**
	 * True if running on Windows 7.
	 */
	readonly win7: boolean;

	/**
	 * True if running on Windows 7 or better.
	 */
	readonly win7OrBetter: boolean;

	/**
	 * True if running on Windows 8.
	 */
	readonly win8: boolean;

	/**
	 * True if running on Windows 8 or better.
	 */
	readonly win8OrBetter: boolean;

	/**
	 * True if running on Windows 8.1.
	 */
	readonly win81: boolean;

	/**
	 * True if running on Windows 8.1 or better.
	 */
	readonly win81OrBetter: boolean;

	/**
	 * True if running on Windows 10.
	 */
	readonly win10: boolean;

	/**
	 * True if running on Windows 10 or better.
	 */
	readonly win10OrBetter: boolean;

}
