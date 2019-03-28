﻿import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {AlertComponent} from './_directives/alert';
import {AuthGuard} from './_guards';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {
	AlertService,
	AuthenticationService,
	CompanyService,
	MeasurementFrameworkService,
	ReferenceModelService,
	UserService
} from './_services';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {UserComponent} from './user';
import {NavbarComponent} from "./_directives/navbar";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMaterialModule} from "./material/material.module";
import {CompanyComponent} from "./company";
import {ListReferenceModelComponent, RegisterReferenceModelComponent} from "./reference-model";
import {KnowledgeAreaComponent} from "./_directives/knowledge-area";
import {ProcessComponent} from "./_directives/process";
import {ConfirmDialogComponent} from "./_directives/confirm-dialog";
import {ListMeasurementFrameworkComponent, RegisterMeasurementFrameworkComponent} from "./measurement-framework";
import {ExpectedResultComponent} from "./_directives/expected-result";
import {TreeNodeQuestionsComponent} from "./_directives/tree-node-questions";
import {QuestionComponent} from "./_directives/question";
import {LoadingComponent} from "./_directives/loading";
import {TreeNodeMetricsComponent} from "./_directives/tree-node-metrics";
import {ListEvaluationComponent, RegisterEvaluationComponent} from "./evaluation";
import {EvaluationService} from "./_services/evaluation.service";
import {QuestionEvaluationComponent} from "./_directives/question-evaluation";

@NgModule({
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		routing,
		BrowserAnimationsModule,
		CustomMaterialModule
	],
	declarations: [
		AppComponent,
		AlertComponent,
		HomeComponent,
		LoginComponent,
		UserComponent,
		CompanyComponent,
		NavbarComponent,
		ListReferenceModelComponent,
		RegisterReferenceModelComponent,
		KnowledgeAreaComponent,
		ProcessComponent,
		ConfirmDialogComponent,
		ListMeasurementFrameworkComponent,
		RegisterMeasurementFrameworkComponent,
		ExpectedResultComponent,
		TreeNodeQuestionsComponent,
		TreeNodeMetricsComponent,
		QuestionComponent,
		LoadingComponent,
		ListEvaluationComponent,
		RegisterEvaluationComponent,
		QuestionEvaluationComponent
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
		{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
		AuthGuard,
		AlertService,
		AuthenticationService,
		UserService,
		CompanyService,
		ReferenceModelService,
		MeasurementFrameworkService,
		EvaluationService
	],
	entryComponents: [ProcessComponent, ConfirmDialogComponent, QuestionComponent],
	bootstrap: [AppComponent]
})

export class AppModule {
}
