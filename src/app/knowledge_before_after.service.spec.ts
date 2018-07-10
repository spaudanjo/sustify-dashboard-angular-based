import { TestBed, inject } from '@angular/core/testing';

import { KnowledgeBeforeAfterService } from './knowledge_before_after.service';

describe('KnowledgeBeforeAfterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnowledgeBeforeAfterService]
    });
  });

  it('should be created', inject([KnowledgeBeforeAfterService], (service: KnowledgeBeforeAfterService) => {
    expect(service).toBeTruthy();
  }));
});
