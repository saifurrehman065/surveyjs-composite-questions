import { Component, OnInit } from "@angular/core";
import { SurveyCreatorModel } from "survey-creator-core";
import { ComponentCollection, Serializer } from "survey-core";

import "survey-core/survey.i18n.js";
import "survey-creator-core/survey-creator-core.i18n.js";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import "./app.component.css";
ComponentCollection.Instance.add({
  name: "fullname",
  title: "Full Name",
  elementsJSON: [
    {
      type: "text",
      name: "firstName",
      title: "First Name",
      isRequired: true,
      minWidth: 200
    },
    {
      type: "text",
      name: "lastName",
      title: "Last Name",
      isRequired: true,
      minWidth: 200,
      startWithNewLine: false,
    },
    //Adding new middle name question
    {
      type: "text",
      name: "middleName",
      title: "Middle Name",
      startWithNewLine: false,
      //Initially makes middle name invisible
      visible: false,
    },
  ],
  //SurveyJS calls this function one time on registing component, after creating "fullname" class.
  onInit() {
    //SurveyJS will create a new class "fullname". We can add properties for this class onInit()
    Serializer.addProperty("fullname", {
      name: "showMiddleName:boolean",
      default: false,
      category: "general",
    });
  },
  //SurveyJS calls this function after creating new question and loading it's properties from JSON
  //It calls in runtime and at design-time (after loading from JSON) and pass the current component/root question as parameter
  onLoaded(question) {
    this.changeMiddleVisibility(question);
  },
  //SurveyJS calls this on a property change in the component/root question
  //It has three parameters that are self explained
  onPropertyChanged(question, propertyName, newValue) {
    if (propertyName == "showMiddleName") {
      this.changeMiddleVisibility(question);
    }
  },
  //The custom function that used in onLoaded and onPropertyChanged functions
  changeMiddleVisibility(question) {
    //get middle question from the content panel
    let middle = question.contentPanel.getQuestionByName("middleName");
    if (!!middle) {
      //Set visible property based on component/root question showMiddleName property
      middle.visible = question.showMiddleName === true;
    }
  },
});
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    ngOnInit() {
        const creatorOptions = { questionTypes : ["text", "checkbox", "radiogroup", "dropdown"] };
    const creator = new SurveyCreatorModel(creatorOptions);
        creator.JSON = {
        elements: [
            {
                type: "fullname",
                name: "question1"
            }
        ]
    };
    //Select the order table component
    creator.selectedElement = creator.survey.getAllQuestions()[0];
    //Show property grid
    creator.rightContainerActiveItem("property-grid");
        this.creator = creator;
    }
}
