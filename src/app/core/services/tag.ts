import { Service } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { CreateTagRequest } from '@core/models';

@Service()
export class Tag extends BaseApiService {
  private readonly endpoint = 'tags';
  // get tag
  getTags(): Observable<string[]> {
    return this.get<string[]>(this.endpoint);
  }
  //   create tag
  createTag(payload: CreateTagRequest): Observable<Tag> {
    return this.post<Tag>(this.endpoint, payload);
  }
}
