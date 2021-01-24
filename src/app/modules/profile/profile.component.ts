import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzUploadFile} from 'ng-zorro-antd';
import {CoreService} from '../../services/core.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  listOfHobbies: Array<string> = [];
  listOfCities: Array<string> = [];
  listOfCodes: any = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  isSubmitted = false;
  fileList: NzUploadFile[] = [];

  constructor(private fb: FormBuilder, private coreService: CoreService, private msg: NzMessageService) {
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.confirmPassword.updateValueAndValidity());
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
      gender: ['MALE'],
      phoneNumberPrefix: ['+91'],
      phoneNumber: [null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      hobbies: [null],
      city: [null],
      agree: [false]
    });

    this.listOfHobbies = this.coreService.getHobbies();
    this.listOfCities = this.coreService.getCities();
    this.coreService.get('data/code.json').subscribe((data) => {
      this.listOfCodes = data;
    });
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await this.coreService.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  }

  reset(): void {
    this.validateForm.reset();
    this.fileList = [];
    this.previewImage = '';
    this.previewVisible = false;
  }

  /**
   * Use to store data in db
   */
  onSubmit() {
    this.isSubmitted = true;
    // console.log(this.validateForm);
    this.msg.success('You are register successfully!', {
      nzDuration: 2000
    });

    setTimeout(() => {
      this.isSubmitted = false;
    }, 1500);
  }
}
