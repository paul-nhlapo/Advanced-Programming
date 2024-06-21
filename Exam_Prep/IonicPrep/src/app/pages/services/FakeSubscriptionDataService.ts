import { Injectable } from "@angular/core";
import { Subscription } from "../tabs/Model/subscriptionModel";


@Injectable({
    providedIn: 'root'
})
export class FakeSubscriptionDataService {
    subscriptions : Subscription[];

    constructor () {
        this.subscriptions = [
            {
              id: 1,
              name: "Netflix",
              description:  "At Netflix, we want to entertain the world. Whatever your taste, and no matter where you live, we give you access to best-in-class TV series, documentaries, feature films and mobile games.",
              price : 199
            },
            {
              id: 2,
              name: "Showmax",
              description: "Showmax is an internet TV service. What sets Showmax apart is a unique combination of hit African content, first and exclusive international series, movies, the best kids’ shows, and live sport.",
              price : 349
            },
            {
              id: 3,
              name: "Amazon Prime Video",
              description: "Amazon Prime Video, or simply Prime Video, is an American subscription video on-demand over-the-top streaming and rental service of Amazon offered as a standalone service or as part of Amazon's Prime subscription.",
              price : 79
            },
            {
              id: 4,
              name: "Hulu",
              description: "Hulu is an American subscription streaming service majority-owned by The Walt Disney Company, with Comcast's NBCUniversal holding a minority stake that is pending sale to Disney; which will make Hulu into a wholly owned subsidiary of Disney.",
              price : 225
            },
            {
              id: 5,
              name: "Disney+",
              description: "Disney+ is an American subscription video on-demand over-the-top streaming service owned and operated by the Disney Entertainment division of The Walt Disney Company.",
              price : 119
            },
          ];
    }

    getOfferedSubscriptions () {
        return this.subscriptions;
    }
}