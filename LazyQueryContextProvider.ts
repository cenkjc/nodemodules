export class LazyQueryContextProvider{
    constructor(
        private readonly _content: any,
        private readonly _site: any,
        private readonly _user: any,
        private readonly _widget: any,
        private readonly _unenrichedWidget: any
    ) {}

    public widget(_: number) : any{
        return this._widget;
    }

    public unenrichedWidget(_: number) : any{
        return this._unenrichedWidget;
    }

    public contentItem(_: number) : any{
        return this._content;
    }

    public site(_: number) : any{
        return this._site;
    }

    public user(_: number) : any{
        return this._user;
    }
}