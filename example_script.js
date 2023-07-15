import { LazyQueryContextProvider } from "./LazyQueryContextProvider.ts";
import { GqlService } from "./GqlService.ts";

async function executeMain(lazyQueryContextProvider, gqlService) {
    var currentContent = await lazyQueryContextProvider.contentItem(1);
    var currentSite = await lazyQueryContextProvider.site(1);
    if (currentContent.ufsIdeaCategory && currentContent.ufsIdeaCategory[0].id) {
        var currentWidget = await lazyQueryContextProvider.widget(1);
        var formattedPath = currentWidget.ideasFromCurrentSite ? " +effectivePathArray:(" + currentSite.id + ")" : " ";
        var statusFilter;
        if (currentWidget.ideaStatuses) {
            var formattedIdeasStatuses;
            formattedIdeasStatuses = currentWidget.ideaStatuses.filter(function (status) {
                return status && status.id > 0;
            }).map(function (ideaStatus) {
                return ideaStatus.id;
            });
            formattedIdeasStatuses.forEach(function (ideaStatus) {
                if (!statusFilter) {
                    statusFilter = " +ufsIdeaStatus:(" + ideaStatus;
                } else {
                    statusFilter += " OR " + ideaStatus;
                }
            });
            statusFilter += ")";
        }
        var query = {
            query: 'query{  content {    relatedIdeas:byQueryText(      queryText: "+documentTypePath:ufsIdea +ufsIdeaCategory:' + currentContent.ufsIdeaCategory[0].id + " -id:" + currentContent.id + formattedPath + statusFilter + '"      skip: 0      take: 5      sort:{        field: "createDate"        direction: "desc"      }    ) {      data {        id        url        activity { reactionScore } properties {          ... on ufsIdeaInterface {            title              ufsIdeaCategory { id  nodeName} ufsDescription            ufsIdeaStatus {              id              properties {                ... on TermInterface {                  title                  colour                }              }            }            ufsIdeaAuthor {              id              firstName              lastName              displayName              urlName                        }          }          }       }    }  }}'
        };
        return {
            results: JSON.parse(await gqlService.search(query))
        };
    } else {
        return {
            results: []
        };
    }
}

self.onmessage = async (evt) => {
    console.log(`Message received : ${evt.data}`);

    const context = evt.data;

    const result = await executeMain(
        new LazyQueryContextProvider(context.content, context.site, context.user, context.widget, context.unenrichedWidget),
        new GqlService());

    self.postMessage(result);

    self.close();
};