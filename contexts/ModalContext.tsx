import React, { useReducer } from "react"

type UserChoices = "close_user" | "update_profile" | "update_password" | "verify_email"

type NavChoices = "close_nav" | "view_home_sidebar"

type VisitChoices = "start_day" | "end_day" | "visit_in" | "visit_out" | "close_visit" | "add_summary" | "edit_summary"


type LeadChoices = "add_remark" | "view_remarks" | "close_lead" | "convert_customer" | "view_referrals" | "convert_useless"
    | "refer_lead" | "assign_refer" | "bulk_assign_leads" | "bulk_assign_refers" | "delete_remark" | "update_remark"

type TodoChoices = "view_replies" | "close_todo" | "update_todo_status"



type ChoiceState = UserChoices | LeadChoices | VisitChoices
    | TodoChoices | null | NavChoices

const initialState: ChoiceState | null = null


export enum VisitChoiceActions {
    start_day = "start_day",
    end_day = "end_day",
    visit_in = "visit_in",
    visit_out = "visit_out",
    close_visit = "close_visit",
    add_summary = "add_summary",
    edit_summary = "edit_summary"
}
export enum NavChoiceActions {
    close_nav = "close_nav",
    view_home_sidebar = "view_home_sidebar"
}

export enum TodoChoiceActions {
    close_todo = "close_todo",
    update_todo_status = "update_todo_status",
    view_replies = "view_replies"
}

export enum LeadChoiceActions {
    delete_remark = "delete_remark",
    update_remark = "update_remark",
    view_remarks = "view_remarks",
    close_lead = "close_lead",
    convert_customer = "convert_customer",
    add_remark = "add_remark",
    view_referrals = "view_referrals",
    refer_lead = "refer_lead",
    convert_useless = "convert_useless",
    assign_refer = "assign_refer",
    bulk_assign_leads = "bulk_assign_leads",
    bulk_assign_refers = "bulk_assign_refers"
}

export enum UserChoiceActions {
    view_modal = "view_modal",
    close_user = "close_user",
    update_profile = "update_profile",
    update_password = "update_password",
    verify_email = "verify_email"
}

type Action = {
    type: UserChoiceActions |
    LeadChoiceActions | TodoChoiceActions | VisitChoiceActions | NavChoiceActions
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


        // lead dialog choices
        case LeadChoiceActions.view_remarks: return type
        case LeadChoiceActions.add_remark: return type
        case LeadChoiceActions.convert_customer: return type
        case LeadChoiceActions.close_lead: return type
        case LeadChoiceActions.view_referrals: return type
        case LeadChoiceActions.refer_lead: return type
        case LeadChoiceActions.assign_refer: return type
        case LeadChoiceActions.delete_remark: return type
        case LeadChoiceActions.update_remark: return type
        case LeadChoiceActions.convert_useless: return type
        case LeadChoiceActions.bulk_assign_leads: return type
        case LeadChoiceActions.bulk_assign_refers: return type

        // visit
        case VisitChoiceActions.visit_in: return type
        case VisitChoiceActions.visit_out: return type
        case VisitChoiceActions.start_day: return type
        case VisitChoiceActions.end_day: return type
        case VisitChoiceActions.close_visit: return type
        case VisitChoiceActions.edit_summary: return type
        case VisitChoiceActions.add_summary: return type


        // todo choice action
        case TodoChoiceActions.close_todo: return type
        case TodoChoiceActions.update_todo_status: return type
        case TodoChoiceActions.view_replies: return type

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