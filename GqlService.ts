import { SearchParams } from "https://raw.githubusercontent.com/cenkjc/nodemodules/master/SearchParams.ts";

export class GqlService{
    public search(searchParams: SearchParams) : any{
        return JSON.stringify({
            results: [
                {
                    data: {
                        test1: "Test1"
                    }
                }
            ]
        });
    }
}