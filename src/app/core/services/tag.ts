import { Service } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseApiService } from './base-api.service';
import { Tag as TagModel, CreateTagRequest } from '@core/models';

@Service()
export class Tag extends BaseApiService {
  private readonly endpoint = 'tags';
  // get tag
  getTags(): Observable<string[]> {
    return this.get<string[]>(this.endpoint);
  }
  //   create tag
  createTag(payload: CreateTagRequest): Observable<TagModel> {
    return this.post<TagModel>(this.endpoint, payload);
  }
}
