﻿import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AlertService, MeasurementFrameworkService, ReferenceModelService} from '../_services';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
	Classification,
	GoalBoolean,
	GoalScale,
	MeasurementFramework,
	Question,
	ReferenceModel,
	ScaleValues,
	TypeQuestion
} from "../_models";
import {MatDialog, MatSelectChange} from "@angular/material";
import {ScaleValuesDialogComponent} from "../_directives/scale-values-dialog";

@Component({
	templateUrl: './register-measurement-framework.component.html',
	styleUrls: ['register-measurement-framework.component.scss']

})
export class RegisterMeasurementFrameworkComponent implements OnInit {
	measurementFrameworkForm: FormGroup;
	loading = false;
	submitted = false;
	idMeasurementFramework: number = null;
	measurementFramework: MeasurementFramework;
	referenceModels: ReferenceModel[] = [];
	referenceModel: ReferenceModel;
	types: TypeQuestion[] = [];
	type: string;

	constructor(
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private router: Router,
		private  dialog: MatDialog,
		private measurementFrameworkService: MeasurementFrameworkService,
		private referenceModelService: ReferenceModelService,
		private alertService: AlertService) {
	}

	get f() {
		return this.measurementFrameworkForm.controls;
	}

	ngOnInit(): void {
		this.measurementFramework = new MeasurementFramework();
		this.createScaleValues(this.measurementFramework);
		this.referenceModelService.list().subscribe((data: ReferenceModel[]) => {
			this.referenceModels = data;
		});

		this.types = [
			{idTypeQuestion: 'boolean', name: 'Booleano'},
			{idTypeQuestion: 'scale-nominal', name: 'Escala Nominal'},
			{idTypeQuestion: 'scale-numeric', name: 'Escala Numérica'}
		];

		this.measurementFrameworkForm = this.formBuilder.group({
			idMeasurementFramework: [],
			name: ['', Validators.required],
			idReferenceModel: [, Validators.required],
			type: ['', Validators.required],
			scaleValues: [[]],
			questions: [[]],
			goals: [[]],
			classifications: [[]],
		});

		this.route.params.subscribe(params => {
			this.idMeasurementFramework = params['idMeasurementFramework'];
			if (this.idMeasurementFramework) {
				this.measurementFrameworkService.get(this.idMeasurementFramework).subscribe((data: MeasurementFramework) => {
					this.measurementFrameworkForm.setValue(data);
					this.measurementFramework = data;
					this.referenceModel = this.getReferenceModel(data.idReferenceModel);
					this.type = this.types.find(value => value.idTypeQuestion  == data.type).idTypeQuestion;
				});
			}
		});
	}

	changeReferenceModel(event: MatSelectChange): void {
		this.referenceModel = this.getReferenceModel(event.value);
	}

	getReferenceModel(idReferenceModel: number): ReferenceModel {
		return this.referenceModels.find(value => value.idReferenceModel === idReferenceModel);
	}

	changeTypeQuestion(event: MatSelectChange): void {
		this.type = event.value;
	}

	confirmQuestions(questions: Question[]) {
		this.f["questions"].setValue(questions);
		this.measurementFramework.questions = questions;
	}

	confirmGoals(goals: GoalBoolean[] | GoalScale[]) {
		this.f["goals"].setValue(goals);
		this.measurementFramework.goals = goals;
	}

	confirmClassifications(classifications: Classification[]) {
		this.f["classifications"].setValue(classifications);
		this.measurementFramework.classifications = classifications;
	}

	onSubmit(): void {
		this.submitted = true;

		if (this.measurementFrameworkForm.invalid) {
			return;
		}

		this.loading = true;

		if (this.idMeasurementFramework) {
			this.measurementFrameworkService.update(this.measurementFrameworkForm.value)
				.subscribe(
					data => {
						this.alertService.success('Atualizado com sucesso', true);
						this.router.navigate(['/measurement-framework']);
					},
					error => {
						this.alertService.error(error.error);
						this.loading = false;
					});
		} else {
			this.measurementFrameworkService.register(this.measurementFrameworkForm.value)
				.subscribe(
					data => {
						this.alertService.success('Cadastrado com sucesso', true);
						this.router.navigate(['/measurement-framework']);
					},
					error => {
						this.alertService.error(error.error);
						this.loading = false;
					});
		}
	}

	openDialog(scaleValues: ScaleValues[]): void {
		const dialogRef = this.dialog.open(ScaleValuesDialogComponent, {
			width: '480px',
			data: scaleValues,
			disableClose: true
		});

		dialogRef.afterClosed().subscribe((result: ScaleValues[]) => {
			if (result) {
				console.log(result[0]);
			}
		});
	}

	private createScaleValues(measurementFramework: MeasurementFramework): void {
		measurementFramework.scaleValues = [
			{id: 1, value: 'Discordo totalmente', mappedValue: 'Não implementado'},
			{id: 2, value: 'Discordo parcialmente', mappedValue: 'Parcialmente implementado'},
			{id: 3, value: 'Não concordo, nem discordo', mappedValue: 'Não Avaliado'},
			{id: 4, value: 'Concordo parcialmente', mappedValue: 'Largamente implementado'},
			{id: 5, value: 'Concordo totalmente', mappedValue: 'Totalmente implementado'},
		];
	}
}
