import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleTag } from './article-tag';

describe('ArticleTag', () => {
  let component: ArticleTag;
  let fixture: ComponentFixture<ArticleTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleTag],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleTag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
