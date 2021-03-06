import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class RegistryProviderService {

  registry: any = firebase.firestore().collection('pap-registration');

  constructor() { }

  async getRegistries(owner: any) {
    let data;
    try {
      const query: any = await this.registry.orderBy('paymentStatus', 'desc').where('owner', '==', owner).get();
      data = query.docs;
    } catch (error) {
      console.log(error);
      data = null;
    }
    return data;
  }

  async getRegistriesByFilter(owner: any, filter: any) {
    let dataByFilter;
    try {
      const query: any = await this.registry.where('owner', '==', owner).where(filter.column, '==', filter.value).get();
      dataByFilter = query.docs;
    } catch (error) {
      console.log(error)
      dataByFilter = null;
    }
    return dataByFilter;
  }

  async addRegistry(data: any, owner: string) {
    let status;
    const registry: any = await this.registry.add({
      datetime: new Date(data.datetime),
      holiday: data.holiday,
      paymentStatus: data.paymentStatus,
      project: data.project,
      papType: data.papType,
      papDescription: data.papDescription,
      owner
    }).then((doc) => {
      status = true;
    }).catch((err) => {
      status = false;
    });
    return status;
  }

}
