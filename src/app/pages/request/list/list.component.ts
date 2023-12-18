import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IButtonsStandard, IForm, IOptions } from 'form-dynamic-angular';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './list.component.html'
})

export class ListComponent implements OnInit {

  controlFilter: UntypedFormGroup = this.fb.group({
    form: '',
  })
  formmFilter: IForm[] = []

  buttonsStandard: IButtonsStandard[] = [
    { type: 'clean', onCLick: this.clickNew },
    { type: 'filter', onCLick: () => this.filter() }
  ]

  cols: any[] = []
  requests: any[] = []

 

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: RequestService
  ) {
 
  }

  ngOnInit() {

    this.service.getAllForms().subscribe(data => {

      this.formmFilter = [
        { label: 'Tipo de Solicitação', col: 'col-lg-6', type: 'select', options: data as IOptions[], formControl: 'form' }
      ]
    })

    this.cols = [
      { field: 'type', header: 'Tipo de formulário' },
      { field: 'user', header: 'Usuário' }
    ];

    this.service.getAllRequests().subscribe(data => {
      this.requests = data as any[]
    })
  }

  filter() {
    this.service.filter(this.controlFilter.value.form.descricao).subscribe(data => {
      this.requests = data as any[]
    })
  }

  clickNew() {
    this.router.navigate([`register`], { relativeTo: this.route })
  }


  editOrView(id: number, type: string) {
    this.router.navigate([`${type}/${id}`], { relativeTo: this.route })
  }


}
