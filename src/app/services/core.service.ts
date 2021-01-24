import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  constructor(private http: HttpClient) {
  }

  get(url) {
    return this.http.get<any>(url);
  }

  getHobbies() {
    return ['Cricket', 'Fishing', 'Hiking', 'Volleyball', 'Walking'];
  }

  getCities() {
    return ['Ahmedabad', 'Bangalore', 'Bhopal', 'Chennai', 'Delhi', 'Hyderabad', 'Indore', 'Kolkata', 'Vidisha', 'Mumbai'];
  }

  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
