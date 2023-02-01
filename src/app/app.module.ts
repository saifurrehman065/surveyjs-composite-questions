import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SurveyCreatorModule } from "survey-creator-angular";
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, SurveyCreatorModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
