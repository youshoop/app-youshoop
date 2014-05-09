/// <reference path=".././htmlObject/HtmlObject.ts" />
import HtmlObject = require('.././htmlObject/HtmlObject');
/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 13 - 03 - 2014
* Libreria basada en los iconos de font awesome de bootstrap (http://fortawesome.github.io/)
**/

export class JIcon extends HtmlObject.i {


    private type: number;
    private collectionClass: string[];

    constructor(_jqLabel: string, type: number) {

        super('JIcon');

        this.setjLabel(_jqLabel);
        this.type = type;
        this.collectionClass = new Array<string>();
        this.setType(this.type);
        _jqLabel = null;
    }

    getType(): number {

        return this.type;
    }

    setType(_type: number) {

        this.type = _type;
        switch (this.type) {

            case JFontAwesome.LIST_ICONS:

                this.collectionClass.push(JFontAwesome.FA_LI);
                this.collectionClass.push(JFontAwesome.FA);
                this.collectionClass.push(this.getjLabel());

                this.addCollectionClass(this.collectionClass);

                break;
        }

        _type = null;
    }

    getCollectionClass(): string[] {

        return this.collectionClass;
    }

    setCollectionClass(_collection: string[]) {

        this.collectionClass = _collection;
        _collection = null;
    }

    finalize() {
      
        this.type = null;
        this.collectionClass = null;
        
    }



}

/**
@ Autor : Yonatan Alexis Quintero Rodriguez
@ Version: 0.1
@ Fecha : 9 _ 03 _ 2014
* lista de iconos de font awesome de bootstrap (http://fortawesome.github.io/)
* The complete set of 369 icons in Font Awesome 4.0.3
**/

export class JFontAwesome {


	static FA = 'fa'
	/*CONSTANTES (Tipos de Iconos)*/

    static INLINE_ICONS = 1;
    static LARGER_ICONS = 2;
    static FIXED_WIDTH_ICONS = 3;
    static LIST_ICONS = 4;
    static BORDERED_AND_PULLED_ICONS = 5;
    static SPINNING_ICONS = 6;
    static ROTATED_AND_FLIPPED = 7;
    static STACKED_ICONS = 8;
    static CUSTOM_ICONS = 9;
    static NONE_ICONS = 10;


    /*CONSTANTES (Larger Icons)*/

    static FA_LG = 'fa-lg';
    static FA_2X = 'fa-2x';
    static FA_3X = 'fa-3x';
    static FA_4X = 'fa-4x';
    static FA_5X = 'fa-5x';

    /*CONSTANTES (Fixed Width Icons)*/

    static FA_FW = 'fa-fw';

    /*CONSTANTES (List Icons)*/

    static FA_UL = 'fa-ul';
    static FA_LI = 'fa-li';

    /*CONSTANTES (Bordered & Pulled Icons)*/

    static FA_BORDER = 'fa-border';
    static PULL_RIGHT = 'pull-right';
    static PULL_LEFT = 'pull-left';

    /*CONSTANTES (Spinning Icons)*/

    static FA_SPIN = 'fa-spin';

    /*CONSTANTES (Rotated & Flipped)*/

    static FA_ROTATE_90 = 'fa-rotate-90';
    static FA_ROTATE_180 = 'fa-rotate-180';
    static FA_ROTATE_270 = 'fa-rotate-270';
    static FA_FLIP_HORIZONTAL = 'fa-flip-horizontal';
    static FA_FLIP_VERTICAL = 'fa-flip-vertical';

    /*CONSTANTES (Stacked Icons)*/

    static FA_STACK = 'fa_stack';
    static FA_STACK_1X = 'fa_stack_1x';
    static FA_STACK_2X = 'fa_stack_2x';
    static FA_INVERSE = 'fa_inverse';

    /*Constantes de Iconos*/

    static FA_GLASS = 'fa-glass';
    static FA_MUSIC = 'fa-music';
    static FA_SEARCH = 'fa-search';
    static FA_ENVELOPE_O = 'fa-envelope-o';
    static FA_HEART = 'fa-heart';
    static FA_STAR = 'fa-star';
    static FA_STAR_O = 'fa-star-o';
    static FA_USER = 'fa-user';
    static FA_FILM = 'fa-film';
    static FA_TH_LARGE = 'fa-th-large';
    static FA_TH = 'fa-th';
    static FA_TH_LIST = 'fa-th-list';
    static FA_CHECK = 'fa-check';
    static FA_TIMES = 'fa-times';
    static FA_SEARCH_PLUS = 'fa-search-plus';
    static FA_SEARCH_MINUS = 'fa-search-minus';
    static FA_POWER_OFF = 'fa-power-off';
    static FA_SIGNAL = 'fa-signal';
    static FA_GEAR = 'fa-gear';
    static FA_COG = 'fa-cog';
    static FA_TRASH_O = 'fa-trash-o';
    static FA_HOME = 'fa-home';
    static FA_FILE_O = 'fa-file-o';
    static FA_CLOCK_O = 'fa-clock-o';
    static FA_ROAD = 'fa-road';
    static FA_DOWNLOAD = 'fa-download';
    static FA_ARROW_CIRCLE_O_DOWN = 'fa-arrow-circle-o-down';
    static FA_ARROW_CIRCLE_O_UP = 'fa-arrow-circle-o-up';
    static FA_INBOX = 'fa-inbox';
    static FA_PLAY_CIRCLE_O = 'fa-play-circle-o';
    static FA_ROTATE_RIGHT = 'fa-rotate-right';
    static FA_REPEAT = 'fa-repeat';
    static FA_REFRESH = 'fa-refresh';
    static FA_LIST_ALT = 'fa-list-alt';
    static FA_LOCK = 'fa-lock';
    static FA_FLAG = 'fa-flag';
    static FA_HEADPHONES = 'fa-headphones';
    static FA_VOLUME_OFF = 'fa-volume-off';
    static FA_VOLUME_DOWN = 'fa-volume-down';
    static FA_VOLUME_UP = 'fa-volume-up';
    static FA_QRCODE = 'fa-qrcode';
    static FA_BARCODE = 'fa-barcode';
    static FA_TAG = 'fa-tag';
    static FA_TAGS = 'fa-tags';
    static FA_BOOK = 'fa-book';
    static FA_BOOKMARK = 'fa-bookmark';
    static FA_PRINT = 'fa-print';
    static FA_CAMERA = 'fa-camera';
    static FA_FONT = 'fa-font';
    static FA_BOLD = 'fa-bold';
    static FA_ITALIC = 'fa-italic';
    static FA_TEXT_HEIGHT = 'fa-text-height';
    static FA_TEXT_WIDTH = 'fa-text-width';
    static FA_ALIGN_LEFT = 'fa-align-left';
    static FA_ALIGN_CENTER = 'fa-align-center';
    static FA_ALIGN_RIGHT = 'fa-align-right';
    static FA_ALIGN_JUSTIFY = 'fa-align-justify';
    static FA_LIST = 'fa-list';
    static FA_DEDENT = 'fa-dedent';
    static FA_OUTDENT = 'fa-outdent';
    static FA_INDENT = 'fa-indent';
    static FA_VIDEO_CAMERA = 'fa-video-camera';
    static FA_PICTURE_O = 'fa-picture-o';
    static FA_PENCIL = 'fa-pencil';
    static FA_MAP_MARKER = 'fa-map-marker';
    static FA_ADJUST = 'fa-adjust';
    static FA_TINT = 'fa-tint';
    static FA_EDIT = 'fa-edit';
    static FA_PENCIL_SQUARE_O = 'fa-pencil-square-o';
    static FA_SHARE_SQUARE_O = 'fa-share-square-o';
    static FA_CHECK_SQUARE_O = 'fa-check-square-o';
    static FA_ARROWS = 'fa-arrows';
    static FA_STEP_BACKWARD = 'fa-step-backward';
    static FA_FAST_BACKWARD = 'fa-fast-backward';
    static FA_BACKWARD = 'fa-backward';
    static FA_PLAY = 'fa-play';
    static FA_PAUSE = 'fa-pause';
    static FA_STOP = 'fa-stop';
    static FA_FORWARD = 'fa-forward';
    static FA_FAST_FORWARD = 'fa-fast-forward';
    static FA_STEP_FORWARD = 'fa-step-forward';
    static FA_EJECT = 'fa-eject';
    static FA_CHEVRON_LEFT = 'fa-chevron-left';
    static FA_CHEVRON_RIGHT = 'fa-chevron-right';
    static FA_PLUS_CIRCLE = 'fa-plus-circle';
    static FA_MINUS_CIRCLE = 'fa-minus-circle';
    static FA_TIMES_CIRCLE = 'fa-times-circle';
    static FA_CHECK_CIRCLE = 'fa-check-circle';
    static FA_QUESTION_CIRCLE = 'fa-question-circle';
    static FA_INFO_CIRCLE = 'fa-info-circle';
    static FA_CROSSHAIRS = 'fa-crosshairs';
    static FA_TIMES_CIRCLE_O = 'fa-times-circle-o';
    static FA_CHECK_CIRCLE_O = 'fa-check-circle-o';
    static FA_BAN = 'fa-ban';
    static FA_ARROW_LEFT = 'fa-arrow-left';
    static FA_ARROW_RIGHT = 'fa-arrow-right';
    static FA_ARROW_UP = 'fa-arrow-up';
    static FA_ARROW_DOWN = 'fa-arrow-down';
    static FA_MAIL_FORWARD = 'fa-mail-forward';
    static FA_SHARE = 'fa-share';
    static FA_EXPAND = 'fa-expand';
    static FA_COMPRESS = 'fa-compress';
    static FA_PLUS = 'fa-plus';
    static FA_MINUS = 'fa-minus';
    static FA_ASTERISK = 'fa-asterisk';
    static FA_EXCLAMATION_CIRCLE = 'fa-exclamation-circle';
    static FA_GIFT = 'fa-gift';
    static FA_LEAF = 'fa-leaf';
    static FA_FIRE = 'fa-fire';
    static FA_EYE = 'fa-eye';
    static FA_EYE_SLASH = 'fa-eye-slash';
    static FA_WARNING = 'fa-warning';
    static FA_EXCLAMATION_TRIANGLE = 'fa-exclamation-triangle';
    static FA_PLANE = 'fa-plane';
    static FA_CALENDAR = 'fa-calendar';
    static FA_RANDOM = 'fa-random';
    static FA_COMMENT = 'fa-comment';
    static FA_MAGNET = 'fa-magnet';
    static FA_CHEVRON_UP = 'fa-chevron-up';
    static FA_CHEVRON_DOWN = 'fa-chevron-down';
    static FA_RETWEET = 'fa-retweet';
    static FA_SHOPPING_CART = 'fa-shopping-cart';
    static FA_FOLDER = 'fa-folder';
    static FA_FOLDER_OPEN = 'fa-folder-open';
    static FA_ARROWS_V = 'fa-arrows-v';
    static FA_ARROWS_H = 'fa-arrows-h';
    static FA_BAR_CHART_O = 'fa-bar-chart-o';
    static FA_TWITTER_SQUARE = 'fa-twitter-square';
    static FA_FACEBOOK_SQUARE = 'fa-facebook-square';
    static FA_CAMERA_RETRO = 'fa-camera-retro';
    static FA_KEY = 'fa-key';
    static FA_GEARS = 'fa-gears';
    static FA_COGS = 'fa-cogs';
    static FA_COMMENTS = 'fa-comments';
    static FA_THUMBS_O_UP = 'fa-thumbs-o-up';
    static FA_THUMBS_O_DOWN = 'fa-thumbs-o-down';
    static FA_STAR_HALF = 'fa-star-half';
    static FA_HEART_O = 'fa-heart-o';
    static FA_SIGN_OUT = 'fa-sign-out';
    static FA_LINKEDIN_SQUARE = 'fa-linkedin-square';
    static FA_THUMB_TACK = 'fa-thumb-tack';
    static FA_EXTERNAL_LINK = 'fa-external-link';
    static FA_SIGN_IN = 'fa-sign-in';
    static FA_TROPHY = 'fa-trophy';
    static FA_GITHUB_SQUARE = 'fa-github-square';
    static FA_UPLOAD = 'fa-upload';
    static FA_LEMON_O = 'fa-lemon-o';
    static FA_PHONE = 'fa-phone';
    static FA_SQUARE_O = 'fa-square-o';
    static FA_BOOKMARK_O = 'fa-bookmark-o';
    static FA_PHONE_SQUARE = 'fa-phone-square';
    static FA_TWITTER = 'fa-twitter';
    static FA_FACEBOOK = 'fa-facebook';
    static FA_GITHUB = 'fa-github';
    static FA_UNLOCK = 'fa-unlock';
    static FA_CREDIT_CARD = 'fa-credit-card';
    static FA_RSS = 'fa-rss';
    static FA_HDD_O = 'fa-hdd-o';
    static FA_BULLHORN = 'fa-bullhorn';
    static FA_BELL = 'fa-bell';
    static FA_CERTIFICATE = 'fa-certificate';
    static FA_HAND_O_RIGHT = 'fa-hand-o-right';
    static FA_HAND_O_LEFT = 'fa-hand-o-left';
    static FA_HAND_O_UP = 'fa-hand-o-up';
    static FA_HAND_O_DOWN = 'fa-hand-o-down';
    static FA_ARROW_CIRCLE_LEFT = 'fa-arrow-circle-left';
    static FA_ARROW_CIRCLE_RIGHT = 'fa-arrow-circle-right';
    static FA_ARROW_CIRCLE_UP = 'fa-arrow-circle-up';
    static FA_ARROW_CIRCLE_DOWN = 'fa-arrow-circle-down';
    static FA_GLOBE = 'fa-globe';
    static FA_WRENCH = 'fa-wrench';
    static FA_TASKS = 'fa-tasks';
    static FA_FILTER = 'fa-filter';
    static FA_BRIEFCASE = 'fa-briefcase';
    static FA_ARROWS_ALT = 'fa-arrows-alt';
    static FA_GROUP = 'fa-group';
    static FA_USERS = 'fa-users';
    static FA_CHAIN = 'fa-chain';
    static FA_LINK = 'fa-link';
    static FA_CLOUD = 'fa-cloud';
    static FA_FLASK = 'fa-flask';
    static FA_CUT = 'fa-cut';
    static FA_SCISSORS = 'fa-scissors';
    static FA_COPY = 'fa-copy';
    static FA_FILES_O = 'fa-files-o';
    static FA_PAPERCLIP = 'fa-paperclip';
    static FA_SAVE = 'fa-save';
    static FA_FLOPPY_O = 'fa-floppy-o';
    static FA_SQUARE = 'fa-square';
    static FA_BARS = 'fa-bars';
    static FA_LIST_UL = 'fa-list-ul';
    static FA_LIST_OL = 'fa-list-ol';
    static FA_STRIKETHROUGH = 'fa-strikethrough';
    static FA_UNDERLINE = 'fa-underline';
    static FA_TABLE = 'fa-table';
    static FA_MAGIC = 'fa-magic';
    static FA_TRUCK = 'fa-truck';
    static FA_PINTEREST = 'fa-pinterest';
    static FA_PINTEREST_SQUARE = 'fa-pinterest-square';
    static FA_GOOGLE_PLUS_SQUARE = 'fa-google-plus-square';
    static FA_GOOGLE_PLUS = 'fa-google-plus';
    static FA_MONEY = 'fa-money';
    static FA_CARET_DOWN = 'fa-caret-down';
    static FA_CARET_UP = 'fa-caret-up';
    static FA_CARET_LEFT = 'fa-caret-left';
    static FA_CARET_RIGHT = 'fa-caret-right';
    static FA_COLUMNS = 'fa-columns';
    static FA_UNSORTED = 'fa-unsorted';
    static FA_SORT = 'fa-sort';
    static FA_SORT_DOWN = 'fa-sort-down';
    static FA_SORT_ASC = 'fa-sort-asc';
    static FA_SORT_UP = 'fa-sort-up';
    static FA_SORT_DESC = 'fa-sort-desc';
    static FA_ENVELOPE = 'fa-envelope';
    static FA_LINKEDIN = 'fa-linkedin';
    static FA_ROTATE_LEFT = 'fa-rotate-left';
    static FA_UNDO = 'fa-undo';
    static FA_LEGAL = 'fa-legal';
    static FA_GAVEL = 'fa-gavel';
    static FA_DASHBOARD = 'fa-dashboard';
    static FA_TACHOMETER = 'fa-tachometer';
    static FA_COMMENT_O = 'fa-comment-o';
    static FA_COMMENTS_O = 'fa-comments-o';
    static FA_FLASH = 'fa-flash';
    static FA_BOLT = 'fa-bolt';
    static FA_SITEMAP = 'fa-sitemap';
    static FA_UMBRELLA = 'fa-umbrella';
    static FA_PASTE = 'fa-paste';
    static FA_CLIPBOARD = 'fa-clipboard';
    static FA_LIGHTBULB_O = 'fa-lightbulb-o';
    static FA_EXCHANGE = 'fa-exchange';
    static FA_CLOUD_DOWNLOAD = 'fa-cloud-download';
    static FA_CLOUD_UPLOAD = 'fa-cloud-upload';
    static FA_USER_MD = 'fa-user-md';
    static FA_STETHOSCOPE = 'fa-stethoscope';
    static FA_SUITCASE = 'fa-suitcase';
    static FA_BELL_O = 'fa-bell-o';
    static FA_COFFEE = 'fa-coffee';
    static FA_CUTLERY = 'fa-cutlery';
    static FA_FILE_TEXT_O = 'fa-file-text-o';
    static FA_BUILDING_O = 'fa-building-o';
    static FA_HOSPITAL_O = 'fa-hospital-o';
    static FA_AMBULANCE = 'fa-ambulance';
    static FA_MEDKIT = 'fa-medkit';
    static FA_FIGHTER_JET = 'fa-fighter-jet';
    static FA_BEER = 'fa-beer';
    static FA_H_SQUARE = 'fa-h-square';
    static FA_PLUS_SQUARE = 'fa-plus-square';
    static FA_ANGLE_DOUBLE_LEFT = 'fa-angle-double-left';
    static FA_ANGLE_DOUBLE_RIGHT = 'fa-angle-double-right';
    static FA_ANGLE_DOUBLE_UP = 'fa-angle-double-up';
    static FA_ANGLE_DOUBLE_DOWN = 'fa-angle-double-down';
    static FA_ANGLE_LEFT = 'fa-angle-left';
    static FA_ANGLE_RIGHT = 'fa-angle-right';
    static FA_ANGLE_UP = 'fa-angle-up';
    static FA_ANGLE_DOWN = 'fa-angle-down';
    static FA_DESKTOP = 'fa-desktop';
    static FA_LAPTOP = 'fa-laptop';
    static FA_TABLET = 'fa-tablet';
    static FA_MOBILE_PHONE = 'fa-mobile-phone';
    static FA_MOBILE = 'fa-mobile';
    static FA_CIRCLE_O = 'fa-circle-o';
    static FA_QUOTE_LEFT = 'fa-quote-left';
    static FA_QUOTE_RIGHT = 'fa-quote-right';
    static FA_SPINNER = 'fa-spinner';
    static FA_CIRCLE = 'fa-circle';
    static FA_MAIL_REPLY = 'fa-mail-reply';
    static FA_REPLY = 'fa-reply';
    static FA_GITHUB_ALT = 'fa-github-alt';
    static FA_FOLDER_O = 'fa-folder-o';
    static FA_FOLDER_OPEN_O = 'fa-folder-open-o';
    static FA_SMILE_O = 'fa-smile-o';
    static FA_FROWN_O = 'fa-frown-o';
    static FA_MEH_O = 'fa-meh-o';
    static FA_GAMEPAD = 'fa-gamepad';
    static FA_KEYBOARD_O = 'fa-keyboard-o';
    static FA_FLAG_O = 'fa-flag-o';
    static FA_FLAG_CHECKERED = 'fa-flag-checkered';
    static FA_TERMINAL = 'fa-terminal';
    static FA_CODE = 'fa-code';
    static FA_REPLY_ALL = 'fa-reply-all';
    static FA_MAIL_REPLY_ALL = 'fa-mail-reply-all';
    static FA_STAR_HALF_EMPTY = 'fa-star-half-empty';
    static FA_STAR_HALF_FULL = 'fa-star-half-full';
    static FA_STAR_HALF_O = 'fa-star-half-o';
    static FA_LOCATION_ARROW = 'fa-location-arrow';
    static FA_CROP = 'fa-crop';
    static FA_CODE_FORK = 'fa-code-fork';
    static FA_UNLINK = 'fa-unlink';
    static FA_CHAIN_BROKEN = 'fa-chain-broken';
    static FA_QUESTION = 'fa-question';
    static FA_INFO = 'fa-info';
    static FA_EXCLAMATION = 'fa-exclamation';
    static FA_SUPERSCRIPT = 'fa-superscript';
    static FA_SUBSCRIPT = 'fa-subscript';
    static FA_ERASER = 'fa-eraser';
    static FA_PUZZLE_PIECE = 'fa-puzzle-piece';
    static FA_MICROPHONE = 'fa-microphone';
    static FA_MICROPHONE_SLASH = 'fa-microphone-slash';
    static FA_SHIELD = 'fa-shield';
    static FA_CALENDAR_O = 'fa-calendar-o';
    static FA_FIRE_EXTINGUISHER = 'fa-fire-extinguisher';
    static FA_ROCKET = 'fa-rocket';
    static FA_MAXCDN = 'fa-maxcdn';
    static FA_CHEVRON_CIRCLE_LEFT = 'fa-chevron-circle-left';
    static FA_CHEVRON_CIRCLE_RIGHT = 'fa-chevron-circle-right';
    static FA_CHEVRON_CIRCLE_UP = 'fa-chevron-circle-up';
    static FA_CHEVRON_CIRCLE_DOWN = 'fa-chevron-circle-down';
    static FA_HTML5 = 'fa-html5';
    static FA_CSS3 = 'fa-css3';
    static FA_ANCHOR = 'fa-anchor';
    static FA_UNLOCK_ALT = 'fa-unlock-alt';
    static FA_BULLSEYE = 'fa-bullseye';
    static FA_ELLIPSIS_H = 'fa-ellipsis-h';
    static FA_ELLIPSIS_V = 'fa-ellipsis-v';
    static FA_RSS_SQUARE = 'fa-rss-square';
    static FA_PLAY_CIRCLE = 'fa-play-circle';
    static FA_TICKET = 'fa-ticket';
    static FA_MINUS_SQUARE = 'fa-minus-square';
    static FA_MINUS_SQUARE_O = 'fa-minus-square-o';
    static FA_LEVEL_UP = 'fa-level-up';
    static FA_LEVEL_DOWN = 'fa-level-down';
    static FA_CHECK_SQUARE = 'fa-check-square';
    static FA_PENCIL_SQUARE = 'fa-pencil-square';
    static FA_EXTERNAL_LINK_SQUARE = 'fa-external-link-square';
    static FA_SHARE_SQUARE = 'fa-share-square';
    static FA_COMPASS = 'fa-compass';
    static FA_TOGGLE_DOWN = 'fa-toggle-down';
    static FA_CARET_SQUARE_O_DOWN = 'fa-caret-square-o-down';
    static FA_TOGGLE_UP = 'fa-toggle-up';
    static FA_CARET_SQUARE_O_UP = 'fa-caret-square-o-up';
    static FA_TOGGLE_RIGHT = 'fa-toggle-right';
    static FA_CARET_SQUARE_O_RIGHT = 'fa-caret-square-o-right';
    static FA_EURO = 'fa-euro';
    static FA_EUR = 'fa-eur';
    static FA_GBP = 'fa-gbp';
    static FA_DOLLAR = 'fa-dollar';
    static FA_USD = 'fa-usd';
    static FA_RUPEE = 'fa-rupee';
    static FA_INR = 'fa-inr';
    static FA_CNY = 'fa-cny';
    static FA_RMB = 'fa-rmb';
    static FA_YEN = 'fa-yen';
    static FA_JPY = 'fa-jpy';
    static FA_RUBLE = 'fa-ruble';
    static FA_ROUBLE = 'fa-rouble';
    static FA_RUB = 'fa-rub';
    static FA_WON = 'fa-won';
    static FA_KRW = 'fa-krw';
    static FA_BITCOIN = 'fa-bitcoin';
    static FA_BTC = 'fa-btc';
    static FA_FILE = 'fa-file';
    static FA_FILE_TEXT = 'fa-file-text';
    static FA_SORT_ALPHA_ASC = 'fa-sort-alpha-asc';
    static FA_SORT_ALPHA_DESC = 'fa-sort-alpha-desc';
    static FA_SORT_AMOUNT_ASC = 'fa-sort-amount-asc';
    static FA_SORT_AMOUNT_DESC = 'fa-sort-amount-desc';
    static FA_SORT_NUMERIC_ASC = 'fa-sort-numeric-asc';
    static FA_SORT_NUMERIC_DESC = 'fa-sort-numeric-desc';
    static FA_THUMBS_UP = 'fa-thumbs-up';
    static FA_THUMBS_DOWN = 'fa-thumbs-down';
    static FA_YOUTUBE_SQUARE = 'fa-youtube-square';
    static FA_YOUTUBE = 'fa-youtube';
    static FA_XING = 'fa-xing';
    static FA_XING_SQUARE = 'fa-xing-square';
    static FA_YOUTUBE_PLAY = 'fa-youtube-play';
    static FA_DROPBOX = 'fa-dropbox';
    static FA_STACK_OVERFLOW = 'fa-stack-overflow';
    static FA_INSTAGRAM = 'fa-instagram';
    static FA_FLICKR = 'fa-flickr';
    static FA_ADN = 'fa-adn';
    static FA_BITBUCKET = 'fa-bitbucket';
    static FA_BITBUCKET_SQUARE = 'fa-bitbucket-square';
    static FA_TUMBLR = 'fa-tumblr';
    static FA_TUMBLR_SQUARE = 'fa-tumblr-square';
    static FA_LONG_ARROW_DOWN = 'fa-long-arrow-down';
    static FA_LONG_ARROW_UP = 'fa-long-arrow-up';
    static FA_LONG_ARROW_LEFT = 'fa-long-arrow-left';
    static FA_LONG_ARROW_RIGHT = 'fa-long-arrow-right';
    static FA_APPLE = 'fa-apple';
    static FA_WINDOWS = 'fa-windows';
    static FA_ANDROID = 'fa-android';
    static FA_LINUX = 'fa-linux';
    static FA_DRIBBBLE = 'fa-dribbble';
    static FA_SKYPE = 'fa-skype';
    static FA_FOURSQUARE = 'fa-foursquare';
    static FA_TRELLO = 'fa-trello';
    static FA_FEMALE = 'fa-female';
    static FA_MALE = 'fa-male';
    static FA_GITTIP = 'fa-gittip';
    static FA_SUN_O = 'fa-sun-o';
    static FA_MOON_O = 'fa-moon-o';
    static FA_ARCHIVE = 'fa-archive';
    static FA_BUG = 'fa-bug';
    static FA_VK = 'fa-vk';
    static FA_WEIBO = 'fa-weibo';
    static FA_RENREN = 'fa-renren';
    static FA_PAGELINES = 'fa-pagelines';
    static FA_STACK_EXCHANGE = 'fa-stack-exchange';
    static FA_ARROW_CIRCLE_O_RIGHT = 'fa-arrow-circle-o-right';
    static FA_ARROW_CIRCLE_O_LEFT = 'fa-arrow-circle-o-left';
    static FA_TOGGLE_LEFT = 'fa-toggle-left';
    static FA_CARET_SQUARE_O_LEFT = 'fa-caret-square-o-left';
    static FA_DOT_CIRCLE_O = 'fa-dot-circle-o';
    static FA_WHEELCHAIR = 'fa-wheelchair';
    static FA_VIMEO_SQUARE = 'fa-vimeo-square';
    static FA_TURKISH_LIRA = 'fa-turkish-lira';
    static FA_TRY = 'fa-try';
    static FA_PLUS_SQUARE_O = 'fa-plus-square-o';

}
