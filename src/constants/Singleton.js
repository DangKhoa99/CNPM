import useLanguage from '../hooks/useLanguage'
import * as myConstClass from "../constants/constantsLanguage"

export default function Singleton(){
    const { language, setLanguage } = useLanguage();
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    this.data =
    [
        {
            title: content.about,
            links: [
                content.howWorks,
                content.newsroom,
                content.investors,
                content.careers,
                content.privacy,
                content.terms,
            ],
        },
        {
            title: content.community,
            links: [
                content.partner,
                content.inviteFriends,
            ],
        },
        {
            title: content.hotels,
            links: [
                content.hostHotel,
                content.hostExperience,
                content.responsibleHosting,
                content.communityCenter,
            ],
        },
        {
            title: content.support,
            links: [
                content.helpCenter,
                content.neighborhoodSupport,
                content.trustSafety,
            ],
        },
    ];

    if(this.constructor.instance){
        return this.constructor.instance;
    }

    this.constructor.instance = this;
}