import { Injectable } from '@angular/core';
import { RegistryProviderService } from '../provider/registry-provider.service';
import { UtilsService } from '../../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class RegistryFactoryService {

  constructor(private registryProvider: RegistryProviderService, private utils: UtilsService) { }

  async getRegistries(owner: any) {
    const data: any[] = [];
    const query = await this.registryProvider.getRegistries(owner);
    if (query !== null && query.length > 0) {
      for (const doc of query) {
        data.push(doc.data());
      }
    }
    return data;
  }

  async getRegistriesByFilter(owner: any, filter: string) {
    const dataFilter = this.utils.getDataFilter(filter);
    const dataByFilter: any[] = [];
    const query = await this.registryProvider.getRegistriesByFilter(owner, dataFilter);
    if (query.length > 0) {
      for (const doc of query) {
        dataByFilter.push(doc.data())
      }
    }
    return dataByFilter;
  }

  async addRegistry(data: any, owner: string) {
    if (data.holiday === null) {
      data.holiday = false;
    }
    const registry = await this.registryProvider.addRegistry(data, owner);
    return registry;
  }

}
