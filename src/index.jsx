import  ForgeUI,{ CustomField, render , GlobalPage, IssuePanel , } from "@forge/react";
import { App } from "./components/Settings.jsx";
import Field from "./components/PredictionFieldView.jsx";
import Panel from "./components/IssuePanel.jsx";

export const runSettingsPage = render(
  <GlobalPage>
    <App/>
  </GlobalPage>
);


export const runPredictionFieldView = render(
  <CustomField>
    <Field/>
  </CustomField>)

export const runIssuePanel = render(
  <IssuePanel>
    <Panel/>
  </IssuePanel>
)

