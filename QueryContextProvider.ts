export class QueryContextProvider{
    constructor(
        public readonly content: any,
        public readonly site: any,
        public readonly user: any,
        public readonly widget: any,
        public readonly unenrichedWidget: any
    ) {}
    
}