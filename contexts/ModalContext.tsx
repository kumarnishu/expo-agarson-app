import React, { useReducer } from "react"

type UserChoices = "close_user" | "update_profile" | "update_password" | "verify_email"

type NavChoices = "close_nav" | "view_home_sidebar"
type ProductionChoices = "close_production" | "create_showweight" | "create_showweight2" | "create_showweight3" | "view_shoe_photo" | "view_shoe_photo2" | "view_shoe_photo3"

type VisitChoices = "start_day" | "end_day" | "visit_in" | "visit_out" | "close_visit" | "add_summary" | "edit_summary" | "upload_sample"


type ChoiceState = UserChoices | VisitChoices | ProductionChoices
    | null | NavChoices

const initialState: ChoiceState | null = null


export enum VisitChoiceActions {
    start_day = "start_day",
    end_day = "end_day",
    visit_in = "visit_in",
    visit_out = "visit_out",
    close_visit = "close_visit",
    add_summary = "add_summary",
    upload_sample = "upload_sample",
    edit_summary = "edit_summary"
}
export enum ProductionChoiceActions {
    close_production="close_production",
    create_showweight = "create_showweight",
    create_showweight2="create_showweight2",
    create_showweight3="create_showweight3",
    view_shoe_photo = "view_shoe_photo",
    view_shoe_photo2="view_shoe_photo2",
    view_shoe_photo3 = "view_shoe_photo3"
}
export enum NavChoiceActions {
    close_nav = "close_nav",
    view_home_sidebar = "view_home_sidebar"
}

export enum UserChoiceActions {
    view_modal = "view_modal",
    close_user = "close_user",
    update_profile = "update_profile",
    update_password = "update_password",
    verify_email = "verify_email"
}

type Action = {
    type: UserChoiceActions | VisitChoiceActions | NavChoiceActions | ProductionChoiceActions
}

// reducer
function reducer(state: ChoiceState | null, action: Action) {
    let type = action.type
    switch (type) {
        // user dialogs choices

        case UserChoiceActions.update_profile: return type
        case UserChoiceActions.update_password: return type
        case UserChoiceActions.verify_email: return type
        case UserChoiceActions.close_user: return type

        case ProductionChoiceActions.close_production: return type
        case ProductionChoiceActions.create_showweight: return type
        case ProductionChoiceActions.create_showweight2: return type
        case ProductionChoiceActions.create_showweight3: return type
        case ProductionChoiceActions.view_shoe_photo: return type
        case ProductionChoiceActions.view_shoe_photo2: return type
        case ProductionChoiceActions.view_shoe_photo3: return type


        // visit
        case VisitChoiceActions.visit_in: return type
        case VisitChoiceActions.visit_out: return type
        case VisitChoiceActions.start_day: return type
        case VisitChoiceActions.end_day: return type
        case VisitChoiceActions.close_visit: return type
        case VisitChoiceActions.edit_summary: return type
        case VisitChoiceActions.add_summary: return type
        case VisitChoiceActions.upload_sample: return type

        // nav choice action
        case NavChoiceActions.close_nav: return type
        case NavChoiceActions.view_home_sidebar: return type

        default: return state
    }
}
// context
type Context = {
    choice: ChoiceState | null,
    setChoice: React.Dispatch<Action>
}
export const ChoiceContext = React.createContext<Context>(
    {
        choice: null,
        setChoice: () => null
    }
)
// provider
export function ChoiceProvider(props: { children: JSX.Element }) {
    const [choice, setChoice] = useReducer(reducer, initialState)
    return (
        <ChoiceContext.Provider value={{ choice, setChoice }}>
            {props.children}
        </ChoiceContext.Provider>
    )

}